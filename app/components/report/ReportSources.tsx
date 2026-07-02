export type SourceLink = {
  label: string;
  url: string;
};

export type SourceBlock = {
  links: SourceLink[];
  suffix?: string;
};

export function SourceCitation({
  links,
  prefix = "Source",
}: {
  links: SourceLink[];
  prefix?: string;
}) {
  if (!links.length) return null;

  const heading = links.length > 1 ? `${prefix}s` : prefix;

  return (
    <div className="src">
      {heading}:{" "}
      {links.map((link, index) => (
        <span key={`${link.url}-${link.label}`}>
          {index > 0 && " · "}
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </span>
      ))}
    </div>
  );
}

export function ChartSourceBlock({
  links,
  suffix,
  prefix = "Sources",
}: SourceBlock & { prefix?: string }) {
  if (!links.length && !suffix) return null;

  return (
    <div className="chart-source">
      {links.length > 0 && (
        <>
          {prefix}:{" "}
          {links.map((link, index) => (
            <span key={`${link.url}-${link.label}`}>
              {index > 0 && " · "}
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </span>
          ))}
        </>
      )}
      {suffix ? (
        <>
          {links.length > 0 && " "}
          {suffix}
        </>
      ) : null}
    </div>
  );
}

export function normalizeEvidenceSources(entry: {
  source?: string;
  sourceUrl?: string;
  sources?: SourceLink[];
}): SourceLink[] {
  if (entry.sources?.length) return entry.sources;
  if (entry.source && entry.sourceUrl) {
    return [{ label: entry.source, url: entry.sourceUrl }];
  }
  return [];
}
