# FD Learn — course architecture and skeleton

**Property:** `fd.antidotetransform.com` → `/transformation/resources/learn`
**Local:** `~/Desktop/antidote ai/app/mock/forward-deployed/learn-modules.ts`
**Status:** built. This document is the design; §18 records what shipped against it.
**Date:** 2026-09-01 · built same day

---

## 1. What this document is

A skeleton, in the load-bearing sense: the thing the content hangs off, chosen before any paragraph is written so that no paragraph has to carry structural weight it cannot hold.

It answers four questions in order, and the order matters:

1. Who is reading, and what must be true of them at the end.
2. What is the smallest set of mechanisms from which everything else they need is *derivable* rather than memorized.
3. What order those mechanisms can be learned in, given that some genuinely require others.
4. What each lesson has to do — the thesis, the misconception it kills, the depth it stops at, the thing the reader manipulates, and the check that proves it landed.

Everything downstream — copy, widgets, assessment, the shape of the nav — is a consequence of those four. Where this document and a draft disagree, this document is the one that was reasoned about.

---

## 2. The reader, and the job

**ICP:** PE partners, operating partners, and the operators inside portfolio companies — CEO, CFO, COO, and the functional leaders who will actually be handed an AI mandate. Deal teams as a secondary.

**Tone:** written for anyone. No "as an investor, you…" Never address the ICP directly. The priming comes entirely from the examples — a queue, an invoice, a claims packet, a vendor call, a board slide — not from the second person. A smart generalist should be able to read every lesson and feel it was written for them. A partner should finish it holding instruments they can use on Monday.

**The end state, stated as capability, not coverage.** After the course a reader can:

- Take any sentence containing the word "AI" and say what kind of system it names, what its output is, how it fails, and who owns it.
- Explain *why* a model hallucinates, *why* it forgets, and *why* it costs what it costs, from mechanism — not from analogy.
- Look at a working demo and name the five things that are missing before it is a system.
- Decide whether a given piece of work is a candidate at all, and if so whether it wants a rule, a workflow, a copilot, or an agent.
- Design the evidence: what to freeze, what to score, what to sample, what number would change their mind.
- Price it — cost per completed unit against loaded labor — and know which line dominates.
- Sit in a vendor meeting or a management presentation and ask the four questions that separate a system from a screenshot.

**The anti-goal.** Not a survey. Not vocabulary. A reader who can recite "RAG, MCP, RLHF, quantization" and cannot tell you why a summarizer drops the invoice amount has learned nothing this course is for.

---

## 3. What exists today, honestly

Twenty-two units, six parts, ~380 minutes (6.3h), shipped as a docs reader: left nav grouped by part, article with sections, a `mixup` (wrong/right) block, two or three `check` Q&A pairs, a `next` link, and cross-links into the 20-item use-case library.

**What is already right, and should not be rebuilt:**

- **The spine of the argument.** Four jobs → closed vs open output → next-token → windows → grounding → models → tools → agents → harness → control → evidence. That is very close to the correct derivation order. Most courses in this space are topic lists; this one already has a thesis.
- **The `mixup` field.** A per-unit named misconception is the single best structural idea in the current build. It should be promoted from a block at the bottom to the *reason the lesson exists*.
- **The running invoice.** `Invoice 8812 / Acme / $14,200 / PO 4501 / missing goods receipt` appears in unit 1 and then largely disappears. It should run the whole course.
- **The refusals.** "Copilot seats are not a queue." "A benchmark is not your eval." "An org chart of agents is theater." These are the load-bearing sentences and they are correct.
- **Cross-links to use cases.** `relatedUseCases` is the right coupling between the abstract and the concrete.

**What is missing or wrong:**

| Gap | Why it matters |
|---|---|
| Linear chain, no graph | `next` is a single pointer. There is no prerequisite structure, so no placement, no alternate paths, no "you can skip this," no diagnosis of *which* earlier idea a wrong answer implies is missing. |
| No mastery mechanics | `check` is a Q&A pair with the answer printed next to it. Nothing is graded, nothing is gated, nothing is revisited. Reading is not learning. |
| Nothing to manipulate | Every mechanism is asserted in prose. Attention, sampling variance, lost-in-the-middle, error compounding, and eval sensitivity are all things a reader could *see* in ten seconds and instead has to take on faith. |
| Depth is uneven | Some units stop too early to support their own conclusions (attention is named, never shown to imply anything); some spend length on distinctions that change no decision. |
| ~6h against a 15–25h ambition | The current build is a strong outline of a longer course. |
| No application layer | Nothing on finding the queue, build-vs-buy, diligencing a claim, the operating model, headcount, the 100-day plan. For this ICP that is the payoff, and it is absent. |
| No liability layer | Guardrails are covered as engineering. Regulation, contracts, insurance, and who is answerable when an allowed write was wrong are not. |
| Prose tics at length | Covered in §12. The style works in a 400-word block and becomes monotone across 380 minutes. |

**Verdict:** keep the argument, keep the refusals, rebuild the vehicle. This is a rewrite of the delivery model and roughly a 2.5× expansion of the content, not a re-outline of the thesis.

---

## 4. First principles: the twelve mechanisms

The design question that generates everything else: **what is the smallest set of true mechanisms from which almost every practical judgment about this technology follows?**

Get these twelve right and several hundred downstream conclusions become derivable. Miss one and the reader is memorizing rules whose reasons they cannot reconstruct — which is exactly the failure state the course exists to prevent, because a rule without its reason does not survive contact with a case it did not anticipate.

| # | Mechanism | What it generates downstream |
|---|---|---|
| **M1** | A generative model maps a token sequence to a distribution over the next token. Sample, append, repeat. | Fluency. Variance. Hallucination. Latency. Why cost is measured in tokens. Why "be careful" is not an instruction a model can follow the way a person can. |
| **M2** | Attention weights every token against every other token in the window. | Why long context costs more than linearly. Why the middle of a long document is attended to worst. Why a tight packet beats a dump. What the 2017 paper actually bought. |
| **M3** | The context window is the entire world of a call. Nothing else exists. The model is stateless between calls. | Memory. RAG. System prompts. Prompt caching. Compaction bugs. Why "the AI learned our business" is almost always false. Why the same question gets different answers on Tuesday. |
| **M4** | Output is either closed (a known set) or open (tokens). | Which jobs need a schema, a validator, or a human before they may write. The single most useful cut in the whole course. |
| **M5** | Capability is baked at training time and spent at inference time. Two different acts, two different bills. | Pretrain vs post-train. Fine-tuning vs context. "Our custom model." Thinking budgets. Distillation. Quantization. Why pinning a version matters. |
| **M6** | Capability is jagged, not a level. | Why one benchmark number predicts nothing about your queue. Why you test on your own work. Why "it's superhuman at X" and "it failed at Y" are both true and not in tension. |
| **M7** | Text can name an action. Software decides whether to run it. | Tool calling. Function schemas. MCP. The entire security surface. The reason 2024–26 is different from 2022 despite no change to M1. |
| **M8** | Put that in a loop with a stop condition and you have an agent. | Error compounding. Step caps. Multi-agent. Planning. Runaway cost. Why an agent that "tries to be helpful" overnight is a design defect, not a personality. |
| **M9** | Reliability lives in the environment around the model, not in the model. | Why the same model succeeds at one company and fails at another. Why "which model" is the least interesting question in the room. The five subsystems. Why demos and systems are different objects. |
| **M10** | Trust is a permission system, not a judgment about the model. | Identity. Allowlists. Gates. Sandboxes. Injection. Blast radius. Egress. Liability. If the harness allowed the write, the company acted. |
| **M11** | A claim about capability is only a claim until there is a frozen set and a scoring rule you can rerun. | Evals vs benchmarks. Contamination. LLM-as-judge and its ceiling. Production sampling. Drift. Autonomy grades. |
| **M12** | The unit is cost per completed unit of work, against the loaded cost of the human doing it today. | Where this is worth doing at all. Why token price is the wrong number. Residual human minutes. The retry tax. What survives if the model were free. |

Every lesson in this course either **introduces one of these twelve**, or **derives from ones already introduced**. A lesson that does neither is a reference page and belongs in a glossary, not in the sequence.

---

## 5. Design rules

**R1 — Derive, do not enumerate.** Every claim traces back to a mechanism the reader already has. Where a lesson cannot derive its claim, it says so and labels it as observed regularity rather than smuggling it in as if it followed.

**R2 — The depth-ceiling rule.** *The depth of a mechanism explanation is set by the shallowest depth at which the practical conclusions still follow.* Not "as simple as possible" — that under-teaches. Not "technically complete" — that over-teaches and loses the reader. It is a specific, checkable test, applied per concept.

Worked: **attention.** The conclusions that must follow are (a) cost grows faster than linearly with context length, (b) the middle of a long window is attended to worst, (c) a tight retrieved packet beats a document dump, and (d) something genuinely changed in 2017. To get all four you need: every token is compared against every other token, comparisons produce weights, weights decide what informs the next prediction, and the count of comparisons grows with the square of the length. You do **not** need softmax, query/key/value projections, positional encodings, multi-head splitting, or a single matrix. Those are the ceiling. Above it, retention drops and no decision improves.

Applied per concept, this is what stops the course from becoming either a glossary or a machine-learning class. Every lesson brief below carries an explicit **Ceiling** where the line is not obvious.

**R3 — One question per lesson.** The title is a question. The lesson is the earning of a one-sentence answer. If two answers are needed, it is two lessons.

**R4 — Misconception-first.** Every lesson names a specific wrong belief that a smart, senior person actually holds. That belief is the reason the lesson exists, and it is stated at the top, not confessed at the bottom.

**R5 — Situation before explanation (Moore Method, adapted).** The reader meets an artifact and must make a call *before* the mechanism is explained. Judgment first, then the machinery that shows why the judgment was right or wrong. This costs almost nothing to implement — it is a reordering of material that already exists — and it is the difference between reading and thinking.

**R6 — One case, all the way through.** Invoice 8812 runs the entire course. Every widget, every worked example, and most assessments operate on the same queue. By the last module the reader has watched one invoice travel from "pasted into a consumer chat tab" to a gated, traced, evaluated, priced production system. The case is the "minimal working state" made literal — and it links straight into the existing `ap-invoice-exceptions` use case.

**R7 — Graph, not chain.** Atoms with prerequisites. The linear reading order is a topological sort of the graph, not the structure itself. This is what buys placement, alternate paths, skip logic, and diagnostic remediation.

**R8 — Mastery, not completion.** A lesson is passed, not read. Checks are binary, no partial credit. A wrong answer routes to the prerequisite atom the error implies is missing.

**R9 — Review by construction.** Later assessments are built to require earlier atoms. Retention becomes a byproduct of forward progress rather than a separate chore the reader will skip.

**R10 — Every lesson ships an instrument.** Not code — a usable object: a question list, a scoring rubric, a checklist, a calculator, a one-page decision tree. Fifty-four lessons, fifty-four instruments. The toolkit is why the tab stays open after the course is finished, and it is the commercial surface.

**R11 — Deterministic interactivity.** Widgets run client-side on recorded model outputs bundled as JSON. No API keys, no per-visitor cost, no flaky assessment, works offline. Where a live call would genuinely be better, the widget degrades to a recorded transcript the reader can perturb.

**R12 — Evidence discipline, applied to ourselves.** Every number in the course carries a date and a source, or is labeled illustrative. A course that teaches evals while asserting unsourced figures refutes itself in front of exactly the audience trained to notice. This is the same invariant the Antidote engine runs on; the course inherits it.

**R13 — Nothing dates faster than a model name.** Model-specific facts live in one dated, swappable appendix. Lesson prose refers to capability *classes* — frontier, mid, small-and-cheap, open-weight — so that a lesson written in 2026 is still true in 2027 with an appendix refresh rather than a rewrite.

---

## 6. What we take from the four inspirations — and what we leave

**`walkinglabs/learn-harness-engineering`** — 14 lectures, 8 cumulative projects on one shared application, organized around "the model is smart, the harness makes it reliable" and a five-subsystem frame (instructions, state, verification, scope, lifecycle).

- **Take:** one question per lecture. The five subsystems as the literal skeleton of Module 5. Cumulative work on a single application so the reader is never re-learning a domain. The insight that failures are environmental, not capability gaps — which is this course's Module 5 thesis and, not coincidentally, the argument in the harness essay already in the Antidote project.
- **Leave:** the developer prerequisite. Its projects assume terminal, git, and a codebase. Our equivalent of a project is a *design* — the reader specifies a harness for the invoice queue and gets scored against a rubric, without writing code.

**`rohitg00/ai-engineering-from-scratch`** — 511 lessons, 20 phases, ~329 hours, explicit prerequisite flowchart, "Build It / Use It" split, every lesson ships a reusable artifact, placement quiz produces a personal `LEARNING.md`.

- **Take:** artifact-per-lesson (R10). The explicit phase-level prerequisite graph. Placement producing a *personal path* rather than a score. The insistence on understanding over API-calling.
- **Leave:** essentially all of the content. That curriculum trains builders from linear algebra up. Ours starts at next-token and never goes below it — the depth-ceiling rule (R2) is precisely the boundary between the two courses. Also leave the scale: 511 lessons is a reference work; 52 is a course someone finishes.

**Knowledge Space Theory (Doignon & Falmagne) / ALEKS** — a domain is a set of items; a knowledge state is the subset a learner has mastered; not all subsets are feasible, because prerequisites constrain them; the *outer fringe* of a state is exactly what the learner is ready to learn next; adaptive questioning narrows the state in far fewer items than the domain size.

- **Take:** the state-and-fringe model. "Ready to learn" as the organizing UI concept instead of a progress bar. Mastery as binary. Wrong answers as *information about the state*, not as failure — this is the idea that turns a quiz into a diagnostic.
- **Leave:** the full probabilistic machinery. ALEKS-grade adaptive assessment needs a validated item bank and a fitted response model; with ~60 atoms and a hand-built bank, we implement a coarse, honest version over the twelve spine mechanisms and we say in the UI that it is coarse. Overclaiming here in front of this audience is worse than not doing it.

**Math Academy** — knowledge graph with encoded prerequisites and postrequisites; diagnostic placement; mastery-based progression; spaced review; *fractional implicit repetition*, where completing advanced work automatically credits the prerequisites it exercised.

- **Take:** fractional implicit repetition, as R9. It is the highest-leverage idea in the entire reference set for an adult professional audience, because adults will not do assigned review. Building module-N assessments to require module-(N−2) atoms means the review happens whether or not anyone opts in.
- **Leave:** daily XP targets and streaks. Wrong instinct for this reader; a partner doing this between meetings needs resumability, not a streak they will break and then abandon the course over.

**Moore Method** — the instructor supplies definitions and the statements of theorems; students produce the proofs; class time is students presenting; almost nothing is told that could be discovered.

- **Take:** R5, situation-before-explanation, at lesson scale. And the clinics (Module 9), which are pure Moore: here is a case, here is what you must produce, the expert answer unlocks only after you commit to yours.
- **Leave:** the purity. A self-paced web course has no room of peers and no instructor to withhold. The compromise: withhold the answer until commitment, then show a worked expert answer *and* the rubric it was scored against — the rubric is the teaching object, and it is also the instrument the reader keeps.

---

## 7. Architecture

```
Course
 └─ Module          8 content modules + orientation + clinics
     └─ Lesson      54 lessons, 18–28 min each
         └─ Atom    115 knowledge items, prerequisite-linked
```

Three levels, no more. The current site's "Parts" become Modules; the current "units" become Lessons; Atoms are new and are the layer the graph, the placement, and the remediation all operate on.

| Module | Lessons | Minutes | Notes |
|---|---|---|---|
| M0 · Orientation & placement | 2 | 25 | Ungraded |
| M1 · The word and the machine | 6 | 128 | |
| M2 · Why it is wrong when it is wrong | 7 | 148 | |
| M3 · How capability is made and bought | 7 | 156 | |
| M4 · From text to action | 8 | 170 | |
| M5 · The harness is the product | 7 | 155 | Heart of the course |
| M6 · Control: permission, not trust | 6 | 132 | |
| M7 · Evidence: how you know it works | 6 | 138 | |
| M8 · Money, and the operating decision | 7 | 162 | ICP payoff |
| M9 · Clinics | 4 | 200 | 45–55 min each |
| **Total** | **54 + 4 + 2** | **1,414 min** | **≈ 23.6 h** |

Fifty-four graded lessons, four clinics, two orientation pieces. Inside the 15–25 h target with the clinics counted honestly rather than as a bonus.

**Derived paths, free once the graph exists.** Each is a *prerequisite-closed subgraph* of the full sequence, not a different course, so a reader who wants more later continues rather than restarts. Exact membership and the closure problem they surfaced are in §8.3.

- **Partner path** — 15 lessons, 5.5 h.
- **Diligence path** — 32 lessons, ~11.8 h. For a deal team with a target to assess.
- **Operator path** — everything, 23.6 h.

---

## 8. The knowledge graph

### 8.1 The spine

Twelve atoms carry the fan-out. These are the twelve mechanisms of §4, and they are what the placement diagnostic targets. Everything else in the graph depends on at least one of them; most depend on two or three.

```
A-NEXTTOKEN ──┬─► A-VARIANCE ──► A-HALLUCINATION ──► A-CALIBRATION
              ├─► A-ATTENTION ──► A-LONGCTX ──┐
              └─► A-OPENCLOSED ─┐             │
                                 │            ▼
A-WINDOW ────────────────────────┴──────► A-GROUNDING ──► A-MEMORY3
   │
   └─► A-CACHE, A-COMPACTION

A-TRAINVSINFER ─┬─► A-POSTTRAIN ──► A-CUSTOMMODEL ──► A-FINETUNE-VS-CTX
                ├─► A-INFERSPEND ─► A-THINKING, A-ROUTING
                └─► A-WEIGHTS ────► A-QUANT, A-OPENWEIGHTS

A-JAGGED ──► A-OWNTEST ──► A-EVALSET

A-TOOLCALL ──┬─► A-CONTRACT ──► A-MCP
             ├─► A-LOOP ──► A-COMPOUNDING ──► A-CAPS
             └─► A-PROPOSE-EXECUTE ──► A-PERMISSION

A-HARNESS ──┬─► A-INSTRUCTIONS, A-STATE, A-VERIFY, A-SCOPE, A-LIFECYCLE
            └─► A-TRACE

A-PERMISSION ──┬─► A-IDENTITY, A-ALLOWLIST, A-GATE, A-SANDBOX
               ├─► A-INJECTION ──► A-CONFUSEDDEPUTY
               └─► A-EGRESS ──► A-LIABILITY

A-FROZENSET ──┬─► A-SCORING ──► A-JUDGE
              ├─► A-CONTAMINATION
              └─► A-SAMPLING ──► A-DRIFT ──► A-AUTONOMYGRADE

A-UNITCOST ──┬─► A-RESIDUAL ──► A-LOOPTAX
             └─► A-BASELINE ──► A-BUILDBUY
```

### 8.2 Rules the graph must satisfy

1. **Acyclic.** Verified by construction: every edge points from a lower module to an equal-or-higher one, and within a module from a lower lesson number to a higher one. No back edges exist in the tables in §9.
2. **No orphans.** Every atom is a prerequisite of something later, or is terminal in a module and is exercised by that module's gate.
3. **Every lesson's prerequisites precede it** in the default topological order. Where a lesson has a prerequisite from a *later*-numbered lesson, the sequence is wrong and the lessons swap. (This is the check that caught two ordering problems in the current build — see §14.)
4. **Fan-out budget.** No lesson introduces more than three atoms. A lesson introducing five is two lessons wearing one title.

### 8.3 Derived paths, and the closure problem the graph exposed

The first draft of a partner path was chosen by intuition — the fourteen lessons that *sound* like what a partner needs: what kind of system is this, is the custom model real, how much autonomy, how do I read a benchmark, what do I demand in diligence. Running it against the prerequisite graph broke it, and the break is instructive enough to keep in this document rather than quietly fix.

**What broke.** Four of the tempting lessons sit deep in the graph:

| Lesson | Pulls in | Cost |
|---|---|---|
| 3.3 Is "our custom model" a model? | 3.1, 3.2 | +44 min |
| 6.2 How much autonomy, for which action? | 2.2, 5.2, 5.5, 6.1 | +90 min |
| 7.5 How do you read someone else's number? | 6.3, 7.3 | +46 min |
| 8.5 How do you diligence an AI claim? | 5.7 | +22 min |

Closing the intuitive path costs 28 lessons and ~11 h — more than twice its advertised length. **A path is only honest if it is prerequisite-closed**, because a lesson read without its prerequisites is exactly the memorized-rule-without-its-reason failure the whole course is built to prevent. So:

**Partner path — 15 lessons, 328 min (5.5 h), closed.**
`1.1 · 1.2 · 1.3 · 1.4 · 1.6 · 2.1 · 2.3 · 2.4 · 4.1 · 4.2 · 4.3 · 4.5 · 5.1 · 7.1 · 7.2`
Terminal goals: *tell what kind of system this is* (1.3), *test capability yourself* (2.3), *know who owns the queue* (4.5), *know what an eval is* (7.2), *know why the harness decides the outcome* (5.1). Finish with Clinic 1, the vendor call.

**Diligence path — 30 lessons, ~11.5 h, closed.** The partner path plus `2.2 · 3.1 · 3.2 · 3.3 · 5.2 · 5.5 · 5.7 · 6.1 · 6.2 · 6.3 · 7.3 · 7.5 · 8.1 · 8.4 · 8.5`. Terminal goals: read a published number, price the unit, judge the moat, demand the artifact. Finish with Clinics 1 and 4.

**Operator path — everything.**

Note what is out of the partner path and why: attention, post-training, quantization, MCP, multi-agent, gateways, sandboxes. None of them changes any of the five judgments above. A partner path containing MCP is a vanity path.

**The design decision this leaves open** (§16): whether to allow *relaxed closure* — admitting a lesson when most of its prerequisites are held, with a two-paragraph inline primer for the rest. That would put 3.3, 6.2, 7.5 and 8.5 inside a 7 h partner path. It is a real option and it has a real cost, which is that the primer is a rule without its reason, dressed as a shortcut.

---

## 9. Module-by-module skeleton

Each lesson brief carries: the **question** the title asks, the **thesis** it earns, the misconception it **kills**, the **atoms** it introduces (prerequisites in brackets), the **ceiling** where the depth line is not obvious, the **widget** archetype (§11), the **instrument** the reader keeps (R10), and what the graded **check** actually tests.

---

### M0 — Orientation *(2 pieces, 25 min, ungraded)*

**0.1 — How this works** · 10 min
Mastery not completion; why there are no videos; why every lesson starts with a question you cannot yet answer; the invoice that runs through everything. Sets the contract: you will be wrong on purpose, early and often, and that is the mechanism.

**0.2 — Placement** · 15 min
~15 adaptive items over the twelve spine atoms. Output is not a score. Output is a **knowledge state** and a **ready-to-learn set**: the lessons whose prerequisites you already hold. Honest framing in the UI — this is a coarse placement over twelve mechanisms, not a psychometric instrument, and it can be overridden by just reading everything.
*Instrument:* your path, as a saved, resumable object.

---

### M1 — The word and the machine *(6 lessons, 128 min)*

*Purpose: the reader stops using "AI" as one word, and acquires the one trick underneath the generative kind.*

**1.1 — Why does "AI" mean something different than it did in 2021?** · 22 min
**Thesis:** the word now defaults to a generative model; for most of computing history it meant scores, labels, and rules, and most of the AI in an operating business is still that older kind.
**Kills:** "we're not an AI company yet" said by a business already running four models in production; and its mirror, "we have AI" meaning a rules engine bought in 2014.
**Atoms:** `A-ERAS`, `A-OLDSTACK` [—]
**Ceiling:** expert systems → statistical ML → neural → transformers, as a story about *what each era needed from you* (rules / labels / neither). No architectures, no dates beyond four.
**Widget:** W8 sorter — twelve real systems from an operating business, sort into era.
**Instrument:** the inventory prompt — six questions that surface the AI a business already runs.
**Check:** given a described system, name its era and what it needed from its owner.

**1.2 — Predict, classify, generate, act: which one is this?** · 22 min
**Thesis:** four jobs, four failure modes, four owners; a single "AI maturity score" averages across objects that have nothing in common.
**Kills:** one maturity number. Copilot seats counted as transformation.
**Atoms:** `A-FOURJOBS` [A-ERAS]
**Widget:** W8 sorter over vendor claims and internal systems.
**Instrument:** the four-jobs tag — a one-line test applied to any claim.
**Check:** four claims, tag each; one is deliberately two jobs stapled together.

**1.3 — Closed or open: what does this thing emit?** · 20 min
**Thesis:** the deepest cut is not the four jobs but whether the output comes from a known set or is unbounded tokens; open output is not a better closed output, it is a different object with a different audit.
**Kills:** "the AI can just do the matching too."
**Atoms:** `A-OPENCLOSED` [A-FOURJOBS]
**Widget:** W8 — take one invoice and split it into its closed parts and its open parts.
**Instrument:** the closed/open split sheet, applied to any workflow.
**Check:** a workflow described in prose; identify which steps must stay closed and why.

**1.4 — What is the model actually doing?** · 24 min
**Thesis:** tokenize, predict a distribution over the next token, sample, append, repeat — that is the whole generative trick, and every property people find surprising is downstream of it.
**Kills:** the model "understands the question and looks up the answer."
**Atoms:** `A-NEXTTOKEN`, `A-TOKENS` [A-OPENCLOSED]
**Ceiling:** tokens are sub-word chunks, the model outputs probabilities, one is chosen. No embeddings, no layers, no training here — that is M3.
**Widget:** **W1 token strip.** Type a sentence; see it chopped into tokens; see the top-8 next-token probabilities; click one to continue. Includes the "$14,2__" moment: watch the amount become a coin flip.
**Instrument:** none (this is a seeing lesson).
**Check:** why does the model produce a plausible PO number instead of refusing?

**1.5 — Why is a long document more than proportionally expensive?** · 22 min
**Thesis:** attention compares every token against every other token in the window, so the work grows with the square of the length and the middle of a long window competes hardest for a fixed budget of weight.
**Kills:** "just paste the whole contract in, the window is huge now."
**Atoms:** `A-ATTENTION`, `A-LONGCTX` [A-NEXTTOKEN]
**Ceiling:** the R2 worked example. Every-token-against-every-token, comparisons produce weights, weights decide what informs the prediction, count grows quadratically. **Not** softmax, Q/K/V, positional encoding, or heads. Name the 2017 paper once, as the thing that made this parallelizable and therefore trainable at scale — one sentence, no equations.
**Widget:** W2 context inspector, comparison mode — the same question answered from a 2-page packet and a 200-page dump, with the amount buried at 15%, 50%, and 85% depth.
**Instrument:** the packet rule — one page on what to put in a call and what to leave out.
**Check:** predict which of three placements loses the number, then check.

**1.6 — Why did it answer differently the second time?** · 18 min
**Thesis:** sampling is a choice among probabilities, so identical inputs produce different outputs by design; "run it again" is a coin, not a control.
**Kills:** treating a good second run as a fix, or a bad one as a fluke.
**Atoms:** `A-VARIANCE`, `A-TEMPERATURE` [A-NEXTTOKEN]
**Widget:** W1, resample mode — run the same invoice question twenty times, see the distribution of extracted amounts.
**Instrument:** the n-of-20 habit — never judge a model on one run.
**Check:** a vendor demo that worked on stage; state what you cannot conclude from it.

*Module gate M1:* eight items drawn from 1.1–1.6, plus two live items that require the sorter from 1.2 applied to material from 1.5.

---

### M2 — Why it is wrong when it is wrong *(7 lessons, 148 min)*

*Purpose: every famous failure mode derived from M1, so the reader stops treating them as defects to be complained about and starts treating them as properties to be engineered around.*

**2.1 — Where does a hallucination come from?** · 22 min
**Thesis:** hallucination is completion with a missing fact; the model is not lying, it is doing the only thing it does, and the fluency of the wrong answer is the same fluency as the right one.
**Kills:** "the newer models don't really hallucinate anymore"; and "tell it not to make things up."
**Atoms:** `A-HALLUCINATION` [A-NEXTTOKEN, A-VARIANCE]
**Widget:** W1 — ask for a fact that is in the window and one that is not; watch the same confident shape appear for both.
**Instrument:** the missing-fact audit — for any prompt, list what the model would have to invent.
**Check:** given a prompt and a context, predict which field will be invented.

**2.2 — Why does confidence tell you nothing?** · 20 min
**Thesis:** fluent, assured prose is a property of the training distribution, not a signal about correctness; a calibrated probability is a different object and you rarely get one.
**Kills:** reading tone as reliability. Also: "it said it was 95% confident."
**Atoms:** `A-CALIBRATION` [A-HALLUCINATION]
**Widget:** W1 — self-reported confidence next to measured accuracy on 20 recorded cases.
**Instrument:** three phrasings that make a model's uncertainty legible, and their limits.
**Check:** why is a self-reported confidence number not an error bar?

**2.3 — Why is it brilliant here and useless there?** · 20 min
**Thesis:** capability is jagged, not a level — a spike next to a hole, with no smooth interpolation between them, so performance on any task predicts almost nothing about performance on a neighbouring one.
**Kills:** "it passed the bar exam, so it can read our contracts."
**Atoms:** `A-JAGGED`, `A-OWNTEST` [A-HALLUCINATION]
**Widget:** W5 eval bench, preview mode — one model across six task types on the same invoice data.
**Instrument:** **the 30-minute capability test** — the single most-used instrument in the course. Twenty of your own cases, one afternoon, before any procurement conversation.
**Check:** design a five-case test for a described workflow; scored against a rubric.

**2.4 — What does the model actually know about your company?** · 22 min
**Thesis:** the context window is the whole world of a call and the model is stateless between calls; nothing you said yesterday exists today unless something put it back.
**Kills:** "it's learning our business as we use it."
**Atoms:** `A-WINDOW`, `A-STATELESS` [A-NEXTTOKEN]
**Widget:** **W2 context inspector.** See a real call's window laid out — system prompt, tools, retrieved packet, history — with a byte budget. Remove a piece, watch the answer change.
**Instrument:** the window ledger — what is in a call, who put it there, what it costs.
**Check:** a chat that "remembered" something; explain the three mechanisms that could account for it.

**2.5 — When does more context make it worse?** · 22 min
**Thesis:** relevance competes; a dump raises the odds that the wrong passage wins the weight, and the middle of a long window is where a needle goes to die.
**Kills:** "bigger window solves retrieval."
**Atoms:** `A-STUFFING`, `A-MIDDLE` [A-WINDOW, A-LONGCTX]
**Widget:** W2 — needle placement drill.
**Instrument:** the packet checklist (extends 1.5's).
**Check:** given four candidate context designs, rank by expected accuracy and justify from mechanism.

**2.6 — Where do the numbers go when it summarizes?** · 20 min
**Thesis:** compaction and summarization are lossy in a specific direction — identifiers, amounts, and dates are exactly the low-frequency tokens a summary drops, which is why long agent runs quietly corrupt the things that matter most.
**Kills:** "we summarize the history to save cost" as a free optimization.
**Atoms:** `A-COMPACTION`, `A-CACHE` [A-WINDOW]
**Ceiling:** prompt caching is covered here as an *economics fact about a stable prefix*, explicitly not as memory — that distinction is the whole reason it sits in this lesson.
**Widget:** W2, diff mode — original history vs compacted, with dropped identifiers highlighted.
**Instrument:** the never-compact list.
**Check:** which of these five fields survives compaction, and why those five?

**2.7 — How does a true fact get into the answer?** · 22 min
**Thesis:** three doors — fetch by key, search, or dump — and for a queue where you know the object's ID, fetch beats search every time; retrieval is search, not memory, and not a system of record.
**Kills:** "we'll put everything in a vector database." Also: treating RAG as the company's memory.
**Atoms:** `A-GROUNDING`, `A-FETCHVSSEARCH`, `A-SOR` [A-WINDOW, A-STUFFING]
**Ceiling:** embeddings appear as "text becomes coordinates so similar things sit near each other." No dimensionality, no cosine, no index types. The decision that must follow is fetch-vs-search, and it follows from that sentence.
**Widget:** W2, three-doors mode — same question, three grounding strategies, three outcomes and three costs.
**Instrument:** the grounding decision tree; and the conflict rule — name the winner before you build.
**Check:** a case where search returns a plausible wrong document; identify the door that should have been used.

*Module gate M2:* ten items; three require M1 atoms (R9).

---

### M3 — How capability is made and bought *(7 lessons, 156 min)*

*Purpose: separate what is baked from what is spent, so that "our custom model," "fine-tuning," "open source," and "cheaper model" stop being one undifferentiated fog.*

**3.1 — Where does the capability come from?** · 22 min
**Thesis:** pretraining is a very large, very expensive, one-time compression of a corpus into weights — it is the wall you buy, and you are not going to build it.
**Kills:** "we'll train our own model on our data."
**Atoms:** `A-PRETRAIN`, `A-TRAINVSINFER` [A-NEXTTOKEN]
**Ceiling:** predict-the-next-token at enormous scale over a broad corpus, producing a frozen artifact. No loss curves, no optimizers, no parameter counts as a quality proxy.
**Widget:** W8 — sort eight "we built a model" claims into pretrain / post-train / prompt / index.
**Instrument:** the four-layer decoder for any "our model" claim.
**Check:** a startup claims a proprietary model; what would prove it and what would be cheap to fake?

**3.2 — What does post-training actually change?** · 22 min
**Thesis:** post-training is steering, not new physics — it teaches the frozen base to follow instructions, adopt a format, and prefer some answers, without adding facts it never saw.
**Kills:** "fine-tuning teaches it our data."
**Atoms:** `A-POSTTRAIN` [A-PRETRAIN]
**Ceiling:** instruction tuning and preference optimization as *two intentions* — do what is asked; prefer this style of answer. Name RLHF and DPO once, as families. No reward models, no policy gradients.
**Widget:** W1 — same prompt against a base-style and an instruct-style recorded model.
**Instrument:** the "what would this actually fix?" question.
**Check:** three problems; which are post-training problems and which are context problems?

**3.3 — Is "our custom model" a model?** · 22 min
**Thesis:** four very different things are sold under one phrase — a prompt, an index, an adapter on someone else's weights, or a distilled student — and they differ by an order of magnitude in cost, defensibility, and switching risk.
**Kills:** the phrase itself, unexamined. This is the highest-yield lesson on the partner path.
**Atoms:** `A-CUSTOMMODEL`, `A-ADAPTER` [A-POSTTRAIN]
**Widget:** **W7 claim scorer** — paste a vendor sentence, get the decomposition and the three questions that resolve it.
**Instrument:** the custom-model question set (5 questions, one page).
**Check:** four real-shaped claims; classify each and name the artifact that would settle it.

**3.4 — Fine-tune, or put it in the context?** · 22 min
**Thesis:** context changes what the model knows *right now*; fine-tuning changes how it behaves *in general* — facts belong in context, form belongs in weights, and most teams reach for the expensive one first.
**Kills:** fine-tuning as the default answer to a wrong answer.
**Atoms:** `A-FINETUNE-VS-CTX` [A-CUSTOMMODEL, A-GROUNDING]
**Widget:** W8 — twelve problems, route each to prompt / retrieve / fine-tune / do-not-use-a-model.
**Instrument:** the routing decision tree.
**Check:** a team wants to fine-tune on 400 support tickets; what will and will not improve?

**3.5 — What are you actually paying for at run time?** · 22 min
**Thesis:** inference is a bill with several lines — input tokens, output tokens, reasoning tokens, retries, and latency you pay for in human waiting — and the list price per token is rarely the line that dominates.
**Kills:** comparing models on price per million tokens.
**Atoms:** `A-INFERSPEND`, `A-THINKING`, `A-BATCHVSINTERACTIVE` [A-TRAINVSINFER]
**Ceiling:** extended reasoning is "the model is allowed to spend more tokens before answering, and you pay for them" — a per-job budget dial with a measurable effect on the eval. No chain-of-thought theory.
**Widget:** **W6 economics calculator**, first appearance, in single-call mode.
**Instrument:** the inference bill template.
**Check:** two models, one cheaper per token; which is cheaper per completed invoice, and what did you need to know?

**3.6 — When is a smaller model the right answer?** · 22 min
**Thesis:** most volume in a real queue is boring, and boring work routes to small, quantized, or distilled models at a fraction of the cost, with the frontier reserved for the tail that earns it.
**Kills:** one model for everything. Also: "quantized means worse."
**Atoms:** `A-QUANT`, `A-DISTILL`, `A-ROUTING`, `A-CASCADE` [A-INFERSPEND]
**Ceiling:** quantization is "store each number with less precision, so the model is smaller and faster and slightly less exact." Distillation is "a small model trained to imitate a large one on a narrow job." Both stop there. The decision that must follow is where each is safe, and it follows.
**Widget:** W5 + W6 — route the 20-case set by difficulty, watch accuracy and cost move together.
**Instrument:** the cascade design worksheet.
**Check:** which of six invoice steps can go to a small model, and what evidence would you want first?

**3.7 — Closed API, open weights, or "open source"?** · 24 min
**Thesis:** the real cut is where the weights run and who is answerable — residency and operations, not virtue — and "open source" in this market is usually a license claim about weights, not about source.
**Kills:** open as automatically cheaper, safer, or more controllable.
**Atoms:** `A-WEIGHTS`, `A-OPENWEIGHTS`, `A-RESIDENCY` [A-PRETRAIN, A-INFERSPEND]
**Widget:** W8 — four deployment shapes against six requirements (data residency, cost floor, latency, staffing, liability, upgrade path).
**Instrument:** the deployment-shape matrix. Cross-links the existing `open-vs-closed-model-economics` analysis.
**Check:** a regulated queue with 40k items a month; pick a shape and name what you gave up.

*Module gate M3:* ten items; four require M1–M2 atoms.

---

### M4 — From text to action *(8 lessons, 170 min)*

*Purpose: the one change that separates 2022 from 2024–26, and the six product shapes people confuse with each other.*

**4.1 — How can a thing that only writes text do anything?** · 22 min
**Thesis:** the model emits text that *names* an action; software decides whether to run it. Nothing about M1 changed — the loop around it did.
**Kills:** "the agent connected to our ERP" as a description of the model rather than of the plumbing.
**Atoms:** `A-TOOLCALL`, `A-PROPOSE-EXECUTE` [A-NEXTTOKEN, A-OPENCLOSED]
**Widget:** **W3 trace viewer**, first appearance. One invoice, four steps, with the proposed call and the executed call shown as separate objects.
**Instrument:** the propose/execute separation test.
**Check:** in a described incident, where did propose and execute get collapsed?

**4.2 — What is a tool, exactly?** · 24 min
**Thesis:** a tool is a contract — a name, typed arguments, a permission, and a result — and API, CLI, and MCP are three ways of shipping the same contract with the same allowlist problem underneath.
**Kills:** "we speak MCP" as an integration story. Also: treating tool availability as tool safety.
**Atoms:** `A-CONTRACT`, `A-MCP`, `A-IDEMPOTENT` [A-TOOLCALL]
**Ceiling:** MCP is "a standard plug so a tool written once can be offered to many models." No transport details, no protocol internals. What must follow is that the plug does not answer who may pull which lever — and it does.
**Widget:** **W4 permission editor** — a tool list for the invoice queue; each row a name, arguments, and a scope.
**Instrument:** the tool-list demand — the artifact to ask any vendor for, and how to read it.
**Check:** given a tool list, name the three that can cause an irreversible external effect.

**4.3 — What is an agent?** · 22 min
**Thesis:** a model, a set of tools, and a stop condition, in a loop — not a personality, not a role, not a headcount.
**Kills:** the org-chart mental model. "We hired an AI analyst."
**Atoms:** `A-LOOP`, `A-STOP` [A-TOOLCALL, A-CONTRACT]
**Widget:** W3 — same invoice, run as a single call and as a loop; watch the two diverge.
**Instrument:** the four-part agent definition, as a checklist for any "agent" claim.
**Check:** three products called agents; which are loops and which are one call with a nice UI?

**4.4 — Why do long runs go wrong?** · 20 min
**Thesis:** each step's output is the next step's input, so error compounds multiplicatively — a 95% step is a 60% ten-step run — and caps, parking, and verification are the loop's structure, not a lack of ambition.
**Kills:** "it just needs to be a bit more accurate."
**Atoms:** `A-COMPOUNDING`, `A-CAPS`, `A-PARK` [A-LOOP, A-VARIANCE]
**Widget:** W3 with a step-accuracy slider — watch end-to-end success collapse as steps grow.
**Instrument:** the compounding table (per-step accuracy × steps → end-to-end), printed once and never forgotten.
**Check:** a 12-step process at 97% per step; what is the honest completion rate, and what is the fix?

**4.5 — Six things get called automation. Which one owns a queue?** · 22 min
**Thesis:** click automation, copilot, autopilot, workflow, chat, and agent are six different products with six different owners, and only two of them can be responsible for volume.
**Kills:** Copilot seats counted as transformation. "We automated AP."
**Atoms:** `A-SIXSHAPES`, `A-QUEUEOWNER` [A-LOOP, A-FOURJOBS]
**Widget:** W8 — twelve deployments to sort, several deliberately ambiguous.
**Instrument:** the "who owns the queue" question, with the three follow-ups that make it un-dodgeable.
**Check:** a described rollout; state what volume did and why.

**4.6 — Workflow or agent?** · 20 min
**Thesis:** when the path is known, a designed path beats a model choosing one — agents are for the tail where the path cannot be enumerated, and using one where a workflow would do buys variance and pays for it.
**Kills:** agents as the modern option and workflows as the legacy one.
**Atoms:** `A-WORKFLOW-VS-AGENT` [A-SIXSHAPES, A-COMPOUNDING]
**Widget:** W3, two configurations of the same queue.
**Instrument:** the path-known test.
**Check:** split one real queue into its workflow portion and its agent portion.

**4.7 — Is a second agent a control?** · 20 min
**Thesis:** splitting propose from approve is a *permission* boundary, and it only means something when the checker holds different tools than the proposer; an org chart of agents with identical permissions is theater with a higher bill.
**Kills:** "manager agent," "critic agent," and the multi-agent diagram as evidence of rigor.
**Atoms:** `A-MULTIAGENT`, `A-CHECKER` [A-LOOP, A-PROPOSE-EXECUTE]
**Widget:** W4 — give the checker send permission; watch the control evaporate.
**Instrument:** the two-question multi-agent test: different tools? different data? If neither, it is one agent.
**Check:** a five-agent architecture diagram; identify the real boundaries and the costumes.

**4.8 — What about the ones that click?** · 20 min
**Thesis:** computer use is a model driving a screen — genuinely useful where no API exists, structurally fragile, and correctly treated as residual with a replacement date rather than as architecture.
**Kills:** browser-agent demos as a general capability claim.
**Atoms:** `A-COMPUTERUSE`, `A-RESIDUAL` [A-LOOP, A-JAGGED]
**Ceiling:** screenshot or DOM in, action out, repeat. Public benchmarks named once as weather rather than forecast.
**Widget:** W3, screen mode — a recorded ten-step portal run with two failures visible.
**Instrument:** the residual register — every click-path automation with the connector that will retire it and by when.
**Check:** which two of five candidate steps should be computer use, and what is the retirement plan?

*Module gate M4:* twelve items; four require M1–M3 atoms.

---

### M5 — The harness is the product *(7 lessons, 155 min)*

*Purpose: the heart. Reliability is a property of the environment, and the environment has parts that can be named, demanded, and audited.*

**5.1 — Why does the same model work there and fail here?** · 22 min
**Thesis:** identical weights, different environment, different outcome — which is why "which model" is the least interesting question in most rooms, and why capability announcements move less than people expect.
**Kills:** model choice as the decision. Also: "we're waiting for the next model."
**Atoms:** `A-HARNESS` [A-JAGGED, A-LOOP]
**Widget:** W3 — one model, two harnesses, on the same twenty invoices; success rates side by side.
**Instrument:** the harness-or-model triage question.
**Check:** a failed pilot; list the environmental causes before naming a model cause.

**5.2 — What is the harness made of?** · 24 min
**Thesis:** five subsystems — instructions, state, verification, scope, lifecycle — and a system missing any one of them is a demo.
**Kills:** the harness as a vague word for "engineering effort."
**Atoms:** `A-FIVESUBSYSTEMS` [A-HARNESS]
**Widget:** W3 with a subsystem overlay — disable one at a time, watch which failures appear.
**Instrument:** **the five-subsystem audit** — the second-most-used instrument in the course; one page, five sections, used on every vendor and every internal build.
**Check:** three incident reports; name the missing subsystem in each.

**5.3 — Why does one long prompt stop working?** · 22 min
**Thesis:** instructions compete for the same attention as data, so a monolithic prompt degrades as it grows; what works is a small always-on core plus material disclosed at the moment it is needed.
**Kills:** the 4,000-word system prompt as diligence.
**Atoms:** `A-INSTRUCTIONS`, `A-PROGRESSIVE` [A-FIVESUBSYSTEMS, A-STUFFING]
**Widget:** W2 — a monolith and a layered equivalent, same task, cost and accuracy shown.
**Instrument:** the task-spec template — how to write an instruction a model can actually follow, which doubles as how to write one a new hire can follow.
**Check:** rewrite a bloated instruction into a core plus three disclosures; rubric-scored.

**5.4 — Where does the system remember?** · 22 min
**Thesis:** three memories — the window, the retrieval layer, and the system of record — and only the third one survives an audit; most "agent memory" products are caches with ambitions.
**Kills:** "we gave the agent memory" as a capability claim.
**Atoms:** `A-MEMORY3`, `A-WRITETHROUGH` [A-FIVESUBSYSTEMS, A-GROUNDING, A-SOR]
**Widget:** W2, three-memory view — write a disposition, then look for it in each of the three.
**Instrument:** the memory placement rule: if the next human needs it, it goes in the system they open.
**Check:** four facts an agent learns; place each, and say what breaks if you place it wrong.

**5.5 — How does the system know it is done?** · 22 min
**Thesis:** verification is a mechanism, not an assertion — a check the system runs that can fail — and without one, "done" is the model's opinion, which is exactly the thing you already learned not to trust.
**Kills:** the model reporting success as evidence of success.
**Atoms:** `A-VERIFY`, `A-EVIDENCE-OF-DONE` [A-FIVESUBSYSTEMS, A-CALIBRATION]
**Widget:** W3 — a run where the agent declares completion and the validator disagrees.
**Instrument:** the done-criteria worksheet: for each step, what check fails if it did not happen?
**Check:** given five steps, write the failing check for each.

**5.6 — Why did it do more than I asked, and less than I needed?** · 21 min
**Thesis:** scope is a subsystem — overreach and undercompletion are the same missing boundary seen from two sides, and both are fixed by machine-readable limits rather than by politer prompting.
**Kills:** "be careful" and "don't do anything else" as controls.
**Atoms:** `A-SCOPE`, `A-OVERREACH` [A-FIVESUBSYSTEMS, A-CAPS]
**Widget:** W4 — scope constraints as toggles on a live trace.
**Instrument:** the scope contract, one queue, one page.
**Check:** an overreach incident; write the constraint that would have prevented it without preventing the work.

**5.7 — What would you demand of any other system?** · 22 min
**Thesis:** a trace is a log — every input, every proposed call, every executed call, every result, replayable — and the fact that this is novel to ask for says more about the vendors than about the technology.
**Kills:** the screenshot as evidence. The babysat demo.
**Atoms:** `A-TRACE`, `A-REPLAY` [A-FIVESUBSYSTEMS, A-VERIFY]
**Widget:** **W3 in full** — expand every step, export the trace, replay it with one input changed.
**Instrument:** the trace demand — six fields, and what their absence tells you.
**Check:** given two vendor "audit trails," say which is a log and which is a marketing artifact.

*Module gate M5:* twelve items; five require M1–M4 atoms. This gate is the course's midpoint and the honest place to fail someone.

---

### M6 — Control: permission, not trust *(6 lessons, 132 min)*

*Purpose: safety as an engineering property with owners and paperwork, derived from M10, not as a compliance mood.*

**6.1 — What is a guardrail, physically?** · 22 min
**Thesis:** guardrails are software that can refuse — schemas, validators, allowlists, rate limits — and a human in the loop is a person on typed actions; conflating the two produces systems with neither.
**Kills:** "we have guardrails" meaning a paragraph in a prompt.
**Atoms:** `A-GUARDRAIL`, `A-HITL` [A-VERIFY, A-CONTRACT]
**Widget:** W4 — add a schema validator and a rate limit; replay the incident that they stop.
**Instrument:** the guardrail inventory: software controls in one column, human controls in the other, and the actions covered by neither.
**Check:** classify eight named controls; two are prompts pretending to be controls.

**6.2 — How much autonomy, for which action?** · 22 min
**Thesis:** autonomy is not a level for a system, it is a dial per action type — read, draft, internal write, external write, irreversible — and it is earned per type with measured evidence, then sampled forever.
**Kills:** "is it autonomous?" as a yes/no question about a product.
**Atoms:** `A-AUTONOMYDIAL`, `A-ACTIONTYPES` [A-GUARDRAIL, A-HITL, A-JAGGED]
**Widget:** W4 — set the dial per type on the invoice queue; see the auto share, the review load, and the exposure move together.
**Instrument:** **the autonomy grid** — action types down, evidence required across. Partner-path instrument.
**Check:** for one queue, propose a starting grid and justify each cell.

**6.3 — If it reads your mail and holds tools, what is your mail?** · 22 min
**Thesis:** every piece of text an agent reads is a potential instruction, so an inbound email or a PDF becomes an attack surface the moment the agent that reads it can also act.
**Kills:** treating injection as an exotic research problem rather than the default condition of a mail-reading agent.
**Atoms:** `A-INJECTION`, `A-DATA-NOT-INSTRUCTIONS` [A-TOOLCALL, A-WINDOW]
**Widget:** W4 — a vendor invoice with a hostile line in the remittance field; run it with wide permissions and with narrow ones.
**Instrument:** the injection test cases, to be added to the frozen set in M7.
**Check:** three agent designs; rank by injection exposure and say what dominates the ranking.

**6.4 — Who is the agent allowed to be?** · 22 min
**Thesis:** least privilege is the only mitigation that scales — the agent gets its own identity, its own scopes, and its own log, because an agent running as Jane can do everything Jane can do and no eval will tell you that.
**Kills:** shared service accounts. "God tools." The confused deputy, unnamed.
**Atoms:** `A-IDENTITY`, `A-ALLOWLIST`, `A-CONFUSEDDEPUTY` [A-INJECTION, A-PROPOSE-EXECUTE]
**Widget:** W4 — swap the identity on a running trace; watch the blast radius change without any change to the model.
**Instrument:** the identity and scope sheet.
**Check:** an agent with one over-broad scope; show the three-step path from a hostile email to a wrong payment.

**6.5 — Where does it run, and what can it reach?** · 22 min
**Thesis:** a gateway is where keys, routing, budgets, and logs live; a sandbox is a boundary on what a run can reach — and a sandbox that can email a customer is production with a comforting name.
**Kills:** "it's just a sandbox." Also: per-team API keys as an architecture.
**Atoms:** `A-GATEWAY`, `A-SANDBOX`, `A-BLASTRADIUS` [A-IDENTITY, A-ALLOWLIST]
**Ceiling:** a gateway as a single front door with four jobs. No proxy internals, no vendor comparison.
**Widget:** W4 — draw the boundary; the trace shows which calls cross it.
**Instrument:** the blast-radius map.
**Check:** given an architecture, name every external effect reachable from a single compromised input.

**6.6 — What leaves the building, and who is answerable?** · 22 min
**Thesis:** four data paths with four different contracts (consumer chat, enterprise API, private region, weights you host), and — separately — the standing rule that if the harness allowed the write, the company acted, which is where liability actually lands.
**Kills:** the consumer-tab bypass. "The vendor is responsible." Also: assuming a model provider's default retention.
**Atoms:** `A-EGRESS`, `A-DATAPATHS`, `A-LIABILITY` [A-GATEWAY, A-SANDBOX]
**Ceiling:** regulation named at the level of *obligations that exist* — risk classification and transparency duties under the EU regime, sector rules you already have, contractual reps and indemnities, and what an insurer will ask. No statutory citation-chasing; a dated pointer instead, per R13.
**Widget:** W8 — route six data flows to their correct path and name the contract clause that governs each.
**Instrument:** the egress register, and the four questions to settle in writing before the first exception.
**Check:** an incident where an allowed write was wrong; assign responsibility with reasons.

*Module gate M6:* ten items; four require M4–M5 atoms.

---

### M7 — Evidence: how you know it works *(6 lessons, 138 min)*

*Purpose: turn "it seems good" into a number someone can rerun. This module is where the course's own credibility is on the line, so it is also where R12 is most visible.*

**7.1 — What does a demo prove?** · 22 min
**Thesis:** a demo is a designed object — chosen case, chosen data, a person in the room — and it proves that the system can succeed once, which is a real fact and a small one.
**Kills:** the pilot that "worked" as evidence of a system.
**Atoms:** `A-DEMO`, `A-SELECTION` [A-VARIANCE, A-JAGGED]
**Widget:** W5 — a recorded demo case, then the same system on nineteen unseen ones.
**Instrument:** the six questions to ask during any demo, in the order that makes them hard to deflect.
**Check:** watch a described demo; list what it establishes and what it does not.

**7.2 — What is an eval?** · 24 min
**Thesis:** a frozen set of cases, a scoring rule, and a number you can produce again next month on the same set — that is the whole idea, and its power is entirely in the freezing.
**Kills:** benchmark scores as evidence about your work. Also: "we tested it, it was great."
**Atoms:** `A-FROZENSET`, `A-SCORING`, `A-RERUN` [A-OWNTEST, A-DEMO]
**Widget:** **W5 eval bench, full.** Twenty invoices, gold answers, three recorded systems. Choose a scoring rule; see accuracy with error bars; click any failure and read the trace.
**Instrument:** the eval one-pager — set, rule, n, date, versions, result.
**Check:** given a workflow, specify the set and the rule; rubric-scored.

**7.3 — What goes in the set?** · 24 min
**Thesis:** the set is a sample of the work, not a sample of the easy work — volume types in proportion, the ugly tail over-weighted, near-misses that separate a good system from a lucky one, and the injection cases from 6.3.
**Kills:** a hundred happy-path cases and no tail.
**Atoms:** `A-SETDESIGN`, `A-TAIL`, `A-NEARMISS` [A-FROZENSET, A-INJECTION]
**Widget:** W5, composition mode — reshape the set and watch the reported accuracy move without the system changing at all. This is the lesson's whole argument, delivered in ten seconds.
**Instrument:** the set-composition worksheet.
**Check:** two sets, same system, different scores; explain the gap from composition alone.

**7.4 — Who decides if the answer was right?** · 22 min
**Thesis:** four ways to score — a deterministic key, a validator, a human rubric, or another model — in descending order of trust and ascending order of convenience, and money and identifiers never go below the first two.
**Kills:** LLM-as-judge as a truth source. Also: unmeasured human graders assumed to agree.
**Atoms:** `A-SCORINGKINDS`, `A-JUDGE`, `A-AGREEMENT` [A-SCORING]
**Ceiling:** judge calibration as "before you trust a judge, check it against humans on a sample and report how often they agree." Name the idea of an agreement statistic; do not teach one.
**Widget:** W5, scoring-rule switch on the same twenty outputs.
**Instrument:** the scoring-choice rule, with the money-and-IDs floor.
**Check:** six fields; assign a scoring method to each and defend the two hardest.

**7.5 — How do you read someone else's number?** · 24 min
**Thesis:** a published score is a measurement of a specific thing under specific conditions, and the four questions that matter are what was measured, on what, how many times, and whether the answers were in the training data.
**Kills:** the leaderboard. The unversioned claim. The chart with no n.
**Atoms:** `A-CONTAMINATION`, `A-ERRORBARS`, `A-PINNING` [A-FROZENSET, A-SETDESIGN]
**Ceiling:** an error bar as "the range the number would move in if you ran it again," and contamination as "the test may have been in the training data." Enough to read a table honestly; no statistics course.
**Widget:** **W7 claim scorer**, benchmark mode — paste a claim, get the missing fields flagged.
**Instrument:** **the four-question card** — the single most portable object in the course, and the one most likely to be screenshotted.
**Check:** three real-shaped published claims; state what each does and does not support.

**7.6 — What happens after it ships?** · 22 min
**Thesis:** models change, vendors update, data drifts, and the world adds new cases — so the auto path is sampled forever and autonomy is promoted and demoted on measured evidence rather than granted once.
**Kills:** the eval as a launch gate rather than a standing instrument.
**Atoms:** `A-SAMPLING`, `A-DRIFT`, `A-AUTONOMYGRADE` [A-RERUN, A-AUTONOMYDIAL]
**Widget:** W5, timeline mode — twelve months of sampled accuracy with one silent model swap in month seven.
**Instrument:** the standing scoreboard: sample rate, thresholds, promotion and demotion rules.
**Check:** given a drift chart, say what happened and what should have caught it.

*Module gate M7:* twelve items; five require M1–M6 atoms.

---

### M8 — Money, and the operating decision *(7 lessons, 162 min)*

*Purpose: the payoff. Everything above becomes a decision with a number attached.*

**8.1 — What does a completed unit of work cost?** · 24 min
**Thesis:** the unit is cost per *completed* item against the loaded cost of the human doing it today — and the model line is usually not the line that decides it.
**Kills:** comparing token prices. Also: counting a saved hour that nobody stopped paying for.
**Atoms:** `A-UNITCOST`, `A-RESIDUAL`, `A-LOOPTAX`, `A-BASELINE` [A-INFERSPEND, A-AUTONOMYDIAL, A-COMPOUNDING]
**Widget:** **W6 economics calculator, full.** Volume, minutes today, loaded rate, auto share, retry rate, review minutes, token price, connector amortization → cost per completed unit, both ways. The dominant line is highlighted, and it is almost never tokens.
**Instrument:** the unit-economics model, exportable, with an assumptions ledger — every input labeled measured, modeled, or assumed (R12).
**Check:** two scenarios with identical token spend and opposite conclusions; explain.

**8.2 — Which work is even a candidate?** · 22 min
**Thesis:** the candidates are high volume, language-heavy, exception-tailed, and verifiable — and the strongest single predictor is whether output correctness is *cheap to check*.
**Kills:** starting with the most strategic process instead of the most checkable one.
**Atoms:** `A-CANDIDATE`, `A-VERIFYCOST` [A-UNITCOST, A-OPENCLOSED, A-FOURJOBS]
**Widget:** W8 — score ten real queues on five dimensions; the ranking is usually a surprise.
**Instrument:** **the queue scorecard** — five dimensions, a score, and a rank.
**Check:** rank four described queues and defend the bottom one.

**8.3 — What has to exist before you shop for a model?** · 24 min
**Thesis:** a named queue, a written playbook, a system of record, a gate, a frozen set, and a scoreboard — and the staging order is packet, then draft, then exactly one allowlisted write.
**Kills:** starting with a model bake-off. Starting with a platform.
**Atoms:** `A-MINSTACK`, `A-STAGING` [A-FIVESUBSYSTEMS, A-FROZENSET, A-AUTONOMYDIAL]
**Widget:** W3 + W4 — stage the invoice queue through three levels and watch review load, cost, and exposure at each.
**Instrument:** the staging plan template, with exit criteria per stage.
**Check:** a team wants to start at full autonomy on external sends; write the three stages that precede it.

**8.4 — Build, buy, or wrap?** · 22 min
**Thesis:** the question is which part of the harness you are buying and how much of it you could rebuild — and since the model is rented by everyone, the durable parts are data access, integrations, workflow ownership, and accumulated evals, not the intelligence.
**Kills:** "it's just a wrapper" as a dismissal, and "it's proprietary AI" as a moat claim; both skip the actual analysis.
**Atoms:** `A-BUILDBUY`, `A-REBUILDCOST`, `A-MOAT` [A-HARNESS, A-CUSTOMMODEL, A-UNITCOST]
**Ceiling:** attacker economics at the level of "what would it cost, in months and money, for a competent team with today's models to rebuild the parts you depend on, and which parts are foreclosed to them." Ties to the reproducibility work already in the Antidote engine.
**Widget:** W6, rebuild mode — components, effort ranges, and the ones marked foreclosed.
**Instrument:** the rebuild worksheet.
**Check:** a vendor's five components; classify each as rentable, buildable, or foreclosed.

**8.5 — How do you diligence an AI claim?** · 24 min
**Thesis:** every claim resolves to an artifact — a tool list, a trace, a frozen set, a scoreboard, an autonomy grid, an egress register — and a claim with no artifact behind it is a sentence.
**Kills:** the management presentation as evidence. The reference call as evidence. The demo as evidence.
**Atoms:** `A-ARTIFACTDEMAND`, `A-CLAIMCLASS` [A-TRACE, A-FROZENSET, A-FIVESUBSYSTEMS, A-AUTONOMYDIAL]
**Widget:** **W7 claim scorer, full** — twelve claims from a real-shaped deck; classify, name the artifact, and rate what its absence implies.
**Instrument:** **the artifact demand list** — one page, twelve claims, twelve artifacts. The instrument this whole course exists to hand over.
**Check:** given a management presentation, produce a prioritized diligence request list.

**8.6 — What happens to the people?** · 22 min
**Thesis:** the honest version — some work disappears, more work changes shape, review and exception handling grow, and the roles that appear are queue owner, harness maintainer, and evaluator, which are jobs somebody has to actually be given.
**Kills:** both the headcount fantasy and the nothing-will-change reassurance. Also: assuming the savings are automatic rather than a decision someone makes.
**Atoms:** `A-ROLESHIFT`, `A-REVIEWLOAD` [A-AUTONOMYDIAL, A-RESIDUAL]
**Widget:** W6, staffing mode — auto share against review minutes; watch the review team grow before it shrinks.
**Instrument:** the role map, before and after.
**Check:** at 70% auto on a 4,000-item queue, what does the team look like and who owns the eval?

**8.7 — What does the first hundred days look like, and how does it fail?** · 24 min
**Thesis:** one queue, one playbook, one frozen set, one gated write, one scoreboard, one owner — and the five named failure patterns account for most of what goes wrong.
**Kills:** the platform-first program. The center of excellence with no queue. Pilot purgatory.
**Atoms:** `A-100DAY`, `A-FAILUREPATTERNS` [A-MINSTACK, A-STAGING, A-ROLESHIFT]
**Widget:** W8 — six programs described; diagnose each against the five patterns.
**Instrument:** **the 100-day plan**, with the weekly scoreboard and the five refusals.
**Check:** write the first 100 days for one queue you scored in 8.2; rubric-scored, and this doubles as the entry ticket to Clinic 2.

*Module gate M8:* twelve items; six require earlier atoms. Passing this gate is the course's completion condition.

---

### M9 — Clinics *(4 clinics, 200 min)*

Pure Moore Method. No new atoms. A case, a required output, a commitment step, then an expert answer *and the rubric it was scored against*. The rubric is the teaching object and the thing the reader keeps.

**C1 — The vendor call** · 45 min
A recorded twelve-minute pitch with a deck. Produce: the claim classification, the artifacts to demand, and the three questions to ask before the call ends. Scored against the artifact demand list from 8.5. *Recommended finish for the partner path.*

**C2 — The invoice queue, end to end** · 55 min
Invoice 8812's queue: 4,200 items a month, seven exception types, two systems of record. Produce: the five-subsystem design, the autonomy grid, the frozen set composition, the staging plan, and the unit-economics model. This is the capstone; it uses six instruments at once and it is the moment the whole course becomes one object.

**C3 — The incident** · 50 min
An agent sent a chase to the wrong vendor for the wrong amount, and every individual component behaved as designed. Produce: the failure analysis by subsystem, the control that was missing, and the two that would have caught it earlier and more cheaply. Trace provided in W3.

**C4 — The diligence memo** · 50 min
A target with three AI claims, a demo, a benchmark table, and an architecture diagram. Produce: what is measured, what is asserted, what is unknown, what you would measure next, and what would change the verdict. Scored against the four-question card and the artifact demand list.

---

## 10. Assessment and mastery mechanics

**The unit of progress is the atom, not the lesson.** A lesson is passed when every atom it introduces is demonstrated. This is what makes remediation possible: a wrong answer is evidence about *which atom* is missing, and that is a more useful fact than a percentage.

**Per lesson:**

| Element | Count | Graded | Purpose |
|---|---|---|---|
| Opening situation | 1 | No | R5. Commit to a judgment before the mechanism appears. Answer is stored and shown back at the end of the lesson — the reader sees their own earlier reasoning. |
| Widget interaction | 1 | No | See the mechanism operate. |
| Checks | 3–5 | Yes | Binary, no partial credit. Every distractor is diagnostic. |
| Instrument | 1 | No | The artifact the reader keeps. |

**Distractors are the design surface.** A multiple-choice item with three arbitrary wrong answers measures reading. An item whose wrong answers each correspond to a *specific missing atom* measures the knowledge state. Every check in this course specifies, per distractor, which atom its selection implies is absent — and selecting it routes there. This is the largest single authoring cost in the build and the thing that makes the ALEKS inheritance real rather than decorative.

**Mastery rule.** All checks correct in one pass, or the lesson is not passed. Re-attempts draw from a variant pool (different numbers, different vendor, same structure) so that repetition tests the atom rather than the memory of an item.

**Module gates.** Eight to twelve mixed items, of which a specified minimum draw on atoms from *earlier* modules (R9, fractional implicit repetition). The gate counts are set per module in §9. The effect: by M8, a reader has re-exercised the M1 atoms four or five times without ever being sent to a review screen.

**Spacing without streaks.** No daily targets. Instead: on return after seven or more days away, the session opens with three items drawn from the reader's weakest previously-mastered atoms. Thirty seconds, framed as a warm-up, and it is the entire spaced-repetition system. Adults will do thirty seconds. They will not do a review queue.

**Placement, honestly scoped.** Fifteen adaptive items over the twelve spine atoms, producing a knowledge state and a ready-to-learn set. It cannot resolve the finer atoms and the UI should say so. A reader may always override and read everything — the placement is a convenience, not a gate.

**What is not automated.** Clinics and the rubric-scored lesson checks (5.3, 7.2, 8.7) are self-scored against a published rubric with a worked expert answer. Client-side grading of free text is not honest, and pretending otherwise in front of this audience is a worse failure than admitting the limit. If a graded version is wanted later, that is a server-side feature with a real cost, and it should be scoped as one.

---

## 11. Widget archetypes

Eight archetypes cover all 54 lessons. This is deliberate: fifty-four bespoke interactives is a project that never ships, and a reader who must learn a new interface every lesson spends their attention on the interface.

**Shared constraint (R11):** every widget runs client-side against recorded model outputs bundled as JSON. No API keys, no per-visitor cost, deterministic — which is what makes assessment possible at all — and it works on a plane. Each recorded set carries its model IDs and capture date, displayed in the widget (R12, R13).

| # | Archetype | What it does | Used in |
|---|---|---|---|
| **W1** | **Token strip** | Tokenizes text, shows the next-token distribution, samples, continues. Modes: distribution, resample-n, base-vs-instruct. | 1.4, 1.6, 2.1, 2.2, 3.2 |
| **W2** | **Context inspector** | Lays out a real call's window as labeled blocks with a byte budget. Drag blocks in and out, move the needle's depth, diff a compaction, compare three grounding doors. | 1.5, 2.4, 2.5, 2.6, 2.7, 5.3, 5.4 |
| **W3** | **Trace viewer** | Step-by-step agent trace: model message, proposed call, executed call, result, accumulating tokens and cost. Scrub, expand, export, replay-with-one-input-changed. Overlays: subsystem, screen mode, step-accuracy slider. | 4.1, 4.3, 4.4, 4.6, 4.8, 5.1, 5.2, 5.5, 5.7, 8.3, C3 |
| **W4** | **Permission editor** | Tool list with scopes and gates as toggles. Change a permission, replay the trace, see success, refusal, or damage. | 4.2, 4.7, 5.6, 6.1, 6.2, 6.3, 6.4, 6.5, 8.3 |
| **W5** | **Eval bench** | Twenty invoice cases with gold answers, three recorded systems, switchable scoring rules. Shows accuracy with error bars, per-case failures with traces. Modes: composition, timeline. | 2.3, 3.6, 7.1, 7.2, 7.3, 7.4, 7.6 |
| **W6** | **Economics calculator** | Inputs to cost per completed unit against a labor baseline, with the dominant line highlighted and an assumptions ledger. Modes: single-call, cascade, rebuild, staffing. | 3.5, 3.6, 8.1, 8.4, 8.6, C2 |
| **W7** | **Claim scorer** | Take a claim; classify job, output type, and evidence class; return the artifact to demand and the missing fields. Modes: custom-model, benchmark, full. | 3.3, 7.5, 8.5, C1, C4 |
| **W8** | **Sorter / decision drill** | The assessment workhorse. Cards to categories, with feedback tied to the atom each mistake implies. | 1.1, 1.2, 1.3, 3.1, 3.4, 3.7, 4.5, 6.6, 8.2, 8.7 |

**Build order for widgets:** W8 first (unlocks assessment everywhere and is the cheapest), then W3 and W2 (they carry the two heaviest modules), then W5 and W6 (the two most screenshot-worthy), then W1, W4, W7.

**A note on W1.** The token strip is the only widget that teaches a mechanism nobody in this audience has seen directly, and it is where the course earns its "from a minimal working state" claim. It deserves more polish than its lesson count suggests.

---

## 12. Content and house style

This is the section the current build most needs, because the structure is close and the prose is where it comes apart at length.

### 12.1 Measured, not asserted

The current `learn-modules.ts` carries ~13,500 words of prose. In it:

- **113 negation-definitions** — 57 "is not", 38 "not a", 11 "are not", 7 "not the". One every ~120 words, which is roughly one per paragraph.
- **23 sentences opening "That is…"**
- **0 em-dashes**, few subordinate clauses, and a strong preference for short declaratives placed end to end.

Any one of these is good writing. All of them, for 380 minutes, produce a single rhythm — assert, negate, assert, negate — and a reader stops hearing the distinctions because every sentence has the same shape. The distinctions are the content. Antidote's own report style governor already caps this construction (warn above five per report, fail above eight); the course should inherit the same governor rather than run without one.

### 12.2 The rewrite, concretely

**Current (unit 1):**

> Analytics tells you what happened. RPA repeats a click path. A copilot license is a sidecar for people who already do the job. Generation plus tools is a bid to own volume on a queue. Those words get filed under AI. They are not the same product.

Four parallel fragments, a filing observation, a negation. It is correct and it is inert — nothing is *shown*, and the reader has no reason to believe the last sentence beyond being told.

**Rewritten:**

> Four things share a budget line and a slide. Analytics reports what happened last month; nobody expects it to do the work. RPA repeats a click path someone recorded, which holds until a button moves. A copilot license puts a helper beside a person who already knows the job, and the person still does it. Generation plus tools is the only one of the four making a bid to own the queue itself — and it is the only one whose failure shows up as a wrong action rather than a wrong report. When a plan calls all four "AI adoption," the first three are being counted toward a change only the fourth is attempting.

Same claims. The distinction now has a *reason* attached (where the failure shows up), sentence lengths vary, and the closing line is a consequence rather than a denial.

### 12.3 The rules

1. **One thesis per lesson, stated once.** If it appears three times, two of them are padding.
2. **Open on an artifact.** An invoice, a claim, a trace, a screen. Never a definition.
3. **Mechanism before consequence.** No rule without its reason. A reader who has the reason can handle the case you did not anticipate; a reader with the rule cannot.
4. **Name the misconception in the reader's own words.** Not "some believe that…" — the sentence they would actually say, in the register they would say it.
5. **Vary the sentence.** At least one sentence per paragraph carrying a subordinate clause. Negation-definitions budgeted at three per lesson, hard-capped at five.
6. **Concrete beats general, always.** Invoice 8812, Acme, $14,200, PO 4501, missing goods receipt. Every abstraction gets an instance within two sentences.
7. **Numbers carry a date and a source, or the word illustrative.** No exceptions (R12).
8. **No model names in lesson prose** (R13). Capability classes only. Model-specific facts live in the dated appendix.
9. **Close on the decision.** Every lesson ends with what the reader can now decide that they could not before. Not a summary.
10. **Second person sparingly.** The imperative stack — "Ask. Demand. Refuse." — is powerful once per lesson and hollow twice.
11. **Cut the throat-clearing.** "It is worth noting," "Importantly," "The reality is." The current draft is largely clean here; keep it that way.
12. **Read it aloud.** Anything unsayable is unfinished.

### 12.4 Lesson template

```
Title            The question, in plain words
Situation        The artifact + the call the reader must make (ungraded, stored)
Thesis           One sentence, the answer, stated plainly
The mechanism    Why, from atoms already held. Stops at the ceiling.
The case         Invoice 8812, worked
The misconception The sentence a smart person says, and why it is wrong here
Widget           The thing to manipulate
So what          What you can now decide
Instrument       The object you keep
Checks           3–5 graded, diagnostic distractors
Next             Ready-to-learn set, from the graph
```

Every field is required. A lesson missing its Situation or its Instrument is not finished, and the schema should enforce that at build time rather than at review time.

---

## 13. Data model changes

The current `LearnModule` type carries `slug, order, part, minutes, title, blurb, lede, youWill, sections, mixup, check, next, relatedUseCases`. Most of it survives. The additions:

```ts
type AtomId = string;

type Lesson = {
  // kept
  slug; order; module; minutes; title; blurb; lede; youWill;
  sections; relatedUseCases;

  // renamed
  question: string;          // the title as a question (R3)
  misconception: {           // was `mixup`, promoted to the top of the lesson
    says: string;            // the sentence a smart person actually says
    why: string;             // why it is wrong, from mechanism
  };

  // new
  thesis: string;            // one sentence
  situation: Situation;      // R5 opener, ungraded, answer stored
  atoms: AtomId[];           // introduced here
  prereqs: AtomId[];         // required to start
  ceiling?: string;          // authoring note: where the depth stops
  widget: WidgetRef;         // archetype + config + recorded dataset ref
  instrument: Instrument;    // downloadable/printable artifact
  checks: Check[];           // graded, with per-distractor atom routing
  soWhat: string;            // the decision now available
};

type Check = {
  prompt: string;
  options: { text: string; correct: boolean; impliesMissing?: AtomId }[];
  variantPool?: string;      // for re-attempts
};

type Atom = { id: AtomId; name: string; prereqs: AtomId[]; spine: boolean };
```

Plus a `LEARN_ATOMS` graph module, a `LEARN_PATHS` derivation (partner / operator / diligence as atom sets), and a client-side `progress` store keyed by atom.

**Build-time validation** — worth writing before any content, because it is what keeps a 54-lesson graph honest as it changes:

1. The atom graph is acyclic.
2. Every lesson's `prereqs` are introduced strictly earlier in the default order.
3. No atom is orphaned.
4. No lesson introduces more than three atoms (R7 fan-out budget).
5. Every check has at least one distractor with `impliesMissing`.
6. Every derived path is prerequisite-closed.
7. Negation-definition count per lesson ≤ 5 (§12.3 rule 5), as a lint.
8. No model name appears outside the appendix (R13), as a lint.
9. Every number in prose is inside a sourced span or carries "illustrative" (R12), as a lint.

Rules 7–9 are the ones that keep the prose honest at scale, and they cost an afternoon.

---

## 14. Migration from the current 22 units

| Current unit | Becomes | Treatment |
|---|---|---|
| 1 history-and-context | 1.1 + 1.2 + 1.3 | Split. It is currently three lessons wearing one title — the four jobs and the open/closed cut are each load-bearing enough to stand alone. |
| 2 next-token | 1.4 + 1.5 + 1.6 | Split. Attention and sampling variance each earn a lesson; attention is currently named without being made to imply anything. |
| 3 why-fluent-is-wrong | 2.1 + 2.2 + 2.3 | Split. Hallucination, calibration, and jaggedness are three mechanisms currently sharing one unit. |
| 4 context-windows | 2.4 + 2.5 + 2.6 | Split. |
| 5 grounding | 2.7 | Keep, expand. |
| 6 how-models-get-good | 3.1 + 3.2 + 3.3 | Split. 3.3 becomes a partner-path anchor. |
| 7 inference | 3.5 + 3.6 | Split; cascade and quantization earn their own lesson. |
| 8 open-and-closed | 3.7 | Keep. The document/pixel material moves to 2.7 where grounding lives. |
| — | 3.4 | **New.** Fine-tune vs. context is the most common expensive mistake and is currently implicit. |
| 9 copilots-and-automations | 4.5 + 4.6 | Split. |
| 10 tools-apis-mcp | 4.1 + 4.2 | Split. Propose/execute is a mechanism; the plumbing is a separate lesson. |
| 11 agents | 4.3 + 4.4 | Split. |
| 12 multi-agent | 4.7 | Keep. |
| 13 computer-use | 4.8 | Keep. |
| 14 memory | 5.4 | **Moves modules.** Memory is a harness subsystem, not a work pattern; placing it under State is what makes 5.4 derivable. |
| 15 harness-and-tracing | 5.1 + 5.2 + 5.3 + 5.5 + 5.6 + 5.7 | **The big expansion.** One 18-minute unit becomes six lessons. This is the course's thesis and it currently gets the same weight as computer use. |
| 16 hitl-and-guardrails | 6.1 + 6.2 | Split. |
| 17 injection | 6.3 + 6.4 | Split; least privilege earns its own lesson. |
| 18 gateways-auth-sandboxes | 6.4 (identity) + 6.5 | Redistributed. |
| 19 egress | 6.6 | Keep, expand with liability and regulation. |
| 20 evals | 7.1 + 7.2 + 7.3 + 7.4 + 7.5 + 7.6 | **The other big expansion.** One unit becomes the whole of M7. |
| 21 cost-and-unit-economics | 8.1 | Keep, move to M8, add the calculator. |
| 22 staging | 8.3 + 8.7 | Split. |
| — | 8.2, 8.4, 8.5, 8.6 | **New.** Candidate selection, build/buy/moat, diligence, and people. The ICP payoff, currently absent. |
| — | M0, M9 | **New.** Placement and clinics. |

**Two ordering corrections the graph surfaced:**

1. **Memory (14) currently sits before harness (15)**, but the three-memory distinction depends on the state subsystem to be more than a list. Moving it to 5.4 puts it after the frame that explains it.
2. **Grounding (5) currently precedes the models material (6–8)**, which is right, but it also depends on the stuffing/window-competition idea that only appears inside unit 4. The split into 2.4/2.5/2.6/2.7 makes that dependency explicit and ordered.

Nothing else in the current sequence has a back edge. The existing order is, structurally, sound — which is the strongest thing that can be said about the current build.

---

## 15. Build order

The sequence is chosen so that the thing most likely to change the shape of everything else is built first, and so that there is something worth showing at every stage.

**Phase 1 — Skeleton in code (no prose).** The atom graph, the `Lesson` type, all 54 stubs with question, thesis, atoms, prereqs, widget ref, and instrument name. The nine build-time validators. Outcome: the graph is provably consistent, and the nav renders. A day or two, and it de-risks everything after it.

**Phase 2 — One module, complete, end to end.** **M5, the harness module.** Full prose, W3 built, all checks with diagnostic distractors, all seven instruments, the module gate. M5 is the course's thesis, the most-expanded material, and the hardest widget — if it works, the pattern is proven; if it does not, better to learn that on the module that matters most.

**Phase 3 — The spine forward.** M1 → M2 → M4 (W1, W2, W8). At the end of this, the derivation chain from next-token to agents is complete and the course is publishable as a first release even without M3 and M6–M8.

**Phase 4 — The payoff.** M7 → M8 (W5, W6, W7). This is what the ICP came for, and W5/W6 are the two most shareable objects in the build.

**Phase 5 — M3, M6, M0, M9.** Models, control, placement, clinics. M3 and M6 are the most reference-like modules and tolerate being written last; placement cannot be built until the atom bank exists.

**Cheap, high-value, do it whenever:** the four-question card (7.5), the artifact demand list (8.5), and the queue scorecard (8.2) are the three instruments most likely to be shared outside the course. They can be published standalone before the course ships and used as the funnel into it.

---

## 16. Open questions

1. **Does the course gate on an email?** Progress is client-side and anonymous by default. Placement plus a resumable path is a natural reason to ask for one — and this is the funnel decision, not a product decision, so it should be made as one.
2. **Is the partner path a visible product** ("the 5-hour path") or an invisible affordance the placement produces? Naming it makes it marketable and also makes it feel like the lesser version.
3. **Recorded model outputs need a refresh policy.** The datasets behind W1–W7 carry model IDs and capture dates. Who re-captures them, how often, and does a stale capture date show a warning in the widget?
4. **Cross-linking direction with the use-case library.** Currently lessons point at use cases. Should use cases point back at the lessons that explain their mechanisms? That reciprocal edge is probably worth more than any new content.
5. **Does the diligence path belong on the FD site at all**, or does it belong on the diligence offering as its own object? It is the path most likely to be read by someone who is about to buy something.
6. **Certificate or not.** Cheap to add, changes the register of the whole thing, and hard to walk back.
7. **Relaxed closure for the partner path** (§8.3). Allowing an inline primer in place of a real prerequisite buys a 7 h partner path that includes the custom-model, autonomy, benchmark-reading and diligence lessons. It also ships the exact thing this course argues against. My read is that the closed 5.5 h path plus an explicit "to go further, here is the next closed set" is the better product, but it is a positioning call, not a pedagogy one.


---

## 17. Appendix A — coverage of the named topics

Checked against the list in the brief. Nothing named is unplaced; the grouping differs from the list because the list is a topic inventory and the course is a derivation order.

| Named topic | Where it lands | Note |
|---|---|---|
| Gen AI vs. "normal" AI | 1.1, 1.2 | Split into eras (1.1) and the four jobs (1.2). The conflation is the misconception 1.2 kills. |
| High-level overview of the attention paper | 1.5 | Depth set by R2: enough to imply quadratic cost, mid-window degradation, and packet-over-dump. Paper named once. |
| ChatGPT, 2022 | 1.1 | As the demand proof that was mistaken for an operating proof. |
| How it actually works, high level | 1.4, 1.6 | Tokenize → distribution → sample → append, plus why two runs differ. |
| The transition to agents | 4.1, 4.3 | 4.1 is the pivot: nothing about the model changed, the loop around it did. |
| Tool calling | 4.1, 4.2 | Mechanism (propose/execute) and plumbing (contract, MCP) as separate lessons. |
| Harnesses | M5, all seven lessons | Currently one 18-min unit; becomes the largest module and the course's thesis. |
| Why AI wasn't effective before, why it is now | 1.1, 4.1, 5.1 | Three different answers — era, the loop, the environment — and all three are needed. |
| What it takes for AI to be useful | M5, 8.3 | The five subsystems, then the minimum stack and the staging order. |
| Memory and context windows | 2.4, 2.5, 2.6, 5.4 | Window mechanics in M2; the three memories in M5 where the State subsystem explains them. |
| Auth and AI gateways | 6.4, 6.5 | Agent identity is its own lesson; the gateway's four jobs sit with sandboxes. |
| Sandboxes | 6.5 | With blast radius, because a sandbox that can send is not one. |
| Liability and guardrails | 6.1, 6.6 | Guardrails as software in 6.1; liability, the four data paths, and regulation in 6.6. |
| Model capabilities | 2.3 | Reframed as jaggedness plus the 30-minute self-test, which is the only capability claim that survives contact with your own queue. |
| General-purpose vs. post-trained / specialized | 3.2, 3.3, 3.4 | Post-training as steering; "our custom model" decomposed; fine-tune vs. context as the routing decision. |
| Quantized | 3.6 | With distillation, routing, and cascades — one lesson, because they are one decision. |
| Open vs. closed source | 3.7 | Reframed as residency and operations, with "open source" flagged as a license claim about weights. |
| Cost-effective models | 3.6, 3.5, 8.1 | Model-level in M3; the number that actually decides in 8.1. |
| Evals | M7, all six lessons | Currently one 16-min unit; becomes a module, because this is where the ICP's judgment is made. |

**Added beyond the list**, because the ICP needs them and they were absent: candidate selection (8.2), build/buy/wrap and rebuild economics (8.4), diligencing a claim (8.5), what happens to the people (8.6), the 100-day plan and the named failure patterns (8.7), regulation and liability (6.6), the demo as a designed object (7.1), and the clinics.

**Deliberately excluded**, with reasons, so the omissions are decisions rather than gaps: embeddings beyond "text becomes coordinates" (no decision depends on more); transformer internals below attention (R2); training infrastructure, GPUs, and scaling laws (nothing an operator decides); prompt-engineering technique lists (5.3 teaches writing a task spec, which is the durable version); framework comparisons — LangGraph, CrewAI and their successors (dated within a year, R13); and agent-benchmark leaderboards other than as a worked example of what not to trust (7.5).


---

## 18. Built

Shipped into `~/Desktop/antidote ai/app/mock/forward-deployed/`. About 14,400 lines across sixteen files, plus ~800 lines of CSS.

### 18.1 Files

| File | Lines | What it is |
|---|---|---|
| `learn-types.ts` | 209 | The schema. Each field carries the design rule it enforces. |
| `learn-atoms.ts` | 426 | 115 atoms with prerequisite edges, the three derived paths, and the build-time validators including the prose lints. |
| `learn-structure.ts` | 100 | The ten modules with their purpose lines. |
| `learn-case.ts` | 30 | Invoice 8812. One source for every fact, so no lesson can drift from another (R6). |
| `learn-m0.ts` … `learn-m9.ts` | 10,104 | The 60 items: 54 graded lessons, 4 clinics, 2 orientation. |
| `learn-modules.ts` | 169 | Assembly, helpers, and the alias map that keeps every old slug working. |
| `learn-widget-types.ts` | 163 | Widget data shapes. |
| `learn-widget-data.ts` + `-2.ts` | 1,177 | 55 recorded datasets. No keys, no network, deterministic (R11). |
| `FdLearn.tsx` | 806 | Nav with progress, home with the three paths, and the lesson article. |
| `FdLearnWidgets.tsx` | 1,010 | The eight archetypes and the registry. |

`mock.css` uses only the existing tokens — `--antidote`, the paper/ink neutrals, `--radius-small`, `color-mix` tints. No new colours, no layout changes to the docs shell.

### 18.2 What the lessons carry

Every one of the 60 has a question title, a one-sentence thesis, a Moore-style opening situation with options and a reveal, prose sections, an interactive widget, an instrument, a so-what line, and graded checks whose wrong answers carry `impliesMissing` and route to the lesson that teaches the missing atom.

Everything else varies by lesson, deliberately. See §19.

Fifty-four instruments ship as content. The four-question card, the artefact demand list, the queue scorecard, the autonomy grid, the five-subsystem audit and the compounding table are the ones most likely to leave the course.

### 18.3 Verification

The validators run over the assembled graph (`validateLearnGraph`), plus the build:

| Check | Result |
|---|---|
| Atom graph acyclic | pass |
| No orphan atoms | pass — all 115 introduced |
| Lesson prerequisites strictly precede | pass |
| Fan-out ≤ 3 atoms per lesson | pass |
| Every check has one correct answer and a diagnostic distractor | pass — 172 checks |
| All three paths prerequisite-closed | pass — 15 / 32 / 60 |
| Negation-definition budget ≤ 5 per lesson | pass — highest is 2 |
| `rather than` ≤ 1 per lesson | pass — 5 uses in 58,845 words |
| Em-dash budget ≤ 3 per lesson of flowing prose | pass — highest is 2 |
| Label-colon stems ≤ 2 per lesson of flowing prose | pass — highest is 2 |
| Banned word (`genuinely`) | pass — 0 |
| No model names in prose (R13) | pass |
| Widget datasets resolve | pass — 55 configs, 0 missing, 0 unused |
| `tsc --noEmit` on the whole project | clean |
| `next build` | succeeds, 17 routes |
| Server-side render of all 60 lesson pages | 200 on every one |
| Zero definition lists in rendered HTML | pass — 0 across all 60 |

Totals: **60 items · 54 graded lessons · 4 clinics · 115 atoms · 172 checks · 58,845 words · 1,419 minutes (23.6 h)** — matching §7.

### 18.4 Not built

- **Placement is a widget, not an adaptive instrument.** `0.2` ships as a self-scored pass over the twelve spine mechanisms rather than a fitted adaptive assessment, and the lesson says so in the copy instead of overclaiming (§10).
- **Progress is per browser.** `localStorage`, guarded, no account. Fine as a convenience; a shared or cross-device record needs a server-side store and an identity, which is the funnel decision in §16.1.
- **Rubric-scored items are self-scored.** 5.3, 7.2, 8.7 and the four clinics publish the rubric and the worked answer; nothing grades free text, because client-side grading of prose would be dishonest in front of this audience.
- **Spaced review is not wired.** The thirty-second warm-up on return after seven days (§10) needs a timestamp in the progress store. Small, and not done.
- **The module gates are not built.** The per-lesson checks are; the mixed eight-to-twelve-item gates that re-exercise earlier atoms (R9) are specified per module in §9 and remain to be assembled.

---

## 19. The revision pass

The first build was structurally complete and read as generated. Every lesson carried every section, in the same order, in the same voice. Three habits produced almost all of it, and each was measured before being fixed rather than guessed at.

### 19.1 What was wrong, counted

| Tell | Before | After |
|---|---|---|
| Sections rendered as `<dl>` with a bolded label on every row | 43 of 56 lessons | 0 of 60 |
| Lessons carrying a "What people say" misconception block | 60 of 60 | 44 of 60 |
| Worked examples titled, identically, "Running example" | 53 of 56 | 0 — 23 distinct titles, 16 examples untitled |
| `rather than` | 330 uses | 5 |
| Em-dashes | 295 | 14 |
| `genuinely` | 39 | 0 |

The definition list was the worst of them. A left-hand bolded label against a right-hand sentence is the shape a model reaches for when it has a set of parallel things to say, and a reader who meets it on four pages in a row stops reading the page and starts scanning the labels. The content was right; the container was doing the writing.

### 19.2 The rule that replaced it

Prose is the default. A section gets a supporting device only where a reader would genuinely scan, and the two devices are scarce by budget:

- **A table** — two real column headings, `<th scope>` on both axes — where a parallel set is compared across the same two dimensions. **14 lessons** carry one. The five action types, the four scoring methods, the six trace fields, the four data paths, the claim-to-artefact map.
- **A split** — two columns — where the lesson turns on a single binary. **3 lessons**: closed or open, the inference bill, core against disclosure.
- **A plain list** — no label stems, complete sentences — where the content is a checklist. **24 lessons.**

Everything that had been a labelled row and was not one of those became prose. Nothing was cut for length: the reasoning that had been compressed into a row's right-hand column was expanded into the sentences it deserved, which is why the corpus grew while the page furniture shrank.

### 19.3 Sections that no longer appear everywhere

The misconception block stays where a named sentence is worth taking apart and goes where the opening situation has already done that work. Where 6.1 opens with a vendor's four-item control list and asks how many of them can refuse an action, a block afterwards saying *we have guardrails in place* is the same lesson told twice. **44 of 60** carry one.

Same test for the worked example: **39 of 60**. Same for the `youWill` list (3 or 4 items), the situation options (3 or 4), the checks (2 to 4), and the sections themselves (1 to 4). Lesson 0.1 now states the policy in the copy, so the variation reads as design rather than as omission.

### 19.4 The lints

Four new prose lints run inside `validateLearnGraph`, so the tics stay dead as the content changes:

| Lint | Budget | Corpus |
|---|---|---|
| `rather-than-budget` | ≤ 1 per lesson | prose |
| `em-dash-budget` | ≤ 3 per lesson | flowing prose only |
| `colon-stem-budget` | ≤ 2 per lesson | flowing prose only |
| `banned-word` | 0 | prose |

The two corpora matter. `prose` is everything a reader sees, used for word-level budgets. `flowing` is continuous prose only — ledes, theses, paragraphs, example bodies — used for the rhythm budgets, because a colon inside a checklist item is a checklist, while a colon opening a paragraph is a label masquerading as a sentence. That is the habit the lint exists to kill, and scoping it this way stops it firing on legitimate instrument items.

The deprecated `rows` field is gone from `learn-types.ts`, from the validator's corpus assembly, and from the renderer. There is no longer a way to author a definition list in this course.

### 19.5 Verification of the pass

- `validateLearnGraph`: **0 problems**, all validators including the four new lints.
- `tsc --noEmit` across the project: clean.
- `next build`: succeeds.
- All **60** lesson pages server-rendered: 200 on every one; `fdm-uc-deflist` count 0; `Running example` count 0.
- The single remaining `<strong>` in the learn surface is a numeric stat inside a sentence in one widget ("17 of 20 correct"). Every other emphasis is gone.
