"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const CDD_ORIGIN = "https://cdd.antidotetransform.com";

type CddMeasure = { body: number; chrome: number };

function stripScripts(html: string) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function absolutizeCddUrls(html: string) {
  return html
    .replace(/(\s(?:src|href|srcset)=")\/(?!\/)/gi, `$1${CDD_ORIGIN}/`)
    .replace(/(\s(?:src|href|srcset)=')\/(?!\/)/gi, `$1${CDD_ORIGIN}/`);
}

function measureDocument(html: string, width: number): Promise<CddMeasure> {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    iframe.style.cssText = [
      "position:absolute",
      "left:-12000px",
      "top:0",
      `width:${Math.max(320, Math.round(width))}px`,
      "height:800px",
      "opacity:0",
      "pointer-events:none",
      "border:0",
    ].join(";");

    const prepared = absolutizeCddUrls(stripScripts(html)).replace(
      "</head>",
      `<style>
        html,body,.public-site{min-height:0!important;height:auto!important;overflow:visible!important}
        [style*="opacity:0"]{opacity:1!important;transform:none!important}
      </style></head>`,
    );

    let settled = false;
    const finish = (value: CddMeasure | null, err?: Error) => {
      if (settled) return;
      settled = true;
      iframe.remove();
      if (err || !value) reject(err ?? new Error("measure failed"));
      else resolve(value);
    };

    const snapshot = (): CddMeasure | null => {
      const doc = iframe.contentDocument;
      if (!doc?.body) return null;
      const header = doc.querySelector(".public-header") as HTMLElement | null;
      const site = doc.querySelector(".public-site") as HTMLElement | null;
      const main = doc.querySelector("main") as HTMLElement | null;
      if (!main) return null;
      const chrome = Math.max(
        68,
        Math.ceil((header?.getBoundingClientRect().height ?? 68) + 1),
      );
      const headerWasShown = Boolean(header) && header!.style.display !== "none";
      if (header && headerWasShown) {
        header.style.display = "none";
        void header.offsetHeight;
      }
      const body = Math.max(
        site?.scrollHeight ?? 0,
        main.scrollHeight,
        main.offsetHeight,
      );
      if (header && headerWasShown) header.style.display = "";
      return { body, chrome };
    };

    iframe.onload = () => {
      const doc = iframe.contentDocument;
      const waitForSheets = Promise.all(
        [...(doc?.querySelectorAll("link[rel='stylesheet']") ?? [])].map(
          (link) =>
            new Promise<void>((res) => {
              const el = link as HTMLLinkElement;
              if (el.sheet) {
                res();
                return;
              }
              el.addEventListener("load", () => res(), { once: true });
              el.addEventListener("error", () => res(), { once: true });
            }),
        ),
      );

      const tryRead = (attempt: number) => {
        const value = snapshot();
        if (value && value.body > 400) {
          finish(value);
          return;
        }
        if (attempt >= 20) {
          if (value && value.body > 0) finish(value);
          else finish(null, new Error("measure iframe stayed empty"));
          return;
        }
        window.setTimeout(() => tryRead(attempt + 1), 50);
      };

      waitForSheets.finally(() => {
        const fonts = doc?.fonts;
        if (fonts?.ready) {
          fonts.ready.then(() => tryRead(0)).catch(() => tryRead(0));
        } else {
          tryRead(0);
        }
      });
    };

    document.body.appendChild(iframe);
    iframe.srcdoc = prepared;
    window.setTimeout(() => {
      const value = snapshot();
      if (value && value.body > 200) finish(value);
      else finish(null, new Error("measure iframe timed out"));
    }, 4000);
  });
}

export function FdDiligenceFrame({ cddPath }: { cddPath: string }) {
  const path = cddPath.startsWith("/") ? cddPath : `/${cddPath}`;
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const lastWidthRef = useRef(0);
  const [size, setSize] = useState<CddMeasure | null>(null);

  useEffect(() => {
    let cancelled = false;
    lastWidthRef.current = 0;
    setSize(null);

    const run = async (force: boolean) => {
      const width = wrapRef.current?.clientWidth ?? window.innerWidth;
      if (!force && Math.abs(width - lastWidthRef.current) < 2) return;
      lastWidthRef.current = width;
      try {
        const res = await fetch(`${CDD_ORIGIN}${path}`, {
          mode: "cors",
          credentials: "omit",
        });
        if (!res.ok) throw new Error(`CDD fetch ${res.status}`);
        const next = await measureDocument(await res.text(), width);
        if (!cancelled && next.body > 0) setSize(next);
      } catch {
        /* Viewport-fill fallback; CSS still crops a conservative chrome height. */
      }
    };

    void run(true);

    let timer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        void run(false);
      }, 220);
    });
    if (wrapRef.current) ro.observe(wrapRef.current);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      ro.disconnect();
    };
  }, [path]);

  return (
    <div
      ref={wrapRef}
      className="fdm-cdd-embed"
      style={
        size
          ? ({
              "--fdm-cdd-body-h": `${size.body}px`,
              "--fdm-cdd-chrome": `${size.chrome}px`,
            } as CSSProperties)
          : undefined
      }
      data-sized={size ? "true" : "false"}
    >
      <iframe
        key={path}
        className="fdm-cdd-frame"
        title="Antidote Diligence"
        src={`${CDD_ORIGIN}${path}`}
        scrolling="no"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
