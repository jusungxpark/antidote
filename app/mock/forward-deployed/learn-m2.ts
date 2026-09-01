import type { LearnLesson } from "./learn-types";
import { CASE, CASE_LINE } from "./learn-case";

export const M2_LESSONS: LearnLesson[] = [
  {
    slug: "hallucination",
    order: 9,
    n: "2.1",
    module: "M2",
    kind: "lesson",
    minutes: 22,
    title: "Where does a hallucination come from?",
    blurb:
      "Completion with a missing fact. The wrong answer arrives in the same voice as the right one, because the same loop produced both.",
    thesis:
      "A hallucination is what the loop from lesson 1.4 does when the required fact was absent from its input: it continues plausibly, in the same register, with no signal anywhere in the output that anything was missing.",
    lede:
      "The word suggests a malfunction, which is why it misleads. Nothing goes wrong when a model invents an identifier. The system does what it always does, and the reason the output is untrustworthy is the same reason it is useful. Understanding this properly turns a complaint into a design decision.",
    youWill: [
      "Derive invention from next-token prediction and a missing fact.",
      "Predict, before running anything, which field in a given output will be invented.",
      "Explain why better models change the frequency and leave the mechanism intact.",
      "Say what actually reduces it, and why instructions rank last.",
    ],
    atoms: ["A-HALLUCINATION"],
    prereqs: ["A-NEXTTOKEN", "A-VARIANCE"],
    ceiling:
      "Derivation from the loop plus the three real mitigations. No taxonomy of hallucination types, no discussion of internal representations or uncertainty estimation research.",
    situation: {
      artifact: `A generated summary: Invoice ${CASE.invoice} from ${CASE.vendor} for ${CASE.amount} was received on ${CASE.received} against PO ${CASE.po}. The goods receipt was posted on 6 March by the receiving team and matches in full. Recommend release for payment.`,
      prompt:
        "The context contained the invoice and the purchase order. It contained no receiving record at all. Which sentence is the problem?",
      options: [
        "The first. the amount could be wrong",
        "The second. a receipt, a date and a person appeared from nowhere",
        "The third. a recommendation should never be automated",
        "None; the summary reads as correct",
      ],
      reveal:
        "The second, and notice how much it contains: a receipt with no record behind it, a date, an actor, and a match assertion. Each of those is a position where the loop had to produce something and had nothing to draw on. That sentence reads as the most concrete and specific in the passage, which is what makes it the dangerous one. The third sentence is a judgment, and judgments are easier to challenge than facts that sound like they came from a system.",
    },
    sections: [
      {
        title: "The derivation",
        paragraphs: [
          "Take the loop as given. At each step the model produces a distribution over the next token and one token gets sampled. Now consider a position where a fact belongs, the date a receipt was posted, and consider the two situations that can hold.",
          "If the receiving record was in the input, the tokens around that position are heavily constrained. Almost all the probability mass sits on the tokens that spell the date appearing in the material, and the sampled token is that date. If the receiving record was absent, the model still has to produce a distribution, because that is the only operation available. The distribution now spreads over every date that would be plausible for an invoice received on the third of March: the fourth, the fifth, the sixth, the following Monday. One gets sampled and the sentence continues.",
          "Both paths produce a grammatical sentence in the same register with the same formatting. Nothing distinguishes them in the output, because the difference lived in the shape of a distribution that ceases to exist once a token has been chosen. That is the whole mechanism, and it is why the phenomenon survives every model release.",
        ],
      },
      {
        title: "Why better models change the rate and leave the mechanism alone",
        paragraphs: [
          "A more capable model has absorbed more structure, so more facts are present in its weights and more of its distributions collapse onto a single answer where a weaker model's would have spread. Post-training makes abstention more likely in situations resembling the ones it was steered on. Both effects are real, both are worth paying for, and neither touches the loop.",
          "The practical consequence is that improvement moves you along a frequency axis while leaving the failure mode intact. A system that invents an identifier once in five hundred items instead of once in fifty is a better system and needs exactly the same wrapper, because the wrapper exists to catch the case and not to reduce its rate. Anyone proposing to remove a validator because the model got better has confused those two axes.",
        ],
      },
      {
        title: "What actually reduces it",
        paragraphs: [
          "Three things work, in descending order of effectiveness, and one thing barely works while being the most commonly attempted.",
          "Putting the fact in the context is the strongest by a distance. If the receiving record is in the packet, the distribution collapses and the invention has nowhere to occur. This is the whole reason the grounding lesson exists, and it is why fetching by identifier outperforms every clever prompt. Constraining the output shape comes next. If the system has to return a structure with a field for receipt_date, and a validator confirms that the value appears in the source material, an invented date gets caught mechanically instead of by a reader's attention. Making the source of every fact visible comes third: a design where each claim carries a pointer to where it came from converts a reading problem into a checking problem, and checking is something you can sample.",
          "Instructing the model to avoid invention shifts the odds a little and guarantees nothing, for the reason established in 1.4, since the abstention is itself sampled text. It costs nothing, so do it, and never count it as a control.",
        ],
        example: {
          body: `${CASE_LINE} The fields most likely to be invented are the ones with no anchor in the packet: the receipt date, the receiver's name, and any statement that the match was complete. The vendor name and the invoice number, both present in the source, are comparatively safe. Predicting the fragile fields in advance takes ten seconds and tells you what to validate.`,
        },
      },
    ],
    misconception: {
      says: "The newer models barely hallucinate any more.",
      why: "The rate moves and the mechanism stays. No step exists in which the system checks whether a fact was present, so the wrapper you needed at the old rate is the wrapper you need at the new one. Removing a validator on the strength of a model upgrade replaces a caught failure with an uncaught one.",
    },
    widget: {
      kind: "tokens",
      mode: "distribution",
      dataset: "missing-fact",
      caption:
        "Ask for a fact that is in the packet, then for one that is absent. Watch the distribution at the deciding position, and watch the sentence around it stay identical.",
    },
    instrument: {
      name: "The missing-fact audit",
      body: "Before running anything, list what the system would have to invent. Two minutes with a prompt and a packet, and it predicts your failures.",
      items: [
        "Write out what the output must contain, field by field.",
        "For each field, point to the exact place in the packet it can come from.",
        "Any field with no such place will be invented. Mark it.",
        "Decide per marked field: fetch it, constrain and validate it, or drop it from the output.",
        "Re-run the audit whenever the packet changes, because that is when new gaps appear.",
      ],
    },
    soWhat:
      "You can look at a prompt and a packet, before any run, and name the fields that will be invented. That converts a class of surprise into a design step, and it is the cheapest quality intervention available to a non-technical reviewer.",
    checks: [
      {
        q: "A system summarises support tickets and occasionally cites a policy section number that does not exist. What is the first fix?",
        options: [
          {
            text: "Add an instruction telling it to cite only real sections.",
            feedback:
              "Costs nothing, so do it, and expect very little. No internal check exists for the instruction to consult.",
            impliesMissing: "A-HALLUCINATION",
          },
          {
            text: "Put the policy sections in the context, fetched, and validate that every cited number appears in what was supplied.",
            correct: true,
            feedback:
              "Correct. Ground first so the distribution collapses, then validate so the residual case gets caught instead of read.",
          },
          {
            text: "Move to a larger model.",
            feedback:
              "Shifts the rate along an axis and leaves the mechanism untouched, so you still need the validator afterwards.",
            impliesMissing: "A-HALLUCINATION",
          },
        ],
      },
      {
        q: "Given a packet containing an invoice and a purchase order, which output field is most likely to be invented?",
        options: [
          {
            text: "The vendor name, because names are hard.",
            feedback:
              "The vendor name is present in the source, so the distribution around it collapses.",
            impliesMissing: "A-HALLUCINATION",
          },
          {
            text: "Anything about the receiving record, because nothing in the packet anchors it.",
            correct: true,
            feedback:
              "Correct, and the invented material will be the most specific-sounding text in the passage.",
          },
          {
            text: "The total, because arithmetic is unreliable.",
            feedback:
              "Arithmetic is weak and belongs to a different failure. Here the total is present in the source.",
            impliesMissing: "A-NEXTTOKEN",
          },
        ],
      },
      {
        q: "Why does invented content read as more confident than the surrounding text?",
        options: [
          {
            text: "Because the model overcompensates when uncertain.",
            feedback:
              "That description implies an internal uncertainty state driving behavior. No such state reaches the output.",
            impliesMissing: "A-HALLUCINATION",
          },
          {
            text: "Because the surrounding grammar and register come from the same loop either way, so a composed fact inherits the tone of the sentence it sits in.",
            correct: true,
            feedback:
              "Correct. Invented facts tend to be specific, being a date, a name, a number, and specificity reads as authority.",
          },
          {
            text: "Because training data contains more confident writing than hedged writing.",
            feedback:
              "Partly true about style in general, and it fails to explain why the invented span in particular reads that way.",
            impliesMissing: "A-HALLUCINATION",
          },
        ],
      },
    ],
    next: "confidence",
    relatedUseCases: ["claim-intake-missing-info", "audit-evidence-requests"],
  },

  {
    slug: "confidence",
    order: 10,
    n: "2.2",
    module: "M2",
    kind: "lesson",
    minutes: 20,
    title: "Why does confidence tell you nothing?",
    blurb:
      "Assured prose is a property of how the text was written, never a measurement of whether it is right. A self-reported percentage is more text.",
    thesis:
      "Fluent, assured writing reflects the style the model learned and no internal measurement of correctness, and a confidence figure the model states in words is generated the same way as the answer it accompanies.",
    lede:
      "People read tone as evidence, and in human writing that heuristic is weak but real: a person who hedges usually knows something you should attend to. The heuristic transfers badly here, and the version causing the most damage is the number. A model that writes I am 95% confident has produced a token sequence, chosen the same way as the answer above it.",
    youWill: [
      "Separate register from correctness, and say why the two are unlinked here.",
      "Explain why a stated confidence figure carries no measurement.",
      "Name three phrasings that make uncertainty more legible, and their limits.",
      "Say what a real error bar requires, and where it comes from.",
    ],
    atoms: ["A-CALIBRATION"],
    prereqs: ["A-HALLUCINATION"],
    ceiling:
      "Calibration as a concept: does stated confidence track observed accuracy? No calibration curves, no scoring rules, no token-probability plumbing beyond a mention that it exists and is a different object.",
    situation: {
      artifact:
        "Two extractions from the same invoice, side by side. The first ends: extracted with high confidence; all fields verified against the document. The second ends: extracted; the goods receipt reference could not be located in the supplied material.",
      prompt: "Which output would you rather have on a queue of four thousand?",
      options: [
        "The first. verified is exactly what you want to hear",
        "The second. it flagged a gap",
        "The first, provided the verification claim is real",
        "Neither tells you anything useful",
      ],
      reveal:
        "The second, and the reason is worth being precise about. Both sentences were generated. The difference is that the second describes a state of affairs you can check in seconds against the packet, while the first makes a claim about a process. Either verification happened in software, in which case say so and show it, or it never happened. A generated claim that something was verified is the least useful sentence in either output.",
    },
    sections: [
      {
        title: "Two different things called confidence",
        paragraphs: [
          "The first is stated confidence: words in the output saying how sure the system is. It comes out of the loop, from the same distribution machinery as everything else, and it reflects how such sentences tend to be written in text of that kind. It carries no measurement.",
          "The second is the probability the model assigned to the tokens it chose. That is a real quantity, it exists inside the system, it is often unavailable through an interface, and it means something narrower than people assume. High probability on the tokens spelling a date means the continuation was strongly favoured. It says nothing about whether the date was read from a document or composed. Treat it as a weak signal worth having and never as an accuracy figure.",
          "The word that matters for both is calibration: whether stated or measured confidence tracks observed accuracy. Establishing that requires running a set of cases with known answers and comparing. That is an evaluation, it is covered in module seven, and it is the only route to a number you can defend.",
        ],
      },
      {
        title: "Why tone misleads so effectively here",
        paragraphs: [
          "Human writing carries weak signals about certainty because writers experience uncertainty and it leaks into their prose. Readers have spent their whole lives calibrating against that leak. When a document sounds confident, decades of experience say the author probably had grounds.",
          "Generated text keeps the surface features and drops the source. The hedges, the qualifiers and the assured declaratives are all reproduced faithfully, and they are reproduced according to how such passages usually run, with no relation to how well-supported this particular claim happens to be. So the most reliable instinct a senior reader has gets quietly inverted, and it stays inverted no matter how much experience they accumulate with the tool.",
        ],
      },
      {
        title: "Making uncertainty more legible",
        paragraphs: [
          "Three phrasings help at the margin, and all three are nudges instead of mechanisms. Asking for the source alongside each claim converts vague assurance into something checkable: where in the supplied material does this come from? An answer that cannot point anywhere has told you what you needed. Asking what would have to be true for this answer to be wrong tends to surface the assumption the system is leaning on. And asking it to list what was absent from the material, before answering, produces a gap list you can act on.",
          "Each of these works by changing what the output contains, and none of them consults an internal state. That is the ceiling, and knowing where the ceiling sits is what stops a team from building a review process on top of a number that means nothing. Ask for the status of invoice 8812 and you get a confident paragraph. Ask for the status with a source for every claim and you get the same paragraph with three sources and one claim standing alone. The claim standing alone is the receiving record, and finding it took a phrasing change instead of a better model.",
        ],
      },
    ],
    misconception: {
      says: "It told us it was 95% confident, so we route anything under 90 to a human.",
      why: "The figure was generated by the same loop that generated the answer, and the threshold gives a review process the appearance of measurement while resting on text. If routing by confidence is wanted, the number has to come from a measured comparison against known answers. And once such a comparison exists, it will produce a better rule than the model's own adjective.",
    },
    widget: {
      kind: "tokens",
      mode: "resample",
      dataset: "confidence-20",
      caption:
        "Twenty recorded runs, each with the system's stated confidence and whether it was actually right. Sort by stated confidence and look for the relationship.",
    },
    instrument: {
      name: "Three questions that beat a confidence score",
      body: "Ask these of the output instead of the model's self-assessment. Each converts assurance into something checkable.",
      items: [
        "For each claim: where in the supplied material does this come from?",
        "What was absent from the material that you would have wanted?",
        "What would have to be true for this answer to be wrong?",
        "Never build a routing rule on a stated confidence figure.",
        "If you want a threshold, get it from a measured set. Module seven shows how.",
      ],
    },
    soWhat:
      "You can recognize a review process built on generated self-assessment, which is a common and confident-looking design, and you can say precisely what would have to exist for a threshold to mean anything.",
    checks: [
      {
        q: "An output ends: all fields verified against the source document. What is the right response?",
        options: [
          {
            text: "Accept it. verification is the assurance you wanted.",
            feedback:
              "The sentence was generated. Verification claims are worth exactly as much as the software that performed one.",
            impliesMissing: "A-CALIBRATION",
          },
          {
            text: "Ask whether any software performed a check, and if so, ask to see its output instead of the sentence.",
            correct: true,
            feedback:
              "Correct. Either a validator ran, in which case show its result, or nothing ran and the sentence is decoration.",
          },
          {
            text: "Ask the model to double-check its verification.",
            feedback:
              "That produces a second generated claim about a first generated claim. The loop is the same both times.",
            impliesMissing: "A-CALIBRATION",
          },
        ],
      },
      {
        q: "Why is a self-reported confidence figure different from an error bar?",
        options: [
          {
            text: "Error bars are more precise versions of the same thing.",
            feedback:
              "They differ in kind. One is generated text; the other is computed from repeated observation against known answers.",
            impliesMissing: "A-CALIBRATION",
          },
          {
            text: "An error bar comes from running known cases and observing how the result moves; the figure comes from the loop and rests on nothing.",
            correct: true,
            feedback:
              "Correct, and the practical implication is that anyone who wants thresholds needs an evaluation instead of a prompt.",
          },
          {
            text: "Error bars apply to numeric outputs and confidence applies to text.",
            feedback:
              "Both apply to any output where you can define correctness. The difference lies in where the number comes from.",
            impliesMissing: "A-VARIANCE",
          },
        ],
      },
      {
        q: "Which phrasing most improves your ability to catch a wrong answer?",
        options: [
          {
            text: "Be accurate and do not guess.",
            feedback:
              "Changes probabilities slightly and leaves you with no more to check than before.",
            impliesMissing: "A-HALLUCINATION",
          },
          {
            text: "For each claim, cite where in the supplied material it came from.",
            correct: true,
            feedback:
              "Correct. It converts a reading problem into a checking problem, and the claims with nowhere to point identify themselves.",
          },
          {
            text: "Rate your confidence in each field from one to ten.",
            feedback:
              "Produces more generated text with the appearance of measurement, which is the specific trap of this lesson.",
            impliesMissing: "A-CALIBRATION",
          },
        ],
      },
    ],
    next: "jagged-capability",
    relatedUseCases: ["audit-evidence-requests", "prior-auth-packet-chase"],
  },

  {
    slug: "jagged-capability",
    order: 11,
    n: "2.3",
    module: "M2",
    kind: "lesson",
    minutes: 20,
    title: "Why is it brilliant here and useless there?",
    blurb:
      "Capability is a spike beside a hole, with nothing smooth in between. Performance on one task predicts remarkably little about the task next to it.",
    thesis:
      "Capability across tasks is jagged instead of levelled, so a result on any task supports almost no inference about a neighbouring task, and the only way to know how a system performs on your work is to run it on your work.",
    lede:
      "People carry a mental model of general ability calibrated on humans, where someone who writes well and reasons carefully will probably handle an adjacent task competently. That model transfers poorly. These systems hold startling capability beside surprising gaps, the boundary between them follows no intuitive logic, and the gaps move between releases in ways nobody predicts. This lesson ends with the instrument you will use more than any other in the course.",
    youWill: [
      "Explain why one benchmark result predicts almost nothing about your queue.",
      "Recognise when a capability claim is being extended past its evidence.",
      "Run a thirty-minute capability test on your own work.",
    ],
    atoms: ["A-JAGGED", "A-OWNTEST"],
    prereqs: ["A-HALLUCINATION"],
    ceiling:
      "Jaggedness as an observed regularity with a plausible cause in training distribution. No scaling-law discussion, no emergent-capability literature. The conclusion is that you must test on your own work, and the instrument for doing so.",
    situation: {
      artifact:
        "A system that reliably reads scanned invoices in six languages, extracts eleven fields, and reconciles them against purchase orders. Asked to sort the same invoices by amount, largest first, it gets the order wrong on lists longer than about twenty.",
      prompt: "How should that combination be read?",
      options: [
        "As a bug that will be fixed shortly",
        "As evidence the reconciliation results are also unreliable",
        "As normal, and as a warning about what else you have assumed",
      ],
      reveal:
        "As normal. Multilingual extraction and sorting a list are unrelated capabilities that happen to feel adjacent to a human, and competence at one implies nothing about competence at the other. The correct reading is neither alarm nor dismissal. It is a reminder that every capability you have assumed instead of observed is an assumption, and that sorting has just joined the list of things to check.",
    },
    sections: [
      {
        title: "What jagged means, precisely",
        paragraphs: [
          "A capable system can produce a competent contract summary and then miscount the clauses in it. It can write correct code for a moderately difficult problem and fail an arithmetic step a child would complete. It can handle a badly scanned invoice in a language it was barely trained on, then lose track of which of two invoices was under discussion.",
          "The pattern is that competence follows the shape of what appeared, in what quantity, in the material the system was trained on and steered with. That shape bears no relation to how tasks feel related to a person. Tasks a human considers neighbours can sit on opposite sides of a gap. Tasks a human considers unrelated can both be handled well.",
          "The disorienting part is that the gaps move. A release improving a headline capability can regress something narrow and specific that your workflow depended on, and nobody will have tested for it because nobody knew you depended on it. That is the mechanical reason behind version pinning, which arrives properly in module seven.",
        ],
      },
      {
        title: "Why benchmarks say so little about your queue",
        paragraphs: [
          "A public benchmark measures a defined task on a defined distribution of inputs, usually curated, usually clean, often available on the internet for years. Your queue is a different task on a different distribution, and its hard cases are hard for reasons specific to your business: a vendor who sends photographs of screens, a legacy code that means something to three people, an exception type that occurs eleven times a year and costs a great deal each time.",
          "The gap between those two is a change of task and not a matter of degree. Which is why the strongest claim a benchmark result supports is that the system reached a certain score on that benchmark on a certain date. That statement is useful for comparing systems to each other and close to useless for predicting behavior on your work. A system scoring well on a document-understanding benchmark may still fail on invoice 8812 for reasons the benchmark never contained: the vendor writes the PO number in the subject line, the amount appears twice with different formatting, and half the queue arrives as forwarded email chains with the attachment three replies down. None of that is exotic. It is simply yours.",
        ],
      },
      {
        title: "The thirty-minute test",
        paragraphs: [
          "The response to jaggedness is embarrassingly simple and almost nobody does it before a procurement conversation. Take twenty real items from the queue you care about, including the ugly ones. Write down the correct answer for each, from the records, by hand. Run all twenty through whatever system is on the table, three times each. Count.",
          "That is an afternoon at most, it costs a few dollars, and it produces something no vendor deck can: a number about your work. It also produces the twenty cases that become the foundation of a real evaluation in module seven, so the afternoon is never wasted even if the system gets rejected.",
          "Two design notes matter. Include the tail deliberately, because if two of your twenty are the awkward cases you have roughly matched reality and you will learn far more than a clean twenty would teach. And run each item more than once, for the reason established in lesson 1.6.",
        ],
        list: [
          "Twenty real items, chosen to include the awkward ones instead of to flatter.",
          "Correct answers written down first, from records and not from memory.",
          "Three runs each, because one run is a draw.",
          "Count exactly, by field, and keep the failures. They are the most valuable output.",
          "Keep the twenty. They become the frozen set later, and freezing them early is free.",
        ],
      },
    ],
    misconception: {
      says: "It passed the bar exam, so reading our contracts will be straightforward.",
      why: "Exam performance describes a curated task with clean inputs and known answers, drawn from material publicly available for years. Your contracts are a different task on a different distribution, and the gap can be enormous in either direction. The claim is evidence about the exam and about nothing else.",
    },
    widget: {
      kind: "evalbench",
      mode: "run",
      dataset: "capability-probe",
      caption:
        "One system across six task types on the same invoice data. Guess the ranking before revealing it. Most people get it wrong, which is the lesson.",
    },
    instrument: {
      name: "The thirty-minute capability test",
      body: "The instrument you will use more than any other. Run it before any procurement conversation, and keep the output.",
      items: [
        "Pick one queue and take twenty real items, including three or four ugly ones.",
        "Write the correct answer for each, from records, before running anything.",
        "Run every item three times through each system under consideration.",
        "Score by field. Record which fields fail, and on which items.",
        "Report as a fraction with the date, the system version, and the run count. Never as a percentage alone.",
        "Keep all of it. This becomes your frozen set.",
      ],
    },
    soWhat:
      "You can decline to infer capability from an impressive adjacent result, and you have a repeatable half-day procedure that replaces the inference with a measurement about your own work.",
    checks: [
      {
        q: "A system scores 94% on a public document-understanding benchmark. What does that support about your invoice queue?",
        options: [
          {
            text: "That it will be roughly 94% accurate on your invoices.",
            feedback:
              "Different task, different distribution, and the benchmark may well have been in the training data. Transferring the number is the error this lesson exists to prevent.",
            impliesMissing: "A-JAGGED",
          },
          {
            text: "That it reached 94% on that benchmark on that date. Useful for comparing systems, and close to silent about your queue.",
            correct: true,
            feedback:
              "Correct. Benchmarks compare systems to each other. Only your own cases describe your work.",
          },
          {
            text: "Nothing at all. benchmarks are marketing.",
            feedback:
              "Too dismissive. A comparison between systems under identical conditions is informative within its scope.",
            impliesMissing: "A-JAGGED",
          },
        ],
      },
      {
        q: "Why include the ugly cases in a twenty-item test instead of a clean sample?",
        options: [
          {
            text: "To be fair to the vendor by showing the full range.",
            feedback:
              "Fairness is beside the point. The reason is informational.",
            impliesMissing: "A-OWNTEST",
          },
          {
            text: "Because the clean cases carry almost no information, while the tail is where the systems separate and where the cost sits.",
            correct: true,
            feedback:
              "Correct. Twenty clean items will show you three systems at ninety-something percent and tell you nothing about which to buy.",
          },
          {
            text: "Because the tail is the largest part of the queue.",
            feedback:
              "Usually the opposite. The tail is small in volume and large in cost per item, which is exactly why it decides the outcome.",
            impliesMissing: "A-OWNTEST",
          },
        ],
      },
      {
        q: "A model upgrade improves every headline benchmark. What should a team running it in production do?",
        options: [
          {
            text: "Upgrade, since every measured capability improved.",
            feedback:
              "Headline improvements coexist with narrow regressions, and yours is a narrow case nobody tested.",
            impliesMissing: "A-JAGGED",
          },
          {
            text: "Run their own twenty cases against the new version before switching, and treat the swap as an event to be measured.",
            correct: true,
            feedback:
              "Correct. This is the practice behind version pinning, which module seven turns into a standing rule.",
          },
          {
            text: "Wait six months for others to find the problems.",
            feedback:
              "Others will find their problems and not yours. Half an hour of your own cases beats six months of waiting.",
            impliesMissing: "A-OWNTEST",
          },
        ],
      },
    ],
    next: "the-window",
    relatedUseCases: ["ap-invoice-exceptions", "rfp-response-assembly"],
  },
  {
    slug: "the-window",
    order: 12,
    n: "2.4",
    module: "M2",
    kind: "lesson",
    minutes: 22,
    title: "What does the model actually know about your company?",
    blurb:
      "The context window is the entire world of a single call, and between calls the model retains nothing. Everything that looks like memory was put there by software.",
    thesis:
      "A call sees exactly what was placed in its context window and nothing else, and the model carries nothing from one call to the next, so every appearance of memory is something a system assembled and re-sent.",
    lede:
      "This is the second load-bearing mechanism in the course, and it explains a long list of otherwise puzzling behavior: why the assistant forgot a decision from yesterday, why it repeats a question, why the same query gives different answers on different days, and why a claim that a system has learned your business is almost always describing something else.",
    youWill: [
      "Say what is actually in a call: system prompt, tools, retrieved material, history, question.",
      "Explain why nothing carries between calls without software putting it there.",
      "Translate any claim about memory into a claim about who assembled the context.",
      "Read a window as a budget with an owner for every block.",
    ],
    atoms: ["A-WINDOW", "A-STATELESS"],
    prereqs: ["A-NEXTTOKEN"],
    ceiling:
      "The window as the complete input to one call, and statelessness between calls. Retrieval mechanics come in 2.7; the three memories come in 5.4. Here the reader needs only that the boundary exists and where it sits.",
    situation: {
      artifact:
        "A user says: yesterday I told it that this vendor always sends the PO number in the subject line, and today it asked me again. Someone replies that the model must be having a bad day.",
      prompt: "What is the most likely explanation?",
      options: [
        "The model forgot, which happens with long conversations",
        "Nothing stored the fact, so nothing put it in today's context",
        "The model was updated overnight and lost its memory",
        "The fact was stored but ranked too low to be retrieved",
      ],
      reveal:
        "The second, overwhelmingly. Nothing forgot anything, because nothing remembered anything. The sentence yesterday went into one call's context, produced tokens, and ended. For today's call to contain that fact, some piece of software had to store it and put it back, and in most deployments no such software exists. The fourth option describes a real and more interesting failure, and it can only happen in a system that was built to store things at all.",
    },
    sections: [
      {
        title: "What is actually in a call",
        paragraphs: [
          "A single call is a sequence of tokens assembled from a handful of blocks, and it helps enormously to picture them as physical things with sizes and owners.",
          "There is usually a system prompt: standing instructions about role, format and constraints, written by whoever built the application. There may be a tool list: names and argument shapes for the software the model may request, covered properly in module four. There is often retrieved material, being documents or records that some software fetched and pasted in. There is often conversation history, meaning previous turns, re-sent in full every time. And there is the current question.",
          "That assembled sequence is the entire world of the call. Anything in it can influence the answer; anything outside it may as well not exist. Every design question about grounding, memory, cost and injection is a question about what goes into those blocks and who decides.",
        ],
        table: {
          head: ["Block", "What it is, and what it costs you"],
          rows: [
            {
              label: "System prompt",
              body: "Standing instructions. Written by the application, invisible to the user, re-sent on every call and paid for on every call.",
            },
            {
              label: "Tool list",
              body: "Names and argument shapes the model may request. Takes real space, and defines the outer limit of what can happen.",
            },
            {
              label: "Retrieved material",
              body: "Records and documents that software fetched and pasted. Where truth enters, and where most of the risk sits.",
            },
            {
              label: "History",
              body: "Earlier turns, re-sent in full each time. This is why a long conversation gets slower and more expensive.",
            },
            {
              label: "The question",
              body: "Usually the smallest block, and usually the only one the user believes they are sending.",
            },
          ],
        },
      },
      {
        title: "Statelessness, and what it explains",
        paragraphs: [
          "Between calls the model retains nothing at all. It holds no store, no per-customer state, no accumulating file on your business. A conversation feels continuous because the application re-sends the earlier turns each time, which is also why the cost of a long conversation grows with its length instead of staying flat.",
          "Once you hold this, a set of puzzling behaviors resolves at once. It forgot what I told it earlier means the history was trimmed or was never kept. It gives different answers on different days means either the sample fell differently or the assembled context differed. It seems to know things about us means someone put those things in the context, and the useful question is who, and from where.",
        ],
      },
      {
        title: "The claim about learning",
        paragraphs: [
          "One specific claim is worth being able to take apart, because it appears in most vendor conversations: the system learns your business as you use it.",
          "In almost every case that sentence describes one of four things. Someone wrote your specifics into a system prompt, which is a document a person maintains. Your documents were indexed so they can be retrieved and pasted into future contexts, which is search. Your interactions were stored in a database that gets consulted and pasted in, which is a database. Or, occasionally, your data was used to adjust weights, which is training and carries a cost, a schedule and consequences you should know about in advance.",
          "All four are legitimate. They differ enormously in cost, in where your data ends up, and in what happens when you leave. The word learning covers all four and distinguishes none, which is why it is worth replacing with a question: what stores it, and what puts it back?",
        ],
        example: {
          title: "What the packet has to carry",
          body: `For an agent to handle invoice ${CASE.invoice} it has to hold the invoice, PO ${CASE.po}, the vendor's payment terms, whatever the team decided last time this vendor sent a photograph instead of a PDF, and the current rule about ${CASE.terms}. None of that appears by itself. Every item is a block some software assembled, and the design of that assembly is most of the engineering.`,
        },
      },
    ],
    misconception: {
      says: "It is learning our business as we use it.",
      why: "Four different mechanisms hide behind that phrase: a maintained system prompt, an index that gets searched, a database that gets consulted, or actual training. They differ in cost, in where your data ends up, and in what survives if you switch vendors. Replace the phrase with what stores it and what puts it back, and the answer becomes checkable.",
    },
    widget: {
      kind: "context",
      mode: "budget",
      dataset: "call-window",
      caption:
        "A real call laid out as blocks with a token budget. Remove any block and watch the answer change, and watch the bill change with it.",
    },
    instrument: {
      name: "The window ledger",
      body: "For any system that uses a model, fill this in. It takes an hour, and it is the fastest way to understand what you actually bought.",
      items: [
        "List every block that goes into one call, in order.",
        "For each: who wrote it, how big is it, and how often does it change?",
        "Mark which blocks are re-sent on every call. That is your standing bill.",
        "Mark where each retrieved item came from, and what happens when the source is stale.",
        "Name what carries between calls, and the exact piece of software that carries it.",
        "Anything nobody can account for should be treated as absent, because for the model it is.",
      ],
    },
    soWhat:
      "You can translate every claim about memory, learning and context into a claim about specific software assembling specific blocks, which turns a vague capability discussion into a short list of checkable questions.",
    checks: [
      {
        q: "A chat assistant appears to remember a decision from last week. What are the possible explanations?",
        options: [
          {
            text: "The model retained it, since recent models have longer memory.",
            feedback:
              "Nothing is retained between calls. Longer windows change how much can be re-sent and never whether something persists.",
            impliesMissing: "A-STATELESS",
          },
          {
            text: "Something stored it and re-sent it: history, a summary, a retrieved note, or a line someone added to the system prompt.",
            correct: true,
            feedback:
              "Correct, and each of those carries different durability, cost and audit properties, which module five takes apart.",
          },
          {
            text: "It was fine-tuned on your conversations overnight.",
            feedback:
              "Technically possible and almost never what happened. Training runs on a schedule with a cost, and someone would know.",
            impliesMissing: "A-WINDOW",
          },
        ],
      },
      {
        q: "Why does a long conversation get slower and more expensive per turn?",
        options: [
          {
            text: "The model accumulates state and has more to consider.",
            feedback:
              "No state accumulates. What grows is the input being re-sent.",
            impliesMissing: "A-STATELESS",
          },
          {
            text: "Because the history is re-sent in full each turn, so every turn reads a longer input.",
            correct: true,
            feedback:
              "Correct, and it explains why compaction exists, which is the subject of 2.6.",
          },
          {
            text: "Because providers throttle long sessions.",
            feedback:
              "Rate limits exist and are a separate matter. The growth here is mechanical.",
            impliesMissing: "A-WINDOW",
          },
        ],
      },
      {
        q: "Which question best replaces does it learn from our data?",
        options: [
          {
            text: "Which model are you using?",
            feedback:
              "A reasonable question elsewhere and unrelated here. Learning claims are about storage and assembly.",
            impliesMissing: "A-WINDOW",
          },
          {
            text: "What stores it, and what puts it back into the next call?",
            correct: true,
            feedback:
              "Correct. The answer distinguishes a system prompt from an index from a database from actual training, and those differ in every way that matters.",
          },
          {
            text: "How large is your context window?",
            feedback:
              "Capacity, not persistence. A large window still holds nothing between calls.",
            impliesMissing: "A-STATELESS",
          },
        ],
      },
    ],
    next: "more-context-worse",
    relatedUseCases: ["shared-inbox-triage", "vendor-onboarding-packs"],
  },

  {
    slug: "more-context-worse",
    order: 13,
    n: "2.5",
    module: "M2",
    kind: "lesson",
    minutes: 22,
    title: "When does more context make it worse?",
    blurb:
      "Relevance competes. Adding related-but-irrelevant material raises the odds that the wrong passage wins, and the middle of a long window is where a needle goes to die.",
    thesis:
      "Every token in the window competes for a finite budget of attention, so material that is topically adjacent and irrelevant actively degrades the answer instead of merely padding it, and depth within the window changes retrieval reliability sharply.",
    lede:
      "Two forces make the intuition wrong. Adjacent material competes hardest, because it looks like an answer to a question much like the one asked. And depth matters: the same fact placed at the top, the middle and the bottom of a long context gets found at very different rates. Together they explain why a two-page packet beats a two-hundred-page attachment, reliably, at a hundredth of the cost.",
    youWill: [
      "Explain why irrelevant-but-related material does more damage than unrelated material.",
      "Predict the effect of depth on whether a fact gets found.",
      "Rank candidate context designs before running anything.",
    ],
    atoms: ["A-STUFFING", "A-MIDDLE"],
    prereqs: ["A-WINDOW", "A-LONGCTX"],
    ceiling:
      "Competition for finite weight, and the depth curve as an observed regularity to design against. No retrieval-metric discussion; 2.7 covers how material gets chosen.",
    situation: {
      artifact:
        "Three designs for the same question, which asks whether a specific invoice may be released for payment. Design A: the invoice and the purchase order, two pages. Design B: those two plus the last twelve months of correspondence with this vendor, ninety pages. Design C: those two plus the full accounts-payable policy manual, sixty pages.",
      prompt: "Rank them, best answer first.",
      options: [
        "A, then C, then B",
        "B, then C, then A. more context is better",
        "C, then B, then A. policy is decisive",
        "A, then B, then C",
      ],
      reveal:
        "A first, comfortably. Between B and C the ordering depends on the question, and both perform worse than A for the same reason. Ninety pages of correspondence contains dozens of passages discussing receipts, deliveries and payment holds for other invoices, and sixty pages of policy contains rules that apply in general. Both are competing to answer a question adjacent to the one asked. Unrelated material would be cheaper noise; related material is the expensive kind.",
    },
    sections: [
      {
        title: "Competition, and not addition",
        paragraphs: [
          "The instinct behind stuffing treats context as a library: more books on the shelf, more chance the answer is in there. The mechanism from 1.5 says something different. Every token competes for a finite budget of weight, and the material that competes most effectively is the material that most resembles an answer.",
          "That inverts the usual expectation about relevance. A hundred pages of unrelated engineering documentation is mostly harmless, expensive noise. Ninety pages of correspondence with the same vendor about the same class of problem is dangerous, because a passage discussing a receipt for a different invoice looks like the passage the question is asking about. The stronger the topical similarity, the worse the interference.",
          "This is why teams often report that a system got worse after they gave it access to more of their documents. The report is usually accurate, and it usually gets misdiagnosed as a retrieval-quality issue when the cause is that retrieval returned twenty plausible passages where three were needed.",
        ],
      },
      {
        title: "Depth, and why a bigger window fails to fix it",
        paragraphs: [
          "Place a single fact in a long context and vary only its position. Near the beginning it gets found reliably. Near the end it gets found reliably. Somewhere around the middle the rate falls off, sometimes dramatically, and the effect persists across systems and across releases.",
          "Treat it as a property to design against instead of a defect awaiting a fix. The design consequences are short and worth applying literally: put decisive material at the top or the bottom, keep the context short enough that depth stops being a variable, and treat any design depending on something buried at forty percent depth as fragile even while it currently works.",
          "Window sizes have grown by orders of magnitude, and each expansion produces a wave of designs that attach everything on the grounds that it now fits. The capacity is real; the improvement usually fails to appear. Fitting and using are separate properties. A window accepting a hundred documents still applies a finite budget of weight across all of them, still has a middle, and still costs on every token. Growing capacity changes what is possible when you truly cannot narrow the material, which is a rare and legitimate case, and it changes nothing about the everyday case where three pages would have answered the question.",
        ],
        example: {
          body: `To settle invoice ${CASE.invoice}, three things decide it: the invoice, PO ${CASE.po}, and whether a receiving record exists. Adding the vendor's full correspondence history introduces eleven other conversations about missing receipts, at least two of which were resolved by a manager waiving the requirement. A passage describing one of those waivers is a strong candidate for attention and a wrong answer to this question.`,
        },
        list: [
          "Related material competes hardest; unrelated material is merely expensive.",
          "Decisive facts belong at the top or the bottom, never mid-body.",
          "A retrieval step returning twenty passages has usually created the problem it was meant to solve.",
          "When a system degrades after being given more documents, suspect competition before suspecting the model.",
        ],
      },
    ],
    widget: {
      kind: "context",
      mode: "needle",
      dataset: "needle-depth",
      caption:
        "One fact, three depths, two context lengths, plus a version where nine similar passages have been added. Predict the ranking before revealing it.",
    },
    instrument: {
      name: "The packet checklist",
      body: "Extends the packet rule from 1.5. Run it on any retrieval design before it ships.",
      items: [
        "How many passages does retrieval return by default? If more than about five, ask why.",
        "How many of those could plausibly answer a question adjacent to the real one?",
        "Where does the decisive material sit in the assembled context: top, bottom, or middle?",
        "What is the total token count, and what does it cost at your monthly volume?",
        "Test the same question with the packet halved. If the answer holds, halve it in production.",
      ],
    },
    soWhat:
      "You can diagnose the most common quiet regression in these systems, which is accuracy falling after more documents were connected, and you can propose the fix. It is usually to return fewer passages and not to change model.",
    checks: [
      {
        q: "A team connects their full document store and accuracy drops. What is the most likely cause?",
        options: [
          {
            text: "The model is overwhelmed and needs a larger context window.",
            feedback:
              "A larger window holds more of the same competition. Capacity was never the constraint.",
            impliesMissing: "A-STUFFING",
          },
          {
            text: "Retrieval now returns many topically similar passages that answer adjacent questions, and one of them is winning.",
            correct: true,
            feedback:
              "Correct, and the fix is usually to return fewer, better-targeted passages, with no change to the model.",
          },
          {
            text: "The documents are of poor quality.",
            feedback:
              "Sometimes true and rarely the main effect. The same documents worked fine when three were supplied instead of twenty.",
            impliesMissing: "A-STUFFING",
          },
        ],
      },
      {
        q: "You must include a long document and one fact inside it is decisive. What do you do?",
        options: [
          {
            text: "Include it as is and rely on the model to find the fact.",
            feedback:
              "If the fact lands mid-document, the odds of it being found fall sharply and unpredictably.",
            impliesMissing: "A-MIDDLE",
          },
          {
            text: "Extract the decisive passage and place it at the top or bottom, keeping the full document only if something else needs it.",
            correct: true,
            feedback:
              "Correct. Extraction plus placement is the standard fix, and it usually shortens the context as a bonus.",
          },
          {
            text: "Duplicate the document so the fact appears twice.",
            feedback:
              "Doubles the cost, doubles the competition, and helps inconsistently. Extraction does the job cleanly.",
            impliesMissing: "A-MIDDLE",
          },
        ],
      },
      {
        q: "Why is topically related noise worse than unrelated noise?",
        options: [
          {
            text: "Because there is usually more of it.",
            feedback:
              "Volume is incidental. The effect holds when the two are matched for length.",
            impliesMissing: "A-STUFFING",
          },
          {
            text: "Because it resembles an answer to the question, so it competes strongly for the attention that should have gone to the decisive passage.",
            correct: true,
            feedback:
              "Correct. Similarity is what makes it a competitor and not merely a cost.",
          },
          {
            text: "Because the model gets confused by contradictions.",
            feedback:
              "Contradiction is one route to a wrong answer. The competition effect appears even where nothing contradicts anything.",
            impliesMissing: "A-ATTENTION",
          },
        ],
      },
    ],
    next: "compaction",
    relatedUseCases: ["customs-entry-document-packs", "rfp-response-assembly"],
  },

  {
    slug: "compaction",
    order: 14,
    n: "2.6",
    module: "M2",
    kind: "lesson",
    minutes: 20,
    title: "Where do the numbers go when it summarises?",
    blurb:
      "Compaction is lossy in a specific direction. Identifiers, amounts and dates are the first things a summary drops, which is why long runs corrupt exactly what matters.",
    thesis:
      "Summarising a history to keep it inside a window discards the low-frequency, high-consequence tokens first, meaning identifiers, amounts and dates, so a long-running system quietly loses the information most likely to matter and keeps the narrative that sounds fine without it.",
    lede:
      "Every system that runs for a while faces the same pressure. History grows, the window is finite, and the standard remedy is to summarise the old part. It is a sensible remedy with a specific and predictable cost, and the cost falls on the material the previous lessons told you to protect. This lesson also settles what prompt caching is, because it gets confused with memory and it is a different thing entirely.",
    youWill: [
      "Say what compaction drops first and why that ordering is predictable.",
      "Name the fields that must survive any summarisation, and how to make them.",
      "Explain prompt caching as an economics fact instead of memory.",
      "Recognise the failure signature of a long run that has been compacted.",
    ],
    atoms: ["A-COMPACTION", "A-CACHE"],
    prereqs: ["A-WINDOW"],
    ceiling:
      "Compaction as lossy in a predictable direction, and caching as a discount on a stable prefix. No summarisation algorithms, no cache-implementation detail beyond prefix stability.",
    situation: {
      artifact:
        "A twenty-step agent run. At step eleven the history was summarised to fit the window. The summary reads: the agent reviewed the invoice and the purchase order, confirmed the vendor and terms, identified a missing receipt, and drafted a follow-up to the buyer.",
      prompt: "What has been lost, and does it matter?",
      options: [
        "Nothing important. the summary captures the sequence accurately",
        "The invoice number, the amount, the PO number and the buyer's name",
        "The reasoning, which cannot be reconstructed",
        "The timestamps, which matter for audit only",
      ],
      reveal:
        "The second, and it matters enormously. Every specific has become a category: the invoice, the vendor, the buyer. From step twelve onward the run is operating on a story about an invoice instead of on invoice 8812, and the next time it needs the amount or the purchase-order number it has to compose one, with everything lesson 2.1 says about what that produces. The summary is a good summary. That is the problem.",
    },
    sections: [
      {
        title: "Why the loss runs in that direction",
        paragraphs: [
          "A summary keeps what is structurally load-bearing in the narrative and drops what is incidental to it. In ordinary prose that heuristic is correct, because a reader wants the shape of what happened. The specifics that get dropped are the tokens appearing once, carrying no grammatical work, and hard to predict: an eight-digit invoice number, an amount, a date, a person's surname.",
          "Those are also, in an operating context, the only parts that can cause a wrong payment. So the ordering of what gets discarded is close to the reverse of the ordering of what matters, and it is predictable enough that you can name in advance what a summary will lose.",
          "The failure signature is distinctive once you know it. A long run behaves well early and starts producing confident, generic, slightly-off statements later. Amounts drift toward round numbers. Identifiers become plausible instead of correct. Nothing errors; the run completes and looks fine.",
        ],
      },
      {
        title: "What survives, and how",
        paragraphs: [
          "The remedy is structural instead of better summarisation. Keep a small block of pinned facts outside the compactable history, written as a field list and not as prose, and re-send it verbatim on every call. Invoice number, purchase-order number, amount, vendor, buyer, decision so far. A few dozen tokens, immune to summarisation because nothing summarises them.",
          "The second half of the remedy is to fetch instead of remember. If the amount can be looked up by identifier at the moment it is needed, then losing it from history costs nothing. Systems designed this way degrade gracefully under compaction; systems that carry facts in the narrative degrade silently.",
        ],
        list: [
          "Pin a short field block holding identifiers, amounts, dates and the current decision. Re-send it verbatim, and never summarise it.",
          "Fetch anything retrievable by identifier at the moment it is needed, keeping it out of history entirely.",
          "Compact the narrative of what has happened, which is what summaries are good at.",
          "Discard tool output that has already been acted on. Keep the outcome, drop the payload.",
        ],
      },
      {
        title: "Prompt caching, which is a different thing",
        paragraphs: [
          "If the front of a call is identical to the front of a previous call, providers can reuse the work already done on that prefix and charge substantially less for it. That is prompt caching, and for a system sending the same long system prompt and tool list on every call, the saving is large enough to change unit economics.",
          "It gets confused with memory because both involve something persisting between calls. The distinction is worth holding firmly. Caching makes re-sending the same tokens cheaper. It never makes those tokens optional, and it stores nothing on your behalf. Change one character near the front of the prefix and the discount disappears for everything after it, which is why stable prefixes are a design goal instead of an accident.",
          "The practical rule follows directly. Put the stable material first, meaning role, format, tool list and standing policy, and the variable material last. That single ordering choice can move the bill significantly, and it costs nothing to adopt.",
        ],
        example: {
          body: `A pinned block for the running case is five lines: invoice ${CASE.invoice}, vendor ${CASE.vendor}, ${CASE.amount}, PO ${CASE.po}, buyer ${CASE.buyer}. Roughly forty tokens, re-sent every call, never summarised. Every other fact about the run can be compacted freely, because the five that could cause a wrong payment are held outside the compactable region.`,
        },
      },
    ],
    misconception: {
      says: "We summarise the history to save tokens. it is free efficiency.",
      why: "The saving is real and the cost falls on identifiers, amounts and dates, which is the material most likely to cause a wrong action. Summarisation keeps narrative and drops specifics, so a compacted run becomes progressively more fluent about a case whose details it no longer holds.",
    },
    widget: {
      kind: "context",
      mode: "compaction",
      dataset: "history-compaction",
      caption:
        "A twenty-step history before and after compaction, with every dropped identifier highlighted. Then add a pinned block and compact again.",
    },
    instrument: {
      name: "The never-compact list",
      body: "Write this once per workflow. It is short, and it prevents the most expensive quiet failure in long-running systems.",
      items: [
        "List every field that could cause a wrong action if it were wrong: identifiers, amounts, dates, parties, the decision so far.",
        "Put those in a pinned block, as fields and not as prose, re-sent verbatim on every call.",
        "Everything retrievable by identifier stays out of history and gets fetched when needed.",
        "Compact only the narrative, and confirm the pinned block survived by checking it after a compaction.",
        "Order the context so stable material comes first, for the caching discount.",
      ],
    },
    soWhat:
      "You can explain why a long agent run degrades in a specific direction, name the five fields that must be protected, and separate a caching claim from a memory claim in a vendor conversation.",
    checks: [
      {
        q: "Which of these will a summary drop first?",
        options: [
          {
            text: "The sequence of what happened.",
            feedback:
              "Sequence is the narrative backbone and is what summaries preserve.",
            impliesMissing: "A-COMPACTION",
          },
          {
            text: "The invoice number and the amount.",
            correct: true,
            feedback:
              "Correct. They appear once, carry no grammatical work, and are hard to predict, which are the three properties that make a token expendable to a summariser and critical to you.",
          },
          {
            text: "The conclusion that a receipt was missing.",
            feedback:
              "That is the point of the story, so it survives. The specifics attached to it do not.",
            impliesMissing: "A-COMPACTION",
          },
        ],
      },
      {
        q: "A vendor says their prompt cache means the system remembers your context between sessions. What is wrong with that?",
        options: [
          {
            text: "Nothing. that is what caching does.",
            feedback:
              "Caching discounts re-sending identical tokens. The tokens still have to be sent, and nothing is stored for you.",
            impliesMissing: "A-CACHE",
          },
          {
            text: "Caching discounts a stable prefix that is still re-sent every call; it stores nothing on your behalf and makes no token optional.",
            correct: true,
            feedback:
              "Correct. Two different things persist here: a provider-side optimization, and an application deciding what to re-send. Only the second is memory.",
          },
          {
            text: "Caching is a security risk because your data sits on their servers.",
            feedback:
              "Residency and retention are real questions covered in module six, and they are a different objection from the one this claim invites.",
            impliesMissing: "A-CACHE",
          },
        ],
      },
      {
        q: "How do you make an identifier survive a long run?",
        options: [
          {
            text: "Ask the model to remember it.",
            feedback:
              "Nothing carries between calls except what software re-sends, so the request has nowhere to land.",
            impliesMissing: "A-STATELESS",
          },
          {
            text: "Hold it in a short pinned block re-sent verbatim on every call, and fetch anything else by identifier when needed.",
            correct: true,
            feedback:
              "Correct, and the pinned block should be fields and not prose, because prose is what summarisers rewrite.",
          },
          {
            text: "Repeat it in the conversation every few turns.",
            feedback:
              "Helps a little, costs tokens, and still sits inside the region that gets compacted.",
            impliesMissing: "A-COMPACTION",
          },
        ],
      },
    ],
    next: "grounding",
    relatedUseCases: ["ar-collections-chase", "bank-rec-exceptions"],
  },

  {
    slug: "grounding",
    order: 15,
    n: "2.7",
    module: "M2",
    kind: "lesson",
    minutes: 22,
    title: "How does a true fact get into the answer?",
    blurb:
      "Three doors: fetch by identifier, search, or dump everything. For a queue where you know which object you are looking at, fetch wins every time.",
    thesis:
      "Truth reaches an answer through one of three doors, and for operational work where the object is already identified, fetching the record by its identifier beats searching for it, because search is for when you cannot name what you are looking for.",
    lede:
      "Retrieval has become almost synonymous with one technique, and the technique is a search engine. Search is the right tool for a search problem: a question about a corpus where you cannot name the document in advance. Most operational work has the opposite shape, because the invoice number is right there. This lesson is about noticing which shape you have, and about what to do when two sources disagree.",
    youWill: [
      "Name the three doors and pick the right one from the shape of the task.",
      "Default to fetch whenever the object identifier is known.",
      "Treat retrieval as search, and never as memory or as a system of record.",
      "Decide, in writing and in advance, which source wins when sources conflict.",
    ],
    atoms: ["A-GROUNDING", "A-FETCHVSSEARCH", "A-SOR"],
    prereqs: ["A-WINDOW", "A-STUFFING"],
    ceiling:
      "Three doors and the conflict rule. Embeddings appear as text becomes coordinates so similar things sit near each other, and stop there. No dimensionality, no similarity measures, no index types. The decision that must follow is fetch versus search.",
    situation: {
      artifact:
        "Two architectures for the same AP assistant. Architecture A indexes every invoice, purchase order and receiving record into a vector store and searches it at question time. Architecture B calls the ERP with the invoice number and receives the three records back, exactly.",
      prompt: "Which one, and what does the loser get wrong?",
      options: [
        "A. the index scales better and handles any question",
        "B. the identifier is known, so searching for it adds only error",
        "A for exploration, B for operations, and most teams need both",
        "They are equivalent; the difference is implementation taste",
      ],
      reveal:
        "B for this task, and the third option is the right general answer. What A gets wrong is specific and worth naming: it converts a lookup with an exact answer into a similarity problem with a ranking, so it can return the invoice for the vendor's other outstanding item, or last quarter's version of the same record, and it will do so confidently. Search is a tool for finding things you cannot name. Here you can name it.",
    },
    sections: [
      {
        title: "The three doors",
        paragraphs: [
          "Fetch means calling a system with an identifier and receiving a record. Invoice 8812 returns invoice 8812. The result is exact, current, cheap and auditable, and if the record is absent you receive an absence instead of something similar.",
          "Search means finding candidate material by resemblance. Text gets converted into coordinates so that passages about similar things sit near each other, a question gets converted the same way, and the nearest passages come back. It is powerful for questions like what has this vendor previously said about delivery delays, where no identifier exists. It returns a ranked list of plausible candidates instead of an answer, and that difference is the whole lesson.",
          "Dump means putting the material in and letting attention sort it out. Lessons 1.5 and 2.5 explain why this degrades quickly. It survives as a reasonable choice only while the total material stays small.",
        ],
      },
      {
        title: "Why the wrong door is chosen so often",
        paragraphs: [
          "Indexing everything is a single project with a satisfying shape, while fetching by identifier requires an integration per system, and integrations are unglamorous work that has to be negotiated with the people who own those systems. So the index gets built first, and the operational lookups get routed through it because it exists.",
          "The result is a system that answers most questions adequately and produces a specific class of failure: the confident near-miss. The vendor is right, the document type is right, the shape of the answer is right, and it is the wrong record. Those failures are hard to spot precisely because everything about them looks correct, which is the profile you least want in anything touching money.",
          "The useful heuristic is short. If a person doing this job would look something up, fetch it. If a person would go hunting, search. Almost all queue work is the former.",
        ],
      },
      {
        title: "An index is not the ledger",
        paragraphs: [
          "A second confusion follows from the first. Once an index exists, it starts being treated as the place where things are known. Answers get drawn from it, decisions get made against it, and the index gradually acquires the status of a record with none of the properties that make a record trustworthy.",
          "An index holds copies, and copies age. It carries no transactions, no audit trail, and no owner in the sense that the ERP has one. When the ERP says the invoice was paid on Tuesday and the indexed copy says outstanding, the answer is settled by which one is the system of record, and that has to be written down before the first exception instead of argued during it.",
          "So the conflict rule belongs in the design document. For each class of fact, which system wins, and what happens when they disagree? Money, identity and status almost always resolve to the operational system. Narrative, precedent and context can come from the index. A design that has never named a winner will discover its rule during an incident.",
        ],
        example: {
          title: "Which door for which fact",
          body: `Fetch the invoice, PO ${CASE.po} and the receiving record from the ERP by identifier. Search the correspondence archive for what this vendor has previously said about missing receipts, because no identifier exists for that. Never let a searched passage override a fetched record on amount, status or terms. Write that sentence into the design.`,
        },
        list: [
          "A known identifier means fetch. This covers most operational work.",
          "An unknown object means search, and what comes back is a set of candidates.",
          "Small total material means a dump is acceptable, until it stops being small.",
          "Name the winning source per class of fact, in writing, before anything ships.",
        ],
      },
    ],
    misconception: {
      says: "We will put everything in a vector database and the assistant will have full context.",
      why: "It converts exact lookups into ranked resemblance, which produces confident near-misses on precisely the records where being close is worthless. It also quietly promotes an index of ageing copies into a de-facto system of record, with no transactions, no audit trail and no owner. Search belongs where identifiers do not exist.",
    },
    widget: {
      kind: "context",
      mode: "doors",
      dataset: "three-doors",
      caption:
        "The same question through all three doors, with the answer, the cost and the failure mode side by side. Then try the question that only search can handle.",
    },
    instrument: {
      name: "The grounding decision tree",
      body: "Four questions. Run them per fact the system needs, and write the answers into the design.",
      items: [
        "Does an identifier for this object exist at the moment of the call? If yes, fetch.",
        "If no identifier: is the task to find something, or to look something up?",
        "How many passages does search return, and how many could answer an adjacent question?",
        "Which system wins for this class of fact when sources disagree, and who decided?",
        "What happens when the fetch returns nothing? Absence must be handled and never filled in.",
      ],
    },
    soWhat:
      "You can look at a retrieval architecture and say whether it was built for the task it actually has, which is the difference between a system that produces exact answers and one that produces confident near-misses on records that carry money.",
    checks: [
      {
        q: "A support assistant must state a customer's current plan. What is the right door?",
        options: [
          {
            text: "Search the knowledge base for the customer's plan.",
            feedback:
              "The customer identifier exists, so this converts an exact lookup into a ranked guess.",
            impliesMissing: "A-FETCHVSSEARCH",
          },
          {
            text: "Fetch the account record by customer identifier from the billing system.",
            correct: true,
            feedback:
              "Correct. Exact, current, auditable, and an absent record returns as absent instead of as something similar.",
          },
          {
            text: "Include the last six months of tickets and let the model infer it.",
            feedback:
              "A dump, and one where a stale mention will confidently beat the current state.",
            impliesMissing: "A-GROUNDING",
          },
        ],
      },
      {
        q: "Which question needs search?",
        options: [
          {
            text: "What is the balance on invoice 8812?",
            feedback:
              "Identifier present, exact answer available. Fetch.",
            impliesMissing: "A-FETCHVSSEARCH",
          },
          {
            text: "Has this vendor previously disputed late-delivery charges, and on what grounds?",
            correct: true,
            feedback:
              "Correct. No identifier for the thing being sought, and the answer lives across documents nobody can name in advance.",
          },
          {
            text: "What are this vendor's payment terms?",
            feedback:
              "A field on a record, fetched by vendor identifier. Searching for it invites a stale copy to win.",
            impliesMissing: "A-FETCHVSSEARCH",
          },
        ],
      },
      {
        q: "The index says an invoice is outstanding; the ERP says it was paid on Tuesday. What should the system do?",
        options: [
          {
            text: "Present both and let the user decide.",
            feedback:
              "Acceptable as a last resort and a failure of design. The rule should have been written before the conflict occurred.",
            impliesMissing: "A-SOR",
          },
          {
            text: "Follow the pre-declared system of record for payment status, which is the ERP, and flag the index as stale.",
            correct: true,
            feedback:
              "Correct, and the flag matters as much as the answer, because a stale index will produce this again tomorrow.",
          },
          {
            text: "Take the more recent of the two timestamps.",
            feedback:
              "Recency of a copy says nothing about authority. An index refreshed this morning can hold last month's state.",
            impliesMissing: "A-SOR",
          },
        ],
      },
    ],
    next: "pretraining",
    relatedUseCases: ["ap-invoice-exceptions", "vendor-coi-chase"],
  },
];
