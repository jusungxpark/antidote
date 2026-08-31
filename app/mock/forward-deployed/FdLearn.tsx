"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  LEARN_MODULES,
  LEARN_PARTS,
  getLearnModuleBySlug,
  type LearnModule,
  type LearnPartId,
} from "./learn-modules";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function defaultPartOpen(
  currentPart: LearnPartId | undefined,
): Record<LearnPartId, boolean> {
  const init = {} as Record<LearnPartId, boolean>;
  for (const p of LEARN_PARTS) {
    init[p.id] = currentPart ? p.id === currentPart : p.id === LEARN_PARTS[0].id;
  }
  return init;
}

let persistedPartOpen: Record<LearnPartId, boolean> | null = null;
let persistedNavScroll = 0;

function rememberLearnNavScroll() {
  const el = document.querySelector(".fdm-docs-side");
  if (el instanceof HTMLElement) persistedNavScroll = el.scrollTop;
}

export function FdLearnPage({
  slug,
  onHub,
  onHome,
  onOpen,
  onUseCase,
}: {
  slug: string | null;
  onHub: () => void;
  onHome: () => void;
  onOpen: (next: string) => void;
  onUseCase: (slug: string) => void;
}) {
  const mod = slug ? getLearnModuleBySlug(slug) : undefined;
  const missing = Boolean(slug) && !mod;

  const openUnit = (next: string) => {
    rememberLearnNavScroll();
    onOpen(next);
  };

  const skipArticleScroll = useRef(true);
  useLayoutEffect(() => {
    if (skipArticleScroll.current) {
      skipArticleScroll.current = false;
      return;
    }
    const root = document.querySelector(".fdm-root");
    const article = document.querySelector(".fdm-docs-article");
    if (!(root instanceof HTMLElement) || !(article instanceof HTMLElement)) {
      return;
    }
    const nextTop =
      root.scrollTop +
      (article.getBoundingClientRect().top - root.getBoundingClientRect().top) -
      8;
    root.scrollTo({ top: Math.max(0, nextTop), behavior: "auto" });
  }, [slug]);

  return (
    <div className="fdm-uc fdm-uc--docs fdm-docs">
      <FdLearnNav
        current={mod?.slug ?? null}
        onHub={onHub}
        onHome={onHome}
        onOpen={openUnit}
      />
      <div className="fdm-docs-main">
        {missing ? (
          <div className="fdm-docs-article">
            <p className="fdm-uc-empty">Unit not found.</p>
            <button type="button" className="fdm-text-link" onClick={onHome}>
              Back to Learn
            </button>
          </div>
        ) : mod ? (
          <FdLearnArticle
            mod={mod}
            onOpen={openUnit}
            onUseCase={onUseCase}
            onHome={onHome}
          />
        ) : (
          <FdLearnHome onOpen={openUnit} />
        )}
      </div>
    </div>
  );
}

function FdLearnNav({
  current,
  onHub,
  onHome,
  onOpen,
}: {
  current: string | null;
  onHub: () => void;
  onHome: () => void;
  onOpen: (slug: string) => void;
}) {
  const grouped = useMemo(() => {
    return LEARN_PARTS.map((part) => ({
      part,
      items: LEARN_MODULES.filter((m) => m.part === part.id),
    }));
  }, []);

  const currentPart = LEARN_MODULES.find((m) => m.slug === current)?.part;
  const sideRef = useRef<HTMLElement>(null);

  const [open, setOpen] = useState<Record<LearnPartId, boolean>>(() => {
    const init = persistedPartOpen
      ? { ...persistedPartOpen }
      : defaultPartOpen(currentPart);
    if (currentPart) init[currentPart] = true;
    return init;
  });

  useEffect(() => {
    persistedPartOpen = open;
  }, [open]);

  useEffect(() => {
    if (!currentPart) return;
    setOpen((prev) =>
      prev[currentPart] ? prev : { ...prev, [currentPart]: true },
    );
  }, [currentPart]);

  useLayoutEffect(() => {
    const el = sideRef.current;
    if (!el) return;
    el.scrollTop = persistedNavScroll;
    const onScroll = () => {
      persistedNavScroll = el.scrollTop;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      persistedNavScroll = el.scrollTop;
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const openUnit = (slug: string) => {
    const el = sideRef.current;
    if (el) persistedNavScroll = el.scrollTop;
    onOpen(slug);
  };

  return (
    <aside ref={sideRef} className="fdm-docs-side">
      <div className="fdm-docs-side-head">
        <button type="button" className="fdm-docs-crumb" onClick={onHub}>
          Resources
        </button>
        <button
          type="button"
          className={`fdm-docs-home${current === null ? " is-current" : ""}`}
          onClick={onHome}
        >
          Learn
        </button>
      </div>

      <nav className="fdm-docs-tree" aria-label="Learn units">
        {grouped.map(({ part, items }) => {
          const expanded = open[part.id];
          const panelId = `learn-part-${part.id.toLowerCase()}`;
          return (
            <div key={part.id} className="fdm-docs-branch">
              <button
                type="button"
                className={`fdm-docs-branch-toggle${
                  currentPart === part.id ? " is-active" : ""
                }`}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() =>
                  setOpen((prev) => ({ ...prev, [part.id]: !prev[part.id] }))
                }
              >
                <span className="fdm-docs-chevron" aria-hidden="true" />
                {part.label}
              </button>
              {expanded ? (
                <ul id={panelId}>
                  {items.map((m) => (
                    <li key={m.slug}>
                      <button
                        type="button"
                        className={m.slug === current ? "is-current" : undefined}
                        onClick={() => openUnit(m.slug)}
                      >
                        <span className="fdm-docs-num">{m.order}</span>
                        <span>{m.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function FdLearnHome({ onOpen }: { onOpen: (slug: string) => void }) {
  const first = LEARN_MODULES[0];
  const totalMin = LEARN_MODULES.reduce((sum, m) => sum + m.minutes, 0);
  return (
    <article className="fdm-docs-article">
      <p className="fdm-kicker">Transformation · Resources · Learn</p>
      <h1>How the stack actually works</h1>
      <p className="fdm-docs-standfirst">
        Twenty-two units, six parts. History and the four jobs, then the
        primitive (next-token), then every layer that has to wrap it: windows,
        tools, agents, tracing, guardrails, sandboxes, evals, cost. No lab.
        You should leave able to explain the mechanism, not able to train a
        model.
      </p>

      <section>
        <h2>How to read this</h2>
        <p>
          A straight read is about {Math.round(totalMin / 60)} hours. Take one
          part, then a use case. Units are numbered because they stack: unit 3
          is unit 2 seen from the error; agents are a model in a loop; a
          copilot is not a queue. Invoice 8812 runs through the course so the
          same case can carry a new principle. Collapse a part you do not need.
          Previous and next are always available.
        </p>
      </section>

      <section>
        <h2>Syllabus</h2>
        {LEARN_PARTS.map((part) => {
          const items = LEARN_MODULES.filter((m) => m.part === part.id);
          return (
            <div key={part.id} className="fdm-docs-syllabus">
              <h3>{part.label}</h3>
              <p className="fdm-docs-syllabus-blurb">{part.blurb}</p>
              <ol>
                {items.map((m) => (
                  <li key={m.slug}>
                    <button
                      type="button"
                      className="fdm-learn-inline"
                      onClick={() => onOpen(m.slug)}
                    >
                      {m.order}. {m.title}
                    </button>
                    <span className="fdm-docs-syllabus-meta">
                      {m.minutes} min
                    </span>
                    <p>{m.blurb}</p>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </section>

      {first ? (
        <p className="fdm-docs-start">
          <button
            type="button"
            className="fdm-btn fdm-btn--primary"
            onClick={() => onOpen(first.slug)}
          >
            Start with unit {first.order} · {first.title}
          </button>
        </p>
      ) : null}
    </article>
  );
}

function FdLearnArticle({
  mod,
  onOpen,
  onUseCase,
  onHome,
}: {
  mod: LearnModule;
  onOpen: (slug: string) => void;
  onUseCase: (slug: string) => void;
  onHome: () => void;
}) {
  const next = mod.next ? getLearnModuleBySlug(mod.next) : undefined;
  const prev = LEARN_MODULES.find((m) => m.next === mod.slug);
  const part = LEARN_PARTS.find((p) => p.id === mod.part);
  const toc = [
    { id: "in-this-unit", title: "In this unit" },
    ...mod.sections.map((s) => ({ id: slugify(s.title), title: s.title })),
    { id: "a-common-mix-up", title: "A common mix-up" },
    { id: "check", title: "Check" },
  ];

  return (
    <article className="fdm-docs-article">
      <header className="fdm-docs-hero">
        <p className="fdm-docs-meta">
          <button type="button" onClick={onHome}>
            Learn
          </button>
          <span aria-hidden="true">/</span>
          <span>{part?.label ?? mod.part}</span>
          <span className="fdm-docs-meta-dot" aria-hidden="true">
            ·
          </span>
          <span>
            Unit {mod.order} of {LEARN_MODULES.length}
          </span>
          <span className="fdm-docs-meta-dot" aria-hidden="true">
            ·
          </span>
          <span>{mod.minutes} min</span>
        </p>
        <h1>{mod.title}</h1>
        <p className="fdm-docs-standfirst">{mod.lede}</p>
      </header>

      <nav className="fdm-docs-onthepage" aria-label="On this page">
        <p>On this page</p>
        <ol>
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="fdm-docs-prose">
        <section id="in-this-unit">
          <h2>In this unit</h2>
          <p>After this unit you should be able to:</p>
          <ol className="fdm-docs-goals">
            {mod.youWill.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        {mod.sections.map((s) => (
          <section key={s.title} id={slugify(s.title)}>
            <h2>{s.title}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
            {s.example ? (
              <aside className="fdm-docs-example">
                <p className="fdm-docs-example-kicker">{s.example.title}</p>
                <p>{s.example.body}</p>
              </aside>
            ) : null}
            {s.rows && s.rows.length > 0 ? (
              <dl className="fdm-uc-deflist">
                {s.rows.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.body}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {s.split && s.split.length > 0 ? (
              <div className="fdm-docs-split">
                {s.split.map((col) => (
                  <div key={col.title}>
                    <h3>{col.title}</h3>
                    <p>{col.body}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {s.list && s.list.length > 0 ? (
              <ul>
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section id="a-common-mix-up">
          <h2>A common mix-up</h2>
          <div className="fdm-docs-split">
            <div>
              <h3>The mix-up</h3>
              <p>{mod.mixup.wrong}</p>
            </div>
            <div>
              <h3>The principle</h3>
              <p>{mod.mixup.right}</p>
            </div>
          </div>
        </section>

        <section id="check">
          <h2>Check</h2>
          <p>
            If these are obvious, the unit landed. If they are not, the
            mechanism is in the sections above, not in a slogan.
          </p>
          <dl className="fdm-docs-check">
            {mod.check.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {mod.relatedUseCases.length > 0 ? (
          <section id="seen-in-operations">
            <h2>Seen in operations</h2>
            <ul className="fdm-docs-related">
              {mod.relatedUseCases.map((uc) => (
                <li key={uc}>
                  <button
                    type="button"
                    className="fdm-learn-inline"
                    onClick={() => onUseCase(uc)}
                  >
                    {labelUseCase(uc)}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <nav className="fdm-learn-pager" aria-label="Adjacent units">
        {prev ? (
          <button type="button" onClick={() => onOpen(prev.slug)}>
            <span>Previous</span>
            {prev.title}
          </button>
        ) : (
          <button type="button" onClick={onHome}>
            <span>Previous</span>
            Learn home
          </button>
        )}
        {next ? (
          <button type="button" onClick={() => onOpen(next.slug)}>
            <span>Next</span>
            {next.title}
          </button>
        ) : (
          <button type="button" onClick={onHome}>
            <span>Done</span>
            Back to Learn
          </button>
        )}
      </nav>
    </article>
  );
}

function labelUseCase(slug: string): string {
  const labels: Record<string, string> = {
    "shared-inbox-triage": "Shared inbox triage",
    "ap-invoice-exceptions": "AP invoice exceptions",
    "claim-intake-missing-info": "Claim intake",
    "vendor-onboarding-packs": "Vendor onboarding packs",
    "audit-evidence-requests": "Audit evidence requests",
    "ar-collections-chase": "AR collections chase",
    "detention-appointment-exceptions": "Detention and appointments",
    "freight-invoice-audit": "Freight invoice audit",
    "customs-entry-document-packs": "Customs document packs",
    "property-work-order-vendor-chase": "Work-order vendor chase",
    "timesheet-client-approvals": "Timesheet approvals",
    "asn-invoice-po-recon": "ASN / PO recon",
    "expense-report-exceptions": "Expense exceptions",
    "joiner-access-provisioning": "Joiner access",
    "bank-rec-exceptions": "Bank rec exceptions",
    "trade-deduction-management": "Trade deductions",
    "vendor-coi-chase": "Vendor COI chase",
    "lease-critical-date-chase": "Lease critical dates",
    "prior-auth-packet-chase": "Prior auth packets",
    "rfp-response-assembly": "RFP pack assembly",
  };
  return labels[slug] ?? slug;
}

export type { LearnModule };
