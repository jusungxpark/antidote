"use client";

import Link from "next/link";
import { CASE_STUDIES_PATH } from "./case-studies-data";
import { PeFirmLogoCarousel } from "./PeFirmLogoCarousel";

export function ForwardDeployedView() {
  return (
    <>
      <p className="pillar-intro">
        Partner with us. Most of what we know, we can teach. We bring the
        philosophy, the playbook, and the engineering to rebuild how your
        business runs – and make you the first AI-native operator in your field.
      </p>
      <p className="pillar-intro pillar-intro--last">
        We provide strategy consulting, AI and{" "}
        <a
          href="https://cdd.antidotetransform.com"
          className="pillar-inline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          commercial due diligence
        </a>
        , and AI transformation and automation for private equity firms and
        their portfolio companies.
      </p>
      <PeFirmLogoCarousel />
      <Link href={CASE_STUDIES_PATH} className="pillar-case-link pillar-case-link--bold">
        <span className="pillar-case-link-mark" aria-hidden="true">
          ↳
        </span>
        See our Case Studies
      </Link>
    </>
  );
}
