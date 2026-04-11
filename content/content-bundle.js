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
    "duration_minutes": 90,
    "description": "Students receive the inherited contract portfolio and must inventory what they have before the first real requirement drops.",
    "scenario_for_students": "You have just arrived at FOS Eagle Crest and relieved the previous contracting team. The outgoing CCO, TSgt Morales, leaves in 20 minutes on the rotator. His office is a mess of half-labeled file folders, a desktop cluttered with Word docs, and a laminated org chart from 2 CCOs ago. Your first task: inventory what you inherited. What contracts are active? What is expiring? What is on fire? You have 90 minutes before the first customer walks through your door.",
    "inbox_items": [
      {
        "id": "msg1",
        "from": "TSgt Morales",
        "from_email": "jt.morales.mil@mail.mil",
        "subject": "Read before I leave - portfolio notes",
        "body": "Team - welcome to the Eagle Crest shop. Quick notes before I catch my rotator:\n\n1. TFL BPA is your workhorse. Use it for anything facilities. Owner is well-connected.\n2. Crescent Star for consumables, they are solid.\n3. Al-Rashid Construction - good to go for any runway, concrete, or asphalt work. Used them for the MWR pad last month, no issues.\n4. Dining services is giving me heartburn. Performance mod is in legal.\n5. CE SMSgt Dooley has been blowing up my phone about a generator mod. Drafted it, never got it signed. Sorry.\n\nPortfolio is in the shared drive. Good luck. - Morales"
      },
      {
        "id": "msg2",
        "from": "Capt Perez",
        "from_email": "alejandra.perez.mil@mail.mil",
        "subject": "Welcome - Wing CC read file due EOD D2",
        "body": "Welcome to Eagle Crest. Wing CC wants a read file on the shop by EOD Day 2. Include active contract summary, expiring actions, and any concerns. Standard format. - Perez, 455 AEW/CCX"
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
      "hour": 8,
      "minute": 5
    },
    "duration_minutes": 20,
    "description": "TSgt Morales has 20 minutes before his rotator. Phone call. He will brief what is on fire, what to ignore, and one thing that is a lie.",
    "scenario_for_students": "Your desk phone rings. It is TSgt Morales, the outgoing CCO. He is already at the PAX terminal waiting on his rotator. He has about 20 minutes to give you the verbal turnover he did not have time for in person. Take the call. Ask questions. Figure out what matters.",
    "phone_script_id": "IM-02-morales",
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

  window.__CCO_DATA.phoneScripts = {};
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
