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
    id: "common-cold",
    title: "Upper Respiratory Infection",
    description: "Routine visit for cold symptoms in a young adult",
    category: "Primary Care",
    wordCount: "~200 words",
    transcript: `Doctor: Good morning. What brings you in today?

Patient: Hi, I've been feeling pretty rough for the past three days. Sore throat, runny nose, and I had a low fever yesterday.

Doctor: I'm sorry to hear that. Any cough or difficulty breathing?

Patient: A little bit of a cough, but nothing bad. Breathing is fine.

Doctor: Any recent travel or exposure to sick contacts?

Patient: No travel. My six-year-old was sick last week, so probably caught it from her.

Doctor: That makes sense. Let me take a look. Can you open your mouth wide for me? Say "ahh."

Patient: Ahh.

Doctor: I see some mild redness in the throat, but no pus or significant swelling. Ears look clear. Lungs sound good — nice and clear. No lymph node swelling.

Patient: That's a relief. Do I need antibiotics?

Doctor: No, this looks like a straightforward viral upper respiratory infection — essentially a common cold. Antibiotics won't help with a virus. I'd recommend rest, plenty of fluids, and over-the-counter acetaminophen or ibuprofen for the fever and sore throat.

Patient: How long will this last?

Doctor: Typically seven to ten days. Come back or call us if your fever goes above 102°F, symptoms worsen significantly, or you develop ear pain or a severe headache.

Patient: Got it. Thank you.

Doctor: Take care. Feel better soon.`,
  },
  {
    id: "diabetes-management",
    title: "Type 2 Diabetes Follow-up",
    description: "Quarterly diabetes management visit with A1C review and medication adjustment",
    category: "Endocrinology",
    wordCount: "~500 words",
    transcript: `Doctor: Good afternoon, Mr. Patel. Come on in. How have you been feeling since your last visit?

Patient: Honestly, not great. I've been exhausted a lot, and my home blood sugar readings have been all over the place.

Doctor: I can see from your chart that your A1C came back at 7.8% — up from 7.2% last quarter. Let's talk about what's been going on. Have you been taking your metformin consistently?

Patient: Mostly. I missed a few days when I was traveling for work. It's hard to keep a routine on the road.

Doctor: I understand. Travel can definitely disrupt things. How about your diet?

Patient: That's probably where I'm struggling most. I've been eating out a lot for work dinners. Lots of carbs, bigger portions than usual.

Doctor: I'm seeing some pretty significant post-meal spikes in your glucose log here — values up around 240 to 260 after dinner. What does a typical dinner look like when you're traveling?

Patient: Usually a restaurant meal. Pasta, bread, sometimes a glass of wine.

Doctor: That explains the spikes. Refined carbohydrates digest quickly and cause sharp glucose increases. Let's talk about what we can do. First, I want to review your feet — any numbness, tingling, or wounds?

Patient: No, feet feel fine.

Doctor: Good. Eyes checked recently?

Patient: Due for my annual eye exam next month.

Doctor: Please make sure you keep that appointment — diabetic eye exams are important. Let me check your blood pressure. That's 134 over 82 — slightly elevated, so we'll keep an eye on that too.

Now, for your diabetes management, I think it's time we add a medication to help with those post-meal spikes and potentially aid with some weight loss. I'd like to start you on a GLP-1 receptor agonist — specifically semaglutide. It's a weekly injection, very well tolerated, and has strong evidence for both glucose control and cardiovascular protection.

Patient: An injection? I'm not great with needles.

Doctor: The needle is very small — most patients find it much easier than they expected. And it's only once a week. We'll start at a low dose and increase gradually to minimize any nausea.

I also want to refer you to our registered dietitian, especially given your travel situation. She can help you with practical strategies for eating out and keeping your glucose stable.

Patient: That sounds helpful. What about exercise?

Doctor: Aim for 150 minutes of moderate activity per week — even brisk walking counts. Even a 10-minute walk after meals can significantly blunt post-meal glucose spikes.

I'm ordering a comprehensive metabolic panel and lipid panel today. We'll review those at your next visit in eight weeks. Any other questions?

Patient: What are the warning signs of low blood sugar I should watch for with the new medication?

Doctor: Semaglutide by itself has a low risk of causing hypoglycemia. Symptoms to watch for are shakiness, sweating, confusion, or feeling faint. If that happens, have 15 grams of fast-acting carbs — like four glucose tablets or a small glass of juice. Call us if it doesn't resolve. Any other concerns?

Patient: No, I think that covers it. Thank you, doctor.

Doctor: We'll get through this together. See you in eight weeks.`,
  },
  {
    id: "lung-cancer-oncology",
    title: "NSCLC Oncology Consultation",
    description: "New patient consultation for Stage IIIA non-small cell lung cancer with treatment planning",
    category: "Oncology",
    wordCount: "~1100 words",
    transcript: `Doctor: Good morning, Mr. Thompson. I'm Dr. Reyes, your thoracic oncologist. I've reviewed the records sent over from Dr. Kim. I know you've been through a lot of tests these past few weeks, and I want to make sure we go through everything carefully today. How are you feeling?

Patient: Nervous, honestly. My wife is here with me — is it okay if she stays?

Doctor: Absolutely, please. It's helpful to have support. Let's start from the beginning so we're all on the same page. Can you tell me when you first noticed something was wrong?

Patient: About three months ago I developed this cough that just wouldn't go away. I figured it was allergies. Then about six weeks ago I coughed up a little blood. That's when I called Dr. Kim.

Doctor: Any weight loss or fatigue?

Patient: Yes, both. I've lost about 12 pounds without trying, and I'm tired all the time. I used to walk my dog two miles every morning. Now I can barely make it around the block.

Doctor: I understand. And your smoking history?

Patient: I smoked a pack a day for 30 years. Quit about five years ago.

Doctor: Good for you for quitting. That takes real commitment. Now, let me walk you through what the tests have shown. The CT scan of your chest showed a 4.2-centimeter mass in the right upper lobe, and there is involvement of the right mediastinal lymph nodes. The PET scan confirmed metabolic activity in both areas but did not show any spread to other organs. Very importantly, the brain MRI came back clear — no evidence of brain metastases.

Patient: That's good news, right?

Doctor: Yes, that's meaningful. The bronchoscopy with biopsy confirmed the diagnosis — adenocarcinoma, which is a type of non-small cell lung cancer. Your pulmonary function tests show adequate lung function to tolerate treatment. Based on all of this, you have Stage IIIA non-small cell lung cancer.

Patient: What does Stage IIIA mean exactly?

Doctor: Staging describes how far the cancer has spread. Stage IIIA means the cancer is locally advanced — it's in your lung and the nearby lymph nodes in your chest, but it hasn't spread to distant organs like the liver, bones, or brain. That is critically important because Stage IIIA is potentially curable.

Wife: Potentially curable — so there's a real chance?

Doctor: Yes, a real chance. I want to be honest with you — I can't promise outcomes, but Stage IIIA is treated with curative intent. Now, there are a few more test results I'm waiting on that will shape our exact treatment approach. The molecular testing panel — looking at EGFR, ALK, and ROS1 mutations, as well as your PDL-1 expression level — came back showing PDL-1 at 60%. That's actually very significant.

Patient: What does PDL-1 mean?

Doctor: PDL-1 is a protein on tumor cells. A high PDL-1 score — like yours at 60% — means your immune system may respond well to immunotherapy, specifically a drug called pembrolizumab. We're still awaiting EGFR and ALK results, which will arrive within the week. Those results could open up additional targeted therapy options.

Patient: So what's the treatment plan?

Doctor: Based on current evidence, the standard approach for Stage IIIA NSCLC is concurrent chemoradiation — meaning chemotherapy and radiation therapy given simultaneously. This is typically platinum-based chemotherapy, most commonly cisplatin combined with etoposide. After completing chemoradiation, patients with PDL-1 expression like yours are candidates for consolidation immunotherapy with durvalumab for up to 12 months. This combination has shown significant improvement in survival outcomes.

I also want to discuss clinical trial options with you. Given your PDL-1 score, you may be eligible for trials that are testing enhanced immunotherapy combinations or novel treatment sequencing strategies. Participation is entirely voluntary, but trials offer access to cutting-edge treatments and contribute to knowledge that helps future patients. I'll have our trial coordinator reach out to you with specifics.

Patient: How long does treatment take?

Doctor: The concurrent chemoradiation phase typically runs six weeks. You'll receive radiation five days a week and chemotherapy on specific days during that period. After a short recovery, you'd start the maintenance immunotherapy, which is an infusion every four weeks.

Patient: What are the side effects I should expect?

Doctor: The main side effects of chemoradiation for lung cancer include fatigue, esophagitis — which causes difficulty swallowing — and some lung inflammation called pneumonitis. We monitor closely for these. Pembrolizumab can cause immune-related side effects, which are less common but can affect various organs. We'll watch for these carefully with regular check-ins and blood work.

Wife: Is he going to be able to work during treatment?

Doctor: Many patients continue to work at least part-time during the first phase. Fatigue is real, but it varies. I'd encourage you to communicate with your employer early about the possibility of reduced hours, particularly in weeks three through five, when side effects can peak.

Patient: What happens if I don't do treatment?

Doctor: Without treatment, Stage IIIA NSCLC typically progresses over months. I would strongly recommend treatment — the combination we're discussing has significantly improved outcomes over the last decade. But this is your decision, and I respect your right to ask every question you need to.

Patient: I want to fight this. I have grandkids.

Doctor: That is excellent motivation, and we're going to do everything we can. Here's the plan for the next two weeks: Molecular results will be back within five to seven days — I'll call you personally when they're in. Your case will be reviewed at our multidisciplinary tumor board next Tuesday, where thoracic surgery, radiation oncology, and pulmonology will all weigh in. I'd like to schedule port placement for next week so you're ready to start chemotherapy. We're targeting treatment start in approximately two weeks.

Patient: Is there anything I should do in the meantime?

Doctor: A few things. Make sure you're eating well and staying as active as tolerable — your strength going into treatment matters. Avoid smoking entirely. Let us know if your breathing gets worse, if you develop new bone pain, or significant headaches. And please don't hesitate to call our nurse navigator — her number is on this card — with any questions between now and your next appointment.

Wife: Thank you for explaining everything so clearly. We really appreciate it.

Doctor: Of course. You're not facing this alone. We have a strong team, and we're with you every step of the way. Do you have any other questions before we wrap up?

Patient: Not right now. I think I need to let it all sink in.

Doctor: That's completely understandable. Take your time. We'll be in touch very soon.`,
  },
];
