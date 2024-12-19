export const q = {
  questions: [
    {
      questionNo: 1,
      question:
        "A 68-year-old male with a history of hypertension presents with palpitations, irregular pulse, and shortness of breath. An ECG shows absent P waves and irregularly irregular QRS complexes.",
      options: [
        "Atrial fibrillation",
        "Atrial flutter",
        "Ventricular tachycardia",
        "Supraventricular tachycardia",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 2,
      question:
        "A 74-year-old woman presents with palpitations and an 'irregularly irregular' heartbeat noted on examination.",
      options: [
        "Atrial fibrillation",
        "Sinus arrhythmia",
        "Heart block",
        "Premature ventricular contractions",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 3,
      question:
        "A patient presents to the emergency room with sudden onset palpitations and dizziness. ECG reveals absence of P waves before QRS complexes.",
      options: [
        "Wolff-Parkinson-White Syndrome",
        "Atrial fibrillation",
        "Multifocal atrial tachycardia",
        "Junctional tachycardia",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 4,
      question:
        "A patient is found to have an irregularly irregular pulse. ECG shows chaotic atrial activity, and the absence of discrete P waves.",
      options: [
        "Ventricular fibrillation",
        "Atrial flutter",
        "Atrial fibrillation",
        "Ventricular tachycardia",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 5,
      question:
        "A 65-year-old patient with a history of mitral stenosis presents with palpitations and fatigue. His ECG lacks discernible P waves and displays irregular R-R intervals.",
      options: [
        "Atrial fibrillation",
        "Atrial flutter",
        "First-degree AV block",
        "Sick sinus syndrome",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 6,
      question:
        "A 55-year-old female experiencing palpitations and dizziness. Examination reveals an irregularly irregular pulse. ECG is suggestive of",
      options: [
        "Atrial flutter",
        "Long QT syndrome",
        "Atrial fibrillation",
        "Ventricular fibrillation",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 7,
      question:
        "An elderly patient presents with palpitations and an absence of identifiable P waves on ECG.",
      options: [
        "Atrial fibrillation",
        "Second-degree AV block",
        "Atrial flutter",
        "Supraventricular tachycardia",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 8,
      question:
        "A 58-year-old male experiences sudden palpitations during exertion. ECG shows variable rate with no visible P waves.",
      options: [
        "Atrial flutter",
        "Sinus tachycardia",
        "Atrial fibrillation",
        "Ventricular tachycardia",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 9,
      question:
        "A patient with a history of heart disease presents with an 'irregularly irregular' pulse. An ECG confirms absence of P waves.",
      options: [
        "Atrial flutter",
        "Ventricular tachycardia",
        "Atrial fibrillation",
        "Bundle branch block",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 10,
      question:
        "A 70-year-old man presents with palpitations and lightheadedness. His ECG shows no discernible P waves and an irregular rhythm.",
      options: [
        "Atrial flutter",
        "Atrial fibrillation",
        "Sinus bradycardia",
        "Ventricular fibrillation",
      ],
      answer: "Atrial fibrillation",
      questionStyle: "quickDiagnosis",
    },
    {
      questionNo: 11,
      question:
        "Match the type of atrial fibrillation with its characteristic ECG finding.",
      questionStyle: "matchTheMicrobe",
      microbes: [
        {
          id: "A",
          name: "Paroxysmal Atrial Fibrillation",
        },
        {
          id: "B",
          name: "Persistent Atrial Fibrillation",
        },
        {
          id: "C",
          name: "Permanent Atrial Fibrillation",
        },
        {
          id: "D",
          name: "Lone Atrial Fibrillation",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Irregularly irregular rhythm, resolves within 7 days without intervention",
        },
        {
          id: 2,
          name: "Continuous arrhythmia that requires medical intervention to terminate",
        },
        {
          id: 3,
          name: "Ongoing long-term arrhythmia, intervention does not restore normal rhythm",
        },
        {
          id: 4,
          name: "Occurs in younger individuals without heart disease",
        },
      ],
      correctMatches: {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
      },
    },
    {
      questionNo: 12,
      question:
        "Match the condition with its typical presentation in atrial fibrillation.",
      questionStyle: "matchTheMicrobe",
      microbes: [
        {
          id: "A",
          name: "Hypertension-related AF",
        },
        {
          id: "B",
          name: "Mitral valve AF",
        },
        {
          id: "C",
          name: "Holiday heart syndrome",
        },
        {
          id: "D",
          name: "Intravascular thrombus formation",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Associated with mitral stenosis or regurgitation",
        },
        {
          id: 2,
          name: "AF occurring after ingestion of large amounts of alcohol",
        },
        {
          id: 3,
          name: "Common in patients with longstanding high blood pressure",
        },
        {
          id: 4,
          name: "A complication of atrial fibrillation leading to stroke",
        },
      ],
      correctMatches: {
        A: 3,
        B: 1,
        C: 2,
        D: 4,
      },
    },
    {
      questionNo: 13,
      question:
        "Match the risk factor with the corresponding mechanism by which it contributes to atrial fibrillation.",
      questionStyle: "matchTheMicrobe",
      microbes: [
        {
          id: "A",
          name: "Hypertension",
        },
        {
          id: "B",
          name: "Hyperthyroidism",
        },
        {
          id: "C",
          name: "Obesity",
        },
        {
          id: "D",
          name: "Heart failure",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Increases atrial size and pressure",
        },
        {
          id: 2,
          name: "Leads to increased metabolic demand and tachycardia",
        },
        {
          id: 3,
          name: "Leads to left atrial enlargement",
        },
        {
          id: 4,
          name: "Disturbs cardiac electrophysiology",
        },
      ],
      correctMatches: {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
      },
    },
    {
      questionNo: 14,
      question: "Match the type of atrial fibrillation with its description.",
      questionStyle: "matchTheMicrobe",
      microbes: [
        {
          id: "A",
          name: "Acute atrial fibrillation",
        },
        {
          id: "B",
          name: "Chronic atrial fibrillation",
        },
        {
          id: "C",
          name: "Nonvalvular atrial fibrillation",
        },
        {
          id: "D",
          name: "AF with rapid ventricular rate",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Short duration, can convert spontaneously or require treatment",
        },
        {
          id: 2,
          name: "Lasts ≥ 6 months, involves structural cardiac conditions",
        },
        {
          id: 3,
          name: "AF occurring in absence of rheumatic mitral stenosis or prosthetic valve",
        },
        {
          id: 4,
          name: "Associated with dangerously fast beating of the heart",
        },
      ],
      correctMatches: {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
      },
    },
    {
      questionNo: 15,
      question:
        "Match the treatment strategy with its purpose for managing atrial fibrillation.",
      questionStyle: "matchTheMicrobe",
      microbes: [
        {
          id: "A",
          name: "Rate control",
        },
        {
          id: "B",
          name: "Rhythm control",
        },
        {
          id: "C",
          name: "Anticoagulation",
        },
        {
          id: "D",
          name: "Catheter ablation",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Maintaining normal heart rate",
        },
        {
          id: 2,
          name: "Restoring sinus rhythm",
        },
        {
          id: 3,
          name: "Preventing thromboembolic events",
        },
        {
          id: 4,
          name: "Destruction of abnormal tissue causing arrhythmia",
        },
      ],
      correctMatches: {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
      },
    },
    {
      questionNo: 16,
      question:
        "Match the anticoagulant with its mechanism of action in atrial fibrillation.",
      questionStyle: "matchTheMicrobe",
      microbes: [
        {
          id: "A",
          name: "Warfarin",
        },
        {
          id: "B",
          name: "Rivaroxaban",
        },
        {
          id: "C",
          name: "Dabigatran",
        },
        {
          id: "D",
          name: "Apixaban",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Vitamin K antagonist",
        },
        {
          id: 2,
          name: "Factor Xa inhibitor",
        },
        {
          id: 3,
          name: "Direct thrombin inhibitor",
        },
        {
          id: 4,
          name: "Factor Xa inhibitor",
        },
      ],
      correctMatches: {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
      },
    },
    {
      questionNo: 17,
      question:
        "Match the clinical presentation of atrial fibrillation with its underlying cause.",
      questionStyle: "matchTheMicrobe",
      microbes: [
        {
          id: "A",
          name: "Ischemic stroke",
        },
        {
          id: "B",
          name: "Heart failure",
        },
        {
          id: "C",
          name: "Syncope",
        },
        {
          id: "D",
          name: "Palpitations",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Thromboembolism from left atrial appendage",
        },
        {
          id: 2,
          name: "Reduced cardiac output due to arrhythmia",
        },
        {
          id: 3,
          name: "Impaired blood flow to brain during arrhythmia",
        },
        {
          id: 4,
          name: "Rapid heart rate and irregular rhythm",
        },
      ],
      correctMatches: {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
      },
    },
    {
      questionNo: 18,
      question:
        "Match the identifiable risk factor for atrial fibrillation with its likely outcome.",
      questionStyle: "matchTheMicrobe",
      microbes: [
        {
          id: "A",
          name: "Advanced age",
        },
        {
          id: "B",
          name: "Hypertension",
        },
        {
          id: "C",
          name: "Diabetes mellitus",
        },
        {
          id: "D",
          name: "Heart surgery",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Increased risk of atrial fibrosis",
        },
        {
          id: 2,
          name: "Cardiac remodeling",
        },
        {
          id: 3,
          name: "Increased atherosclerosis risk",
        },
        {
          id: 4,
          name: "Postoperative arrhythmias",
        },
      ],
      correctMatches: {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
      },
    },
    {
      questionNo: 19,
      question:
        "Match the clinical scenario with the appropriate imaging modality for atrial fibrillation evaluation.",
      questionStyle: "matchTheMicrobe",
      microbes: [
        {
          id: "A",
          name: "Initial diagnosis of AF",
        },
        {
          id: "B",
          name: "Assessing left atrial size",
        },
        {
          id: "C",
          name: "Detecting valvular heart disease",
        },
        {
          id: "D",
          name: "Identifying thrombus in left atrium",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Electrocardiogram (ECG)",
        },
        {
          id: 2,
          name: "Transthoracic echocardiography (TTE)",
        },
        {
          id: 3,
          name: "Transesophageal echocardiography (TEE)",
        },
        {
          id: 4,
          name: "Doppler ultrasound",
        },
      ],
      correctMatches: {
        A: 1,
        B: 2,
        C: 4,
        D: 3,
      },
    },
    {
      questionNo: 21,
      name: "Warfarin",
      description:
        "Given the medication, select from ten answer choices the diseases associated with atrial fibrillation that this medication can be used to treat.",
      options: [
        {
          option: "Preventing thromboembolism",
          isCorrect: true,
        },
        {
          option: "Increased heart rate control",
          isCorrect: false,
        },
        {
          option: "Mitral valve dysfunction",
          isCorrect: false,
        },
        {
          option: "Reducing blood pressure",
          isCorrect: false,
        },
        {
          option: "Reducing cholesterol levels",
          isCorrect: false,
        },
        {
          option: "Preventing ischemic stroke",
          isCorrect: true,
        },
        {
          option: "Improving contractility in heart failure",
          isCorrect: false,
        },
        {
          option: "Regulation of thyroid hormone levels",
          isCorrect: false,
        },
        {
          option: "Peripheral artery disease management",
          isCorrect: false,
        },
        {
          option: "Alleviating palpitations",
          isCorrect: false,
        },
      ],
      questionStyle: "medicationUse",
    },
    {
      questionNo: 22,
      name: "Beta-blockers",
      description:
        "Given the medication, select from ten answer choices the way these medications are used in atrial fibrillation management.",
      options: [
        {
          option: "Heart rate control",
          isCorrect: true,
        },
        {
          option: "Anticoagulation",
          isCorrect: false,
        },
        {
          option: "Enhancing heart rhythm",
          isCorrect: false,
        },
        {
          option: "Increasing myocardial perfusion",
          isCorrect: false,
        },
        {
          option: "Long-term sinus rhythm restoration",
          isCorrect: false,
        },
        {
          option: "Reducing atrial clots",
          isCorrect: false,
        },
        {
          option: "Managing hypertension",
          isCorrect: true,
        },
        {
          option: "Reducing exercise intolerance",
          isCorrect: false,
        },
        {
          option: "Prevention of atrial dilation",
          isCorrect: false,
        },
        {
          option: "Increasing exercise capacity",
          isCorrect: false,
        },
      ],
      questionStyle: "medicationUse",
    },
    {
      questionNo: 23,
      name: "Amiodarone",
      description:
        "Identify the uses of Amiodarone in the management of atrial fibrillation from the options below.",
      options: [
        {
          option: "Restoration of sinus rhythm",
          isCorrect: true,
        },
        {
          option: "Chronic rate control",
          isCorrect: false,
        },
        {
          option: "Preventing thromboembolic events",
          isCorrect: false,
        },
        {
          option: "Control of ventricular rate during AF",
          isCorrect: true,
        },
        {
          option: "Management of acute AF events",
          isCorrect: true,
        },
        {
          option: "Preventing hypertensive crisis",
          isCorrect: false,
        },
        {
          option: "Heart block prevention",
          isCorrect: false,
        },
        {
          option: "Reduces atrial size",
          isCorrect: false,
        },
        {
          option: "Management of hyperthyroidism",
          isCorrect: false,
        },
        {
          option: "Increasing cardiac output",
          isCorrect: false,
        },
      ],
      questionStyle: "medicationUse",
    },
    {
      questionNo: 24,
      name: "Digoxin",
      description:
        "Select from the following diseases the ones that digoxin can be used to treat in the context of atrial fibrillation.",
      options: [
        {
          option: "Heart failure",
          isCorrect: true,
        },
        {
          option: "Hypertension",
          isCorrect: false,
        },
        {
          option: "Rate control during exercise",
          isCorrect: false,
        },
        {
          option: "Atrial thrombus prevention",
          isCorrect: false,
        },
        {
          option: "Heart rate control at rest",
          isCorrect: true,
        },
        {
          option: "Reduce palpitations",
          isCorrect: false,
        },
        {
          option: "Management of ischemic heart disease",
          isCorrect: false,
        },
        {
          option: "Prevention of myocardial infarction",
          isCorrect: false,
        },
        {
          option: "Improvement of exercise tolerance",
          isCorrect: false,
        },
        {
          option: "DVT prophylaxis",
          isCorrect: false,
        },
      ],
      questionStyle: "medicationUse",
    },
    {
      questionNo: 25,
      name: "Apixaban",
      description:
        "Select the associated conditions with which Apixaban can be used, especially in the context of atrial fibrillation.",
      options: [
        {
          option: "Prevention of stroke",
          isCorrect: true,
        },
        {
          option: "Immediate rate control",
          isCorrect: false,
        },
        {
          option: "Ischemic heart disease management",
          isCorrect: false,
        },
        {
          option: "Impending heart failure prevention",
          isCorrect: false,
        },
        {
          option: "Management of bleeding risk",
          isCorrect: false,
        },
        {
          option: "Prevention of systemic embolism",
          isCorrect: true,
        },
        {
          option: "Acute rhythm conversion",
          isCorrect: false,
        },
        {
          option: "Reduction of symptoms",
          isCorrect: false,
        },
        {
          option: "Heart remodeling prevention",
          isCorrect: false,
        },
        {
          option: "Improving cardiac output",
          isCorrect: false,
        },
      ],
      questionStyle: "medicationUse",
    },
    {
      questionNo: 26,
      name: "Dronedarone",
      description:
        "Identify the specific conditions or management strategies for which Dronedarone is useful in atrial fibrillation.",
      options: [
        {
          option: "Maintenance of sinus rhythm",
          isCorrect: true,
        },
        {
          option: "Treatment of severe heart failure",
          isCorrect: false,
        },
        {
          option: "Control of ventricular rate",
          isCorrect: true,
        },
        {
          option: "Reduction of thromboembolism",
          isCorrect: false,
        },
        {
          option: "Lowers LDL cholesterol",
          isCorrect: false,
        },
        {
          option: "Long-term control of blood pressure",
          isCorrect: false,
        },
        {
          option: "Management of angina",
          isCorrect: false,
        },
        {
          option: "Prevention of atrial dilation",
          isCorrect: true,
        },
        {
          option: "Ischemic stroke prevention",
          isCorrect: false,
        },
        {
          option: "Inhibition of left atrial overload",
          isCorrect: false,
        },
      ],
      questionStyle: "medicationUse",
    },
    {
      questionNo: 27,
      name: "Verapamil",
      description:
        "Select the uses of Verapamil in the treatment of atrial fibrillation.",
      options: [
        {
          option: "Control of ventricular rate",
          isCorrect: true,
        },
        {
          option: "Acute stroke prevention",
          isCorrect: false,
        },
        {
          option: "Thromboembolic event management",
          isCorrect: false,
        },
        {
          option: "Reduction of atrial size",
          isCorrect: false,
        },
        {
          option: "Alleviation of palpitations",
          isCorrect: false,
        },
        {
          option: "Prevention of myocardial infarction",
          isCorrect: false,
        },
        {
          option: "Management of hypertension",
          isCorrect: true,
        },
        {
          option: "Improve exercise performance",
          isCorrect: false,
        },
        {
          option: "Restoration of sinus rhythm",
          isCorrect: false,
        },
        {
          option: "Prevention of neuralgias",
          isCorrect: false,
        },
      ],
      questionStyle: "medicationUse",
    },
    {
      questionNo: 28,
      name: "Rivaroxaban",
      description:
        "Identify potential uses of Rivaroxaban in the management of atrial fibrillation.",
      options: [
        {
          option: "Prevention of systemic embolism",
          isCorrect: true,
        },
        {
          option: "Immediate heart rhythm stabilization",
          isCorrect: false,
        },
        {
          option: "Management of high blood pressure",
          isCorrect: false,
        },
        {
          option: "Inhibition of AF-induced palpitations",
          isCorrect: false,
        },
        {
          option: "Stroke prevention",
          isCorrect: true,
        },
        {
          option: "Management of heart rhythm",
          isCorrect: false,
        },
        {
          option: "Improving overall heart function",
          isCorrect: false,
        },
        {
          option: "Prevention of heart failure",
          isCorrect: false,
        },
        {
          option: "Reducing exercise-induced tachycardia",
          isCorrect: false,
        },
        {
          option: "Management of anxiety",
          isCorrect: false,
        },
      ],
      questionStyle: "medicationUse",
    },
    {
      questionNo: 29,
      name: "Sotalol",
      description:
        "Identify from the choices below that accurately describe the uses of Sotalol in atrial fibrillation management.",
      options: [
        {
          option: "Control of heart rhythm",
          isCorrect: true,
        },
        {
          option: "Ventricular rate reduction",
          isCorrect: false,
        },
        {
          option: "Contrast enhancement during imaging",
          isCorrect: false,
        },
        {
          option: "Thrombus prevention",
          isCorrect: false,
        },
        {
          option: "Management of chronic AF",
          isCorrect: true,
        },
        {
          option: "Cholesterol management",
          isCorrect: false,
        },
        {
          option: "Sinus rhythm stabilization",
          isCorrect: true,
        },
        {
          option: "Coronary artery disease prevention",
          isCorrect: false,
        },
        {
          option: "Acute AF complication management",
          isCorrect: false,
        },
        {
          option: "Enhancement of cardiac output",
          isCorrect: false,
        },
      ],
      questionStyle: "medicationUse",
    },
    {
      questionNo: 31,
      question:
        "What is the main risk associated with an untreated atrial fibrillation?",
      options: [
        "Deep vein thrombosis",
        "Ventricular tachycardia",
        "Ischemic stroke",
        "Peripheral arterial disease",
      ],
      answer: "Ischemic stroke",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 32,
      question:
        "Which part of the heart is primarily responsible for the initiation of atrial fibrillation?",
      options: [
        "Right ventricle",
        "Left atrium",
        "Right atrium",
        "Left ventricle",
      ],
      answer: "Left atrium",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 33,
      question:
        "What does the CHA2DS2-VASc score assess in patients with atrial fibrillation?",
      options: [
        "Stroke risk",
        "Heart failure risk",
        "Coronary artery disease risk",
        "Peripheral arterial disease risk",
      ],
      answer: "Stroke risk",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 34,
      question: "What is the most common symptom of atrial fibrillation?",
      options: ["Shortness of breath", "Chest pain", "Palpitations", "Fatigue"],
      answer: "Palpitations",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 35,
      question: "What is the hallmark ECG finding of atrial fibrillation?",
      options: [
        "Regular P waves",
        "Sawtooth pattern",
        "Irregularly irregular rhythm",
        "ST elevation",
      ],
      answer: "Irregularly irregular rhythm",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 36,
      question:
        "Which medication class is primarily used for rate control in atrial fibrillation?",
      options: ["ACE inhibitors", "Beta-blockers", "Statins", "Anticoagulants"],
      answer: "Beta-blockers",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 37,
      question:
        "Atrial fibrillation increases the risk of which of the following?",
      options: [
        "Atrial septal defect",
        "Pulmonary embolism",
        "Systemic embolism",
        "Mitral valve stenosis",
      ],
      answer: "Systemic embolism",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 38,
      question:
        "Which scoring system is used to evaluate bleeding risk in atrial fibrillation patients on anticoagulation?",
      options: ["HAS-BLED", "CHA2DS2-VASc", "TIMI score", "APACHE II"],
      answer: "HAS-BLED",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 39,
      question:
        "Which node plays a crucial role in the pathophysiology of atrial fibrillation?",
      options: ["AV node", "SA node", "Purkinje fibers", "His bundle"],
      answer: "SA node",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 40,
      question:
        "What is the main complication from chronic atrial fibrillation if not properly managed?",
      options: [
        "Coronary artery disease",
        "Heart failure",
        "Aortic aneurysm",
        "Venous thrombosis",
      ],
      answer: "Heart failure",
      questionStyle: "shortFacts",
    },
    {
      questionNo: 41,
      question:
        "Outline the step-by-step pathophysiology of atrial fibrillation. Choose the correct next step in the flowchart.",
      diagram:
        "{{A}} → Disorganized electrical signals in atria → {{B}} → Inefficient atrial contractions → {{C}} → Risk of thrombus formation",
      options: [
        "Purkinje fibers",
        "Stagnant blood flow",
        "Irregularly irregular ventricular response",
        "Left atrium",
        "SA node",
        "Ventricular fibrillation",
      ],
      correctAnswers: {
        A: "SA node",
        B: "Left atrium",
        C: "Irregularly irregular ventricular response",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 42,
      question:
        "Complete the typical diagnostic flow for a patient presenting with atrial fibrillation symptoms: Medical history → {{A}} → ECG → {{B}} → Rule out reversible causes → Risk assessment",
      diagram:
        "{{A}} → ECG → {{B}} → Rule out reversible causes → Risk assessment",
      options: [
        "Stress test",
        "Transesophageal echocardiogram",
        "Coronary angiogram",
        "Blood pressure measurement",
        "Echocardiography",
        "Physical examination",
      ],
      correctAnswers: {
        A: "Physical examination",
        B: "Echocardiography",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 43,
      question:
        "Fill in the missing steps involved in the pharmacological treatment of atrial fibrillation: Identify AF type → {{A}} → Choose rate or rhythm control strategy → {{B}} → Anticoagulation decision",
      diagram:
        "Identify AF type → {{A}} → Choose rate or rhythm control strategy → {{B}} → Anticoagulation decision",
      options: [
        "Measure heart rate response",
        "Consider electrical cardioversion",
        "Determine stroke risk",
        "Evaluate underlying causes",
        "Implement lifestyle modifications",
        "Assess symptoms",
      ],
      correctAnswers: {
        A: "Assess symptoms",
        B: "Determine stroke risk",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 44,
      question:
        "What sequence of events leads to the clinical decision for catheter ablation in atrial fibrillation? Start from confirming diagnosis",
      diagram:
        "Confirm AF diagnosis → {{A}} → Attempt pharmacological therapy → {{B}} → Evaluate symptom persistence → {{C}} → Decision for ablation",
      options: [
        "Assess patient suitability",
        "Perform baseline echocardiogram",
        "Ensure failure of both rate and rhythm control",
        "Conduct risk benefit analysis",
        "Identify arrhythmia source",
        "Review current medications",
      ],
      correctAnswers: {
        A: "Assess patient suitability",
        B: "Ensure failure of both rate and rhythm control",
        C: "Conduct risk benefit analysis",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 45,
      question:
        "Charter the progression of anticoagulation therapy in atrial fibrillation: Initial AF diagnosis → {{A}} → CHA2DS2-VASc score calculation → {{B}} → Anticoagulation therapy discussion",
      diagram:
        "Initial AF diagnosis → {{A}} → CHA2DS2-VASc score calculation → {{B}} → Anticoagulation therapy discussion",
      options: [
        "Patient risk profile updates",
        "Patient education",
        "Risk assessment",
        "Evaluate contraindications",
        "Determine bleeding risk",
        "Review prior strokes",
      ],
      correctAnswers: {
        A: "Risk assessment",
        B: "Determine bleeding risk",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 46,
      question:
        "Describe the ECG finding transitions in atrial fibrillation. Start with initial presentation.",
      diagram:
        "Initial presentation: Palpitations → {{A}} → Check rate and rhythm → {{B}} → Fast ventricular rate identified → {{C}} → No definitive P waves",
      options: [
        "Irregularly irregular rhythm",
        "Baseline wander",
        "Evaluate for thrombus",
        "Atrial enlargement",
        "Assess QRS changes",
        "Determine T wave appearance",
      ],
      correctAnswers: {
        A: "Irregularly irregular rhythm",
        B: "Baseline wander",
        C: "Atrial enlargement",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 47,
      question:
        "Identify the steps in atrial fibrillation emergency management: Patient evaluation → {{A}} → Monitor vitals continually → {{B}} → Decide on anticoagulation strategy",
      diagram:
        "Patient evaluation → {{A}} → Monitor vitals continually → {{B}} → Decide on anticoagulation strategy",
      options: [
        "Eliminate reversible causes",
        "Initiate intravenous drug therapy",
        "Apply synchronized cardioversion",
        "Correction of electrolyte imbalances",
        "Prevent thyroid storm",
        "Conduct imaging evaluations",
      ],
      correctAnswers: {
        A: "Eliminate reversible causes",
        B: "Initiate intravenous drug therapy",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 48,
      question:
        "Complete the patient follow-up care path in atrial fibrillation: Stabilization post-acute episode → {{A}} → Long-term anticoagulation management → {{B}} → Regular cardiovascular assessments",
      diagram:
        "Stabilization post-acute episode → {{A}} → Long-term anticoagulation management → {{B}} → Regular cardiovascular assessments",
      options: [
        "Initiate echocardiogram monitoring",
        "Initiate pharmacotherapy",
        "Frequent INR checks",
        "Patient education on AF causes",
        "Determine exercise limitations",
        "Implementation of lifestyle changes",
      ],
      correctAnswers: {
        A: "Initiate pharmacotherapy",
        B: "Frequent INR checks",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 49,
      question:
        "Signify the sequence for adopting lifestyle interventions in atrial fibrillation: Diagnosis confirmation → {{A}} → Initiate first-line medical treatment → {{B}} → Assessment of intervention benefits",
      diagram:
        "Diagnosis confirmation → {{A}} → Initiate first-line medical treatment → {{B}} → Assessment of intervention benefits",
      options: [
        "Determine weight targets",
        "Schedule regular sleep patterns",
        "Design personalized exercise plan",
        "Generate food diary",
        "Advocate for smoking cessation",
        "Facilitate alcohol moderation",
      ],
      correctAnswers: {
        A: "Advocate for smoking cessation",
        B: "Design personalized exercise plan",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 50,
      question:
        "Formulate an approach for a comorbid atrial fibrillation treatment: Initial AF assessment → {{A}} → Assess concurrent conditions → {{B}} → Design comprehensive management plan",
      diagram:
        "Initial AF assessment → {{A}} → Assess concurrent conditions → {{B}} → Design comprehensive management plan",
      options: [
        "Review medication history",
        "Continuous risk update",
        "Prepare differential diagnosis",
        "Evaluate current symptoms",
        "Gather family history",
        "Compose multidisciplinary team",
      ],
      correctAnswers: {
        A: "Review medication history",
        B: "Prepare differential diagnosis",
      },
      questionStyle: "flowChart",
    },
    {
      questionNo: 51,
      hint: "A cardiac rhythm characterized by an irregularly irregular pattern and absent P waves.",
      letterChoices: [
        "A",
        "F",
        "I",
        "B",
        "R",
        "I",
        "L",
        "L",
        "A",
        "T",
        "I",
        "O",
        "N",
        "A",
        "B",
        "C",
      ],
      answer: "Fibrillation",
      questionStyle: "scrabble",
    },
    {
      questionNo: 52,
      hint: "A type of medication frequently used to prevent stroke in atrial fibrillation patients.",
      letterChoices: [
        "A",
        "N",
        "T",
        "I",
        "C",
        "O",
        "A",
        "G",
        "U",
        "L",
        "A",
        "N",
        "T",
        "S",
        "D",
        "E",
      ],
      answer: "Anticoagulants",
      questionStyle: "scrabble",
    },
    {
      questionNo: 53,
      hint: "A cellular structure in the heart involved in the propagation of electrical impulses, potentially leading to atrial fibrillation.",
      letterChoices: [
        "S",
        "I",
        "N",
        "O",
        "A",
        "T",
        "R",
        "I",
        "A",
        "L",
        "C",
        "S",
        "N",
        "O",
        "D",
        "E",
      ],
      answer: "Sinoatrial Node",
      questionStyle: "scrabble",
    },
    {
      questionNo: 54,
      hint: "Heart's upper chamber primarily involved in atrial fibrillation.",
      letterChoices: [
        "L",
        "E",
        "F",
        "T",
        "A",
        "T",
        "R",
        "I",
        "U",
        "M",
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
      ],
      answer: "Left Atrium",
      questionStyle: "scrabble",
    },
    {
      questionNo: 55,
      hint: "A scoring system used for assessing stroke risk in atrial fibrillation.",
      letterChoices: [
        "C",
        "H",
        "A",
        "D",
        "S",
        "-",
        "2",
        "V",
        "A",
        "S",
        "c",
        "B",
        "C",
        "D",
        "E",
        "M",
      ],
      answer: "CHA2DS2-VASc",
      questionStyle: "scrabble",
    },
    {
      questionNo: 56,
      hint: "A treatment technique involving catheter insertion to ablate areas of the heart causing atrial fibrillation.",
      letterChoices: [
        "A",
        "B",
        "L",
        "A",
        "T",
        "I",
        "O",
        "N",
        "R",
        "E",
        "P",
        "O",
        "R",
        "T",
        "S",
        "C",
      ],
      answer: "Ablation",
      questionStyle: "scrabble",
    },
    {
      questionNo: 57,
      hint: "Medication class used to slow down the heart rate in atrial fibrillation patients.",
      letterChoices: [
        "B",
        "E",
        "T",
        "A",
        "-",
        "B",
        "L",
        "O",
        "C",
        "K",
        "E",
        "R",
        "S",
        "P",
        "R",
        "C",
      ],
      answer: "Beta-Blockers",
      questionStyle: "scrabble",
    },
    {
      questionNo: 58,
      hint: "A potentially dangerous complication of atrial fibrillation related to blood clotting.",
      letterChoices: [
        "T",
        "H",
        "R",
        "O",
        "M",
        "B",
        "O",
        "S",
        "I",
        "S",
        "C",
        "A",
        "R",
        "D",
        "I",
        "A",
      ],
      answer: "Thrombosis",
      questionStyle: "scrabble",
    },
    {
      questionNo: 59,
      hint: "A therapeutic approach that restores normal rhythm in atrial fibrillation using electrical shocks.",
      letterChoices: [
        "C",
        "A",
        "R",
        "D",
        "I",
        "O",
        "V",
        "E",
        "R",
        "S",
        "I",
        "O",
        "N",
        "M",
        "N",
        "O",
      ],
      answer: "Cardioversion",
      questionStyle: "scrabble",
    },
    {
      questionNo: 60,
      hint: "Rapid and irregular beating of the heart's upper chambers, synonym for atrial fibrillation.",
      letterChoices: [
        "Q",
        "U",
        "I",
        "V",
        "E",
        "R",
        "I",
        "N",
        "G",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
      ],
      answer: "Quivering",
      questionStyle: "scrabble",
    },
    {
      questionNo: 61,
      question:
        "Diagnosis: New onset atrial fibrillation. What is the first-line treatment?",
      options: [
        "Calcium channel blockers",
        "Beta-blockers",
        "Anticoagulation therapy",
        "Digoxin",
      ],
      answer: "Beta-blockers",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 62,
      question:
        "Diagnosis: Atrial fibrillation with rapid ventricular response. What is the first-line treatment?",
      options: ["Amiodarone", "Verapamil", "Diltiazem", "Warfarin"],
      answer: "Diltiazem",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 63,
      question:
        "Diagnosis: Atrial fibrillation in a stable outpatient. What is the recommended initial treatment?",
      options: [
        "Rate control",
        "Rhythm control",
        "Thrombolysis",
        "Immediate cardioversion",
      ],
      answer: "Rate control",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 64,
      question:
        "Diagnosis: Atrial fibrillation in a patient post-stroke. What is the standard first-line treatment?",
      options: [
        "Anticoagulation",
        "Antiplatelet therapy",
        "Statin therapy",
        "Beta-blockers",
      ],
      answer: "Anticoagulation",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 65,
      question:
        "Diagnosis: Atrial fibrillation due to hyperthyroidism. First-line therapy?",
      options: [
        "Radioactive iodine",
        "Propylthiouracil",
        "Beta-blockers",
        "Methimazole",
      ],
      answer: "Beta-blockers",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 66,
      question:
        "Diagnosis: Chronic atrial fibrillation with heart failure. What is the primary therapy?",
      options: [
        "Anticoagulation",
        "Rhythm control",
        "Rate control",
        "Loop diuretics",
      ],
      answer: "Rate control",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 67,
      question:
        "Diagnosis: Paroxysmal atrial fibrillation. What is the first-line intervention in acute settings?",
      options: [
        "Flecainide",
        "Synchronized cardioversion",
        "Beta-blockers",
        "Anticoagulation",
      ],
      answer: "Synchronized cardioversion",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 68,
      question:
        "Diagnosis: Lone atrial fibrillation without comorbidities. What is the standard first-line approach?",
      options: [
        "Watchful waiting",
        "Immediate anticoagulation",
        "Rate control",
        "Rhythm control",
      ],
      answer: "Watchful waiting",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 69,
      question:
        "Diagnosis: Atrial fibrillation with minimal symptom burden. What is the first-line strategy?",
      options: [
        "Anticoagulation only",
        "Aggressive rate control",
        "Aggressive rhythm control",
        "Lifestyle modifications",
      ],
      answer: "Lifestyle modifications",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 70,
      question:
        "Diagnosis: Atrial fibrillation due to recent surgery. What is the suggested first-line treatment?",
      options: ["Beta-blockers", "Anticoagulation", "Amiodarone", "Metoprolol"],
      answer: "Beta-blockers",
      questionStyle: "firstLineTreatment",
    },
    {
      questionNo: 71,
      question:
        "Labs in a patient with atrial fibrillation: INR 3.5, normal creatinine, low albumin.",
      options: [
        "Adequate anticoagulation",
        "Subtherapeutic anticoagulation",
        "Renal impairment",
        "Liver failure",
      ],
      answer: "Adequate anticoagulation",
      questionStyle: "lab",
    },
    {
      questionNo: 72,
      question:
        "Labs: Elevated D-dimer in a patient with newly diagnosed atrial fibrillation.",
      options: [
        "Deep vein thrombosis",
        "Pulmonary embolism",
        "Possible systemic embolism",
        "Kidney failure",
      ],
      answer: "Possible systemic embolism",
      questionStyle: "lab",
    },
    {
      questionNo: 73,
      question:
        "Patient with atrial fibrillation: Elevated BNP, low ejection fraction.",
      options: [
        "Heart failure",
        "Acute kidney injury",
        "Valvular heart disease",
        "Chronic fatigue syndrome",
      ],
      answer: "Heart failure",
      questionStyle: "lab",
    },
    {
      questionNo: 74,
      question:
        "Lab results show: High TSH, irregular heart rate. Potential diagnosis?",
      options: [
        "Hyperthyroidism-induced AF",
        "Primary hyperparathyroidism",
        "Hypothyroidism-related AF",
        "Subclinical thyrotoxicosis",
      ],
      answer: "Hypothyroidism-related AF",
      questionStyle: "lab",
    },
    {
      questionNo: 75,
      question: "Atrial fibrillation labs: Elevated ALT, normal AST, INR 1.8.",
      options: [
        "Poor anticoagulation control",
        "Liver dysfunction",
        "Thyroid dysfunction",
        "Vitamin K deficiency",
      ],
      answer: "Poor anticoagulation control",
      questionStyle: "lab",
    },
    {
      questionNo: 76,
      question: "Patient with AF: Normal electrolytes, low magnesium.",
      options: [
        "Hypomagnesemia-induced arrhythmia",
        "Normal lab result",
        "Mild dehydration",
        "Undiagnosed renal failure",
      ],
      answer: "Hypomagnesemia-induced arrhythmia",
      questionStyle: "lab",
    },
    {
      questionNo: 77,
      question:
        "AF patient labs: High troponin T, normal potassium and sodium.",
      options: [
        "Myocardial infarction",
        "Electrolyte imbalance",
        "Rhabdomyolysis",
        "Pulmonary embolism",
      ],
      answer: "Myocardial infarction",
      questionStyle: "lab",
    },
    {
      questionNo: 78,
      question: "Patient with AF: Elevated ESR, normal WBC count.",
      options: [
        "Infective endocarditis",
        "Autoimmune disease",
        "Bacterial infection",
        "Post-viral syndrome",
      ],
      answer: "Autoimmune disease",
      questionStyle: "lab",
    },
    {
      questionNo: 79,
      question:
        "AF patient: C-reactive protein elevated, ECG with variable HR.",
      options: [
        "Inflammatory cardiac disease",
        "Infective endocarditis",
        "Acute liver disease",
        "Viral myocarditis",
      ],
      answer: "Inflammatory cardiac disease",
      questionStyle: "lab",
    },
    {
      questionNo: 80,
      question:
        "Labs showing elevated creatinine in AF patient could indicate?",
      options: [
        "Renal impairment",
        "Adequate anticoagulation",
        "Subtherapeutic anticoagulation",
        "Thromboembolic event",
      ],
      answer: "Renal impairment",
      questionStyle: "lab",
    },
    {
      questionNo: 81,
      question:
        "Suspected Condition: Atrial fibrillation in symptomatic patient. What test to order?",
      options: [
        "Electrocardiogram (ECG)",
        "Chest X-ray",
        "Echocardiogram",
        "Blood glucose level",
      ],
      answer: "Electrocardiogram (ECG)",
      questionStyle: "testToOrder",
    },
    {
      questionNo: 82,
      question:
        "Suspected Condition: Atrial fibrillation with decompensated heart failure. What test to order?",
      options: [
        "BNP levels",
        "Cardiac MRI",
        "CT Angiography",
        "Tilt table test",
      ],
      answer: "BNP levels",
      questionStyle: "testToOrder",
    },
    {
      questionNo: 83,
      question:
        "Suspected Condition: Atrial fibrillation with risk of thromboembolism. What test to order?",
      options: [
        "D-dimer",
        "Transesophageal echocardiography",
        "Holter monitor",
        "Thallium stress test",
      ],
      answer: "Transesophageal echocardiography",
      questionStyle: "testToOrder",
    },
    {
      questionNo: 84,
      question:
        "Suspected Condition: Atrial fibrillation, first episode. What test to confirm diagnosis?",
      options: [
        "Holter monitor",
        "Echocardiogram",
        "Electrocardiogram (ECG)",
        "MRI of the heart",
      ],
      answer: "Electrocardiogram (ECG)",
      questionStyle: "testToOrder",
    },
    {
      questionNo: 85,
      question:
        "Suspected Condition: Atrial fibrillation with thyroid dysfunction. What test to order?",
      options: [
        "TSH level",
        "Serum calcium",
        "24-hour urinary free cortisol",
        "ACTH level",
      ],
      answer: "TSH level",
      questionStyle: "testToOrder",
    },
    {
      questionNo: 86,
      question:
        "Suspected Condition: Silent atrial fibrillation in a previously healthy patient. What monitoring test to order?",
      options: [
        "Ambulatory ECG (Holter)",
        "Carotid ultrasound",
        "Sleep study",
        "Repeat blood glucose",
      ],
      answer: "Ambulatory ECG (Holter)",
      questionStyle: "testToOrder",
    },
    {
      questionNo: 87,
      question:
        "Suspected Condition: Atrial fibrillation following recent surgery. What test to order?",
      options: [
        "Coagulation profile",
        "Pulmonary function test",
        "Abdominal ultrasound",
        "Electrocardiogram (ECG)",
      ],
      answer: "Electrocardiogram (ECG)",
      questionStyle: "testToOrder",
    },
    {
      questionNo: 88,
      question:
        "Suspected Condition: AF with possible structural heart changes. What test to order?",
      options: [
        "Echocardiogram",
        "Lipid profile",
        "Liver function tests",
        "Basic metabolic panel",
      ],
      answer: "Echocardiogram",
      questionStyle: "testToOrder",
    },
    {
      questionNo: 89,
      question:
        "Suspected Condition: Persistent atrial fibrillation with alcohol use. What test to order?",
      options: [
        "Liver function tests",
        "Blood alcohol level",
        "24-hour Holter monitor",
        "Thyroid antibody panel",
      ],
      answer: "24-hour Holter monitor",
      questionStyle: "testToOrder",
    },
    {
      questionNo: 90,
      question:
        "Suspected Condition: Atrial fibrillation with sudden onset syncope. What test to order?",
      options: [
        "Electrophysiology study",
        "Head CT",
        "Cerebral angiography",
        "Electrocardiogram (ECG)",
      ],
      answer: "Electrocardiogram (ECG)",
      questionStyle: "testToOrder",
    },
  ],
};
