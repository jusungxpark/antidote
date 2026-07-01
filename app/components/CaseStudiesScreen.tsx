"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CASE_STUDIES } from "./case-studies-data";
import { CaseStudyCard } from "./CaseStudyCard";
import { useScrollUpDismiss } from "./useScrollUpDismiss";
import { useScene } from "./SceneShell";

const CASE_STUDY_ENTER_ROW_MS = 150;
const CASE_STUDY_SLIDE_ENTER_LEAD_MS = 380;

function chunkCaseStudies<T>(items: T[], columns: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }
  return rows;
}

function useCaseStudyGridColumns() {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setColumns(1);
      } else if (window.matchMedia("(max-width: 960px)").matches) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}

interface CaseStudiesScreenProps {
  onBack: () => void;
  hidden?: boolean;
}

export function CaseStudiesScreen({ onBack, hidden = false }: CaseStudiesScreenProps) {
  const { caseStudyTransition, caseStudiesOpen } = useScene();
  const columns = useCaseStudyGridColumns();
  const [enterCycle, setEnterCycle] = useState(0);
  const [enterBaseDelayMs, setEnterBaseDelayMs] = useState(0);
  const prevVisibleRef = useRef(false);
  const prevCaseStudiesOpenRef = useRef(caseStudiesOpen);
  const isVisible = !hidden && caseStudiesOpen;

  const handleScrollUpDismiss = useCallback(() => {
    onBack();
  }, [onBack]);

  const scrollRef = useScrollUpDismiss(
    handleScrollUpDismiss,
    isVisible && caseStudyTransition === null
  );

  useEffect(() => {
    if (isVisible && !prevVisibleRef.current) {
      const openingViaSlide =
        caseStudiesOpen && !prevCaseStudiesOpenRef.current;
      setEnterBaseDelayMs(openingViaSlide ? CASE_STUDY_SLIDE_ENTER_LEAD_MS : 0);
      setEnterCycle((cycle) => cycle + 1);
    }
    prevVisibleRef.current = isVisible;
    prevCaseStudiesOpenRef.current = caseStudiesOpen;
  }, [isVisible, caseStudiesOpen]);

  return (
    <div
      ref={scrollRef}
      className={`case-studies-screen${hidden ? " case-studies-screen--hidden" : ""}`}
      aria-hidden={hidden}
    >
      <a
        href="/transformation"
        className="pillar-case-link pillar-case-link--back"
        onClick={(event) => {
          event.preventDefault();
          onBack();
        }}
      >
        <span className="pillar-case-link-mark" aria-hidden="true">
          ↳
        </span>
        Back
      </a>
      <h2 className="case-studies-screen-title">Case Studies</h2>
      <div key={enterCycle} className="case-study-grid case-study-grid--full is-entering">
        {chunkCaseStudies(CASE_STUDIES, columns).map((rowStudies, rowIndex) => (
          <div
            key={rowIndex}
            className="case-study-grid-row case-study-grid-row--enter"
            style={{
              ["--case-study-enter-delay" as string]: `${
                enterBaseDelayMs + rowIndex * CASE_STUDY_ENTER_ROW_MS
              }ms`,
            }}
          >
            {rowStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
