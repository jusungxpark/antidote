"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  BROKERAGE_MONTHS,
  EMPLOYEES,
  FOLLOWUPS,
  PIPELINE,
  PLANS,
  QC_ROWS,
  QUEUE,
  RECON,
  REPLACE_ROWS,
  TENANT,
  TIME_ROWS,
  type AdminView,
  type Surface,
} from "./data";

const NAV: { id: AdminView; label: string; tag: string }[] = [
  { id: "today", label: "Today", tag: "PP" },
  { id: "workload", label: "Workload", tag: "PP" },
  { id: "census", label: "Census", tag: "intake" },
  { id: "brokerage", label: "Brokerage", tag: "Schwab" },
  { id: "ingest", label: "Payroll / RK", tag: "feeds" },
  { id: "review", label: "Review ARC", tag: "FTW in" },
  { id: "package", label: "Package", tag: "delivery" },
  { id: "form5500", label: "Form 5500", tag: "EFAST" },
  { id: "time", label: "Time & bill", tag: "PP" },
  { id: "quality", label: "Quality", tag: "ops" },
  { id: "config", label: "Portal config", tag: "PSL" },
  { id: "replace", label: "What this replaces", tag: "" },
];

const REPLACES: Record<AdminView, string> = {
  today: "PensionPro My Tasks + Excel tracker + Outlook",
  workload: "Exported PP reports emailed to staff",
  census: "Email census loop · Stax-shaped edits · still not FTW",
  brokerage: "R: drive 12 PDFs + binary PP received",
  ingest: "Download 3 RK reports · payroll files as-is",
  review: "Excel-shadowing India's FTW output",
  package: "5–10 hr consult packet · FTW dump",
  form5500: "Re-key into FTW / Relius, or pass XML",
  time: "Hours lost between PP and QuickBooks",
  quality: "Redo loops nobody measured",
  config: "PlanSponsorLink modules, per plan",
  replace: "The stack, mapped",
};

const TABS = [
  "Client",
  "Plan specs",
  "Census",
  "Payroll",
  "HCE",
  "Eligibility",
  "Participation",
  "Allocation",
  "Cross-test",
] as const;

function usd(n: number, cents = false) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents ? 2 : 0,
  });
}

export function CycleApp() {
  const [surface, setSurface] = useState<Surface>("admin");
  const [view, setView] = useState<AdminView>("today");
  const [emp, setEmp] = useState(EMPLOYEES[2]!.id);
  const [deferral, setDeferral] = useState(21000);
  const [preTax, setPreTax] = useState(18400);
  const [roth, setRoth] = useState(0);
  const [er, setEr] = useState(20700);
  const [after, setAfter] = useState(0);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Census");
  const [assist, setAssist] = useState(false);
  const [cfg, setCfg] = useState<Record<string, boolean>>({
    census: true,
    brokerage: true,
    questionnaire: true,
    rk: false,
    db: true,
    loan: true,
    distro: true,
    survey: true,
  });
  const [answer, setAnswer] = useState<string | null>(null);

  const remaining = 41280 - (preTax + roth + er + after);
  const selected = EMPLOYEES.find((e) => e.id === emp) ?? EMPLOYEES[0]!;
  const liveFlags = useMemo(() => {
    const flags = [...selected.flags];
    if (selected.id === "e5" && deferral > selected.comp) {
      return ["Elective deferrals exceed compensation"];
    }
    if (selected.id === "e5" && deferral <= selected.comp) {
      return [] as string[];
    }
    return flags;
  }, [deferral, selected]);

  return (
    <>
      <div className="ops-banner">
        <strong>Cycle mock</strong>
        <span>
          Cerberus-shaped book · replace PensionPro entirely · keep FTW as
          the test engine until Review ARC is enough · documents stay with a
          pre-approved provider
        </span>
      </div>

      <div
        className={`ops-shell${surface === "sponsor" ? " ops-shell--sponsor" : ""}`}
      >
        {surface === "admin" ? (
          <nav className="ops-nav" aria-label="Cycle">
            <div className="ops-mark">
              <b>Cycle</b>
              <small>{TENANT.name}</small>
            </div>
            <div className="ops-surface">
              <button
                type="button"
                aria-pressed={surface === "admin"}
                onClick={() => setSurface("admin")}
              >
                Admin
              </button>
              <button
                type="button"
                aria-pressed={false}
                onClick={() => {
                  setSurface("sponsor");
                }}
              >
                Sponsor
              </button>
            </div>
            <div className="ops-nav-sec">Season 2025</div>
            {NAV.slice(0, 2).map((n) => (
              <button
                key={n.id}
                type="button"
                aria-current={view === n.id ? "page" : undefined}
                onClick={() => setView(n.id)}
              >
                {n.label}
                <span className="ops-nav-tag">{n.tag}</span>
              </button>
            ))}
            <div className="ops-nav-sec">Halstead · 24719</div>
            {NAV.slice(2, 8).map((n) => (
              <button
                key={n.id}
                type="button"
                aria-current={view === n.id ? "page" : undefined}
                onClick={() => setView(n.id)}
              >
                {n.label}
                <span className="ops-nav-tag">{n.tag}</span>
              </button>
            ))}
            <div className="ops-nav-sec">Firm</div>
            {NAV.slice(8).map((n) => (
              <button
                key={n.id}
                type="button"
                aria-current={view === n.id ? "page" : undefined}
                onClick={() => setView(n.id)}
              >
                {n.label}
                {n.tag ? <span className="ops-nav-tag">{n.tag}</span> : null}
              </button>
            ))}
          </nav>
        ) : null}

        <div className="ops-main">
          {surface === "sponsor" ? (
            <header className="ops-sponsor-top">
              <span className="ops-word">A</span>
              <span>Halstead Outfitters</span>
              <span className="ops-pill ops-pill--plan">
                Plan year end 12/31/2025
              </span>
              <span className="ops-pill">401(k) PSP</span>
              <span className="ops-pill">Cash balance</span>
              <button
                type="button"
                className="ops-btn"
                style={{ marginLeft: "auto" }}
                onClick={() => setSurface("admin")}
              >
                Back to admin
              </button>
            </header>
          ) : (
            <header className="ops-top">
              <div className="ops-crumbs">
                <span className="ops-pill">Home</span>
                <span className="ops-pill ops-pill--plan">
                  24719 Halstead Outfitters
                </span>
                <span className="ops-pill">PYE 12/31/2025</span>
                <span className="ops-pill">Combo · Schwab</span>
              </div>
              <div className="ops-replaces">
                Replaces <em>{REPLACES[view]}</em>
              </div>
            </header>
          )}

          <div className="ops-body">
            {surface === "sponsor" ? (
              <Sponsor
                remaining={remaining}
                preTax={preTax}
                roth={roth}
                er={er}
                after={after}
                setPreTax={setPreTax}
                setRoth={setRoth}
                setEr={setEr}
                setAfter={setAfter}
                emp={emp}
                setEmp={setEmp}
                selected={selected}
                deferral={deferral}
                setDeferral={setDeferral}
                liveFlags={liveFlags}
              />
            ) : view === "today" ? (
              <Today onOpen={(v) => setView(v)} />
            ) : view === "workload" ? (
              <Workload />
            ) : view === "census" ? (
              <Census
                emp={emp}
                setEmp={setEmp}
                selected={selected}
                deferral={deferral}
                setDeferral={setDeferral}
                liveFlags={liveFlags}
              />
            ) : view === "brokerage" ? (
              <Brokerage
                remaining={remaining}
                preTax={preTax}
                roth={roth}
                er={er}
                after={after}
                setPreTax={setPreTax}
                setRoth={setRoth}
                setEr={setEr}
                setAfter={setAfter}
              />
            ) : view === "ingest" ? (
              <Ingest />
            ) : view === "review" ? (
              <Review tab={tab} setTab={setTab} />
            ) : view === "package" ? (
              <Package />
            ) : view === "form5500" ? (
              <Form5500 />
            ) : view === "time" ? (
              <Time />
            ) : view === "quality" ? (
              <Quality />
            ) : view === "config" ? (
              <Config cfg={cfg} setCfg={setCfg} />
            ) : (
              <Replace />
            )}
          </div>

          {surface === "admin" ? (
            <>
              <button
                type="button"
                className="ops-fab"
                aria-label="User guide assistant"
                onClick={() => setAssist((v) => !v)}
              >
                ?
              </button>
              {assist ? (
                <div className="ops-assist">
                  <h2>User Guide Assistant</h2>
                  <p className="ops-lede" style={{ marginTop: 0 }}>
                    Ask the tenant KB, or run a report. Per-tenant. Not a
                    chatbot on the sponsor site.
                  </p>
                  <ul>
                    <li>
                      <button
                        type="button"
                        className="ask"
                        onClick={() =>
                          setAnswer(
                            "14 plans. $38,410 open. Top: Halstead setup $299 posted, Meridian extra census $1,200 unbilled.",
                          )
                        }
                      >
                        How many plans have outstanding invoices?
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="ask"
                        onClick={() =>
                          setAnswer(
                            "LTPT: 500 hours in 2 consecutive years (SECURE 2.0). Dual eligibility would drop this SH. Keep the box.",
                          )
                        }
                      >
                        What is LTPT for this document year?
                      </button>
                    </li>
                  </ul>
                  <input
                    aria-label="Ask"
                    placeholder="how do I assign from the annual cycle queue"
                    defaultValue=""
                  />
                  {answer ? (
                    <p className="ops-note" style={{ marginTop: 10 }}>
                      {answer}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Today({ onOpen }: { onOpen: (v: AdminView) => void }) {
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Today</h1>
          <p>
            One list. Holds still show. Unassigned is a pile, not a missing
            My Tasks row. This is the PensionPro replacement for an A-to-Z
            shop and a functional shop: same queue, fatter or thinner.
          </p>
        </div>
        <div className="ops-h-actions">
          <button type="button" className="ops-btn" onClick={() => onOpen("workload")}>
            Assign from report
          </button>
          <button type="button" className="ops-btn ops-btn--go">
            Blast: portal will tell you
          </button>
        </div>
      </div>

      <div className="ops-grid-2">
        <div>
          <table className="ops-table">
            <thead>
              <tr>
                <th></th>
                <th>Plan</th>
                <th>Task</th>
                <th>Status</th>
                <th>Aging</th>
                <th>Who</th>
              </tr>
            </thead>
            <tbody>
              {QUEUE.map((q) => (
                <tr
                  key={q.plan + q.task}
                  onClick={() =>
                    onOpen(
                      q.task.includes("Brokerage")
                        ? "brokerage"
                        : q.task.includes("Census")
                          ? "census"
                          : q.task.includes("ARC")
                            ? "review"
                            : "package",
                    )
                  }
                >
                  <td>
                    <span
                      className={`ops-pri${q.priority === "high" ? " ops-pri--high" : ""}`}
                    />
                  </td>
                  <td>{q.plan}</td>
                  <td>
                    {q.task}
                    <div>
                      <small style={{ color: "var(--ink-faint)" }}>
                        {q.project}
                      </small>
                    </div>
                  </td>
                  <td className="ops-status">{q.status}</td>
                  <td className={q.aging > 8 ? "ops-age" : "ops-age ops-age--ok"}>
                    {q.aging}d
                  </td>
                  <td className="ops-mono">{q.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="ops-panel">
            <h2>Follow-ups, not the inbox</h2>
            <ul className="ops-follow">
              {FOLLOWUPS.map((f) => (
                <li key={f.text}>
                  <span className={f.due.startsWith("Over") ? "ops-age" : "ops-mono"}>
                    {f.due}
                  </span>
                  <span>{f.text}</span>
                  <span className="ops-chip">{f.source}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ops-panel" style={{ marginTop: 14 }}>
            <h2>Book mix this season</h2>
            <div className="ops-mix">
              <div className="ops-mix-row ops-mix-row--go">
                <span>SH / NE · junior QC</span>
                <span className="ops-bar">
                  <i style={{ width: "61%" }} />
                </span>
                <span className="ops-mono">61%</span>
              </div>
              <div className="ops-mix-row ops-mix-row--need">
                <span>Combo / NC · you</span>
                <span className="ops-bar">
                  <i style={{ width: "27%" }} />
                </span>
                <span className="ops-mono">27%</span>
              </div>
              <div className="ops-mix-row">
                <span>Solo · unreviewed</span>
                <span className="ops-bar">
                  <i style={{ width: "4%" }} />
                </span>
                <span className="ops-mono">4%</span>
              </div>
              <p className="ops-note" style={{ margin: "4px 0 0" }}>
                Cerberus-like: credentialed people do not touch the box. Processing
                (Congruent) QC’s safe harbor. You review the 15–30 min finished
                pack on complex plans only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Workload() {
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Annual cycle workload</h1>
          <p>
            Filter to “census IGO but not loaded.” Assign in place. Nobody
            exports this to Excel and mails the list.
          </p>
        </div>
      </div>
      <div className="ops-kpis">
        <div>
          <dl>
            <dt>Ready, unassigned</dt>
            <dd>
              159 <span>Load census</span>
            </dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>Stuck 8+ business days</dt>
            <dd>
              62 <span>35% of ready work</span>
            </dd>
          </dl>
        </div>
      </div>
      <p className="ops-note">
        Target step: Load census data. Prerequisites: census IGO,
        questionnaire IGO, non-vendor brokerage IGO. Artisan is on Hold for
        profit-sharing confirm: it stays here, unlike PensionPro My Tasks.
      </p>
      <table className="ops-table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Prereq</th>
            <th>Load census</th>
            <th>Group</th>
            <th>Aging</th>
          </tr>
        </thead>
        <tbody>
          {PLANS.map((p) => (
            <tr key={p.id}>
              <td>
                {p.client}
                <div>
                  <small style={{ color: "var(--ink-faint)" }}>{p.id}</small>
                </div>
              </td>
              <td>
                {p.portal === "go" ? (
                  <span className="ops-status ops-status--go">Ready 3/3</span>
                ) : (
                  <span className="ops-status ops-status--need">2/3</span>
                )}
              </td>
              <td>{p.step}</td>
              <td className="ops-mono">
                {p.track === "credentialed" ? "You" : "Processing"}
              </td>
              <td className={p.aging > 8 ? "ops-age" : "ops-age ops-age--ok"}>
                {p.aging}d
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Census(props: {
  emp: string;
  setEmp: (id: string) => void;
  selected: (typeof EMPLOYEES)[number];
  deferral: number;
  setDeferral: (n: number) => void;
  liveFlags: string[];
  audience?: "admin" | "sponsor";
}) {
  const { emp, setEmp, selected, deferral, setDeferral, liveFlags, audience = "admin" } = props;
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Census</h1>
          <p>
            {audience === "sponsor"
              ? "Fix the red rows. Upload a file or edit a person. We only start once this is green."
              : "Sponsor already hit ~35 edits. You do not start until the portal is green, except when tests send a row back. That return stays on this person, not a new email thread."}
          </p>
        </div>
      </div>
      <div className="ops-split">
        <div className="ops-list">
          {EMPLOYEES.map((e) => (
            <button
              key={e.id}
              type="button"
              aria-current={emp === e.id ? true : undefined}
              onClick={() => setEmp(e.id)}
            >
              <b>{e.name}</b>
              <small>
                {e.role}
                {e.flags.length || (e.id === "e5" && liveFlags.length)
                  ? " · edit"
                  : ""}
              </small>
            </button>
          ))}
        </div>
        <div className="ops-form">
          <div className="ops-fields">
            <div className="ops-field">
              <label>Name</label>
              <input readOnly value={selected.name} />
            </div>
            <div className="ops-field">
              <label>Date of birth</label>
              <input readOnly value={selected.dob} />
            </div>
            <div className="ops-field">
              <label>Date of hire</label>
              <input readOnly value={selected.doh} />
            </div>
            <div className="ops-field">
              <label>Compensation</label>
              <input readOnly value={usd(selected.comp)} />
            </div>
            <div className="ops-field">
              <label>Elective deferral</label>
              <input
                type="number"
                value={selected.id === "e5" ? deferral : selected.deferral}
                onChange={(e) => setDeferral(Number(e.target.value))}
                readOnly={selected.id !== "e5"}
              />
            </div>
            <div className="ops-field">
              <label>Match</label>
              <input readOnly value={usd(selected.match)} />
            </div>
            {liveFlags.map((f) => (
              <div key={f} className="ops-err">
                {f}
                {audience === "admin" && selected.id === "e5"
                  ? " Caught on the sponsor side. Lower deferral on Jonah to clear it here the same way they would."
                  : selected.id === "e5"
                    ? " Lower the deferral so it is not more than pay."
                    : ""}
              </div>
            ))}
          </div>
          <div className="ops-toggles">
            <label className="ops-tog">
              <input type="checkbox" defaultChecked={selected.hce} /> HCE /
              5% owner
            </label>
            <label className="ops-tog">
              <input type="checkbox" /> LTPT
            </label>
            <label className="ops-tog">
              <input type="checkbox" /> Union
            </label>
            <label className="ops-tog">
              <input type="checkbox" /> K-1 earner
            </label>
          </div>
          {audience === "admin" && selected.name.startsWith("Dale") ? (
            <p className="ops-note" style={{ marginTop: 16 }}>
              Post-test return (ACP/K-1) would pin here after FTW runs, not as
              a Congruent email. That is the piece PensionPro never owned.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Brokerage(props: {
  remaining: number;
  preTax: number;
  roth: number;
  er: number;
  after: number;
  setPreTax: (n: number) => void;
  setRoth: (n: number) => void;
  setEr: (n: number) => void;
  setAfter: (n: number) => void;
  audience?: "admin" | "sponsor";
}) {
  const {
    remaining,
    preTax,
    roth,
    er,
    after,
    setPreTax,
    setRoth,
    setEr,
    setAfter,
    audience = "admin",
  } = props;
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Brokerage</h1>
          <p>
            {audience === "sponsor"
              ? "Drop the December statement. We will fill balances. You still split deposits until the remaining hits zero."
              : "PensionPro can only say received or not. Cycle keeps the twelve months, parses the PDF, and makes the sponsor allocate deposits to zero. Combo 401(k) and cash balance share this Schwab pool."}
          </p>
        </div>
      </div>
      <div className="ops-month">
        {BROKERAGE_MONTHS.map((m) => (
          <button
            key={m.m}
            type="button"
            className={m.ok ? "is-go" : "is-need"}
          >
            <strong>{m.m}</strong>
            <span>{m.ok ? "in" : "open"}</span>
          </button>
        ))}
      </div>
      <div className="ops-drop">
        Drop the December Schwab statement. Balances fill. Deposits still need
        a split, because the PDF will not do that for you.
      </div>
      <div className={`ops-remain ${remaining === 0 ? "is-zero" : "is-open"}`}>
        <span>Deposits still to allocate (must hit $0)</span>
        <strong>{usd(remaining)}</strong>
      </div>
      <div className="ops-alloc" style={{ marginTop: 12 }}>
        <span />
        <span className="ops-mono">Pre-tax</span>
        <span className="ops-mono">Roth</span>
        <span className="ops-mono">Employer</span>
        <span className="ops-mono">After-tax</span>
        <span>Current year</span>
        <input
          type="number"
          value={preTax}
          onChange={(e) => setPreTax(Number(e.target.value))}
        />
        <input
          type="number"
          value={roth}
          onChange={(e) => setRoth(Number(e.target.value))}
        />
        <input
          type="number"
          value={er}
          onChange={(e) => setEr(Number(e.target.value))}
        />
        <input
          type="number"
          value={after}
          onChange={(e) => setAfter(Number(e.target.value))}
        />
      </div>
      <p className="ops-note" style={{ marginTop: 16 }}>
        Beginning assets {usd(1984410)} · ending {usd(2184600)} · fees{" "}
        {usd(12440)}.
        {audience === "admin"
          ? " First-year filing off. This is the 12-statement waterfall as a screen."
          : ""}
      </p>
    </>
  );
}

function Ingest() {
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Payroll and recordkeeper</h1>
          <p>
            Makeshift API: the three reports TPAs already get, uploaded as-is.
            John Hancock TED is live. Finch waits until the acquired book is on
            it. Halstead is brokerage, so RK is off on this plan.
          </p>
        </div>
      </div>
      <div className="ops-ftw">
        <span className="ops-status ops-status--go">Connected</span>
        <span>
          Tests still run in <code>ftwilliam.com</code> for this tenant. Cycle
          stores the extract and the review. Turn the engine on per plan type
          when you trust it (solo, then SH).
        </span>
      </div>
      <div className="ops-grid-2">
        <div className="ops-panel">
          <h2>Payroll parsers</h2>
          <table className="ops-table">
            <tbody>
              {[
                ["ADP Run", "File · format changed mid-season once"],
                ["Paychex", "File · API if a book is all Paychex"],
                ["Gusto", "File"],
                ["P4 native / universal", "Generic grid"],
              ].map(([a, b]) => (
                <tr key={a}>
                  <td>{a}</td>
                  <td style={{ color: "var(--ink-soft)" }}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ops-panel">
          <h2>Recordkeeper</h2>
          <table className="ops-table">
            <tbody>
              <tr>
                <td>John Hancock TED</td>
                <td className="ops-status ops-status--go">API</td>
              </tr>
              <tr>
                <td>Empower / Voya / AF RKD</td>
                <td>3 TPA reports, parse</td>
              </tr>
              <tr>
                <td>Merrill / Schwab brokerage</td>
                <td className="ops-status ops-status--need">
                  No API. Portal brokerage.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Review({
  tab,
  setTab,
}: {
  tab: (typeof TABS)[number];
  setTab: (t: (typeof TABS)[number]) => void;
}) {
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Review ARC</h1>
          <p>
            Left to right, after the portal is green. Specs came off the plan
            document. You are not loading FTW; you are reading results. Combo
            allocation still cites the actuary.
          </p>
        </div>
        <div className="ops-h-actions">
          <button type="button" className="ops-btn ops-btn--go">
            Run report
          </button>
        </div>
      </div>
      <div className="ops-pipe">
        <div className="ops-steps">
          {PIPELINE.map((s) => (
            <button
              key={s.id}
              type="button"
              className={s.state === "need" ? "is-need" : s.state === "hold" ? "is-hold" : ""}
            >
              <span className={`ops-dot ops-dot--${s.state === "go" ? "go" : ""}`} />
              <span>
                <b>{s.label}</b>
                <small>{s.note}</small>
              </span>
            </button>
          ))}
        </div>
        <div>
          <div className="ops-tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === "Census" ? (
            <table className="ops-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>HCE</th>
                  <th>Comp</th>
                  <th>Deferral</th>
                  <th>Elig</th>
                </tr>
              </thead>
              <tbody>
                {EMPLOYEES.filter((e) => !e.flags.length || e.id === "e1").map(
                  (e) => (
                    <tr key={e.id}>
                      <td>{e.name}</td>
                      <td>{e.hce ? "Y" : ""}</td>
                      <td className="num">{usd(e.comp)}</td>
                      <td className="num">{usd(e.deferral)}</td>
                      <td>Y · 1/1 entry</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          ) : tab === "Cross-test" ? (
            <p className="ops-note">
              New comparability on Meridian-class plans. Halstead combo: DC
              side in Cycle, CB numbers from Congruent actuarial. Do not
              pretend we ran the CB valuation.
            </p>
          ) : (
            <p className="ops-note">
              {tab} specs pulled from the adoption agreement (Document Agility /
              FTW docs). Eligibility, HCE, participation dates calculate from
              those specs once census is IGO.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function Package() {
  const due = RECON.reduce((s, r) => s + r.due, 0);
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Administration package</h1>
          <p>
            Seconds to generate. Opens on what a human must see. The rest is
            appendix. This replaces the 5–10 hour consult prep and the buried
            FTW recon.
          </p>
        </div>
        <div className="ops-h-actions">
          <button type="button" className="ops-btn">
            Post to portal
          </button>
          <button type="button" className="ops-btn ops-btn--go">
            Book time on recon
          </button>
        </div>
      </div>
      <div className="ops-pkg">
        <h2>Halstead Outfitters 401(k) PSP</h2>
        <p className="ops-lede">
          Results summary · plan year 2025 · generated 00:12 after Run
          Report
        </p>
        <div className="ops-flag">
          <strong>Deposit reconciliation.</strong> Payroll and trust do not
          line up. {usd(due)} still due. Look at this before the sponsor does.
        </div>
        <div className="ops-flag">
          <strong>Fidelity bond.</strong> 10% of assets is {usd(218460)}. Bond
          on file is {usd(150000)}.
        </div>
        <p className="ops-okline">ADP / ACP · passing</p>
        <p className="ops-okline">402(g) · no excess after census edits</p>
        <p className="ops-okline">Coverage · ratio 78.4%</p>
        <p className="ops-okline">Top heavy · no</p>
        <table className="ops-table" style={{ marginTop: 16 }}>
          <thead>
            <tr>
              <th>Source</th>
              <th>Calculated</th>
              <th>Deposited</th>
              <th>Diff (+due)</th>
            </tr>
          </thead>
          <tbody>
            {RECON.map((r) => (
              <tr key={r.src}>
                <td>{r.src}</td>
                <td className="num">{usd(r.calc)}</td>
                <td className="num">{usd(r.dep)}</td>
                <td className={r.due ? "ops-age" : "num"}>{usd(r.due)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Form5500() {
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Form 5500</h1>
          <p>
            Values into buckets. XML for EFAST, or the same payload into FTW /
            Relius if the shop still files there. Assets {usd(2184600)} so
            this one files.
          </p>
        </div>
        <div className="ops-h-actions">
          <button type="button" className="ops-btn">
            Pass to FTW
          </button>
          <button type="button" className="ops-btn ops-btn--go">
            Generate EFAST XML
          </button>
        </div>
      </div>
      <table className="ops-table">
        <tbody>
          {[
            ["1c", "Total assets EOY", usd(2184600)],
            ["2a", "Total contributions", usd(188320)],
            ["2b", "Total distributions", usd(12400)],
            ["2c", "Admin expenses", usd(12440)],
            ["Participants BOY / EOY", "16 / 18", ""],
            ["Schedule I / H", "I (small plan)", ""],
          ].map(([a, b, c]) => (
            <tr key={a}>
              <td className="ops-mono">{a}</td>
              <td>{b}</td>
              <td className="num">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Time() {
  const hrs = TIME_ROWS.reduce((s, r) => s + r.hrs, 0);
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Time on the step</h1>
          <p>
            Plug hours when you leave the workflow step. Invoice is a button,
            not a yellow Excel cell Chris has to remember. Extra census and
            recon hours are billable because they were flagged at the door.
          </p>
        </div>
        <div className="ops-h-actions">
          <button type="button" className="ops-btn ops-btn--go">
            Generate invoice · {hrs.toFixed(1)}h
          </button>
        </div>
      </div>
      <table className="ops-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Plan</th>
            <th>Step</th>
            <th>Cat</th>
            <th>Hours</th>
            <th>Bill</th>
          </tr>
        </thead>
        <tbody>
          {TIME_ROWS.map((r) => (
            <tr key={r.date + r.plan}>
              <td className="ops-mono">{r.date}</td>
              <td>{r.plan}</td>
              <td>{r.step}</td>
              <td>{r.cat}</td>
              <td className="num">{r.hrs.toFixed(1)}</td>
              <td>{r.bill ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Quality() {
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Workflow quality</h1>
          <p>
            193 NDT steps reviewed YTD. 2 with notes. 1.04%. The note is
            coaching, not a ticket in Zendesk.
          </p>
        </div>
      </div>
      <div className="ops-kpis">
        <div>
          <dl>
            <dt>Reviewed · with notes</dt>
            <dd>
              193 <span>2 · 1.04%</span>
            </dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>Top category</dt>
            <dd>
              Data error <span>brokerage / K-1</span>
            </dd>
          </dl>
        </div>
      </div>
      {QC_ROWS.map((q) => (
        <div key={q.plan} className="ops-panel" style={{ marginBottom: 12 }}>
          <h2>
            {q.plan} · {q.step} · {q.by}
          </h2>
          <p style={{ margin: 0, padding: "12px 14px 14px" }}>{q.note}</p>
        </div>
      ))}
    </>
  );
}

function Config({
  cfg,
  setCfg,
}: {
  cfg: Record<string, boolean>;
  setCfg: Dispatch<SetStateAction<Record<string, boolean>>>;
}) {
  const rows: [string, string][] = [
    ["census", "Census"],
    ["questionnaire", "Questionnaire"],
    ["brokerage", "Brokerage (Schwab / Merrill)"],
    ["rk", "Recordkeeper financials"],
    ["db", "DB / CB assets"],
    ["loan", "Loan request"],
    ["distro", "Distribution request"],
    ["survey", "Portal survey"],
  ];
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>Portal config, this plan</h1>
          <p>
            If you have a feed, do not ask. Halstead has no RK API, so
            brokerage stays on and RK financials stay off. Northline would
            invert that.
          </p>
        </div>
      </div>
      <div className="ops-cfg">
        {rows.map(([k, label]) => (
          <label key={k}>
            {label}
            <button
              type="button"
              className="ops-switch"
              data-on={cfg[k] ? "true" : "false"}
              aria-pressed={cfg[k]}
              onClick={() => setCfg((c) => ({ ...c, [k]: !c[k] }))}
            >
              <i />
            </button>
          </label>
        ))}
      </div>
    </>
  );
}

function Replace() {
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>What we replace, and what we do not</h1>
          <p>
            Inclusive for Cerberus and the next independent TPA: same Cycle
            tenant, their procedures, their 2FA. Modules can be bought alone
            (invoicing-only already exists in the P4 world).
          </p>
        </div>
      </div>
      <table className="ops-table ops-replace">
        <thead>
          <tr>
            <th>Surface</th>
            <th>How it works today</th>
            <th>Cycle</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {REPLACE_ROWS.map((r) => (
            <tr key={r.surface}>
              <td>{r.surface}</td>
              <td>{r.today}</td>
              <td>{r.cycle}</td>
              <td>
                <span className="ops-chip">{r.tag}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Sponsor(props: {
  remaining: number;
  preTax: number;
  roth: number;
  er: number;
  after: number;
  setPreTax: (n: number) => void;
  setRoth: (n: number) => void;
  setEr: (n: number) => void;
  setAfter: (n: number) => void;
  emp: string;
  setEmp: (id: string) => void;
  selected: (typeof EMPLOYEES)[number];
  deferral: number;
  setDeferral: (n: number) => void;
  liveFlags: string[];
}) {
  const [page, setPage] = useState<"home" | "census" | "brokerage">("home");
  if (page === "census") {
    return (
      <>
        <button type="button" className="ops-btn" onClick={() => setPage("home")}>
          Portal home
        </button>
        <Census
          emp={props.emp}
          setEmp={props.setEmp}
          selected={props.selected}
          deferral={props.deferral}
          setDeferral={props.setDeferral}
          liveFlags={props.liveFlags}
          audience="sponsor"
        />
      </>
    );
  }
  if (page === "brokerage") {
    return (
      <>
        <button type="button" className="ops-btn" onClick={() => setPage("home")}>
          Portal home
        </button>
        <Brokerage
          remaining={props.remaining}
          preTax={props.preTax}
          roth={props.roth}
          er={props.er}
          after={props.after}
          setPreTax={props.setPreTax}
          setRoth={props.setRoth}
          setEr={props.setEr}
          setAfter={props.setAfter}
          audience="sponsor"
        />
      </>
    );
  }
  return (
    <>
      <div className="ops-h">
        <div>
          <h1>What we still need</h1>
          <p>
            Red means you. Green means we have it. Log in at 9pm. We are not
            here. Turn the screen green and you will hear from us.
          </p>
        </div>
      </div>
      <div className="ops-landing">
        <button type="button" className="ops-row" onClick={() => setPage("census")}>
          <span>
            <b>Census</b>
            <small>2 people still have edits · Luis DOB, Jonah deferral</small>
          </span>
          <span className="ops-status ops-status--need">Need something</span>
          <span>Open</span>
        </button>
        <button
          type="button"
          className="ops-row"
          onClick={() => setPage("brokerage")}
        >
          <span>
            <b>Brokerage · Schwab *4821</b>
            <small>Dec statement missing · deposits not split</small>
          </span>
          <span className="ops-status ops-status--need">Need something</span>
          <span>Open</span>
        </button>
        <div className="ops-row" style={{ cursor: "default" }}>
          <span>
            <b>Files</b>
            <small>Last received Aug 12 · T&C, adoption, SPD pending</small>
          </span>
          <span className="ops-thumb">Received</span>
          <span />
        </div>
        <div className="ops-row" style={{ cursor: "default" }}>
          <span>
            <b>Invoice</b>
            <small>Setup $299 paid · annual admin at PY start</small>
          </span>
          <span className="ops-thumb">Paid</span>
          <span />
        </div>
        <div className="ops-row" style={{ cursor: "default" }}>
          <span>
            <b>Loans / distributions</b>
            <small>Start a request. We approve.</small>
          </span>
          <span className="ops-thumb">None open</span>
          <span />
        </div>
      </div>
    </>
  );
}
