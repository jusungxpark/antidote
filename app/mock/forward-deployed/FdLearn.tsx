"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  FIRST_LEARN_SLUG,
  LEARN_LESSONS,
  LEARN_MODULES_NAV,
  getLearnLessonBySlug,
  lessonsInModule,
} from "./learn-catalog";
import { FdLearnWidget } from "./FdLearnWidgets";
import type { LearnLesson, LearnModuleId } from "./learn-types";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function defaultModuleOpen(
  current: LearnModuleId | undefined,
): Record<string, boolean> {
  const init: Record<string, boolean> = {};
  for (const m of LEARN_MODULES_NAV) {
    init[m.id] = current ? m.id === current : m.id === LEARN_MODULES_NAV[0]?.id;
  }
  return init;
}

let persistedPartOpen: Record<string, boolean> | null = null;
let persistedNavScroll = 0;

function rememberLearnNavScroll() {
  const el = document.querySelector(".fdm-docs-side");
  if (el instanceof HTMLElement) persistedNavScroll = el.scrollTop;
}

export function FdLearnPage({
  slug,
  onHub,
  onOpen,
  onUseCase,
}: {
  slug: string | null;
  onHub: () => void;
  onHome: () => void;
  onOpen: (next: string) => void;
  onUseCase: (slug: string) => void;
}) {
  const resolved = slug ? getLearnLessonBySlug(slug) : undefined;
  const missing = Boolean(slug) && !resolved;

  useEffect(() => {
    if (!slug && !missing) onOpen(FIRST_LEARN_SLUG);
  }, [slug, missing, onOpen]);

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

  const lesson = resolved ?? (!slug ? getLearnLessonBySlug(FIRST_LEARN_SLUG) : undefined);

  return (
    <div className="fdm-uc fdm-uc--docs fdm-docs">
      <FdLearnNav
        current={lesson?.slug ?? null}
        onHub={onHub}
        onHome={() => openUnit(FIRST_LEARN_SLUG)}
        onOpen={openUnit}
      />
      <div className="fdm-docs-main">
        {missing ? (
          <div className="fdm-docs-article">
            <p className="fdm-uc-empty">Lesson not found.</p>
            <button
              type="button"
              className="fdm-text-link"
              onClick={() => openUnit(FIRST_LEARN_SLUG)}
            >
              Back to Learn
            </button>
          </div>
        ) : lesson ? (
          <FdLearnArticle
            lesson={lesson}
            onOpen={openUnit}
            onUseCase={onUseCase}
          />
        ) : null}
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
    return LEARN_MODULES_NAV.map((mod) => ({
      mod,
      items: lessonsInModule(mod.id),
    }));
  }, []);

  const currentModule = LEARN_LESSONS.find((m) => m.slug === current)?.module;
  const sideRef = useRef<HTMLElement>(null);

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const init = persistedPartOpen
      ? { ...persistedPartOpen }
      : defaultModuleOpen(currentModule);
    if (currentModule) init[currentModule] = true;
    return init;
  });

  useEffect(() => {
    persistedPartOpen = open;
  }, [open]);

  useEffect(() => {
    if (!currentModule) return;
    setOpen((prev) =>
      prev[currentModule] ? prev : { ...prev, [currentModule]: true },
    );
  }, [currentModule]);

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
          className={`fdm-docs-home${current === FIRST_LEARN_SLUG ? " is-current" : ""}`}
          onClick={onHome}
        >
          Learn
        </button>
      </div>

      <nav className="fdm-docs-tree" aria-label="Learn lessons">
        {grouped.map(({ mod, items }) => {
          const expanded = open[mod.id];
          const panelId = `learn-mod-${mod.id.toLowerCase()}`;
          return (
            <div key={mod.id} className="fdm-docs-branch">
              <button
                type="button"
                className={`fdm-docs-branch-toggle${
                  currentModule === mod.id ? " is-active" : ""
                }`}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() =>
                  setOpen((prev) => ({ ...prev, [mod.id]: !prev[mod.id] }))
                }
              >
                <span className="fdm-docs-chevron" aria-hidden="true" />
                {mod.label}
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
                        <span className="fdm-docs-num">{m.n}</span>
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

function FdLearnArticle({
  lesson,
  onOpen,
  onUseCase,
}: {
  lesson: LearnLesson;
  onOpen: (slug: string) => void;
  onUseCase: (slug: string) => void;
}) {
  const idx = LEARN_LESSONS.findIndex((m) => m.slug === lesson.slug);
  const prev = idx > 0 ? LEARN_LESSONS[idx - 1] : undefined;
  const next = lesson.next ? getLearnLessonBySlug(lesson.next) : undefined;
  const part = LEARN_MODULES_NAV.find((p) => p.id === lesson.module);
  const check = lesson.checks[0];
  const toc = [
    { id: "before-you-read", title: "Before you read" },
    ...lesson.sections.map((s) => ({ id: slugify(s.title), title: s.title })),
    { id: "try-it", title: "Try it" },
    ...(check ? [{ id: "check", title: "Check" }] : []),
  ];

  return (
    <article className="fdm-docs-article">
      <header className="fdm-docs-hero">
        <p className="fdm-docs-meta">
          <span>{part?.label ?? lesson.module}</span>
          <span className="fdm-docs-meta-dot" aria-hidden="true">
            ·
          </span>
          <span>{lesson.n}</span>
        </p>
        <h1>{lesson.title}</h1>
        <p className="fdm-docs-standfirst">{lesson.lede}</p>
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
        <SituationBlock lesson={lesson} />

        {lesson.youWill.length > 0 ? (
          <section>
            <h2>In this lesson</h2>
            <ul className="fdm-docs-goals">
              {lesson.youWill.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {lesson.sections.map((s) => (
          <section key={s.title} id={slugify(s.title)}>
            <h2>{s.title}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
            {s.example ? (
              <aside className="fdm-docs-example">
                {s.example.title ? (
                  <p className="fdm-docs-example-kicker">{s.example.title}</p>
                ) : null}
                <p>{s.example.body}</p>
              </aside>
            ) : null}
            {s.table ? (
              <div className="fdm-docs-table-wrap">
                <table className="fdm-docs-table">
                  <thead>
                    <tr>
                      <th>{s.table.head[0]}</th>
                      <th>{s.table.head[1]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row) => (
                      <tr key={row.label}>
                        <th>{row.label}</th>
                        <td>{row.body}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

        {lesson.misconception ? (
          <section>
            <h2>A common mix-up</h2>
            <div className="fdm-docs-split">
              <div>
                <h3>The mix-up</h3>
                <p>{lesson.misconception.says}</p>
              </div>
              <div>
                <h3>The principle</h3>
                <p>{lesson.misconception.why}</p>
              </div>
            </div>
          </section>
        ) : null}

        <section id="try-it">
          <h2>Try it</h2>
          <FdLearnWidget spec={lesson.widget} />
        </section>

        <section>
          <h2>{lesson.instrument.name}</h2>
          <p>{lesson.instrument.body}</p>
          <ul className="fdm-docs-goals">
            {lesson.instrument.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <p className="fdm-docs-sowhat">{lesson.soWhat}</p>

        {check ? <CheckBlock check={check} /> : null}

        {lesson.relatedUseCases.length > 0 ? (
          <section>
            <h2>Seen in operations</h2>
            <ul className="fdm-docs-related">
              {lesson.relatedUseCases.map((uc) => (
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

      <nav className="fdm-learn-pager" aria-label="Adjacent lessons">
        {prev ? (
          <button type="button" onClick={() => onOpen(prev.slug)}>
            <span>Previous</span>
            {prev.n} {prev.title}
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button type="button" onClick={() => onOpen(next.slug)}>
            <span>Next</span>
            {next.n} {next.title}
          </button>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

function SituationBlock({ lesson }: { lesson: LearnLesson }) {
  const sit = lesson.situation;
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => {
    setPicked(null);
  }, [lesson.slug]);

  return (
    <section id="before-you-read">
      <h2>Before you read</h2>
      <p>{sit.artifact}</p>
      {sit.artifactItems && sit.artifactItems.length > 0 ? (
        <ul className="fdm-docs-goals">
          {sit.artifactItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      <p className="fdm-docs-prompt">{sit.prompt}</p>
      <div className="fdm-docs-options">
        {sit.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            className={`fdm-docs-option${picked === i ? " is-on" : ""}`}
            onClick={() => setPicked(i)}
          >
            {opt}
          </button>
        ))}
      </div>
      {picked !== null ? <p className="fdm-docs-reveal">{sit.reveal}</p> : null}
    </section>
  );
}

function CheckBlock({
  check,
}: {
  check: LearnLesson["checks"][number];
}) {
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => {
    setPicked(null);
  }, [check.q]);
  const choice = picked !== null ? check.options[picked] : undefined;

  return (
    <section id="check">
      <h2>Check</h2>
      <p>{check.q}</p>
      <div className="fdm-docs-options">
        {check.options.map((opt, i) => (
          <button
            key={opt.text}
            type="button"
            className={`fdm-docs-option${
              picked === i ? (opt.correct ? " is-right" : " is-wrong") : ""
            }`}
            onClick={() => setPicked(i)}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {choice ? <p className="fdm-docs-reveal">{choice.feedback}</p> : null}
    </section>
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
