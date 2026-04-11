# CCO Capstone Exercise Engine — v0.2.5

## What changed in v0.2.5 (Apr 2026)

**BUGFIX: content now loads from `file://`.** This was the root cause of the
"no contact dropdown" and "phone shows 0 contacts" symptoms in v0.2.4. Chrome
blocks `fetch()` on `file://` URLs for security reasons, so when you
double-clicked `index.html` the engine could never actually load
`contacts.json`, `injects/*.json`, or `phone-scripts/*.json` — they all failed
silently and `state.contacts` stayed empty, which is why the trainer's custom
SMS modal had no contact cards and the phone couldn't render any threads. The
"Quick test (Ramsey)" button worked because it hardcoded `'ramsey'` and
bypassed the contacts array entirely — which is why SMS arrived on the phone
but Messages stayed empty.

The fix: content now loads as an inline JS bundle (`content/content-bundle.js`)
that the HTML pulls in before `engine.js`. The bundle assigns everything to
`window.__CCO_DATA`. The engine's `loadContacts` / `loadInjects` /
`loadPhoneScript` all check that global first and fall back to `fetch()` only
if it isn't present (so the repo still works from a local server too). If you
ever edit the JSON files directly, regenerate the bundle — see
`content/content-bundle.js` header for the script.

The mobile debug drawer now shows `content source: inline` in green when the
bundle is active. If you ever see `content source: fetch` or `content source:
none` with load errors, the bundle didn't load.

**Theme split.** Trainer and student views now read as visually distinct
environments instead of clones of each other. Mobile stays neutral.

- `trainer.html` — **AF Institutional** theme. Deep navy base, USAF blue
  accent, silver hairlines. Reads as HQ / wing-ops.
- `student.html` — **Deployed Terminal** theme. Warm coyote base, amber
  accent, OCP sage for "good" states, faint CRT scanline overlay. Reads
  as a ruggedized laptop in an expeditionary b-hut.
- `mobile.html` — unchanged (stays the neutral dark UI).

The themes are additive overrides scoped to `body.trainer-body` and
`body.student-body` appended to `trainer.css` and `student.css` respectively.
Nothing in `styles.css` or `engine.js` was touched. Revert is `git checkout`
on those three files plus the two body-tag changes.

**Debug drawer on mobile.** There's now a persistent orange **DBG** button
in the bottom-right corner of `mobile.html`. Tap it (or triple-tap the sync
dot in the status bar) to open a diagnostic panel that shows:

- `readOnly`, `running`, `paused` engine flags
- Exercise clock + wall/exercise ratio
- Contact count, inbox count, total SMS count, pending SMS count, thread map
- Raw `smsThreads` JSON
- Raw `inbox` JSON
- Last 20 engine events (`sync`, `sms-received`, `inbox-updated`, `inject-fired`)
- localStorage snapshot size and age

If a sync bug pops up again, open this drawer on the phone, start STARTEX
on the trainer window, and watch which of these numbers doesn't match
what's on the trainer side. "Copy JSON" dumps the whole diagnostic payload
to the clipboard so you can paste it back into chat.

---

# CCO Capstone Exercise Engine — v0.2

===============================================================
⚠️  EXTRACT THE ZIP FIRST. DO NOT OPEN FILES FROM INSIDE THE ZIP.
===============================================================

If you try to open `index.html` directly from inside the ZIP (by double-clicking
it in Windows Explorer while the ZIP is still zipped), Windows will extract a
temporary copy without the CSS files and you will see unstyled text. This is
what happened in v0.1.

**The right way:**
1. Right-click the ZIP → "Extract All..." → pick a real folder (e.g. `C:\Users\nickh\OneDrive\Contracting Website\CCO-Capstone`)
2. Open that folder
3. Double-click `index.html`

===============================================================


## What this is

A browser-based prototype of a Contingency Contracting Officer (CCO) capstone
exercise engine. Four views, one shared engine, one shared content library.
Runs offline from a single folder. No install. No server.

Built for AFICC/KQ as a Tier I CCO training tool.


## The four views

**1. `index.html` — System Overview**
The sales page. First thing to show anyone you're briefing. Explains the
problem, the three products, and how they connect. Use this for screenshots.

**2. `startex.html` — STARTEX configuration**
Set difficulty, roster, loadout modifiers, and exercise length. Hit STARTEX
and the clock starts.

**3. `trainer.html` — Trainer dashboard (the cockpit)**
Master clock, inject timeline, active feed with teaching points and phone
scripts, white cell controls (including custom SMS), inbox mirror, TLO coverage.

**4. `student.html` — Student workstation**
Desktop home screen look with an Outlook-style mail panel, ambient widgets
(clock, Tarkana weather, Wing Ops status), a notification activity feed, and
pushed document tray. Display-only — students do their actual work in real Word,
Excel, and whatever else they'll have downrange.

**5. `mobile.html` — Phone PWA**
The hero feature. Phone-framed view with a home screen, Messages app with
per-contact SMS threads, and Mail. When the trainer fires an inject, the phone
buzzes. Install to home screen to demo on a real phone.


## How to demo it (the pitch)

This is the 60-second demo:

1. **Open three browser windows side by side:**
   - Window 1: `trainer.html` (full size — this is your cockpit)
   - Window 2: `student.html` (half width)
   - Window 3: `mobile.html` (narrow, so the phone frame shows)

2. **Hit STARTEX.** (First time, you'll be redirected to the config screen.
   Accept the defaults and hit the STARTEX button.)

3. **Watch IM-01 fire immediately** at D1 08:00.
   - Trainer dashboard: shows the active inject with a pulsing indicator,
     expected actions, teaching point, wrong answers, and the "what really
     happened" war story.
   - Student workstation: two emails land in the inbox (Morales's portfolio
     notes, Captain Perez's welcome).
   - Mobile: mail badge shows "2", notifications list populates.

4. **Wait ~5 seconds** and IM-02 fires.
   - Trainer: new active card, with a "Phone script" button — click it to
     see the full branching Morales turnover call script.
   - Mobile: **3 minutes later** (or immediately if you scale the clock) a
     phone toast slides down — Col Ramsey just texted. Three terse messages.

5. **Click into the Messages app on the phone.** You'll see the thread with
   Ramsey's messages in iMessage-style bubbles.

6. **From the trainer view, click "Send SMS" in the White Cell Controls.**
   Pick a contact, type a custom text, hit send. It appears on the phone
   immediately in that contact's thread.

**The pitch in one sentence:** "This happens, and now look at the phone —
here's what's happening on their device."


## What works in v0.2

- All four views styled to the Direction A aesthetic (modern defense
  contractor — deep navy, single cyan accent, hairline dividers, typographic
  hierarchy)
- Overview / sales page with hero, three-product grid, architecture diagram
- STARTEX config with reskinned roster, difficulty, loadout modifiers
- Trainer dashboard with big clock, timeline, active feed, modals for:
  - Expected actions
  - Phone scripts (branching Morales call)
  - Teaching points
  - Wrong answer walkthroughs
  - "What really happened" war stories
- White cell custom SMS — trainer picks a contact, types a message, student
  phone receives it instantly
- Student workstation with Outlook-style mail, ambient widgets, notification
  feed, pushed docs tray, quick contacts
- Mobile PWA with:
  - Phone-frame styling (looks like a phone on your desktop)
  - Home screen with Wing Ops widget and app dock
  - Messages app with per-contact threads and iMessage-style bubbles
  - Mail app with list and detail views
  - Phone toast notifications that slide down from the top
  - Cross-window state sync (opening the phone view and the trainer view in
    separate windows, they stay in sync via localStorage + storage events)
- Engine extended to handle SMS items with delayed delivery
- 2 injects: IM-01 (shop inventory handoff) and IM-02 (outgoing CCO phone
  call with embedded ethics trap + Ramsey SMS burst)
- 1 branching phone script (Morales turnover call)
- 6 contacts with distinct tones (Ramsey terse, Dooley crusty, Perez formal,
  Villanueva chill, Haddad professional, group chat)


## What doesn't work yet (honest scope note)

- Only 2 injects. The full exercise needs ~38.
- No actual PWA service worker for offline install — the manifest is there
  and the phone frame will hide its desktop chrome if you add to home screen,
  but push notifications won't work without a real server.
- No hotwash / scoring mode. ENDEX just stops the clock.
- White cell email and doc push are stubbed.
- Curveball inject library is stubbed.
- No audio. The phone doesn't make sounds when messages arrive.
- Timeline shows max 2 injects because that's what's loaded.

None of this blocks the demo. For the sales pitch, 2 injects is enough to
show the full cycle of fire → cascade → teach → score.


## How the architecture works

**Content layer:** JSON files in `/content/`. Injects, phone scripts, contacts,
scenario bible. Adding a new inject is a new JSON file — no code changes.

**Engine layer:** `js/engine.js`. Clock, scheduler, state. Uses localStorage
to persist state and the browser's `storage` event to sync between open
windows. When the trainer window writes state, the student and mobile
windows hear the storage event and re-render.

**View layer:** Each view (`trainer.html`, `student.html`, `mobile.html`) has
its own CSS and JS but all read from the same engine. Adding a new view is
adding a new HTML file that imports engine.js.

**Design system:** `css/styles.css` holds all the tokens — colors, typography,
buttons, panels, modals. Each view has its own CSS file that extends the
base. If you want to change the aesthetic across all views, you change
variables in `styles.css`.


## Known gotchas

- **Clock ratio is 1:1.** Each real second = one exercise second. So if IM-02
  schedules a 3-minute SMS delay, you wait 3 real minutes. If you want to
  test the cascade faster, the clock ratio lives in `engine.js` as
  `wallToExerciseRatio`. Change to `60` to make each real second = 1
  exercise minute.
- **State persists across reloads.** Hitting refresh on the trainer page does
  NOT reset the exercise. You have to hit the "Reset" button (top right) or
  clear `cco-capstone-state` in localStorage.
- **Cross-window sync requires same origin.** Opening `file:///C:/...` paths
  should work because all views are on the same folder, but if you
  accidentally open some from a different location it won't sync.


## Troubleshooting

**"Nothing happened on the phone."**
Check the sync dot in the top-left of the phone status bar (next to the clock):
- **Green** = connected to exercise state, all good
- **Red** = no exercise state found. Start STARTEX on the trainer view first, then refresh the phone window.
- **Cyan pulse** = an event just arrived (happens when the trainer fires an inject or sends a custom SMS)
- **Grey** = initial state, not yet loaded

**Order matters the first time:**
1. Open `trainer.html` first
2. Hit STARTEX through the config screen
3. THEN open `mobile.html` and `student.html` in additional windows
4. The phone and student views will read the existing exercise state on load

If you open the phone window BEFORE starting the exercise, hit browser refresh (F5) on the phone window after STARTEX.

**Want to test the white-cell custom SMS right now?**
1. Trainer view → White Cell Controls grid → "Send SMS" button
2. Pick a contact, type anything, hit Send
3. Watch the phone window - sync dot should pulse cyan, toast slides from top
4. If nothing happens, check the browser console on both windows for errors

**Clock runs 10x real-time by default** (v0.2.1) so scheduled texts like Ramsey's 3-minute delay after IM-02 arrive in ~18 real seconds instead of 3 real minutes. If you want strict 1:1 real time, change `wallToExerciseRatio: 10` to `wallToExerciseRatio: 1` near the top of `js/engine.js`.


## Changelog — v0.1 → v0.2

### v0.2.1 (hotfix)
- **Fixed dropdown text invisible on dark background.** Custom SMS modal select now styles option elements explicitly.
- **Clock runs 10x real-time by default** so scheduled SMS delays feel instant during demos. Ramsey's 3-minute delay after IM-02 now arrives in ~18 real seconds.
- **Added sync indicator** to mobile view status bar (tiny dot next to clock). Green = connected, red = no state found, cyan pulse = event received.
- **Added safety poll** to mobile and student views. Re-reads state every 1.5s as a backup to the cross-window storage event in case an event is missed.

### v0.2 initial
- **Rebuilt the entire visual system.** v0.1 was the olive/amber tactical
  ops look. v0.2 is the Palantir-style modern defense contractor
  aesthetic — dark navy, cyan accent, typographic hierarchy, hairline
  dividers. Every view is reskinned.
- **Added the mobile PWA view** — the hero feature. Phone-framed Messages app.
- **Added the student workstation view** with Outlook-style mail, ambient
  widgets, notification feed.
- **Added the System Overview page** as a sales / briefing artifact.
- **Extended the engine** to handle SMS items with delayed delivery and
  cross-window sync.
- **Added the contact library** with 6 personas, each with distinct texting
  tones.
- **Added the white cell custom SMS tool** so trainers can improvise texts
  on the fly.
- **Fixed v0.1 bugs:** IM-01 and IM-02 used to fire at the same timestamp;
  they're now staggered 5 minutes apart.


## Feedback to send back

- Does the aesthetic hit the "I'd brief this to a one-star" bar?
- Is the demo flow clear from the overview page?
- Does the phone frame sell the concept when you open mobile.html in a
  browser window on your laptop?
- Any inject content that doesn't ring true to a deployed CCO?
- What should IM-03 through IM-10 be?
