/** Case study detail UI is rendered full-screen by SceneShell on this route. */
import { CASE_STUDIES } from "../../components/case-studies-data";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export default function CaseStudyDetailPage() {
  return <></>;
}
