# Email Automation — ICM Build Outline (client example)

> Outline-only blueprint for a two-part email system on the ICM three-layer architecture: an Outlook triage router that splits inbound mail into two buckets, and a drafting agent whose voice is mined from her own sent items — built to be drawn in Eraser, not shipped.

**Last updated:** 2026-09-21
**Category:** Projects / AI Automation Business
**Tags:** icm, email-automation, outlook, voice-cloning, skill-chains, client-artefact, outline

## 0. What this is

A demo artefact. Nothing here is built. It is the architecture you put on screen in Eraser
during the call so the prospect sees a system instead of hearing "AI can do emails".
Section 9 is the diagram-as-code — paste it straight into Eraser.

**Scope note on ICM:** the wiki carries the three documented layers (map → rooms → tools).
The five-layer version lives in the ICM paper, which is *not* in the database — the raw
source (`raw/to ingest/folder_architecture.md:328`) only has a `[ ICM PAPER ]` placeholder.
Everything below is built on the three layers that are actually documented, which are also
the three that matter for this build. If she asks about the other two, say the paper exists
and offer to send it — do not improvise them on the call.

## 1. The client brief, restated

| She said | It means |
|---|---|
| "Automate my emails" | Two separate systems, not one. Triage ≠ drafting. |
| "Sort incoming into two categories" | A **branch graph** on inbound Outlook mail |
| "Pull my contacts, write like me" | A **diamond graph** mining her sent corpus into a voice profile |
| "Make 50-year-old CEOs go fuck themselves, corporately" | A register spec (§7). This is the actual product. |

The last row is the one that sells. Everyone sells triage. Nobody sells a calibrated
register that lets her say no to a condescending CEO without burning the relationship —
and that capability is only possible *because* the voice profile exists.

## 2. ICM applied to an inbox

| ICM layer | Generic role | In this build |
|---|---|---|
| **Layer 1 — The Map** | `CLAUDE.md` at root: what this is, folder structure, naming, routing table | `/email-os/CLAUDE.md` — routes every task to one of three rooms, never loads all three |
| **Layer 2 — The Rooms** | Per-workspace context files, loaded only when entering | `/triage`, `/voice`, `/drafting` — each with its own context file |
| **Layer 3 — The Tools** | Skills + MCP servers, wired per room, not globally | Outlook MCP, `classify-email`, `extract-voice`, `draft-reply`, `corporate-register`, `qa-check` |

The whole point of the layering here is token economy and blast radius: when the router
classifies an inbound email it must **not** have her voice profile, her contact history or
the drafting SOP in context. It reads a 40-line context file and two category definitions.
That is the difference between a system that costs pennies per email and one that reloads
her life story 200 times a day.

## 3. Layer 1 — The Map (`/email-os/CLAUDE.md`)

Contents, in order:

1. **Identity** — who she is, what the company does, who she writes to.
2. **Folder structure** — the tree in §8.
3. **Routing table** — the single most important object in the build:

| Task | Go to | Read | Skills |
|---|---|---|---|
| New email arrives | `/triage` | `triage_context.md`, `categories.md` | `classify-email` |
| Rebuild / refresh voice | `/voice` | `voice_context.md` | `extract-voice` |
| Draft a reply | `/drafting` | `drafting_context.md`, `voice-profile.md` | `draft-reply`, `corporate-register`, `qa-check` |
| Anything else | stop | — | ask her |

4. **Naming conventions** — replaces a database (§8). `2026-09-21_acme-ceo_thread-04_v2.md` tells
   the agent the date, the counterparty, the thread and the revision with zero lookups.
5. **Hard rules** — never send without approval (phase 1-2), never invent a commitment,
   never touch a thread not in `/threads`.

## 4. Layer 2 — The Rooms

### `/triage` — the router
Context file describes: the two categories, the tie-break rule, what to do at low confidence,
and where the classified thread gets filed. ~40 lines. No voice, no history, no client files.

### `/voice` — the mining room
Context file describes: which corpora to read (sent items, contact list, prior threads), what a
voice profile contains, and the refresh cadence. Runs rarely — weekly, or on demand.

### `/drafting` — the writing room
Context file describes: the drafting process (read thread → pick register → draft → QA → stage),
the register ladder, and what "done" looks like. Loads `voice-profile.md`. This is the only
room that ever sees her full voice.

## 5. Layer 3 — The Tools

| Tool | Type | Wired into | Job |
|---|---|---|---|
| Outlook connector | MCP | triage, voice, drafting | read inbox, read sent items, read contacts, write drafts to her Drafts folder |
| `classify-email` | skill | triage | one email in → one category + confidence out |
| `extract-voice` | skill | voice | corpus in → `voice-profile.md` out |
| `corporate-register` | skill | drafting | the register ladder (§7); picks a level, enforces it |
| `draft-reply` | skill | drafting | thread + profile + register → draft |
| `qa-check` | skill | drafting | verifies no invented facts, no commitments she didn't make, register matches intent |

`qa-check` is not optional. It is the documented antidote to the eager-junior failure mode —
the agent that fakes a fact to finish the task. On a system that writes *in her name* to *her
CEOs*, one fabricated commitment is the end of the engagement. Put it in the diagram; it is a
trust feature and it reads as one.

## 6. Workflow A — inbound triage (branch graph)

```
Outlook inbox
  → Capture (new mail event)
  → classify-email  ──┬─→ Category A: NEEDS HER VOICE   → /drafting queue
                      └─→ Category B: DOESN'T           → digest / archive / auto-ack
  → low confidence   ──→  Ask her (one line, one tap)
```

**The two categories.** Do not define them as "important / not important" — that is a
judgment call the agent will get wrong and she will never trust. Define them by *what happens
next*, which is objective:

- **A — Needs her voice.** A human is waiting for a reply only she can give: decisions,
  negotiations, pushback, relationship mail, anything from a named counterparty in her contacts.
  → routes into Workflow B.
- **B — Doesn't.** Newsletters, notifications, automated mail, cc-only threads, scheduling
  that a calendar rule can settle, FYIs. → daily digest, auto-acknowledge, or file.

Tie-break rule: **when in doubt, A.** A false A costs her three seconds of reading. A false B
loses a client.

**Confidence gate.** Below threshold the agent does not guess — it asks. Her corrections are
written back into `categories.md`, so the router gets sharper every week instead of staying
as good as the day it shipped. Show this loop in the diagram; it is what makes it a system
rather than a filter.

**Graph note:** classification is a genuine chain — each step needs the previous one's output,
so the wait test justifies the sequence. Say that on the call if someone asks why it isn't
parallel. It signals you know the difference.

## 7. Workflow B — the voice agent (diamond graph)

### 7a. Mining (runs weekly, fan-out then merge)

Three corpora read in parallel — none of them needs the others' output, so they fan out:

```
Sent Items (12-24 months)  ─┐
Contacts + relationship map ─┼─→ merge → voice-profile.md
Prior thread archive       ─┘
```

What each contributes:
- **Sent items** — the voice itself: sentence length, openers, sign-offs, how she says no, how
  she says yes, punctuation habits, what she never writes.
- **Contacts** — the *relationship map*: who gets warmth, who gets formality, who gets the
  short version. This is the half everyone skips, and it is why most "write like me" tools
  sound like her writing to a stranger every time.
- **Prior threads** — the receipts: the specific phrase a counterparty used six months ago that
  the agent can call back to. This is what makes output look human-crafted.

**Failure mode to name out loud:** parallel miners can't see each other, so each will
happily report a "tone" the others contradict. The merge step is where that gets reconciled —
it is a real step with a real job, not a join.

### 7b. `voice-profile.md` — the artefact

The deliverable she can read, edit and own. Roughly:

- **Register ladder** — levels 1-4 (below)
- **Signature moves** — her three openers, her two sign-offs, her tells
- **Never-list** — words and constructions she does not use (this does more work than the do-list)
- **Relationship map** — contact → default register
- **Worked examples** — 2-3 real sent emails per level, unedited

She edits this file directly. No retraining, no fine-tune, no black box. That is the pitch:
*you own the file that defines your voice.*

### 7c. The register ladder — the "corporately" part

This is the product. Four levels, each with an explicit trigger and an explicit ceiling:

| Level | Name | Use when | Shape |
|---|---|---|---|
| 1 | **Warm** | Peers, good relationships, no friction | Default voice |
| 2 | **Firm** | A boundary needs stating once | States the position, no justification stack, no apology |
| 3 | **Cold professional** | He's condescending, talking over her, or relitigating a settled point | Shorter sentences. Facts and dates. Zero warmth markers. Restates what was agreed, in writing, on the record. |
| 4 | **On the record** | Repeat offender, or he's building a paper trail against her | Timeline of what was agreed and when. Names the gap between his claim and the record. Closes with a specific ask and a date. Ccs no one — yet. |

Level 3-4 is the "go fuck yourself, corporately" she's asking for, and the mechanism is not
insults — it is **removing warmth and adding the record**. A fifty-year-old CEO who gets back
four sentences of dated facts with no "just checking in!", no exclamation mark and no softener
knows exactly what he's been told. And she can forward it to legal without flinching.

**Hard ceiling in the skill:** no insults, no sarcasm, no profanity, nothing she wouldn't want
screenshotted. The skill enforces it so she never has to. Say this to her explicitly — it is
what makes level 4 safe to ship.

**Escalation is never automatic.** The agent proposes a level and says why; she confirms.
Auto-escalation is how you lose a client by Tuesday.

## 8. Folder tree

```
email-os/
  CLAUDE.md                   ← Layer 1: map + routing table + naming + hard rules
  triage/
    triage_context.md         ← Layer 2
    categories.md             ← the two definitions + corrections written back
    log/2026-09-21.md         ← what was classified, how, confidence
  voice/
    voice_context.md          ← Layer 2
    voice-profile.md          ← THE artefact she owns
    corpus/                   ← mined sent items, deleted after extraction
    relationship-map.md
  drafting/
    drafting_context.md       ← Layer 2
    threads/
      2026-09-21_acme-ceo_thread-04_v2.md
    staged/                   ← drafts awaiting her approval
  skills/                     ← Layer 3
    classify-email/  extract-voice/  corporate-register/  draft-reply/  qa-check/
```

Naming convention does the database's job: `YYYY-MM-DD_counterparty_thread-NN_vN.md`. She can
say "pull the Acme thread, v2" and the agent knows where to look with no index and no search.

## 9. Eraser diagram-as-code

Paste into a new Eraser diagram. Two diagrams — architecture first, then the triage flow.

### 9a. Architecture

```
title Email OS — ICM Architecture

Outlook [icon: mail, color: blue] {
  Inbox [icon: inbox]
  SentItems [icon: send]
  Contacts [icon: users]
  Drafts [icon: edit]
}

Layer1 [label: "Layer 1 — The Map", icon: map, color: purple] {
  CLAUDEmd [label: "CLAUDE.md\nrouting table + naming + rules"]
}

Layer2 [label: "Layer 2 — The Rooms", icon: folder, color: green] {
  TriageRoom [label: "/triage\ntriage_context.md\ncategories.md"]
  VoiceRoom [label: "/voice\nvoice-profile.md\nrelationship-map.md"]
  DraftingRoom [label: "/drafting\ndrafting_context.md\nthreads/"]
}

Layer3 [label: "Layer 3 — The Tools", icon: tool, color: orange] {
  ClassifySkill [label: "classify-email"]
  ExtractSkill [label: "extract-voice"]
  RegisterSkill [label: "corporate-register\nL1 warm → L4 on the record"]
  DraftSkill [label: "draft-reply"]
  QASkill [label: "qa-check", color: red]
}

Human [label: "Her\napprove / edit / correct", icon: user, color: red]

Inbox > CLAUDEmd: new mail
CLAUDEmd > TriageRoom: route
TriageRoom > ClassifySkill
ClassifySkill > DraftingRoom: Category A — needs her voice
ClassifySkill > Human: low confidence — ask
SentItems > VoiceRoom: mine
Contacts > VoiceRoom: mine
VoiceRoom > ExtractSkill
ExtractSkill > DraftingRoom: voice-profile.md
DraftingRoom > RegisterSkill
RegisterSkill > DraftSkill
DraftSkill > QASkill
QASkill > Human: staged draft
Human > Drafts: approved
Human > TriageRoom: corrections write back
```

### 9b. Triage flow

```
title Inbound Triage — two categories

Start [shape: oval, label: "Email arrives"]
Classify [shape: diamond, label: "Needs her voice?"]
CatA [label: "A — NEEDS HER VOICE\ndecisions, negotiation,\npushback, named contacts", color: green]
CatB [label: "B — DOESN'T\nnewsletters, notifications,\ncc-only, scheduling", color: gray]
Confidence [shape: diamond, label: "Confidence\nabove threshold?"]
Ask [label: "Ask her\none line, one tap", color: red]
Draft [label: "→ drafting chain", color: blue]
Digest [label: "→ daily digest / archive"]
Learn [label: "write correction\nto categories.md", color: purple]

Start > Confidence
Confidence > Classify: yes
Confidence > Ask: no
Ask > Learn
Learn > Classify
Classify > CatA: yes (tie-break → A)
Classify > CatB: no
CatA > Draft
CatB > Digest
```

## 10. Guardrails to show her (this is what closes)

- **Nothing sends itself.** Phase 1 and 2, every draft lands in her Outlook Drafts folder. She
  presses send. Auto-send is a later conversation, per-category, opt-in.
- **`qa-check` on every draft.** No invented facts, no commitments she never made, register
  matches intent. Verified against the thread, not against the model's memory.
- **Her corpus is read, not retained.** `voice/corpus/` is wiped after extraction; the profile
  is a human-readable markdown file, not a fine-tune.
- **She owns the voice file.** Open it, edit it, delete a line. It takes effect on the next draft.
- **Escalation is always confirmed.** The agent proposes level 3 or 4 and says why. Never escalates alone.
- **Hard ceiling on level 4.** No profanity, no sarcasm, nothing screenshot-unsafe. Enforced in
  the skill, not in her self-control at 11pm.

## 11. Phasing (what you'd actually quote)

- **Phase 0 — Diagnostic.** Read 30 days of her inbox with her in the room. Draft `categories.md`
  together. Deliverable: the two category definitions + a classification accuracy baseline.
- **Phase 1 — Triage live.** Layers 1-2 + `classify-email`. Nothing writes yet. She corrects for
  two weeks; the router converges. Deliverable: sorted inbox + a weekly accuracy number.
- **Phase 2 — Voice profile.** Mining chain + `voice-profile.md`. Deliverable: the file, reviewed
  line by line with her. She'll want to edit it — that's the sign it worked.
- **Phase 3 — Drafting, staged.** Full chain into Drafts, approval every time. Deliverable:
  measured minutes saved per day and an edit-rate on drafts.
- **Phase 4 — Selective autonomy.** Category B auto-handled. Level 1 replies to a named
  whitelist auto-staged. Levels 3-4 never leave the approval gate.

Phases 0-1 are sellable on their own and prove the thing works before she trusts it with her voice.

## 12. Talking points for the call

- Lead with the triage accuracy loop, not the voice agent. Triage is provable in two weeks.
- The voice agent is the upsell, and `voice-profile.md` — a file she can open and edit — is what
  makes it credible where "AI that writes like you" is not.
- The register ladder is the emotional sell. Do not sanitise it in the room: she told you the
  problem in plain language, name it back to her in plain language, then show her that the
  system's answer is *discipline*, not venom. Four dated sentences with no warmth is more
  devastating than anything she'd type angry, and she can forward it to legal.
- If she asks "why folders and markdown instead of a tool": because she can read every file,
  edit any of them, and leave with the whole system if she fires you. That's a feature you can
  charge for, not a limitation to apologise for.

## Cross-References

- [[graph-engineering]] — the branch (triage), diamond (voice mining) and chain (drafting) shapes used here, and the wait test behind §7a
- [[skill-chains]] — the drafting chain and the mandatory `qa-check` step; triggers fire chains instead of humans
- [[context-layer-company-brain]] — capture → curate → store → execute → experience; the triage loop is the curate step and her corrections are the experience loop
- [[agentic-ai-context-management]] — why each room loads only its own context
- [[agentic-ai-skill-building]] — build each skill by doing the work interactively first, then codifying
- [[sell-outcomes-not-ai]] — sell "your inbox is sorted and CEOs stop steamrolling you", never "an ICM architecture"
- [[2026-08-25-playbook-offre-et-pricing]] — structure the phases as priced blocks; the amount is the adjustable variable

## Sources

- [`../../../raw/to ingest/folder_architecture.md`](https://github.com/El-Rudi-33/personal-assistant/blob/main/Research/raw/to%20ingest/folder_architecture.md) — the three-layer routing system (map / rooms / tools), naming-conventions-as-database, the `[ ICM PAPER ]` placeholder at line 328
- [[context-layer-company-brain]], [[skill-chains]], [[graph-engineering]] — wiki pages, already sourced

## Open Questions

- **The ICM paper is not in the database.** Only the three documented layers are. If the demo
  needs the five-layer version, the paper has to be ingested first.
- **How does the Outlook connector actually authenticate?** Graph API app registration vs
  delegated user consent changes the IT conversation completely, and on a corporate tenant her
  admin may simply say no. Confirm before quoting phase 1.
- **GDPR on mining her mailbox.** Her sent items contain third-party personal data. Where does
  the corpus live during extraction, who else is in the tenant, and does her company have a DPO
  who needs to sign off? Not blocking for the demo, blocking before phase 2.
- **Who is "she" writing to?** The relationship map is only as good as the contact list. If her
  real counterparties live in a CRM rather than Outlook contacts, §7a needs a fourth corpus.
- **The two categories are a placeholder.** They get defined with her in phase 0, from her
  actual inbox. Present §6 as the shape, not the answer.
