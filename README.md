# DeepScribe Takehome for Clinical Trial Matching

This software takes in a transcript of a doctor-patient conversation and matches patients to relevant recruiting clinical trials using LLM extraction and the ClinicalTrials.gov API. To speed up my development of this take-home, I bootstrapped the project with npx create-next-app, and also used Claude to set up a basic app where I can paste a clinical transcript and that gets sent to an API route for processing. I then asked it to implement an integration with Nvidia's free AI inference endpoint. Everything after that point is my own work.

High level architecture:
- Frontend: A simple Next.js app with a textarea for pasting the transcript and a button to submit it for analysis.
- Backend: An API route that is deployed using Cloudflare Workers (similar to AWS Lambda) that handles the transcript submission. It has three main stages:
  1) Extracting a structured patient profile from the unstructured transcript using Nvidia's LLM inference API.
  2) Fetching and filtering relevant clinical trials from ClinicalTrials.gov based on the extracted patient profile.
  3) Screening the eligibility of the patient for the recommended trials using the eligibility criteria provided in the trial data.

### Patient Profile Fields and How They Are Used

The LLM extracts the following fields from the transcript. Each field has a specific role in the pipeline:

| Field | CT.gov Query | Deterministic Pre-filter | LLM Eligibility Screening |
|---|---|---|---|
| `age` | Age range filter (`filter.advanced`) | Hard disqualify if outside trial min/max age | ✓ |
| `sex` | Sex filter (`filter.advanced`) | Hard disqualify if trial sex mismatch | ✓ |
| `diagnoses` | Primary condition search (`query.cond`) | — | ✓ |
| `symptoms` | Keyword search (`query.term`) | — | ✓ |
| `medications` | Keyword search (`query.term`) | — | ✓ |
| `biomarkers` | Keyword search (`query.term`) | — | ✓ |
| `location` | Location filter (`filter.advanced`) | — | — |
| `pregnancyStatus` | — | — | ✓ |
| `priorTherapies` | — | — | ✓ |
| `comorbidities` | — | — | ✓ |

Notes:
- `diagnoses`, `symptoms`, `medications`, and `biomarkers` drive what trials CT.gov returns. The more specific these are, the more targeted the results.
- `age` and `sex` are used twice: once to narrow the CT.gov query, and again as a deterministic pre-filter that hard-disqualifies trials before the LLM screening call (saving tokens and reducing hallucination risk).
- `priorTherapies`, `comorbidities`, and `pregnancyStatus` are not used in the CT.gov query but are passed to the LLM screener because inclusion/exclusion criteria often reference them (e.g. "must have failed ≥1 prior line of therapy", "no active autoimmune disease").
- `location` is only used in the CT.gov query to surface nearby sites. It is not sent to the LLM screener since geographic proximity is not an eligibility criterion.

## Craftsmanship

Areas I paid particular attention to:

**Pipeline simplicity**

When Claude finished the backend integration with Nvidia, it produced a super messy codebase. It had a different file for extracting a patient profile, a different file for building the clinicaltrials.gov query, and a different file for parsing and scoring the results (even though I didn't need scoring). Each file had multiple functions, and there was a lot of back-and-forth between them. I found it very difficult to understand the flow of data and logic through the system.

I first refactored this pipeline to be easier to follow. I consolidate everything into two steps. 
1) Extracting conditions from the transcript,
2) Fetching trials based on the extracted conditions from ClinicalTrials.gov

**Ease of Use**

To enhance user experience, I implemented a sample transcript drawer from the sidebar, so that the evaluators for the takehome do not need to generate their own transcripts to test the system.

**Leveraging clinicaltrials.gov API to its best extent**

To effectively match patients with clinical trials, I first read through their [API documentation](https://clinicaltrials.gov/data-api/api) and made a sample request using Postman to see what the response looks like and what data points I can use for filtering. Two fields stood out to me as particularly useful for filtering: "condition" and "keywords". The "condition" field provides a standardized way to identify the medical conditions that the trial is targeting, while the "keywords" field can contain additional relevant information about the trial that may not be captured in the "condition" field. By using these fields effectively, I can ensure that I'm retrieving trials that are more likely to be relevant to the patient's specific medical situation.

In an early implementation, I also had a filtering step that took the results returned by the clinicaltrials.gov API and then filtered them. This meant that I was doing extra work on my backend. After further reading of the docs and parameters that the clinical trial API supports, I realized that I could instead use the API's built-in query parameters to do the filtering for me using `filter.advanced` parameter, which simplified my code and reduced unnecessary processing.

**Guiding AI through clinicaltrials.gov API**

Claude was not able to navigate. Did not understand the Essie syntax for queries and filtering, so I had to explain the process. It was using all the extracted conditions as keywords itself rather than relying on specific fielts like query.cond and query.keywords. It was also doing + operators for filtering rather than using OR statements which is what the API supports. I had to explain to it how to use the API effectively and how to structure the query.

**Eligibility Module**

After reading through the API response from the /studies endpoint, I saw that there is a key in the JSON called "Eligibility Module". My initial eligibility check only relied on keyword matching + age, sex, and location filtering. However, I realized that the "Eligibility Module" contains a lot of useful information about the inclusion and exclusion criteria for the trial, which can be used to further filter the trials and ensure that they are a good match for the patient. By incorporating this information into my filtering process, I can improve the accuracy of my trial matching and provide more relevant recommendations to patients.

This led to a major refeactor inclduign additional types in my code, and also rate limiting. Nvidia API allows 2 free requests/min and I wwas making exactly 2 requests as well.

**Developer QoL**

Sometimes when I would get 502 errors, I had to open wrangler logs to debug. To speed it up, I just started propogating the error messages back to the frontend so I can see them in the browser and iterate faster. I also understand that this is not a good practice for production code, but I think it's fine for a take-home assignment.

**Potential Matches**

When some conditions are satisfied, a clinical trial is shown as a potential match

**Better UX**

I added in a loading bar that loads faster early and then slows down near the end to give the user a better sense of progress. I also added skeleton loaders for the results section to give an illusion of faster loading. While the user is waiting, I am also showing them some fun facts about clinical trials to keep them engaged. I also implemented a keyboard shortcut for submitting the transcript (Cmd/Ctrl + Enter). I also show a collapsible eligibility section for each trial to give the user more info. I also implemented a sample transcript drawer from the sidebar, so that the evaluators for the takehome do not need to generate their own transcripts to test the system.

**Model speed up**

Requests used to take ~2 mins. Cut it down to 30s on average by switching to a faster model.

** Assumptions and Limitations**
- Inclusion criteria is always defined before exclusion criteria.