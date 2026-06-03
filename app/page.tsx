import { BackgroundVideo } from "./components/BackgroundVideo";
import { TestTubeIntro } from "./components/TestTubeIntro";

const navItems = [
  { href: "#transformations", label: "Transformations" },
  { href: "#use-cases", label: "Buyouts" },
];

export default function Home() {
  return (
    <main className="stage" aria-label="Antidote">
      <h1 className="sr-only">Antidote</h1>
      <BackgroundVideo />
      <TestTubeIntro />
      <header className="top-nav" aria-label="Primary navigation">
        <a className="nav-link nav-link-left" href={navItems[0].href}>
          {navItems[0].label}
        </a>
        <p className="brand-mark" aria-label="Antidote.">
          Antid<span className="brand-o" aria-hidden="true">o</span>te.
        </p>
        <a className="nav-link nav-link-right" href={navItems[1].href}>
          {navItems[1].label}
        </a>
      </header>
      <p className="hero-copy">
        Transforming service businesses
        <br />
        to become AI-native
      </p>
      <span id="transformations" className="anchor-target" aria-hidden="true" />
      <span id="use-cases" className="anchor-target" aria-hidden="true" />
    </main>
  );
}
