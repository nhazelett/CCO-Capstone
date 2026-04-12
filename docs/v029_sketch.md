# v0.2.9 Sketch — Delegation + Interface Redesign

Design pass. Not code yet. Goal: lock the shape before we start moving files around.

## The core idea

Right now the student page is cluttered (persona bar, filter notice, mail list, reading pane, fake tabs) and the trainer page has a timeline and a big "white cell" grid of generic buttons that don't actually know what inject you're on. Both sides need to get **simpler and more contextual.**

Three big shifts for v0.2.9:

1. **Student page collapses to three things:** Emails, Texts, Notes.
2. **Trainer page becomes inject-aware:** the fire buttons change based on which inject is live.
3. **Messages flow both ways:** students can reply/ask, trainer sees a queue, trainer fires a canned or custom response back.

Delegation rides on top of the same plumbing — a leader "forwards" an item by pushing it into a subordinate's inbox via `delegated_to`.

---

## Student page — new layout

Kill the current three-tab thing. Collapse to three panes, no mode switch:

```
┌───────────────────────────────────────────────────────────────────────┐
│ TOPBAR  [Lt Col Vance — Commander] [Primary ★]           D1 08:47   │
├───────────────────┬───────────────────────────┬───────────────────────┤
│  EMAILS (4)       │  [selected email]         │  NOTES                │
│                   │                           │                       │
│ • Ramsey          │  From: SMSgt Morales      │  [free-text area,     │
│   Who's in charge │  Subject: Day 1 pile      │   autosaves to        │
│                   │                           │   localStorage per    │
│ • Morales   [LEAD]│  [body...]                │   persona]            │
│   Day 1 pile      │                           │                       │
│                   │  ┌─ Reply to trainer ─┐   │                       │
│ • Lao       [ACO] │  │ Ask a question...  │   │                       │
│   DFAC chicken    │  │                    │   │                       │
│                   │  │          [Send →]  │   │                       │
│ • Req             │  └────────────────────┘   │                       │
│   normal thing    │                           │                       │
│                   │                           │                       │
├───────────────────┴───────────────────────────┤                       │
│  TEXTS                                        │                       │
│  ┌─ SMS thread: CE Flight ─────────────────┐  │                       │
│  │ 08:45  Can you swing by for the HVAC... │  │                       │
│  │ [Reply...]                      [Send]  │  │                       │
│  └─────────────────────────────────────────┘  │                       │
└───────────────────────────────────────────────┴───────────────────────┘
```

What changes from today:

- **One persistent Notes pane on the right.** No tab. Always there. Autosaves per persona to `localStorage`, survives reload, cleared on reset.
- **Texts move out of the "mail list" and get their own pane below emails.** SMS and email are different cognitive things — stop pretending they're the same inbox.
- **Reply box lives inside the selected email,** not in a separate compose view. Always visible, always one click away.
- **Persona pill stays in the topbar,** but the filter-notice panel goes away. If the persona is unassigned, show a dim empty-state in the email list instead of a banner.

**Observer view:** same three-pane layout but the reply boxes are replaced with a dim `[Observer — read only]` strip. Notes still writable (observers take notes on trainer performance — we'll label the pane "Observer notes" when in observer mode).

---

## Student → Trainer message flow

Mechanically simple:

1. Student hits Send in the reply box.
2. `Engine.studentAsk({ personaId, injectId, threadId, body })` pushes an entry onto `state.trainer_queue`.
3. `engine:trainer-queue-updated` event fires.
4. Trainer page shows it in the **Action Queue** panel (see below).
5. Trainer clicks a quick-fire button OR types a custom reply → `Engine.trainerReply(...)` pushes a new inbox item into that student's feed with the same `threadId` so it looks like a reply chain.

No routing logic changes. `trainer_queue` is just a list the trainer watches.

---

## Trainer page — new layout

The big shift: the current generic "White cell controls" grid (call, email, SMS, doc, curveball, flag) becomes an **inject-aware fire panel** that changes based on which inject is selected in the timeline.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMMAND BAR  [clock] [stats] [Pause][Reset][ENDEX]                          │
├──────────────┬──────────────────────────────────────┬───────────────────────┤
│  TIMELINE    │  INJECT FOCUS: IM-23  Crescent Star  │  ACTION QUEUE   (3)   │
│              │  Status: LIVE · 4m elapsed           │                       │
│ ▸ IM-21 done │  ┌─────────────────────────────────┐ │ • Khatri asked:       │
│ ▸ IM-22 done │  │ QUICK-FIRE  (per inject)        │ │   "What vehicle do    │
│ ● IM-23 LIVE │  │                                 │ │    I use for this?"   │
│ ○ IM-24 q'd  │  │ [ FIRE  PWS draft           ]   │ │   [Reply] [Canned ▾]  │
│ ○ IM-25 q'd  │  │ [ FIRE  Market research     ]   │ │                       │
│ ○ IM-26 q'd  │  │ [ FIRE  Quote / proposal    ]   │ │ • Vance flagged item  │
│              │  │ [ FIRE  J&A memo            ]   │ │   IM-19 for hotwash   │
│              │  │ [ FIRE  Vendor curveball    ]   │ │                       │
│              │  │                                 │ │ • Lt Park delegated   │
│              │  │ [ Custom response... ]          │ │   IM-22-m1 → Vega     │
│              │  └─────────────────────────────────┘ │                       │
│              │                                      │                       │
│              │  ROUTE  ACO · Visible to: Park, Vega │─ ROLE ASSIGNMENTS ────│
│              │                                      │  Vance     Commander  │
│              │  EXPECTED ACTIONS (from inject yaml) │  Morales   SEL        │
│              │  ☐ Student opens SAM and checks...   │  Park      ACO        │
│              │  ☐ Student drafts PWS outline        │  Vega      ACO        │
│              │  ☑ Student asks trainer for format   │  Khatri    CCO        │
│              │                                      │  ...                  │
│              │  OBSERVER REMINDER:                  │─ INBOX MIRROR ────────│
│              │  "Watch how the trainer sequences    │  (today's items, as   │
│              │   the follow-ups. Did the quick-fire │   students see them)  │
│              │   land before the student stalled?"  │                       │
└──────────────┴──────────────────────────────────────┴───────────────────────┘
```

Three columns:

**Left — Timeline.** Same as today, minor cleanup. Click an inject to change focus.

**Center — Inject Focus.** The big new idea. Everything on this panel is scoped to the currently-selected inject:
- **Quick-fire grid.** Buttons are defined per inject in the content bundle (`inject.quick_fires: [{label, kind, payload}]`). Hit one → a pre-scripted follow-up email/text gets fired at whichever persona is logged in, or at a specific student if delegation is involved. There's a dedicated "Custom response..." slot at the bottom for ad-hoc replies.
- **Route readout.** Tells the trainer who can see this inject right now (based on `role_tag` and current assignments). Helps the trainer answer "wait, who has this?"
- **Expected actions checklist.** Pulled from `inject.expected_actions`. Trainer checks them off as students demonstrate them. Drives TLO coverage visually.
- **Observer reminder.** One-liner per inject explaining what observers should be watching for. Reminds the trainer that someone is watching *them,* keeps the coaching loop alive.

**Right — Action column.** Three stacked panels:
- **Action Queue (NEW).** Every pending student question lands here. Each entry shows who asked, on what inject, the body, a `[Reply]` button, and a `[Canned ▾]` dropdown populated from the selected inject's quick-fires. Also shows delegation events and flag requests as log entries.
- **Role Assignments** (existing, keep as-is).
- **Inbox Mirror** (existing, keep but shorter — Action Queue steals most of its job).

What goes away: the generic 6-button "White cell" grid at the top-right. Replaced by the inject-focused quick-fire grid in the middle column.

---

## Delegation

This is the v0.2.9 core feature. The plumbing hook is already in place in `student.js`:

```js
if (item.delegated_to === me) return true;
```

What we need to add:

**On the student side (leaders only):**
- When a leader has an inbox item selected, show a small `[Delegate ▾]` button next to the reply box.
- Dropdown lists every student currently assigned `cco` or `aco`, grouped by role.
- Pick one → `Engine.delegateItem(itemId, targetStudentId)`.
- Engine stamps `item.delegated_to = targetStudentId`, fires `engine:inbox-updated`.
- Item disappears from every non-leader, non-target inbox (filter rule already handles it).
- Item now shows a small "← delegated from Commander Vance" strip when the target opens it.

**On the trainer side:**
- Delegation events land in the Action Queue as log entries: "Lt Park delegated IM-22-m1 → Vega."
- No trainer action required — it's a passive notification so the trainer knows who's actually working the item.

**Delegation doesn't auto-unshare from leaders.** All leaders still see everything (current rule). Delegation is about making it visible to *one more person* (the subordinate doing the work), not about hiding from peers.

**Leader-specific injects (stretch for v0.2.9):**
- Add `inject.leader_task: true` marker.
- Engine routes these with `role_tag='leadership'` AND adds an `expected_from: 'leader'` hint the trainer panel surfaces: "Commander should develop a brief / update O&I slides / etc."
- No new mechanics — just content + a tag. Can ship alongside delegation.

**Failure cascade (defer to v0.3.0):** this needs inject chaining and state machines. Not v0.2.9. Park it.

---

## Data model additions

Minimal:

```js
// state
state.trainer_queue = [];  // {id, personaId, injectId, threadId, body, time, handled:false}

// inbox item fields (additive, all optional)
item.delegated_to = null;    // studentId
item.delegated_from = null;  // studentId (for the "← from Vance" strip)
item.threadId = null;        // groups replies under one thread

// inject content fields (additive)
inject.quick_fires = [       // rendered in trainer Inject Focus panel
  { label: 'FIRE PWS draft', kind: 'email', to: 'asker', template_id: 'pws_draft_v1' },
  { label: 'FIRE market research', kind: 'email', to: 'asker', template_id: 'mr_v1' },
];
inject.observer_note = 'Watch how the trainer sequences the follow-ups...';
inject.leader_task = false;  // optional marker
```

`to: 'asker'` = reply goes to whoever triggered the Action Queue entry. Other values: `'broadcast'`, `'<roleKey>'`, or a specific studentId.

New Engine methods:

```js
Engine.studentAsk({ personaId, injectId, threadId, body })
Engine.trainerReply({ queueEntryId, templateId|body, toPersonaId })
Engine.delegateItem(itemId, targetStudentId)
Engine.getTrainerQueue()
Engine.markQueueHandled(queueEntryId)
```

---

## Backend inject editor

Separate concern, can be a different page: `backend.html`. Drag-and-drop timeline strip where each inject is a card you can drop onto a day/time slot. Click a card to edit its quick_fires, role_tag, expected_actions, observer_note. Export button dumps a new `content-bundle.js`. **Do NOT build this in v0.2.9** — put it on the list for v0.3.x once the quick-fire shape is proven in real content. Nick should author 2-3 injects with quick_fires by hand first so we learn what the editor actually needs to expose.

---

## What I'm proposing to ship as v0.2.9

Cut the scope tight. In order:

1. **Student page redesign** — three-pane (Emails / Texts / Notes). Reply box embedded. Delete the filter-notice panel. ~1 day of HTML/CSS/JS.
2. **Notes pane + localStorage persistence per persona.** Half day.
3. **Student → Trainer ask flow** — `studentAsk`, `trainer_queue`, Action Queue panel on trainer page. Half day.
4. **Trainer Inject Focus panel** — wire up quick-fire grid driven by `inject.quick_fires`, authoring in content bundle for IM-23, IM-26, IM-35, IM-44 (4 representative injects to prove the shape). ~1 day.
5. **Delegation** — `delegateItem`, leader dropdown UI, "← delegated from" strip. Half day.
6. **Observer reminder strip** on trainer Inject Focus. 15 min.
7. **Runtime test updates** — extend `engine_test.js` to cover delegation visibility + trainer_queue round-trip. Half day.

**Defer to v0.3.0:** leader-specific inject content library, failure cascade, backend drag-drop editor, beta mode (Cloudflare relay).

---

## Open questions before I start building

None that block me. Three I'd like you to think about while I code:

1. **Canned response library scope:** how many quick-fire templates per inject? 3? 5? 10? The UI needs to handle it. My default is 3-5 per inject with a "Custom response" escape hatch.
2. **Notes persistence:** per-persona (each student has their own notebook) or per-exercise (one shared notebook)? Current default is per-persona.
3. **Delete old white cell grid** entirely, or keep it as a fallback "global" panel for things like "push a curveball to everyone regardless of inject"? My default is delete it — the Inject Focus panel covers all its cases.

I'll proceed with the defaults unless you tell me otherwise.
