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

Patient: Mostly. I missed a few days when I was traveling for work — I'm based in Phoenix, but I've been flying out almost every week. It's hard to keep a routine on the road.

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
    id: "knee-pain-orthopedics",
    title: "Knee Pain — Meniscus Evaluation",
    description: "Orthopedic consultation for medial knee pain with suspected meniscal tear",
    category: "Orthopedics",
    wordCount: "~350 words",
    transcript: `Doctor: Hi, I'm Dr. Nguyen. I understand you're having some knee trouble?

Patient: Yes, my left knee. I hurt it playing recreational soccer about three weeks ago. I planted my foot and twisted, and I heard a pop.

Doctor: That sound is always concerning. Was there immediate swelling?

Patient: Within a few hours, yes. It's gone down a lot, but it's still puffy.

Doctor: Any locking or clicking sensations — where the knee feels like it's getting stuck?

Patient: Yes, exactly. It catches sometimes when I go down stairs. And I can't fully straighten it.

Doctor: Any instability — a feeling like the knee might give way?

Patient: A little bit, yes.

Doctor: Let me examine you. Can you lie back for me? I'm going to flex and internally rotate the knee — tell me if this reproduces your pain.

Patient: Ow — yes, right there. That's the spot.

Doctor: McMurray's test is positive on the medial side. I'm also getting a positive Thessaly's test. Combined with your history — the twisting mechanism, the pop, joint line tenderness here on the medial side, and the mechanical symptoms — I have a high clinical suspicion for a medial meniscal tear.

Patient: Do I need surgery?

Doctor: Not necessarily, and not right away. I'm ordering an MRI to confirm the diagnosis and characterize the tear. Treatment depends on the type and location. Some tears, particularly peripheral tears with good blood supply, can heal with physical therapy and activity modification. Others — especially complex or bucket-handle tears causing locking — may benefit from arthroscopic surgery.

Patient: How long until I can play soccer again?

Doctor: That depends on the path we take. Conservative treatment typically means six to eight weeks minimum. Surgical repair, if needed, is generally three to six months. Let's get the MRI first and then have an informed conversation.

Patient: That makes sense. Can I still walk around in the meantime?

Doctor: Yes, stay as active as pain allows, avoid twisting movements, and ice it for twenty minutes a few times a day. I'll prescribe a short course of anti-inflammatories as well. We'll get the MRI scheduled this week.`,
  },
  {
    id: "skin-lesion-dermatology",
    title: "Suspicious Skin Lesion Evaluation",
    description: "Dermatology evaluation of an asymmetric pigmented lesion with biopsy recommendation",
    category: "Dermatology",
    wordCount: "~300 words",
    transcript: `Doctor: Hi, I'm Dr. Yuen. What brings you in today?

Patient: I have this mole on my back that my husband noticed has changed. It looks different than it did a year ago — darker, and the edges look uneven now.

Doctor: How long have you had the mole, and can you estimate how much it's changed?

Patient: I've had it for years. The change really happened over the last four or five months.

Doctor: Any itching, bleeding, or crusting?

Patient: It itched a couple of times recently.

Doctor: Any personal or family history of melanoma or skin cancer?

Patient: My mother had a basal cell carcinoma removed a few years ago.

Doctor: Okay. Let me take a look. Can you lean forward slightly? I'm using a dermatoscope to get a closer look.

[Pause for examination]

I'm seeing a lesion that is roughly 9 millimeters — so larger than a pencil eraser. It has asymmetry, an irregular border, and I'm seeing multiple shades — tan, dark brown, and one area with a bluish-gray hue. That last feature, combined with the rapid change you're describing, elevates my concern.

Patient: Is it melanoma?

Doctor: I can't diagnose without a biopsy, but this lesion has several features that warrant one. I'd like to do a shave or punch biopsy today — it's a quick in-office procedure with local anesthetic, and we'd have pathology results in about seven to ten days.

Patient: Yes, let's do it. I'd rather know.

Doctor: Absolutely the right call. While we're here, I'd also like to do a full skin check — given the family history and your concern, it's worthwhile to look at everything else.

Patient: Of course.

Doctor: We'll also talk about sun protection today. Whatever the biopsy shows, those habits matter. I'll see you back as soon as results are in.`,
  },
  {
    id: "migraine-neurology",
    title: "Chronic Migraine Consultation",
    description: "Neurology visit for frequent migraines with evaluation for preventive therapy",
    category: "Neurology",
    wordCount: "~400 words",
    transcript: `Doctor: Good morning. I'm Dr. Alvarez. I see you've been referred for migraines. Tell me about what you're experiencing.

Patient: I've been getting migraines since college, but over the last two years they've gotten much worse. I'm having them about 15 days a month now, sometimes more.

Doctor: That qualifies as chronic migraine — defined as 15 or more headache days per month. How long do individual attacks last?

Patient: Usually 12 to 24 hours if I don't treat them quickly. If I catch it early with sumatriptan it can be down to four or five hours.

Doctor: Do you have aura — visual changes, tingling, or speech problems before the headache?

Patient: Yes. I see zigzag lines in my vision for about 20 minutes before it hits.

Doctor: Classic visual aura. What are your main triggers?

Patient: Stress, skipping meals, bright lights, and hormonal — they're always worse around my period.

Doctor: How many days a week are you using the sumatriptan?

Patient: At least three or four days.

Doctor: That's important. Using acute treatments more than ten days a month can lead to medication overuse headache, which actually increases headache frequency in a vicious cycle. We need to address that. Given your frequency, you're a clear candidate for preventive therapy.

Options I'd recommend discussing: topiramate or valproate are classic options, though they have side effects. Amitriptyline is another. More recently, there's a newer class of preventives called CGRP antagonists — specifically medications like erenumab, given as a monthly injection — which are very well tolerated and have strong evidence for chronic migraine.

Patient: I've heard about those shots. Are they expensive?

Doctor: They can be, but most manufacturers have patient assistance programs, and many insurers cover them when other treatments haven't worked. We can work through that together. I'd like to start you on erenumab, and simultaneously I want you to start keeping a headache diary so we can track days and triggers.

Patient: What about the sumatriptan?

Doctor: Don't stop it abruptly, but we want to limit it to no more than ten days per month. I'll also write you a prescription for naproxen as an alternative on some days.

Patient: I've seen two other neurologists before — one here in Chicago and one downtown. This is the most thorough anyone's been with me about this. Thank you.

Doctor: Migraines are a real neurological condition and deserve real treatment. We'll have you back in six weeks to check in on the preventive.`,
  },
  {
    id: "prenatal-visit",
    title: "Prenatal Visit — 28 Weeks",
    description: "Third trimester OB visit with glucose screening review and birth plan discussion",
    category: "Obstetrics",
    wordCount: "~370 words",
    transcript: `Doctor: Hi, Sarah! Congratulations on making it to 28 weeks. How are you feeling?

Patient: Pretty good, mostly. More tired lately and my feet swell in the evenings, but I know that's normal.

Doctor: Swelling in the feet and ankles at this stage is very common. Are you noticing any swelling in your face or hands?

Patient: No, just the feet.

Doctor: Good — facial and hand swelling can sometimes signal a blood pressure issue, so it's always good to distinguish. Speaking of which, your blood pressure today is 118 over 72 — perfect. Let's talk about your glucose challenge test from last week.

Patient: Yes, I've been anxious about that.

Doctor: Your one-hour glucose was 168, which is above our threshold of 140. So I'm recommending a three-hour glucose tolerance test to confirm or rule out gestational diabetes.

Patient: That's scary. Does that mean I have it?

Doctor: Not necessarily — about 30 percent of people who fail the one-hour screen pass the three-hour. It's a screening tool, not a diagnosis. If the three-hour does confirm gestational diabetes, it's manageable with dietary changes and sometimes medication, and we'd monitor you and baby closely.

Patient: Okay. I'll try not to panic.

Doctor: That's the right approach. Now let's hear the heartbeat.

[Doppler used]

Strong, rhythmic — 148 beats per minute. Perfect. Fundal height is 27 centimeters, right on track. Baby is head-down, which is ideal at this stage.

Patient: Can we talk about the birth plan? I want to try for an unmedicated birth.

Doctor: Absolutely — and I fully support that goal. I'd recommend discussing it with our nursing team and with an anesthesiologist ahead of time so you understand your options if you change your mind during labor. Plans are good; flexibility is also a strength.

Patient: That makes sense. What's coming up next?

Doctor: Your three-hour GTT this week. At 32 weeks we'll do a growth ultrasound. You'll also start Group B strep screening around 36 weeks. Any questions today?

Patient: No, I think I'm good. Thank you.

Doctor: You're doing great. See you in four weeks.`,
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
  {
    id: "rheumatoid-arthritis-biologic",
    title: "Rheumatoid Arthritis — Biologic Escalation",
    description: "Rheumatology visit for RA inadequately controlled on methotrexate with biologic therapy discussion",
    category: "Rheumatology",
    wordCount: "~800 words",
    transcript: `Doctor: Good morning, Ms. Chen. Please sit down. I've reviewed your labs from last week and I want to go through everything carefully today. How have you been feeling since your last visit three months ago?

Patient: Honestly, not much better. The morning stiffness is still there — it takes almost two hours before I feel like I can use my hands properly. And my knuckles are swollen again, especially on the right hand.

Doctor: I'm sorry to hear that. Are the joints painful throughout the day, or mainly in the morning?

Patient: Mostly mornings, but by the afternoon if I do anything repetitive — typing, cooking — they flare up again.

Doctor: How many joints would you say are actively swollen or tender right now?

Patient: Maybe six or seven. Both hands, and my right wrist has been bothering me too.

Doctor: Let me take a look. [Examination] I'm counting swelling in the second and third MCPs bilaterally, both PIPs on the right, and definite synovitis at the right wrist. That matches what you're describing. Your DAS28-CRP today is 4.8, which puts you in moderate to high disease activity — and that's after a year on methotrexate at the maximum dose of 20 milligrams per week.

Patient: Does that mean the methotrexate isn't working?

Doctor: It means it's not working well enough. You've been on full-dose methotrexate for twelve months and we're still seeing active synovitis and elevated inflammatory markers. Your CRP is 3.2 and your ESR is 48 — both elevated. And your RF and anti-CCP were strongly positive when we diagnosed you, which are markers of more aggressive disease. At this point, I think you need a change in your treatment strategy.

Patient: What are the options?

Doctor: The next step is to add a biologic medication. These are more targeted therapies — they work by blocking specific parts of the immune pathway that drive inflammation in RA. The most established class is called TNF inhibitors — drugs like adalimumab or etanercept. They're given either as a weekly self-injection or every other week, and they have decades of safety and efficacy data. Most patients on methotrexate plus a TNF inhibitor achieve significantly better disease control than on methotrexate alone.

Patient: Are there other options?

Doctor: Yes. Another class is IL-6 receptor inhibitors — tocilizumab is the main one. These are particularly useful in patients with prominent fatigue and persistently elevated CRP. JAK inhibitors are another oral option — tofacitinib or upadacitinib — though we tend to use those in specific situations. Given your profile, I'd lean toward a TNF inhibitor first, keeping the methotrexate on board. The combination has the strongest long-term data for preventing joint damage.

Patient: I've read that biologics can increase your risk of infections. Is that true?

Doctor: Yes, there is a modestly increased risk, particularly for respiratory infections. Before we start, we'll do a tuberculosis screening test and check your hepatitis B status. You'll also want to make sure your vaccinations are current — we'll give you any that are missing before starting. Most people tolerate these medications very well, and the benefits of controlling active inflammation outweigh the risks of undertreating.

Patient: How long before I'd see a difference?

Doctor: Many patients notice meaningful improvement within four to six weeks. We'd have you back in three months for a full reassessment. If you're in low disease activity or remission at that point, we'd continue. If not, we'd consider switching to a different biologic class.

Patient: What about clinical trials? My sister mentioned that was an option.

Doctor: It's a great question. There are several active trials right now for RA patients with inadequate response to methotrexate — some are looking at novel combinations, others at biomarker-guided therapy selection. The University of Washington Medical Center here in Seattle is actually a site for a few of them. I can have our research coordinator reach out to you with specifics. Participating is completely voluntary and wouldn't delay starting standard treatment if you decide trials aren't for you.

Patient: I'd like to learn more about that.

Doctor: Absolutely. I'll order the TB test and hepatitis panel today, and we'll get a baseline chest X-ray. I'll also submit the prior authorization for adalimumab — insurance approval can take one to two weeks. In the meantime, please have your vaccinations reviewed at your next primary care visit.

Patient: Should I adjust the methotrexate dose?

Doctor: No — keep it at 20 milligrams per week with your folic acid. We want to maintain that backbone. Any new symptoms since the last visit — chest tightness, rashes, mouth sores?

Patient: A couple of mouth sores, but they cleared on their own. Nothing else.

Doctor: Mouth sores can be a methotrexate side effect — let's confirm your folic acid is 1 milligram daily. That's correct?

Patient: Yes, every day.

Doctor: Good. I'll send everything to your portal. Come back in three months, or sooner if you have a significant flare or any new symptoms. Any other questions?

Patient: No — I feel like I finally have a clear plan. Thank you, doctor.

Doctor: That's what we're here for. Talk soon.`,
  },
];
