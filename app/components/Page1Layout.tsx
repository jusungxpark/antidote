"use client";

import { useState } from "react";
import { AsciiSTL } from "./AsciiSTL";
import { GlitchText } from "./GlitchText";

export function Page1Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`page1${collapsed ? " page1--collapsed" : ""}`}>
      <div className="page1-left">
        <AsciiSTL />
      </div>

      <div className="page1-right">
        <div className="page1-right-main">
          <h1 className="page1-brand">
            <GlitchText text="Antid" delay={150} />
            <span className="brand-o">
              <GlitchText text="o" delay={150} />
            </span>
            <GlitchText text="te." delay={150} />
          </h1>

          <nav className="page1-nav">
            <a className="page1-nav-item" href="#transformations">
              <GlitchText text="transformation" delay={400} />
            </a>
            <a className="page1-nav-item" href="#use-cases">
              <GlitchText text="buyout" delay={500} />
            </a>
          </nav>

          <p className="page1-tagline">
            <GlitchText
              text="Transforming service businesses to become AI-native."
              delay={600}
            />
          </p>

          <div className="page1-footer-links">
            <a className="page1-footer-link" href="#about">
              <GlitchText text="About" delay={700} />
            </a>
            <a className="page1-footer-link" href="#careers">
              <GlitchText text="Careers" delay={750} />
            </a>
          </div>

          <div className="page1-footer-meta">
            <a className="page1-footer-meta-link" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <GlitchText text="LinkedIn" delay={850} />
            </a>
            <a className="page1-footer-meta-link" href="#privacy">
              <GlitchText text="Privacy" delay={900} />
            </a>
            <a className="page1-footer-meta-link" href="#terms">
              <GlitchText text="Terms" delay={950} />
            </a>
          </div>
        </div>
      </div>

      <div className="page1-topbar">
        <span className="page1-topbar-brand">
          Antid<span className="brand-o">o</span>te.
        </span>
        <button
          className="page1-toggle"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Show menu" : "Hide menu"}
        >
          <span className="toggle-icon">
            <span className="toggle-line" />
            <span className="toggle-line" />
          </span>
        </button>
      </div>
    </div>
  );
}
