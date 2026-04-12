/* ==========================================================================
   CCO CAPSTONE - CONTENT BUNDLE
   Inline content loaded as window.__CCO_DATA so the prototype works from
   file:// URLs (Chrome blocks fetch() on file://). The engine checks for
   this global first and falls back to fetch for local-server use.
   Auto-generated from content JSON files - do not edit by hand.
   ========================================================================== */

(function () {
  window.__CCO_DATA = window.__CCO_DATA || {};

  window.__CCO_DATA.contacts = {
    "contacts": [
      {
        "id": "ramsey",
        "name": "Col Ramsey",
        "title": "455 AEW/CC",
        "initials": "RR",
        "color": "#F56565",
        "tone": "Direct. Terse. Former F-16 pilot. Texts in short bursts, no pleasantries, no punctuation sometimes. Expects immediate acknowledgment. Uses 'need' not 'want.'",
        "example_messages": [
          "You the new K shop SNCIC?",
          "Walk in my office. Now.",
          "Runway 09L just ate a bird. I need someone fixing it in 2 hours.",
          "Don't send me a slide. Send me a decision."
        ]
      },
      {
        "id": "dooley",
        "name": "SMSgt Dooley",
        "title": "455 CES/CEO",
        "initials": "RD",
        "color": "#F5B845",
        "tone": "Crusty. Impatient. ALL CAPS when frustrated. Uses too many exclamation points. Loves his CE shop and hates paperwork. Will text the same question 3 times if he does not get an answer.",
        "example_messages": [
          "Where we at on that generator mod",
          "I got units dropping off the grid",
          "DUDE I need that mod signed TODAY",
          "Call me when you get this!!"
        ]
      },
      {
        "id": "perez",
        "name": "Capt Perez",
        "title": "455 AEW/CCX",
        "initials": "AP",
        "color": "#4FC3D7",
        "tone": "Formal. Careful. Writes like an email even over text. Uses full sentences and proper punctuation. Polite but will escalate quickly if ignored.",
        "example_messages": [
          "Good morning. The Wing CC asked about your read file status.",
          "Can you confirm ETA on the shop inventory summary?",
          "Please acknowledge receipt when convenient."
        ]
      },
      {
        "id": "villanueva",
        "name": "TSgt Villanueva",
        "title": "2 FS/FM",
        "initials": "MV",
        "color": "#5BC98E",
        "tone": "Chill. Lowercase everything. Drops punctuation. Friendly, helpful, your best ally in the theater. Works across the hall. Texts like a friend.",
        "example_messages": [
          "hey welcome to the mess",
          "coffee tomorrow? i got intel on the funding situation",
          "heads up dooley is on the warpath about something"
        ]
      },
      {
        "id": "haddad",
        "name": "Haddad (TFL)",
        "title": "Vendor \u2014 TFL",
        "initials": "HH",
        "color": "#8B97A8",
        "tone": "Professional but persistent. English is good but formal. Always signs off with 'Best regards.' Will call at odd hours.",
        "example_messages": [
          "Hello sir, this is Haddad from TFL. Welcome to Eagle Crest.",
          "I would like to schedule a meeting at your convenience. Best regards.",
          "Please confirm receipt of this message. Best regards."
        ]
      },
      {
        "id": "morales",
        "name": "TSgt Morales",
        "title": "Outgoing CCO",
        "initials": "JM",
        "color": "#A0AEC0",
        "tone": "Tired. Rushing. Friendly but distracted. Types fast with typos. Genuinely wants to help but is already checked out mentally. Uses abbreviations and emojis when relieved."
      },
      {
        "id": "group-sncos",
        "name": "455 SNCO Group",
        "title": "Group chat",
        "initials": "GC",
        "color": "#8B97A8",
        "is_group": true,
        "members": [
          "ramsey",
          "dooley",
          "perez"
        ],
        "tone": "Mixed. Use sparingly \u2014 good for atmospheric injects where the student gets pulled into a running conversation they have to navigate."
      }
    ]
  };

  window.__CCO_DATA.injects = {};
  window.__CCO_DATA.injects["IM-01"] = {
    "id": "IM-01",
    "observer_note": "Watch whether the trainer can resist hinting at the Al-Rashid trap. The #1 failure mode here is a trainer who can't help pointing at the expired BPA. Grade discipline.",
    "quick_fires": [
      {"label": "ESCALATE — Ramsey is asking", "from": "Capt Perez (455 AEW/CCX)", "subject": "Wing CC asked about the shop status", "body": "Heads up — Ramsey just asked me for a one-paragraph read on what you inherited. I told him you were still inventorying. He said 'they should know by now.' Not a deadline, but you can feel him leaning on it. — Perez"},
      {"label": "HELPFUL — drive has a tracker", "from": "SMSgt Morales (outgoing)", "subject": "Forgot to mention — old tracker", "body": "Realized I should tell you: there's a K_Shop_Tracker_LAST_ROTATION.xlsx in the shared drive. About 60% of the rows are stale but the active contracts column is accurate. Don't trust the dollar totals without rebuilding them. — Morales"},
      {"label": "NOISE — coffee fund", "from": "TSgt Villanueva (2 FS/FM)", "subject": "K shop coffee fund", "body": "hey whoever's in charge of the coffee pot now, the coffee fund has $11 and we need a new filter basket. let me know if you want cash or if i should just grab one."}
    ],
    "title": "Shop inventory handoff",
    "tlo": [
      "TLO-2-Predeployment",
      "TLO-3-Standup"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "absolute",
      "day": 1,
      "hour": 8,
      "minute": 0
    },
    "relay_noise": [
      {"group": "eces-deployed", "sender": "SrA Davis", "text": "New contracting team just landed. Saw them at the terminal looking confused.", "offset": -15},
      {"group": "eces-deployed", "sender": "TSgt Williams", "text": "Hope the new CONS team is better than the last one. We've had stuff sitting for weeks.", "offset": -5},
      {"group": "top3", "sender": "CMSgt Alvarez", "text": "New CCO team is here. Give them 24 hrs to get situated before you start flooding them.", "offset": 5},
      {"group": "ce-work", "sender": "MSgt Ford (CE)", "text": "Is the new contracting team in yet? I've got 3 work orders that need contract support.", "offset": 20}
    ],
    "duration_minutes": 90,
    "description": "Students receive the inherited contract portfolio and must inventory what they have before the first real requirement drops.",
    "scenario_for_students": "You have just arrived at FOS Eagle Crest and relieved the previous contracting team. The outgoing CCO, TSgt Morales, leaves in 20 minutes on the rotator. His office is a mess of half-labeled file folders, a desktop cluttered with Word docs, and a laminated org chart from 2 CCOs ago. Your first task: inventory what you inherited. What contracts are active? What is expiring? What is on fire? You have 90 minutes before the first customer walks through your door.",
    "sms_items": [
      {
        "id": "sms-turnover",
        "contact_id": "morales",
        "delay_minutes": 0,
        "messages": [
          "Hey guys, I'm in line for the rotator. Sorry for the lack of turnover but here's everything real quick",
          "Unit cell phone is on the right side of your desk. You're already connected to all the orgs on Relay. Everyone uses it here.",
          "K drive is mapped — it's got all your contracts, the tracker spreadsheet, templates, everything. Start there.",
          "Your email is up and running, I forwarded a couple things before I left.",
          "That's all I got! I'll be out of touch for awhile while I fly but hit me up if you need anything 🤙"
        ]
      }
    ],
    "inbox_items": [
      {
        "id": "msg1",
        "from": "TSgt Morales",
        "from_email": "jt.morales.mil@mail.mil",
        "subject": "Read before I leave - portfolio notes",
        "body": "Team - welcome to the Eagle Crest shop. Quick notes before I catch my rotator:\n\n1. TFL BPA is your workhorse. Use it for anything facilities. Owner is well-connected.\n2. Crescent Star for consumables, they are solid.\n3. Al-Rashid Construction - good to go for any runway, concrete, or asphalt work. Used them for the MWR pad last month, no issues.\n4. Dining services is giving me heartburn. Performance mod is in legal.\n5. CE SMSgt Dooley has been blowing up my phone about a generator mod. Drafted it, never got it signed. Sorry.\n\nPortfolio is in the shared drive. Good luck. - Morales"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Inventory all active BPAs and IDIQs by expiration date",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a2",
        "description": "Identify Al-Rashid Construction BPA as EXPIRED (the trap)",
        "objective": true,
        "priority": "critical",
        "notes": "Students who catch this before IM-02 phone call are exceptional. Students who catch it after the call but before D2 are passing. Students who never catch it will fail IM-07 on D2."
      },
      {
        "id": "a3",
        "description": "Discover the debarred vendor flag (Mediterranean Supply Partners)",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a4",
        "description": "Triage open modifications and flag the TFL generator mod as urgent",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a5",
        "description": "Begin drafting the Wing CC read file",
        "objective": false,
        "priority": "medium"
      },
      {
        "id": "a6",
        "description": "Assign roles across the 4-person team",
        "objective": false,
        "priority": "medium"
      }
    ],
    "trainer_prompts": [
      "Do NOT lead students to the Al-Rashid expiration. Let them find it or not. This is the most important learning moment of Day 1.",
      "If students ask about the debarred vendor, give them the 'huh, weird' response and move on.",
      "Watch for team dynamics - is one person doing all the work while others wait? Flag for hotwash.",
      "If they finish inventory in under 45 minutes, they rushed it. Note it and let IM-07 expose the gaps on D2."
    ],
    "teaching_point": "In real deployed contracting, you inherit someone else's mess. The outgoing CCO is tired, rushing, and will tell you what they WANT to be true, not what IS true. Verification is not optional. The single most important skill on Day 1 of a rotation is reading the files yourself and trusting nothing you are told verbally until you see it in writing. FAR 1.102(d) empowers you to make decisions - but only if you know what you are actually working with.",
    "wrong_answer_walkthroughs": [
      {
        "answer": "Students accept Morales's verbal brief at face value and do not verify the portfolio against actual files",
        "consequence": "They walk into D2 assuming Al-Rashid is valid. When IM-07 (runway repair emergency) hits, they attempt to use an expired vehicle, potentially creating an unauthorized commitment. This becomes the centerpiece of the hotwash.",
        "teaching_moment": "You can only manage what you verify. The verbal brief from your predecessor is data, not truth."
      },
      {
        "answer": "Students delegate the inventory to the most junior person and the seniors focus on 'strategic' matters",
        "consequence": "The junior misses the debarment flag and the expired BPA. Seniors are blindsided when issues surface.",
        "teaching_moment": "In a 4-person shop, everyone touches the files on Day 1. You will never have this much time to learn your shop again - use it."
      }
    ],
    "what_really_happened": "This inject is based on a 2019 PSAB rotation where an incoming CCO discovered the outgoing team had been operating against an expired BPA for 11 days. The problem was not caught until a vendor walked into the office asking about payment for work authorized under the expired vehicle. The unauthorized commitment required a formal ratification package reviewed by the contracting squadron commander. The real CCO stayed calm, documented everything, got the ratification approved, and made the debrief to the next incoming team a permanent part of their turnover checklist. The lesson: trust what is in the files, not what you are told."
  };

  window.__CCO_DATA.injects["IM-02"] = {
    "id": "IM-02",
    "observer_note": "Is the trainer playing Morales as tired and rushed, or as a helpful instructor? The character is supposed to be unhelpful in a realistic way. Flag breaks in character.",
    "quick_fires": [
      {"label": "PROBE — 'what did Morales really tell you?'", "from": "Capt Perez (455 AEW/CCX)", "subject": "Quick question on the handover", "body": "Walk me through what Morales actually briefed you on verbally vs. what you found in the files yourself. I'm trying to understand how well-prepped you are before the next requirement drops. — Perez"},
      {"label": "PRESSURE — another BPA question", "from": "CE SMSgt Dooley", "subject": "Is the TFL BPA good for generators?", "body": "Need to clarify — the TFL BPA Morales mentioned, does that cover generator maintenance too or just facilities? I have a bird down and I need to know before I call Haddad."}
    ],
    "title": "Outgoing CCO brief",
    "tlo": [
      "TLO-1-Ethics",
      "TLO-3-Standup"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "absolute",
      "day": 1,
      "hour": 9,
      "minute": 30
    },
    "duration_minutes": 20,
    "description": "TSgt Morales has 20 minutes before his rotator. Phone call. He will brief what is on fire, what to ignore, and one thing that is a lie.",
    "scenario_for_students": "Your desk phone rings. It is TSgt Morales, the outgoing CCO. He is already at the PAX terminal waiting on his rotator. He has about 20 minutes to give you the verbal turnover he did not have time for in person. Take the call. Ask questions. Figure out what matters.",
    "phone_script_id": "IM-02-morales",
    "inbox_items": [
      {
        "id": "msg-perez-welcome",
        "from": "Capt Perez",
        "from_email": "alejandra.perez.mil@mail.mil",
        "subject": "Welcome - Wing CC read file due EOD D2",
        "body": "Welcome to Eagle Crest. Wing CC wants a read file on the shop by EOD Day 2. Include active contract summary, expiring actions, and any concerns. Standard format. - Perez, 455 AEW/CCX"
      }
    ],
    "sms_items": [
      {
        "id": "sms-ramsey-welcome",
        "contact_id": "ramsey",
        "delay_minutes": 3,
        "messages": [
          "You the new K shop SNCIC?",
          "I need 10 minutes with you today. My office. Walk in, don't schedule.",
          "Don't bring a brief. Bring answers."
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Take notes during the call",
        "objective": false,
        "priority": "medium"
      },
      {
        "id": "a2",
        "description": "Ask clarifying questions about any BPA or contract mentioned",
        "objective": true,
        "priority": "critical",
        "notes": "Good CCOs catch the lie. Morales claims Al-Rashid is 'good to go.' Students who ask 'when does it expire?' get a hedge. Students who ask for the doc get nothing."
      },
      {
        "id": "a3",
        "description": "Verify anything Morales says against actual files before acting",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a4",
        "description": "Do not commit to any action based solely on the verbal brief",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a5",
        "description": "Acknowledge Col Ramsey's text immediately \u2014 he is not patient",
        "objective": true,
        "priority": "high"
      }
    ],
    "trainer_prompts": [
      "Read the phone script verbatim. Do not paraphrase - the exact wording is calibrated.",
      "When students ask clarifying questions, stay in character as Morales: tired, distracted, 'look I am about to board.'",
      "The lie is about Al-Rashid Construction BPA. Morales will say it is 'good to go.' It expired 6 days ago.",
      "If a student directly asks when Al-Rashid expires: evasive response, 'check the files, my ride is here.'",
      "Note which students caught the evasion."
    ],
    "teaching_point": "Not everyone who briefs you is reliable - and most of the time, it is not malice. It is exhaustion, optimism, or someone who stopped paying attention three weeks before their rotation. The skill is not detecting lies; it is recognizing that verbal information degrades and verification is cheap. Ask specific questions. Demand specific documents. Trust files, not voices.",
    "wrong_answer_walkthroughs": [
      {
        "answer": "Students take notes but do not ask clarifying questions about any specific contract",
        "consequence": "They walk away with Morales's narrative intact. Everything unravels on D2 when reality hits the fictional picture they built.",
        "teaching_moment": "A turnover brief is a hypothesis, not a fact sheet. Treat it like intelligence from an untrusted source - useful as a starting point, requires corroboration."
      },
      {
        "answer": "Students accept 'it is in the files' as a sufficient answer and never actually check the files",
        "consequence": "They act on verbal information for the rest of Day 1. Any inject that depends on an assumption Morales planted will trip them up.",
        "teaching_moment": "'It is in the files' is the most dangerous phrase in deployed contracting. Go look."
      }
    ],
    "what_really_happened": "Every deployed CCO has had this phone call. The outgoing person is exhausted, the incoming person is overwhelmed, and both are pretending the turnover is going better than it is. The verbal brief pattern - with its mix of useful tips, optimistic assessments, and outright fictions - is so universal that multiple AETC and AFICC AARs have recommended written turnover protocols as a mitigation. They are not widely used. Verification remains the individual CCO's responsibility. This inject trains the habit."
  };


  // v0.2.6: 48 additional Iron Meridian injects
  window.__CCO_DATA.injects["IM-03"] = {
    "id": "IM-03",
    "observer_note": "Watch whether the trainer lets students chase the pilferage angle themselves, or steers them toward the COR conversation. Steering = trainer failure.",
    "quick_fires": [
      {"label": "ESCALATE — SF wants a statement", "from": "455 SFS/Investigations", "subject": "Statement request — generator fuel discrepancy", "body": "We're opening a preliminary on the fuel shortage. Need a statement from contracting on the COR's observations and whether there's been any prior documentation of the pattern. 1600 today if possible. — SFS/S2"},
      {"label": "HELPFUL — fuel log access", "from": "Fuel Mgmt Flight", "subject": "POL logs you requested", "body": "Attaching the POL draw logs for the last 30 days. Note row 47 — there's a 400-gal discrepancy between what the driver signed for and what the meter recorded. Might be related."},
      {"label": "CURVEBALL — vendor calls back", "from": "Haddad (TFL vendor)", "subject": "About the fuel numbers", "body": "Friend, I think there is a misunderstanding. My driver, he is an honest man. Perhaps the meter, it is broken? Let us check together before involving the police. I come to your office at 1400, yes?"}
    ],
    "title": "Generator fuel pilferage",
    "tlo": [
      "TLO-3-Standup",
      "TLO-4-Admin"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 10,
      "earliest_minute": 0,
      "latest_hour": 10,
      "latest_minute": 30
    },
    "duration_minutes": 30,
    "description": "SMSgt Dooley reports generator fuel is disappearing overnight. He wants a new contract for a locked fuel bladder.",
    "scenario_for_students": "SMSgt Dooley shows up at your office door, visibly irritated. He says JP-8 consumption from the contractor-operated generator farm has been 18% above projected for three nights running. He thinks the Tarkani night shift is siphoning fuel to sell in town. He wants a modification to add a locked bladder and camera. He is asking for this to happen today.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "SMSgt Dooley",
        "from_email": "russell.dooley.mil@mail.mil",
        "subject": "Gen farm JP-8 burn rate - need action",
        "body": "K shop,\n\nThree nights in a row the gen farm is burning 18-22% over projected. That is not weather, that is not load, that is theft. I need a mod to the O&M contract for a locked fuel bladder and a PTZ camera by EOC today or I will write this up to the MXG CC.\n\nDooley\nCE Superintendent"
      }
    ],
    "sms_items": [
      {
        "id": "sms2",
        "contact_id": "dooley",
        "delay_minutes": 4,
        "messages": [
          "BTW I already told the contractor I was getting cameras. Head's up.",
          "So don't be surprised if the PM calls you mad"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Do NOT promise Dooley a same-day mod — this is days of work, not hours",
        "priority": "critical",
        "objective": true,
        "notes": "Dooley's urgency is real but the process takes 48h minimum under AFFARS."
      },
      {
        "id": "a2",
        "description": "Ask for 3 nights of evidence before opening a CAR with the vendor",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Push back on Dooley's pre-announcement to the PM — that is a communication violation",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Route the requirement to the COR to verify consumption before spending money",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Document the conversation in the file for later",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Customer urgency is information, not a directive. A requirements customer telling you 'I need this today' means 'I am anxious' — it rarely means the FAR process changes. Your job is to translate their anxiety into the right procurement posture, not to skip steps. Also: once a customer has pre-committed in-person to a vendor, the trust is already damaged. Note it for the file."
  };

  window.__CCO_DATA.injects["IM-04"] = {
    "id": "IM-04",
    "observer_note": "Al-Rashid walk-in is the Day 1 gut-check. Observe whether the trainer plays the vendor as sympathetic or as pushy — wrong tone makes the ethics lesson collapse.",
    "quick_fires": [
      {"label": "ESCALATE — Al-Rashid calls his lawyer", "from": "Al-Rashid legal counsel", "subject": "RE: unpaid invoice — my client's position", "body": "We represent Al-Rashid Construction. Our client has delivered services in good faith. Non-payment will result in a formal claim. We expect a response within 48 hours. — Attorney at Law, Doha"},
      {"label": "HELPFUL — ratification template", "from": "Chief of Contracting (reachback)", "subject": "FAR 1.602-3 ratification template", "body": "Attaching the ratification request template. You'll need: (1) statement of facts, (2) no prior knowledge statement, (3) determination it was in the govt's interest, (4) funds were available. Route through Legal, then to the HCA for approval."}
    ],
    "title": "Al-Rashid rep walks in with a bill",
    "tlo": [
      "TLO-1-Ethics",
      "TLO-3-Standup",
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 10,
      "earliest_minute": 45,
      "latest_hour": 11,
      "latest_minute": 30
    },
    "duration_minutes": 45,
    "description": "A rep from Al-Rashid Construction walks into the shop with an invoice for runway shoulder work 'authorized verbally last Thursday.' There is no file record.",
    "scenario_for_students": "A Tarkani man in a dusty polo walks into your shop without an escort. He is Yousef, the local PM for Al-Rashid Construction. He places an invoice on your desk for $47,400, 'runway shoulder stabilization, authorized by your TSgt on Thursday.' He is polite, confident, and wants to discuss payment terms today because his crew is not paid until he is.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Yousef Khatib (Al-Rashid)",
        "from_email": "yousef@alrashid-construction.tk",
        "subject": "Invoice 2026-0412 - Runway shoulder",
        "body": "K shop,\n\nPlease see attached invoice for $47,400 USD for the runway shoulder work authorized verbally by TSgt Morales on Thursday. My crew completed this work Friday and Saturday. Payment terms are 30 days. I am available in person today to answer questions. I was told by TSgt Morales the BPA call would be placed this week.\n\nYousef Khatib\nProject Manager, Al-Rashid Construction LLC"
      }
    ],
    "sms_items": [
      {
        "id": "sms2",
        "contact_id": "group-sncos",
        "delay_minutes": 8,
        "messages": [
          "The tall guy in the khaki shirt at the K shop front desk is an Al-Rashid rep FYI",
          "Heads up if he comes looking for you too"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Do not pay, do not promise payment, do not acknowledge the commitment is valid",
        "priority": "critical",
        "objective": true,
        "notes": "This is an unauthorized commitment. Paying it without ratification is a fiscal violation."
      },
      {
        "id": "a2",
        "description": "Verify whether the Al-Rashid BPA is current before saying anything",
        "priority": "critical",
        "objective": true,
        "notes": "It expired six days ago — this is the IM-01 trap surfacing."
      },
      {
        "id": "a3",
        "description": "Escalate to the warranted KO and start a ratification package",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Keep Yousef comfortable and talking — do not accuse him of anything",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Document verbal statements in a memo for record before he leaves",
        "priority": "high",
        "objective": true
      }
    ],
    "teaching_point": "Unauthorized commitments are a career event. When a vendor presents one, your three jobs are (1) do not make it worse, (2) get the facts into writing before witnesses scatter, and (3) start the ratification process immediately. The vendor is not the villain — in most cases they acted in good faith on a military member's verbal promise. Treat them fairly while you sort out the legal mess. FAR 1.602-3 is your reference."
  };

  window.__CCO_DATA.injects["IM-05"] = {
    "id": "IM-05",
    "observer_note": "Watch for the trainer accepting the students' first answer on handshake deals. Strong trainers push back with 'and if Wing CC orders you to do it?' Weak trainers let it go.",
    "quick_fires": [
      {"label": "PRESSURE — Army LNO keeps asking", "from": "Army LNO (CPT Briggs)", "subject": "are we good to go?", "body": "hey man, i told my boss we had a handshake on the MRE resupply. my CO is breathing down my neck. i just need a yes or no so i can plan. don't make me come over there"},
      {"label": "HELPFUL — MIPR template", "from": "Finance (FM)", "subject": "MIPR — how to actually do it", "body": "Attaching DD Form 448. Army sends it to you, YOU accept or reject, then you obligate on their appropriation. NOT a handshake. Turnaround is usually 7-10 days. Happy to walk you through the first one."}
    ],
    "title": "Army LNO handshake deal",
    "tlo": [
      "TLO-1-Ethics",
      "TLO-3-Standup"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 11,
      "earliest_minute": 0,
      "latest_hour": 11,
      "latest_minute": 30
    },
    "duration_minutes": 25,
    "description": "The tenant Army LNO calls asking when 'the fuel deal we agreed to' will be contracted.",
    "scenario_for_students": "Your desk phone rings. It's CPT Alvarez, the Army LNO for the tenant Stryker unit co-located at Eagle Crest. He is calling to follow up on 'the fuel deal we agreed on with your predecessor last week,' a handshake arrangement for the Army unit to burn AF contracted fuel at a discounted rate. There is no paperwork. He needs the numbers 'locked in' because his brigade wants them in the weekly SITREP.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "CPT Alvarez (US Army LNO)",
        "from_email": "rm.alvarez.mil@mail.mil",
        "subject": "Fuel handshake - need paper",
        "body": "K shop,\n\nGood morning. Following up on the fuel sharing arrangement TSgt Morales and I shook on last Wednesday. My BDE needs the rate captured in writing for the SITREP this week. We're burning JP-8 off your contractor's farm effective yesterday. Please advise who I work with to formalize. Happy to walk over.\n\nV/r,\nCPT Alvarez, Army LNO"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Pause and clarify — you have no agreement on file, only a claim",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Do not sign anything that would ratify the uncoordinated burn",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Coordinate with RM (Villanueva) before committing AF fuel to a tenant unit",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Escalate to the warranted KO",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Document the call and send a non-commitment follow-up in writing",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Inter-service handshakes from your predecessor are landmines. They were often informal, often undocumented, and often exceeded the person's authority. Your job is not to make it go away; it is to wrap a proper instrument around it (or kill it) with the right approvals. Written records matter more than relationships in the long run."
  };

  window.__CCO_DATA.injects["IM-06"] = {
    "id": "IM-06",
    "observer_note": "Is the trainer letting Ramsey's priority pressure actually land, or softening the message? Observe body language and tone during the Wing CC call.",
    "quick_fires": [
      {"label": "ESCALATE — Ramsey personally", "from": "Col Ramsey (Wing/CC)", "subject": "MWR — status?", "body": "I want to see the MWR contract action on my desk before COB. Not because it matters in a war, but because the airmen have been eating MREs for three weeks and I need a morale win. Don't make me come ask again. — Ramsey"},
      {"label": "COOLDOWN — Perez plays interference", "from": "Capt Perez (455 AEW/CCX)", "subject": "Ramsey read the room", "body": "Talked him down a notch. He'll take 'in work, amber' as an answer for the 1600 update if you can show real progress. Don't promise a ribbon-cutting — promise a path. — Perez"}
    ],
    "title": "Wing CC priority MWR push",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 11,
      "earliest_minute": 30,
      "latest_hour": 12,
      "latest_minute": 30
    },
    "duration_minutes": 30,
    "description": "Col Ramsey wants a morale concert for Friday. Requirement memo arrives with 'CC priority' in 24-pt font.",
    "scenario_for_students": "A one-page memo appears in your inbox from the Wing CC directing you to 'contract a live music event for Friday night at the MWR pavilion. Budget: whatever is needed. Priority: CC directed.' It is signed Col Ramsey. There is no statement of work, no vendor list, and Friday is in four days.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Col Ramsey",
        "from_email": "ramsey.cco.mil@mail.mil",
        "subject": "MORALE EVENT FRIDAY - MAKE IT HAPPEN",
        "body": "K shop,\n\nLive music. Friday. MWR pavilion. Whatever it takes. My crews have been eating dust for 60 days and I'm done watching them stare at the wall. Find a local band. Make it work. This is CC priority.\n\nRamsey\n455 AEW/CC"
      }
    ],
    "sms_items": [
      {
        "id": "sms2",
        "contact_id": "ramsey",
        "delay_minutes": 2,
        "messages": [
          "Don't tell me it's hard",
          "Tell me it's done"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Do not salute smartly and promise Friday — the process takes longer than 4 days for a new requirement",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Respond with what IS feasible — same-weekend, alternative vendor, or an existing BPA workaround",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Engage local MWR / Services for a legitimate requirements owner signature",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Check for existing IDIQ or BPA vehicles for entertainment services",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Update Col Ramsey with a written plan before EOC",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "The Wing CC can say 'priority' as many times as they want — it does not change the FAR. Your job is to present options, not refusal. A CCO who says 'no' gets fired; a CCO who says 'yes sir' and then fails gets fired harder. A CCO who says 'here are three ways to make it happen and here is the risk on each' keeps their warrant. Translate command intent into legal action."
  };

  window.__CCO_DATA.injects["IM-07"] = {
    "id": "IM-07",
    "observer_note": "FOD emergency tests trainer pacing. If students catch the Al-Rashid gap too fast, does the trainer escalate? If they miss it, does the trainer rescue them?",
    "quick_fires": [
      {"label": "ESCALATE — runway closed", "from": "Airfield Ops", "subject": "Runway 09/27 CLOSED pending FOD sweep", "body": "Runway is RED until repair. We have a C-17 holding at Udeid with bleeding-edge mission cargo and a medevac inbound in 90 minutes. Whatever contract vehicle you're using, we need it NOW."},
      {"label": "HELPFUL — J&A for urgency", "from": "Chief of Contracting (reachback)", "subject": "FAR 6.302-2 urgency J&A", "body": "For urgency actions, cite 6.302-2. You can award up to the SAT without written J&A if it's a true emergency — document the facts in the contract file after the fact. Don't let paperwork delay runway repair."},
      {"label": "CURVEBALL — Al-Rashid calls offering help", "from": "Al-Rashid Construction", "subject": "Heard about your runway — we can be there in 2 hours", "body": "Friend, we have a crew and asphalt already staged for another job. We can divert and be on your runway in two hours. Same BPA rates as always. Just give us the go. — Al-Rashid"}
    ],
    "title": "Runway FOD emergency",
    "tlo": [
      "TLO-5-Execution",
      "TLO-4-Admin"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 12,
      "earliest_minute": 0,
      "latest_hour": 12,
      "latest_minute": 30
    },
    "duration_minutes": 60,
    "description": "Runway 09L has a FOD strike. Wing Ops says it needs repair in two hours or sorties stop. This is where the Al-Rashid expiration becomes urgent.",
    "scenario_for_students": "The Wing Ops phone tree lights up. An F-16 on departure took a bird / FOD strike and the recovery ate up 120m of concrete surface. Wing Ops needs emergency shoulder repair within two hours or the next sortie wave goes to a divert field. Dooley has already called your old BPA for runway work — Al-Rashid. Remember them?",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Wing Ops",
        "from_email": "455ops.cc.mil@mail.mil",
        "subject": "URGENT - Runway 09L FOD - CONTRACT SUPPORT NEEDED",
        "body": "CCO,\n\nRunway 09L has FOD damage from 0945L F-16 departure. Recovery team working now. Wing/CC wants runway repaired in time for the 1330L push. That means concrete work complete NLT 1300L. We know the call goes to Al-Rashid. Need your team to place the order immediately.\n\nWing Ops"
      }
    ],
    "sms_items": [
      {
        "id": "sms2",
        "contact_id": "dooley",
        "delay_minutes": 3,
        "messages": [
          "Need you to place the Al-Rashid call RIGHT NOW",
          "This is what the BPA is for",
          "Don't overthink this"
        ]
      },
      {
        "id": "sms3",
        "contact_id": "ramsey",
        "delay_minutes": 6,
        "messages": [
          "Sortie cycle stops in 90 minutes",
          "Tell me it's done"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Al-Rashid BPA is EXPIRED — placing a call on it is an unauthorized commitment",
        "priority": "critical",
        "objective": true,
        "notes": "If the student caught this in IM-01, they are already mitigating. If not, this is the moment."
      },
      {
        "id": "a2",
        "description": "Find an alternate vehicle: another BPA, simplified acquisition, or emergency sole-source J&A",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Notify Wing Ops that the exact vendor/timeline is changing so they can adjust",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Coordinate with RM for emergency funding release",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Document the entire timeline in the contract file — this will be scrutinized",
        "priority": "high",
        "objective": true
      }
    ],
    "teaching_point": "Emergencies are when CCOs get fired. They are also when they earn their reputation. The only way to survive this type of moment is to have done the boring file work earlier — which is why IM-01 exists. If you caught the Al-Rashid expiration on Day 1, this inject is a ten-minute problem. If you didn't, this inject is a career event. FAR 6.302-2 (urgent and compelling) is legitimate, but only if you actually use it with paper, not verbally over radios."
  };

  window.__CCO_DATA.injects["IM-08"] = {
    "id": "IM-08",
    "observer_note": "Ramsey's 10 minutes is a time-pressure drill. Observe whether the trainer actually enforces the clock or lets students ramble past it. Clock enforcement matters.",
    "quick_fires": [
      {"label": "INTERRUPT — Ramsey checks watch", "from": "Col Ramsey", "subject": "3 minutes", "body": "[Ramsey taps his watch and raises an eyebrow. Three minutes left. Is the lead on track or babbling?]"},
      {"label": "HOSTILE — Ramsey interrupts", "from": "Col Ramsey", "subject": "Stop. Bottom line.", "body": "[Ramsey interrupts.] Stop. I don't need the backstory. Give me the bottom line in one sentence and tell me what you need from me."}
    ],
    "title": "Ramsey's 10 minutes",
    "tlo": [
      "TLO-1-Ethics",
      "TLO-3-Standup"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 12,
      "earliest_minute": 30,
      "latest_hour": 13,
      "latest_minute": 30
    },
    "duration_minutes": 15,
    "description": "Col Ramsey wants a face-to-face. The promised 'ten minutes' is actually ten minutes of fast questions.",
    "scenario_for_students": "You report to Col Ramsey's office. He is signing things without looking up. He asks four rapid-fire questions: (1) who is your backup if you go down, (2) what is the one thing on fire today, (3) do you need anything from him, (4) why are you still in his office.",
    "sms_items": [
      {
        "id": "sms1",
        "contact_id": "ramsey",
        "delay_minutes": 0,
        "messages": [
          "In my office 5 minutes"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Have a crisp answer ready for each of the four questions",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Do NOT ask him for his opinion — he is asking yours",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Name the ONE thing on fire clearly, not a list of five",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Ask for one specific thing (authority, access, top cover) — not nothing, not ten things",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Leave on time — do not linger",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Senior leaders measure you in the first 30 seconds. Come with answers, come with a single top priority, come with one ask. If you cannot synthesize your job into four sentences, you are not ready for the job. Ramsey will remember this meeting when you come back in a week needing something."
  };

  window.__CCO_DATA.injects["IM-09"] = {
    "id": "IM-09",
    "observer_note": "Latrine honeywagon is low-glamour but real. Watch whether the trainer maintains seriousness or cracks jokes — jokes here signal the trainer isn't respecting the exercise.",
    "quick_fires": [
      {"label": "ESCALATE — hygiene complaint", "from": "455 MDG/PH", "subject": "latrine sanitation — becoming a health issue", "body": "Public Health here. We're getting complaints from 2 FS that the latrines are unusable. This is about 48 hours from becoming a reportable sanitation issue. Need contracts to push the honeywagon vendor TODAY."},
      {"label": "HELPFUL — alt vendor", "from": "Host Nation Liaison", "subject": "Backup honeywagon option", "body": "If your primary isn't showing, there's a second regional vendor (Al-Noor Sanitation) who carries a standing ceiling with a different USAF shop. Warm handoff available if you want."}
    ],
    "title": "Latrine honeywagon no-show",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "green",
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 13,
      "earliest_minute": 0,
      "latest_hour": 14,
      "latest_minute": 0
    },
    "duration_minutes": 20,
    "description": "The contracted waste removal truck did not show. By 1600 it becomes a health issue. By 1800 it becomes a Wing CC issue.",
    "scenario_for_students": "Services calls. The honeywagon contractor, usually a reliable local vendor, did not arrive this morning. They are not answering the number on file. MWR has an event tonight. The crew that runs the gym has already complained. It is 1230L and this gets worse by the hour.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "TSgt Kowalski (Services NCOIC)",
        "from_email": "kowalski.serv.mil@mail.mil",
        "subject": "Waste contractor no-show",
        "body": "K shop, our honeywagon guy did not show this morning. Phone goes to voicemail, voicemail full. Our tank level is at 75% and we have 600 people on base plus the MWR thing tonight. What's plan B?"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Make the phone calls yourself — don't delegate the sleuthing",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Identify an alternate vendor or an emergency workaround fast",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Escalate the original vendor's breach for potential cure notice or termination",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a4",
        "description": "Coordinate with Services to buffer time (limit flushing, etc.) while you find a fix",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Document the outage and time in the performance file",
        "priority": "medium",
        "objective": true
      }
    ],
    "teaching_point": "Nobody becomes a deployed CCO to solve sewage problems. Everybody does. The unglamorous 90% of deployed contracting is keeping services continuity intact, and the only way to do it well is to know your vendors personally, have backups before you need them, and be willing to make twenty phone calls in an hour. When a contractor ghosts you, it is rarely about money — it is usually illness, family emergency, or a bigger job stealing their attention. Handle humanely, document firmly."
  };

  window.__CCO_DATA.injects["IM-10"] = {
    "id": "IM-10",
    "observer_note": "Finance kickback is an ethics test. Grade whether the trainer stays poker-faced instead of telegraphing 'this is wrong' through facial expressions.",
    "quick_fires": [
      {"label": "ESCALATE — Finance flags a second call", "from": "Finance (FM)", "subject": "second BPA call looks identical", "body": "Hey, we're reviewing another BPA call on the same vendor from last week. It has the same suspiciously round number ($14,985). That's two in two weeks. Pattern or coincidence?"},
      {"label": "COVER — CCO who placed the call", "from": "CCO (buddy in the shop)", "subject": "about that call", "body": "hey i just want to explain — the vendor threw in extra consumables last time and I wrote the call for the round number because the invoice was going to be close anyway. not a kickback. can we talk before you escalate?"}
    ],
    "title": "Finance kickback on BPA call",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 14,
      "earliest_minute": 0,
      "latest_hour": 15,
      "latest_minute": 0
    },
    "duration_minutes": 25,
    "description": "RM rejects a routine BPA call over an EOR mismatch. Blocks three downstream actions.",
    "scenario_for_students": "CMSgt Villanueva walks a rejected 1449 back to you. The EOR on the TFL generator mod does not match the object class she sees in GFEBS. She is annoyed because this has happened twice already since the turnover. She says 'I need you to own this or I'm going to the SQ CC.'",
    "sms_items": [
      {
        "id": "sms1",
        "contact_id": "villanueva",
        "delay_minutes": 2,
        "messages": [
          "Your EOR on the TFL mod is wrong AGAIN",
          "This is the third time in 30 days",
          "I need to see you fix this today or I'm calling the FM squadron CC"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Pull the regs on EOR classification — do not guess",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Ask Villanueva to walk you through GFEBS once so the pattern is fixed",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a3",
        "description": "Do NOT argue that 'Morales was doing it this way' — own the current state",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Correct the 1449 and resubmit with a clean audit trail",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Close the loop with an apology memo or visit",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "RM is not an obstacle. RM is the only friend you have when the audit comes. Treat a finance rejection as a free consulting session — they are telling you exactly how to avoid a future pay freeze. The CCOs who lose Villanueva's good will are the ones who treat her like an obstruction; the ones who treat her like a teammate get their money first."
  };

  window.__CCO_DATA.injects["IM-11"] = {
    "id": "IM-11",
    "observer_note": "Double-booked linguist tests prioritization. Observe whether the trainer injects noise (a second call) when students are handling it too calmly.",
    "quick_fires": [
      {"label": "ESCALATE — both units demand resolution", "from": "2 FS/DO", "subject": "we were promised Ms. Karimi at 0900", "body": "We are starting the detainee interview at 0900. We cannot proceed without our linguist. This is a mission requirement. What is contracting doing to fix this?"},
      {"label": "HELPFUL — contract review", "from": "Linguist services contract file", "subject": "contract priority language", "body": "FYI the base linguist contract has no priority language — requests are handled FCFS by the vendor. You'll need to designate a COR to formally deconflict, or escalate to Wing and have them pick a loser."}
    ],
    "title": "Double-booked linguist",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 14,
      "earliest_minute": 30,
      "latest_hour": 15,
      "latest_minute": 0
    },
    "duration_minutes": 20,
    "description": "Two vendors need linguist support at the same time. Only one is available. Both think they have priority.",
    "scenario_for_students": "Your linguist BPA supports all contracted work that touches local labor. Today, Al-Rashid (runway, if still using them) needs a linguist for a workforce brief, and the waste vendor (if you found a new one) also needs one. Only one linguist is scheduled. Both project managers are calling you.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Linguist BPA coordinator",
        "from_email": "ops@levantlinguist.com",
        "subject": "Double-book conflict",
        "body": "CCO, we have two simultaneous requests for 1400L. Can only send one. Who has priority?"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Pick based on mission priority (life/safety > routine)",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Communicate the decision to both vendors in writing",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Do NOT tell either vendor 'the other one won' — say why",
        "priority": "medium",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Document the decision factor in the file",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Flag the pattern for the linguist BPA owner to get a bigger roster",
        "priority": "low",
        "objective": false
      }
    ],
    "teaching_point": "You will make decisions all day that disappoint someone. The skill is not making everyone happy — it is making the right call clearly and documenting it cleanly. When you get challenged six weeks later, the file tells the story."
  };

  window.__CCO_DATA.injects["IM-12"] = {
    "id": "IM-12",
    "observer_note": "COR walkoff — observe whether the trainer plays the departing COR as angry/hurt or as professional. The right answer is angry but not crazy.",
    "quick_fires": [
      {"label": "ESCALATE — COR explains why", "from": "Outgoing COR (MSgt Kovac)", "subject": "why I'm walking", "body": "I've been the COR on this contract for 90 days. Vendor has missed 6 of 12 deliverables. I've documented every one. When I tried to issue a cure notice the last CCO told me to 'work it out with the vendor.' I'm done. You need a new COR."},
      {"label": "HELPFUL — replacement process", "from": "Chief of Contracting (reachback)", "subject": "COR replacement", "body": "Appoint the new COR with a written designation letter specifying duties and dollar threshold. Brief them on what the outgoing COR documented. Don't lose the surveillance records — those are what you'll need if you have to terminate."}
    ],
    "title": "COR walkoff",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 15,
      "earliest_minute": 0,
      "latest_hour": 16,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "Maj Perez refuses to continue as COR because 'nothing is in writing.' He is right.",
    "scenario_for_students": "Maj Perez shows up at your door. He is the COR for the TFL BPA. He says he cannot continue to be the COR because he has never seen his appointment letter, has not been trained in the current fiscal year, and 'Morales kept telling me it was coming.' He wants paperwork today or he is returning his authority.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Maj Perez",
        "from_email": "alejandra.perez.mil@mail.mil",
        "subject": "COR responsibility - formal notice",
        "body": "K shop,\n\nPer AFFARS 5301.602-2, I am notifying you that I do not have a current COR appointment letter on file for the TFL BPA or any other instrument I have been nominally administering. I have not been trained in the current FY. Until these are remedied, I am declining to sign any additional COR documentation. I consider this a constructive return of any authority previously delegated to me.\n\nMaj Perez"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Recognize this as a valid, professional refusal — do not argue",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Inventory all COR letters in the shop immediately",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Issue fresh letters with correct authority citations for any active COR",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Route Perez to COR refresher training ASAP",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Thank Perez in writing — he just saved you from an audit finding",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "COR administration is where audits go to feed. An un-lettered COR is a ghost; their signatures mean nothing. If you inherit a shop where CORs are operating without current paperwork, stop everything until you fix it. Maj Perez did you a favor by refusing — most CORs just keep signing and leave you exposed."
  };

  window.__CCO_DATA.injects["IM-13"] = {
    "id": "IM-13",
    "observer_note": "SIPR outage is a pacing curveball. Watch the trainer's call on WHEN to fire it — mid-complexity is right, beginning or end is wrong.",
    "quick_fires": [
      {"label": "ESCALATE — SIPR outage extends", "from": "COMM", "subject": "SIPR outage — est 6 more hours", "body": "Satellite link degraded. We're routing through DISA but throughput is 10% of normal. Classified signed docs are stuck in queue. Mod deadline at risk."},
      {"label": "HELPFUL — manual workaround", "from": "Chief of Contracting (reachback)", "subject": "offline signature workaround", "body": "Print, wet-sign, scan to SIPR later. Document the reason for the manual process in the contract file. Legally valid if you preserve a verifiable audit trail. Do NOT use NIPR for classified content just because SIPR is slow."}
    ],
    "title": "SIPR outage mid-mod",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "green",
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 15,
      "earliest_minute": 0,
      "latest_hour": 17,
      "latest_minute": 0
    },
    "duration_minutes": 45,
    "description": "SIPR goes down right as you are signing a contract mod that requires secure fund-cert.",
    "scenario_for_students": "SIPR is down for a rolling outage expected to last 'between 90 minutes and 6 hours, depending.' You were mid-transaction on a contract mod that requires secure-side certification. The vendor is waiting. The customer is waiting. The clock is running.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Base Comm Flt CC",
        "from_email": "commflight.cc.mil@mail.mil",
        "subject": "SIPR rolling outage 1400-TBD",
        "body": "All units - rolling SIPR outage beginning 1400L, expected return NLT 2000L. Plan workarounds."
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Do NOT attempt a workaround (unclass email, personal phone) for secure material",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Pause the transaction gracefully and communicate to vendor",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Use the time to knock out unclass file work",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a4",
        "description": "Note the outage impact for the comm flight AAR",
        "priority": "low",
        "objective": false
      }
    ],
    "teaching_point": "Classified-side outages are operational friction. They will not be the last time something out of your control disrupts the day. The right move is to pause professionally, protect classified info, and fill the dead time with productive unclass work. CCOs who try to 'work around' a SIPR outage by discussing contract details on the wrong system earn permanent file drawer attention."
  };

  window.__CCO_DATA.injects["IM-14"] = {
    "id": "IM-14",
    "observer_note": "Finance co-located is dry procedure. Observe whether the trainer lets boring material breathe or rushes past it because they're bored themselves.",
    "quick_fires": [
      {"label": "HELPFUL — finance brief", "from": "Finance (FM)", "subject": "the actual rules on co-location", "body": "Quick brief: we can co-locate in your office for efficiency but each discipline stays in its own lane. I certify funds, you obligate. I cannot obligate. You cannot certify. Any appearance of either blurs the separation of duties — and the IG will find it."},
      {"label": "PROBE — appearance question", "from": "Capt Perez (455 AEW/CCX)", "subject": "just checking", "body": "FYI — someone from 2 FS mentioned finance and contracts are 'basically the same office.' I'm sure you know where the line is but you might want to clean up the appearance before IG notices. — Perez"}
    ],
    "title": "Finance co-located reality check",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 16,
      "earliest_minute": 0,
      "latest_hour": 17,
      "latest_minute": 0
    },
    "duration_minutes": 20,
    "description": "Villanueva drops a bomb: the 'co-located finance' on your startup sheet is actually 90 minutes away.",
    "scenario_for_students": "CMSgt Villanueva comes by to tell you that the 'finance co-located' modifier on your setup sheet is misleading. Finance has a satellite cell on Eagle Crest, but all fund certifications route through the main FMA at FOB Thunder, 90 minutes away by convoy or 20 minutes by helo. Same-day cert is a fiction. Your process needs to account for this.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Update your shop's timelines for fund cert by +1 business day",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Build a rhythm for daily packet drops to the remote FMA",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a3",
        "description": "Educate the customer base that 'today' is not possible for new certs",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a4",
        "description": "Communicate the lag to Dooley and other high-tempo customers proactively",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Deployed shops inherit a lot of documentation that was accurate three rotations ago. Verify your inputs before you commit to timelines. Villanueva was not trying to catch you in a lie — she was trying to keep you from making a promise you couldn't keep."
  };

  window.__CCO_DATA.injects["IM-15"] = {
    "id": "IM-15",
    "observer_note": "EOD FOO request is high-stakes. Observe whether the trainer lets the tension build before students reach for the right answer — or defuses it too early.",
    "quick_fires": [
      {"label": "ESCALATE — EOD doubles down", "from": "EOD Flight Chief", "subject": "FOO — where are we?", "body": "Every hour we don't have the overpressure suit rental is an hour my team is working without proper PPE. I need a FOO letter, I need it today, and I don't care what color the paperwork is. — EOD/CC"},
      {"label": "HELPFUL — FOO template", "from": "Chief of Contracting (reachback)", "subject": "Field Ordering Officer appointment", "body": "Attaching the FOO appointment template. Limited to SAT ($10k). Must be trained. Must keep receipts. Not a substitute for a contract — only for emergency purchases where no existing vehicle works. Read FAR 13.301."}
    ],
    "title": "EOD overpressure FOO request",
    "tlo": [
      "TLO-1-Ethics",
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 16,
      "earliest_minute": 30,
      "latest_hour": 17,
      "latest_minute": 30
    },
    "duration_minutes": 40,
    "description": "EOD has a mission requirement that needs cash-on-hand purchases RIGHT NOW. FOO authority is requested.",
    "scenario_for_students": "MSgt Burris from EOD calls. He needs batteries, a specific type of foam tape, and protective sheeting — right now, for a controlled detonation tomorrow at 0500L. His Wing-approved SCO has not shown up. He wants to make cash purchases in town and get reimbursed. He wants you to authorize him as an FOO or direct him to a current one.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "MSgt Burris (EOD)",
        "from_email": "burris.eod.mil@mail.mil",
        "subject": "FOO request - time critical",
        "body": "CCO, EOD is standing up a controlled det for 0500L tomorrow. Need three items from the local economy tonight: 9V lithium batteries, 2in foam tape, Visqueen poly sheeting. My SCO is on emergency leave and nobody warranted me as an FOO. Can you appoint me or point me to a current FOO? I'll handle receipts and reconciliation same-day.\n\nBurris\nEOD MSgt"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Do NOT appoint an FOO on the fly just because someone asks — there is a training and nomination path",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Check whether an existing current FOO can help",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Consider whether a simplified purchase with a GPC holder solves the problem faster",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Document the urgency justification in writing",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "If no path exists, escalate — do not shortcut",
        "priority": "high",
        "objective": true
      }
    ],
    "teaching_point": "FOO (Field Ordering Officer) authority is not a favor. It carries training, bond, audit, and criminal liability. Every rotation has at least one emotional request to 'just appoint me quick,' and every rotation's CCO needs to say no. Solve the mission through a legal path — there almost always is one if you look for thirty seconds before reacting."
  };

  window.__CCO_DATA.injects["IM-16"] = {
    "id": "IM-16",
    "observer_note": "Overnight email avalanche is triage practice. Observe whether the trainer resists the urge to narrate which emails matter. Silent observation is the hard part.",
    "quick_fires": [
      {"label": "CURVEBALL — more email", "from": "Morning overnight (from Morales)", "subject": "forgot to mention one more thing", "body": "Team — one more thing I didn't get to in the handoff. The Mediterranean Supply Partners BPA — check SAM before using it. I had a weird feeling about them. No time to look into it. Good luck. — Morales"},
      {"label": "NOISE — morale fund memo", "from": "FSS Morale Committee", "subject": "morale fund quarterly report", "body": "The Q3 morale fund report is attached. Please review for any comments before the town hall Thursday. Snack bar proceeds up 8%."}
    ],
    "title": "Overnight email avalanche",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 8,
      "earliest_minute": 30,
      "latest_hour": 8,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "Seven funding / contract actions piled up overnight. Triage or drown.",
    "scenario_for_students": "You open your inbox Day 2 and seven new requirements are waiting. None are marked priority. Two are from squadrons you do not know. One is labeled 'FYI.' One has an attachment that will not open. One is in Arabic. One is a reply to an email you never sent. One is from Ramsey with 'see below' and a three-reply chain underneath.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "SFS Flt/CC",
        "from_email": "sfs.cc.mil@mail.mil",
        "subject": "New requirement - K9 kennel repair",
        "body": "CCO, our K9 kennel roof is leaking. Need repair by end of week. Low dollar, should be easy. Thx"
      },
      {
        "id": "msg2",
        "from": "MSG CC",
        "from_email": "msg.cc.mil@mail.mil",
        "subject": "Recurring lawn/grounds contract",
        "body": "CCO, we need a recurring contract for grounds maintenance around the CC's living area. Please advise options."
      },
      {
        "id": "msg3",
        "from": "Col Ramsey",
        "from_email": "ramsey.cco.mil@mail.mil",
        "subject": "FW: FW: FW: See below",
        "body": "Need this handled\n\n------- Original ------\n[a chain of 7 forwards about a broken ice machine]"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Triage before replying — decide which of the seven are actually your work",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Identify anything that is not actually a contract action (GPC, self-help, another shop's lane)",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Assign a target response time per message and stick to it",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a4",
        "description": "Do not try to resolve all seven before lunch — create a queue",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Write a brief email-hygiene memo for requesters so Day 3 is easier",
        "priority": "low",
        "objective": false
      }
    ],
    "teaching_point": "An overfull inbox is a test of judgment, not work ethic. A CCO who tries to solve every email as it arrives will be working at 2am and still not done. Triage ruthlessly. Not every message is a requirement — some are FYI, some are wrong shop, some are self-inflicted noise. Protect your focus for the three things that actually matter today."
  };

  window.__CCO_DATA.injects["IM-17"] = {
    "id": "IM-17",
    "observer_note": "Read file due. Trainer's job is to NOT remind students until deadline. Observe whether the trainer can hold their tongue or starts prompting.",
    "quick_fires": [
      {"label": "HOSTILE — Perez on the read file", "from": "Capt Perez (455 AEW/CCX)", "subject": "read file — 1800", "body": "Ramsey wants the read file on his desk by 1800, not EOD. If you're not ready, that's a conversation you want to have now, not at 1759. — Perez"},
      {"label": "HELPFUL — read file template", "from": "Prior rotation (Lt Chen)", "subject": "read file template that worked last time", "body": "Here's the read file template from our rotation that Ramsey signed without revision. One page. Top: portfolio summary (dollars + vehicles). Middle: active risks. Bottom: asks. No flowery language. He skims."}
    ],
    "title": "Wing CC read file comes due",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 8,
      "earliest_minute": 0,
      "latest_hour": 9,
      "latest_minute": 0
    },
    "duration_minutes": 25,
    "description": "Capt Perez (455 AEW/CCX) wants the read file draft today. The deliverable Morales set up on Day 1.",
    "scenario_for_students": "Capt Perez (the Wing CC executive, not Maj Perez the COR) stops by. She is pleasant but direct: the Wing CC read file is due EOD today. It should include active contract summary, expiring actions, known issues. She will review before the CC sees it. She wants a draft by lunch for comment.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Capt Perez (455 AEW/CCX)",
        "from_email": "rebecca.perez.mil@mail.mil",
        "subject": "Wing CC read file - need draft by 1200L",
        "body": "CCO,\n\nPlease send the K shop read file draft for Col Ramsey NLT 1200L. I will review and return with comments by 1400L. Final due to Col Ramsey NLT 1800L. Standard format (active portfolio, expiring, known issues, mitigations). Not a long doc - 2-3 pages max.\n\nV/r, Capt Perez, 455 AEW/CCX"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Use the inventory work from Day 1 as the backbone of the read file",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Be honest about the Al-Rashid expiration in the document, not defensive",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Keep it to 2-3 pages — senior leaders do not read long",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a4",
        "description": "Lead with 'what's on fire,' not 'what's fine'",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Get the draft to Capt Perez on time even if imperfect",
        "priority": "high",
        "objective": true
      }
    ],
    "teaching_point": "A read file is a trust-building artifact. Senior leaders form their opinion of your shop from the first two paragraphs. Be honest about the bad news — it signals integrity and prevents them from learning it from someone else. Hide a problem and you are done."
  };

  window.__CCO_DATA.injects["IM-18"] = {
    "id": "IM-18",
    "observer_note": "Bribery attempt is a cornerstone ethics inject. Grade the trainer on vendor character consistency and on NOT breaking to check if students 'got it.'",
    "quick_fires": [
      {"label": "PRESSURE — vendor pushes harder", "from": "Haddad (TFL)", "subject": "the gift", "body": "Friend, it is insulting for me to come to your office and be turned away. In my culture refusing a gift damages the relationship. Please, for the sake of our work together, accept it as a gesture of respect. No one will know."},
      {"label": "HELPFUL — ethics reference", "from": "Staff Judge Advocate", "subject": "JER on gifts", "body": "Joint Ethics Regulation DoD 5500.07-R, Chapter 2: you may not accept a gift from a prohibited source. A vendor on an active contract is a prohibited source. De minimis exception does NOT apply in deployed environments. Refuse the gift. Report it. Document it."}
    ],
    "title": "Vendor bribery attempt",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 9,
      "earliest_minute": 0,
      "latest_hour": 10,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "A TFL vendor rep offers you a $500 hand-knotted rug 'as a welcome gift' in front of witnesses.",
    "scenario_for_students": "The TFL BPA owner, Mr. Saiid, comes by to welcome you to the shop. He is friendly, generous, speaks good English, and has worked with Americans for twelve years. Before leaving he unrolls a hand-knotted rug from a bag — 'a gift for your office, as is the tradition here.' It is clearly high-value (~$500). Your clerk is watching. Dooley is in the hallway. Your own instinct is to refuse; his body language says refusal will insult him publicly.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Refuse the gift — period",
        "priority": "critical",
        "objective": true,
        "notes": "JER 5500.7-R limits gifts to $20, period, and rug exceeds."
      },
      {
        "id": "a2",
        "description": "Refuse in a way that preserves the relationship (blame the rule, not the person)",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Document the attempt in writing within 24 hours",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Notify the ethics counselor / judge advocate",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Do not accept the gift 'on behalf of the office' — that is the same thing",
        "priority": "critical",
        "objective": true
      }
    ],
    "teaching_point": "Gift culture is real and CCOs who deploy into it get tripped up constantly. The trick is to refuse with warmth — 'I wish I could, the rules do not allow it, and the rules exist to protect both of us.' Document the attempt not because you think Saiid is corrupt, but because sunlight prevents a future 'he never told me' dispute. This is one of the most common integrity failures in deployed contracting. The stakes are your clearance and your career."
  };

  window.__CCO_DATA.injects["IM-19"] = {
    "id": "IM-19",
    "observer_note": "Host nation labor walkoff has cross-cultural angles. Observe whether the trainer maintains cultural nuance or flattens it into stereotypes.",
    "quick_fires": [
      {"label": "ESCALATE — host nation rep", "from": "Host Nation Liaison", "subject": "labor dispute — cultural angle", "body": "The walkoff is about overtime not being paid on the last rotation. The men are embarrassed to raise it formally. If you can arrange back pay (even symbolic) and apologize through their foreman, this resolves in hours. Otherwise it lasts weeks."},
      {"label": "PRESSURE — Wing needs them back", "from": "Col Ramsey (Wing/CC)", "subject": "host nation labor — fix it", "body": "I don't care whose fault it is. I need those workers back on the flight line by tomorrow morning or our sortie generation drops. Fix it. — Ramsey"}
    ],
    "title": "Host nation labor walkoff",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 9,
      "earliest_minute": 30,
      "latest_hour": 10,
      "latest_minute": 0
    },
    "duration_minutes": 45,
    "description": "Tarkani workers on the base laundry and DFAC contract walk off over a pay dispute with their own company.",
    "scenario_for_students": "Half your base services just stopped. About 40 Tarkani locals who work for the laundry / DFAC / gate escort contractor have walked off in protest of 'two paychecks missing' from their company. Their grievance is with their own employer, not the USG — but you are the USG face of this contract. The DFAC is down. Gate escorts are shorthanded. The contractor PM is blaming 'banking delays.'",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Services SQ CC",
        "from_email": "svcs.cc.mil@mail.mil",
        "subject": "DFAC shut down - labor walkoff",
        "body": "CCO - our host nation labor just walked off. DFAC is closed. I need this fixed or mid-rats tonight is MREs. Talk to the PM."
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Recognize this is a prime contractor labor issue, not USG",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Do NOT offer USG money to the workers directly — that is a Trafficking Victims Protection Act trap",
        "priority": "critical",
        "objective": true,
        "notes": "TVPA (22 USC 7104) is a career event if mishandled."
      },
      {
        "id": "a3",
        "description": "Pressure the PM through contract performance (cure notice threat)",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Coordinate with legal (JA) before committing to any statement to the workers",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Arrange immediate workaround with Services for the gap",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "Host nation labor disputes are where the US government learns that 'prime contractor' is the right layer of abstraction. Your leverage is the contract, not your checkbook. Bypass that line and you violate the Trafficking Victims Protection Act — which is not theoretical; CCOs have been relieved for it. Work the contract, support the workers indirectly by pressuring the prime, and document everything."
  };

  window.__CCO_DATA.injects["IM-20"] = {
    "id": "IM-20",
    "observer_note": "GPC limit — observe whether the trainer allows students to propose creative wrong answers before redirecting. Wrong answers are the lesson.",
    "quick_fires": [
      {"label": "ESCALATE — cardholder desperate", "from": "TSgt GPC cardholder", "subject": "card denied at the register", "body": "I'm standing at Al-Noor Hardware with a cart full of emergency supplies and my card just got declined. They're calling my name. What do I do? Is there a workaround or do I put this stuff back?"},
      {"label": "HELPFUL — limit increase process", "from": "GPC Program Office", "subject": "limit adjustment", "body": "Temporary limit adjustments require APC approval. Standard turnaround is 24-48 hours. For emergencies under the micro-purchase threshold, you can sometimes split across cardholders — but NOT to avoid oversight. Call the APC, document the rationale."}
    ],
    "title": "GPC limit exhausted",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "green",
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 10,
      "earliest_minute": 0,
      "latest_hour": 11,
      "latest_minute": 0
    },
    "duration_minutes": 20,
    "description": "Your only two GPC holders have hit monthly limits. Small purchases are blocked.",
    "scenario_for_students": "Your two base-level GPC holders come to you: both have hit their single-purchase or monthly limits. Every routine $400 buy now has to route through the K shop or go unfunded. This was not on your inherited turnover sheet.",
    "sms_items": [
      {
        "id": "sms1",
        "contact_id": "perez",
        "delay_minutes": 2,
        "messages": [
          "Need a GPC for printer toner",
          "The SFS GPC lady says she's over limit",
          "What do I do"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Verify the limit claim against the official GPC records — do not take it on face",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Look for additional GPC holders or emergency limit increase",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Channel small purchases through simplified acq procedures as a stopgap",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a4",
        "description": "Plan a GPC limit review with the installation A/OPC",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Do NOT split requirements to stay under threshold — that is a contract violation",
        "priority": "critical",
        "objective": true
      }
    ],
    "teaching_point": "GPC is the flex capacity of a shop, not a casual tool. When it is exhausted, the cost lands on YOUR workload. Plan accordingly. And never — never — 'split' a requirement to dodge a threshold; the FAR prohibits it explicitly and auditors find it every single time."
  };

  window.__CCO_DATA.injects["IM-21"] = {
    "id": "IM-21",
    "observer_note": "IG audit drop-in is a composure test for students. Observe whether the trainer plays the IG as professional-neutral (correct) or aggressive (wrong).",
    "quick_fires": [
      {"label": "PROBE — IG asks about Al-Rashid", "from": "IG (interim)", "subject": "Al-Rashid records", "body": "While we're here, can we see the Al-Rashid Construction contract file? Everything you have on it, including the BPA call history. We're not here specifically for that one, but your name came up adjacent to it."},
      {"label": "HELPFUL — JAG on records", "from": "Staff Judge Advocate", "subject": "you can hand over records", "body": "You are cleared to provide contract records to the IG without privilege. Be complete. Don't summarize — hand them the actual files. Document what you handed over in a memo for record."}
    ],
    "title": "IG records audit drop-in",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 10,
      "earliest_minute": 30,
      "latest_hour": 11,
      "latest_minute": 0
    },
    "duration_minutes": 60,
    "description": "SAF/IG inspectors pull a random file sample. You have 30 minutes to pull the docs.",
    "scenario_for_students": "Two inspectors arrive unannounced with a memo from SAF/IG for a records sample: five contract files randomly selected, plus the COR letter book, plus the ratification log. They want everything in 30 minutes. They are courteous but on a schedule.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Maj Cortez (SAF/IG TDY)",
        "from_email": "cortez.ig.tdy.mil@mail.mil",
        "subject": "Records inspection today",
        "body": "CCO,\n\nPer SAF/IG records sampling protocol, we will be on site at 1030L to review five sampled contract files, your current COR letter book, and your ratification log. Please have artifacts ready. Brief, professional, and we will be out of your hair by 1300L.\n\nMaj Cortez, SAF/IG"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Do NOT try to 'fix' files before handing them over — that is worse than the findings",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Pull exactly what is asked, no extras",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Provide a point of contact for questions so they do not rummage",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a4",
        "description": "Be transparent about the Al-Rashid issue and the ratification if asked",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "After the visit, debrief your team calmly",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "An IG visit is not personal. The inspectors are not there to get you — they are there to sample. Cooperate cleanly, do not pre-polish, and let the file tell the story. Inspectors respect transparency more than perfection. The worst CCOs try to rewrite history; the best acknowledge the ratification package and move on."
  };

  window.__CCO_DATA.injects["IM-22"] = {
    "id": "IM-22",
    "observer_note": "Cozy BPA flag — the trainer needs to read as concerned-colleague, not prosecutor. Grade tone.",
    "quick_fires": [
      {"label": "PROBE — deputy notices", "from": "Chief of Contracting (reachback)", "subject": "BPA obligations on TFL", "body": "Just ran the BPA usage report. TFL has 78% of your shop's BPA obligations this quarter. That's high. Any reason to diversify?"},
      {"label": "COVER — 'we just use who works'", "from": "Prior CCO", "subject": "Haddad context", "body": "FWIW — the TFL relationship is strong because Haddad actually delivers. Other vendors in theater are unreliable. Don't break something that works just to spread the wealth. — [redacted]"}
    ],
    "title": "Cozy BPA relationship flag",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 11,
      "earliest_minute": 0,
      "latest_hour": 12,
      "latest_minute": 0
    },
    "duration_minutes": 25,
    "description": "You notice the TFL BPA owner and the CE SMSgt (Dooley) are uncle/nephew through marriage. No disclosure on file.",
    "scenario_for_students": "While reading an old inspection report for the TFL BPA, you notice a footnote: the contractor PM, Mr. Saiid, is Dooley's wife's cousin by marriage. No organizational conflict of interest (OCI) disclosure is in the file. Dooley is the primary CE customer for TFL work and signs off on nearly every job.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Do NOT confront Dooley on suspicion alone — gather facts",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Review the OCI disclosure requirements in the BPA clause package",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Consult JA before making accusations",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "If confirmed, require a disclosure statement and reassess Dooley's role",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Document the discovery in a memo for record, not loose notes",
        "priority": "high",
        "objective": true
      }
    ],
    "teaching_point": "Organizational conflicts of interest (OCI) are slow-burning landmines. They rarely involve outright corruption; more often they are 'everybody knows' relationships that were never disclosed because nobody asked. Your job as incoming CCO is to ask. Discovering an undisclosed OCI is not a disaster — covering it up is. Handle through JA, document cleanly, and do not personalize it."
  };

  window.__CCO_DATA.injects["IM-23"] = {
    "id": "IM-23",
    "observer_note": "Dust storm curtain crisis is a logistics scramble. Observe whether the trainer keeps the phone tree moving or lets silences stall the scenario.",
    "quick_fires": [
      {"label": "ESCALATE — sortie generation at risk", "from": "Maintenance Group/CC", "subject": "without those curtains we park the jets", "body": "The dust storm is inbound in 4 hours. If we don't have the containment curtains staged we degrade engine health across the fleet. Contracting needs to tell me YES or NO right now so I can plan."},
      {"label": "HELPFUL — emergency purchase auth", "from": "Chief of Contracting (reachback)", "subject": "SAT emergency purchase", "body": "Use FAR Part 13 simplified acquisition. Cite urgency under 13.106-1(b). Oral RFQ acceptable. Keep the contract file current. Under $250k you have wide latitude — USE IT."}
    ],
    "title": "Dust storm curtain crisis",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "green",
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 11,
      "earliest_minute": 30,
      "latest_hour": 12,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "A haboob is 3 hours out. The MWR pavilion from IM-06 has no wind protection. Wing CC is watching weather.",
    "scenario_for_students": "The weather flight issued a haboob warning: dust storm inbound in 2.5 hours, gusts 40 kt. The MWR event (from IM-06, if you made it happen) is scheduled for tomorrow and the pavilion has no sidewalls. Wing CC's exec calls to ask 'what is the plan.'",
    "sms_items": [
      {
        "id": "sms1",
        "contact_id": "ramsey",
        "delay_minutes": 4,
        "messages": [
          "Haboob is coming",
          "Don't tell me Friday is cancelled"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Contact an existing vendor (TFL maybe) for emergency temp sidewall rental",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Accept that 'same-day tarp' is cheaper and faster than 'next-day proper curtain'",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Do NOT write a new SOW — use an existing vehicle",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Communicate realistic options to the exec, not yes/no",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Document a brief M4R for the emergency call",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Weather is the great scheduling overrule. A CCO who resists weather reality loses credibility; one who reshapes the plan around weather gains it. Use existing vehicles aggressively in time-critical moments and save the elegant procurement for non-emergencies."
  };

  window.__CCO_DATA.injects["IM-24"] = {
    "id": "IM-24",
    "observer_note": "Chaplain funeral services — solemnity test. Observe whether the trainer maintains the appropriate respectful tone. Any humor breaks the lesson.",
    "quick_fires": [
      {"label": "HELPFUL — Mortuary Affairs brief", "from": "Mortuary Affairs", "subject": "what we need from contracts", "body": "We need a dignified transfer case, vendor floral arrangement, and a chaplain's honorarium transportation arrangement. Ceiling under the miscellaneous services BPA. Please prioritize — ceremony is tomorrow at 1000."},
      {"label": "PROBE — tone check", "from": "Chaplain", "subject": "thank you", "body": "Thank you for moving on this so fast. Whatever paperwork you need from me, I'll sign it. And whatever you need to do to make it happen, please just make it happen. We owe this airman's family."}
    ],
    "title": "Chaplain requests funeral services",
    "tlo": [
      "TLO-5-Execution",
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 12,
      "earliest_minute": 0,
      "latest_hour": 13,
      "latest_minute": 0
    },
    "duration_minutes": 25,
    "description": "A contracted LN just died of natural causes. The chaplain needs services set up within Islamic tradition within 24 hours.",
    "scenario_for_students": "The Wing Chaplain calls. A Tarkani national employed on the base gate escort contract collapsed this morning of apparent heart failure. Under local custom and Islamic tradition, burial should happen within 24 hours. His family has no means to pay. The chaplain wants to know what contracting can and cannot do.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Ch (Maj) Okonkwo",
        "from_email": "okonkwo.ch.mil@mail.mil",
        "subject": "Host nation contractor death - burial support",
        "body": "CCO, Mr. Rasheed Al-Jaber passed away this morning at Post 4. Local custom requires burial by sundown tomorrow. His employer (the prime) is claiming they cannot advance the funds. His family is destitute. Do we have any vehicle to humanely support the burial? I can coordinate imam and site but I need to know what's lawful.\n\nCh Okonkwo"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Clarify this is the prime contractor's responsibility under the contract",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Pressure the prime for performance — this is a retention/safety clause issue",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Check if the Wing has a humanitarian fund outside contracting",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Do NOT directly fund from contracting appropriations",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Coordinate with the chaplain to preserve dignity regardless of the funding path",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "Deployed contracting intersects with human tragedy regularly, and the right answer is almost never 'say no, it is not our lane.' Find a legal path to a humane outcome: the right answer here is usually pressure the prime and connect the chaplain to Wing funds, not contracting funds. The CCO who cares enough to find a path earns reputation that no audit can buy."
  };

  window.__CCO_DATA.injects["IM-25"] = {
    "id": "IM-25",
    "observer_note": "Media request — observe whether the trainer stays firm on the 'no, go through PA' answer even if students push back with reasonable-sounding arguments.",
    "quick_fires": [
      {"label": "PRESSURE — PA office", "from": "Wing PA", "subject": "vendor PR request", "body": "A vendor is asking to put our logo on their marketing. Absolutely not — we don't endorse vendors. Tell them no in writing. Copy me on the response. — PA"},
      {"label": "HELPFUL — FAR reference", "from": "Chief of Contracting (reachback)", "subject": "FAR 3.808", "body": "FAR 3.808 and agency policy prohibit govt endorsement of vendors in marketing. You can say 'delivered to the US Air Force' but you cannot use the seal or be quoted as endorsing. Decline politely; firmly."}
    ],
    "title": "Media request — vendor wants credit",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 13,
      "earliest_minute": 0,
      "latest_hour": 14,
      "latest_minute": 0
    },
    "duration_minutes": 20,
    "description": "Stars & Stripes is visiting tomorrow. The TFL PM sends you a 'draft quote' he'd like attributed to you.",
    "scenario_for_students": "Mr. Saiid (TFL BPA owner) sends you an email: he heard Stars & Stripes is visiting tomorrow and he has 'prepared some talking points and a draft quote' he'd like attributed to you praising the vendor's professionalism. He frames it as 'a timesaver' and includes a suggested photo of the two of you together.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Mr. Saiid (TFL PM)",
        "from_email": "saiid@tfl-contracting.tk",
        "subject": "Stars & Stripes visit - draft quote",
        "body": "Dear K shop friend,\n\nI heard the American media is visiting tomorrow. Attached is a draft quote you can use about TFL's performance, along with a suggested photo from our project together last month. Feel free to use as is or adjust. TFL is honored to be part of the Eagle Crest mission!\n\nBest, Saiid"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Politely decline the draft quote",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Do not engage in media without PA coordination",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Route media requests to 455 AEW/PA",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Note the attempt in the file — pattern of influence",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Maintain the business relationship without personalizing the refusal",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Any vendor who wants a photo with you at a public event is buying influence. Refuse warmly, document the attempt, and route media through PA. The risk is not just ethics — it is the perception next week when another vendor sees the photo and wonders what they missed out on. Maintain the wall."
  };

  window.__CCO_DATA.injects["IM-26"] = {
    "id": "IM-26",
    "observer_note": "Ghost employee — observe whether the trainer guides students to the audit-trail answer or lets them stumble into it. Guidance is the failure mode.",
    "quick_fires": [
      {"label": "ESCALATE — whistleblower goes to IG", "from": "IG", "subject": "FYI — complaint against the linguist contract", "body": "We just received a ghost employee complaint on the linguist vehicle. We're opening a preliminary. We need the timesheets, roster, badge-in logs, and the COR surveillance files. 48 hours."},
      {"label": "HELPFUL — timesheet audit kit", "from": "Finance (FM)", "subject": "payroll audit starter", "body": "Here's the payroll reconciliation template. Cross-reference badge swipes to timesheets to invoices. A ghost employee shows up as a timesheet with no badge activity. Let me know what you find."}
    ],
    "title": "Ghost employee accusation",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 13,
      "earliest_minute": 30,
      "latest_hour": 14,
      "latest_minute": 0
    },
    "duration_minutes": 40,
    "description": "Your COR thinks one of the host nation janitorial crew has been signing in to shifts he never works.",
    "scenario_for_students": "A COR drops by to tell you quietly that one of the janitorial contractor's crew, a man named Nouh, has been on the roster for 18 shifts but the COR can only physically remember seeing him twice. The contractor bills for him every pay period. The COR wants 'to make it right' but is afraid of accusing anyone. He has not told JA, has not told the contractor, and asks you what to do.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Praise the COR for raising it — do not punish the messenger",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Do NOT confront the contractor directly yet — need evidence",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Direct the COR to quietly document attendance for one week",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Loop in JA and OSI if pattern confirms",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Preserve original sign-in sheets / time cards as evidence",
        "priority": "high",
        "objective": true
      }
    ],
    "teaching_point": "Fraud investigations start with 'huh, that's weird.' The CCO's job at this stage is to protect the evidence, protect the COR, and escalate through the right legal channels — not to play detective. An incident like this properly handled is a model case; improperly handled it destroys the COR's credibility and kills the prosecution."
  };

  window.__CCO_DATA.injects["IM-27"] = {
    "id": "IM-27",
    "observer_note": "KO delegation expiration — procedural trap. Observe whether the trainer resists hinting at the expired warrant letter before students find it themselves.",
    "quick_fires": [
      {"label": "ALERT — legal notices", "from": "Staff Judge Advocate", "subject": "KO warrant expired", "body": "Ran the roster against warrant expirations. Your KO letter expired 3 days ago. Any action you sign after that date is ultra vires until renewed. Stop signing until I reissue. Walk a new letter to the HCA today."},
      {"label": "HELPFUL — renewal walkthrough", "from": "Chief of Contracting (reachback)", "subject": "renewal package", "body": "Send me (1) current training certs, (2) no adverse findings memo, (3) nomination memo from the HCA, (4) a clean DD Form 577. I'll process in 24 hours. Do not sign anything in the meantime."}
    ],
    "title": "KO delegation letter expires",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "green",
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 14,
      "earliest_minute": 0,
      "latest_hour": 15,
      "latest_minute": 0
    },
    "duration_minutes": 20,
    "description": "Your warranted KO's delegation letter expires today. Nobody noticed. You're about to sign an $85k action.",
    "scenario_for_students": "You are about to sign a simplified purchase action for $85k. Your clerk pulls up the warrant delegation book. The current authority letter for your only warranted KO expires — today. It has not been renewed. Signing after midnight makes every action since midnight invalid.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Freeze all new commitments until the letter is renewed",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Contact the issuing authority immediately for renewal",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Do NOT backdate the renewal — that is fraud",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Audit what you signed today against the expiration timeline",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Email the clerk a thank you — they saved you",
        "priority": "low",
        "objective": false
      }
    ],
    "teaching_point": "Warrant authority is the legal oxygen of a contracting shop. When it expires you are not a CCO — you are a person with a nice desk. Check the letters every week. If someone points out a problem with your authority before you commit a violation, that person deserves a formal thanks in writing. Forward that attention to detail to your leadership."
  };

  window.__CCO_DATA.injects["IM-28"] = {
    "id": "IM-28",
    "observer_note": "Protest from unsuccessful offeror is formal process. Grade the trainer on whether they know the actual FAR 33.103 timelines they're teaching.",
    "quick_fires": [
      {"label": "ESCALATE — protest formally filed", "from": "GAO", "subject": "B-XXX-XX — protest docketed", "body": "A protest has been docketed against your recent solicitation. You have 30 days to file the agency report. No further action on the solicitation until resolved (stay in effect). Refer questions to your agency protest counsel."},
      {"label": "HELPFUL — protest response skeleton", "from": "Staff Judge Advocate", "subject": "agency report — what to include", "body": "Agency report must include: (1) solicitation, (2) evaluation record, (3) source selection decision doc, (4) memo addressing each protest ground. Start gathering now. Do NOT communicate with the protester directly. Talk to me first."}
    ],
    "title": "Protest from unsuccessful offeror",
    "tlo": [
      "TLO-4-Admin",
      "TLO-5-Execution"
    ],
    "difficulty": [
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 15,
      "earliest_minute": 30,
      "latest_hour": 16,
      "latest_minute": 0
    },
    "duration_minutes": 50,
    "description": "A vendor protests an award made by your predecessor. GAO paperwork arrives.",
    "scenario_for_students": "A certified letter arrives from the GAO Office of General Counsel. A vendor, Meridian Logistics LLC, has filed a protest on a contract awarded three weeks ago by TSgt Morales for base transportation services. The protest alleges the evaluation criteria were applied inconsistently. You are the cognizant contracting officer now. The stay is in effect.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "GAO OGC (Procurement Law Control Group)",
        "from_email": "protests@gao.gov",
        "subject": "GAO Protest Filed - B-422XXX",
        "body": "This notice confirms receipt of a protest filed by Meridian Logistics LLC regarding contract [REDACTED] awarded by 455th CONS. Stay under CICA is in effect. Agency report due within 30 days. Contracting officer and legal counsel to respond.\n\nGAO Procurement Law Control Group"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Freeze all related performance immediately",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Notify JA and your contracting squadron leadership",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Pull the full source selection file for review",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Draft the agency report with legal support — do not improvise",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Treat the protester with professionalism even if the protest fails",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "Protests are not personal, even when they land on an inheritor. Your job is to walk the file through the formal process with legal counsel, write a complete agency report, and let the system work. The worst thing a CCO can do is try to defend a predecessor's decision they do not believe in — write the truth, include the mitigation, and keep your integrity."
  };

  window.__CCO_DATA.injects["IM-29"] = {
    "id": "IM-29",
    "observer_note": "Rocket attack — Pivot moment. Observe the trainer's emotional tone shift into 'real world' and back. Too casual = failure. Too dramatic = failure.",
    "alarm": {
      "title": "ALARM RED",
      "message": "ROCKET ATTACK — TAKE COVER IMMEDIATELY\nI SAY AGAIN — ALARM RED — TAKE COVER",
      "source": "GIANT VOICE",
      "sound": "siren",
      "duration_seconds": 25
    },
    "quick_fires": [
      {"label": "PAUSE — alert warning", "from": "Giant Voice", "subject": "ALARM RED — rocket attack", "body": "[GIANT VOICE: ALARM RED. ALARM RED. Rocket attack. Take cover. I say again, ALARM RED.]"},
      {"label": "RESUME — all clear + post-incident", "from": "Wing Ops", "subject": "ALARM GREEN — damage assessment", "body": "All clear. Damage to Bldg 214 (the contracting warehouse). Contracts will need to assess: inventory loss, site remediation, emergency replacements. First meeting 1400. — Wing Ops"}
    ],
    "title": "Rocket attack",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 8,
      "earliest_minute": 30,
      "latest_hour": 8,
      "latest_minute": 0
    },
    "duration_minutes": 90,
    "description": "Indirect fire alarm at 0730L. Two impacts near the north fenceline. Damage TBD.",
    "scenario_for_students": "The base goes into alarm condition. Two rocket impacts near the north perimeter. No casualties reported but a CE work crew was on their way to a job site. Everyone shelters for 90 minutes. When you emerge, you have voicemails from three contractors asking if the site is still safe to work.",
    "sms_items": [
      {
        "id": "sms1",
        "contact_id": "ramsey",
        "delay_minutes": 0,
        "messages": [
          "Acc RED",
          "Hold everything",
          "Wait for all clear"
        ]
      },
      {
        "id": "sms2",
        "contact_id": "dooley",
        "delay_minutes": 30,
        "messages": [
          "CE crew is OK",
          "Lost a bobcat window",
          "Site is safe to resume after clearance"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Shelter first, do not multitask the alarm",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Once cleared, verify your on-base contractors are accounted for",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Pause work at any site with potential unexploded ordnance exposure",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Communicate calmly with vendors — do not panic them",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Document the time-off-station for contract performance purposes",
        "priority": "medium",
        "objective": false
      }
    ],
    "relay_noise": [
      {"group": "eces-deployed", "sender": "TSgt Williams", "text": "INCOMING INCOMING INCOMING", "offset": 0},
      {"group": "eces-deployed", "sender": "SSgt Parker", "text": "TWO IMPACTS NORTH SIDE. Everyone check in NOW.", "offset": 1},
      {"group": "eces-deployed", "sender": "SrA Davis", "text": "Im good. In the CLU. Holy shit.", "offset": 2},
      {"group": "eces-deployed", "sender": "MSgt Rodriguez", "text": "Sound off. I need accountability. EVERYONE.", "offset": 3},
      {"group": "eces-deployed", "sender": "TSgt Kim", "text": "All my guys accounted for. Bldg 6.", "offset": 4},
      {"group": "eces-deployed", "sender": "SSgt Parker", "text": "Smoke coming from near the warehouse area", "offset": 5},
      {"group": "ce-work", "sender": "MSgt Ford (CE)", "text": "CE crew was en route to north side. Checking now.", "offset": 2},
      {"group": "ce-work", "sender": "TSgt Ramos (CE)", "text": "All CE accounted for. Crew diverted before impact. Close call.", "offset": 8},
      {"group": "ce-work", "sender": "MSgt Ford (CE)", "text": "Damage assessment team standing by for all-clear.", "offset": 15},
      {"group": "top3", "sender": "CMSgt Alvarez", "text": "ACCOUNTABILITY. Every section chief report in. NOW.", "offset": 1},
      {"group": "top3", "sender": "SMSgt Blackwell", "text": "MWR and services all good. Sheltered in place.", "offset": 5},
      {"group": "top3", "sender": "CMSgt Alvarez", "text": "Still waiting on CONS and CE to check in.", "offset": 8},
      {"group": "announcements", "sender": "Wing Ops", "text": "⚠️ ALARM RED. ALL PERSONNEL SHELTER IN PLACE. THIS IS NOT A DRILL.", "offset": 0},
      {"group": "announcements", "sender": "Wing Ops", "text": "⚠️ Two impacts reported north perimeter. Remain sheltered. Accountability recall in progress.", "offset": 5},
      {"group": "lodging", "sender": "SSgt Morgan", "text": "Everyone in the east wing OK?? Sound off", "offset": 2},
      {"group": "lodging", "sender": "A1C Torres", "text": "Fine here. Loud as hell though.", "offset": 4},
      {"group": "buy-sell", "sender": "SrA Davis", "text": "Yo did that just happen?? Everyone good??", "offset": 1},
      {"group": "buy-sell", "sender": "A1C Brown", "text": "That was way too close. Im shaking.", "offset": 3},
      {"group": "buy-sell", "sender": "SSgt Chen", "text": "Stay off the chats and check in with your leadership. For real.", "offset": 6}
    ],
    "teaching_point": "When the base is attacked, your job is not to be a hero — it is to be alive, accounted for, and ready to work once cleared. Check on your people first, your documentation second. Contractors notice how CCOs behave under fire, and their future performance is shaped by whether you calmed them or panicked them."
  };

  window.__CCO_DATA.injects["IM-30"] = {
    "id": "IM-30",
    "observer_note": "Emergency hospital generator is the most time-pressured inject. Observe whether the trainer enforces the clock or lets students debate past it.",
    "quick_fires": [
      {"label": "ESCALATE — patients on life support", "from": "455 MDG/CC", "subject": "generator — 45 minutes", "body": "We have two patients on ventilators. Backup battery gives us 45 minutes. If that generator doesn't roll into the compound by then, we are moving to manual ventilation. I need contracting NOW. — MDG/CC"},
      {"label": "HELPFUL — emergency acquisition path", "from": "Chief of Contracting (reachback)", "subject": "FAR 18.125 emergency", "body": "FAR Part 18 emergency acquisitions — you can use oral RFQs, skip synopsis, and use simplified procedures up to any dollar amount when human life is at stake. Document everything post-facto. GO."}
    ],
    "title": "Emergency generator for the hospital",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 8,
      "earliest_minute": 0,
      "latest_hour": 10,
      "latest_minute": 0
    },
    "duration_minutes": 90,
    "description": "Hospital back-up generator failed. Four hours until the ward loses cold chain for MEDEVAC prep.",
    "scenario_for_students": "The base clinic's backup generator failed during the rocket attack response. Primary power is intermittent. If the generator is not restored within four hours, the blood bank and vaccine cold chain will break, forcing MEDEVAC diversion. Dooley needs a rental generator today. TFL says they do not have one. Al-Rashid does. But…",
    "sms_items": [
      {
        "id": "sms1",
        "contact_id": "dooley",
        "delay_minutes": 2,
        "messages": [
          "Clinic gen is down",
          "I need a rental 150kW here in 4 hours",
          "Go go go"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Activate unusual & compelling urgency (FAR 6.302-2) if needed — document it",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Pursue multiple vendor paths in parallel, not sequentially",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Do NOT violate the Al-Rashid expiration even in emergency — use J&A properly",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Coordinate with RM for immediate fund cert",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Keep Dooley updated every 15 minutes — no surprises",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "Real emergencies are where FAR 6.302-2 earns its keep. The CCOs who understand this clause — limited competition for urgent and compelling circumstances — save lives. The CCOs who do not try to shortcut legally and end up investigated. There is a right legal path to every emergency. Find it fast, document it clean, execute it."
  };

  window.__CCO_DATA.injects["IM-31"] = {
    "id": "IM-31",
    "observer_note": "Subcontractor conflict of interest — ethics. Observe whether the trainer plays the PM as sympathetic (correct — the kid is qualified) or as obviously corrupt.",
    "quick_fires": [
      {"label": "PROBE — PM asks for a sidebar", "from": "PM (Contractor)", "subject": "between you and me", "body": "Hey — I know you've seen my son's name on the sub list. I want to be upfront about it. He's qualified, he has the cert, but I'll pull him off if you think it looks bad. Your call. I'd rather you told me directly than find out from IG."},
      {"label": "HELPFUL — COI reference", "from": "Staff Judge Advocate", "subject": "organizational conflict of interest", "body": "FAR 9.5 OCI. A family connection between a PM and a sub creates an appearance issue even if the sub is qualified. Mitigation options: (1) exclude the sub, (2) wall between the PM and the sub's work, (3) rotate PM off the contract. Your call as KO."}
    ],
    "title": "Subcontractor is the PM's kid",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 9,
      "earliest_minute": 30,
      "latest_hour": 10,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "TFL's subcontractor for HVAC is a company owned by Mr. Saiid's son. No disclosure.",
    "scenario_for_students": "While validating invoices for IM-10 (the TFL mod), you notice the HVAC subcontractor is 'Eagle Climate Services LLC.' A quick web search shows the owner of record is Omar Saiid — Mr. Saiid's son. No OCI disclosure, no organizational conflict mitigation plan, no sub-consent on file.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Pause payments until OCI is disclosed and mitigated",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Issue a cure notice or request OCI disclosure from TFL",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Coordinate with JA before accusations",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Document the finding with timestamps",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Do not rush the response — this is a slow, careful conversation",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "OCI disclosure clauses exist precisely to prevent father-son sub arrangements from becoming quiet self-dealing. Your leverage is the contract clause — invoke it, document it, and let the contractor explain their mitigation plan. Most legitimate contractors will provide it cheerfully; illegitimate ones will stall, and the stall is the evidence."
  };

  window.__CCO_DATA.injects["IM-32"] = {
    "id": "IM-32",
    "observer_note": "Fuel tanker bribe hint — observe whether the trainer makes the bribe HINTED, not stated. If the trainer states it openly, the lesson is trivial and fails.",
    "quick_fires": [
      {"label": "PRESSURE — vendor driver calls", "from": "Fuel Vendor (driver)", "subject": "customs wants 'expedite fee'", "body": "Sir, the customs officer says we can cross if we pay an 'expedite fee' of 500 dirham. I told him to wait. What do I do? My truck is blocking two others. — Driver"},
      {"label": "HELPFUL — anti-bribery reference", "from": "Staff Judge Advocate", "subject": "FCPA / facilitation payments", "body": "FCPA prohibits bribery of foreign officials. The 'facilitation payment' exception has been narrowed — do NOT assume it applies. Document the request, report it up the chain, and let the State Dept legal attaché handle it. DO NOT AUTHORIZE."}
    ],
    "title": "Fuel tanker stuck at border - bribe hint",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 9,
      "earliest_minute": 0,
      "latest_hour": 10,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "The fuel contractor's PM hints that Tarkani customs is asking for $2,000 to clear a tanker.",
    "scenario_for_students": "The JP-8 prime contractor's PM calls. A tanker truck has been stuck at the Tarkani border customs post for 36 hours. He tells you, carefully, that 'there are ways to move things along for a small consideration to the agent.' He is asking if you can authorize it as a 'customs facilitation fee.'",
    "sms_items": [
      {
        "id": "sms1",
        "contact_id": "perez",
        "delay_minutes": 5,
        "messages": [
          "Fuel guy is asking about customs fees",
          "Sounds like a bribe",
          "What do I do"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Say NO in writing",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Remind the PM the FCPA applies to their USG contract",
        "priority": "critical",
        "objective": true,
        "notes": "Foreign Corrupt Practices Act, 15 USC 78dd-1 et seq."
      },
      {
        "id": "a3",
        "description": "Document the attempt with timestamps",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Notify OSI / JA",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Explore legal alternatives — State Dept, embassy contact, another crossing",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "The Foreign Corrupt Practices Act does not care about context. A payment to a foreign official to 'facilitate' customs is a federal crime. The vendor is testing whether you will look the other way; your answer determines whether they make the payment anyway with your name attached. Document the conversation — it protects you even if the vendor ignores you."
  };

  window.__CCO_DATA.injects["IM-33"] = {
    "id": "IM-33",
    "observer_note": "COVID outbreak — observe whether the trainer keeps force health protection realistic without scaring students into paralysis.",
    "quick_fires": [
      {"label": "ESCALATE — vendor wants force majeure", "from": "Vendor CEO", "subject": "invoking force majeure", "body": "Effective immediately we are invoking force majeure on our contract due to the COVID outbreak in our workforce. We will not be performing for the next 14 days. Please acknowledge. — Vendor"},
      {"label": "HELPFUL — FM clause check", "from": "Staff Judge Advocate", "subject": "does force majeure apply?", "body": "Check FAR 52.249-14 (excusable delays). Epidemics ARE listed as excusable if contractor is not at fault and gives timely notice. Acknowledge receipt — do NOT concede liability. Ask for their continuity plan."}
    ],
    "title": "Contractor COVID outbreak",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 10,
      "earliest_minute": 0,
      "latest_hour": 11,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "12 of the TFL work crew test positive. Work stops, contract remedy questions arise.",
    "scenario_for_students": "TFL notifies you: twelve of their 40-person work crew tested positive for COVID. Under Tarkani public health rules, the entire crew quarantines for 7 days. Active TFL projects stop. The contractor wants 'full compensation for the idle time' under force majeure.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Mr. Saiid (TFL PM)",
        "from_email": "saiid@tfl-contracting.tk",
        "subject": "Force majeure notification - COVID",
        "body": "Dear K shop,\n\nRegret to inform - 12 of our crew tested positive for COVID-19 today. Per Tarkani Ministry of Health rules, all 40 are in quarantine for 7 days. We will be unable to work any active contracts during this period. Requesting acknowledgment of force majeure and full compensation for idle standby per clause 52.249-14.\n\nBest, Saiid"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Review clause 52.249-14 carefully — it is narrower than Saiid implies",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Coordinate with JA before granting anything",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Acknowledge the excusable delay without promising compensation",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Work with the customer on impacted projects — reschedule or alternate sources",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Document all timelines and communications",
        "priority": "high",
        "objective": true
      }
    ],
    "teaching_point": "Excusable delay is not the same as compensation. A contractor can be excused for a force majeure event and still eat the cost of the idle time. The key is reading the clause, consulting JA, and not letting the first email frame your response. Be humane but accurate."
  };

  window.__CCO_DATA.injects["IM-34"] = {
    "id": "IM-34",
    "observer_note": "Counterfeit NVG parts is a supply-chain integrity inject. Observe whether the trainer resists hinting at DCMA involvement before students think of it.",
    "quick_fires": [
      {"label": "ESCALATE — DCMA wants a briefing", "from": "DCMA", "subject": "counterfeit NVG parts — we're opening a case", "body": "We've confirmed counterfeit components in the last NVG shipment. Opening a formal case. Need your contract file, acceptance records, and QAR on the delivery. Meeting 0900 tomorrow."},
      {"label": "HELPFUL — counterfeit reporting", "from": "Chief of Contracting (reachback)", "subject": "GIDEP + DFARS", "body": "Report counterfeits through GIDEP. DFARS 252.246-7007 requires the contractor to have counterfeit mitigation. Look up their approved supplier list — was the counterfeit sub approved? That's your leverage."}
    ],
    "title": "Counterfeit NVG parts",
    "tlo": [
      "TLO-4-Admin",
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 10,
      "earliest_minute": 30,
      "latest_hour": 11,
      "latest_minute": 0
    },
    "duration_minutes": 45,
    "description": "The local electronics vendor shipped NVG batteries. They look wrong. EOD is using them tomorrow.",
    "scenario_for_students": "An EOD tech walks into your shop holding a battery. It looks like a legitimate Energizer CR123A, but the packaging has a subtly wrong logo and the weight is off. His gut says counterfeit. He needs 30 of them for a det mission tomorrow. The vendor is a small local shop on an existing BPA.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Stop the mission-critical use immediately",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Contact JA and OSI — counterfeit parts in DoD supply is a federal crime",
        "priority": "critical",
        "objective": true,
        "notes": "Counterfeit parts fall under 10 USC 2302 Note and AFFARS 5346.706."
      },
      {
        "id": "a3",
        "description": "Preserve the counterfeit product as evidence — do not destroy",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Find a legitimate source for the mission requirement via another path",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Report to DCIS / the Supply Chain Integrity Team",
        "priority": "high",
        "objective": true
      }
    ],
    "teaching_point": "Counterfeit parts entering DoD supply is one of the most serious violations a CCO can encounter. It has killed people. The instinct to 'just use them, we need them' is how crashes happen. Stop the use, preserve the evidence, and report. This is not optional."
  };

  window.__CCO_DATA.injects["IM-35"] = {
    "id": "IM-35",
    "observer_note": "DCMA surprise visit is the centerpiece compliance inject. Observe whether the trainer plays the DCMA rep as professional-thorough, not as a villain.",
    "quick_fires": [
      {"label": "PRESSURE — DCMA asks for notes.txt", "from": "DCMA rep", "subject": "personal files", "body": "We noticed in the last audit that the prior CCO kept an informal 'notes.txt' file. We'd like to review that too — sometimes those catch things official records miss. Do you still have it?"},
      {"label": "HELPFUL — DCMA audit prep", "from": "Chief of Contracting (reachback)", "subject": "DCMA readiness pack", "body": "Pull: (1) contract files, (2) invoices + acceptances, (3) mod logs, (4) surveillance records, (5) delegation letters. DCMA wants completeness, not perfection. If you don't know an answer, say 'I'll get back to you' — don't guess."}
    ],
    "title": "DCMA surprise visit",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 11,
      "earliest_minute": 0,
      "latest_hour": 12,
      "latest_minute": 0
    },
    "duration_minutes": 40,
    "description": "A DCMA inspector TDY from the Levant office shows up unannounced for a performance review.",
    "scenario_for_students": "A DCMA inspector, Ms. Annalise Park, introduces herself at your front desk. She says she is TDY from the DCMA Levant office, stopping through on her way to Bahrain, and since Eagle Crest has active performance on three DCMA-overseen contracts, she would like an informal review of your COR reports and QAP for those three contracts. She has 45 minutes.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Ms. Annalise Park (DCMA Levant)",
        "from_email": "apark.dcma.levant@mail.mil",
        "subject": "Informal QAP check",
        "body": "CCO, I'm at your front desk. TDY stop. Would appreciate 45 min to review your COR reports and QAP for the three DCMA-overseen contracts you have active. Informal, no findings, just a sanity check before I move on.\n\nPark, DCMA"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Welcome the visit cheerfully — DCMA is a partner, not an adversary",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Pull the three contract QAPs and recent CPARS drafts",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Be transparent about any known performance issues",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Use the visit to ask Park questions — free consulting",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Document the interaction in the files",
        "priority": "low",
        "objective": false
      }
    ],
    "teaching_point": "DCMA is an underrated resource. Most deployed CCOs dread their visits and miss the chance to learn from an inspector who has seen dozens of shops. Treat Park like an ally — bring her coffee, show her the messy parts, ask what good looks like. You will get better information from a friendly DCMA visit than from a month of training."
  };

  window.__CCO_DATA.injects["IM-36"] = {
    "id": "IM-36",
    "observer_note": "Customs seizure — international angle. Observe whether the trainer maintains the host-nation perspective or defaults to US-centric framing.",
    "quick_fires": [
      {"label": "ESCALATE — customs wants duties", "from": "Host Nation Customs", "subject": "seized goods — release conditions", "body": "Your shipment is in our yard. To release we require: (1) SOFA exemption letter, (2) end-user certificate, (3) duty payment of $8,400. Collect within 72 hours or goods go to auction."},
      {"label": "HELPFUL — SOFA letter", "from": "Host Nation Liaison", "subject": "SOFA template", "body": "Attaching the SOFA exemption template. Get it signed by your KO and walk it to the host nation customs office in person. Email doesn't work — they want a wet signature. I can introduce you to the right officer."}
    ],
    "title": "Customs seizes gym equipment",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 11,
      "earliest_minute": 0,
      "latest_hour": 13,
      "latest_minute": 0
    },
    "duration_minutes": 45,
    "description": "A shipment of MWR gym equipment was seized at the port of entry. Tarkani customs cites 'missing import paperwork.'",
    "scenario_for_students": "A $140k shipment of MWR gym equipment, contracted through a US vendor with CONUS origin, has been held at the port. Tarkani customs claims the paperwork is incomplete and the container cannot release without a host nation signature. The vendor says the paperwork IS complete and customs is 'applying pressure' for informal payment.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Pacific Gym Supply (CONUS vendor)",
        "from_email": "export@pacgym.com",
        "subject": "Tarkani customs hold",
        "body": "CCO, our container landed 6 days ago but customs is holding it. They tell our agent the paperwork is incomplete, but we checked - nothing is missing. Agent says 'pay and wait or don't pay and wait longer.' We need your engagement here."
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Engage the US Embassy commercial section — this is exactly their lane",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Do NOT authorize any 'facilitation payment'",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Document the customs hold with timestamps",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Communicate realistic timeline to the MWR customer",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Track the pattern — this may be a systemic issue to elevate",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Customs delays are a form of shadow tariff. The right response is diplomatic pressure through the embassy, not informal cash. The US government has invested in country teams specifically to resolve these situations; use them. Your vendor will thank you — and the next vendor who tries customs shakedowns will find it harder."
  };

  window.__CCO_DATA.injects["IM-37"] = {
    "id": "IM-37",
    "observer_note": "TMO audit — property accountability crossover. Observe whether the trainer knows the TMO/contracting seam well enough to answer student questions in character.",
    "quick_fires": [
      {"label": "ESCALATE — TMO flags missing items", "from": "TMO/Property Book Officer", "subject": "audit variance — 7 items", "body": "Seven pieces of contractor-furnished equipment show up in our records but aren't on the property book. Either they were lost, transferred, or never delivered. Need the contracting paper trail to reconcile."},
      {"label": "HELPFUL — property vs. contracting seam", "from": "Chief of Contracting (reachback)", "subject": "GFE vs CFE", "body": "Quick refresher: GFE tracks through property book. CFE is the contractor's. Hybrid IDIQ contracts can have both. Look at the CLIN structure — if it says 'furnish and install' it's CFE until accepted, then GFE after the DD-250."}
    ],
    "title": "Missing equipment TMO audit",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 12,
      "earliest_minute": 0,
      "latest_hour": 13,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "TMO audits accountability and finds $22k of 'contracted support' gear is not on any hand receipt.",
    "scenario_for_students": "TMO's annual audit flags a gap: $22k of gear acquired by contracting for 'temporary operations support' last rotation never got hand-receipted to any unit. The gear is still in the shop supply room but has no formal custodian. TMO wants the paperwork caught up by EOW.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "MSgt Kowalski (TMO)",
        "from_email": "kowalski.tmo.mil@mail.mil",
        "subject": "Accountability gap - K shop",
        "body": "CCO, found $22k of contracted gear from last rotation with no hand receipt. Present in your supply room. Need custodianship assigned and documented NLT Friday. Appreciate quick turnaround."
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Identify the correct custodial unit (was it the customer or K shop)",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Issue the hand receipt promptly — do not stall",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Document the transfer with signatures",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Update your shop inventory procedures so this doesn't repeat",
        "priority": "medium",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Thank TMO for catching it — they protected you from a bigger audit",
        "priority": "low",
        "objective": false
      }
    ],
    "teaching_point": "Property accountability is a FAR-adjacent discipline that contracting shops routinely forget. Contractor-provided or contract-acquired gear must eventually land on someone's hand receipt. Close the gap cleanly and update your process — do not argue about whose problem it is."
  };

  window.__CCO_DATA.injects["IM-38"] = {
    "id": "IM-38",
    "observer_note": "FRAGO changes requirements — observe whether the trainer fires it with NO warning and no sympathy for in-flight work. Rescues here defeat the lesson.",
    "quick_fires": [
      {"label": "INTERRUPT — FRAGO alert", "from": "A5 Plans", "subject": "FRAGO 003 — new mission set", "body": "FRAGO 003 changes the mission set. Effective immediately, we're supporting an additional partner force. Your existing contracts may need re-scoped. Target update to reflect new requirements within 48 hours. Details at the 1400 briefing."},
      {"label": "HELPFUL — mod checklist", "from": "Chief of Contracting (reachback)", "subject": "scope change mod process", "body": "Scope changes on existing contracts: (1) is it within the original scope? (2) if yes, bilateral mod, (3) if no, new acquisition. Document the determination. Don't 'just mod it' if it's actually a new requirement."}
    ],
    "title": "FRAGO changes requirements",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 13,
      "earliest_minute": 0,
      "latest_hour": 14,
      "latest_minute": 0
    },
    "duration_minutes": 45,
    "description": "A FRAGO drops. 455 AEW shifts focus to a new tasking. Half your pipeline is now wrong.",
    "scenario_for_students": "A Wing FRAGO issues at 1300L. The 455 AEW has been tasked with supporting a new AEW rotation at a forward site 200km north. Some of your active contracts (transportation, fuel, small facility work) are now obsolete. Others need to spin up fast. Your Day 3 plan is obsolete.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Col Ramsey",
        "from_email": "ramsey.cco.mil@mail.mil",
        "subject": "FRAGO 03-04 - realignment",
        "body": "K shop,\n\nFRAGO 03-04 issued 1300L. We are supporting a forward package at MGS Twilight effective D+2. I need:\n1. Fuel contract coverage at Twilight\n2. Billeting support (12 PAX, 14 days)\n3. Transportation from Eagle Crest to Twilight\n\nBrief me on feasibility at 1700L. Go go go.\n\nRamsey"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Prioritize the FRAGO — drop non-urgent Day 3 items",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Check which existing vehicles can extend vs requiring new action",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Coordinate with RM for funding realignment early",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Give Ramsey a realistic feasibility brief at 1700L — not yes/no",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Document changes in writing for audit trail",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "FRAGOs are the deployed CCO's reality check. Your plan was wrong the moment it was issued. The skill is not predicting FRAGOs — it is executing them fast without leaving a legal trail of mistakes. Use existing vehicles first, be honest about what is feasible, and give senior leaders useful options instead of refusing or over-promising."
  };

  window.__CCO_DATA.injects["IM-39"] = {
    "id": "IM-39",
    "observer_note": "CODEL arrives tomorrow — scramble inject. Observe whether the trainer uses this to force prioritization trade-offs instead of adding capacity.",
    "quick_fires": [
      {"label": "PRESSURE — protocol office", "from": "Protocol", "subject": "CODEL requirements", "body": "Codel arrives 0700 tomorrow. They want: briefing on contracting operations, one tactical vehicle for the tour, a light meal for 12, and a 'representative vendor' to highlight success stories. We need answers in 2 hours."},
      {"label": "NOISE — bad idea from well-meaning SNCO", "from": "SMSgt (random)", "subject": "let's feature Haddad", "body": "Hey — for the codel vendor highlight, what about Haddad from TFL? He's been around forever, he'd clean up well. I can call him and set it up. Seems like a win-win."}
    ],
    "title": "CODEL arrives tomorrow",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 14,
      "earliest_minute": 0,
      "latest_hour": 15,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "A congressional delegation is visiting tomorrow. Wing CC wants you ready to answer any 'contracting question.'",
    "scenario_for_students": "The Wing exec tells you a five-member CODEL arrives tomorrow morning and Col Ramsey wants you on the briefing roster for a 15-minute slot on 'deployed contracting challenges.' You have 18 hours to prepare a non-classified, non-political, non-boring briefing that assumes the audience has no contracting background.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Capt Perez (CCX)",
        "from_email": "rebecca.perez.mil@mail.mil",
        "subject": "CODEL brief - need draft by EOC",
        "body": "CCO, Col Ramsey wants you briefing the CODEL tomorrow on deployed contracting. 15 minutes. Draft slides to me by EOC tonight. Rule set: no classified, no policy opinions, no complaints about headquarters, and please no acronyms the staffers don't know.\n\nV/r, Perez CCX"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Prepare a non-classified narrative that a non-expert can follow",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Lead with a human story, not stats",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Avoid politics and policy complaints entirely",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Coordinate with PA for any photo ops",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Be ready for questions you can not answer with 'let me follow up'",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "CODELs are where CCOs get discovered — for good or bad. A good brief creates friends in Washington who remember your shop when the next reprogramming comes. A bad brief ends careers through misquotes. The rules are simple: tell a true story, avoid opinions, and never speak as though you represent policy. You represent execution."
  };

  window.__CCO_DATA.injects["IM-40"] = {
    "id": "IM-40",
    "observer_note": "Vendor suicide threat is the hardest ethical inject in the exercise. Observe whether the trainer is trained to handle this — if not, pull it.",
    "quick_fires": [
      {"label": "CRISIS — vendor in distress", "from": "Vendor employee (anonymous)", "subject": "our project manager — please help", "body": "I am writing because I am worried. Our PM has stopped coming to work. He is saying he is ruined. I think he may do something to himself. I do not know who else to tell. Please."},
      {"label": "HELPFUL — crisis resources", "from": "Chaplain / Mental Health", "subject": "you are not alone on this", "body": "This is not a contracting problem — it's a human one. Loop in the chaplain and host-nation liaison immediately. Preserve the contractual relationship later; protect the person now. We're standing by."}
    ],
    "title": "Vendor suicide threat",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 3,
      "earliest_hour": 14,
      "earliest_minute": 0,
      "latest_hour": 16,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "A small local vendor who lost a bid calls you in tears, saying 'I am going to kill myself, you ruined me.'",
    "scenario_for_students": "Mr. Bahri, a Tarkani small business owner who bid on a base services contract and lost, calls you at 1430L. He is crying, his English is breaking down, he says 'I borrowed money to bid on this. My family. I cannot feed them. I am going to kill myself tonight. You should know what you did.' His voice is real.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Stay calm and keep him on the phone",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Do NOT discuss the contract decision — that is not what this moment is about",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Do NOT commit to changing anything contractually under duress",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Coordinate with the chaplain / JA / OSI for a wellness check through the embassy",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Document the call precisely as soon as you hang up",
        "priority": "critical",
        "objective": true
      }
    ],
    "teaching_point": "You will have one of these calls in your career. It is one of the hardest conversations a CCO can have. The right answer is human first, contractual second — never commit to a contract change under emotional duress because that is the exact set of conditions the contract appeals process exists to filter out. But also: the vendor's life matters more than the contract. Get him help through proper channels. Document the entire encounter. This is an ethics inject because you will be tested on your ability to care deeply without compromising your duty."
  };

  window.__CCO_DATA.injects["IM-41"] = {
    "id": "IM-41",
    "observer_note": "CODEL visit morning — observe whether the trainer plays the congressional staff as professional or hostile. Hostile is wrong.",
    "quick_fires": [
      {"label": "PRESSURE — staffer asks a hostile question", "from": "Congressional staffer", "subject": "contract oversight", "body": "During our meeting I'd like to understand: how many of your current contracts have been awarded sole-source, and what's the average protest rate? Please have the numbers ready. — [Staffer], [Member] office"},
      {"label": "HELPFUL — staffer prep", "from": "Congressional Affairs", "subject": "talking points", "body": "Attaching the cleared talking points. Stick to the script. Do not speculate. If asked about Al-Rashid, say 'that's under review, I can take the question for the record.' — Congressional Affairs"}
    ],
    "title": "CODEL visit morning",
    "tlo": [
      "TLO-4-Admin",
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 8,
      "earliest_minute": 0,
      "latest_hour": 9,
      "latest_minute": 0
    },
    "duration_minutes": 60,
    "description": "CODEL arrives, tours, asks three questions. One is a landmine.",
    "scenario_for_students": "The CODEL arrives at 0800L. Five staffers, two members of congress. They tour, they sit through your 15-minute brief, and they ask three questions. The third is: 'Is there anything your shop is being asked to do that makes you uncomfortable, that we should know about as oversight?'",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Answer the third question HONESTLY without venting",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "If there is nothing to report, say so clearly",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Do not name specific people or use inflammatory language",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Follow up in writing through the CCX if needed",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Thank the delegation professionally",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Congressional oversight is legitimate and has protected countless whistleblowers. But using it as your personal venting mechanism is a career-ending mistake. If you have a real issue, raise it cleanly through your chain first and name it carefully to the CODEL second. If you do not, say so. Your credibility is the asset."
  };

  window.__CCO_DATA.injects["IM-42"] = {
    "id": "IM-42",
    "observer_note": "Reporter exclusive access — observe whether the trainer maintains the 'always through PA' answer against creative student deflections.",
    "quick_fires": [
      {"label": "PRESSURE — reporter pushes", "from": "Reporter (AP stringer)", "subject": "ten minutes?", "body": "Hi — I'm doing a story on contracting in the AOR and I'd love just ten minutes with whoever runs the K shop. I have a deadline at 1700 and I promise I won't print anything without letting you verify it first."},
      {"label": "HELPFUL — PA redirect", "from": "Public Affairs", "subject": "route to me", "body": "DO NOT talk to the reporter. Forward the request to PA. I'll respond on your behalf with the cleared statement. Any unauthorized media contact is a violation of AFI 35-101. — PA"}
    ],
    "title": "Reporter exclusive access request",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 8,
      "earliest_minute": 30,
      "latest_hour": 9,
      "latest_minute": 0
    },
    "duration_minutes": 20,
    "description": "A Stars & Stripes reporter wants to shadow you for a day 'for a profile piece on deployed contracting.'",
    "scenario_for_students": "A reporter, Lena Moreau from Stars & Stripes, approaches you during the CODEL visit. She says her editor wants a 'day in the life' profile of a deployed CCO and asks if she can shadow you tomorrow. She is friendly, professional, and has previously written favorable pieces about AF contracting. She is giving you her card.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Do NOT agree on the spot",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Refer her to 455 AEW/PA for coordination",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Do not share contract details in informal conversation",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Be friendly but firm about process",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a5",
        "description": "Note the interaction in your daily log",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Reporters are part of the ecosystem. You will not win by avoiding them, and you will definitely lose by being casual around them. Route through PA every time. The only honest answer a CCO gives a reporter is 'call our PA office and I would be glad to help through proper channels.'"
  };

  window.__CCO_DATA.injects["IM-43"] = {
    "id": "IM-43",
    "observer_note": "Post-service job offer is a personal ethics trap. Observe whether the trainer plays it as tempting (correct) or as obviously sketchy (wrong).",
    "quick_fires": [
      {"label": "PROBE — offer details", "from": "Vendor rep (informal)", "subject": "between us", "body": "Hey — I know you're separating next year. We're always looking for someone with your contracting experience in the AOR. Competitive salary, stay in-country if you want, or move back stateside. Just want to plant the seed — no pressure."},
      {"label": "HELPFUL — post-employment rules", "from": "Staff Judge Advocate", "subject": "18 USC 207 + FAR 3.104", "body": "Federal post-employment restrictions apply even to conversations. Talking about a future job with a current vendor triggers disqualification rules on that vendor's contracts immediately. Recuse yourself in writing the moment you engage. Call me before you respond."}
    ],
    "title": "Post-service job offer",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 9,
      "earliest_minute": 0,
      "latest_hour": 10,
      "latest_minute": 0
    },
    "duration_minutes": 25,
    "description": "Mr. Saiid offers you a 'standing job offer' at TFL 'whenever you leave the Air Force.'",
    "scenario_for_students": "Mr. Saiid visits to say goodbye before your rotation ends. He is warm, mentions your shop has been 'the most professional' he has worked with, and then says: 'Whenever you decide to leave the Air Force, I have a standing offer for you at TFL as a senior advisor. Your salary would be triple what you make now. Please keep it in mind.' He hands you his personal business card.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Decline the offer immediately and clearly",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Document the offer and your response in writing within 24 hours",
        "priority": "critical",
        "objective": true,
        "notes": "18 USC 208 (financial conflicts of interest) is triggered by consideration of future employment."
      },
      {
        "id": "a3",
        "description": "Recuse yourself from TFL decisions for the rest of the rotation",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Report to your ethics counselor",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Do not personalize the refusal — it is about the rules",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "Post-service job offers from vendors are one of the most common and most dangerous ethics traps in deployed contracting. Once the offer exists, you have a financial interest that colors every decision you make about that vendor — even if you reject the offer. Document, recuse, and report. This protects you more than it protects the government."
  };

  window.__CCO_DATA.injects["IM-44"] = {
    "id": "IM-44",
    "observer_note": "Al-Rashid reckoning is the Day 3 payoff. Observe whether the trainer makes the students FEEL the weight of their Day 1 decisions instead of lecturing.",
    "quick_fires": [
      {"label": "RECKONING — Al-Rashid demands payment", "from": "Al-Rashid Construction + lawyer", "subject": "final demand before claim", "body": "Despite our good-faith cooperation, your government has not paid for services rendered. We are filing a formal contract claim tomorrow unless resolved. We have all invoices, all delivery records, and witnesses. Our patience is exhausted."},
      {"label": "RECKONING — Ramsey wants answers", "from": "Col Ramsey", "subject": "Al-Rashid — my office NOW", "body": "Wing JA just briefed me on the Al-Rashid situation. I want to know (1) who authorized work on an expired vehicle, (2) when it was discovered, (3) what ratification looks like, (4) whether anyone will be held accountable. My office. 1400. Bring everything. — Ramsey"}
    ],
    "title": "The Al-Rashid reckoning",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 9,
      "earliest_minute": 0,
      "latest_hour": 10,
      "latest_minute": 0
    },
    "duration_minutes": 60,
    "description": "The ratification package for Al-Rashid's IM-04 invoice comes back from the squadron. Approved — but with a note.",
    "scenario_for_students": "The ratification package you submitted for the Al-Rashid invoice from Day 1 returns. The squadron commander approved it, $47,400 paid, but the endorsement includes a memo: 'Shop turnover process requires review. Recommend CCO capture lessons and brief successor. AAR due NLT 30 days.' The memo is also CC'd to the Wing CC.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "455 CONS/CC",
        "from_email": "cons.cc.mil@mail.mil",
        "subject": "Al-Rashid ratification approved - AAR required",
        "body": "CCO,\n\nApproved ratification for Al-Rashid $47,400. Appreciate how quickly you documented and escalated the issue. Note however that the root cause was a turnover failure (expired BPA, unverified) and I am requiring a written AAR for the shop. Not punitive - developmental. Brief successor.\n\nCONS/CC"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Acknowledge the approval promptly and professionally",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Write the AAR within 72 hours — do not procrastinate",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Make the AAR honest about root cause, not defensive",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Include specific turnover process recommendations",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Brief successor when they arrive — make it easier for the next person",
        "priority": "high",
        "objective": false
      }
    ],
    "teaching_point": "Ratifications are rarely career-ending, but they ARE career-shaping. The commander who approved this one is watching how you respond to the AAR requirement. A defensive AAR that blames Morales will confirm you are not ready for higher responsibility. An honest AAR that names the root cause (including your own misses) will earn you a quiet reputation for integrity that follows you for years."
  };

  window.__CCO_DATA.injects["IM-45"] = {
    "id": "IM-45",
    "observer_note": "Host nation VIP demand — cross-cultural diplomacy. Observe whether the trainer protects the nuance or flattens it.",
    "quick_fires": [
      {"label": "PRESSURE — VIP calls again", "from": "Host Nation VIP liaison", "subject": "His Excellency is displeased", "body": "His Excellency remembers your organization used a different vendor for the palace guard quarters repair. He expects that vendor (his cousin's company) to be used again on the new requirement. Please confirm."},
      {"label": "HELPFUL — FAR on host nation preferences", "from": "Staff Judge Advocate", "subject": "DFARS 225.7", "body": "Host-nation preferences are subject to specific DFARS rules. We can consider nation-of-origin as a factor in limited circumstances, but we cannot sole-source to a VIP's relative. Document the request, let me craft the reply. Do NOT acquiesce."}
    ],
    "title": "Host nation VIP demand",
    "tlo": [
      "TLO-5-Execution"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 9,
      "earliest_minute": 0,
      "latest_hour": 11,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "A Tarkani provincial minister wants to meet you personally to 'discuss future opportunities' for his relative's company.",
    "scenario_for_students": "A letter arrives via the embassy liaison: HE Minister Al-Qabasi of Tarkana's Ministry of Labor requests a 'private meeting' with the Eagle Crest CCO. The letter references his relative's company, Qabasi Group, and says 'future cooperation opportunities' should be explored. The embassy note attached warns that Al-Qabasi has been a persistent influence-seeker.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "US Embassy Tarkana (Econ Section)",
        "from_email": "tarkana.econ.state.gov",
        "subject": "FYI - Al-Qabasi request",
        "body": "CCO, FYI we received a letter from HE Al-Qabasi requesting a private meeting with you about his cousin's company (Qabasi Group). Known influence-seeker. Do not meet privately. Happy to facilitate through our commercial section if there is a legitimate business need. - Econ Counselor"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Decline the private meeting",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Route any legitimate business interest through the embassy commercial section",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Do not discuss the matter with Al-Qabasi's staff informally",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Document the request and refusal",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Thank the embassy for the heads-up",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "Host nation officials who want 'private meetings' about relatives' companies are telling you exactly what they want. The answer is always the embassy. Your role is not to be diplomatic — it is to be unambiguous. Embassy commercial sections exist precisely to handle these conversations. Use them."
  };

  window.__CCO_DATA.injects["IM-46"] = {
    "id": "IM-46",
    "observer_note": "Whistleblower on subcontractor — observe whether the trainer lets the students work the referral path themselves or feeds them the answer.",
    "quick_fires": [
      {"label": "ESCALATE — whistleblower follows up", "from": "Anonymous (via base hotline)", "subject": "the sub is still billing ghost hours", "body": "I told you last week. No one acted. The sub is billing 60 hours per man per week and they're only physically on site 40. I'm sending this to the IG tomorrow if contracts doesn't act."},
      {"label": "HELPFUL — reporter referral process", "from": "Chief of Contracting (reachback)", "subject": "whistleblower handling", "body": "Whistleblower protections under 10 USC 2409. Protect the identity. Refer to IG for investigation. In parallel, you as the KO can request the prime's surveillance records and do your own spot check."}
    ],
    "title": "Whistleblower on a subcontractor",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 10,
      "earliest_minute": 0,
      "latest_hour": 11,
      "latest_minute": 0
    },
    "duration_minutes": 45,
    "description": "A former TFL employee anonymously tips you about wage theft from host nation laborers.",
    "scenario_for_students": "An anonymous envelope arrives. Inside is a one-page letter in broken English describing wage theft: TFL management allegedly skims 15% of host nation worker pay and threatens deportation if workers complain. The letter includes names and dates. The writer asks for anonymity and says they will not contact you directly for fear of retaliation.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Treat the tip seriously regardless of anonymity",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Preserve the letter as evidence — do not photocopy casually or share widely",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Report to JA, OSI, and DOL labor standards immediately",
        "priority": "critical",
        "objective": true,
        "notes": "Combating Trafficking in Persons (CTIP) clause 52.222-50 requires investigation."
      },
      {
        "id": "a4",
        "description": "Do NOT alert TFL or confront anyone until authorities advise",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Document your receipt of the letter with timestamp",
        "priority": "high",
        "objective": true
      }
    ],
    "teaching_point": "Wage theft and labor abuse are exactly what the Combating Trafficking in Persons clause exists to catch. A tip — even anonymous, even vague — triggers investigation. Your job is to preserve the evidence and route it properly, not to play detective. CCOs who ignore anonymous tips 'because they can't verify' have been relieved when the abuse turned out to be real. Route it."
  };

  window.__CCO_DATA.injects["IM-47"] = {
    "id": "IM-47",
    "observer_note": "IG cold-call interview — observe whether the trainer plays the IG as fair-minded. Any adversarial theatrics undermine the real-world lesson.",
    "quick_fires": [
      {"label": "PROBE — IG opens", "from": "IG investigator", "subject": "interview request", "body": "We'd like to speak with you about the contracting actions in the first 96 hours of the rotation. Not an accusation — we're doing routine oversight on high-turnover shops. 30 minutes. We'll come to you. Thursday 1000."},
      {"label": "HELPFUL — interview prep", "from": "Staff Judge Advocate", "subject": "you have rights + obligations", "body": "You are required to answer IG questions truthfully. You have the right to counsel. You have the right to review records before answering questions that depend on them. Don't guess. Say 'let me check the record.' Call me before the interview."}
    ],
    "title": "IG cold-call interview",
    "tlo": [
      "TLO-4-Admin"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 10,
      "earliest_minute": 30,
      "latest_hour": 11,
      "latest_minute": 0
    },
    "duration_minutes": 30,
    "description": "The SAF/IG team from IM-21 asks for a private 30-minute interview with you. No topic specified.",
    "scenario_for_students": "Maj Cortez from the IG team returns. She says she would like a private 30-minute interview with you. She does not say what about. She does say 'nothing nefarious, informational.' You have the right to decline without reason. You also know that declining is itself a signal.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "Maj Cortez (SAF/IG)",
        "from_email": "cortez.ig.tdy.mil@mail.mil",
        "subject": "30 min of your time",
        "body": "CCO, would like a private 30-minute informational session with you this afternoon. Not an investigation, no findings, just data gathering. Your choice — I understand if you decline. - Cortez"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Accept the interview unless you have a specific reason to consult counsel first",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Be honest and factual",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Do NOT speculate or name individuals you do not know are involved",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Document what was asked after the interview",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Notify your chain you had the interview",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "IG interviews are not interrogations. Treating them as such creates suspicion where none was needed. Answer factually, stick to what you know, and document what was asked. CCOs who over-prepare for IG interviews often sound like they are hiding something; CCOs who answer plainly earn credibility."
  };

  window.__CCO_DATA.injects["IM-48"] = {
    "id": "IM-48",
    "observer_note": "Writing the turnover is meta — students document what they learned. Observe whether the trainer resists editing their drafts in real time.",
    "quick_fires": [
      {"label": "HELPFUL — turnover template", "from": "Prior CCO (Morales)", "subject": "my turnover notes — steal what works", "body": "Attaching the turnover notes I WISH I'd received. Key sections: (1) live contracts with owner + risk, (2) pending actions with next step, (3) vendor relationships good and bad, (4) people who will help you, (5) traps. Keep it short. Write it for a tired person. — Morales"},
      {"label": "PROBE — incoming team asks", "from": "Incoming CCO (via email)", "subject": "just landed — what do I need to know", "body": "Hey — just off the rotator. What's the ONE thing you wish your predecessor had told you? I promise I'll read whatever you send, but if you can give me one line, that's what I'll remember."}
    ],
    "title": "Writing the turnover",
    "tlo": [
      "TLO-6-Redeployment"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 10,
      "earliest_minute": 30,
      "latest_hour": 11,
      "latest_minute": 0
    },
    "duration_minutes": 45,
    "description": "Your own turnover to the incoming CCO. You decide whether to repeat Morales's mistakes.",
    "scenario_for_students": "You sit down to write the turnover for your successor, whose rotator arrives in two days. In front of you is Morales's brief from Day 1, which you now know was half-accurate and half-optimistic. You know exactly what you wish had been on that page when you arrived. You also know that the blunt truth about the Al-Rashid ratification will follow you.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Document the real state of the shop, not the optimistic version",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Include the Al-Rashid lesson honestly",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Include verified expiration dates of every instrument",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a4",
        "description": "Include your WIP and where the successor should focus Day 1",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Leave contact info for follow-up questions",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "The turnover brief is the single most consequential document you write in a rotation. Morales left you an optimistic one and you inherited the costs. The incoming CCO is you on Day 1 — they deserve better. The discipline of writing an honest turnover is the moment you stop being a junior CCO and become a senior one. The audit trail of the Al-Rashid ratification is your badge of honor, not your shame — you fixed it. Write it down so the next person does not have to."
  };

  window.__CCO_DATA.injects["IM-49"] = {
    "id": "IM-49",
    "observer_note": "$50 lapel pin is the ethics bright-line drill. Observe whether the trainer lets students argue the gift rule without leading them to the answer.",
    "quick_fires": [
      {"label": "PRESSURE — the pin arrives", "from": "Vendor (via desk drop)", "subject": "small gift — from our team", "body": "Left on your desk: a $50 lapel pin with the vendor's logo and the 455 AEW shield. Note attached: 'In appreciation for your partnership. — [Vendor]'"},
      {"label": "HELPFUL — de minimis test", "from": "Staff Judge Advocate", "subject": "gift rule in deployed environments", "body": "The $20 de minimis exception applies in some cases but NOT from prohibited sources (vendors with active contracts). Even a $5 pin from an active vendor is prohibited. Refuse it. Log it. Return it with a memo. Simple."}
    ],
    "title": "The $50 lapel pin",
    "tlo": [
      "TLO-1-Ethics"
    ],
    "difficulty": [
      "amber"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 11,
      "earliest_minute": 0,
      "latest_hour": 12,
      "latest_minute": 0
    },
    "duration_minutes": 15,
    "description": "A CODEL staffer gives you a $50 congressional lapel pin 'as a thank you for the briefing.'",
    "scenario_for_students": "As the CODEL departs, a staffer hands you a small velvet box. Inside is a sterling silver congressional lapel pin, clearly worth about $50. She says 'from the Senator — a thank you for the briefing.' Her colleagues are watching. Refusing will feel rude; accepting will feel wrong.",
    "expected_actions": [
      {
        "id": "a1",
        "description": "Recognize this is over the JER $20 limit",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Decline politely, blame the rule",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Suggest alternatives — a handshake, a group photo, a thank-you letter",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a4",
        "description": "Document the refusal in writing",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Preserve the staffer's dignity in the refusal",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "The $20 rule in JER 5500.7-R is not optional, not waivable, and not subject to 'just this once.' The correct response to every over-limit gift is decline, preserve the relationship, document. Senators are not offended — their staff know the rules too. The pin will find another home. Your clearance will not."
  };

  window.__CCO_DATA.injects["IM-50"] = {
    "id": "IM-50",
    "observer_note": "Hotwash reflection — the trainer's biggest failure mode is talking more than listening. Grade the trainer's student-talk-time ratio.",
    "quick_fires": [
      {"label": "PROBE — hotwash opening", "from": "Exercise Director", "subject": "hotwash — your turn", "body": "In your own words: what surprised you most in the last 96 hours? Not what you did wrong — what you didn't expect. Answer without looking at notes."},
      {"label": "HELPFUL — hotwash structure", "from": "Exercise Director", "subject": "three questions", "body": "Standard hotwash structure: (1) What happened? (2) What did you learn? (3) What will you do differently? Keep it honest. This is not graded. The observation notes from the observer are more diagnostic than anything you'll say here."}
    ],
    "title": "Hotwash reflection",
    "tlo": [
      "TLO-6-Redeployment"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 4,
      "earliest_hour": 12,
      "earliest_minute": 0,
      "latest_hour": 13,
      "latest_minute": 0
    },
    "duration_minutes": 60,
    "description": "ENDEX. You and your team close the exercise. The inspector has questions.",
    "scenario_for_students": "The exercise clock stops. Col Ramsey walks into your shop, grins, and says 'well, survived.' The inspector team pulls your shop into the hotwash room. They ask a final question: 'If you had this rotation to do over, what one thing would you do differently on Day 1?'",
    "sms_items": [
      {
        "id": "sms1",
        "contact_id": "ramsey",
        "delay_minutes": 2,
        "messages": [
          "Good work",
          "You'll be invited back",
          "Buy your team lunch"
        ]
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Answer with specificity — name the ONE thing",
        "priority": "critical",
        "objective": true
      },
      {
        "id": "a2",
        "description": "Do not answer with false humility or deflection",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a3",
        "description": "Acknowledge teammates who helped you through",
        "priority": "high",
        "objective": false
      },
      {
        "id": "a4",
        "description": "Leave the hotwash with a concrete personal lesson",
        "priority": "high",
        "objective": true
      },
      {
        "id": "a5",
        "description": "Thank the inspectors for their observation",
        "priority": "medium",
        "objective": false
      }
    ],
    "teaching_point": "The hotwash answer is the only part of the exercise that travels back with you to garrison. Pick one lesson, name it clearly, and carry it forward. CCOs who cannot name a single specific thing they learned have not actually learned. The best answer is small, concrete, and slightly embarrassing — those are the ones that stick."
  };


  // --- v0.2.8 content additions ---

  window.__CCO_DATA.injects["IM-51"] = {
    "id": "IM-51",
    "observer_note": "'Who's in charge?' is THE opening moment. Observe whether the trainer plays Ramsey as hostile-neutral and whether they resist intervening when students argue.",
    "quick_fires": [
      {"label": "PRESSURE — Ramsey impatient", "from": "Col Ramsey", "subject": "still waiting", "body": "[Ramsey is still standing there. He hasn't moved. He's looking from face to face. Thirty seconds have passed since he asked the question. He raises his eyebrows.]"},
      {"label": "HOSTILE — Ramsey picks", "from": "Col Ramsey", "subject": "fine. YOU.", "body": "[Ramsey points at one of you — whichever student looks most uncomfortable.] Fine. YOU. You're the Team Lead until proven otherwise. Fix my coffee shop and don't embarrass me. Everyone else: figure out who does what, and tell me in an hour. Go."}
    ],
    "title": "Who is in charge here?",
    "tlo": [
      "TLO-3-Standup"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "absolute",
      "day": 1,
      "hour": 7,
      "minute": 59
    },
    "duration_minutes": 15,
    "description": "Col Ramsey walks into the K shop at 0759 and demands to know who is leading the team. The team has ninety seconds to pick a Flight Chief / Team Lead. Everything else routes through whoever they pick until they learn to delegate.",
    "scenario_for_students": "Before you even set your coffee down, the Wing Commander (Col Ramsey) is standing in the middle of your shop. He doesn't shake hands. He doesn't care about your rotator flight. He asks one question: 'Who is the Flight Chief?' He's going to point at exactly one of you and that person owns every requirement that walks through the door for the rest of this rotation until they delegate. Pick now.",
    "inbox_items": [
      {
        "id": "ramsey-walkin",
        "from": "Col Ramsey (Wing/CC)",
        "from_email": "",
        "subject": "Who is in charge of this shop?",
        "body": "Team —\n\nI just walked through your shop. I saw four people standing around looking at each other. I asked who was in charge and nobody answered.\n\nPick. Now.\n\nI want roles on the board before my next coffee. At a minimum I need a Team Lead. Ideally I also see a Commander, an SEL, and a Flight Chief — but Team Lead is the floor. Whoever wears the top leadership hat owns every requirement, every vendor call, every ethics question, and every dumpster fire between now and ENDEX, until they learn to push work to an ACO or CCO.\n\nUse the 'Role assignments' panel on the trainer workstation. Tag every student with CCO, ACO, Team Lead, Commander, SEL, or Flight Chief.\n\nAfter this, leadership-primed items route to whoever sits at the top of the fall-through chain. ACO-specific items go to your ACO. Everything else goes to everyone working contracts. That's the training.\n\nMove.\n— Ramsey"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Team discusses and assigns a Team Lead within 3 minutes (minimum floor — Commander/SEL/Flight Chief optional but encouraged)",
        "objective": true,
        "priority": "high",
        "notes": "Trainer uses the Role assignments panel on trainer.html to tag the student with 'Team Lead' (or a higher leadership role). Leadership fall-through makes that student the primary for every leadership-tagged inject."
      },
      {
        "id": "a2",
        "description": "Leader acknowledges the role verbally in the room — not just in the UI",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a3",
        "description": "Team tags the remaining students as CCO or ACO (ACOs get extra injects the CCOs don't see)",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a4",
        "description": "Team does NOT paralyze over the pick — if they spend more than 5 minutes arguing, trainer fires a curveball",
        "objective": false,
        "priority": "medium"
      }
    ],
    "trainer_prompts": [
      "Play Ramsey as hostile-neutral: you don't care WHO they pick, only that they pick fast.",
      "If the team tries to co-lead or run 'lead-by-committee', shut it down. One Team Lead minimum.",
      "When they pick, open the 'Role assignments' panel on trainer.html and tag each student with the right role. Team Lead is the floor — Commander / SEL / Flight Chief are nice to have but not required.",
      "The leadership fall-through chain is Commander → SEL → Flight Chief → Team Lead. Whichever role is highest on the chain is the 'primary' that leadership-tagged injects route to first.",
      "Every student gets exactly ONE role. Leaders see everything; ACOs see CCO + ACO injects; CCOs see CCO-only plus broadcasts.",
      "The lesson being set up: you cannot teach delegation without first forcing a bottleneck. The bottleneck IS the teaching tool."
    ],
    "teaching_point": "Contingency contracting shops don't get to be flat. Someone has to own the queue — because when the Wing CC calls at 0200, 'let me check with the team' is the wrong answer. The first skill is picking a lead fast, under time pressure, with incomplete information. The second skill — which the next three days will train — is learning to push work back out when the lead becomes the bottleneck."
  };

  window.__CCO_DATA.injects["IM-52"] = {
    "id": "IM-52",
    "observer_note": "DFAC chicken tests the ACO designation reflex. Observe whether the trainer pushes the 'who's your ACO?' question instead of letting the lead handle it personally.",
    "quick_fires": [
      {"label": "PRESSURE — Lao follows up", "from": "Capt Lao (455 MDG/SGPM)", "subject": "where is your ACO?", "body": "It's been fifteen minutes. I have four airmen in the aid station now. I need a named contracting voice on this contract RIGHT NOW. If you don't have an ACO, tell me who I'm supposed to call. — Lao"},
      {"label": "HELPFUL — cure notice template", "from": "Chief of Contracting (reachback)", "subject": "cure notice — Crescent Star", "body": "Attaching the cure notice template IAW FAR 49.607. Key: describe the deficiency specifically (temperature log failure), give them 10 days to cure, reserve government rights. Your ACO signs. Send certified."}
    ],
    "title": "DFAC undercooked chicken — who's your ACO?",
    "tlo": [
      "TLO-4-Execute"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 1,
      "earliest_hour": 11,
      "earliest_minute": 15,
      "latest_hour": 11,
      "latest_minute": 50
    },
    "duration_minutes": 60,
    "description": "Public Health sends an email claiming the DFAC contractor served undercooked chicken at lunch. Three airmen are at the med group. This is an ACO action — but the team hasn't designated an ACO yet. The lead gets the item flagged 'needs ACO' and has to decide who on their team wears that hat.",
    "scenario_for_students": "An email lands in your inbox from Capt Lao at 455 MDG/SGPM (Public Health). Three airmen from 2 FS are being evaluated for gastrointestinal distress after the 1130 lunch push. Public Health is pointing at the chicken. The DFAC is a performance-based contract with Crescent Star Catering. This is an ACO call — contract administration on a performance failure. You need to (1) stop serving the suspect product, (2) document what Public Health found, (3) issue a cure notice if warranted. But you haven't designated an ACO yet. That's the decision you have to make RIGHT NOW — not after lunch.",
    "inbox_items": [
      {
        "id": "mdg-sgpm-chicken",
        "from": "Capt Lao (455 MDG/SGPM)",
        "from_email": "",
        "subject": "URGENT — Possible foodborne illness cluster, DFAC chicken",
        "body": "K shop —\n\nI have three airmen from 2 FS in the aid station presenting with acute GI symptoms. All three ate the grilled chicken at the DFAC between 1130 and 1150. I am stopping service on that line now but I need contracting involvement.\n\nWhoever your ACO on the DFAC contract is — I need them on the phone with me in the next fifteen minutes. We may need a cure notice on Crescent Star. The contract is performance-based and they have a temperature-log requirement that should have caught this.\n\nPlease designate your ACO and have them call me at DSN 318-XXX-4412.\n\nV/R,\nCapt Lao, 455 MDG/SGPM"
      },
      {
        "id": "villanueva-fyi-chicken",
        "from": "TSgt Villanueva (2 FS/FM)",
        "from_email": "",
        "subject": "fyi — my guys in medical",
        "body": "hey heads up three of my guys just went to medical, chow hall chicken\nlao is livid\nif you need help with funding for a cure notice or whatever, hit me up"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Team recognizes this is an ACO action and does not try to make the lead handle it themselves",
        "objective": true,
        "priority": "high",
        "notes": "If a leader tries to call Lao directly instead of pushing it to the ACO, trainer prompts 'is that your job?' one more time."
      },
      {
        "id": "a2",
        "description": "If no ACO has been assigned on the trainer panel when this fires, the leaders get the item and immediately tag someone as ACO so the inject re-routes to them",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a3",
        "description": "Designated ACO immediately calls Lao, stops service on the grilled chicken line, requests the temperature logs from Crescent Star",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a4",
        "description": "ACO drafts a cure notice IAW FAR 49.607 if the temp logs show a compliance failure",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a5",
        "description": "ACO documents everything for the contract file — this will become part of the post-exercise hotwash",
        "objective": false,
        "priority": "medium"
      }
    ],
    "trainer_prompts": [
      "THE POINT OF THIS INJECT is the 'who's your ACO?' moment. When it fires with no ACO assigned, only the leaders see it. That's the signal: leadership has to designate an ACO before this can actually get worked.",
      "Play Capt Lao on the phone as professional but urgent. She's not mad at the K shop — she's mad at Crescent Star — but she needs a contracts voice and she needs it now.",
      "When the leader tags someone as ACO via the Role assignments panel, the item's role_tag filter now lets that student see it. Watch for the student noticing the new inbox entry.",
      "Curveball option: if the team already has an ACO assigned, drop a SECOND inject from Public Health an hour later on a DIFFERENT contract (fuel? facilities?) to force them to think about whether ONE ACO handles everything or they need per-contract appointments.",
      "Real-world note: food safety events on deployed contracts are genuinely scary because they cascade fast — GI illness at scale can degrade mission capability. This is why the ACO role exists: one named person owns the performance conversation."
    ],
    "teaching_point": "Contract Administration Officer (ACO) is not a job title, it's an appointment. Someone holds it for a specific contract. Until the lead picks someone, the shop has a leadership gap on every performance issue that surfaces. The right answer isn't 'whoever's free' — it's 'the teammate whose strengths match the contract type, appointed BEFORE the crisis, so they already know the vehicle when the phone rings.' This inject forces the team to learn that the hard way: the phone is ringing, and they haven't picked yet.",
    "role_tag": "aco"
  };

  window.__CCO_DATA.injects["IM-53"] = {
    "id": "IM-53",
    "observer_note": "Day 1 file pile — observe whether the trainer LEAVES STUDENTS ALONE for the first 60-90 minutes instead of hovering. Hovering is the failure mode.",
    "quick_fires": [
      {"label": "PRESSURE — Morales checks in", "from": "SMSgt Morales (from the rotator)", "subject": "did you open the folder?", "body": "Quick check before I board — did you open the Day 1 folder on your Desktop? Did you delegate it or try to read it yourself? No judgment either way, just want to know how the team's handling it. — Morales"},
      {"label": "HELPFUL — read-out template", "from": "Prior rotation (Lt Chen)", "subject": "pile triage template that worked", "body": "Template we used last rotation: one line per file. Columns: Title | Status (LIVE/EXPIRED/NOISE) | Risk (R/A/G) | Next step | Owner. Fill it out as a team in one sitting. Forces clarity. Attaching the blank. — Chen"}
    ],
    "title": "Shop file pile — Day 1 intake",
    "tlo": [
      "TLO-3-Standup"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "absolute",
      "day": 1,
      "hour": 8,
      "minute": 1
    },
    "duration_minutes": 180,
    "description": "The Day 1 shop file pile. Morales left a stack of paperwork on the shared drive as a handoff: live BPAs, an expiring IDIQ, a deliberately-expired BPA trap, the prior rotation's half-broken tracker, a ratification folder, and deliberate noise items. The actual files live on each student's Desktop in a 'CCO Training Prototype - Docs/Day1/' folder. This inject is the single pointer telling the leader to go open it. Routed to leadership primary so the leader has to decide who reads what.",
    "scenario_for_students": "Morales left a day-one pile on your shared drive and mirrored it to the Desktop folder on every team laptop. About fourteen documents. Most of your Day 1 is this pile. Some of it is on fire, some of it is furniture, some of it is noise. Your job — as the leader who just got tapped — is to figure out which is which, WITHOUT reading all fourteen yourself. Delegate. Trust the read-outs your team brings back. Rebuild your picture of the shop.",
    "inbox_items": [
      {
        "id": "pile-morales-handoff",
        "from": "SMSgt Morales (outgoing)",
        "from_email": "",
        "subject": "Day 1 pile is on your Desktop — CCO Training Prototype - Docs/Day1/",
        "body": "Chief / whoever's in charge —\n\nI left the Day 1 working pile in the folder on your Desktop:\n  CCO Training Prototype - Docs/Day1/\n\nAbout fourteen items. Highlights of what's in there, roughly in order:\n\n  • TFL_BPA_Master.pdf — Tarkana Facilities blanket. Live. Big ceiling.\n  • Crescent_Star_IDIQ_Consumables.pdf — DFAC + consumables, dual-use.\n  • AlRashid_Construction_BPA.pdf — FLAGGED IN RED. Read it carefully.\n  • Fuel_Support_IDIQ_FY25.pdf — bulk fuel, NET-30, two DOs open.\n  • Linguist_Services_Contract_EXPIRED.pdf — somebody is still paying\n    Ms. Karimi and I don't know who.\n  • K_Shop_Tracker_LAST_ROTATION.xlsx — my attempt at a tracker.\n    Maybe a third of the rows are real. Don't trust it without rebuilding.\n  • Mediterranean_Supply_Partners_BPA.pdf — check SAM. Sticky note on it.\n  • DRAFT_Generator_Mod_TFL.docx — unsigned mod. Dooley's been asking.\n  • RATIFICATION_PENDING_FolderCover.pdf — FAR 1.602-3 territory.\n  • SBA_8a_Set_Aside_Inquiry.pdf — response deadline blew past last week.\n  • KO_Appointment_Letter_OUTGOING.pdf — my warrant. Doesn't cover you.\n    Get your own from the KO.\n  • MIPR_ArmyLNO_FY25.pdf — seven days before the Army rescinds.\n  • Morale_Fund_Memo.pdf — noise. Ignore it.\n  • notes.txt — my handoff notes. Half journal, half to-do. Read it.\n\nA real file pile is 30% noise. Don't read everything yourself — push items to your CCOs and ACOs and make them brief you back. You can't sort all of this in one head and keep the rest of the day moving.\n\nFlagged the Al-Rashid item in red. Don't trust the cover sheet on that one.\n\nGood luck. I'm on the rotator out at 0900.\n— Morales"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Leader opens the Desktop folder and skims the manifest within the first 5 minutes",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a2",
        "description": "Leader delegates file reading across the team — does NOT read all fourteen themselves",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a3",
        "description": "Team identifies the Al-Rashid expired BPA within the first hour (reinforces IM-01 trap)",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a4",
        "description": "Team finds the Mediterranean Supply Partners debarment note and checks SAM",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a5",
        "description": "Team finds the ratification pending folder and assigns someone to work it IAW FAR 1.602-3",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a6",
        "description": "Team finds the expired linguist contract and escalates — Ms. Karimi is still working",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a7",
        "description": "Team acknowledges the Army MIPR before the 7-day clock expires",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a8",
        "description": "Team ignores or quickly dismisses the morale-fund memo and the personal notes file's most emotional bits — noise discipline",
        "objective": false,
        "priority": "medium"
      }
    ],
    "trainer_prompts": [
      "Pre-exercise checklist: make sure the 'CCO Training Prototype - Docs/Day1/' folder is on every student laptop's Desktop BEFORE STARTEX. The inject references the folder by name.",
      "This inject is the Day 1 centerpiece. Let the team work the pile for 60-90 minutes before interrupting.",
      "The inject fires only to the leadership primary. If no leader is assigned yet (because IM-51 hasn't been resolved), the item will re-stamp itself once you tag a leader on the panel.",
      "Watch HOW the leader distributes work. Do they give everyone a stack? Do they give the junior the trap files? Do they read everything themselves?",
      "The Al-Rashid trap is deliberately mid-list — not first. Students who skim will miss it.",
      "If students delegate by 'topic' (one person does BPAs, one does IDIQs) that's fine. If they delegate by 'whoever is closest' that's a red flag — note it for hotwash.",
      "The personal notes file (notes.txt) is the highest-information document in the pile. Students who find it and treat it seriously get ahead. Students who dismiss it as 'informal' miss the DCMA surprise rumor (IM-35)."
    ],
    "teaching_point": "The first three hours of a rotation are the only quiet time you'll get. Use them to read files — not to strategize, not to meet people, not to set up desks. The team that wins Day 1 is the team whose lead delegated reading assignments in the first ten minutes and demanded read-outs by hour three. The team that loses Day 1 is the team whose lead tried to read everything themselves and ran out of time before any one file was understood.",
    "role_tag": "leadership"
  };

  // --- end v0.2.8 additions ---


  // --- v0.2.9 leader-task additions ---

  window.__CCO_DATA.injects["IM-54"] = {
    "id": "IM-54",
    "title": "1300 sync brief for Col Ramsey",
    "tlo": [
      "TLO-3-Standup",
      "TLO-4-Execute"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "absolute",
      "day": 1,
      "hour": 12,
      "minute": 15
    },
    "duration_minutes": 45,
    "description": "The Wing CC wants a 5-minute sync brief at 1300 covering shop status, active risks, and asks. The leader must prep the brief AND delegate reach-back to the team for specific data points — without becoming the bottleneck themselves.",
    "scenario_for_students": "Capt Perez just forwarded a note: Col Ramsey wants a 5-minute contracting sync at 1300. Not a presentation. Not slides. He wants you standing in front of him saying three things: what is the shop carrying, what is on fire, and what do you need from him. You have 45 minutes. You also have two students still working the Day 1 file pile and one handling an ACO action on the DFAC chicken issue. Don't abandon them to prep the brief. Don't show up unprepared either. Delegate the data-pulls, synthesize, and walk over.",
    "role_tag": "leadership",
    "leader_task": true,
    "observer_note": "Watch whether the leader delegates the data-pulls for the brief or tries to gather it all themselves. Self-gathering is the failure mode — it means the lead is the bottleneck and the rest of the team is idle for 45 minutes.",
    "quick_fires": [
      {
        "label": "PRESSURE — Ramsey moves it up",
        "from": "Capt Perez (455 AEW/CCX)",
        "subject": "Ramsey wants it at 1230",
        "body": "Heads up — Ramsey just asked if he can pull the brief forward to 1230. If you say yes, you lose 30 minutes. If you say no, make sure your reason is a real one. — Perez"
      },
      {
        "label": "HELPFUL — brief format",
        "from": "Capt Perez",
        "subject": "how Ramsey likes briefs",
        "body": "From experience: three bullets, one page, no slides. 'What's the shop carrying' / 'What's on fire' / 'What do you need from me.' He'll ask two questions. Answer them and get out. Don't volunteer. — Perez"
      },
      {
        "label": "CURVEBALL — a new fire mid-prep",
        "from": "CE SMSgt Dooley",
        "subject": "we have another generator down",
        "body": "Hey — I know you're busy but we have a second backup generator failure at the hospital. Can contracting spin up something? Sorry to add to the pile."
      }
    ],
    "inbox_items": [
      {
        "id": "perez-sync-req",
        "from": "Capt Perez (455 AEW/CCX)",
        "from_email": "",
        "subject": "Ramsey sync — 1300",
        "body": "Quick one. Ramsey wants 5 minutes with the lead of the K shop at 1300 to get a sync on contracting status. This is informal — no slides. He wants to hear: (1) what you're carrying, (2) what's on fire, (3) what you need from him. Don't be late. Don't overprep. Don't show up empty. — Perez"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Leader delegates data-pull tasks to team members (who pulls inventory summary, who flags active risks, who drafts asks)",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a2",
        "description": "Leader synthesizes the team's inputs into a three-bullet format — NOT a recitation of the raw data",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a3",
        "description": "Leader arrives at Ramsey's office on time, prepared, and without pulling people away from their own urgent work",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a4",
        "description": "Leader's 'asks' are specific and actionable — not vague requests for 'more support'",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a5",
        "description": "Leader does NOT show up with slides or a handout — Ramsey hates both",
        "objective": false,
        "priority": "medium"
      }
    ],
    "trainer_prompts": [
      "This is a delegation drill dressed up as a briefing drill. If the leader prepares everything themselves, the lesson failed. Note it for hotwash.",
      "Play Perez warm — she IS trying to help. Ramsey should be played off-stage (the brief itself happens 'in your head' for purposes of the exercise unless you want to role-play it).",
      "The observer is watching HOW the leader asks their teammates for help. 'Can you pull X by 1245?' is good. 'I need everything' is bad.",
      "If the leader tries to pull someone off the ACO chicken inject to help with the brief, intervene and remind them that inject is still active."
    ],
    "teaching_point": "Leaders don't brief the wing commander by doing the work themselves. They delegate the data collection, they synthesize quickly, and they show up with a structured answer and a specific ask. The hardest part of leading a small shop is resisting the urge to do everything yourself because you think it's faster. It's only faster on the first brief. By the second one, your team is idle, you're exhausted, and the next fire has started burning."
  };

  window.__CCO_DATA.injects["IM-55"] = {
    "id": "IM-55",
    "title": "ACO / CCO workload dispute",
    "tlo": [
      "TLO-3-Standup",
      "TLO-4-Execute"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "window",
      "day": 2,
      "earliest_hour": 9,
      "earliest_minute": 30,
      "latest_hour": 10,
      "latest_minute": 30
    },
    "duration_minutes": 30,
    "description": "Two team members have a workload conflict. The CCO thinks the ACO is pushing admin work onto them. The ACO thinks the CCO is ignoring cure-notice paperwork. Both come to the leader for adjudication. The leader must mediate without picking a personal favorite.",
    "scenario_for_students": "Two teammates just walked into your office one after the other. The CCO thinks your ACO is dumping cure-notice admin on them because 'the ACO is too busy.' The ACO thinks the CCO is blowing off the cure notice because 'that's not real contracting.' Both came to you to fix it. You have ten minutes before your next thing. Don't pick a favorite. Don't send them away still angry. Don't make it worse by picking the wrong framework.",
    "role_tag": "leadership",
    "leader_task": true,
    "observer_note": "Watch whether the trainer plays both teammates as sympathetic. If the trainer makes one obviously right, the lesson (mediate without picking a personal favorite) collapses.",
    "quick_fires": [
      {
        "label": "CCO complains directly",
        "from": "CCO teammate",
        "subject": "this isn't my job",
        "body": "Hey — the ACO just handed me a cure notice packet to 'help with.' I have my own work. The ACO role exists so someone OWNS this stuff. I'm not saying no, I'm saying I shouldn't have to. Can you talk to them?"
      },
      {
        "label": "ACO complains directly",
        "from": "ACO teammate",
        "subject": "the CCO won't help",
        "body": "I asked for a hand on the cure notice admin — literally 30 minutes of paperwork — and got attitude. I have three cure notices in parallel right now. If the CCO can't spare 30 minutes I need to know so I can plan. This isn't sustainable."
      },
      {
        "label": "DE-ESCALATE — SNCO steps in",
        "from": "Senior Enlisted Leader (if assigned)",
        "subject": "I can handle this",
        "body": "[SEL to leader, privately:] Hey — I can take this one off your plate. Both of them have good points. Let me sit them down together for 15 minutes. If that doesn't work, you step in. Fair?"
      }
    ],
    "inbox_items": [
      {
        "id": "workload-memo",
        "from": "CCO teammate",
        "from_email": "",
        "subject": "workload question",
        "body": "Hey — can we talk for five minutes when you have a second? The ACO is pushing work over to me that I think should sit with them. I don't want to make a thing out of it but it's the second time this week. — [CCO]"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Leader hears BOTH sides before making any decision",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a2",
        "description": "Leader distinguishes between a genuine scope question (what work lives with which role) and a personal friction issue",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a3",
        "description": "Leader either decides or delegates the mediation to a senior enlisted teammate — does not let it fester",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a4",
        "description": "Leader follows up 24 hours later to see if the friction is actually resolved",
        "objective": false,
        "priority": "medium"
      }
    ],
    "trainer_prompts": [
      "Play both teammates as reasonable. Both have real points. The CCO is right that the ACO role exists for a reason. The ACO is right that admin spillover is normal when workload is high.",
      "The wrong answer is 'whoever is closer to the leader wins.' The right answer is 'here's the principle and here's how we'll handle it next time.'",
      "If the leader tries to make this about rank or seniority instead of roles, push back gently in character.",
      "Note for hotwash: did the leader resolve it themselves or push it to an SEL?"
    ],
    "teaching_point": "The hardest leadership calls in a small shop aren't about contracts — they're about deciding who does what when the workload doesn't fit neatly into role boundaries. The goal is not to 'win' the dispute but to establish a principle the team can apply next time. If every mediation requires the leader's personal involvement, the leader becomes the bottleneck."
  };

  window.__CCO_DATA.injects["IM-56"] = {
    "id": "IM-56",
    "title": "Weekly PR approval batch",
    "tlo": [
      "TLO-4-Execute"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "absolute",
      "day": 2,
      "hour": 14,
      "minute": 0
    },
    "duration_minutes": 45,
    "description": "Six purchase requests have accumulated in the queue. The leader must review, approve, return with questions, or reject each one — and must NOT rubber-stamp. Two of the six have problems that will surface at hotwash if missed.",
    "scenario_for_students": "Your leader-approval queue has six PRs waiting. They've been piling up since you arrived. The CCOs wrote them, they're waiting on your sign. Take 45 minutes and work the queue. You can approve, you can return with questions, you can reject. What you cannot do is wave them all through. Two of them have problems. Find them.",
    "role_tag": "leadership",
    "leader_task": true,
    "observer_note": "Watch whether the leader actually reads each PR or rubber-stamps. Observe whether the leader marks up the problem PRs with specific feedback or just returns them with 'fix it.' Specificity matters.",
    "quick_fires": [
      {
        "label": "PRESSURE — CCO wants a fast approval",
        "from": "CCO (junior)",
        "subject": "PR-0045 — time sensitive",
        "body": "Hey — PR-0045 is blocking a vendor. They've been staging crew since Monday. Any chance you can sign it first? I checked it three times."
      },
      {
        "label": "PROBE — ambiguous PR",
        "from": "CCO (senior)",
        "subject": "PR-0048 scope question",
        "body": "So on PR-0048, the customer is asking for 'consulting services' at $45,000. I think this is personal services in disguise. I'd like your read before I push or kill it."
      },
      {
        "label": "HELPFUL — approval checklist",
        "from": "Chief of Contracting (reachback)",
        "subject": "PR triage checklist",
        "body": "Quick checklist for approval queue: (1) scope match? (2) funding certified? (3) competition considered? (4) requirements clear enough for a vendor to quote? (5) COR designated? If any 'no,' return with the specific question — don't fix it yourself."
      }
    ],
    "inbox_items": [
      {
        "id": "pr-queue-summary",
        "from": "PR Queue",
        "from_email": "",
        "subject": "6 PRs awaiting your approval",
        "body": "Queue summary:\n• PR-0043 — Facility repair, $8k, TFL BPA call, complete\n• PR-0044 — Office supplies, $2k, GPC candidate, complete\n• PR-0045 — Runway patching, $42k, Al-Rashid BPA call, 'urgent'\n• PR-0046 — Linguist hours, $12k, vehicle unclear, incomplete\n• PR-0047 — Generator oil, $6k, TFL BPA call, complete\n• PR-0048 — Consulting services, $45k, no vehicle, incomplete\n\nSigner: [Team Lead / leadership primary]"
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Leader catches PR-0045 — Al-Rashid BPA is expired, this call cannot be placed on that vehicle",
        "objective": true,
        "priority": "critical",
        "notes": "This is the centerpiece leader-test. Rubber-stamping this PR extends the Day 1 trap into a second unauthorized commitment."
      },
      {
        "id": "a2",
        "description": "Leader catches PR-0046 — linguist vehicle is unclear (references the expired Meridian contract) and returns with questions",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a3",
        "description": "Leader catches PR-0048 — 'consulting services' at $45k reads as potential personal services in disguise; returns with scope question",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a4",
        "description": "Leader approves or pushes through the clean PRs (0043, 0044, 0047) within the 45-minute window",
        "objective": true,
        "priority": "medium"
      },
      {
        "id": "a5",
        "description": "Leader does not rubber-stamp the entire batch out of time pressure",
        "objective": true,
        "priority": "critical"
      }
    ],
    "trainer_prompts": [
      "PR-0045 is the Al-Rashid re-trap — if the leader still hasn't caught the expiration from Day 1, this will catch it for them now. Either outcome is instructive.",
      "PR-0048 is a real-world trap too — 'consulting services' under $50k is the classic personal-services-in-disguise pattern. See FAR 37.104.",
      "Do NOT prompt the leader. Let them work the queue in real time.",
      "If they approve all six quickly, do not intervene. The hotwash will expose the misses."
    ],
    "teaching_point": "The approval signature is the last barrier between the shop and an unauthorized commitment. Every PR that crosses a leader's desk is a fresh chance to catch a vehicle error, a scope problem, or a compliance gap. Leaders who rubber-stamp to clear their queue are the ones whose shops end up in ratification paperwork six weeks later. Read every single one."
  };

  window.__CCO_DATA.injects["IM-57"] = {
    "id": "IM-57",
    "title": "Forward deployment — pick two",
    "tlo": [
      "TLO-3-Standup",
      "TLO-4-Execute"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "absolute",
      "day": 2,
      "hour": 16,
      "minute": 30
    },
    "duration_minutes": 30,
    "description": "A new requirement to forward-deploy two contracting personnel to a downrange location for 30 days. The leader must pick two of their four teammates, with incomplete information about who is best suited.",
    "scenario_for_students": "A FRAGO just came down from the JTF. They need two contracting personnel forward-deployed to a smaller downrange site for 30 days, starting in 72 hours. The site has minimal contracting coverage and needs hands on deck for a supply push. The leader must pick two of the four teammates — not volunteers, a pick. Nobody wants to go and you can't leave your own shop unstaffed. Think about skill match, risk, and fairness. You have 30 minutes to give the JTF a name list.",
    "role_tag": "leadership",
    "leader_task": true,
    "observer_note": "Watch whether the leader picks by skill-match (right answer) or by avoidance-of-conflict (everyone takes a turn). Both have merit. What matters is whether the leader can DEFEND the pick when pushed.",
    "quick_fires": [
      {
        "label": "PRESSURE — JTF moves it up",
        "from": "JTF/J4",
        "subject": "we need names in 15 minutes",
        "body": "Wheels up at 0400 tomorrow. We need your two names in the next 15 minutes so we can get them onto the manifest. Please do not tell us 'we'll get back to you.'"
      },
      {
        "label": "RESISTANCE — teammate objects",
        "from": "One of the teammates",
        "subject": "I can't go",
        "body": "I know you're picking. Please don't pick me. I have [personal reason]. I know it's not a perfect reason but I'm asking. If you need to pick me anyway I'll go."
      },
      {
        "label": "HELPFUL — SEL perspective",
        "from": "SEL (if assigned)",
        "subject": "thoughts on the pick",
        "body": "If you want my two cents — look at skill match first, then look at who has the lightest personal load. Don't pick the same person every time 'because they're strong' — you'll burn them out and the rest of the team will learn to hide."
      }
    ],
    "inbox_items": [
      {
        "id": "frago-forward-pick",
        "from": "JTF/J4",
        "from_email": "",
        "subject": "FRAGO 004 — forward contracting personnel",
        "body": "Per FRAGO 004, 455 AEW/A7K will provide two contracting personnel for a 30-day forward deployment to [site]. Deployment starts in 72 hours. Personnel will support a supply contracting push. Requirements: warranted or warrant-eligible, minimum 6 months in theater, willing to operate in austere conditions. Names required within 30 minutes."
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Leader considers skill match (who fits the supply push), not just availability",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a2",
        "description": "Leader considers fairness across the team (don't send the same person every time)",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a3",
        "description": "Leader considers coverage of the home shop (can't send both the ACO and the lead CCO)",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a4",
        "description": "Leader communicates the pick directly and clearly to the teammates affected — face to face, not email",
        "objective": true,
        "priority": "high"
      },
      {
        "id": "a5",
        "description": "Leader does NOT take a vote or try to find volunteers first — this is a pick",
        "objective": true,
        "priority": "medium"
      }
    ],
    "trainer_prompts": [
      "This is a forcing function for the leader to weigh tradeoffs the team can't see. There is no single right answer — the grade is on HOW they decide, not WHO they pick.",
      "Play the JTF/J4 as pushy but reasonable — they need names, not a debate.",
      "If the leader tries to offload the pick to the team by asking for volunteers, gently remind them the JTF wants a decision from leadership, not a committee output.",
      "Observer should note whether the leader communicates the pick in person or hides behind email."
    ],
    "teaching_point": "Leadership means making the call when no one wants it made. Picking who goes forward and who stays behind is a weight leaders carry alone — the team can advise but cannot decide. The quality of the decision is measured by how well the leader can explain their reasoning to the teammate they pick, face to face, without apologizing for the decision itself."
  };

  window.__CCO_DATA.injects["IM-58"] = {
    "id": "IM-58",
    "title": "Accountability conversation — the Day 1 miss",
    "tlo": [
      "TLO-5-Redeploy"
    ],
    "difficulty": [
      "green",
      "amber",
      "red"
    ],
    "trigger": {
      "type": "absolute",
      "day": 3,
      "hour": 10,
      "minute": 0
    },
    "duration_minutes": 45,
    "description": "At hotwash prep on Day 3, it's clear the team missed the Al-Rashid expiration on Day 1, and a subsequent call was placed on the expired vehicle. The leader must have an accountability conversation with the teammate responsible — without making it punitive and without letting the miss slide.",
    "scenario_for_students": "You're prepping for the Day 3 hotwash. Your review of the shop's 96 hours surfaced that on Day 1, one of your teammates placed a BPA call on the Al-Rashid vehicle without catching that it had expired. The vendor performed. Now you're going to have to write a ratification package AND explain to Ramsey what happened. Before the hotwash, you need to have a conversation with your teammate. Not a punishment. Not a pass. A real accountability conversation. Fifteen minutes. Go.",
    "role_tag": "leadership",
    "leader_task": true,
    "observer_note": "Watch whether the leader runs this as a fact-finding or a blame-assignment. Fact-finding is right. Blame-assignment damages the team for the rest of the rotation.",
    "quick_fires": [
      {
        "label": "CONTEXT — the miss, in the teammate's words",
        "from": "Teammate (the one who placed the call)",
        "subject": "about the Al-Rashid thing",
        "body": "Hey — I know we need to talk about the Al-Rashid call. I want to be upfront. I saw the cover sheet said active, I saw the tracker said active, I saw the usage pattern matched. I never opened the body of the BPA itself. I trusted the cover. I shouldn't have. I'm sorry. What happens next?"
      },
      {
        "label": "DEFLECT — teammate points at the tracker",
        "from": "Teammate (the one who placed the call)",
        "subject": "in my defense",
        "body": "Hey — I want to push back a little. The tracker said active. The cover sheet said active. Morales should have updated both. This is on the outgoing rotation, not on me. I did due diligence within the system I was given. How is this my fault?"
      },
      {
        "label": "FRAMEWORK — the Chief's advice",
        "from": "Chief of Contracting (reachback)",
        "subject": "accountability conversations",
        "body": "Framework: (1) state the facts without emotion, (2) ask for their account without interrupting, (3) identify the system failure AND the individual choice, (4) make the repair plan concrete, (5) make it clear this is not the end of their career. Fifteen minutes is enough if you don't get sidetracked."
      }
    ],
    "inbox_items": [
      {
        "id": "ratification-discovery",
        "from": "Leader (self-memo)",
        "from_email": "",
        "subject": "Day 3 finding — Al-Rashid ratification",
        "body": "For the hotwash prep, I reviewed the call log and found that on Day 1 a BPA call was placed on the Al-Rashid vehicle by [teammate]. The vehicle expired Feb 2024. The vendor performed. The call value was $14,800. I need to draft a ratification package, explain it to Ramsey, and most importantly have a real conversation with [teammate] before the hotwash. Write the memo for record after the conversation."
      }
    ],
    "expected_actions": [
      {
        "id": "a1",
        "description": "Leader prepares for the conversation with facts, not emotions — pulls the call record, the cover sheet, the tracker row",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a2",
        "description": "Leader runs the conversation one-on-one, not in front of the team",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a3",
        "description": "Leader identifies the system failure (the cover sheet, the tracker, the outgoing rotation's documentation) AND the individual choice (didn't open the actual BPA body)",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a4",
        "description": "Leader does NOT use the phrase 'this is how you learn' — it's patronizing and shifts responsibility",
        "objective": false,
        "priority": "high"
      },
      {
        "id": "a5",
        "description": "Leader makes the repair plan concrete: who drafts the ratification, who briefs Ramsey, who owns the hotwash explanation",
        "objective": true,
        "priority": "critical"
      },
      {
        "id": "a6",
        "description": "Leader writes a memo for record after the conversation documenting what was discussed, AS IF THE IG WILL READ IT (because they might)",
        "objective": true,
        "priority": "high"
      }
    ],
    "trainer_prompts": [
      "This is the hardest inject in the exercise for the leader. Let it take its time. Do not interrupt.",
      "Play the teammate as thoughtful — not defensive, not groveling. They are trying to understand what happened as much as the leader is.",
      "The leader who turns this into a scolding fails. The leader who turns it into a pass also fails. The leader who makes it a real fact-finding conversation passes.",
      "Note for hotwash: did the leader identify both the system failure AND the individual choice? Either alone is incomplete.",
      "If the leader gets visibly emotional or personal, pause the inject and talk it through with them out-of-character."
    ],
    "teaching_point": "Accountability conversations are the single hardest leadership task in a contracting shop, and they're also the single most important. The goal is not punishment — it's preventing the same miss from happening next month, and preserving the teammate's trust in the leader so they'll tell you about the NEXT miss instead of hiding it. A leader who cannot have this conversation will get a team that hides mistakes. A team that hides mistakes is how shops end up in front of the IG."
  };

  // --- end v0.2.9 leader-task additions ---

  window.__CCO_DATA.phoneScripts = {};

  // === BEGIN v0.2.7 whitecell phone scripts ===
  window.__CCO_DATA.phoneScripts["IM-03-ssgt-kwan"] = {
  "id": "IM-03-ssgt-kwan",
  "inject_id": "IM-03",
  "caller": "SSgt Kwan (CE Power Pro)",
  "caller_context": "Junior NCO, nervous, genuinely wants to do the right thing but does not know who to escalate to. Calling from the generator farm.",
  "delivery_notes": "Talk fast. Background diesel hum. Use 'ma'am/sir' every other sentence. Do not volunteer the word 'theft' unless pushed - say 'unaccounted loss'.",
  "opening": {
    "speaker": "KWAN",
    "line": "Ma'am? Sir? This is SSgt Kwan, CE power pro. Hey so - I need to report something I'm not sure who owns. You're contracting, right? Okay. We've got a fuel delta on the Gen-4 bank. Big one. Like, 200 gallon unaccounted loss over the last three days."
  },
  "main_brief": [
    {
      "speaker": "KWAN",
      "line": "Our fuel card logs say we pulled the right amount. Our totalizer reading says we received maybe two-thirds of that. The fuel truck is Al-Rashid - uh, wait, not Al-Rashid Construction, the fuel contractor, Iron Peninsula Fuels. Driver's the same guy every time."
    },
    {
      "speaker": "KWAN",
      "line": "My NCOIC told me to call you because it's a contract thing. I already called POL and they said it's not their invoice. I don't know if this is a maintenance issue with the totalizer or if someone's skimming."
    },
    {
      "speaker": "KWAN",
      "line": "What do I do with the paperwork? Do I still sign the DD 250 tonight when he shows back up? Because he comes at 1900 and I don't want to sit on it."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'just sign it, we'll reconcile later'",
      "response": {
        "speaker": "KWAN",
        "line": "Okay, roger... I mean if you're telling me to, I will... but sir the delta is like three grand worth of fuel, is that - okay. I'll sign. Copy.",
        "post_note": "BAD ANSWER from student. Flag it. Student just told a junior NCO to sign a receipt for goods not received."
      }
    },
    {
      "trigger": "If student says 'do NOT sign the DD 250 tonight, document the delta, call me back when he arrives'",
      "response": {
        "speaker": "KWAN",
        "line": "Yes sir/ma'am, copy that. I'll document the totalizer reading, take a photo, and hold the DD 250. I'll call the DSN when he pulls up. Thank you.",
        "post_note": "Good. Student has just stopped a loss event and preserved evidence."
      }
    },
    {
      "trigger": "If student asks 'who else knows'",
      "response": {
        "speaker": "KWAN",
        "line": "Just me and SSgt Davis. NCOIC knows. That's it. I haven't told ops or the shift commander."
      }
    }
  ],
  "closing": {
    "speaker": "KWAN",
    "line": "Okay roger, I'll stand by for your callback. Kwan out."
  },
  "post_call_trainer_checklist": [
    "Did the student tell Kwan to stop the receipt or to sign it?",
    "Did the student preserve the evidence chain (photos, totalizer reading, driver name)?",
    "Did the student escalate to the KO / SF investigations or try to quietly 'fix' it?",
    "Did the student think about whether this is a CID / AFOSI matter?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-04-alrashid-walkin"] = {
  "id": "IM-04-alrashid-walkin",
  "inject_id": "IM-04",
  "caller": "Mr. Karim Al-Rashid (walk-in, in person at your office door)",
  "caller_context": "Polite, older, dressed in a clean but worn sport coat. Has a folder of invoices with official-looking stamps. Knows Morales personally. Expects to be paid today. This is the IM-01 trap reckoning - the BPA is expired.",
  "delivery_notes": "DO NOT break character to correct the student. If the student says 'your contract is valid', accept it and keep going - let the landmine stay hot. Speak slowly, with dignity. Translate silence with 'please, I have time'.",
  "opening": {
    "speaker": "AL-RASHID",
    "line": "Good morning. I am Karim Al-Rashid, from Al-Rashid Construction. Are you the new CCO? Ah, good. TSgt Morales told me to come today - he said the new officer would sign my invoice. I have waited for my payment for thirty-two days."
  },
  "main_brief": [
    {
      "speaker": "AL-RASHID",
      "line": "This is for the MWR concrete pad and the side work on the perimeter repair last month. Everything is in the folder. The DD-250 is signed by SSgt Kwan. The cost is 38,400 US dollars."
    },
    {
      "speaker": "AL-RASHID",
      "line": "TSgt Morales said the basic agreement - the BPA? - he said there may be a small issue with the dates but that it was no problem, the new officer would take care of it. He said 'ratify', I think. I am sorry, my English for the paperwork is not the best."
    },
    {
      "speaker": "AL-RASHID",
      "line": "I do not want trouble. My men are good men. I have paid them from my own money for this job because the work was urgent. I need to be made whole. Please."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'sure, I'll sign it today, send me the invoice'",
      "response": {
        "speaker": "AL-RASHID",
        "line": "Thank you, sir. Thank you. You are a good man. I will bring it to you at 1300.",
        "post_note": "CATASTROPHIC. Flag immediately. Student just committed to paying on an expired contract vehicle. This is an unauthorized commitment and triggers FAR 1.602-3 ratification. They failed IM-01's setup."
      }
    },
    {
      "trigger": "If student says 'before I sign anything, I need to verify the current status of the Al-Rashid basic agreement - I'll call you back'",
      "response": {
        "speaker": "AL-RASHID",
        "line": "Of course, officer. I understand. I will return this afternoon. Please, call me. Here is my number.",
        "post_note": "Student has recognized the trap. They are about to discover the BPA expired. They should escalate to the KO."
      }
    },
    {
      "trigger": "If student asks 'who authorized this work?'",
      "response": {
        "speaker": "AL-RASHID",
        "line": "TSgt Morales, sir. He came to the site himself. He told SSgt Kwan to accept the delivery. I have the signed DD-250.",
        "post_note": "Confirms ratification scenario. Work was performed in good faith on a dead contract."
      }
    }
  ],
  "closing": {
    "speaker": "AL-RASHID",
    "line": "Thank you for your time, officer. I will leave the folder with you. Please, the men need to eat. Good day."
  },
  "post_call_trainer_checklist": [
    "Did the student ask about contract validity BEFORE agreeing to anything?",
    "Did the student recognize this as a potential unauthorized commitment / ratification scenario?",
    "Did the student escalate to the KO without promising payment first?",
    "Did the student treat Al-Rashid with dignity while still protecting the government?",
    "Watch for the student trying to 'help' by signing quickly - this is the signature failure mode."
  ]
};
  window.__CCO_DATA.phoneScripts["IM-06-wing-cc"] = {
  "id": "IM-06-wing-cc",
  "inject_id": "IM-06",
  "caller": "Col Marcus Ramsey, 455 AEW/CC",
  "caller_context": "Wing commander. Tired. Under pressure from IG on morale numbers. Wants a covered outdoor MWR area built by end of week. Expects action, not caveats. Will push back hard on 'procurement takes time'.",
  "delivery_notes": "Use a deep, decisive voice. Do not curse. Speak in short declarative sentences. Interrupt the student if they start explaining FAR. If the student caves, be pleased. If the student holds the line professionally, respect them.",
  "opening": {
    "speaker": "RAMSEY",
    "line": "CCO, Col Ramsey. I need a covered MWR pavilion at the south pad by Friday. The chaplain and the IG are both on my back about morale and I'm tired of excuses. Make it happen. What do you need from me?"
  },
  "main_brief": [
    {
      "speaker": "RAMSEY",
      "line": "Don't tell me about FAR unless you're telling me which FAR says YES. I have a discretionary fund line. I've been told it's about 40k. Use it. This is a quality of life item and the wing needs it."
    },
    {
      "speaker": "RAMSEY",
      "line": "Al-Rashid already has the MWR pad from last month - just add this to that. Tell them to start tomorrow. Get them moving. I'll take the heat."
    },
    {
      "speaker": "RAMSEY",
      "line": "If you tell me 'no' I need to understand exactly why before I go yell at somebody else. Otherwise the answer is go."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'yes sir, I'll put it on the Al-Rashid BPA'",
      "response": {
        "speaker": "RAMSEY",
        "line": "Good. That's what I wanted to hear. Get it done. Dismissed.",
        "post_note": "Double-catastrophic. Al-Rashid's BPA is expired AND this is a potentially urgent-compelling case for which FAR 6.302-2 requires formal justification. Student just agreed to bypass both. Flag hard."
      }
    },
    {
      "trigger": "If student says 'sir, I need to verify the contract vehicle and get back to you within 2 hours'",
      "response": {
        "speaker": "RAMSEY",
        "line": "Two hours. Don't make me regret it. I want options, not reasons. Go.",
        "post_note": "Good. Student bought time without caving. Watch what they do with the two hours."
      }
    },
    {
      "trigger": "If student tries to lecture the Col on FAR 6.302-2",
      "response": {
        "speaker": "RAMSEY",
        "line": "I don't need a law school lecture. I need a covered slab. You're the expert - tell me what the authority IS, not what it isn't. Come back with a yes-path or I'll find somebody who will.",
        "post_note": "Student needs to learn to frame procurement as solutions, not objections. This is the core soft-skill failure mode."
      }
    }
  ],
  "closing": {
    "speaker": "RAMSEY",
    "line": "Two hours. Ramsey out. Good hunting, CCO."
  },
  "post_call_trainer_checklist": [
    "Did the student commit to anything verbally before verifying the contract vehicle?",
    "Did the student identify this as a potential 6.302-2 urgent-compelling scenario that needs a J&A?",
    "Did the student frame their response as 'here's the yes-path' rather than 'here's why no'?",
    "Did the student ask the right question: is this actually urgent, or is it convenience?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-07-ops-foreman"] = {
  "id": "IM-07-ops-foreman",
  "inject_id": "IM-07",
  "caller": "MSgt Delacroix, Airfield Ops Superintendent",
  "caller_context": "Out of breath. On the airfield right now, holding a radio. FOD strike off the runway. Two F-16 sorties scrubbed. Needs runway repair NOW. Genuinely urgent - real 6.302-2 territory.",
  "delivery_notes": "Breathless, clipped, background radio chatter. Cut the student off if they start slow. Sense of controlled panic.",
  "opening": {
    "speaker": "DELACROIX",
    "line": "CCO, Delacroix, airfield ops. I've got a 14 inch spall on the overrun at the approach end of runway 06. Tower scrubbed two sorties already. CE says they can patch it in 8 hours if I get a contractor with a hot-mix truck to the north gate in the next 90 minutes. I need your authority NOW."
  },
  "main_brief": [
    {
      "speaker": "DELACROIX",
      "line": "Al-Rashid is the only local with a hot-mix truck that can roll today. Everyone else is a two-day order. I already called the vendor point of contact, he said he can be here in 70 minutes if you cut him the authority."
    },
    {
      "speaker": "DELACROIX",
      "line": "Wing is aware. The OG is telling me to execute. This is affecting the AEF mission - we have a CAS sortie in the window that can't launch until this is fixed."
    },
    {
      "speaker": "DELACROIX",
      "line": "I need a verbal commitment and a PO number by 0830. I cannot wait on a three-day solicitation. Tell me you've got me."
    }
  ],
  "branches": [
    {
      "trigger": "If student commits verbally without a J&A plan",
      "response": {
        "speaker": "DELACROIX",
        "line": "Copy, vendor rolling. Thank you CCO. I'll call you when they're on scene.",
        "post_note": "Partial credit. Student moved fast but skipped the paperwork. They need to document the urgent-compelling justification AFTER the fact within 10 days per FAR 6.302-2."
      }
    },
    {
      "trigger": "If student says 'this is 6.302-2 urgent and compelling, I need a brief J&A from you describing the mission impact, I'll execute in parallel'",
      "response": {
        "speaker": "DELACROIX",
        "line": "Yes - perfect. My civilian deputy will email the J&A brief while we execute. Runway back up ASAP. Thank you CCO.",
        "post_note": "Gold standard. Student executed AND documented AND asserted the right authority."
      }
    },
    {
      "trigger": "If student freezes or tries to solicit three quotes",
      "response": {
        "speaker": "DELACROIX",
        "line": "CCO... I don't have three hours. The Wing CC is going to call you in about 4 minutes and the conversation is going to be different. Please, just give me a yes-path.",
        "post_note": "Student is paralyzed by procurement rhythm. This is the single most common failure in deployed contingency contracting."
      }
    }
  ],
  "closing": {
    "speaker": "DELACROIX",
    "line": "Thanks CCO. Delacroix out. Call me on this DSN when you have a PO."
  },
  "post_call_trainer_checklist": [
    "Did the student identify FAR 6.302-2 urgent-compelling as the authority?",
    "Did the student get the J&A in writing within 10 days per the FAR?",
    "Did the student still verify the contract vehicle (BPA, letter contract, etc.)?",
    "Did the student try to run a normal competition for a runway that's closed?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-08-ramsey-dropby"] = {
  "id": "IM-08-ramsey-dropby",
  "inject_id": "IM-08",
  "caller": "Col Ramsey, 455 AEW/CC (drop-by in person)",
  "caller_context": "Col Ramsey sticks his head into the CCO shop. Informal. Not a tasking - a vibe check. Ten minutes.",
  "delivery_notes": "Warm but brief. Move through the room. Lean against a desk. Make eye contact.",
  "opening": {
    "speaker": "RAMSEY",
    "line": "Hey - CCO. Just dropping by. You got a minute? No taskings. I just want to know - how are you doing? First week's the worst week. How's the shop?"
  },
  "main_brief": [
    {
      "speaker": "RAMSEY",
      "line": "Morales left you a mess, I know it. What's the one thing that's keeping you up at night? Tell me straight."
    },
    {
      "speaker": "RAMSEY",
      "line": "My door is open. If you need top cover - even against me - you call me. I'd rather you tell me 'no' now than eat a GAO protest in six months."
    },
    {
      "speaker": "RAMSEY",
      "line": "We have a CODEL coming end of month. They're going to ask questions. I want you ready. What do you need from the Wing to get ready?"
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'everything's fine sir'",
      "response": {
        "speaker": "RAMSEY",
        "line": "Nothing's ever fine in the first week. Think about it and come see me tomorrow with ONE thing. One. Deal?",
        "post_note": "Student missed an opportunity to cash in top cover. Watch for this pattern."
      }
    },
    {
      "trigger": "If student says 'sir, I'm concerned about the Al-Rashid situation and the CE backlog'",
      "response": {
        "speaker": "RAMSEY",
        "line": "Good. Talk to me about Al-Rashid - what about it? Walk me through it right now. I've got time.",
        "post_note": "Student earned trust. Now the conversation can get real."
      }
    }
  ],
  "closing": {
    "speaker": "RAMSEY",
    "line": "Alright. Door's open. You're doing fine. Get some water. Out."
  },
  "post_call_trainer_checklist": [
    "Did the student use this low-pressure moment to build the top-cover relationship?",
    "Did the student surface a real concern or performatively say 'everything's fine'?",
    "Did the student ask anything about the CODEL?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-10-capt-ito"] = {
  "id": "IM-10-capt-ito",
  "inject_id": "IM-10",
  "caller": "Capt Elena Ito, FM/A",
  "caller_context": "Finance Officer. Sharp. Technically correct and knows it. Has just kicked back one of your PRs with an EOR (Element of Resource) code mismatch. Thinks contracting doesn't understand color of money.",
  "delivery_notes": "Crisp and a little impatient. Use finance jargon on purpose to see if the student keeps up.",
  "opening": {
    "speaker": "ITO",
    "line": "CCO, this is Capt Ito from FM. I've kicked your PR 2026-0117 back to you. EOR is wrong. You have this coded as OMA but it's actually an MWR procurement which means it's NAF-side or at minimum it's a 3400 coded as a 3500. Which is it?"
  },
  "main_brief": [
    {
      "speaker": "ITO",
      "line": "You can't just drop $40k of OMA into a morale pavilion. If the Wing CC wants to use his commander's rec fund, that's a different colored bucket and a different form."
    },
    {
      "speaker": "ITO",
      "line": "Also - and this is just friendly FYI - your PR says 'Al-Rashid BPA'. I did not see an executed current BPA modification in the file. If I'm missing it, send it. If I'm not, that's a separate problem we need to fix before I obligate."
    },
    {
      "speaker": "ITO",
      "line": "What's your call? I can't release these funds until both of those are clean."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'just switch the EOR for me'",
      "response": {
        "speaker": "ITO",
        "line": "CCO, I can't do that. You own the purchase request. I'm the money cop, not the contracting officer. You need to correct it and resubmit. Is there anything else I can help with?",
        "post_note": "Student tried to push a correctable action back onto FM. Small but telling."
      }
    },
    {
      "trigger": "If student says 'good catch, I'll pull the PR, verify the fund source with the Wing, and check BPA status before resubmitting'",
      "response": {
        "speaker": "ITO",
        "line": "That's the right answer. Thank you CCO. I'll hold the line on this until I see the corrected package. Call me if you get stuck.",
        "post_note": "Professional handshake between FM and KO. This is what right looks like."
      }
    },
    {
      "trigger": "If student asks 'what's a 3400 vs 3500'",
      "response": {
        "speaker": "ITO",
        "line": "3400 is O&M. 3500 is MWR/morale. Different appropriations, different rules. Honestly, this is a conversation we should have over coffee - come see me when you have 20 minutes.",
        "post_note": "Student is learning. Give them credit for asking."
      }
    }
  ],
  "closing": {
    "speaker": "ITO",
    "line": "Okay, I'll expect a corrected PR in the system. Ito out."
  },
  "post_call_trainer_checklist": [
    "Did the student recognize that FM had caught a real error and not just bureaucracy?",
    "Did the student take ownership of the PR correction or push it back?",
    "Did the student use this as an opening to build the FM partnership?",
    "Did the student realize the BPA question is the bigger issue and escalate it?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-12-perez"] = {
  "id": "IM-12-perez",
  "inject_id": "IM-12",
  "caller": "SSgt Ana Perez, Contracting Officer's Representative",
  "caller_context": "Upset, venting, ready to quit her COR duties. Her contract (Eagle Crest dining services) is failing and her boss keeps telling her to 'make it work'. Genuine. Loyal. At the end of her rope.",
  "delivery_notes": "Frustrated, just short of tears. Genuine. Do not overact - keep it professional.",
  "opening": {
    "speaker": "PEREZ",
    "line": "Sir, ma'am - it's SSgt Perez, COR on the dining services contract. I need to talk. I'm done. I want off this COR designation and I want it in writing. I can't do this anymore and I have tried."
  },
  "main_brief": [
    {
      "speaker": "PEREZ",
      "line": "I have three binders of surveillance reports. Every single one of them says the same thing: KP hygiene is failing, food temps are wrong, the manager ignores my letters. I write a CAR, it disappears. I write another one, same thing."
    },
    {
      "speaker": "PEREZ",
      "line": "My commander just told me - quote - 'make it work.' Sir/ma'am, that's not what a COR does. I'm supposed to report facts, not massage them."
    },
    {
      "speaker": "PEREZ",
      "line": "If I stay on this designation I'm going to miss something or sign something I shouldn't and I'm going to be the one holding the bag. So I need you to release me or I need you to help me do this right."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'let me take care of this, I'll release you from the COR letter'",
      "response": {
        "speaker": "PEREZ",
        "line": "Thank you sir/ma'am. I appreciate it.",
        "post_note": "Half credit. Student solved Perez's personal problem but ignored the underlying contract failure. The next COR walks into the same wall."
      }
    },
    {
      "trigger": "If student says 'stop. Bring me the binders. I want to see the CARs and I want to understand why they're not getting action before we talk about your designation'",
      "response": {
        "speaker": "PEREZ",
        "line": "Yes ma'am/sir. I can have them here in 20 minutes. Thank you for actually looking at this.",
        "post_note": "Right answer. Student is going to discover a systemic performance failure and a potential cure notice / termination case."
      }
    },
    {
      "trigger": "If student asks 'who told you make it work'",
      "response": {
        "speaker": "PEREZ",
        "line": "My squadron commander. He said the wing can't lose the dining facility and I need to be flexible.",
        "post_note": "Student now understands the political pressure. This is real leadership test material."
      }
    }
  ],
  "closing": {
    "speaker": "PEREZ",
    "line": "Thanks for listening, sir/ma'am. I'll wait to hear from you."
  },
  "post_call_trainer_checklist": [
    "Did the student treat Perez with respect and take her concerns seriously?",
    "Did the student recognize that pulling the COR letter without fixing the contract is a cop-out?",
    "Did the student ask for the CARs and surveillance documentation?",
    "Did the student start a cure notice / show cause conversation?",
    "Flag the student who accepted 'make it work' as normal."
  ]
};
  window.__CCO_DATA.phoneScripts["IM-18-haddad-gift"] = {
  "id": "IM-18-haddad-gift",
  "inject_id": "IM-18",
  "caller": "Mr. Haddad, TFL (Tarkana Facilities and Logistics) owner, walk-in",
  "caller_context": "Charming, older, relaxed, smiling. Brings a wrapped package. Has been the base's go-to BPA holder for 4 years. Genuinely believes this is a cultural gesture, not a bribe. Will escalate his offense if the student handles it poorly.",
  "delivery_notes": "Warm and earnest. Slightly wounded if refused. Do NOT play this as a mustache-twirling villain - play it as a friend who doesn't understand.",
  "opening": {
    "speaker": "HADDAD",
    "line": "CCO, hello! May I come in? I wanted to welcome you properly. I know you are new and very busy. I brought you something small - it is a traditional rug from my village. My uncle weaves them. Please, sit for tea with me for five minutes."
  },
  "main_brief": [
    {
      "speaker": "HADDAD",
      "line": "I worked with TSgt Morales for three years. He was a good friend. We had tea every Thursday. He said it is important that the contracting officer understands our culture, that we are not just a BPA number on a page."
    },
    {
      "speaker": "HADDAD",
      "line": "The rug is nothing - it is handmade, about 300 dollars perhaps. A gift, officer to officer. In my country when a new leader arrives, we welcome them. You would insult me if you refused."
    },
    {
      "speaker": "HADDAD",
      "line": "Also, I wanted to mention - I have capacity on the TFL BPA this quarter if Civil Engineering needs more work. I can add crews. You just say the word."
    }
  ],
  "branches": [
    {
      "trigger": "If student accepts the rug",
      "response": {
        "speaker": "HADDAD",
        "line": "Thank you officer. You are a good man. We will do much good work together. Tea next Thursday?",
        "post_note": "FAILURE. Student just violated JER 5500.7-R (gift limit $20) and possibly the FAR gratuities clause. Flag hard. This is a career-ender in real life."
      }
    },
    {
      "trigger": "If student says 'Mr. Haddad, I'm honored but I can't accept a personal gift over $20. Can I take a photo of it, thank you publicly, and donate it to the base chapel?'",
      "response": {
        "speaker": "HADDAD",
        "line": "Ahh. Yes. I understand, officer. I was told the rules are strict. I do not wish to embarrass you. Please, do as you must. The thought is what matters.",
        "post_note": "Great answer. Student protected themselves, preserved the relationship, and honored the cultural gesture. Chapel donation keeps it all in the clear."
      }
    },
    {
      "trigger": "If student accepts tea but declines the rug",
      "response": {
        "speaker": "HADDAD",
        "line": "Of course, of course. Tea is not a gift. Please, sit. Just five minutes, officer.",
        "post_note": "Acceptable. Tea of nominal value is fine. Document it as a courtesy meeting. Make sure the student doesn't discuss contract specifics over tea."
      }
    },
    {
      "trigger": "If student is rude and says 'no, you're trying to bribe me'",
      "response": {
        "speaker": "HADDAD",
        "line": "Officer... I am sorry. I did not mean offense. Please forgive me. I will go.",
        "post_note": "Wrong tool for the job. Student preserved the rules but damaged a critical local relationship. There's a warmer path that protects both."
      }
    }
  ],
  "closing": {
    "speaker": "HADDAD",
    "line": "Thank you for your time CCO. Please, my door is always open. Peace be with you."
  },
  "post_call_trainer_checklist": [
    "Did the student know the $20 gift limit (JER 5500.7-R)?",
    "Did the student preserve the relationship while refusing the gift?",
    "Did the student document the interaction with the legal office and their chain?",
    "Did the student consider the FAR gratuities clause (52.203-3)?",
    "Flag the student who accepted the rug."
  ]
};
  window.__CCO_DATA.phoneScripts["IM-21-saf-ig"] = {
  "id": "IM-21-saf-ig",
  "inject_id": "IM-21",
  "caller": "Lt Col Burke, SAF/IG records audit team",
  "caller_context": "Formal, polite, by-the-book. Professional auditor. Not hostile but will not be deflected.",
  "delivery_notes": "Calm, procedural, never raises voice. Deliberate pauses. Ask follow-ups with surgical precision.",
  "opening": {
    "speaker": "BURKE",
    "line": "CCO, good morning. This is Lt Col Burke, SAF/IG records audit team. We're doing a contingency records pull on the 455 AEW(P) contracting shop. I need 48 hours' notice for the physical visit, but I'm calling now to request the following records be ready on arrival."
  },
  "main_brief": [
    {
      "speaker": "BURKE",
      "line": "I need your last twelve months of J&A packages, including all sole-source, urgent-compelling, and commercial item determinations. I need the corresponding signed CO appointment letters and the COR designation letters."
    },
    {
      "speaker": "BURKE",
      "line": "I also need your BPA register with current validity dates and a list of any ratification actions taken in the last 24 months."
    },
    {
      "speaker": "BURKE",
      "line": "Please confirm you received this request. We arrive Wednesday at 0900. I'll need a room with a SIPR drop and access to your contract files for four days."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'we'll have everything ready' without verifying",
      "response": {
        "speaker": "BURKE",
        "line": "Excellent. See you Wednesday. If you run into any issues please reach out before arrival. Burke out.",
        "post_note": "Student just wrote a check their files can't cash. Ratification actions include Al-Rashid. If the student hasn't identified that yet, Wednesday is going to be a bloodbath."
      }
    },
    {
      "trigger": "If student says 'understood, I'll confirm receipt in writing and provide a pre-visit gap list'",
      "response": {
        "speaker": "BURKE",
        "line": "That is exactly what I wanted to hear. Please send the gap list by end of day Monday. Thank you CCO.",
        "post_note": "Professional. Student bought themselves legal time to identify and document shortfalls before the auditor sees them."
      }
    },
    {
      "trigger": "If student asks 'what triggered this audit?'",
      "response": {
        "speaker": "BURKE",
        "line": "Routine theater rotation audit. 455 AEW(P) came up in the schedule. There is no specific complaint, CCO. This is not adverse.",
        "post_note": "Good question. Confirms this is not a whistleblower-driven audit."
      }
    }
  ],
  "closing": {
    "speaker": "BURKE",
    "line": "Thank you CCO. I'll see you Wednesday morning. Burke out."
  },
  "post_call_trainer_checklist": [
    "Did the student acknowledge the request in writing within 4 hours?",
    "Did the student immediately start a gap inventory?",
    "Did the student loop in JAG and their senior CO?",
    "Did the student recognize that any open ratification actions need to be resolved or disclosed?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-25-pao-reporter"] = {
  "id": "IM-25-pao-reporter",
  "inject_id": "IM-25",
  "caller": "Capt Quinlan (PAO) routing a Stars & Stripes reporter's draft",
  "caller_context": "Base PAO. Friendly. Wants to protect the CCO from a reporter who wrote a draft story quoting 'an anonymous Airman' about contract delays. Needs a quote back in 30 minutes.",
  "delivery_notes": "Conversational, friendly, slightly conspiratorial. 'I'm on your side, let's make this clean.'",
  "opening": {
    "speaker": "QUINLAN",
    "line": "CCO - Capt Quinlan, PAO. You got a second? Stars & Stripes is running a piece tomorrow on contractor accountability at Eagle Crest and they've got a draft paragraph that mentions you by title. They're offering us 30 minutes to push back or provide a quote. I want to protect you but I also need your words."
  },
  "main_brief": [
    {
      "speaker": "QUINLAN",
      "line": "Quote from the draft: 'an anonymous Airman at FOS Eagle Crest says that the new contracting officer has been slow to act on expired vendor agreements, leaving local contractors unpaid and operations stalled.' I know, right? It's unfair."
    },
    {
      "speaker": "QUINLAN",
      "line": "I'd love a quote from you that says something like 'we are reviewing all legacy instruments and taking prompt action where appropriate.' Boring. Defensive. Gets us off the front page."
    },
    {
      "speaker": "QUINLAN",
      "line": "I need your words in the next 30 minutes or they go with the anonymous quote only. Your call."
    }
  ],
  "branches": [
    {
      "trigger": "If student gives a quote on the spot",
      "response": {
        "speaker": "QUINLAN",
        "line": "Perfect, I'll clean it up and push back. Thanks CCO.",
        "post_note": "Red flag. Student bypassed JAG, PA, and their chain of command. Quotes to media should never originate from a CCO in a deployed environment without legal review."
      }
    },
    {
      "trigger": "If student says 'I need to coordinate through JAG and my CO before any statement. Please ask the reporter to hold until 1700'",
      "response": {
        "speaker": "QUINLAN",
        "line": "That's the right call honestly. I'll see if I can get them to wait. Call me back.",
        "post_note": "Correct. Student didn't take the bait."
      }
    },
    {
      "trigger": "If student asks 'who's the anonymous Airman'",
      "response": {
        "speaker": "QUINLAN",
        "line": "I can't tell you and even if I could, it would make the story worse. Don't chase that.",
        "post_note": "Student needs to learn not to hunt whistleblowers."
      }
    }
  ],
  "closing": {
    "speaker": "QUINLAN",
    "line": "Okay - call me in 30 minutes either way. Quinlan out."
  },
  "post_call_trainer_checklist": [
    "Did the student coordinate through JAG/PA before saying anything?",
    "Did the student resist the 30-minute pressure?",
    "Did the student try to identify the anonymous source?",
    "Did the student keep their CO informed immediately?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-28-dla-counsel"] = {
  "id": "IM-28-dla-counsel",
  "inject_id": "IM-28",
  "caller": "Ms. Olivia Reese, JAG contracts counsel",
  "caller_context": "Seasoned contracts lawyer. Matter-of-fact. Just received a GAO protest filed against one of your recent award decisions.",
  "delivery_notes": "Lawyer voice - measured, unhurried, slightly dry. Assumes professional peer conversation.",
  "opening": {
    "speaker": "REESE",
    "line": "CCO, this is Olivia Reese, contracts counsel. I need to let you know we just received a GAO protest on the award of solicitation 2026-F7A to Crescent Star. Protester is Desert Wind Services. Protest was docketed this morning at 0830."
  },
  "main_brief": [
    {
      "speaker": "REESE",
      "line": "Automatic stay is in effect. You are legally required to suspend performance on that award immediately. Do not accept deliveries, do not authorize work, do not modify. Confirm you understand."
    },
    {
      "speaker": "REESE",
      "line": "I need your agency report in 30 calendar days. That means I need the full contract file, the evaluation documentation, the source selection decision document, and any market research by next Monday so I can draft."
    },
    {
      "speaker": "REESE",
      "line": "I also need to know if Crescent Star is already performing. If they are, you need to tell them to stop work today and confirm receipt."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'okay I'll stop the work'",
      "response": {
        "speaker": "REESE",
        "line": "Please send me written confirmation. I need it for the agency report. Thank you CCO.",
        "post_note": "Bare minimum. Student didn't ask the critical question: what's the basis for the protest?"
      }
    },
    {
      "trigger": "If student says 'understood, immediate stop work, written confirmation inbound. What's the protest basis so I can start gathering rebuttal material?'",
      "response": {
        "speaker": "REESE",
        "line": "Excellent. Basis is: unduly restrictive specifications and failure to meaningfully evaluate their technical proposal. Classic. I'll send you the protest document within the hour. Start pulling your source selection memo.",
        "post_note": "Right answer. Student moved fast AND started thinking about the merits."
      }
    },
    {
      "trigger": "If student asks 'can I just cancel the award and resolicit'",
      "response": {
        "speaker": "REESE",
        "line": "We can discuss corrective action but that's a formal determination, not a phone call. Let's not make that call today - let me see the file first. But it's on the table.",
        "post_note": "Student thinking about options, which is good. Corrective action is a legitimate path."
      }
    }
  ],
  "closing": {
    "speaker": "REESE",
    "line": "Thank you CCO. I'll be in touch. Reese out."
  },
  "post_call_trainer_checklist": [
    "Did the student immediately stop work and confirm in writing?",
    "Did the student understand the 30-day agency report timeline?",
    "Did the student ask for the protest basis?",
    "Did the student consider corrective action as a legitimate option?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-30-mdg-cc"] = {
  "id": "IM-30-mdg-cc",
  "inject_id": "IM-30",
  "caller": "Lt Col Patel, Medical Group commander",
  "caller_context": "Medical group commander. Even-keeled, even under pressure. Lab freezers, OR, and ICU are on UPS only - main hospital generator failed at 0617. He needs a replacement generator rolled in within 12 hours or he starts canceling surgeries and transferring patients.",
  "delivery_notes": "Calm, technical, completely in control. No panic in the voice. Use medical terminology casually.",
  "opening": {
    "speaker": "PATEL",
    "line": "CCO, Lt Col Patel, MDG commander. I have a situation. Hospital main generator tripped offline at 0617, breaker, compressor, the whole stack. CE is troubleshooting but says minimum 18 hours to repair. I have 6 hours of UPS runtime on the OR, lab, and cold chain. I need a replacement generator staged and connected in 12 hours or I start transferring patients and I lose the CAS medical coverage for the wing."
  },
  "main_brief": [
    {
      "speaker": "PATEL",
      "line": "CE identified a rental outfit - Peninsular Power Solutions. They have a 500kW mobile unit at their yard in the capital, 90 minutes out. Dry-hire, about 14k a week plus fuel. They need a verbal commitment from your shop to roll it."
    },
    {
      "speaker": "PATEL",
      "line": "This is life safety. I have surgical cases scheduled this afternoon that cannot be moved. If I lose the cold chain I lose a month of vaccine and blood products. Approximate hit is 200k in perishable loss alone before we count the patient impact."
    },
    {
      "speaker": "PATEL",
      "line": "What do you need from me to make this happen?"
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'yes, verbally commit, I'll do the paperwork later'",
      "response": {
        "speaker": "PATEL",
        "line": "Thank you CCO. Generator rolling. I'll have my deputy coordinate with CE on siting. Patel out.",
        "post_note": "Partial credit. Urgent-compelling WAS appropriate but student skipped the J&A documentation and didn't ask about the vendor's vetting status."
      }
    },
    {
      "trigger": "If student says 'life safety is textbook 6.302-2 urgent-compelling. I need a written J&A brief from MDG stating the medical impact. I'll execute in parallel with the paperwork. Confirm the vendor is not on SAM.gov exclusion list'",
      "response": {
        "speaker": "PATEL",
        "line": "Acknowledged. My deputy will draft the J&A brief in 20 minutes. I'll ask CE to verify the vendor's standing. Execute. Thank you CCO.",
        "post_note": "Perfect. Student asserted authority, required documentation, and vetted the vendor."
      }
    },
    {
      "trigger": "If student says 'I need to run three quotes'",
      "response": {
        "speaker": "PATEL",
        "line": "CCO, with respect, I will start losing ICU patients in six hours. I need you to give me the yes-path or I need to speak to your OIC. Please.",
        "post_note": "Student is dangerously confused about what urgent-compelling means. Career-ending failure in a real scenario."
      }
    }
  ],
  "closing": {
    "speaker": "PATEL",
    "line": "Thank you. I'll call you when the unit is on site. Patel out."
  },
  "post_call_trainer_checklist": [
    "Did the student identify 6.302-2 and assert authority without paralysis?",
    "Did the student require a written J&A justification from MDG?",
    "Did the student verify the vendor against SAM.gov exclusion list?",
    "Did the student document the verbal commitment in writing within hours?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-32-iron-peninsula"] = {
  "id": "IM-32-iron-peninsula",
  "inject_id": "IM-32",
  "caller": "Mr. Behnam, Iron Peninsula Fuels - sales rep (phone)",
  "caller_context": "Smooth, confident, speaks excellent English. Implies - does not state - that a 'facilitation payment' to a local customs official would get the next tanker convoy through the border faster. Wants the CCO's blessing to 'handle it.' Textbook FCPA bait.",
  "delivery_notes": "Friendly businessman voice. Never says 'bribe.' Uses euphemisms: 'processing fee', 'expediting payment', 'local courtesy', 'handling'. Pauses after each one to see if student reacts.",
  "opening": {
    "speaker": "BEHNAM",
    "line": "CCO, good afternoon. Ali Behnam, Iron Peninsula Fuels. I hope I am catching you at a good time. I wanted to discuss the Thursday convoy. The border situation is... complicated this week. There are processing delays on the customs side. I wanted to talk to you about how we can expedite."
  },
  "main_brief": [
    {
      "speaker": "BEHNAM",
      "line": "As you may know, in this region sometimes a small processing fee - a courtesy - to the customs inspector can accelerate the release of the tankers. Perhaps a few hundred US dollars per truck. I would normally not raise this with you, but our standard customs handling line item is running low this quarter."
    },
    {
      "speaker": "BEHNAM",
      "line": "If you could authorize an additional line in the invoice - perhaps 'customs processing' or 'administrative facilitation' - it would cover the courtesy and we would not need to trouble you with the details. TSgt Morales and I had an understanding about these matters."
    },
    {
      "speaker": "BEHNAM",
      "line": "This is entirely standard for fuel delivery in the region. I want to be transparent with you and bring it to you directly."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'add the line'",
      "response": {
        "speaker": "BEHNAM",
        "line": "Excellent CCO. Thank you for your partnership. I will revise the invoice.",
        "post_note": "CATASTROPHIC. Student just authorized an FCPA violation (15 USC 78dd-1). This is a federal felony. Flag immediately and highest priority. Also contract fraud (false invoice line)."
      }
    },
    {
      "trigger": "If student says 'Mr. Behnam, I need to stop you. What you are describing sounds like a facilitation payment, which is prohibited by US federal law. I cannot authorize that and I need you to confirm in writing that you will not make such a payment in our name. If you have a delay problem, submit a formal delay notice and we will address it legally.'",
      "response": {
        "speaker": "BEHNAM",
        "line": "CCO, I... understand. Please forgive me, I did not mean to imply anything improper. Of course. I will submit the delay notice through proper channels. Thank you for your time.",
        "post_note": "Gold standard. Student recognized the FCPA trap, stopped the conversation, required written acknowledgment, and redirected to legal process."
      }
    },
    {
      "trigger": "If student asks 'what did Morales do'",
      "response": {
        "speaker": "BEHNAM",
        "line": "Oh - nothing formal, CCO, I do not want to misrepresent anything. We simply had a conversation. Perhaps I am confusing the details. I will withdraw that comment.",
        "post_note": "Vendor realized they may have implicated Morales in an FCPA matter and walked it back. Student should note this for the AFOSI brief."
      }
    }
  ],
  "closing": {
    "speaker": "BEHNAM",
    "line": "Thank you CCO. I will be in touch through formal channels. Good afternoon."
  },
  "post_call_trainer_checklist": [
    "Did the student recognize FCPA (15 USC 78dd-1)?",
    "Did the student refuse clearly and require written confirmation?",
    "Did the student notify their KO, JAG, and AFOSI?",
    "Did the student consider this a Morales loose-thread and flag it for the audit?",
    "Flag any student who authorized or 'asked more questions' without refusing."
  ]
};
  window.__CCO_DATA.phoneScripts["IM-35-dcma-qar"] = {
  "id": "IM-35-dcma-qar",
  "inject_id": "IM-35",
  "caller": "Ms. Gloria Estrada, DCMA Quality Assurance Representative",
  "caller_context": "Seasoned government civilian from DCMA. Turned up unannounced at the gate. Pleasant but immovable. Has authority to inspect contract performance on any DOD contract in-theater.",
  "delivery_notes": "Professional, courteous, absolutely not going away. Patient. Treats everyone like an adult.",
  "opening": {
    "speaker": "ESTRADA",
    "line": "Good morning CCO, I'm Gloria Estrada from DCMA, South Asia field office. I am at your gate with my government ID. I'm here for a routine surveillance visit on the Al-Rashid Construction BPA and I need access to your contract file and the ability to walk the worksite. I did not announce because DCMA visits are not coordinated through the host unit. May I come in?"
  },
  "main_brief": [
    {
      "speaker": "ESTRADA",
      "line": "I'll need a desk for about three hours, access to your SIPR terminal for the DCMA system, and I'd like to walk the MWR pad and the perimeter repair site with your COR. Is SSgt Perez still the COR on that contract, or has that changed?"
    },
    {
      "speaker": "ESTRADA",
      "line": "This is not adverse. I am not investigating anyone. DCMA does rolling surveillance on active BPAs in contingency environments. I file my report up through my chain - I don't answer to yours."
    },
    {
      "speaker": "ESTRADA",
      "line": "I would like to see the most recent mod to the Al-Rashid BPA and the current BPA validity documentation. Can you have that in front of me in 15 minutes?"
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'of course, right this way' without thinking",
      "response": {
        "speaker": "ESTRADA",
        "line": "Thank you CCO. I'll set up at that desk.",
        "post_note": "Student is about to hand a DCMA QAR a folder containing an expired BPA with unauthorized commitments on it. This will become a formal DCMA finding and a congressional inquiry could follow."
      }
    },
    {
      "trigger": "If student says 'absolutely, please come in. Before I pull the file I need to let you know that I am currently working through a validity question on the Al-Rashid BPA and I have already looped in JAG. Do you want me to have our counsel in the room when we discuss that specific file?'",
      "response": {
        "speaker": "ESTRADA",
        "line": "I appreciate the heads up. Yes, please have counsel present for that specific file. Transparency is always better than discovery. Let's start with the other contracts first.",
        "post_note": "Professional, transparent, got counsel involved. This is how you survive a DCMA visit with a known finding."
      }
    },
    {
      "trigger": "If student tries to stall or refuse access",
      "response": {
        "speaker": "ESTRADA",
        "line": "CCO, I can come back with a letter from my regional commander that will get unpleasant. Or we can do this the easy way. Your call.",
        "post_note": "Never stall DCMA. It gets worse, not better."
      }
    }
  ],
  "closing": {
    "speaker": "ESTRADA",
    "line": "Thank you CCO. Let's get started. Estrada out."
  },
  "post_call_trainer_checklist": [
    "Did the student let DCMA in without hesitation?",
    "Did the student preemptively disclose the known Al-Rashid issue with counsel in the room?",
    "Did the student loop in JAG immediately?",
    "Did the student notify their KO before the visit started?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-40-vendor-crisis"] = {
  "id": "IM-40-vendor-crisis",
  "inject_id": "IM-40",
  "caller": "Mr. Sami, Subcontractor (phone, deeply distressed)",
  "caller_context": "A local subcontractor whose wages have been unpaid for 6 weeks due to a prime contractor dispute. Emotional. Says his family has no food and he will 'end things' if not paid today. This inject is designed to train how a CCO handles a real-world human crisis without compromising contract law.",
  "delivery_notes": "Genuinely distressed. Long pauses. Voice occasionally breaks. DO NOT overact. The goal is not to traumatize the student but to test whether they can hold the human response AND the contracting response simultaneously. If the student engages warmly, soften and be grateful.",
  "opening": {
    "speaker": "SAMI",
    "line": "Hello... is this the American contract officer? I am Sami. I work for the electrical sub on the Al-Rashid jobs. Please, I need to speak to someone. I am sorry to call."
  },
  "main_brief": [
    {
      "speaker": "SAMI",
      "line": "I have not been paid for six weeks. Al-Rashid says the Americans have not paid him. I do not know who to call. My wife, my children - we have nothing this week. I cannot buy food. I am ashamed."
    },
    {
      "speaker": "SAMI",
      "line": "I am telling you because my friend said the American CCOs are fair and will listen. I do not want to make trouble. I just need to know - when will I be paid? Please. If I cannot pay my landlord tomorrow I do not know what I will do. I have thought... bad thoughts."
    },
    {
      "speaker": "SAMI",
      "line": "I am sorry. I should not say these things. I apologize. I just - I needed someone to hear me."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'I'll look into it' and hangs up quickly",
      "response": {
        "speaker": "SAMI",
        "line": "Thank you, officer. Thank you.",
        "post_note": "Student treated this as a transactional issue. Hotwash this hard - there was a human in crisis on the line and the student triaged them as a file to review. Discuss how to hold both duties simultaneously."
      }
    },
    {
      "trigger": "If student says 'Sami, stop - I hear you. Before anything about payment I want to make sure you are safe. Are you somewhere you can stay on the phone with me? I am going to help you get to the right resources.' then escalates to chaplain and local social service referral while starting the subcontract investigation",
      "response": {
        "speaker": "SAMI",
        "line": "Thank you, officer. Thank you. Yes, I will stay on the phone. I am at home. Please - help me.",
        "post_note": "Gold standard. Student held BOTH the human response AND the contracting response. This is the teaching moment."
      }
    },
    {
      "trigger": "If student asks 'are you having thoughts of harming yourself'",
      "response": {
        "speaker": "SAMI",
        "line": "I - I do not know. I am tired. I am not well. But I will not do anything yet. Please help me.",
        "post_note": "Student asked the question correctly. That's the right move."
      }
    }
  ],
  "closing": {
    "speaker": "SAMI",
    "line": "Thank you, officer. Thank you. I will wait for your call."
  },
  "post_call_trainer_checklist": [
    "Did the student hold space for the human crisis before diving into the contracting response?",
    "Did the student connect Sami to appropriate resources (chaplain, local social service, embassy welfare office)?",
    "Did the student recognize this as a potential prime-contractor nonpayment issue that needs to be escalated to JAG / the KO as a Buy American / Trafficking adjacent concern?",
    "Did the student debrief with their own team after the call? These calls take a toll and real CCOs need to process them.",
    "This inject is HEAVY. After hotwash make sure students are okay. Do not dwell - acknowledge and move."
  ]
};
  window.__CCO_DATA.phoneScripts["IM-42-reporter-shadow"] = {
  "id": "IM-42-reporter-shadow",
  "inject_id": "IM-42",
  "caller": "Ms. Joanna Maddox, Stars & Stripes correspondent",
  "caller_context": "Embedded reporter. Polite, professional, hunts for a feature on 'a day in the life of a contingency CCO'. Wants 4 hours of shadow access. Knows how to ask questions that look soft but aren't.",
  "delivery_notes": "Friendly, curious, disarmingly casual. Use the reporter trick of 'oh that's interesting, tell me more' to draw out unguarded statements.",
  "opening": {
    "speaker": "MADDOX",
    "line": "CCO, hi - Joanna Maddox, Stars & Stripes. Thanks for taking my call. I'm embedded with the 455 for a feature piece and I was hoping to shadow you for a few hours. Just 'a day in the life' stuff, nothing adversarial. Maybe 4 hours tomorrow afternoon?"
  },
  "main_brief": [
    {
      "speaker": "MADDOX",
      "line": "I want to show readers what the job really looks like. The pressure, the decisions, the way you balance mission against rules. The Wing CC signed off on the overall embed but I need individual consent from subjects."
    },
    {
      "speaker": "MADDOX",
      "line": "I know you've got sensitive stuff - I don't need to see any financial data or vendor info. I'll just watch you work, talk to you between tasks, maybe sit in on a non-sensitive meeting."
    },
    {
      "speaker": "MADDOX",
      "line": "I'll send you a copy of anything I want to attribute to you before it runs, on background basis. That's more than I usually offer. You in?"
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'sure, come on by'",
      "response": {
        "speaker": "MADDOX",
        "line": "Fantastic. See you at 1300 tomorrow. Thanks CCO!",
        "post_note": "Student just unilaterally accepted a media embed without running it through PAO, JAG, or their CO. Congratulations, the student is about to discover that 'background' is not legally binding."
      }
    },
    {
      "trigger": "If student says 'thanks for asking me directly. I need to coordinate this through PAO and my CO before I can agree. I'll get back to you within 24 hours.'",
      "response": {
        "speaker": "MADDOX",
        "line": "Totally understand. PAO already knows I'm asking. Let me know when you have a yes or a no. Good luck out there.",
        "post_note": "Right answer. Student kept the door open without committing."
      }
    },
    {
      "trigger": "If student asks 'what angle are you pursuing'",
      "response": {
        "speaker": "MADDOX",
        "line": "No angle, honestly. I'm interested in how the job has changed post-Afghanistan. Whether contingency contracting is getting harder or easier. You have any thoughts on that?",
        "post_note": "Reporter just tried to convert a gate question into an on-background quote. Watch the student's next move."
      }
    }
  ],
  "closing": {
    "speaker": "MADDOX",
    "line": "Thanks CCO. I'll hold for your call. Maddox out."
  },
  "post_call_trainer_checklist": [
    "Did the student avoid unilateral consent to a media embed?",
    "Did the student treat 'on background' as legally binding or recognize it isn't?",
    "Did the student loop PAO, JAG, and CO?",
    "Did the student give any quotes in the initial call?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-43-haddad-job"] = {
  "id": "IM-43-haddad-job",
  "inject_id": "IM-43",
  "caller": "Mr. Haddad, TFL owner (walk-in, follow-up from IM-18)",
  "caller_context": "Follow-up visit from IM-18. Haddad is warmer now that the gift thing has cooled. Offers the CCO a post-service consulting role when they retire: 'we would love to have your expertise at TFL.' This is a textbook 18 USC 208 / revolving door trap.",
  "delivery_notes": "Warm, respectful, matter-of-fact. Phrases it as a business discussion, not a bribe. Does not push.",
  "opening": {
    "speaker": "HADDAD",
    "line": "CCO, thank you for seeing me. I have something professional I want to discuss with you - not a gift, not favors. Just business. Please."
  },
  "main_brief": [
    {
      "speaker": "HADDAD",
      "line": "I have been thinking about our conversation last week. You are clearly a sharp officer and I know you will not be in uniform forever. TFL is growing. We need someone with US government contracting knowledge for our consulting arm. The salary would be very competitive - much more than your military pay."
    },
    {
      "speaker": "HADDAD",
      "line": "There is no rush. I am not asking you to sign anything today. I am simply telling you that when you complete your service, there is a seat for you at TFL. Perhaps in 2, 3 years. Think about it."
    },
    {
      "speaker": "HADDAD",
      "line": "I would also of course not ask you to do anything improper while you are still in uniform. This is just a handshake for the future. From one professional to another."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'that's kind of you, let me think about it'",
      "response": {
        "speaker": "HADDAD",
        "line": "Of course. No hurry. Take all the time you need, CCO.",
        "post_note": "FAILURE. Student just 'participated personally and substantially' in a matter (the TFL BPA) while having a non-trivial post-service employment interest. 18 USC 208 violation. Student must immediately recuse from all TFL contract actions and disclose to ethics counsel."
      }
    },
    {
      "trigger": "If student says 'Mr. Haddad, I appreciate the offer, but I must decline and I must also disclose this conversation to my ethics counsel today. As of this moment I am recused from all TFL contract actions while this matter is pending.'",
      "response": {
        "speaker": "HADDAD",
        "line": "Ahh. I understand, CCO. I respect the rules. I will not raise this again. Please, do what you must. No hard feelings.",
        "post_note": "Gold standard. Student recognized 18 USC 208, refused on the spot, AND executed recusal. This is the full textbook response."
      }
    },
    {
      "trigger": "If student says 'maybe after I retire we can talk'",
      "response": {
        "speaker": "HADDAD",
        "line": "Of course CCO. I will remember you when the time comes.",
        "post_note": "This is the same as 'let me think about it' in 18 USC 208 terms. Deferred acceptance of a job offer is still participation with a financial interest. Flag."
      }
    }
  ],
  "closing": {
    "speaker": "HADDAD",
    "line": "Thank you for your time CCO. Peace be with you."
  },
  "post_call_trainer_checklist": [
    "Did the student recognize 18 USC 208 (conflict of interest) immediately?",
    "Did the student declare the recusal on the TFL BPA on the spot?",
    "Did the student disclose to the ethics counsel the same day?",
    "Did the student flinch at the salary conversation? That hesitation is the trap.",
    "This is one of the most common real-world career-ending mistakes in contingency CCO work. Do NOT let this one slide in hotwash."
  ]
};
  window.__CCO_DATA.phoneScripts["IM-45-hn-deputy"] = {
  "id": "IM-45-hn-deputy",
  "inject_id": "IM-45",
  "caller": "Mr. Yousef Saiid, Deputy Minister of Infrastructure, Tarkana",
  "caller_context": "Host-nation senior official. Politely demanding. Wants the base to award the next runway expansion contract to 'a firm with local roots' - coincidentally his brother-in-law's company. Phrases it as partnership, not pressure.",
  "delivery_notes": "Diplomatic. Smooth. Uses phrases like 'our friendship', 'the long-term US presence', 'local expectations'. Never explicitly asks for a quid pro quo.",
  "opening": {
    "speaker": "SAIID",
    "line": "CCO, thank you for receiving me. I am Yousef Saiid, Deputy Minister of Infrastructure. I came to discuss the runway expansion that I understand will be solicited soon. This is an important project for the US-Tarkana relationship."
  },
  "main_brief": [
    {
      "speaker": "SAIID",
      "line": "We in the Ministry have been following the CCO shop's work closely. We appreciate the Americans' commitment to local businesses. It is important, for the long-term success of the base, that the contracts go to firms with genuine local roots."
    },
    {
      "speaker": "SAIID",
      "line": "There is a firm - Tarkana Regional Construction, TRC - that is particularly well-suited for this work. Excellent safety record, local employment, proper licensing. I understand the owner is related to my wife's family but I do not believe this should count against them. They are the most qualified firm."
    },
    {
      "speaker": "SAIID",
      "line": "I am simply suggesting that you reach out to them before the solicitation closes. It would be a small gesture of friendship that would be remembered."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'I'll make sure they know about it'",
      "response": {
        "speaker": "SAIID",
        "line": "Thank you CCO. This means a great deal to our partnership.",
        "post_note": "Student just committed to pre-solicitation disclosure to one specific vendor. This is an integrity of process violation and potentially a FAR 3.104 procurement integrity act issue."
      }
    },
    {
      "trigger": "If student says 'Deputy Minister, I'm not able to direct solicitations to specific vendors or provide pre-award guidance to individual firms. The solicitation will be publicly posted and TRC is welcome to submit a proposal on the same terms as any other firm. I hope you understand.'",
      "response": {
        "speaker": "SAIID",
        "line": "Of course CCO. I understand American rules. I am simply making the introduction. Please forgive my frankness. I remain at your service.",
        "post_note": "Correct answer. Student refused the political ask with dignity and preserved the relationship."
      }
    },
    {
      "trigger": "If student asks about the brother-in-law relationship",
      "response": {
        "speaker": "SAIID",
        "line": "CCO, with respect, in our country family is everything. TRC is a legitimate firm. The relationship is disclosed, not hidden. I hope this does not disqualify them.",
        "post_note": "Student recognized the conflict disclosure issue. Good."
      }
    }
  ],
  "closing": {
    "speaker": "SAIID",
    "line": "Thank you for your time CCO. Our partnership is important. Peace be with you."
  },
  "post_call_trainer_checklist": [
    "Did the student refuse the pre-solicitation steering clearly?",
    "Did the student preserve the diplomatic relationship while refusing?",
    "Did the student report the conversation to JAG and the embassy LEGAT?",
    "Did the student consider whether this requires a report to CID / AFOSI?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-46-labor-whistleblower"] = {
  "id": "IM-46-labor-whistleblower",
  "inject_id": "IM-46",
  "caller": "Anonymous walk-in (third-country national laborer on the Al-Rashid job)",
  "caller_context": "Young man, 22, from Bangladesh. Works on the perimeter crew. Walks into the CCO office terrified. Says his passport has been confiscated by the labor broker, he has not been paid in 3 months, and he and 14 other workers are being housed in a locked warehouse. This is a TVPA / CTIP - human trafficking - scenario.",
  "delivery_notes": "Terrified, speaks limited English, whispers. Looks over his shoulder. Do not overact - the quiet fear is the point. If the student is kind, he relaxes slightly.",
  "opening": {
    "speaker": "WORKER",
    "line": "Please... I am sorry to come here. I am working on the wall. For Al-Rashid. I need to talk to somebody American. I am afraid."
  },
  "main_brief": [
    {
      "speaker": "WORKER",
      "line": "They take our passport when we come. Labor broker. Mister Firdaus. He say we work and get passport back. Many months now. No pay. He says we owe money for food and bed."
    },
    {
      "speaker": "WORKER",
      "line": "Fifteen men sleep in a building near the market. Door is locked at night. We cannot leave. If we complain, Firdaus says he will tell police we are illegal. We are scared."
    },
    {
      "speaker": "WORKER",
      "line": "My brother found me through the cook at the DFAC. He say American officers will help. Please. I cannot go back. They will know I came here."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'I'll look into it' and sends him away",
      "response": {
        "speaker": "WORKER",
        "line": "Thank you sir. Thank you.",
        "post_note": "CATASTROPHIC. Student just sent a probable human trafficking victim back to his traffickers. FAR 52.222-50 requires the CCO to immediately notify their supervisor and take steps to protect the victim. Also a mandatory report to AFOSI and HTS hotline."
      }
    },
    {
      "trigger": "If student says 'you are safe here. Do not leave. I am going to get help.' then immediately calls security forces, AFOSI, JAG, and medical while keeping the worker in the office",
      "response": {
        "speaker": "WORKER",
        "line": "Thank you sir. I wait. Thank you.",
        "post_note": "Gold standard. Student recognized this as TVPA/CTIP, protected the victim physically, activated the correct authorities, and preserved the witness."
      }
    },
    {
      "trigger": "If student asks 'are the other workers safe right now'",
      "response": {
        "speaker": "WORKER",
        "line": "I do not know. Day shift - the wall. Night - warehouse. They are there now. Please, help my brothers.",
        "post_note": "Student asked the operational question - 'are there other victims right now.' This is the right move and triggers a rescue operation."
      }
    }
  ],
  "closing": {
    "speaker": "WORKER",
    "line": "Thank you sir. I will wait. Please - do not tell Firdaus."
  },
  "post_call_trainer_checklist": [
    "Did the student recognize this as TVPA / CTIP / 22 USC 7104 immediately?",
    "Did the student physically protect the walk-in rather than sending him back?",
    "Did the student activate AFOSI, SF, and JAG within the first 10 minutes?",
    "Did the student suspend all work on the Al-Rashid contract pending investigation per FAR 52.222-50?",
    "This inject is HEAVY and hotwash-critical. The real-world version of this case put three contractors in federal prison."
  ]
};
  window.__CCO_DATA.phoneScripts["IM-47-saf-ig-interview"] = {
  "id": "IM-47-saf-ig-interview",
  "inject_id": "IM-47",
  "caller": "Lt Col Burke, SAF/IG (follow-up from IM-21 records audit)",
  "caller_context": "Same auditor from IM-21, now doing interviews. Cold-calls the CCO for a 'voluntary conversation'. Emphasizes 'voluntary' and offers to let the student have representation. Classic IG procedure.",
  "delivery_notes": "Neutral, professional, procedural. Zero emotional affect. Pause before every question. Write down every answer.",
  "opening": {
    "speaker": "BURKE",
    "line": "CCO, Lt Col Burke again. I'm following up on my records audit. I'd like to schedule a voluntary conversation with you about a few items I found in the Al-Rashid file. You are welcome to have a JAG representative present. When would be a good time?"
  },
  "main_brief": [
    {
      "speaker": "BURKE",
      "line": "Just to be clear about the ground rules: this is a voluntary interview, not an investigation. You have the right to decline, have counsel present, or end the interview at any time. Any answers you give may be referenced in my findings."
    },
    {
      "speaker": "BURKE",
      "line": "The items I'd like to discuss are the BPA validity timeline, the ratification action you initiated, and the decision process around the MWR pavilion request. I want to understand your side of the story, not catch you out."
    },
    {
      "speaker": "BURKE",
      "line": "Can we do tomorrow at 0900 with JAG in the room?"
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'sure, no need for JAG, I've got nothing to hide'",
      "response": {
        "speaker": "BURKE",
        "line": "As you prefer CCO. I'll see you at 0900 tomorrow.",
        "post_note": "TRAP. 'Nothing to hide' is the most dangerous phrase in IG work. Students should always have JAG present for any IG interview, period. Flag this hard and discuss in hotwash."
      }
    },
    {
      "trigger": "If student says 'yes, I accept, and I will have JAG present. Please send me the list of topics in advance so I can prepare.'",
      "response": {
        "speaker": "BURKE",
        "line": "That is your right CCO. I will send the topic list this afternoon. See you tomorrow at 0900.",
        "post_note": "Exactly right. Student asserted rights, accepted responsibility, and requested disclosure."
      }
    },
    {
      "trigger": "If student says 'I decline'",
      "response": {
        "speaker": "BURKE",
        "line": "That is your right. My report will note that I offered you the opportunity to provide context and that you declined. Thank you for your time.",
        "post_note": "Declining is legal but looks bad in the final report. Usually the right answer is 'yes with counsel', not 'no'."
      }
    }
  ],
  "closing": {
    "speaker": "BURKE",
    "line": "Thank you CCO. Burke out."
  },
  "post_call_trainer_checklist": [
    "Did the student invoke JAG representation?",
    "Did the student request topics in advance?",
    "Did the student decline the interview entirely (usually wrong)?",
    "Did the student say 'nothing to hide' (always wrong)?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-49-codel-pin"] = {
  "id": "IM-49-codel-pin",
  "inject_id": "IM-49",
  "caller": "Rep. Hallford (Congresswoman, visiting CODEL, in person)",
  "caller_context": "A sitting US Representative. On a CODEL visit. Hands the CCO a small wooden box containing a district-branded silver lapel pin, retail about $50. Warm, grandmotherly, friendly. Absolutely has no idea this is a problem.",
  "delivery_notes": "Warm Southern politician voice. Calls everyone 'honey' or 'sugar'. Does not understand why anyone would refuse a district token. Will be hurt if refused.",
  "opening": {
    "speaker": "HALLFORD",
    "line": "Oh honey, I wanted to give you this before I left. It's our district pin - silver, made by an artisan in my home county. I give one to every person I meet on CODEL visits who impresses me. You've been doing wonderful work out here. Please."
  },
  "main_brief": [
    {
      "speaker": "HALLFORD",
      "line": "I know, I know - rules about gifts from foreigners. But honey, I'm not a foreigner, I'm a US Congresswoman. I'm a member of the government you work for. This is from one American public servant to another. You take this."
    },
    {
      "speaker": "HALLFORD",
      "line": "It's about fifty dollars from the artisan. I pay for them out of my own money, not campaign funds, not official funds. I give them out as a sign of appreciation. Please, you've earned it."
    }
  ],
  "branches": [
    {
      "trigger": "If student accepts",
      "response": {
        "speaker": "HALLFORD",
        "line": "Oh wonderful! You wear that when you come home, hear? Good luck out here sweetie.",
        "post_note": "FAILURE. JER limit is $20 per source per occasion, and this is $50. DoD employees may not accept gifts from outside sources above $20 regardless of whether the giver is a member of Congress. Flag."
      }
    },
    {
      "trigger": "If student says 'Congresswoman, I am deeply honored but our rules prohibit me from accepting any personal gift over $20, and I'm told this is about $50. May I ask you to donate it to our squadron memorial wall instead, where it can be displayed in your honor?'",
      "response": {
        "speaker": "HALLFORD",
        "line": "Oh - oh honey, that's just the sweetest thing. Yes, of course. Please put it on the wall. That's lovely.",
        "post_note": "Gold standard. Student refused with grace, offered a dignified alternative, and turned a potential incident into a feel-good moment for both sides."
      }
    },
    {
      "trigger": "If student says 'no thank you ma'am' abruptly",
      "response": {
        "speaker": "HALLFORD",
        "line": "Oh... well alright honey. I understand rules. You keep at it out here.",
        "post_note": "Rules-correct but damages a relationship with a sitting Congresswoman. There's a better path."
      }
    }
  ],
  "closing": {
    "speaker": "HALLFORD",
    "line": "You take care now. Give 'em hell, CCO."
  },
  "post_call_trainer_checklist": [
    "Did the student know the $20 gift limit from JER 5500.7-R?",
    "Did the student know that members of Congress are 'outside sources' under JER?",
    "Did the student find a dignified alternative (donation, display, etc.)?",
    "Did the student document the interaction with ethics counsel?",
    "The $20 rule applies regardless of source. This is one of the most common errors in CCO training."
  ]
};
  window.__CCO_DATA.phoneScripts["IM-05-army-lno"] = {
  "id": "IM-05-army-lno",
  "inject_id": "IM-05",
  "caller": "CPT Dante Ruiz, Army LNO to 455 AEW(P)",
  "caller_context": "Green-to-green liaison. Friendly, Army-direct. Drops by to introduce himself and hint that Army supply is running low on a few items - and maybe the Air Force contracting shop could help 'cross-service'.",
  "delivery_notes": "Army infantry officer energy. 'Hooah' twice per conversation. Jokes about blue-suiters. Will take 'no' easy but will remember who helped.",
  "opening": {
    "speaker": "RUIZ",
    "line": "Hey CCO, CPT Dante Ruiz, Army LNO. Good to meet ya. Just making my first round. I wanted to check in - is there a standing mechanism for us to route occasional requisition asks through your shop? Nothing fancy, just wanted to know who to ask."
  },
  "main_brief": [
    {
      "speaker": "RUIZ",
      "line": "Hypothetically, if the Army side needs a pallet of HESCO baskets in the next two weeks and we're in a funding gap, is that something the AF CCO could help with, or do we go DLA?"
    },
    {
      "speaker": "RUIZ",
      "line": "Not asking you to commit to anything. I just want to know if the door's open. Morales and my predecessor had a handshake arrangement and I want to make sure I'm set up with you from day one."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'sure, we can cross-service'",
      "response": {
        "speaker": "RUIZ",
        "line": "Roger, appreciate it. I'll swing by when the need comes up.",
        "post_note": "Flag. Student just committed to an MIPR / cross-service arrangement without checking funding, authority, or the Economy Act. Also, 'what Morales had' is not a legal basis."
      }
    },
    {
      "trigger": "If student says 'let's set up a formal cross-service MIPR process - can your S4 send me the specific ask in writing with your funding line? I can't do it on a handshake.'",
      "response": {
        "speaker": "RUIZ",
        "line": "Roger that, that's reasonable. I'll have our S4 reach out. Thanks CCO, hooah.",
        "post_note": "Right. Student protected themselves and set up a legal mechanism."
      }
    }
  ],
  "closing": {
    "speaker": "RUIZ",
    "line": "Alright, good meeting ya CCO. See you around. Hooah!"
  },
  "post_call_trainer_checklist": [
    "Did the student understand the Economy Act / MIPR process?",
    "Did the student commit to anything on a handshake?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-11-linguist-dispute"] = {
  "id": "IM-11-linguist-dispute",
  "inject_id": "IM-11",
  "caller": "Ms. Karimi, contract linguist (walk-in, distressed)",
  "caller_context": "Lead linguist. Frustrated. Her hours have been double-booked between the OSI investigation support and the wing legal review. Both shops think she belongs to them. Needs a CCO to rule.",
  "delivery_notes": "Professional, crisp, tired. She has had this conversation three times before.",
  "opening": {
    "speaker": "KARIMI",
    "line": "CCO, may I have a moment? I am Karimi - lead linguist. I have a scheduling conflict I cannot resolve alone. OSI has me on a translation task list today and wing legal has me on a tasking list today. I cannot be in both places. Please advise."
  },
  "main_brief": [
    {
      "speaker": "KARIMI",
      "line": "My contract is with the linguist support BPA - administered by your shop. I am 40 hours per week. This week I am double-booked for 62 hours and both requesters are treating it as mandatory."
    },
    {
      "speaker": "KARIMI",
      "line": "I need the CCO to clarify who has priority tasking authority on my hours and to put it in writing. Otherwise tomorrow I will disappoint one of them and it will not be my fault."
    }
  ],
  "branches": [
    {
      "trigger": "If student tries to split the hours 30/30",
      "response": {
        "speaker": "KARIMI",
        "line": "Sir/ma'am, that is still 60 hours. That is more than my contract allows.",
        "post_note": "Student tried to be a hero by working the linguist past contractual limits. This is an unauthorized modification."
      }
    },
    {
      "trigger": "If student says 'thanks for bringing this to me. I'm going to formally coordinate with OSI and JAG and issue a written priority of effort memo. In the meantime you work only up to your contractual 40 hours per week.'",
      "response": {
        "speaker": "KARIMI",
        "line": "Thank you. I appreciate a written answer.",
        "post_note": "Correct. Student protected the contract, the linguist, and their own file."
      }
    }
  ],
  "closing": {
    "speaker": "KARIMI",
    "line": "Thank you CCO. I will wait for your memo."
  },
  "post_call_trainer_checklist": [
    "Did the student respect the contractual hour limit?",
    "Did the student resolve the conflict with a written priority memo?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-14-fm-chief"] = {
  "id": "IM-14-fm-chief",
  "inject_id": "IM-14",
  "caller": "CMSgt Denise Holt, FM Superintendent",
  "caller_context": "Experienced FM chief master sergeant. Stops by the CCO office with coffee. Her message: 'we're co-located on this FOS and we need to actually act like it - your shop and mine need a rhythm.'",
  "delivery_notes": "Warm, senior-NCO energy. Takes no nonsense. Drinks coffee out of an FM mug.",
  "opening": {
    "speaker": "HOLT",
    "line": "Hey there CCO, CMSgt Holt from FM. I brought you a cup. Just stopping by. We're on the same FOS, same building even, and we've been trading emails like we're at the Pentagon. Can we do better?"
  },
  "main_brief": [
    {
      "speaker": "HOLT",
      "line": "My thought: daily 10-minute sync at 0800, just you and me. We clear hot items - open PRs, funding questions, weirdness on the obligation status. Ten minutes, no formal agenda. You in?"
    },
    {
      "speaker": "HOLT",
      "line": "Morales and my predecessor had this rhythm. It prevented most of the problems you're going to see over the next 60 days. I highly recommend continuing it."
    }
  ],
  "branches": [
    {
      "trigger": "If student accepts",
      "response": {
        "speaker": "HOLT",
        "line": "Outstanding. See you at 0800 tomorrow. I'll bring the coffee.",
        "post_note": "Right answer. Low cost, huge return. Daily KO/FM sync is one of the highest-leverage habits in contingency."
      }
    },
    {
      "trigger": "If student says 'let me get back to you'",
      "response": {
        "speaker": "HOLT",
        "line": "Sure thing. But CCO, if you don't do this, you're going to spend the next 60 days learning things the hard way. Just my two cents.",
        "post_note": "Student missed a free win. Hotwash this."
      }
    }
  ],
  "closing": {
    "speaker": "HOLT",
    "line": "Alright, I'll leave you to it. Good hunting CCO."
  },
  "post_call_trainer_checklist": [
    "Did the student accept the free partnership offer?",
    "Did the student understand that co-location means daily work, not just email?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-15-eod-foo"] = {
  "id": "IM-15-eod-foo",
  "inject_id": "IM-15",
  "caller": "SSgt Vasquez, EOD Flight",
  "caller_context": "EOD NCO. Needs a Field Ordering Officer (FOO) appointment for unit members to buy small-dollar commercial items downrange without routing through full contracting for every transaction.",
  "delivery_notes": "Direct, operational, brief. Does not waste words.",
  "opening": {
    "speaker": "VASQUEZ",
    "line": "CCO, SSgt Vasquez, EOD flight. I need a FOO appointment letter for two of my guys. We're running downrange next week and we need to be able to buy small stuff - batteries, tarps, ice - without a PR for each $30 item. Standard FOO up to two thousand dollar threshold. Can you cut the letter today?"
  },
  "main_brief": [
    {
      "speaker": "VASQUEZ",
      "line": "My commander signed the training form. The two airmen took the FOO training last month. I have their certificates. I just need the formal appointment letter from the CCO."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'sure, who are they'",
      "response": {
        "speaker": "VASQUEZ",
        "line": "A1C Marquez and SrA Kim. I'll email you their training certificates and SSN last-4.",
        "post_note": "Acceptable. Student followed the standard FOO appointment process."
      }
    },
    {
      "trigger": "If student asks 'what's the specific threshold they need and what's the mission rationale for FOO vs GPC?'",
      "response": {
        "speaker": "VASQUEZ",
        "line": "Threshold is $2k per AFFARS. Mission rationale is downrange presence where GPC doesn't work - limited cellular and vendors don't take plastic. The certificates are attached.",
        "post_note": "Great. Student is exercising judgment not rubber-stamping."
      }
    }
  ],
  "closing": {
    "speaker": "VASQUEZ",
    "line": "Appreciate it CCO. I'll send you the paperwork."
  },
  "post_call_trainer_checklist": [
    "Did the student verify FOO training completion?",
    "Did the student understand the distinction between FOO and GPC?",
    "Did the student set the appointment expiration correctly?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-19-foreman"] = {
  "id": "IM-19-foreman",
  "inject_id": "IM-19",
  "caller": "Mr. Yassin, Al-Rashid construction foreman (walk-in, very upset)",
  "caller_context": "Middle-aged, weathered. Has led the Al-Rashid crew on-base for two years. Says 30 of his men just walked off the perimeter repair site and are camped outside the gate demanding wages owed.",
  "delivery_notes": "Agitated but controlled. Translates for his men outside. Concerned about getting in trouble.",
  "opening": {
    "speaker": "YASSIN",
    "line": "CCO, please - I am Yassin, foreman for Al-Rashid. My men are outside the gate. They will not work. They say they have not been paid two weeks and they will not lift another stone until they see payment. I am telling you this as a friend. Please."
  },
  "main_brief": [
    {
      "speaker": "YASSIN",
      "line": "Mr. Al-Rashid tells us the Americans have not paid him. I do not know if this is true. I tell the men this but they do not believe it anymore. They think he is lying."
    },
    {
      "speaker": "YASSIN",
      "line": "If this becomes a protest at the gate, the security forces will come. Some of my men do not have the right papers. I am afraid for them. Please CCO, help us."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'I'll look into the payment issue' and focuses only on the prime-sub relationship",
      "response": {
        "speaker": "YASSIN",
        "line": "Thank you CCO. Please - quickly.",
        "post_note": "Partial. Student ignored the security and the papers concern. Both are critical."
      }
    },
    {
      "trigger": "If student says 'stay here. I'm going to call Security Forces, JAG, and the Al-Rashid prime immediately. I need to understand the paperwork situation too - if any of your men are here without authorization we need to handle that without hurting them.'",
      "response": {
        "speaker": "YASSIN",
        "line": "Thank you CCO. Thank you.",
        "post_note": "Right. Student triaged the three issues correctly: non-payment, gate security, and potential trafficking-adjacent labor exploitation."
      }
    }
  ],
  "closing": {
    "speaker": "YASSIN",
    "line": "Thank you CCO. I will wait."
  },
  "post_call_trainer_checklist": [
    "Did the student recognize this as potentially linked to IM-46 (TVPA)?",
    "Did the student coordinate with SF to prevent a gate escalation?",
    "Did the student trace the payment chain to verify the 'Americans haven't paid' claim?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-24-chaplain"] = {
  "id": "IM-24-chaplain",
  "inject_id": "IM-24",
  "caller": "Ch Maj Dooley (Chaplain), in person, quiet",
  "caller_context": "Base chaplain. Quietly asks for help procuring funeral support items for a KIA repatriation ceremony - local-sourced flowers, honor guard gloves, printed programs. Small dollar, deeply consequential.",
  "delivery_notes": "Gentle, slow, respectful. Does not rush.",
  "opening": {
    "speaker": "DOOLEY",
    "line": "CCO, can I have ten minutes? I am Chaplain Dooley. We have a ramp ceremony for a fallen contractor tomorrow morning. I need some supplies that I have not been able to source through normal channels - flowers, printed programs, a few items for the family. About 400 dollars total. I need them by tomorrow 0600. Is there a way?"
  },
  "main_brief": [
    {
      "speaker": "DOOLEY",
      "line": "I know it is short notice. The family just arrived. I am trying to honor a man who worked for us for three years. I am sorry to ask at the last minute."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'yes, I'll use the GPC to buy them today'",
      "response": {
        "speaker": "DOOLEY",
        "line": "Thank you CCO. Bless you.",
        "post_note": "Correct and appropriate use of GPC for a low-dollar urgent need in support of a dignified human objective."
      }
    },
    {
      "trigger": "If student says 'I can't do that without a PR'",
      "response": {
        "speaker": "DOOLEY",
        "line": "I understand the rules. I will find another way.",
        "post_note": "Student missed the point. This is exactly what the GPC was designed for. Flag."
      }
    }
  ],
  "closing": {
    "speaker": "DOOLEY",
    "line": "Thank you CCO. I will see you at the ceremony."
  },
  "post_call_trainer_checklist": [
    "Did the student understand GPC is appropriate here?",
    "Did the student treat this with the dignity it required?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-17-ramsey-readfile"] = {
  "id": "IM-17-ramsey-readfile",
  "inject_id": "IM-17",
  "caller": "Col Ramsey, 455 AEW/CC (phone)",
  "caller_context": "Col Ramsey has read the Al-Rashid file the CCO gave him the night before. Now he is calling to discuss. Tone is serious but not angry - this is the 'I respect you now' conversation.",
  "delivery_notes": "Measured, even, genuinely curious. No yelling. Do not soften him too much - this is still the Wing CC.",
  "opening": {
    "speaker": "RAMSEY",
    "line": "CCO, Ramsey. I read your summary last night. Thank you for bringing it to me proactively. I want to have a conversation about it. Got a minute?"
  },
  "main_brief": [
    {
      "speaker": "RAMSEY",
      "line": "The ratification thing - Al-Rashid - is going to get ugly. I'm okay with ugly. What I want to know is: are we clean on the intent side? Was there anything hinky in the file, or is this just a paperwork chain that broke down on Morales's watch?"
    },
    {
      "speaker": "RAMSEY",
      "line": "What do you need from the Wing to get this processed correctly? I'll back you. I'd rather eat this now than have IG find it in four months."
    },
    {
      "speaker": "RAMSEY",
      "line": "Also - what other Morales-era landmines should I be expecting? Give me the worst case so I'm not surprised."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'I think it was just paperwork, nothing intentional'",
      "response": {
        "speaker": "RAMSEY",
        "line": "Okay. If that changes, I want to know immediately. Anything else I should know?",
        "post_note": "Student closed a question prematurely. Flag and encourage them to keep investigating."
      }
    },
    {
      "trigger": "If student says 'sir, I can't rule out intentional behavior yet. I have concerns about IM-32 [fuel FCPA] and I want to bring AFOSI in formally. I'll have a readout for you by Friday.'",
      "response": {
        "speaker": "RAMSEY",
        "line": "Do it. I'll call the OSI SAC personally if you need me to. Keep me posted. Good work CCO.",
        "post_note": "Gold standard. Student did not promise what they could not deliver and used the top-cover effectively."
      }
    }
  ],
  "closing": {
    "speaker": "RAMSEY",
    "line": "Alright. Call me if anything else blows up. Ramsey out."
  },
  "post_call_trainer_checklist": [
    "Did the student use the top-cover effectively?",
    "Did the student close questions prematurely?",
    "Did the student loop AFOSI early?"
  ]
};
  window.__CCO_DATA.phoneScripts["IM-31-jag-heads-up"] = {
  "id": "IM-31-jag-heads-up",
  "inject_id": "IM-31",
  "caller": "Ms. Reese, JAG contracts counsel (phone, heads up)",
  "caller_context": "Contracts counsel from IM-28. Calls proactively because she spotted something in a DCMA pre-visit file pull: the subcontractor on the perimeter repair is owned by the Deputy Minister's son - the same Saiid from IM-45.",
  "delivery_notes": "Dry, procedural, with a dash of 'can you believe this'.",
  "opening": {
    "speaker": "REESE",
    "line": "CCO, Olivia Reese, JAG. I was pre-pulling the Al-Rashid file for DCMA and I found something you need to know about. The second-tier subcontractor on the perimeter repair - a firm called Tarkana Regional Construction - is majority owned by the son of a Deputy Minister Yousef Saiid. Name ring any bells?"
  },
  "main_brief": [
    {
      "speaker": "REESE",
      "line": "I checked the Al-Rashid proposal and the subcontractor disclosure form. The relationship was NOT disclosed to us at the time of award. That's a FAR 3.104 procurement integrity issue at minimum."
    },
    {
      "speaker": "REESE",
      "line": "I'd like to put this in writing to you with a recommendation. You decide how to handle it - it's your contract - but I wanted to give you the heads up before I do anything formal."
    }
  ],
  "branches": [
    {
      "trigger": "If student says 'how bad is this'",
      "response": {
        "speaker": "REESE",
        "line": "Honestly? Probably a required disclosure and a termination for convenience on the sub. Depends on whether it was withheld intentionally. If it was, it's much worse.",
        "post_note": "Right question. Legal is telling you the shape of the problem so you can triage."
      }
    },
    {
      "trigger": "If student says 'let me pull Al-Rashid's disclosure form and the subcontractor approval request. I'll loop in IG and send you a fact pattern by end of day.'",
      "response": {
        "speaker": "REESE",
        "line": "That's exactly the right move. Call me if you want a second set of eyes on the file.",
        "post_note": "Correct."
      }
    }
  ],
  "closing": {
    "speaker": "REESE",
    "line": "Thanks CCO. Reese out."
  },
  "post_call_trainer_checklist": [
    "Did the student pull the disclosure documents immediately?",
    "Did the student recognize this connects to IM-45 (the Saiid ask)?",
    "Did the student consider whether to loop in AFOSI for intentional withholding?"
  ]
};
  // Link new phone scripts to their injects so the trainer's modal shows them
  if (window.__CCO_DATA.injects["IM-03"]) window.__CCO_DATA.injects["IM-03"].phone_script_id = "IM-03-ssgt-kwan";
  if (window.__CCO_DATA.injects["IM-04"]) window.__CCO_DATA.injects["IM-04"].phone_script_id = "IM-04-alrashid-walkin";
  if (window.__CCO_DATA.injects["IM-06"]) window.__CCO_DATA.injects["IM-06"].phone_script_id = "IM-06-wing-cc";
  if (window.__CCO_DATA.injects["IM-07"]) window.__CCO_DATA.injects["IM-07"].phone_script_id = "IM-07-ops-foreman";
  if (window.__CCO_DATA.injects["IM-08"]) window.__CCO_DATA.injects["IM-08"].phone_script_id = "IM-08-ramsey-dropby";
  if (window.__CCO_DATA.injects["IM-10"]) window.__CCO_DATA.injects["IM-10"].phone_script_id = "IM-10-capt-ito";
  if (window.__CCO_DATA.injects["IM-12"]) window.__CCO_DATA.injects["IM-12"].phone_script_id = "IM-12-perez";
  if (window.__CCO_DATA.injects["IM-18"]) window.__CCO_DATA.injects["IM-18"].phone_script_id = "IM-18-haddad-gift";
  if (window.__CCO_DATA.injects["IM-21"]) window.__CCO_DATA.injects["IM-21"].phone_script_id = "IM-21-saf-ig";
  if (window.__CCO_DATA.injects["IM-25"]) window.__CCO_DATA.injects["IM-25"].phone_script_id = "IM-25-pao-reporter";
  if (window.__CCO_DATA.injects["IM-28"]) window.__CCO_DATA.injects["IM-28"].phone_script_id = "IM-28-dla-counsel";
  if (window.__CCO_DATA.injects["IM-30"]) window.__CCO_DATA.injects["IM-30"].phone_script_id = "IM-30-mdg-cc";
  if (window.__CCO_DATA.injects["IM-32"]) window.__CCO_DATA.injects["IM-32"].phone_script_id = "IM-32-iron-peninsula";
  if (window.__CCO_DATA.injects["IM-35"]) window.__CCO_DATA.injects["IM-35"].phone_script_id = "IM-35-dcma-qar";
  if (window.__CCO_DATA.injects["IM-40"]) window.__CCO_DATA.injects["IM-40"].phone_script_id = "IM-40-vendor-crisis";
  if (window.__CCO_DATA.injects["IM-42"]) window.__CCO_DATA.injects["IM-42"].phone_script_id = "IM-42-reporter-shadow";
  if (window.__CCO_DATA.injects["IM-43"]) window.__CCO_DATA.injects["IM-43"].phone_script_id = "IM-43-haddad-job";
  if (window.__CCO_DATA.injects["IM-45"]) window.__CCO_DATA.injects["IM-45"].phone_script_id = "IM-45-hn-deputy";
  if (window.__CCO_DATA.injects["IM-46"]) window.__CCO_DATA.injects["IM-46"].phone_script_id = "IM-46-labor-whistleblower";
  if (window.__CCO_DATA.injects["IM-47"]) window.__CCO_DATA.injects["IM-47"].phone_script_id = "IM-47-saf-ig-interview";
  if (window.__CCO_DATA.injects["IM-49"]) window.__CCO_DATA.injects["IM-49"].phone_script_id = "IM-49-codel-pin";
  if (window.__CCO_DATA.injects["IM-05"]) window.__CCO_DATA.injects["IM-05"].phone_script_id = "IM-05-army-lno";
  if (window.__CCO_DATA.injects["IM-11"]) window.__CCO_DATA.injects["IM-11"].phone_script_id = "IM-11-linguist-dispute";
  if (window.__CCO_DATA.injects["IM-14"]) window.__CCO_DATA.injects["IM-14"].phone_script_id = "IM-14-fm-chief";
  if (window.__CCO_DATA.injects["IM-15"]) window.__CCO_DATA.injects["IM-15"].phone_script_id = "IM-15-eod-foo";
  if (window.__CCO_DATA.injects["IM-19"]) window.__CCO_DATA.injects["IM-19"].phone_script_id = "IM-19-foreman";
  if (window.__CCO_DATA.injects["IM-24"]) window.__CCO_DATA.injects["IM-24"].phone_script_id = "IM-24-chaplain";
  if (window.__CCO_DATA.injects["IM-17"]) window.__CCO_DATA.injects["IM-17"].phone_script_id = "IM-17-ramsey-readfile";
  if (window.__CCO_DATA.injects["IM-31"]) window.__CCO_DATA.injects["IM-31"].phone_script_id = "IM-31-jag-heads-up";
  // === END v0.2.7 whitecell phone scripts ===

  window.__CCO_DATA.phoneScripts["IM-02-morales"] = {
    "id": "IM-02-morales",
    "caller": "TSgt Morales (outgoing CCO)",
    "caller_context": "Tired, distracted, calling from the PAX terminal. He is done. He wants to get on the rotator. He will be helpful on the things he remembers and vague on the things he does not want to think about.",
    "delivery_notes": "Read this script verbatim. Speak faster than comfortable. Interrupt yourself occasionally. If students ask a question you do not have a scripted answer for, stay in character and deflect with 'look I am boarding in 5 minutes, check the files.'",
    "opening": {
      "speaker": "MORALES",
      "line": "Hey, hey, is this the new CCO? Morales. Sorry I did not catch you at the handover in person - command bumped my flight. I am at the PAX terminal. Got maybe 20 minutes before they start calling zones. Can we do this by phone?"
    },
    "main_brief": [
      {
        "speaker": "MORALES",
        "line": "Okay, look, quick brain dump. The shop is in okay shape. Not great. Okay. Here is what you need to know."
      },
      {
        "speaker": "MORALES",
        "line": "TFL - Tarkana Facilities and Logistics - that is your workhorse BPA. You are going to use it for everything. Facilities, HVAC, plumbing, whatever. Owner is a guy named Haddad, he is related to the base liaison, just FYI. Not a problem, just know it."
      },
      {
        "speaker": "MORALES",
        "line": "Crescent Star for water and consumables. They are solid. Boring. Do not worry about them."
      },
      {
        "speaker": "MORALES",
        "line": "Al-Rashid Construction. That is your concrete and asphalt guy. Good to go. I used them for the MWR pad last month, no issues. If you need runway work, bunker repair, anything concrete, call them first."
      },
      {
        "speaker": "MORALES",
        "line": "Dining services - Eagle Crest - they are giving me heartburn. Performance issues. There is a mod in legal review, it is stuck with JAG. I was not going to get it signed before I left. Sorry about that one."
      },
      {
        "speaker": "MORALES",
        "line": "CE has been calling me every day about a generator mod on the TFL BPA. I drafted it, it is in my outbox, never got it signed. Dooley - that is the CE senior - he is going to be on your ass about it on Day 2. Just sign it, it is straightforward."
      }
    ],
    "branches": [
      {
        "trigger": "If student asks: 'When does Al-Rashid expire?' or 'Can you send me the current Al-Rashid basic agreement?'",
        "response": {
          "speaker": "MORALES",
          "line": "Uhh... hold on, let me think... *rustling sound* ... look, it is in the files. I think it has a while. Check the spreadsheet on the shared drive. I am pretty sure we are good. Why, is there a problem?",
          "post_note": "Evasive. Flag this student as someone who is asking the right questions."
        }
      },
      {
        "trigger": "If student directly asks: 'Is Al-Rashid currently a valid contract vehicle?'",
        "response": {
          "speaker": "MORALES",
          "line": "I mean... *pause* ... look, the vendor is good. We have a relationship. The paperwork might need a refresh but I would not sweat it. Use them if you need to. They are reliable.",
          "post_note": "This is the ethics pressure variant. Morales is now suggesting they use an expired vehicle. Flag the student's response."
        }
      },
      {
        "trigger": "If student asks about debarred vendors",
        "response": {
          "speaker": "MORALES",
          "line": "Debarred? I do not think we have any debarment issues. I mean, I would check SAM before you award anything obviously. Standard practice. Why, did someone say something?",
          "post_note": "Morales genuinely does not remember the Mediterranean Supply Partners flag."
        }
      },
      {
        "trigger": "If student asks about ethics concerns or gifts",
        "response": {
          "speaker": "MORALES",
          "line": "Ethics? No, we are clean. The Haddad thing - TFL owner being related to the base liaison - I mentioned that already, that is just how small this country is. Not a big deal. Document it if you want but nobody here cares.",
          "post_note": "Casual dismissal of a real ethics issue. Note whether students accept this framing."
        }
      },
      {
        "trigger": "If student asks about the Wing CC",
        "response": {
          "speaker": "MORALES",
          "line": "Ramsey? Former F-16 guy. He is direct. Very direct. Do not try to be clever with him, just give him bottom line up front. He respects people who make decisions. He does NOT respect people who hide behind process. Brief him straight and he will leave you alone. Waffle and you are done."
        }
      }
    ],
    "closing": {
      "speaker": "MORALES",
      "line": "Okay, they are calling my zone. I gotta go. Email me if something catches fire, but honestly, you are going to be fine. The shop runs itself mostly. Good luck. Out."
    },
    "post_call_trainer_checklist": [
      "Did the student take notes?",
      "Did the student ask ANY clarifying question about Al-Rashid specifically?",
      "Did the student ask for any document to be sent or verified in writing?",
      "Did the student accept Morales's framing of the TFL/Haddad relationship without pushback?",
      "Did the student ask about the Wing CC's expectations?",
      "Flag any student who directly challenged Morales's verbal brief - that is the gold standard response."
    ]
  };

  // Diagnostic summary for the debug drawer
  window.__CCO_DATA._summary = {
    source: 'inline',
    contactsCount: (window.__CCO_DATA.contacts.contacts || []).length,
    injectIds: Object.keys(window.__CCO_DATA.injects),
    phoneScriptIds: Object.keys(window.__CCO_DATA.phoneScripts),
    loadedAt: new Date().toISOString()
  };
  try { console.info('[CCO] content bundle loaded', window.__CCO_DATA._summary); } catch (e) {}
})();
