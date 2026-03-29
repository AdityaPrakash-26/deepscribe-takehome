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
    id: "cap-follow-up",
    title: "Community-Acquired Pneumonia — Follow-up",
    description: "Primary care follow-up for a 52-year-old with resolved mild CAP and stage 1 hypertension, with discussion of cardiovascular risk and dietary intervention trial",
    category: "Infectious Disease",
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
    id: "chest-pain-cardiology",
    title: "Chest Pain Evaluation",
    description: "Cardiology workup for a middle-aged patient presenting with exertional chest pain",
    category: "Cardiology",
    wordCount: "~450 words",
    transcript: `Doctor: Good afternoon, Ms. Rivera. I'm Dr. Okafor, your cardiologist. Your primary care physician referred you for chest pain. Can you tell me more about what you've been experiencing?

Patient: Sure. About three weeks ago I started getting this pressure in my chest when I climb stairs or walk fast. It goes away when I stop and rest.

Doctor: Can you describe the pressure — is it sharp, dull, tight?

Patient: Tight, like something is squeezing. It sometimes radiates into my left shoulder.

Doctor: How long does it last?

Patient: Maybe two or three minutes. Then it just fades.

Doctor: Any shortness of breath, sweating, or nausea with the episodes?

Patient: Yes, I get a little short of breath. No nausea, but I do feel kind of clammy.

Doctor: Has this ever happened at rest?

Patient: Once, last week, when I woke up in the middle of the night. That scared me.

Doctor: That's important information. Any family history of heart disease?

Patient: My father had a heart attack at 58. I'm 54.

Doctor: And do you have high blood pressure, diabetes, or high cholesterol?

Patient: High blood pressure and cholesterol. I'm on lisinopril and atorvastatin.

Doctor: Do you smoke?

Patient: I quit seven years ago. Smoked for about 15 years before that.

Doctor: Let me review your EKG from today. I see some ST-segment changes that concern me. Your resting EKG is not completely normal. Combined with your symptoms — exertional chest pressure radiating to the shoulder, relieved by rest, now occurring at rest — I'm very concerned about unstable angina.

Patient: Is that serious?

Doctor: It can be. It means your heart may not be getting enough blood flow, potentially from a narrowed artery. I want to act on this quickly. I'm going to admit you to the hospital today for monitoring and further workup. We'll do a stress test and likely a coronary angiogram — a procedure where we inject dye into the heart arteries to see if there are any blockages.

Patient: Will I need surgery?

Doctor: I don't want to get ahead of ourselves, but if we find a significant blockage, options include a stent — a small device we can place during the angiogram — or in some cases bypass surgery. But let's first get the imaging.

Patient: Okay. I'm frightened but I understand.

Doctor: You did exactly the right thing coming in. We'll take good care of you. Do you have someone who can meet you here?

Patient: Yes, I'll call my husband right now. We're in Houston so he can be here within the hour.

Doctor: Good. The admitting team will be here shortly. We'll talk again once you're settled.`,
  },
  {
    id: "pediatric-well-visit",
    title: "4-Year-Old Well Child Visit",
    description: "Routine well-child exam with developmental screening and vaccine review",
    category: "Pediatrics",
    wordCount: "~380 words",
    transcript: `Doctor: Hi there! And who's this big kid? Is that Lena?

Parent: Say hi, Lena. Yes, she just turned four last week.

Doctor: Happy belated birthday, Lena! Are you four now?

Patient (child): Four and a half.

Doctor: Oh, four and a half — even better! I'm Dr. Park. Can I listen to your heart with my stethoscope? It's not cold, I promise.

Patient (child): Okay.

Doctor: Perfect. So how's everything been going at home? Any concerns?

Parent: Mostly good. She's been healthy. My main question is about her speech — some people say they can't always understand her.

Doctor: That's worth looking at. At four, we expect most strangers to understand about 75 to 80 percent of what a child says. Tell me — is she using full sentences?

Parent: Yes, full sentences, lots of talking. She knows all her letters and can count to 20.

Doctor: Great. Can you tell me your full name, Lena?

Patient (child): Lena Marie Santos.

Doctor: Excellent! And how old are you?

Patient (child): Four and a half.

Doctor: She's communicating very well. The articulation issues you're describing — certain sounds being harder to produce — can be completely normal at this age. Sounds like "r," "l," and "th" often don't fully develop until age five or six. That said, I'd recommend a speech and language screening just to get a baseline. Nothing urgent, but it's a good resource.

Parent: That makes me feel better.

Doctor: Her height is in the 60th percentile, weight in the 55th — perfectly proportionate and on track. Vision screening today was normal. Hearing passed. Her developmental milestone checklist looks great — she's meeting all four-year markers.

Vaccines today: she's due for her DTaP, MMR, varicella, and IPV boosters. These are the last doses of this series until adolescence.

Parent: Any side effects to expect?

Doctor: Possibly a sore arm or low-grade fever for a day or two. Ibuprofen or acetaminophen is fine if needed. If she develops a fever above 104°F or anything that concerns you, call us.

Parent: Got it. Thank you.

Doctor: She's doing wonderfully. We'll see her again at five for her kindergarten checkup.`,
  },
  {
    id: "csssi-diabetic-foot",
    title: "Diabetic Foot Cellulitis — Hospital Admission",
    description: "Infectious disease consult for a hospitalized diabetic patient with complicated lower limb skin and soft tissue infection requiring IV antibiotics",
    category: "Infectious Disease",
    wordCount: "~380 words",
    transcript: `Doctor: Ms. Brennan, I'm Dr. Adeyemi from infectious disease. I've been asked to review your left leg. Can you tell me how this started?

Patient: About a week ago I noticed some redness on my left shin. I've had type 2 diabetes for fifteen years and my feet and legs have had problems before. I thought it would settle down but it got much worse. My leg is swollen, hot to the touch, and there's been discharge from a wound on my ankle.

Doctor: How long have you had the ankle wound?

Patient: Maybe three weeks. Started as a small blister. I didn't feel much pain because of my neuropathy.

Doctor: Any fever or chills?

Patient: Yes, I had a temperature of 38.4 this morning and I've been shivering on and off since yesterday.

Doctor: Let me examine you. [Pause] There's significant erythema extending from mid-shin to the foot, marked swelling, warmth, and a 2-centimeter ulcer on the medial malleolus with purulent discharge. I'm probing the wound — I can feel what appears to be deeper soft tissue involvement beyond the skin layer. I'm sending swabs for culture and MRSA screening now. We'll need an MRI to assess the depth of infection and rule out osteomyelitis.

Patient: Could it be in the bone?

Doctor: We need to rule that out — that's why we're doing the MRI today. I'm admitting you and starting IV vancomycin for MRSA coverage, plus IV piperacillin-tazobactam for broader gram-negative cover. We're also getting vascular surgery and the wound care team involved — you'll need bedside debridement of that wound today.

Patient: Am I going to lose my leg?

Doctor: We're going to do everything we can to prevent that. Getting you on IV antibiotics promptly and managing this wound properly is critical. Any drug allergies?

Patient: No allergies. I take metformin 500mg twice daily, lisinopril 5mg, and atorvastatin 20mg.

Doctor: We'll hold the metformin while you're inpatient. Are you currently enrolled in any other research study?

Patient: No.

Doctor: Good. We'll review labs daily and adjust antibiotics based on culture results. Likely five to seven days inpatient depending on MRI findings and your response. Any questions?

Patient: Just — please do whatever it takes. Thank you.`,
  },
];
