# DeepScribe Takehome for Clinical Trial Matching

This software takes in a transcript of a doctor-patient conversation and matches patients to relevant recruiting clinical trials using LLM extraction and the ClinicalTrials.gov API. To speed up my development of this take-home, I bootstrapped the project with npx create-next-app, and also used Claude to set up a basic app where I can paste a clinical transcript and that gets sent to an API route for processing. I then asked it to implement an integration with Nvidia's free AI inference endpoint. Everything after that point is my own work.

High level architecture:
- Frontend: A simple Next.js app with a textarea for pasting the transcript and a button to submit it for analysis.
- Backend: An API route that is deployed using Cloudflare Workers (similar to AWS Lambda) that handles the transcript submission. It has three main stages:
  1) Extracting a structured patient profile from the unstructured transcript using Nvidia's LLM inference API.
  2) Fetching and filtering relevant clinical trials from ClinicalTrials.gov based on the extracted patient profile.
  3) Screening the eligibility of the patient for the recommended trials using the eligibility criteria provided in the trial data.

# Local Build and Run Instructions

The app is currently deployed at: [https://aditya-prakash.me/deepscribe-takehome/](https://aditya-prakash.me/deepscribe-takehome/)

1. Clone the repository and navigate to the project directory.
2. Create a `.env.local` file in the root of the project and add the following:
```
NEXT_PUBLIC_API_URL=https://deepscribe-api.aditya-prakash.workers.dev
```
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and go to `http://localhost:3000` to access the app.

This will automatically query the deployed backend API route on Cloudflare Workers when you submit a transcript, so there is no need to run the backend locally. If you want to run the backend locally, you can use `wrangler dev` from the `api` directory, but keep in mind that you will need to change the frontend API URL to point to your localhost, and will also need to set up an API key from Nvidia (using `wrangler secret put NVIDIA_API_KEY`). I am not including my API key in the repo for security reasons, but you can get your own free API key from [Nvidia's website](https://build.nvidia.com/models).

# Craftsmanship

## Pipeline simplicity

When Claude finished the backend integration with Nvidia, it produced a super messy codebase. It had a different file for extracting a patient profile, a different file for building the clinicaltrials.gov query, and a different file for parsing and scoring the results (even though I didn't need scoring). Each file had multiple functions, and there was a lot of back-and-forth between them which didn't really make sense. I found it very difficult to understand the flow of data and logic through the system.

I first refactored this pipeline to be easier to follow. I consolidate everything into two steps at first. 
1) Extracting conditions from the transcript,
2) Fetching trials based on the extracted conditions from ClinicalTrials.gov

Later on, I added a third step for eligibility screening based on eligibilityModule from each extracted trial.

## Leveraging clinicaltrials.gov API to its best extent

To effectively match patients with clinical trials, I first read through the [API documentation](https://clinicaltrials.gov/data-api/api) and made a sample request using Postman to see what the response looks like and what data points I can use for filtering. Two fields stood out to me as particularly useful for filtering: "condition" and "keywords". The "condition" field provides a standardized way to identify the medical conditions that the trial is targeting, while the "keywords" field can contain additional relevant information about the trial that may not be captured in the "condition" field. By using these fields effectively, I can ensure that I'm retrieving trials that are more likely to be relevant to the patient's specific medical situation.

In an early implementation, I also had a filtering step that took the results returned by the clinicaltrials.gov API and then filtered them. This meant that I was doing extra work on my backend. After further reading of the docs and parameters that the clinical trial API supports, I realized that I could instead use the API's built-in query parameters to do the filtering for me using `filter.advanced` parameter, which simplified my code and reduced unnecessary processing. I realized I didn't have to do any filtering on my end because the API already supports powerful filtering capabilities, so I just needed to structure my query correctly to leverage those features.

After reading through the API response from the /studies endpoint, I saw that there is a key in the JSON called "Eligibility Module". My initial eligibility check only relied on keyword matching + age, sex, and location filtering (which was later offloaded to the API as it supports advanced filtering). However, I realized that the "Eligibility Module" contains a lot of useful information about the inclusion and exclusion criteria for the trial, which can be used to further filter the trials and ensure that they are a good match for the patient. By incorporating this information into my filtering process, I can improve the accuracy of my trial matching and provide more relevant recommendations to patients.

To implement this, I first parse the inclusion and exclusion criteria from the "Eligibility Module" for each trial. Then, I aggregate all the criteria across the trials and send them to the LLM along with the transcript for screening. The LLM then determines whether the patient meets the inclusion criteria and does not meet any of the exclusion criteria for each trial, and returns a boolean value indicating eligibility. This allows me to provide more accurate and personalized trial recommendations to patients based on their specific medical profiles.

Throughout this process, I had to guide Claude through the API. It also did not understand the Essie syntax for queries and filtering, so I had to explain the same to it. It was using all the extracted conditions as keywords itself rather than relying on specific fields like query.cond and query.keywords. Claude was also using `+` operator for filtering rather than using `OR` statements which is what the API expects. However, after some guidance and explanation, I was able to get it to generate the correct queries and use the API effectively.

## Better UX

I added in a loading bar that loads faster early and then slows down near the end to give the user a better sense of progress. I also added skeleton loaders for the results section to give an illusion of faster loading. While the user is waiting, I am also showing them some fun facts about clinical trials to keep them engaged. I also implemented a keyboard shortcut for submitting the transcript (Cmd/Ctrl + Enter). I also implemented a sample transcript drawer from the sidebar, so that the evaluators for the takehome do not need to generate their own transcripts to test the system.

# Assumptions and Limitations
- Due to small size of compute, I am only fetching 1 page (which has at most 10 trials) of results from the clinicaltrials.gov API. In a production system, I would want to fetch more results and implement pagination.
- The input is a reasonably complete doctor-patient transcript. In a production system, I would want to implement some error handling and edge case handling for incomplete or malformed transcripts.
- Eligibility text has recognizable Inclusion Criteria / Exclusion Criteria headers and bullet-like formatting. Eligibility parsing is format-sensitive. If a trial’s criteria are written in unusual prose or without recognizable headers, parsing can fail and that trial is treated as not parseable.
- The system depends on NVIDIA’s API twice, so rate limits/timeouts can break extraction or leave trials unscreened. Longer transcripts are more likely to hit timeouts. In a production system, I would want to implement some retry logic and better error handling for these cases. I would also want to use a paid LLM service that does not give 2 req/min rate limits and has faster response times.