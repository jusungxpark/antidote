"use client";

import { useId, type ReactNode } from "react";

import type { UseCaseDiagram } from "./use-case-types";

type Kind = UseCaseDiagram;
type Size = "hero" | "thumb";

const LABELS: Record<Kind, string> = {
  inbox:
    "Shared inbox triage: messages sorted into auto-act, systems, and human review",
  detention:
    "Detention and appointment exceptions: clock, dock window, and late arrival",
  claims: "Claim intake: packet completeness with chase for missing pieces",
  collections:
    "AR collections: aging buckets with chase ripples and human escalation",
  ap: "AP invoice exceptions: match breaks cleared or chased with gated payment changes",
  customs:
    "Customs document packs: completeness check and chase before licensed filing",
  workorder:
    "Work order intake: resident request to vendor chase and closeout proof",
  recon:
    "ASN invoice PO recon: variance packet with tolerance clears and human gates",
  coi: "Vendor COI chase: certificate validation with waiver gate and risk review",
  vendorkyc:
    "Vendor onboarding packs: completeness check before ERP create and banking",
  freight:
    "Freight invoice audit: rate match with dispute or pay gate",
  expense:
    "Expense exceptions: policy check and receipt chase with override gate",
  rfp: "RFP packs: assemble and chase SME before partner submit",
  timesheet:
    "Timesheet approvals: reminder chase before bill gate",
  priorauth:
    "Prior auth: clinical packet chase before submit and decision",
  deduction:
    "Trade deductions: playbook match with write-off gate",
  access:
    "Joiner access: approver chase with privileged provision gate",
  bankrec:
    "Bank rec: pattern match with journal gate",
  lease:
    "Lease critical dates: deadline watch and draft notice before legal send",
  audit:
    "Audit evidence: control map and chase before attestation",
};

function ArtShell({
  kind,
  size,
  children,
  viewBox,
}: {
  kind: Kind;
  size: Size;
  children: ReactNode;
  viewBox: string;
}) {
  const uid = useId().replace(/:/g, "");
  const paper = `uc-paper-${kind}-${uid}`;
  const glow = `uc-glow-${kind}-${uid}`;
  const Tag = size === "thumb" ? "div" : "figure";

  return (
    <Tag
      className={`fdm-uc-art fdm-uc-art--${size} fdm-uc-art--${kind}`}
      aria-label={size === "hero" ? LABELS[kind] : undefined}
      aria-hidden={size === "thumb" ? true : undefined}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={glow} cx="50%" cy="42%" r="58%">
            <stop offset="0%" stopColor="#cc272e" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#cc272e" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#cc272e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={paper} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fffdfd" />
            <stop offset="100%" stopColor="#efe8e5" />
          </linearGradient>
        </defs>
        <rect x="-40" y="-40" width="800" height="400" fill={`url(#${paper})`} />
        <rect x="-40" y="-40" width="800" height="400" fill={`url(#${glow})`} />
        {children}
      </svg>
    </Tag>
  );
}

/* ── Thumb icons: bold, few shapes, no labels ─────────────────────── */

function InboxThumb() {
  return (
    <ArtShell kind="inbox" size="thumb" viewBox="0 0 160 104">
      {/* Envelope */}
      <rect x="48" y="32" width="64" height="44" rx="4" className="fdm-uc-fill-soft" />
      <path d="M48 36 L80 58 L112 36" className="fdm-uc-mark" fill="none" />
      {/* Sort tick */}
      <circle cx="118" cy="70" r="12" className="fdm-uc-fill-accent" />
      <path d="M112 70 L116 74 L126 62" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function DetentionThumb() {
  return (
    <ArtShell kind="detention" size="thumb" viewBox="0 0 160 104">
      <circle cx="80" cy="52" r="30" className="fdm-uc-fill-soft" />
      <circle cx="80" cy="52" r="30" className="fdm-uc-ring" fill="none" />
      <path d="M80 52 V28" className="fdm-uc-mark" fill="none" strokeWidth="3" />
      <path d="M80 52 L98 60" className="fdm-uc-mark" fill="none" strokeWidth="2.5" />
      <path
        d="M104 36 A30 30 0 0 1 106 70"
        className="fdm-uc-accent-arc"
        fill="none"
      />
    </ArtShell>
  );
}

function ClaimsThumb() {
  return (
    <ArtShell kind="claims" size="thumb" viewBox="0 0 160 104">
      <rect x="52" y="22" width="56" height="64" rx="5" className="fdm-uc-fill-soft" />
      <path d="M64 42 H96" className="fdm-uc-rule" />
      <path d="M64 54 H90" className="fdm-uc-rule" />
      <rect x="64" y="64" width="28" height="12" rx="2" className="fdm-uc-tile-missing" />
      <path d="M70 70 H86" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function CollectionsThumb() {
  return (
    <ArtShell kind="collections" size="thumb" viewBox="0 0 160 104">
      <rect x="42" y="58" width="18" height="24" rx="2" className="fdm-uc-fill-soft" />
      <rect x="66" y="44" width="18" height="38" rx="2" className="fdm-uc-fill-soft" />
      <rect x="90" y="28" width="18" height="54" rx="2" className="fdm-uc-fill-accent" />
      <path d="M36 84 H116" className="fdm-uc-rule" />
    </ArtShell>
  );
}

/* ── Hero art: fuller narrative for detail pages ──────────────────── */

function InboxHero() {
  return (
    <ArtShell kind="inbox" size="hero" viewBox="0 0 640 280">
      <g className="fdm-uc-stroke">
        <rect
          x="48"
          y="72"
          width="118"
          height="36"
          rx="4"
          className="fdm-uc-fill-soft"
          transform="rotate(-6 107 90)"
        />
        <rect
          x="56"
          y="108"
          width="118"
          height="36"
          rx="4"
          className="fdm-uc-fill-soft"
          transform="rotate(3 115 126)"
        />
        <rect
          x="52"
          y="146"
          width="118"
          height="36"
          rx="4"
          className="fdm-uc-fill-soft"
          transform="rotate(-2 111 164)"
        />
        <line x1="68" y1="86" x2="140" y2="80" className="fdm-uc-rule" />
        <line x1="74" y1="124" x2="152" y2="128" className="fdm-uc-rule" />
        <line x1="70" y1="160" x2="148" y2="156" className="fdm-uc-rule" />
      </g>

      <path d="M178 120 C220 120, 230 140, 268 140" className="fdm-uc-flow" fill="none" />
      <path d="M178 150 C220 150, 230 140, 268 140" className="fdm-uc-flow" fill="none" />
      <path d="M178 178 C220 178, 230 140, 268 140" className="fdm-uc-flow" fill="none" />

      <circle cx="300" cy="140" r="38" className="fdm-uc-core" />
      <circle cx="300" cy="140" r="22" className="fdm-uc-core-inner" />
      <circle cx="300" cy="140" r="6" className="fdm-uc-dot" />

      <g className="fdm-uc-stroke">
        <path d="M360 78 H520" className="fdm-uc-flow-soft" fill="none" />
        <rect x="520" y="58" width="72" height="40" rx="6" className="fdm-uc-fill-accent" />
        <path d="M538 78 L550 90 L578 62" className="fdm-uc-mark" fill="none" />

        <path d="M360 140 H520" className="fdm-uc-flow-soft" fill="none" />
        <rect x="528" y="118" width="56" height="44" rx="4" className="fdm-uc-fill-soft" />
        <line x1="538" y1="132" x2="574" y2="132" className="fdm-uc-rule" />
        <line x1="538" y1="144" x2="566" y2="144" className="fdm-uc-rule" />

        <path d="M360 200 H520" className="fdm-uc-flow-dash" fill="none" />
        <circle cx="556" cy="188" r="10" className="fdm-uc-fill-ink" />
        <path d="M534 224 C534 206, 578 206, 578 224 Z" className="fdm-uc-fill-ink" />
      </g>
    </ArtShell>
  );
}

function DetentionHero() {
  return (
    <ArtShell kind="detention" size="hero" viewBox="0 0 640 280">
      <rect x="80" y="168" width="420" height="14" rx="3" className="fdm-uc-fill-ink-soft" />
      <rect x="110" y="152" width="70" height="46" rx="4" className="fdm-uc-fill-soft" />
      <rect x="200" y="152" width="70" height="46" rx="4" className="fdm-uc-fill-soft" />
      <rect x="290" y="152" width="70" height="46" rx="4" className="fdm-uc-window-open" />

      <g transform="translate(390 128)">
        <rect x="0" y="20" width="88" height="52" rx="6" className="fdm-uc-fill-accent" />
        <circle cx="22" cy="76" r="10" className="fdm-uc-fill-ink" />
        <circle cx="68" cy="76" r="10" className="fdm-uc-fill-ink" />
        <rect x="12" y="28" width="40" height="22" rx="2" className="fdm-uc-fill-soft" />
      </g>

      <circle cx="180" cy="88" r="44" className="fdm-uc-fill-soft" />
      <circle cx="180" cy="88" r="44" className="fdm-uc-ring" fill="none" />
      <path d="M180 88 L180 56" className="fdm-uc-mark" strokeWidth="3" fill="none" />
      <path d="M180 88 L208 100" className="fdm-uc-mark" strokeWidth="2.5" fill="none" />
      <path
        d="M216 70 A44 44 0 0 1 214 112"
        className="fdm-uc-accent-arc"
        fill="none"
      />

      <path
        d="M224 100 C280 90, 340 110, 390 148"
        className="fdm-uc-flow-dash"
        fill="none"
      />
      <circle cx="390" cy="148" r="5" className="fdm-uc-dot" />
    </ArtShell>
  );
}

function ClaimsHero() {
  return (
    <ArtShell kind="claims" size="hero" viewBox="0 0 640 280">
      <g className="fdm-uc-stroke" opacity="0.85">
        <rect
          x="56"
          y="70"
          width="64"
          height="80"
          rx="3"
          className="fdm-uc-fill-soft"
          transform="rotate(-8 88 110)"
        />
        <rect
          x="78"
          y="96"
          width="64"
          height="80"
          rx="3"
          className="fdm-uc-fill-soft"
          transform="rotate(4 110 136)"
        />
      </g>
      <path d="M150 130 C190 130, 210 140, 240 140" className="fdm-uc-flow" fill="none" />

      <rect x="240" y="64" width="160" height="168" rx="8" className="fdm-uc-fill-soft" />
      <rect x="240" y="64" width="160" height="28" rx="8" className="fdm-uc-fill-ink-soft" />
      <rect x="260" y="112" width="52" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="328" y="112" width="52" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="260" y="164" width="52" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="328" y="164" width="52" height="40" rx="3" className="fdm-uc-tile-missing" />
      <line x1="344" y1="184" x2="364" y2="184" className="fdm-uc-mark" strokeWidth="2" />

      <path
        d="M420 184 C470 140, 510 160, 500 210 C490 250, 430 240, 420 200"
        className="fdm-uc-flow-dash"
        fill="none"
      />
      <circle cx="500" cy="168" r="4" className="fdm-uc-dot fdm-uc-pulse" />
      <circle cx="478" cy="230" r="3.5" className="fdm-uc-dot" />

      <g transform="translate(520 150)">
        <circle cx="36" cy="18" r="11" className="fdm-uc-fill-ink" />
        <path d="M12 58 C12 36, 60 36, 60 58 Z" className="fdm-uc-fill-ink" />
        <rect x="8" y="62" width="56" height="8" rx="2" className="fdm-uc-fill-accent" />
      </g>
    </ArtShell>
  );
}

function CollectionsHero() {
  return (
    <ArtShell kind="collections" size="hero" viewBox="0 0 640 280">
      <g className="fdm-uc-stroke">
        <rect x="90" y="170" width="36" height="50" rx="3" className="fdm-uc-fill-soft" />
        <rect x="140" y="140" width="36" height="80" rx="3" className="fdm-uc-fill-soft" />
        <rect x="190" y="110" width="36" height="110" rx="3" className="fdm-uc-fill-soft" />
        <rect x="240" y="78" width="36" height="142" rx="3" className="fdm-uc-fill-accent" />
        <rect x="290" y="54" width="36" height="166" rx="3" className="fdm-uc-bar-hot" />
      </g>
      <line x1="80" y1="224" x2="340" y2="224" className="fdm-uc-rule" />

      <circle cx="258" cy="140" r="28" className="fdm-uc-ripple" fill="none" />
      <circle cx="258" cy="140" r="48" className="fdm-uc-ripple" fill="none" />
      <circle cx="258" cy="140" r="68" className="fdm-uc-ripple fdm-uc-ripple-soft" fill="none" />

      <g className="fdm-uc-stroke">
        <path d="M330 120 C390 90, 430 100, 470 88" className="fdm-uc-flow" fill="none" />
        <path d="M330 150 C400 150, 440 160, 480 170" className="fdm-uc-flow-soft" fill="none" />
        <rect x="470" y="70" width="36" height="26" rx="2" className="fdm-uc-fill-soft" />
        <path d="M470 70 L488 86 L506 70" className="fdm-uc-mark" fill="none" />
        <rect x="486" y="158" width="36" height="26" rx="2" className="fdm-uc-fill-soft" />
        <path d="M486 158 L504 174 L522 158" className="fdm-uc-mark" fill="none" />
      </g>

      <path d="M326 70 C380 40, 440 48, 520 56" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="548" cy="52" r="11" className="fdm-uc-fill-ink" />
      <path d="M524 92 C524 70, 572 70, 572 92 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}


function ApThumb() {
  return (
    <ArtShell kind="ap" size="thumb" viewBox="0 0 160 104">
      <rect x="36" y="28" width="40" height="52" rx="3" className="fdm-uc-fill-soft" />
      <rect x="84" y="28" width="40" height="52" rx="3" className="fdm-uc-fill-soft" />
      <path d="M76 54 H84" className="fdm-uc-flow" fill="none" />
      <path d="M70 54 L76 54 L73 50" className="fdm-uc-mark" fill="none" />
      <circle cx="124" cy="70" r="11" className="fdm-uc-fill-accent" />
      <path d="M119 70 L123 74 L131 64" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function CustomsThumb() {
  return (
    <ArtShell kind="customs" size="thumb" viewBox="0 0 160 104">
      <rect x="44" y="22" width="52" height="64" rx="4" className="fdm-uc-fill-soft" />
      <path d="M56 40 H84 M56 52 H78" className="fdm-uc-rule" />
      <rect x="56" y="62" width="28" height="12" rx="2" className="fdm-uc-tile-missing" />
      <path d="M62 68 H78" className="fdm-uc-mark" fill="none" />
      <circle cx="118" cy="70" r="4" className="fdm-uc-dot" />
      <path
        d="M100 70 C112 52, 136 56, 132 78"
        className="fdm-uc-flow-dash"
        fill="none"
      />
    </ArtShell>
  );
}

function WorkorderThumb() {
  return (
    <ArtShell kind="workorder" size="thumb" viewBox="0 0 160 104">
      <rect x="42" y="30" width="48" height="48" rx="4" className="fdm-uc-fill-soft" />
      <path d="M54 46 H78 M54 58 H70" className="fdm-uc-rule" />
      <path d="M90 54 H104" className="fdm-uc-flow" fill="none" />
      <circle cx="118" cy="40" r="8" className="fdm-uc-fill-ink" />
      <path d="M108 62 C108 50, 128 50, 128 62 Z" className="fdm-uc-fill-ink" />
      <circle cx="118" cy="78" r="10" className="fdm-uc-fill-accent" />
      <path d="M113 78 L117 82 L125 72" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function ReconThumb() {
  return (
    <ArtShell kind="recon" size="thumb" viewBox="0 0 160 104">
      <rect x="30" y="36" width="28" height="36" rx="3" className="fdm-uc-fill-soft" />
      <rect x="66" y="28" width="28" height="52" rx="3" className="fdm-uc-fill-accent" />
      <rect x="102" y="40" width="28" height="28" rx="3" className="fdm-uc-fill-soft" />
      <path d="M58 54 H66 M94 54 H102" className="fdm-uc-flow-dash" fill="none" />
      <path d="M78 20 V28" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function ApHero() {
  return (
    <ArtShell kind="ap" size="hero" viewBox="0 0 640 280">
      <rect x="80" y="70" width="120" height="150" rx="8" className="fdm-uc-fill-soft" />
      <path d="M100 110 H200 M100 130 H180 M100 150 H190" className="fdm-uc-rule" />
      <rect x="260" y="70" width="120" height="150" rx="8" className="fdm-uc-fill-soft" />
      <path d="M280 110 H360 M280 130 H340 M280 150 H350" className="fdm-uc-rule" />
      <path d="M200 145 H260" className="fdm-uc-flow" fill="none" />
      <circle cx="420" cy="140" r="36" className="fdm-uc-core" />
      <circle cx="420" cy="140" r="8" className="fdm-uc-dot" />
      <path d="M456 140 H500" className="fdm-uc-flow" fill="none" />
      <rect x="500" y="90" width="90" height="44" rx="6" className="fdm-uc-fill-accent" />
      <path d="M520 112 L535 124 L568 96" className="fdm-uc-mark" fill="none" />
      <path d="M456 160 C480 190, 500 200, 530 210" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="556" cy="220" r="10" className="fdm-uc-fill-ink" />
      <path d="M534 252 C534 234, 578 234, 578 252 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function CustomsHero() {
  return (
    <ArtShell kind="customs" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="60" width="70" height="90" rx="4" className="fdm-uc-fill-soft" transform="rotate(-6 105 105)" />
      <rect x="110" y="80" width="70" height="90" rx="4" className="fdm-uc-fill-soft" transform="rotate(4 145 125)" />
      <path d="M180 130 H240" className="fdm-uc-flow" fill="none" />
      <rect x="240" y="55" width="170" height="180" rx="8" className="fdm-uc-fill-soft" />
      <rect x="240" y="55" width="170" height="28" rx="8" className="fdm-uc-fill-ink-soft" />
      <rect x="260" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="330" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="260" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="330" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-missing" />
      <path d="M345 185 H370" className="fdm-uc-mark" fill="none" />
      <path d="M420 185 C480 140, 540 170, 520 230" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="520" cy="160" r="5" className="fdm-uc-dot" />
      <circle cx="560" cy="70" r="12" className="fdm-uc-fill-ink" />
      <path d="M536 110 C536 88, 584 88, 584 110 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function WorkorderHero() {
  return (
    <ArtShell kind="workorder" size="hero" viewBox="0 0 640 280">
      <rect x="60" y="90" width="100" height="70" rx="6" className="fdm-uc-fill-soft" />
      <path d="M80 115 H140 M80 135 H120" className="fdm-uc-rule" />
      <path d="M160 125 H220" className="fdm-uc-flow" fill="none" />
      <rect x="220" y="70" width="140" height="140" rx="8" className="fdm-uc-core" />
      <circle cx="290" cy="140" r="10" className="fdm-uc-dot" />
      <path d="M360 110 H430" className="fdm-uc-flow-soft" fill="none" />
      <path d="M360 140 H430" className="fdm-uc-flow-soft" fill="none" />
      <path d="M360 170 H430" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="470" cy="100" r="12" className="fdm-uc-fill-ink" />
      <path d="M448 140 C448 118, 492 118, 492 140 Z" className="fdm-uc-fill-ink" />
      <rect x="450" y="160" width="70" height="40" rx="4" className="fdm-uc-fill-soft" />
      <path d="M460 175 H510 M460 188 H495" className="fdm-uc-rule" />
      <circle cx="560" cy="200" r="18" className="fdm-uc-fill-accent" />
      <path d="M550 200 L558 208 L574 188" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function ReconHero() {
  return (
    <ArtShell kind="recon" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="100" width="90" height="110" rx="6" className="fdm-uc-fill-soft" />
      <rect x="190" y="70" width="90" height="160" rx="6" className="fdm-uc-fill-accent" />
      <rect x="310" y="110" width="90" height="90" rx="6" className="fdm-uc-fill-soft" />
      <path d="M160 155 H190 M280 155 H310" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="450" cy="140" r="34" className="fdm-uc-core" />
      <circle cx="450" cy="140" r="7" className="fdm-uc-dot" />
      <path d="M484 120 H540" className="fdm-uc-flow" fill="none" />
      <path d="M484 160 C510 200, 530 210, 560 220" className="fdm-uc-flow-dash" fill="none" />
      <rect x="540" y="95" width="70" height="40" rx="4" className="fdm-uc-fill-accent" />
      <path d="M555 115 L565 125 L595 100" className="fdm-uc-mark" fill="none" />
      <circle cx="575" cy="230" r="10" className="fdm-uc-fill-ink" />
      <path d="M553 260 C553 242, 597 242, 597 260 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

/* ── New use-case thumbs ──────────────────────────────────────────── */

function CoiThumb() {
  return (
    <ArtShell kind="coi" size="thumb" viewBox="0 0 160 104">
      <rect x="48" y="24" width="52" height="60" rx="4" className="fdm-uc-fill-soft" />
      <path d="M60 42 H88 M60 54 H80" className="fdm-uc-rule" />
      <circle cx="112" cy="68" r="16" className="fdm-uc-fill-accent" />
      <path d="M104 68 L110 74 L122 58" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function VendorkycThumb() {
  return (
    <ArtShell kind="vendorkyc" size="thumb" viewBox="0 0 160 104">
      <rect x="40" y="28" width="44" height="54" rx="4" className="fdm-uc-fill-soft" />
      <rect x="52" y="40" width="20" height="14" rx="2" className="fdm-uc-tile-ok" />
      <rect x="52" y="58" width="20" height="14" rx="2" className="fdm-uc-tile-missing" />
      <path d="M90 54 H104" className="fdm-uc-flow" fill="none" />
      <circle cx="118" cy="54" r="14" className="fdm-uc-core" />
      <circle cx="118" cy="54" r="4" className="fdm-uc-dot" />
    </ArtShell>
  );
}

function FreightThumb() {
  return (
    <ArtShell kind="freight" size="thumb" viewBox="0 0 160 104">
      <rect x="36" y="40" width="48" height="32" rx="3" className="fdm-uc-fill-soft" />
      <circle cx="48" cy="76" r="8" className="fdm-uc-fill-ink" />
      <circle cx="72" cy="76" r="8" className="fdm-uc-fill-ink" />
      <path d="M90 54 H104" className="fdm-uc-flow" fill="none" />
      <rect x="104" y="36" width="32" height="40" rx="3" className="fdm-uc-fill-accent" />
      <path d="M112 56 L118 62 L128 48" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function ExpenseThumb() {
  return (
    <ArtShell kind="expense" size="thumb" viewBox="0 0 160 104">
      <rect x="44" y="28" width="56" height="40" rx="4" className="fdm-uc-fill-soft" />
      <path d="M56 42 H88 M56 54 H76" className="fdm-uc-rule" />
      <rect x="68" y="64" width="36" height="18" rx="2" className="fdm-uc-tile-missing" />
      <path d="M76 73 H96" className="fdm-uc-mark" fill="none" />
      <circle cx="118" cy="40" r="10" className="fdm-uc-fill-accent" />
    </ArtShell>
  );
}

function RfpThumb() {
  return (
    <ArtShell kind="rfp" size="thumb" viewBox="0 0 160 104">
      <rect x="38" y="24" width="40" height="52" rx="3" className="fdm-uc-fill-soft" />
      <rect x="52" y="32" width="40" height="52" rx="3" className="fdm-uc-fill-soft" />
      <path d="M64 48 H84 M64 60 H78" className="fdm-uc-rule" />
      <circle cx="118" cy="68" r="12" className="fdm-uc-fill-ink" />
      <path d="M100 68 C110 50, 134 54, 130 78" className="fdm-uc-flow-dash" fill="none" />
    </ArtShell>
  );
}

function TimesheetThumb() {
  return (
    <ArtShell kind="timesheet" size="thumb" viewBox="0 0 160 104">
      <rect x="42" y="26" width="56" height="56" rx="4" className="fdm-uc-fill-soft" />
      <path d="M54 42 H86 M54 54 H78 M54 66 H70" className="fdm-uc-rule" />
      <circle cx="116" cy="58" r="16" className="fdm-uc-fill-accent" />
      <path d="M116 48 V58 L124 62" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function PriorauthThumb() {
  return (
    <ArtShell kind="priorauth" size="thumb" viewBox="0 0 160 104">
      <rect x="44" y="22" width="52" height="64" rx="4" className="fdm-uc-fill-soft" />
      <rect x="56" y="36" width="28" height="14" rx="2" className="fdm-uc-tile-ok" />
      <rect x="56" y="54" width="28" height="14" rx="2" className="fdm-uc-tile-missing" />
      <path d="M62 61 H78" className="fdm-uc-mark" fill="none" />
      <circle cx="118" cy="70" r="4" className="fdm-uc-dot" />
      <path d="M100 70 C112 52, 136 56, 132 78" className="fdm-uc-flow-dash" fill="none" />
    </ArtShell>
  );
}

function DeductionThumb() {
  return (
    <ArtShell kind="deduction" size="thumb" viewBox="0 0 160 104">
      <rect x="34" y="34" width="32" height="40" rx="3" className="fdm-uc-fill-soft" />
      <rect x="74" y="28" width="32" height="52" rx="3" className="fdm-uc-fill-accent" />
      <path d="M66 54 H74" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="124" cy="70" r="12" className="fdm-uc-fill-ink" />
      <path d="M118 70 L122 74 L132 62" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function AccessThumb() {
  return (
    <ArtShell kind="access" size="thumb" viewBox="0 0 160 104">
      <rect x="52" y="36" width="40" height="40" rx="4" className="fdm-uc-fill-soft" />
      <circle cx="72" cy="30" r="12" className="fdm-uc-ring" fill="none" />
      <circle cx="72" cy="56" r="6" className="fdm-uc-fill-ink" />
      <path d="M98 56 H112" className="fdm-uc-flow" fill="none" />
      <circle cx="124" cy="56" r="12" className="fdm-uc-fill-accent" />
      <path d="M118 56 L122 60 L132 48" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function BankrecThumb() {
  return (
    <ArtShell kind="bankrec" size="thumb" viewBox="0 0 160 104">
      <rect x="36" y="30" width="40" height="48" rx="3" className="fdm-uc-fill-soft" />
      <path d="M46 44 H66 M46 56 H60" className="fdm-uc-rule" />
      <rect x="88" y="30" width="40" height="48" rx="3" className="fdm-uc-fill-soft" />
      <path d="M98 44 H118 M98 56 H112" className="fdm-uc-rule" />
      <path d="M76 54 H88" className="fdm-uc-flow" fill="none" />
      <circle cx="82" cy="72" r="8" className="fdm-uc-fill-accent" />
    </ArtShell>
  );
}

function LeaseThumb() {
  return (
    <ArtShell kind="lease" size="thumb" viewBox="0 0 160 104">
      <rect x="44" y="26" width="52" height="56" rx="4" className="fdm-uc-fill-soft" />
      <path d="M56 42 H84 M56 54 H76" className="fdm-uc-rule" />
      <circle cx="116" cy="40" r="14" className="fdm-uc-fill-soft" />
      <circle cx="116" cy="40" r="14" className="fdm-uc-ring" fill="none" />
      <path d="M116 40 V28" className="fdm-uc-mark" fill="none" />
      <path d="M116 40 L124 46" className="fdm-uc-mark" fill="none" />
      <path
        d="M128 30 A14 14 0 0 1 128 52"
        className="fdm-uc-accent-arc"
        fill="none"
      />
    </ArtShell>
  );
}

function AuditThumb() {
  return (
    <ArtShell kind="audit" size="thumb" viewBox="0 0 160 104">
      <rect x="40" y="28" width="48" height="52" rx="4" className="fdm-uc-fill-soft" />
      <rect x="50" y="40" width="16" height="12" rx="2" className="fdm-uc-tile-ok" />
      <rect x="70" y="40" width="10" height="12" rx="2" className="fdm-uc-tile-missing" />
      <rect x="50" y="56" width="28" height="12" rx="2" className="fdm-uc-tile-ok" />
      <path d="M96 54 H108" className="fdm-uc-flow" fill="none" />
      <circle cx="122" cy="54" r="12" className="fdm-uc-fill-ink" />
      <path d="M116 54 L120 58 L130 46" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

/* ── New use-case heroes ──────────────────────────────────────────── */

function CoiHero() {
  return (
    <ArtShell kind="coi" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="70" width="110" height="140" rx="8" className="fdm-uc-fill-soft" />
      <path d="M90 110 H160 M90 130 H150 M90 150 H155" className="fdm-uc-rule" />
      <path d="M180 140 H240" className="fdm-uc-flow" fill="none" />
      <circle cx="290" cy="140" r="42" className="fdm-uc-core" />
      <circle cx="290" cy="140" r="10" className="fdm-uc-dot" />
      <path d="M332 120 H400" className="fdm-uc-flow" fill="none" />
      <path d="M332 160 C370 200, 420 210, 460 220" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="440" cy="100" r="28" className="fdm-uc-fill-accent" />
      <path d="M426 100 L436 110 L458 84" className="fdm-uc-mark" fill="none" />
      <circle cx="490" cy="230" r="11" className="fdm-uc-fill-ink" />
      <path d="M468 262 C468 244, 512 244, 512 262 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function VendorkycHero() {
  return (
    <ArtShell kind="vendorkyc" size="hero" viewBox="0 0 640 280">
      <rect x="60" y="80" width="90" height="70" rx="6" className="fdm-uc-fill-soft" />
      <path d="M78 105 H130 M78 125 H115" className="fdm-uc-rule" />
      <rect x="70" y="165" width="70" height="50" rx="4" className="fdm-uc-fill-soft" />
      <path d="M160 115 H220" className="fdm-uc-flow" fill="none" />
      <rect x="220" y="55" width="170" height="180" rx="8" className="fdm-uc-fill-soft" />
      <rect x="220" y="55" width="170" height="28" rx="8" className="fdm-uc-fill-ink-soft" />
      <rect x="240" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="310" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="240" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="310" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-missing" />
      <path d="M325 185 H365" className="fdm-uc-mark" fill="none" />
      <path d="M400 145 H460" className="fdm-uc-flow" fill="none" />
      <path d="M400 185 C450 220, 500 230, 540 235" className="fdm-uc-flow-dash" fill="none" />
      <rect x="460" y="120" width="90" height="44" rx="6" className="fdm-uc-fill-accent" />
      <path d="M480 142 L495 154 L528 126" className="fdm-uc-mark" fill="none" />
      <circle cx="560" cy="245" r="10" className="fdm-uc-fill-ink" />
      <path d="M538 275 C538 257, 582 257, 582 275 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function FreightHero() {
  return (
    <ArtShell kind="freight" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="120" width="130" height="70" rx="6" className="fdm-uc-fill-soft" />
      <circle cx="100" cy="200" r="14" className="fdm-uc-fill-ink" />
      <circle cx="170" cy="200" r="14" className="fdm-uc-fill-ink" />
      <rect x="90" y="135" width="50" height="30" rx="2" className="fdm-uc-fill-ink-soft" />
      <path d="M210 155 H270" className="fdm-uc-flow" fill="none" />
      <rect x="270" y="70" width="120" height="150" rx="8" className="fdm-uc-fill-soft" />
      <path d="M290 110 H370 M290 130 H350 M290 150 H360" className="fdm-uc-rule" />
      <circle cx="420" cy="140" r="34" className="fdm-uc-core" />
      <circle cx="420" cy="140" r="7" className="fdm-uc-dot" />
      <path d="M454 120 H510" className="fdm-uc-flow" fill="none" />
      <path d="M454 160 C490 200, 520 215, 555 225" className="fdm-uc-flow-dash" fill="none" />
      <rect x="510" y="95" width="80" height="44" rx="6" className="fdm-uc-fill-accent" />
      <path d="M528 117 L540 129 L570 101" className="fdm-uc-mark" fill="none" />
      <circle cx="575" cy="235" r="10" className="fdm-uc-fill-ink" />
      <path d="M553 265 C553 247, 597 247, 597 265 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function ExpenseHero() {
  return (
    <ArtShell kind="expense" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="90" width="130" height="80" rx="8" className="fdm-uc-fill-soft" />
      <path d="M90 120 H180 M90 140 H160" className="fdm-uc-rule" />
      <rect x="100" y="185" width="70" height="40" rx="4" className="fdm-uc-tile-missing" />
      <path d="M115 205 H155" className="fdm-uc-mark" fill="none" />
      <path d="M210 130 H270" className="fdm-uc-flow" fill="none" />
      <circle cx="320" cy="140" r="40" className="fdm-uc-core" />
      <circle cx="320" cy="140" r="9" className="fdm-uc-dot" />
      <path d="M360 110 H440" className="fdm-uc-flow" fill="none" />
      <path d="M360 170 C410 210, 470 220, 520 230" className="fdm-uc-flow-dash" fill="none" />
      <rect x="440" y="85" width="90" height="44" rx="6" className="fdm-uc-fill-accent" />
      <path d="M460 107 L475 119 L508 91" className="fdm-uc-mark" fill="none" />
      <circle cx="545" cy="240" r="11" className="fdm-uc-fill-ink" />
      <path d="M523 272 C523 254, 567 254, 567 272 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function RfpHero() {
  return (
    <ArtShell kind="rfp" size="hero" viewBox="0 0 640 280">
      <rect x="55" y="75" width="70" height="90" rx="4" className="fdm-uc-fill-soft" transform="rotate(-5 90 120)" />
      <rect x="95" y="90" width="70" height="90" rx="4" className="fdm-uc-fill-soft" transform="rotate(3 130 135)" />
      <path d="M175 130 H235" className="fdm-uc-flow" fill="none" />
      <rect x="235" y="55" width="170" height="180" rx="8" className="fdm-uc-fill-soft" />
      <rect x="235" y="55" width="170" height="28" rx="8" className="fdm-uc-fill-ink-soft" />
      <rect x="255" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="325" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="255" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-missing" />
      <rect x="325" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <path d="M270 185 H295" className="fdm-uc-mark" fill="none" />
      <path d="M420 140 C470 100, 520 120, 510 180" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="510" cy="120" r="5" className="fdm-uc-dot" />
      <circle cx="555" cy="70" r="12" className="fdm-uc-fill-ink" />
      <path d="M531 110 C531 88, 579 88, 579 110 Z" className="fdm-uc-fill-ink" />
      <rect x="500" y="195" width="80" height="40" rx="4" className="fdm-uc-fill-accent" />
      <path d="M518 215 L530 225 L560 200" className="fdm-uc-mark" fill="none" />
    </ArtShell>
  );
}

function TimesheetHero() {
  return (
    <ArtShell kind="timesheet" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="65" width="150" height="160" rx="8" className="fdm-uc-fill-soft" />
      <path d="M95 105 H195 M95 130 H180 M95 155 H170 M95 180 H160" className="fdm-uc-rule" />
      <path d="M230 145 H290" className="fdm-uc-flow" fill="none" />
      <circle cx="340" cy="145" r="40" className="fdm-uc-core" />
      <circle cx="340" cy="145" r="9" className="fdm-uc-dot" />
      <path d="M380 110 H460" className="fdm-uc-flow-soft" fill="none" />
      <path d="M380 145 H460" className="fdm-uc-flow" fill="none" />
      <path d="M380 180 C430 220, 490 230, 540 235" className="fdm-uc-flow-dash" fill="none" />
      <rect x="460" y="90" width="70" height="36" rx="4" className="fdm-uc-fill-soft" />
      <path d="M470 108 H520" className="fdm-uc-rule" />
      <circle cx="500" cy="160" r="22" className="fdm-uc-fill-accent" />
      <path d="M500 146 V160 L510 166" className="fdm-uc-mark" fill="none" />
      <circle cx="560" cy="245" r="10" className="fdm-uc-fill-ink" />
      <path d="M538 275 C538 257, 582 257, 582 275 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function PriorauthHero() {
  return (
    <ArtShell kind="priorauth" size="hero" viewBox="0 0 640 280">
      <rect x="60" y="70" width="70" height="90" rx="4" className="fdm-uc-fill-soft" transform="rotate(-6 95 115)" />
      <rect x="100" y="90" width="70" height="90" rx="4" className="fdm-uc-fill-soft" transform="rotate(4 135 135)" />
      <path d="M180 130 H240" className="fdm-uc-flow" fill="none" />
      <rect x="240" y="55" width="170" height="180" rx="8" className="fdm-uc-fill-soft" />
      <rect x="240" y="55" width="170" height="28" rx="8" className="fdm-uc-fill-ink-soft" />
      <rect x="260" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="330" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="260" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="330" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-missing" />
      <path d="M345 185 H370" className="fdm-uc-mark" fill="none" />
      <path d="M420 185 C480 140, 540 170, 520 230" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="520" cy="160" r="5" className="fdm-uc-dot" />
      <circle cx="560" cy="70" r="12" className="fdm-uc-fill-ink" />
      <path d="M536 110 C536 88, 584 88, 584 110 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function DeductionHero() {
  return (
    <ArtShell kind="deduction" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="100" width="90" height="110" rx="6" className="fdm-uc-fill-soft" />
      <path d="M90 130 H140 M90 150 H130" className="fdm-uc-rule" />
      <rect x="190" y="70" width="90" height="160" rx="6" className="fdm-uc-fill-accent" />
      <path d="M210 110 H260 M210 140 H250 M210 170 H255" className="fdm-uc-rule" />
      <rect x="310" y="110" width="90" height="90" rx="6" className="fdm-uc-fill-soft" />
      <path d="M160 155 H190 M280 155 H310" className="fdm-uc-flow-dash" fill="none" />
      <circle cx="450" cy="140" r="34" className="fdm-uc-core" />
      <circle cx="450" cy="140" r="7" className="fdm-uc-dot" />
      <path d="M484 120 H540" className="fdm-uc-flow" fill="none" />
      <path d="M484 160 C510 200, 530 210, 560 220" className="fdm-uc-flow-dash" fill="none" />
      <rect x="540" y="95" width="70" height="40" rx="4" className="fdm-uc-fill-accent" />
      <path d="M555 115 L565 125 L595 100" className="fdm-uc-mark" fill="none" />
      <circle cx="575" cy="230" r="10" className="fdm-uc-fill-ink" />
      <path d="M553 260 C553 242, 597 242, 597 260 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function AccessHero() {
  return (
    <ArtShell kind="access" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="100" width="100" height="70" rx="6" className="fdm-uc-fill-soft" />
      <path d="M90 125 H150 M90 145 H135" className="fdm-uc-rule" />
      <circle cx="120" cy="70" r="16" className="fdm-uc-fill-ink" />
      <path d="M96 110 C96 90, 144 90, 144 110 Z" className="fdm-uc-fill-ink" />
      <path d="M180 135 H250" className="fdm-uc-flow" fill="none" />
      <rect x="250" y="80" width="130" height="130" rx="8" className="fdm-uc-core" />
      <circle cx="315" cy="145" r="10" className="fdm-uc-dot" />
      <path d="M390 110 H460" className="fdm-uc-flow-soft" fill="none" />
      <path d="M390 145 H460" className="fdm-uc-flow" fill="none" />
      <path d="M390 180 C440 220, 500 230, 545 235" className="fdm-uc-flow-dash" fill="none" />
      <rect x="460" y="90" width="80" height="40" rx="4" className="fdm-uc-fill-accent" />
      <path d="M478 110 L490 120 L520 98" className="fdm-uc-mark" fill="none" />
      <circle cx="500" cy="165" r="12" className="fdm-uc-fill-ink" />
      <path d="M478 200 C478 180, 522 180, 522 200 Z" className="fdm-uc-fill-ink" />
      <circle cx="565" cy="245" r="10" className="fdm-uc-fill-ink" />
      <path d="M543 275 C543 257, 587 257, 587 275 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function BankrecHero() {
  return (
    <ArtShell kind="bankrec" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="70" width="120" height="150" rx="8" className="fdm-uc-fill-soft" />
      <path d="M90 110 H170 M90 130 H155 M90 150 H165" className="fdm-uc-rule" />
      <rect x="240" y="70" width="120" height="150" rx="8" className="fdm-uc-fill-soft" />
      <path d="M260 110 H340 M260 130 H325 M260 150 H335" className="fdm-uc-rule" />
      <path d="M190 145 H240" className="fdm-uc-flow" fill="none" />
      <circle cx="420" cy="140" r="36" className="fdm-uc-core" />
      <circle cx="420" cy="140" r="8" className="fdm-uc-dot" />
      <path d="M456 120 H510" className="fdm-uc-flow" fill="none" />
      <path d="M456 160 C490 200, 520 215, 555 225" className="fdm-uc-flow-dash" fill="none" />
      <rect x="510" y="95" width="80" height="44" rx="6" className="fdm-uc-fill-accent" />
      <path d="M528 117 L540 129 L570 101" className="fdm-uc-mark" fill="none" />
      <circle cx="575" cy="235" r="10" className="fdm-uc-fill-ink" />
      <path d="M553 265 C553 247, 597 247, 597 265 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function LeaseHero() {
  return (
    <ArtShell kind="lease" size="hero" viewBox="0 0 640 280">
      <rect x="70" y="70" width="120" height="150" rx="8" className="fdm-uc-fill-soft" />
      <path d="M90 110 H170 M90 130 H155 M90 150 H160" className="fdm-uc-rule" />
      <circle cx="200" cy="80" r="36" className="fdm-uc-fill-soft" />
      <circle cx="200" cy="80" r="36" className="fdm-uc-ring" fill="none" />
      <path d="M200 80 V52" className="fdm-uc-mark" fill="none" strokeWidth="3" />
      <path d="M200 80 L222 92" className="fdm-uc-mark" fill="none" strokeWidth="2.5" />
      <path
        d="M230 60 A36 36 0 0 1 228 104"
        className="fdm-uc-accent-arc"
        fill="none"
      />
      <path d="M240 140 H300" className="fdm-uc-flow" fill="none" />
      <circle cx="350" cy="140" r="38" className="fdm-uc-core" />
      <circle cx="350" cy="140" r="8" className="fdm-uc-dot" />
      <path d="M388 120 H460" className="fdm-uc-flow" fill="none" />
      <path d="M388 160 C430 205, 490 220, 540 230" className="fdm-uc-flow-dash" fill="none" />
      <rect x="460" y="95" width="100" height="50" rx="6" className="fdm-uc-fill-soft" />
      <path d="M480 120 H540 M480 135 H520" className="fdm-uc-rule" />
      <circle cx="560" cy="240" r="11" className="fdm-uc-fill-ink" />
      <path d="M538 272 C538 254, 582 254, 582 272 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}

function AuditHero() {
  return (
    <ArtShell kind="audit" size="hero" viewBox="0 0 640 280">
      <rect x="60" y="80" width="90" height="70" rx="6" className="fdm-uc-fill-soft" />
      <path d="M78 105 H130 M78 125 H115" className="fdm-uc-rule" />
      <rect x="70" y="165" width="70" height="50" rx="4" className="fdm-uc-fill-soft" />
      <path d="M160 115 H220" className="fdm-uc-flow" fill="none" />
      <rect x="220" y="55" width="170" height="180" rx="8" className="fdm-uc-fill-soft" />
      <rect x="220" y="55" width="170" height="28" rx="8" className="fdm-uc-fill-ink-soft" />
      <rect x="240" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="310" y="110" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <rect x="240" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-missing" />
      <rect x="310" y="165" width="55" height="40" rx="3" className="fdm-uc-tile-ok" />
      <path d="M255 185 H280" className="fdm-uc-mark" fill="none" />
      <path d="M400 145 H460" className="fdm-uc-flow" fill="none" />
      <path d="M400 185 C450 220, 500 230, 540 235" className="fdm-uc-flow-dash" fill="none" />
      <rect x="460" y="120" width="90" height="44" rx="6" className="fdm-uc-fill-accent" />
      <path d="M480 142 L495 154 L528 126" className="fdm-uc-mark" fill="none" />
      <circle cx="560" cy="245" r="10" className="fdm-uc-fill-ink" />
      <path d="M538 275 C538 257, 582 257, 582 275 Z" className="fdm-uc-fill-ink" />
    </ArtShell>
  );
}


export function UseCaseArt({
  kind,
  size = "hero",
}: {
  kind: Kind;
  size?: Size;
}) {
  if (size === "thumb") {
    switch (kind) {
      case "inbox":
        return <InboxThumb />;
      case "detention":
        return <DetentionThumb />;
      case "claims":
        return <ClaimsThumb />;
      case "collections":
        return <CollectionsThumb />;
      case "ap":
        return <ApThumb />;
      case "customs":
        return <CustomsThumb />;
      case "workorder":
        return <WorkorderThumb />;
      case "recon":
        return <ReconThumb />;
      case "coi":
        return <CoiThumb />;
      case "vendorkyc":
        return <VendorkycThumb />;
      case "freight":
        return <FreightThumb />;
      case "expense":
        return <ExpenseThumb />;
      case "rfp":
        return <RfpThumb />;
      case "timesheet":
        return <TimesheetThumb />;
      case "priorauth":
        return <PriorauthThumb />;
      case "deduction":
        return <DeductionThumb />;
      case "access":
        return <AccessThumb />;
      case "bankrec":
        return <BankrecThumb />;
      case "lease":
        return <LeaseThumb />;
      case "audit":
        return <AuditThumb />;
    }
  }

  switch (kind) {
    case "inbox":
      return <InboxHero />;
    case "detention":
      return <DetentionHero />;
    case "claims":
      return <ClaimsHero />;
    case "collections":
      return <CollectionsHero />;
    case "ap":
      return <ApHero />;
    case "customs":
      return <CustomsHero />;
    case "workorder":
      return <WorkorderHero />;
    case "recon":
      return <ReconHero />;
    case "coi":
      return <CoiHero />;
    case "vendorkyc":
      return <VendorkycHero />;
    case "freight":
      return <FreightHero />;
    case "expense":
      return <ExpenseHero />;
    case "rfp":
      return <RfpHero />;
    case "timesheet":
      return <TimesheetHero />;
    case "priorauth":
      return <PriorauthHero />;
    case "deduction":
      return <DeductionHero />;
    case "access":
      return <AccessHero />;
    case "bankrec":
      return <BankrecHero />;
    case "lease":
      return <LeaseHero />;
    case "audit":
      return <AuditHero />;
  }
}
