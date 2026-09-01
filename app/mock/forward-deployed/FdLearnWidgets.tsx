"use client";

import { useMemo, useState } from "react";
import type { WidgetSpec } from "./learn-types";
import { CONTEXT_DATA, TOKEN_DATA, TRACE_DATA } from "./learn-widget-data";
import {
  CLAIM_DATA,
  ECON_DATA,
  EVAL_DATA,
  PERMISSION_DATA,
  SORTER_DATA,
} from "./learn-widget-data-2";
import type { EconInput } from "./learn-widget-types";

const money = (n: number, dp = 2) =>
  `$${n.toLocaleString("en-GB", { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;
const pct = (n: number, dp = 1) => `${(n * 100).toFixed(dp)}%`;

function Shell({
  caption,
  note,
  children,
}: {
  caption: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="fdm-w">
      <figcaption className="fdm-w-caption">{caption}</figcaption>
      <div className="fdm-w-body">{children}</div>
      {note ? <p className="fdm-w-note">{note}</p> : null}
    </figure>
  );
}

/* =================================================================== W1 tokens */

function TokenWidget({ spec }: { spec: Extract<WidgetSpec, { kind: "tokens" }> }) {
  const d = TOKEN_DATA[spec.dataset];
  const [grounded, setGrounded] = useState(true);
  const [showAll, setShowAll] = useState(false);
  if (!d) return null;

  const source = grounded ? d.grounded : (d.ungrounded ?? d.grounded);

  if (spec.mode === "styles" && d.styles) {
    return (
      <Shell caption={spec.caption} note={d.note}>
        <p className="fdm-w-q">{d.grounded.label}</p>
        <div className="fdm-w-stack">
          {d.styles.map((s) => (
            <div key={s.label} className="fdm-w-panel">
              <p className="fdm-w-panel-label">{s.label}</p>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  if (spec.mode === "resample" && d.runs) {
    const ok = d.runs.filter((r) => r.ok).length;
    const stated = d.runs.some((r) => r.stated);
    return (
      <Shell caption={spec.caption} note={d.note}>
        <p className="fdm-w-q">{d.question}</p>
        <p className="fdm-w-stat">
          <strong>
            {ok} of {d.runs.length}
          </strong>{" "}
          correct{stated ? " · every wrong one was stated with high confidence" : ""}
        </p>
        <ol className="fdm-w-runs">
          {d.runs.map((r, i) => (
            <li key={`${r.answer}-${i}`} className={r.ok ? "is-ok" : "is-bad"}>
              <span className="fdm-w-run-n">{i + 1}</span>
              <span>{r.answer}</span>
              {r.stated ? <em>stated: {r.stated}</em> : null}
            </li>
          ))}
        </ol>
      </Shell>
    );
  }

  return (
    <Shell caption={spec.caption} note={d.note}>
      <p className="fdm-w-q">{d.question}</p>
      {d.ungrounded ? (
        <div className="fdm-w-toggles">
          <button
            type="button"
            className={`fdm-w-toggle${grounded ? " is-on" : ""}`}
            onClick={() => setGrounded(true)}
          >
            {d.grounded.label}
          </button>
          <button
            type="button"
            className={`fdm-w-toggle${!grounded ? " is-on" : ""}`}
            onClick={() => setGrounded(false)}
          >
            {d.ungrounded.label}
          </button>
        </div>
      ) : null}
      <div className="fdm-w-steps">
        {source.steps.map((step, i) => {
          const visible = showAll || i < 2 ? step.options : step.options.slice(0, 3);
          return (
            <div key={step.prefix} className="fdm-w-step">
              <p className="fdm-w-prefix">
                {step.prefix}
                <span className="fdm-w-caret">▌</span>
              </p>
              <div className="fdm-w-bars">
                {visible.map((o) => (
                  <div key={o.token} className="fdm-w-bar-row">
                    <code>{o.token}</code>
                    <span className="fdm-w-bar">
                      <span style={{ width: `${Math.round(o.p * 100)}%` }} />
                    </span>
                    <span className="fdm-w-p">{(o.p * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button type="button" className="fdm-learn-inline" onClick={() => setShowAll((v) => !v)}>
        {showAll ? "Show fewer candidates" : "Show all candidates"}
      </button>
    </Shell>
  );
}

/* ================================================================== W2 context */

function ContextWidget({ spec }: { spec: Extract<WidgetSpec, { kind: "context" }> }) {
  const d = CONTEXT_DATA[spec.dataset];
  const [off, setOff] = useState<Set<string>>(new Set());
  const [openDepth, setOpenDepth] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  if (!d) return null;

  if (spec.mode === "needle" && d.depths) {
    return (
      <Shell caption={spec.caption} note={d.note}>
        <p className="fdm-w-q">{d.question}</p>
        <p className="fdm-w-stat">Correct answer: {d.answer}</p>
        <ol className="fdm-w-list">
          {d.depths.map((row, i) => (
            <li key={row.label}>
              <button
                type="button"
                className="fdm-w-reveal-row"
                onClick={() => setOpenDepth(openDepth === i ? null : i)}
              >
                <span>{row.label}</span>
                <span className="fdm-w-chip">{openDepth === i ? (row.found ? "found" : "missed") : "reveal"}</span>
              </button>
              {openDepth === i ? (
                <p className={`fdm-w-answer${row.found ? " is-ok" : " is-bad"}`}>{row.answer}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </Shell>
    );
  }

  if (spec.mode === "doors" && d.doors) {
    return (
      <Shell caption={spec.caption} note={d.note}>
        <p className="fdm-w-q">{d.question}</p>
        <div className="fdm-w-stack">
          {d.doors.map((door) => (
            <div key={door.label} className={`fdm-w-panel${door.ok ? " is-ok" : " is-bad"}`}>
              <p className="fdm-w-panel-label">{door.label}</p>
              <p className="fdm-w-mono">{door.how}</p>
              <p>{door.answer}</p>
              <p className="fdm-w-meta">{door.cost}</p>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  if (spec.mode === "compaction" && d.compaction) {
    const c = d.compaction;
    return (
      <Shell caption={spec.caption} note={d.note}>
        <div className="fdm-w-stack">
          <div className="fdm-w-panel">
            <p className="fdm-w-panel-label">History before compaction</p>
            <p>{c.before}</p>
          </div>
          <div className="fdm-w-panel is-bad">
            <p className="fdm-w-panel-label">After compaction</p>
            <p>{c.after}</p>
            <p className="fdm-w-meta">
              Lost: {c.lost.map((x) => <code key={x}>{x}</code>)}
            </p>
          </div>
          {pinned && c.pinned ? (
            <div className="fdm-w-panel is-ok">
              <p className="fdm-w-panel-label">Pinned block, re-sent verbatim every call</p>
              <p className="fdm-w-mono">{c.pinned}</p>
              <p className="fdm-w-meta">Roughly forty tokens. Never summarised.</p>
            </div>
          ) : null}
        </div>
        {c.pinned ? (
          <button type="button" className="fdm-learn-inline" onClick={() => setPinned((v) => !v)}>
            {pinned ? "Remove the pinned block" : "Add a pinned block and compact again"}
          </button>
        ) : null}
      </Shell>
    );
  }

  if (spec.mode === "memories" && d.memories) {
    return (
      <Shell caption={spec.caption} note={d.note}>
        <div className="fdm-learn-tablewrap">
          <table className="fdm-learn-table">
            <thead>
              <tr>
                <th scope="col">Where</th>
                <th scope="col">What it holds</th>
                <th scope="col">How long, and who can see it</th>
              </tr>
            </thead>
            <tbody>
              {d.memories.map((m) => (
                <tr key={m.label}>
                  <th scope="row">{m.label}</th>
                  <td>{m.holds}</td>
                  <td>
                    {m.survives}{" "}
                    {m.audit ? "Holds up in an audit." : "Invisible outside the tool."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Shell>
    );
  }

  if (spec.mode === "layers" && d.layers) {
    return (
      <Shell caption={spec.caption} note={d.note}>
        <div className="fdm-w-stack">
          {d.layers.map((l) => (
            <div key={l.label} className="fdm-w-panel">
              <p className="fdm-w-panel-label">{l.label}</p>
              <p className="fdm-w-stat">
                {l.followed} · {l.tokens.toLocaleString()} tokens per call
              </p>
              <p className="fdm-w-meta">{l.note}</p>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  const missing = d.blocks.filter((b) => b.required && off.has(b.id));
  const total = d.blocks.filter((b) => !off.has(b.id)).reduce((n, b) => n + b.tokens, 0);
  return (
    <Shell caption={spec.caption} note={d.note}>
      <p className="fdm-w-q">{d.question}</p>
      <div className="fdm-w-blocks">
        {d.blocks.map((b) => {
          const on = !off.has(b.id);
          return (
            <button
              key={b.id}
              type="button"
              className={`fdm-w-block${on ? " is-on" : ""}`}
              onClick={() =>
                setOff((prev) => {
                  const next = new Set(prev);
                  if (next.has(b.id)) next.delete(b.id);
                  else next.add(b.id);
                  return next;
                })
              }
            >
              <span className="fdm-w-block-label">{b.label}</span>
              <span className="fdm-w-block-meta">
                {b.kind} · {b.tokens} tk
              </span>
              <span className="fdm-w-block-body">{b.body}</span>
            </button>
          );
        })}
      </div>
      <p className="fdm-w-stat">{total.toLocaleString()} tokens in this call</p>
      <div className={`fdm-w-answer${missing.length ? " is-bad" : " is-ok"}`}>
        {missing.length === 0 ? d.answer : missing[0].whenMissing}
      </div>
    </Shell>
  );
}

/* ==================================================================== W3 trace */

function TraceWidget({ spec }: { spec: Extract<WidgetSpec, { kind: "trace" }> }) {
  const d = TRACE_DATA[spec.dataset];
  const [variant, setVariant] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [acc, setAcc] = useState(95);
  const [steps, setSteps] = useState(12);
  const [ablation, setAblation] = useState<number | null>(null);
  if (!d) return null;

  if (spec.mode === "compounding") {
    const p = acc / 100;
    const end = Math.pow(p, steps);
    return (
      <Shell caption={spec.caption} note={d.note}>
        <p className="fdm-w-q">{d.goal}</p>
        <label className="fdm-w-slider">
          <span>Per-step accuracy</span>
          <input type="range" min={80} max={100} step={0.5} value={acc} onChange={(e) => setAcc(Number(e.target.value))} />
          <output>{acc.toFixed(1)}%</output>
        </label>
        <label className="fdm-w-slider">
          <span>Steps in the run</span>
          <input type="range" min={1} max={30} step={1} value={steps} onChange={(e) => setSteps(Number(e.target.value))} />
          <output>{steps}</output>
        </label>
        <p className="fdm-w-headline">{pct(end)}</p>
        <p className="fdm-w-stat">
          end-to-end completion · {Math.round((1 - end) * 1000)} of every 1,000 items ends wrong
        </p>
        <p className="fdm-w-meta">
          Assumes independent failures, which is optimistic: real failures correlate, because a wrong
          result early feeds the next step bad input.
        </p>
      </Shell>
    );
  }

  if (spec.mode === "subsystems" && d.ablations) {
    return (
      <Shell caption={spec.caption} note={d.note}>
        <p className="fdm-w-q">{d.goal}</p>
        <div className="fdm-w-toggles">
          {d.ablations.map((a, i) => (
            <button
              key={a.subsystem}
              type="button"
              className={`fdm-w-toggle${ablation === i ? " is-on" : ""}`}
              onClick={() => setAblation(ablation === i ? null : i)}
            >
              Remove {a.subsystem}
            </button>
          ))}
        </div>
        {ablation === null ? (
          <div className="fdm-w-answer is-ok">{d.variants[0].outcome}</div>
        ) : (
          <div className="fdm-w-answer is-bad">
            <span className="fdm-w-verdict">
              {d.ablations[ablation].removed} removed.
            </span>{" "}
            {d.ablations[ablation].failure}
          </div>
        )}
      </Shell>
    );
  }

  if (spec.mode === "stage" && d.stages) {
    return (
      <Shell caption={spec.caption} note={d.note}>
        <div className="fdm-w-stack">
          {d.stages.map((s) => (
            <div key={s.label} className="fdm-w-panel">
              <p className="fdm-w-panel-label">{s.label}</p>
              <p>{s.what}</p>
              <p className="fdm-w-stat">
                auto {pct(s.auto, 0)} · review {s.reviewMin} min/item · exposure: {s.exposure}
              </p>
              <p className="fdm-w-meta">Exit: {s.exit}</p>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  const v = d.variants[Math.min(variant, d.variants.length - 1)];
  const cost = v.steps.reduce((n, s) => n + (s.cost ?? 0), 0);
  const tokens = v.steps.reduce((n, s) => n + (s.tokens ?? 0), 0);

  return (
    <Shell caption={spec.caption} note={d.note}>
      <p className="fdm-w-q">{d.goal}</p>
      {d.variants.length > 1 ? (
        <div className="fdm-w-toggles">
          {d.variants.map((x, i) => (
            <button
              key={x.label}
              type="button"
              className={`fdm-w-toggle${variant === i ? " is-on" : ""}`}
              onClick={() => {
                setVariant(i);
                setOpen(null);
              }}
            >
              {x.label}
            </button>
          ))}
        </div>
      ) : null}
      {v.blurb ? <p className="fdm-w-meta">{v.blurb}</p> : null}
      <ol className="fdm-w-trace">
        {v.steps.map((s, i) => (
          <li key={`${s.label}-${i}`} className={`is-${s.actor}${s.ok === false ? " is-bad" : ""}`}>
            <button type="button" onClick={() => setOpen(open === i ? null : i)}>
              <span className="fdm-w-actor">{s.actor}</span>
              <span className="fdm-w-trace-label">{s.label}</span>
              {s.tokens ? <span className="fdm-w-meta">{s.tokens} tk</span> : null}
            </button>
            {open === i ? (
              <div className="fdm-w-trace-detail">
                <p className="fdm-w-mono">{s.body}</p>
                {s.subsystem ? <p className="fdm-w-meta">subsystem: {s.subsystem}</p> : null}
                {s.flag ? <p className="fdm-w-flag">⚠ {s.flag}</p> : null}
                {s.cost ? <p className="fdm-w-meta">{money(s.cost, 3)}</p> : null}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <div className={`fdm-w-answer${v.ok ? " is-ok" : " is-bad"}`}>{v.outcome}</div>
      {tokens > 0 ? (
        <p className="fdm-w-meta">
          {tokens.toLocaleString()} tokens · {money(cost, 3)} · {v.steps.length} steps
        </p>
      ) : null}
    </Shell>
  );
}

/* ============================================================== W4 permissions */

function PermissionWidget({ spec }: { spec: Extract<WidgetSpec, { kind: "permissions" }> }) {
  const d = PERMISSION_DATA[spec.dataset];
  const [on, setOn] = useState<Set<string>>(
    () => new Set((PERMISSION_DATA[spec.dataset]?.tools ?? []).filter((t) => t.on).map((t) => t.name)),
  );
  const [levels, setLevels] = useState<Record<string, number>>({});
  if (!d) return null;

  if (spec.mode === "autonomy" && d.grid) {
    const rows = d.grid.map((row) => {
      const idx = levels[row.action] ?? 0;
      return { row, level: row.levels[Math.min(idx, row.levels.length - 1)] };
    });
    const auto = rows.reduce((n, r) => n + r.level.auto, 0) / rows.length;
    const review = rows.reduce((n, r) => n + r.level.reviewMin, 0);
    return (
      <Shell caption={spec.caption} note={d.note}>
        <p className="fdm-w-q">{d.scenario}</p>
        <div className="fdm-w-grid">
          {d.grid.map((row) => (
            <div key={row.action} className="fdm-w-grid-row">
              <p className="fdm-w-grid-action">
                {row.action}
                <span className="fdm-w-chip">{row.effect}</span>
              </p>
              <div className="fdm-w-toggles">
                {row.levels.map((lv, i) => (
                  <button
                    key={lv.label}
                    type="button"
                    className={`fdm-w-toggle${(levels[row.action] ?? 0) === i ? " is-on" : ""}`}
                    onClick={() => setLevels((p) => ({ ...p, [row.action]: i }))}
                  >
                    {lv.label}
                  </button>
                ))}
              </div>
              <p className="fdm-w-meta">
                {row.levels[Math.min(levels[row.action] ?? 0, row.levels.length - 1)].exposure}
              </p>
            </div>
          ))}
        </div>
        <p className="fdm-w-stat">
          mean auto share {pct(auto, 0)} · review load {review.toFixed(1)} min per item across all types
        </p>
      </Shell>
    );
  }

  const outcome =
    d.outcomes.find(
      (o) =>
        o.requires.every((r) => on.has(r)) &&
        (o.forbidden ?? []).every((f) => !on.has(f)),
    ) ?? null;

  return (
    <Shell caption={spec.caption} note={d.note}>
      <p className="fdm-w-q">{d.intro}</p>
      <p className="fdm-w-meta">{d.scenario}</p>
      <div className="fdm-w-tools">
        {d.tools.map((t) => {
          const enabled = on.has(t.name);
          return (
            <button
              key={t.name}
              type="button"
              className={`fdm-w-tool${enabled ? " is-on" : ""} is-${t.effect}`}
              onClick={() =>
                setOn((prev) => {
                  const next = new Set(prev);
                  if (next.has(t.name)) next.delete(t.name);
                  else next.add(t.name);
                  return next;
                })
              }
            >
              <span className="fdm-w-tool-name">
                <code>{t.name}</code>
                <span className="fdm-w-chip">{t.effect}</span>
              </span>
              <span className="fdm-w-meta">
                {t.args ? `(${t.args}) · ` : ""}
                {t.scope}
              </span>
              <span className="fdm-w-block-body">{t.risk}</span>
            </button>
          );
        })}
      </div>
      <div
        className={`fdm-w-answer${
          outcome ? (outcome.verdict === "damage" ? " is-bad" : " is-ok") : ""
        }`}
      >
        {outcome ? outcome.result : d.fallback}
      </div>
    </Shell>
  );
}

/* =============================================================== W5 eval bench */

function EvalWidget({ spec }: { spec: Extract<WidgetSpec, { kind: "evalbench" }> }) {
  const d = EVAL_DATA[spec.dataset];
  const [system, setSystem] = useState(0);
  const [rule, setRule] = useState(0);
  const [strata, setStrata] = useState<Set<string>>(
    () => new Set(["volume", "tail", "nearmiss", "injection"]),
  );
  const [openCase, setOpenCase] = useState<string | null>(null);

  const cases = useMemo(
    () => (d ? d.cases.filter((c) => strata.has(c.kind)) : []),
    [d, strata],
  );
  if (!d) return null;

  if (spec.mode === "timeline" && d.timeline) {
    const max = Math.max(...d.timeline.map((t) => t.accuracy));
    return (
      <Shell caption={spec.caption} note={d.note}>
        <p className="fdm-w-q">{d.task}</p>
        <div className="fdm-w-chart">
          {d.timeline.map((t) => (
            <div key={t.month} className="fdm-w-chart-col" title={`${t.month}: ${t.accuracy}% (${t.version})`}>
              <span
                className={`fdm-w-chart-bar${t.event ? " is-event" : ""}`}
                style={{ height: `${(t.accuracy / max) * 100}%` }}
              />
              <span className="fdm-w-chart-x">{t.month}</span>
            </div>
          ))}
        </div>
        <ol className="fdm-w-list">
          {d.timeline
            .filter((t) => t.event)
            .map((t) => (
              <li key={t.month}>
                <span className="fdm-w-verdict">{t.month}</span> · {t.accuracy}% ·
                version {t.version}. {t.event}
              </li>
            ))}
        </ol>
      </Shell>
    );
  }

  const sysId = d.systems[Math.min(system, d.systems.length - 1)].id;
  const strict = d.rules[Math.min(rule, d.rules.length - 1)].strict;
  const scored = cases.filter((c) => {
    const r = c.results[sysId];
    return r ? (strict ? r.exact : r.loose) : false;
  }).length;

  return (
    <Shell caption={spec.caption} note={d.note}>
      <p className="fdm-w-q">{d.task}</p>
      {d.systems.length > 1 ? (
        <div className="fdm-w-toggles">
          {d.systems.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`fdm-w-toggle${system === i ? " is-on" : ""}`}
              onClick={() => setSystem(i)}
            >
              {s.label}
            </button>
          ))}
        </div>
      ) : null}
      {d.rules.length > 1 ? (
        <div className="fdm-w-toggles">
          {d.rules.map((r, i) => (
            <button
              key={r.id}
              type="button"
              className={`fdm-w-toggle${rule === i ? " is-on" : ""}`}
              onClick={() => setRule(i)}
            >
              {r.label}
            </button>
          ))}
        </div>
      ) : null}
      {spec.mode === "composition" ? (
        <div className="fdm-w-toggles">
          {(["volume", "tail", "nearmiss", "injection"] as const).map((k) => (
            <button
              key={k}
              type="button"
              className={`fdm-w-toggle${strata.has(k) ? " is-on" : ""}`}
              onClick={() =>
                setStrata((prev) => {
                  const next = new Set(prev);
                  if (next.has(k)) next.delete(k);
                  else next.add(k);
                  return next.size ? next : prev;
                })
              }
            >
              {k}
            </button>
          ))}
        </div>
      ) : null}
      <p className="fdm-w-headline">
        {scored}/{cases.length}
      </p>
      <p className="fdm-w-stat">
        {cases.length ? pct(scored / cases.length, 0) : ", "} on this composition ·{" "}
        {d.systems[Math.min(system, d.systems.length - 1)].note}
      </p>
      <ol className="fdm-w-list fdm-w-cases">
        {cases.map((c) => {
          const r = c.results[sysId];
          const ok = r ? (strict ? r.exact : r.loose) : false;
          return (
            <li key={c.id}>
              <button
                type="button"
                className={`fdm-w-reveal-row${ok ? "" : " is-bad"}`}
                onClick={() => setOpenCase(openCase === c.id ? null : c.id)}
              >
                <span>
                  <span className="fdm-w-chip">{c.kind}</span> {c.label}
                </span>
                <span className="fdm-w-chip">{ok ? "pass" : "fail"}</span>
              </button>
              {openCase === c.id ? (
                <p className="fdm-w-answer">
                  gold: <code>{c.gold}</code> · returned: <code>{r?.answer ?? ", "}</code>
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}

/* ================================================================ W6 economics */

function useInputs(defs: EconInput[]) {
  const [vals, setVals] = useState<Record<string, number>>(() =>
    Object.fromEntries(defs.map((d) => [d.id, d.value])),
  );
  const set = (id: string, v: number) => setVals((p) => ({ ...p, [id]: v }));
  return { vals, set };
}

function EconWidget({ spec }: { spec: Extract<WidgetSpec, { kind: "econ" }> }) {
  const d = ECON_DATA[spec.dataset];
  const { vals, set } = useInputs(d?.inputs ?? []);
  if (!d) return null;

  const lines: { label: string; value: number; note?: string }[] = [];
  let headline = "";
  let sub = "";

  if (d.mode === "call") {
    const inTk = vals.inputTokens ?? 0;
    const outTk = vals.outputTokens ?? 0;
    const reason = vals.reasoningTokens ?? 0;
    const perCall =
      (inTk / 1e6) * (vals.inputPrice ?? 0) +
      ((outTk + reason) / 1e6) * (vals.outputPrice ?? 0);
    const withRetry = perCall * (1 + (vals.retryRate ?? 0) / 100);
    const perItem = withRetry * (vals.callsPerItem ?? 1);
    lines.push(
      { label: "Input tokens", value: (inTk / 1e6) * (vals.inputPrice ?? 0) },
      { label: "Output tokens", value: (outTk / 1e6) * (vals.outputPrice ?? 0) },
      { label: "Reasoning tokens", value: (reason / 1e6) * (vals.outputPrice ?? 0) },
      { label: "Retry tax", value: withRetry - perCall },
    );
    headline = money(perItem, 4);
    sub = `per item, across ${vals.callsPerItem ?? 1} calls`;
  }

  if (d.mode === "unit") {
    const esc = 1 - (vals.autoShare ?? 0) / 100;
    const model = (vals.modelSpend ?? 0) * (1 + (vals.retryRate ?? 0) / 100);
    const residual = esc * (vals.reviewMin ?? 0) * ((vals.loadedRate ?? 0) / 60);
    const build = vals.buildAmort ?? 0;
    const failure = ((vals.errorRate ?? 0) / 100) * (vals.errorCost ?? 0);
    const total = model + residual + build + failure;
    const baseline = (vals.baselineMin ?? 0) * ((vals.loadedRate ?? 0) / 60);
    lines.push(
      { label: "Model spend, with retries", value: model },
      { label: "Residual human minutes", value: residual, note: `${(esc * 100).toFixed(0)}% escalate × ${vals.reviewMin} min` },
      { label: "Amortised build", value: build },
      { label: "Failure cost", value: failure },
    );
    headline = money(total);
    sub = `per completed item · baseline ${money(baseline)} · ${
      total < baseline ? `saves ${money(baseline - total)}` : `costs ${money(total - baseline)} more`
    } per item · ${money((baseline - total) * (vals.volume ?? 0))} a month`;
  }

  if (d.mode === "staffing") {
    const vol = vals.volume ?? 0;
    const auto = (vals.autoShare ?? 0) / 100;
    const start = (vals.startSampling ?? 0) / 100;
    const end = (vals.endSampling ?? 0) / 100;
    const exc = vol * (1 - auto) * (vals.exceptionMin ?? 0);
    const early = vol * auto * start * (vals.reviewMin ?? 0);
    const late = vol * auto * end * (vals.reviewMin ?? 0);
    const baseline = vol * (vals.baselineMin ?? 0);
    lines.push(
      { label: "Baseline, today", value: baseline / 60, note: "hours a month" },
      { label: "Month 3 · exceptions + high sampling", value: (exc + early) / 60, note: "hours a month" },
      { label: "Month 12 · exceptions + steady sampling", value: (exc + late) / 60, note: "hours a month" },
    );
    headline = `${((exc + early) / 60).toFixed(0)} → ${((exc + late) / 60).toFixed(0)} h`;
    sub = `month 3 to month 12 · baseline ${(baseline / 60).toFixed(0)} h. Review rises before it falls.`;
  }

  if (d.mode === "rebuild" && d.components) {
    const rate = (vals.teamSize ?? 1) * (vals.monthlyCost ?? 0);
    const buildable = d.components.filter((c) => !c.foreclosed);
    const loMonths = Math.max(...buildable.map((c) => c.months[0]), 0);
    const hiMonths = buildable.reduce((n, c) => Math.max(n, c.months[1]), 0);
    const loCost = buildable.reduce((n, c) => n + c.cost[0], 0);
    const hiCost = buildable.reduce((n, c) => n + c.cost[1], 0);
    headline = `${loMonths}-${hiMonths} months`;
    sub = `${money(loCost, 0)}-${money(hiCost, 0)} direct, plus ${money(rate, 0)}/month of team time. Modelled under stated assumptions.`;
  }

  return (
    <Shell caption={spec.caption} note={d.note}>
      <p className="fdm-w-q">{d.intro}</p>
      <div className="fdm-w-sliders">
        {d.inputs.map((inp) => (
          <label key={inp.id} className="fdm-w-slider">
            <span>{inp.label}</span>
            <input
              type="range"
              min={inp.min}
              max={inp.max}
              step={inp.step}
              value={vals[inp.id] ?? inp.value}
              onChange={(e) => set(inp.id, Number(e.target.value))}
            />
            <output>
              {vals[inp.id] ?? inp.value} {inp.unit}
            </output>
          </label>
        ))}
      </div>
      <p className="fdm-w-headline">{headline}</p>
      <p className="fdm-w-stat">{sub}</p>
      {lines.length ? (
        <div className="fdm-w-lines">
          {(() => {
            const max = Math.max(...lines.map((l) => l.value), 0.0001);
            return lines.map((l) => (
              <div key={l.label} className="fdm-w-bar-row">
                <span className="fdm-w-line-label">{l.label}</span>
                <span className="fdm-w-bar">
                  <span
                    className={l.value === max ? "is-dominant" : undefined}
                    style={{ width: `${Math.max(2, (l.value / max) * 100)}%` }}
                  />
                </span>
                <span className="fdm-w-p">
                  {d.mode === "staffing" ? l.value.toFixed(0) : money(l.value, 3)}
                </span>
              </div>
            ));
          })()}
        </div>
      ) : null}
      {d.components ? (
        <div className="fdm-learn-tablewrap">
          <table className="fdm-learn-table">
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">What a rebuild would take</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              {d.components.map((c) => (
                <tr key={c.name}>
                  <th scope="row">
                    {c.name}
                    {c.foreclosed ? <span className="fdm-w-chip">foreclosed</span> : null}
                  </th>
                  <td>
                    {c.foreclosed
                      ? "No route in at any reasonable cost"
                      : `${c.months[0]}-${c.months[1]} months · ${money(c.cost[0], 0)}-${money(c.cost[1], 0)}`}
                  </td>
                  <td>{c.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Shell>
  );
}

/* =================================================================== W7 claims */

function ClaimWidget({ spec }: { spec: Extract<WidgetSpec, { kind: "claims" }> }) {
  const d = CLAIM_DATA[spec.dataset];
  const [picked, setPicked] = useState<Record<number, string>>({});
  if (!d) return null;
  const claims = d.claims.slice(0, 4);
  const done = Object.keys(picked).length;
  const right = claims.filter((c, i) => picked[i] === c.answer).length;

  return (
    <Shell caption={spec.caption} note={d.note}>
      <p className="fdm-w-q">{d.intro}</p>
      <p className="fdm-w-legend">
        {d.classes.map((c) => (
          <span key={c.id}>
            <i>{c.label}</i> {c.blurb}{" "}
          </span>
        ))}
      </p>
      <ol className="fdm-w-list">
        {claims.map((claim, i) => {
          const choice = picked[i];
          const ok = choice === claim.answer;
          return (
            <li key={claim.text} className="fdm-w-claim">
              <p className="fdm-w-claim-text">“{claim.text}”</p>
              <p className="fdm-w-meta">{claim.source}</p>
              <div className="fdm-w-toggles">
                {d.classes.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`fdm-w-toggle${choice === c.id ? (ok ? " is-right" : " is-wrong") : ""}`}
                    onClick={() => setPicked((p) => ({ ...p, [i]: c.id }))}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              {choice ? (
                <div className={`fdm-w-answer${ok ? " is-ok" : " is-bad"}`}>
                  <p>
                    <span className="fdm-w-verdict">
                      {d.classes.find((c) => c.id === claim.answer)?.label}.
                    </span>{" "}
                    {claim.artifact}
                  </p>
                  <p className="fdm-w-meta">Missing: {claim.missing.join(" · ")}</p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      {done > 0 ? (
        <p className="fdm-w-stat">
          {right} of {done} classified correctly
        </p>
      ) : null}
    </Shell>
  );
}

/* =================================================================== W8 sorter */

function SorterWidget({ spec }: { spec: Extract<WidgetSpec, { kind: "sorter" }> }) {
  const d = SORTER_DATA[spec.dataset];
  const [picked, setPicked] = useState<Record<number, string>>({});
  if (!d) return null;
  const cards = d.cards.slice(0, 4);
  const done = Object.keys(picked).length;
  const right = cards.filter((c, i) => picked[i] === c.answer).length;

  return (
    <Shell caption={spec.caption} note={d.note}>
      <p className="fdm-w-q">{d.prompt}</p>
      <p className="fdm-w-legend">
        {d.categories.map((c) => (
          <span key={c.id}>
            <i>{c.label}</i> {c.blurb}{" "}
          </span>
        ))}
      </p>
      <ol className="fdm-w-list">
        {cards.map((card, i) => {
          const choice = picked[i];
          const ok = choice === card.answer;
          return (
            <li key={card.text} className="fdm-w-claim">
              <p className="fdm-w-claim-text">{card.text}</p>
              <div className="fdm-w-toggles">
                {d.categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`fdm-w-toggle${choice === c.id ? (ok ? " is-right" : " is-wrong") : ""}`}
                    onClick={() => setPicked((p) => ({ ...p, [i]: c.id }))}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              {choice ? (
                <div className={`fdm-w-answer${ok ? " is-ok" : " is-bad"}`}>
                  <span className="fdm-w-verdict">
                    {d.categories.find((c) => c.id === card.answer)?.label}.
                  </span>{" "}
                  {card.why}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      {done > 0 ? (
        <p className="fdm-w-stat">
          {right} of {done} placed correctly
        </p>
      ) : null}
    </Shell>
  );
}

/* ================================================================== registry */

export function FdLearnWidget({ spec }: { spec: WidgetSpec }) {
  switch (spec.kind) {
    case "tokens":
      return <TokenWidget spec={spec} />;
    case "context":
      return <ContextWidget spec={spec} />;
    case "trace":
      return <TraceWidget spec={spec} />;
    case "permissions":
      return <PermissionWidget spec={spec} />;
    case "evalbench":
      return <EvalWidget spec={spec} />;
    case "econ":
      return <EconWidget spec={spec} />;
    case "claims":
      return <ClaimWidget spec={spec} />;
    case "sorter":
      return <SorterWidget spec={spec} />;
    default:
      return null;
  }
}
