import {
  CASE_STUDIES,
  formatCaseStudyMeta,
  type CaseStudy,
} from "../../components/case-studies-data";

/** Top three on antidotetransform.com → Strategy */
export const STRATEGY_CASES: CaseStudy[] = CASE_STUDIES.slice(0, 3);

/** Bottom three on antidotetransform.com → Transformation */
export const TRANSFORMATION_CASES: CaseStudy[] = CASE_STUDIES.slice(3, 6);

export function caseMetaLine(study: CaseStudy): string {
  return formatCaseStudyMeta(study.meta);
}

export function caseSummary(study: CaseStudy): string {
  const text = study.result || study.problem;
  const cut = text.slice(0, 140);
  return cut.length < text.length ? `${cut.trim()}…` : text;
}
