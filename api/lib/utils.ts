import type { CriterionResult, PatientProfile, ScreenedTrial } from "../../types/api";
import type { ParsedCriteria, ParsedTrialCriteria } from "./types";

// ── General ──────────────────────────────────────────────────────────────────

export function stripCodeFences(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return (match ? match[1] : text).trim();
}

// ── Keyword normalization (builds CT.gov search terms from patient profile) ──

const GENERIC_MEASUREMENT_PREFIXES = [
  /^blood pressure\b/i,
  /^weight\b/i,
  /^height\b/i,
  /^temperature\b/i,
  /^oxygen saturation\b/i,
  /^body mass index\b/i,
  /^bmi\b/i,
];
const GENERIC_UNIT_TOKENS = new Set([
  "kilogram", "kilograms", "kg", "gram", "grams", "g", "milligram", "milligrams", "mg",
  "microgram", "micrograms", "mcg", "centimeter", "centimeters", "cm", "meter", "meters", "m",
  "square", "per", "daily", "weekly", "room", "air", "celsius", "fahrenheit", "degrees",
]);
const MEDICATION_PREFIX_TOKENS = new Set([
  "iv", "po", "im", "sc", "sq", "subcutaneous", "oral", "injectable",
]);
const MEDICATION_STOP_TOKENS = new Set([
  ...GENERIC_UNIT_TOKENS,
  "tablet", "tablets", "capsule", "capsules", "injection", "injections",
  "once", "twice", "three", "times", "every", "bid", "tid", "qid",
]);

function normalizeWhitespace(value: string): string {
  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function cleanToken(token: string): string {
  return token.replace(/^[^\p{L}\p{N}<>=]+|[^\p{L}\p{N}%/+-]+$/gu, "");
}

function isNumericLikeToken(token: string): boolean {
  const cleaned = cleanToken(token);
  return /^[-+<>≤≥]?\d+(?:[.,/]\d+)*(?:%|mg|mcg|g|kg|lb|lbs|cm|mm|ml|l)?$/i.test(cleaned);
}

function dedupeTerms(values: Array<string | null>): string[] {
  const seen = new Set<string>();
  const deduped: string[] = [];

  for (const value of values) {
    const cleaned = value ? normalizeWhitespace(value) : "";
    if (!cleaned) continue;
    const key = cleaned.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(cleaned);
  }

  return deduped;
}

function normalizeSymptomKeyword(value: string): string | null {
  const cleaned = normalizeWhitespace(value);
  if (!cleaned) return null;
  const tokens = cleaned.split(/\s+/).map(cleanToken).filter(Boolean).filter((token) => !isNumericLikeToken(token));
  return tokens.length > 0 ? tokens.join(" ") : null;
}

function normalizeBiomarkerKeyword(value: string): string | null {
  const cleaned = normalizeWhitespace(value);
  if (!cleaned) return null;
  if (GENERIC_MEASUREMENT_PREFIXES.some((pattern) => pattern.test(cleaned))) return null;
  const tokens = cleaned.split(/\s+/).map(cleanToken).filter(Boolean)
    .filter((token) => !isNumericLikeToken(token))
    .filter((token) => !GENERIC_UNIT_TOKENS.has(token.toLowerCase()));
  return tokens.length > 0 ? tokens.join(" ") : null;
}

function normalizeMedicationKeyword(value: string): string | null {
  const cleaned = normalizeWhitespace(value);
  if (!cleaned) return null;

  const rawTokens = cleaned.split(/\s+/).map(cleanToken).filter(Boolean);
  const nameTokens: string[] = [];

  for (const token of rawTokens) {
    const lower = token.toLowerCase();
    if (nameTokens.length === 0 && MEDICATION_PREFIX_TOKENS.has(lower)) continue;
    if (isNumericLikeToken(token) || MEDICATION_STOP_TOKENS.has(lower)) break;
    nameTokens.push(token);
  }

  return nameTokens.length > 0 ? nameTokens.join(" ") : null;
}

export function buildKeywordTerms(profile: PatientProfile): string[] {
  return dedupeTerms([
    ...profile.symptoms.map(normalizeSymptomKeyword),
    ...profile.biomarkers.map(normalizeBiomarkerKeyword),
    ...profile.medications.map(normalizeMedicationKeyword),
  ]);
}

// ── Eligibility criteria parsing (splits raw text into inclusion/exclusion lists) ──

function getCriteriaSection(line: string): "inclusion" | "exclusion" | null {
  const cleaned = normalizeWhitespace(line.replace(/[*_`#>]/g, "").replace(/:+$/, "")).toLowerCase();
  if (cleaned.endsWith("inclusion criteria") || cleaned.endsWith("inclusion criterion")) return "inclusion";
  if (cleaned.endsWith("exclusion criteria") || cleaned.endsWith("exclusion criterion")) return "exclusion";
  return null;
}

function cleanCriterion(text: string): string {
  return normalizeWhitespace(text).replace(/[;.,]+$/, "");
}

type BulletMatch = {
  indent: number;
  kind: "unordered" | "ordered" | "alpha";
  content: string;
  displayText: string;
};

function parseBulletLine(rawLine: string): BulletMatch | null {
  const line = rawLine.trimEnd();
  const indent = rawLine.match(/^\s*/)?.[0].length ?? 0;
  const trimmed = line.trimStart();

  const unordered = trimmed.match(/^[-*]\s+(.*)$/);
  if (unordered) {
    const content = unordered[1].trim();
    return { indent, kind: "unordered", content, displayText: content };
  }

  const ordered = trimmed.match(/^(\d+[.)])\s+(.*)$/);
  if (ordered) {
    const content = ordered[2].trim();
    return { indent, kind: "ordered", content, displayText: `${ordered[1]} ${content}` };
  }

  const alpha = trimmed.match(/^(\([A-Za-z0-9]+\)|[A-Za-z][.)])\s+(.*)$/);
  if (alpha) {
    const content = alpha[2].trim();
    return { indent, kind: "alpha", content, displayText: `${alpha[1]} ${content}` };
  }

  return null;
}

function isSectionLabel(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.endsWith(":") || parseBulletLine(trimmed)) return false;
  const label = normalizeWhitespace(trimmed.slice(0, -1));
  return Boolean(label) && label.split(/\s+/).length <= 6 && !/[.!?]/.test(label);
}

function isAlternativeIntro(text: string): boolean {
  const normalized = cleanCriterion(text).toLowerCase();
  return (
    normalized.includes("one of the following") ||
    normalized.includes("any of the following") ||
    normalized.includes("one or more of the following") ||
    normalized.includes("the following")
  );
}

function parseCriteriaSection(lines: string[]): string[] {
  const criteria: string[] = [];
  let current = "";
  let currentIndent: number | null = null;
  let sectionLabel: string | null = null;
  let sawBlank = false;
  let alternativeIndent: number | null = null;
  let collectingAlternatives = false;

  const startCurrent = (text: string, indent: number | null) => {
    const cleaned = cleanCriterion(text);
    current = cleaned ? sectionLabel ? `${sectionLabel}: ${cleaned}` : cleaned : "";
    currentIndent = indent;
    sawBlank = false;
  };

  const appendCurrent = (text: string, separator: "space" | "nested") => {
    const cleaned = cleanCriterion(text);
    if (!cleaned) return;
    if (!current) { current = cleaned; return; }
    current = separator === "nested"
      ? `${current}${current.endsWith(":") ? " " : "; "}${cleaned}`
      : `${current} ${cleaned}`;
  };

  const flush = () => {
    const cleaned = cleanCriterion(current);
    if (cleaned) criteria.push(cleaned);
    current = "";
    currentIndent = null;
    sawBlank = false;
    alternativeIndent = null;
    collectingAlternatives = false;
  };

  for (const rawLine of lines) {
    if (!rawLine.trim()) { sawBlank = Boolean(current); continue; }

    const line = rawLine.trim();
    const bullet = parseBulletLine(rawLine);

    if (isSectionLabel(line) && !getCriteriaSection(line)) {
      flush();
      sectionLabel = normalizeWhitespace(line.slice(0, -1));
      continue;
    }

    if (bullet) {
      if (!current) { startCurrent(bullet.content, bullet.indent); continue; }

      if (collectingAlternatives || isAlternativeIntro(current)) {
        if (alternativeIndent === null) {
          if (currentIndent === null && bullet.kind === "unordered") { startCurrent(bullet.content, bullet.indent); continue; }
          if (currentIndent !== null && bullet.indent <= currentIndent && !collectingAlternatives) { flush(); startCurrent(bullet.content, bullet.indent); continue; }
          alternativeIndent = bullet.indent;
        } else if (bullet.indent < alternativeIndent) {
          flush(); startCurrent(bullet.content, bullet.indent); continue;
        }
        collectingAlternatives = true;
        appendCurrent(bullet.displayText, "nested");
        sawBlank = false;
        continue;
      }

      if (currentIndent !== null && bullet.indent > currentIndent) {
        appendCurrent(bullet.displayText, "nested");
        sawBlank = false;
        continue;
      }

      if (current.endsWith(":")) {
        if (currentIndent === null && bullet.kind === "unordered") { startCurrent(bullet.content, bullet.indent); continue; }
        if (currentIndent !== null && bullet.indent <= currentIndent) { flush(); startCurrent(bullet.content, bullet.indent); continue; }
        appendCurrent(bullet.displayText, "nested");
        sawBlank = false;
        continue;
      }

      flush();
      startCurrent(bullet.content, bullet.indent);
      continue;
    }

    if (!current) { startCurrent(line, null); continue; }

    if (sawBlank) {
      if (collectingAlternatives || isAlternativeIntro(current) || current.endsWith(":") || currentIndent !== null) {
        appendCurrent(line, "space");
      } else {
        flush();
        startCurrent(line, null);
      }
      sawBlank = false;
      continue;
    }

    appendCurrent(line, "space");
  }

  flush();
  return [...new Set(criteria)];
}

export function parseEligibilityCriteria(eligibilityCriteria: string): ParsedCriteria {
  const normalized = eligibilityCriteria.replace(/\r/g, "");
  const lines = normalized.split("\n");
  const inclusionLines: string[] = [];
  const exclusionLines: string[] = [];
  let currentSection: "inclusion" | "exclusion" | null = null;
  let sawInclusionHeader = false;
  let sawExclusionHeader = false;

  for (const line of lines) {
    const section = getCriteriaSection(line);
    if (section) {
      currentSection = section;
      sawInclusionHeader ||= section === "inclusion";
      sawExclusionHeader ||= section === "exclusion";
      continue;
    }
    if (currentSection === "inclusion") inclusionLines.push(line);
    else if (currentSection === "exclusion") exclusionLines.push(line);
  }

  const inclusionCriteria = parseCriteriaSection(inclusionLines);
  const exclusionCriteria = parseCriteriaSection(exclusionLines);
  const criteriaParsedSuccessfully =
    (sawInclusionHeader && inclusionCriteria.length > 0) ||
    (sawExclusionHeader && exclusionCriteria.length > 0);

  return { inclusionCriteria, exclusionCriteria, criteriaParsedSuccessfully };
}

// ── LLM screening (builds prompts, normalizes results, sorts trials) ──────────

export function buildPrompt(
  transcript: string,
  parsedTrials: ParsedTrialCriteria[]
): string {
  const trialBlocks = parsedTrials
    .map((entry, trialIndex) => {
      const inclusion = entry.inclusionCriteria.length > 0
        ? entry.inclusionCriteria.map((criterion, index) => `${index + 1}. ${criterion}`).join("\n")
        : "(none)";
      const exclusion = entry.exclusionCriteria.length > 0
        ? entry.exclusionCriteria.map((criterion, index) => `${index + 1}. ${criterion}`).join("\n")
        : "(none)";

      return `--- Trial ${trialIndex + 1} ---
trial_id: ${entry.trial.nctId}

Inclusion Criteria:
${inclusion}

Exclusion Criteria:
${exclusion}`;
    })
    .join("\n\n");

  return `CLINICAL TRANSCRIPT:
${transcript}

TRIALS TO EVALUATE:
${trialBlocks}`;
}

export function normalizeCriterionResults(
  rawResults: boolean[] | undefined,
  expectedCriteria: string[],
  defaultResult: boolean
): CriterionResult[] {
  return expectedCriteria.map((criterion, index) => {
    const result = typeof rawResults?.[index] === "boolean" ? rawResults[index] : defaultResult;
    return { criterion, result };
  });
}

export function sortTrials(trials: ScreenedTrial[]): ScreenedTrial[] {
  return [...trials].sort((a, b) => {
    const aRank = !a.eligibility ? 2 : a.eligibility.final_eligibility ? 0 : 1;
    const bRank = !b.eligibility ? 2 : b.eligibility.final_eligibility ? 0 : 1;
    return aRank - bRank;
  });
}
