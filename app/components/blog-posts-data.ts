export type BlogPost = {
  slug: string;
  series: string;
  title: string;
  dek: string;
  date: string;
  dateLabel: string;
  authors: string[];
  substackUrl: string;
  /** Simple markdown: paragraphs separated by blank lines; ## / ### for headings. */
  body: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "follow-the-value",
    series: "Acquired Intelligence",
    title: "Follow the value.",
    dek: "Where value actually accrues and who does the work, when intelligence gets cheap.",
    date: "2026-08-05",
    dateLabel: "Aug 5, 2026",
    authors: ["Akash Raigangar", "Karo de Jonge", "Jusung Park"],
    substackUrl: "https://akashraigangar.substack.com/p/follow-the-value",
    body: `This post was written in collaboration with Karo de Jonge and Jusung Park.

"AI will change the world." You know it will, we know it will, our grandmas know it will. It's probably the most over-used cliché of the past 3 years, and somehow surprisingly still makes it as the opening line of every investor memo or LinkedIn post. The more worthwhile question to answer is how exactly. How will work get done? Where does the pool of value shift to? Will moats remain? In short, what will an AI-native business world look like?

Answering these questions was frankly personal to us, as we tried to figure out how to play in this ever-changing world of AI, while still leveraging our PE/PE-adjacent backgrounds. We knew deep down that our next play sat at the overlap of AI doing work and the PE world of services buyouts, but this thought exercise, as illustrated in this three-part series, helped us turn our gut feeling into a logical investment thesis.

We start with a look back, because our thesis didn't come from a single 'eureka' moment, but rather connecting dots that had been sitting in plain sight for years.

## Friction, Inc.

For the longest time, most businesses were built with the sole value proposition of reducing friction, either for other businesses or directly for humans. Friction showed up everywhere: the cost of finding information, the cost of coordinating with people, the cost of doing something you don't have the skills or time to do yourself. Every layer of the economy that exists between you and the thing you actually want done - i.e., the middle layer - is in some way, a friction-reduction business.

Software was the best example of this - selling a layer of (supposedly) complex tech that helped humans organize/package/streamline their intelligence. But these tools provided no intelligence of their own. The whole value proposition was: we'll help you organize your data, help your employees work faster, help you make sense of information you'd otherwise drown in, in return for an annual fee (plus being stuck to an ecosystem you can never move away from!).

The tech was truly one of the moats - and in some cases, rightly so. No 18 year-old with a $20 subscription could vibe-code a working CRM over a weekend. Building real software took years, real engineers, capital. These companies were structurally protected by how hard they were to replicate, and by lock-in baked into every contract.

## The work will get done. The question is by who?

Enter (Gen)AI.

At the start of this "revolution" though, there wasn't much change to the above dynamic. AI began as just this new productivity booster - helping us with research, writing our emails, and other specific but relatively lower-value use-cases. Super useful, but the onus of completing the task and holding accountability for the outcome still lay with the human. And thus, the original software value-prop still applied, just with a small nuance. AI software still reduced friction and helped humans do the work in a streamlined manner, now just in an even more efficient way: taking over some of the tasks, but still not fully 'doing' the work end-to-end.

However, this past year truly feels different; AI has crossed the capability threshold. Models have gone from being our co-pilots, as mere helpers on tasks, to true autopilots. AI is now actually capable of doing real work end-to-end and delivering outcomes - not just being an (often hallucinating) assistant.

AI is a true like-for-like substitute for cognitive labor in many use-cases now: the complex financial analysis gets done, the contract gets reviewed, the compliance check runs, all by AI and fully end-to-end.

At the risk of over-simplifying this shift (because there are a lot of nuances here!), we've basically gone through three phases:

"OG" SaaS (pre-AI) delivered almost no intelligence at all - just tools that would help organize, automate, and streamline intelligence work that humans were already doing. The value lay in the structuring, the workflow, and the resulting efficiency gains - i.e., a removal of friction.

Early AI (SaaS form) brought an element of intelligence in. The tools were based on the early models (GPT 3.5, Sonnet) and could analyze, recommend, predict - such that the value wasn't just the structuring but also the intelligence it provided - but only as a layer on top of existing workflows. The human still made the decisions and did the work, but the tool made them smarter vs. just more organized.

Note as the underlying models improve, AI SaaS provides better intelligence and handles more pieces of work vs. the early days. But it is still an out of the box solution - existing (human) workflows are maintained, AI just sits on top and helps with some pieces of it.

Next-gen AI gets the work done end-to-end, powered by the advancement in the models (GPT 5, Fable, Mythos). This doesn't just make humans smarter - but actually takes entire things off their plates and/or replaces the need for them to do the task at all. This has two implications:

First, this is highly customized - and at the workflow-level too, not just the AI sitting on top of it, because a workflow designed for AI to run end-to-end looks fundamentally different from a legacy one designed around a human doing the steps.

Second, much of this is/will be positioned as AI-native services, selling outcomes vs. selling the traditional SaaS product (more on this below).

People have been talking about "AI will take over jobs" for years - but we are only now actually approaching that moment, from an AI capability standpoint (social/policy-considerations aside). Obviously not to the extent some people think, but significant chunk of rules-based work (of which there's a lot) is up for grabs. In short, the work will indeed get done, but a LOT of it now with AI.

## Value shifts from "capability" to "ability"

Bringing us back to the value question: when AI is capable of actually doing the work end-to-end, why would anyone want a tool that just helps you do the work? You would rather want the work to be done, the outcome to be delivered. And it's this very reason why the application layer is becoming commoditized so fast: when the underlying model can do the work, everything built on top of it, to help humans do the work, suddenly matters a lot less. Thus, customer willingness-to-pay shifts from capability (i.e., a tool, which just reduces friction of doing work) to the ability (i.e., outcome); from "how good is your tool" to "just get the work done."

Software loses its value prop from this perspective firstly - the 'intelligence streamlining' model it relied on for ages is no longer needed by customers when an 'end-to-end doer' is available. Additionally though, even if the value prop had held, replicating software is significantly easier from a pure-tech perspective today - which in turn also causes the 'lock-in benefit' to no longer hold either. As such, AI has dissolved software's value prop and (tech) moat.

But a lot of AI-startup energy is still pointing straight at the collapsing middle (copilots, wrappers, point tools) that capture only one part/subpart of an existing workflow. Go figure!

Anyhow, where does that value go though? It doesn't just disappear - but rather shifts away from the players whose moat AI dissolves toward whoever still has one left standing. Think of it through a simple lens: the middle step in any value chain, like software, used to earn its margin by absorbing friction on someone else's behalf. Now that the friction it was absorbing is gone, that margin has to land somewhere else, and it lands on either side of where that middle step used to sit.

On one side sits the back end, meaning compute and the models themselves, which is essentially the fuel you need to run any of this in the first place. On the other side sits the front end - meaning value accrues to the companies that own something AI genuinely cannot manufacture on its own - an alpha, like a brand, a real customer relationship, a license, judgement built up over years of experience, or proprietary data nobody else has access to.

As friction disappears, value shifts to either side of the chain.

## The two kinds of outsourcing (spoiler: only one is valuable!)

This 'alpha' exists in many industries: consumer (brand), industrials (physical asset, installed base, IP) or even healthcare (patient, license, molecules). But nowhere is this more obvious than in B2B services. The world is shifting to outcomes, and services were always sold as outcomes. However, not all B2B services are created equal.

B2B services have always been outsourced for one of two reasons, and most people conflate them without realizing. The first reason is economic - you outsource something because a provider can do it cheaper, usually because they're spreading the cost across hundreds of other customers just like you. Call centers, BPO, basic execution work - where the only real value-add was scale. AI dissolves this completely: the moment a customer can get AI to do the same job directly, the cost advantage that justified the whole arrangement evaporates. The work either comes back in-house (AI disintermediates the service layer, customer owns the outcome) or gets commoditized down (especially when priced as T&M) - either way, savings leak to the customer.

The second reason has nothing to do with cost. You outsource something because you won't do it yourself, you're not allowed to, or you simply don't want to be the one holding the bag when something goes wrong. Regulation, licensing, the basic human desire to have someone else accountable end-to-end if things break. This is structural outsourcing, and AI doesn't touch it, because the reason you outsourced was not only about the capability, but more importantly for someone else to own the outcome.

So here's the actual diagnostic worth applying to any service business: are customers outsourcing for economic or structural reasons? If the honest answer is cost or scale, those B2B services businesses are exposed and likely don't have much time left. The cost advantage that justified its existence is exactly the kind of friction AI dissolved.

But if the answer is responsibility, regulation, or position, that business sits on the other side of the value shift entirely. It's protected in a way AI genuinely cannot reach, because the work being done was never really the point - it was rather who did it, who owned the outcome, who would be held accountable if something went wrong. This is at the core of our thesis.

Structurally outsourced businesses don't just survive AI, they thrive in many cases. Returns to equity holders grow meaningfully at the expense of labor. Cost collapses as AI (if set up right) handles some amount of delivery, but revenue stays anchored because the customer was never paying for labor, they were paying for position.

Property management is a clean example - the structural reason of outsourcing being offloading the accountability/outcome to someone else. A real estate investor doesn't hire a property manager because they're incapable of fixing a leaking pipe, but rather so that when a tenant calls at 2am, they're not the ones picking up the phone. That's structural outsourcing in its purest form with the moat protected - now with the potential for AI to automate many workflows sitting behind it, without changing the actual reason we needed that provider to exist.

However, outsourcing has to be genuinely structural, to be defensible. Property management is the easy example - but most sectors aren't that clean, and the answer isn't always intuitive. Especially since many B2B services appear to be protected, but either just have inertia or a temporary inefficiency disguising itself as something structural. If customers are sticking around purely because nobody's built a better alternative yet or due to a technology lag, that's not a moat. It's just that nobody's challenged it yet, and the value pool won't remain there indefinitely - these companies are living on borrowed time (more on structural outsourcing in a future post).

## Summary

To summarize, the value pool, the one AI dissolved out of software and the rest of the middle, doesn't land on B2B services as a whole. It lands on the slice of B2B services that passes this structural outsourcing test. Cost collapses because AI can handle (at least some) delivery now, but revenue stays anchored, because nobody was ever paying for the labor, they were paying for the position. That gap - cost falling while revenue holds - is exactly where the value pool actually lands, and where margins and multiples expand together.

The work is getting done, increasingly by AI. But even within this structural B2B services pool - what does it actually take to win, in this AI-age? Do all these players succeed just as a function of their outsourcing reason being structural? Is it as simple as "just using some AI," for these players to dominate the next decade?

We believe the future of this space is AI-native (which doesn't mean what most people think it does) - that's where we go deeper in our next piece, along with the importance of context and who ultimately wins in these markets.

If any of this resonates - whether you're an investor, a B2B services operator thinking about an exit, or just someone building / interested in this space - please reach out! We love nerd-ing about all things AI x services, so always welcome a chat!`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatBlogAuthors(authors: string[]): string {
  if (authors.length === 0) return "";
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
  return `${authors.slice(0, -1).join(", ")}, & ${authors[authors.length - 1]}`;
}
