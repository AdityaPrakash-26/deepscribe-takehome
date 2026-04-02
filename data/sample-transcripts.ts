export interface SampleTranscript {
  id: string;
  title: string;
  description: string;
  category: string;
  wordCount: string;
  transcript: string;
}

export const sampleTranscripts: SampleTranscript[] = [
  {
    id: "hypertension-management",
    title: "Hypertension Management with Clinical Trial Discussion",
    description: "Primary care visit for a 52-year-old with elevated blood pressure discussing lifestyle management and enrollment in a clinical trial studying wild blueberry powder's effects on blood pressure and cardiovascular health",
    category: "Primary Care",
    wordCount: "~400 words",
    transcript: `Doctor: Mr. Hoffmann, come in. Good to see you. How have you been?

Patient: Pretty well, no complaints.

Doctor: Good. Your main issue has been high blood pressure and that's what I want to focus on today. You're reading 134 over 83 right now. Over the past nine months your home readings have consistently been in the 130 to 138 over 80 to 86 range. That's high blood pressure that we haven't gotten fully under control.

Patient: I know. It's been stubbornly elevated.

Doctor: Do you smoke?

Patient: No, never.

Doctor: Alcohol?

Patient: A glass of wine maybe once a week.

Doctor: Any supplements — fish oil, probiotics, vitamin E, antioxidants?

Patient: No, nothing.

Doctor: You're 52 years old, 89 kilograms, 178 centimeters — BMI is 28. Not in a weight loss program?

Patient: No.

Doctor: Any kidney disease, thyroid conditions, GI problems, neurological issues, cancer history?

Patient: No to all of that.

Doctor: Any berry allergies?

Patient: None.

Doctor: Good. I want to mention a clinical trial running at Georgia State University here in Atlanta. They're studying whether a daily wild blueberry powder can improve blood pressure, arterial stiffness, gut health, and cognitive function in adults with high blood pressure. They're enrolling adults 45 to 65, BMI between 25 and 35, who have had elevated blood pressure for at least six months. You fit that well.

Patient: What does participation involve?

Doctor: Just a powder mixed into food once a day for eight weeks, with blood pressure and other measurements taken at the start, four weeks, and eight weeks. No medications involved.

Patient: I'd be willing to try that.

Doctor: I'll give you their contact information. Back in four weeks for a blood pressure check. Any questions?

Patient: No, thank you.`,
  },
  {
    id: "diabetes-management",
    title: "Type 2 Diabetes Follow-up",
    description: "Quarterly diabetes management visit with A1C review and medication adjustment",
    category: "Endocrinology",
    wordCount: "~500 words",
    transcript: `Doctor: Good afternoon, Mr. Patel. Come on in. How have you been feeling since your last visit?

Patient: Still struggling a bit. My home blood sugar readings have been all over the place, and I'm tired more than I'd like.

Doctor: I can see from your chart that your A1C came back at 7.8% — same as last quarter. You've now been on semaglutide 1 milligram weekly for four months. Are you still tolerating it okay?

Patient: Yes, the nausea settled down after the first few weeks. I've been taking it every Sunday without missing a dose.

Doctor: Good. And your weight — let me pull up the chart. You were 96 kilograms at your last visit, and today you're 95.5. So basically stable, which is consistent with what we've seen over the past three months. Height is 176 centimeters, so your BMI is right around 31 kilograms per square meter.

Patient: I was hoping to lose a bit more, honestly.

Doctor: That's understandable. The semaglutide is helping, but your glucose control hasn't reached goal yet — you're still above the 7.5% threshold we discussed. I'm based in Phoenix, but I've been flying out almost every week for work. It's hard to keep a routine on the road.

Doctor: Travel does make this harder. Let's look at what's driving the variability. I'm seeing post-meal spikes up around 240 to 260 after dinner. What does a typical dinner look like when you're traveling?

Patient: Usually a restaurant meal — pasta, bread, sometimes a glass of wine.

Doctor: That explains the spikes. Refined carbohydrates digest quickly and cause sharp glucose increases. Let's talk about what we can do. First, a quick review — any foot numbness, tingling, or wounds?

Patient: No, feet feel fine.

Doctor: Good. Eyes checked recently?

Patient: I had my annual eye exam last month — came back fine.

Doctor: Perfect. Blood pressure today is 132 over 80 — slightly elevated, we'll keep monitoring that. You're currently on metformin 1000 milligrams daily and semaglutide 1 milligram weekly — no other diabetes medications, correct? No insulin in the past year, no DPP-4 inhibitors, no meglitinides, nothing else?

Patient: Correct, just those two. I haven't used insulin at all in the past year.

Doctor: And you haven't had any major cardiac events recently — no heart attack, stroke, or hospitalization for heart failure in the past three months?

Patient: No, nothing like that. I've been well otherwise.

Doctor: Any history of diabetic ketoacidosis, hyperosmolar coma, or anyone ever telling you that you have type 1 or autoimmune diabetes instead of type 2?

Patient: No. It's always been type 2 diabetes.

Doctor: Any prior bariatric surgery, plans for weight-loss surgery, or any weight-loss medications or supplements in the last three months?

Patient: No to all of that. My weight has been steady and I haven't taken anything for weight loss.

Doctor: Good. Given that your HbA1c remains above goal despite four months on a stable dose of semaglutide, I want to discuss options including a clinical trial that may be a good fit for you. There's a study evaluating an add-on medication for people with type 2 diabetes who are on semaglutide or tirzepatide but haven't reached their HbA1c goal. Based on your profile — your type 2 diabetes, A1C of 7.8%, BMI of 31, stable weight, four months on semaglutide, no insulin use in the past year, and no recent cardiovascular events — you appear to meet the eligibility criteria.

Patient: What would that involve?

Doctor: It would be a once-weekly injection on top of your current regimen for about nine months. It's a placebo-controlled study, so there's a chance you'd receive the active drug or a placebo. I can have our research coordinator reach out with the full details.

Patient: That's worth hearing more about.

Doctor: I'll also refer you to our registered dietitian given your travel schedule — practical strategies for eating out can make a real difference. Any other questions?

Patient: What are warning signs of low blood sugar I should watch for?

Doctor: Semaglutide has a low risk of causing hypoglycemia on its own. Watch for shakiness, sweating, confusion, or feeling faint. If that happens, have 15 grams of fast-acting carbs — glucose tablets or a small glass of juice. Call us if it doesn't resolve.

Patient: No other questions. Thank you, doctor.

Doctor: We'll get through this together. See you in eight weeks.`,
  },
  {
    id: "heart-failure-cardiology",
    title: "Heart Failure Follow-up with Worsening Symptoms",
    description: "Cardiology follow-up for a 62-year-old male with heart failure and coronary artery disease presenting with worsening dyspnea and fatigue",
    category: "Cardiology",
    wordCount: "~650 words",
    transcript: `Doctor: Good morning, Mr. Garza. I'm Dr. Okafor, your cardiologist. How have you been since your hospitalization two months ago?

Patient: Honestly, not great. I was doing okay for a few weeks after discharge, but things have been getting worse again over the past three weeks.

Doctor: Tell me what's been happening.

Patient: The dyspnea is back. I get winded walking from my bedroom to the kitchen. I used to be able to walk a full block before I had to stop. And the fatigue — I'm exhausted by noon even if I haven't done anything.

Doctor: Are you having any chest pain?

Patient: Some, yes. A dull ache in my chest when I try to exert myself. It goes away when I sit down.

Doctor: Any swelling in your legs or ankles?

Patient: My ankles have been puffy for about a week. My shoes are tight by the end of the day.

Doctor: Are you sleeping flat, or do you need pillows to prop yourself up?

Patient: I've been using three pillows. If I try to lie flat I feel like I can't breathe. A couple of nights I woke up gasping, had to sit up on the edge of the bed.

Doctor: That's orthopnea and paroxysmal nocturnal dyspnea — both signs that fluid is backing up. Let me review your history. You're 62 years old. You were diagnosed with coronary artery disease four years ago after a cardiac catheterization showed two-vessel disease. You had a stent placed in the left anterior descending artery at that time. Then last year you were diagnosed with heart failure after an echocardiogram showed your ejection fraction had dropped to 35%.

Patient: That's right. It was 35% at the last echo too, about four months ago.

Doctor: And your medical history also includes hypertension and type 2 diabetes, correct?

Patient: Yes. The diabetes has been stable — my last A1C was 7.2%. Blood pressure has been running higher lately though, around 145 over 90 at home.

Doctor: Let me go over your current medications. You're on carvedilol 25 milligrams twice daily, sacubitril-valsartan 97/103 milligrams twice daily, spironolactone 25 milligrams daily, and furosemide 40 milligrams daily as your diuretic. Also metformin for the diabetes and aspirin 81 milligrams daily. Is that all correct?

Patient: Yes, I take everything as prescribed. I haven't missed doses.

Doctor: Good. Any dizziness, lightheadedness, or fainting?

Patient: No, nothing like that.

Doctor: Let me examine you. [Pause] I'm hearing crackles in both lung bases — that's fluid. Your jugular venous pressure is elevated. There's pitting edema in both ankles, about 2 centimeters. Heart sounds show a third heart sound, an S3 gallop, which is consistent with volume overload. Your blood pressure today is 142 over 88.

Patient: That doesn't sound good.

Doctor: Let's look at today's labs. Your BNP is 850 — that's significantly elevated and confirms your heart failure is not well controlled right now. Your kidney function and electrolytes are stable, which is reassuring. Your weight is up 4 kilograms from your last visit, which lines up with fluid retention.

Patient: So what do we do?

Doctor: First, I want to increase your diuretic. We'll go from furosemide 40 to 80 milligrams daily to help clear the extra fluid. I'd like you to weigh yourself every morning and call us if you gain more than 1.5 kilograms in a day. I'm also ordering a repeat echocardiogram to reassess your ejection fraction and see if there's been any further decline. Based on your NYHA classification, you've gone from class II to class III — meaningful physical limitation from your heart failure symptoms.

Patient: Is there anything else we can try? I feel like I'm on a lot of medications already and things are still getting worse.

Doctor: There are a few options I want to discuss. Given that your ejection fraction is 35% or below and you're symptomatic despite optimal medical therapy, you may be a candidate for advanced therapies. I'd also like to look into whether there are any clinical trials you might be eligible for — there's active research into new treatments for heart failure with reduced ejection fraction, and Houston has several major programs running enrollment right now.

Patient: I'd be open to that. Whatever gives me the best chance.

Doctor: I'll have our research coordinator review your profile. We'll get the echo scheduled this week and see you back in two weeks to reassess. Call us before then if your breathing worsens, you gain weight rapidly, or you develop any new chest pain.

Patient: Thank you, Dr. Okafor. I appreciate you being thorough.

Doctor: That's what we're here for, Mr. Garza. We'll stay on top of this.`,
  }
];
