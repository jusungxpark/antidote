"use client";

import { useEffect, useRef } from "react";

export function TestTubeIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const svg = svgRef.current;
    if (!overlay || !svg) return;

    let cancelled = false;
    let tickerFn: ((t: number, d: number) => void) | null = null;
    let tl: { kill: () => void } | null = null;
    let floatBrandEl: HTMLElement | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any = null;

    import("gsap").then((mod) => {
      if (cancelled) return;
      gsap = mod.default;
      init(gsap);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function init(gsap: any) {
      const svgEl = svg!;
      const overlayEl = overlay!;
      const RAD = Math.PI / 180;
      const COL = "#FFEEE1";

      const CX = 500, CY = 540;
      const INNER_R = 542, INNER_TOP = 426;
      const LIP_X = 566, LIP_Y = 420;

      /* ── Floating brand text (z-index above ripple canvas) ── */
      const fb = document.createElement("p");
      fb.appendChild(document.createTextNode("Antid"));
      const oSpan = document.createElement("span");
      oSpan.style.fontStyle = "italic";
      oSpan.textContent = "o";
      fb.appendChild(oSpan);
      fb.appendChild(document.createTextNode("te."));
      fb.style.cssText =
        "position:fixed;z-index:10002;margin:0;" +
        "color:rgba(255,248,240,0.9);" +
        "font:400 clamp(18px,2vw,27px)/1 Georgia,'Times New Roman',serif;" +
        "white-space:nowrap;pointer-events:none;";
      document.body.appendChild(fb);
      floatBrandEl = fb;

      /* Measure target: the real .brand-mark position in the nav */
      const realBrand = document.querySelector(".brand-mark") as HTMLElement | null;
      let targetX = window.innerWidth / 2;
      let targetY = 40;
      if (realBrand) {
        const r = realBrand.getBoundingClientRect();
        targetX = r.left + r.width / 2;
        targetY = r.top + r.height / 2;
      }

      gsap.set(fb, {
        left: window.innerWidth / 2,
        top: window.innerHeight * 0.33,
        xPercent: -50,
        yPercent: -50,
        scale: 2.18,
        opacity: 0,
      });

      /* ── Water simulation ── */
      const W = { a: 0, v: 0, surfY: 508 };
      const SK = 24, SD = 4.2;

      /* ── Spill state ── */
      let spillState = "idle";
      let spillVol = 0;
      let flowSmooth = 0;
      let pendHang = 0;
      let pendVel = 0;

      let spillEl: SVGPathElement | null = null;
      let rivuletEl: SVGPathElement | null = null;
      let fallObj: {
        el: SVGPathElement;
        x: number; y: number;
        vx: number; vy: number;
        r: number;
      } | null = null;

      /* ── Helpers ── */
      let curCr = 1, curSr = 0;

      function toWorld(lx: number, ly: number) {
        const ox = lx - CX, oy = ly - CY;
        return [CX + ox * curCr - oy * curSr, CY + ox * curSr + oy * curCr];
      }
      function p(v: number) { return v.toFixed(1); }

      /* ── Pendant path ── */
      function pendantPath(tx: number, ty: number, r: number, hang: number) {
        const k = 0.5523;
        const bDrop = hang * r * 3;
        const bR = r * (1 + hang * 0.2);
        const nPinch = 1 - hang * 0.88;
        const nW = bR * nPinch;
        const bcy = ty + bDrop;
        const topY = ty - r * (1 - hang);

        return "M" + p(tx) + "," + p(topY) +
          "C" + p(tx + nW * k) + "," + p(topY) + " " +
                p(tx + bR) + "," + p(bcy - bR * k) + " " +
                p(tx + bR) + "," + p(bcy) +
          "C" + p(tx + bR) + "," + p(bcy + bR * k) + " " +
                p(tx + bR * k) + "," + p(bcy + bR) + " " +
                p(tx) + "," + p(bcy + bR) +
          "C" + p(tx - bR * k) + "," + p(bcy + bR) + " " +
                p(tx - bR) + "," + p(bcy + bR * k) + " " +
                p(tx - bR) + "," + p(bcy) +
          "C" + p(tx - bR) + "," + p(bcy - bR * k) + " " +
                p(tx - nW * k) + "," + p(topY) + " " +
                p(tx) + "," + p(topY) + "Z";
      }

      /* ── Falling teardrop ── */
      function dropPath(cx: number, cy: number, r: number, morph: number) {
        const k = 0.5523;
        const tailLen = 1 + morph * 1.5;
        const tailPinch = Math.max(0.05, 1 - morph * 0.85);
        const bodyBulge = 1 + morph * 0.15;
        const w = r * (1 + morph * 0.08);
        const top = cy - r * tailLen;
        const bot = cy + r * bodyBulge;

        return "M" + p(cx) + "," + p(top) +
          "C" + p(cx + w * k * tailPinch) + "," + p(top) + " " +
                p(cx + w) + "," + p(cy - r * k) + " " +
                p(cx + w) + "," + p(cy) +
          "C" + p(cx + w) + "," + p(cy + r * k * bodyBulge) + " " +
                p(cx + w * k * bodyBulge) + "," + p(bot) + " " +
                p(cx) + "," + p(bot) +
          "C" + p(cx - w * k * bodyBulge) + "," + p(bot) + " " +
                p(cx - w) + "," + p(cy + r * k * bodyBulge) + " " +
                p(cx - w) + "," + p(cy) +
          "C" + p(cx - w) + "," + p(cy - r * k) + " " +
                p(cx - w * k * tailPinch) + "," + p(top) + " " +
                p(cx) + "," + p(top) + "Z";
      }

      /* ── Render water ── */
      function renderWater() {
        const a = W.a * RAD;
        const ca = Math.cos(a), sa = Math.sin(a);
        const now = performance.now() / 1000;
        const wAmp = 0.4 + Math.min(Math.abs(W.v) * 0.04, 3.0);

        const N = 24, span = 400;
        const pts: number[][] = [];
        for (let i = 0; i <= N; i++) {
          const t = -span + 2 * span * i / N;
          const f = i / N;
          const wave = wAmp * (
            0.5 * Math.sin(f * 15.7 + now * 4) +
            0.35 * Math.sin(f * 25.1 - now * 5.5 + 1.8) +
            0.15 * Math.sin(f * 9.4 + now * 2.3 + 3.5)
          );
          pts.push([CX + ca * t - sa * wave, W.surfY + sa * t + ca * wave]);
        }

        const dp = 700, L = pts[N], F = pts[0];
        let d = "M" + F[0].toFixed(1) + " " + F[1].toFixed(1);
        for (let j = 1; j <= N; j++)
          d += "L" + pts[j][0].toFixed(1) + " " + pts[j][1].toFixed(1);
        d += "L" + (L[0] - sa * dp).toFixed(1) + " " + (L[1] + ca * dp).toFixed(1);
        d += "L" + (F[0] - sa * dp).toFixed(1) + " " + (F[1] + ca * dp).toFixed(1) + "Z";

        const wb = svgEl.querySelector("#water-body");
        if (wb) wb.setAttribute("d", d);
      }

      /* ── Ripple Reveal ── */
      let rippleTriggered = false;

      function triggerRippleReveal(screenX: number, screenY: number) {
        if (rippleTriggered) return;
        rippleTriggered = true;

        if (fallObj?.el) fallObj.el.remove();
        fallObj = null;

        const dpr = window.devicePixelRatio || 1;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const canvas = document.createElement("canvas");
        canvas.width = vw * dpr;
        canvas.height = vh * dpr;
        canvas.style.cssText =
          "position:fixed;top:0;left:0;width:" + vw + "px;height:" + vh +
          "px;z-index:10001;pointer-events:none;";
        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr);

        ctx.fillStyle = "#070707";
        ctx.fillRect(0, 0, vw, vh);

        const svgClone = svgEl.cloneNode(true) as SVGSVGElement;
        svgClone.setAttribute("width", String(vw));
        svgClone.setAttribute("height", String(vh));
        const svgData = new XMLSerializer().serializeToString(svgClone);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = () => {
          ctx.drawImage(img, 0, 0, vw, vh);
          URL.revokeObjectURL(svgUrl);

          document.body.appendChild(canvas);
          overlayEl.style.display = "none";
          simActive = false;

          const snapshot = document.createElement("canvas");
          snapshot.width = canvas.width;
          snapshot.height = canvas.height;
          snapshot.getContext("2d")!.drawImage(canvas, 0, 0);

          const seed = Math.random() * 1000;
          const duration = 3000;

          const dx0 = screenX, dx1 = vw - screenX;
          const dy0 = screenY, dy1 = vh - screenY;
          const maxR = Math.sqrt(Math.max(
            dx0 * dx0 + dy0 * dy0,
            dx0 * dx0 + dy1 * dy1,
            dx1 * dx1 + dy0 * dy0,
            dx1 * dx1 + dy1 * dy1
          )) * 1.3;

          /* Pre-generate foam particles */
          const fragments: {
            x: number; y: number; r: number;
            dist: number; triggerDist: number; alpha: number;
          }[] = [];
          for (let i = 0; i < 500; i++) {
            let r = 2 + Math.random() * Math.random() * 16;
            const trigDist = 50 + Math.random() * 200;
            if (trigDist > 150) r = Math.min(r, 7);
            if (trigDist > 200) r = Math.min(r, 4);
            const fx = Math.random() * vw, fy = Math.random() * vh;
            const fdx = fx - screenX, fdy = fy - screenY;
            fragments.push({
              x: fx, y: fy, r,
              dist: Math.sqrt(fdx * fdx + fdy * fdy),
              triggerDist: trigDist,
              alpha: 0.4 + Math.random() * 0.6,
            });
          }

          const edgeBlobs: {
            angle: number; rOff: number; r: number; alpha: number;
          }[] = [];
          for (let i = 0; i < 200; i++) {
            edgeBlobs.push({
              angle: Math.random() * Math.PI * 2,
              rOff: (Math.random() - 0.4) * 90,
              r: 5 + Math.random() * 20,
              alpha: 0.5 + Math.random() * 0.5,
            });
          }

          function edgeNoise(angle: number, time: number) {
            return Math.sin(angle * 3 + seed * 1.1) * 0.08 +
                   Math.sin(angle * 7 + seed * 2.3 + time * 0.3) * 0.06 +
                   Math.sin(angle * 11 + seed * 3.7) * 0.04 +
                   Math.sin(angle * 19 + seed * 5.1 + time * 0.15) * 0.025 +
                   Math.sin(angle * 31 + seed * 7.3) * 0.015;
          }

          const startTime = performance.now();
          let textRevealed = false;

          function animateRipple(now: number) {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 2);

            ctx.globalCompositeOperation = "source-over";
            ctx.clearRect(0, 0, vw, vh);
            ctx.drawImage(
              snapshot, 0, 0, snapshot.width, snapshot.height, 0, 0, vw, vh
            );

            ctx.globalCompositeOperation = "destination-out";

            const frontR = eased * maxR;

            /* Main erase: noisy polar circle */
            const POINTS = 200;
            ctx.globalAlpha = 1.0;
            ctx.beginPath();
            for (let i = 0; i <= POINTS; i++) {
              const angle = (i / POINTS) * Math.PI * 2;
              const noise = edgeNoise(angle, t);
              const cr = frontR * (1 + noise);
              const px = screenX + Math.cos(angle) * cr;
              const py = screenY + Math.sin(angle) * cr;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();

            /* Edge blobs */
            for (let i = 0; i < edgeBlobs.length; i++) {
              const eb = edgeBlobs[i];
              const blobR = frontR + eb.rOff;
              if (blobR < 0) continue;
              const bx = screenX + Math.cos(eb.angle) * blobR;
              const by = screenY + Math.sin(eb.angle) * blobR;
              if (bx < -30 || bx > vw + 30 || by < -30 || by > vh + 30) continue;
              ctx.globalAlpha = eb.alpha;
              ctx.beginPath();
              ctx.arc(bx, by, eb.r, 0, Math.PI * 2);
              ctx.fill();
            }

            /* Foam fragments */
            for (let i = 0; i < fragments.length; i++) {
              const ff = fragments[i];
              const ahead = ff.dist - frontR;
              if (ahead <= 0 || ahead > ff.triggerDist) continue;
              const activation = Math.pow(1 - ahead / ff.triggerDist, 2);
              ctx.globalAlpha = ff.alpha * activation;
              ctx.beginPath();
              ctx.arc(
                ff.x, ff.y,
                ff.r * Math.max(0.3, activation), 0, Math.PI * 2
              );
              ctx.fill();
            }

            ctx.globalAlpha = 1.0;

            /* Reveal text early — midway through ripple */
            if (t >= 0.4 && !textRevealed) {
              textRevealed = true;

              document.querySelector(".brand-mark")
                ?.classList.add("is-visible");

              document.querySelector(".hero-copy")
                ?.classList.add("is-visible");

              setTimeout(() => {
                document.querySelectorAll(".nav-link").forEach((el) => {
                  el.classList.add("is-visible");
                });
              }, 150);
            }

            if (t < 1) {
              requestAnimationFrame(animateRipple);
            } else {
              /* Cleanup */
              canvas.remove();
              overlayEl.remove();

              if (floatBrandEl) {
                floatBrandEl.remove();
                floatBrandEl = null;
              }
            }
          }

          requestAnimationFrame(animateRipple);
        };

        img.src = svgUrl;
      }

      /* ── Frame ticker ── */
      let simActive = true;

      tickerFn = (_: number, dt: number) => {
        if (!simActive) return;
        const dtS = Math.min(dt / 1000, 0.05);
        if (dtS <= 0) return;

        const rot = gsap.getProperty("#tube-group", "rotation") || 0;
        curCr = Math.cos(rot * RAD);
        curSr = Math.sin(rot * RAD);

        const target = -rot;
        W.v += (SK * (target - W.a) - SD * W.v) * dtS;
        W.a += W.v * dtS;

        const al = W.a * RAD;
        const sa = Math.sin(al), ca = Math.cos(al);
        const mouthDist = -sa * (INNER_R - CX) + ca * (INNER_TOP - W.surfY);
        const lip = toWorld(LIP_X, LIP_Y);

        if (spillState === "idle") {
          if (mouthDist > 0) {
            spillState = "active";
            spillVol = 0; flowSmooth = 0;
            pendHang = 0; pendVel = 0;
            spillEl = document.createElementNS(
              "http://www.w3.org/2000/svg", "path"
            ) as SVGPathElement;
            spillEl.setAttribute("fill", COL);
            svgEl.appendChild(spillEl);
            rivuletEl = document.createElementNS(
              "http://www.w3.org/2000/svg", "path"
            ) as SVGPathElement;
            rivuletEl.setAttribute("stroke", COL);
            rivuletEl.setAttribute("fill", "none");
            rivuletEl.setAttribute("stroke-linecap", "round");
            svgEl.appendChild(rivuletEl);
          }

        } else if (spillState === "active") {
          const rawFlow = Math.max(0, mouthDist) * 0.15;
          flowSmooth += (rawFlow - flowSmooth) * Math.min(1, dtS * 6);
          spillVol += flowSmooth * dtS;

          if (mouthDist > 0) {
            W.surfY += Math.min(flowSmooth * 0.5, 2.0) * dtS;
          }

          const lateralShift = curSr * 4;

          if (spillVol < 0.3) {
            const beadPos = toWorld(LIP_X, LIP_Y);
            const beadT = Math.min(spillVol / 0.25, 1);
            const beadE = beadT * beadT * (3 - 2 * beadT);
            const beadR = Math.max(0.5, beadE * 7);
            const bx = beadPos[0] + lateralShift;
            const by = beadPos[1] + beadR;
            spillEl!.setAttribute("d", pendantPath(bx, by, beadR, 0));
            rivuletEl!.setAttribute("d", "");

          } else {
            const weight = 4 + spillVol * 14;
            const tension = 2 * Math.max(0, 1 - pendHang * 1.5);
            const netForce = weight - tension;

            pendVel += netForce * dtS;
            pendVel *= Math.max(0, 1 - 1.5 * dtS);
            pendHang += pendVel * dtS;
            pendHang = Math.max(0, pendHang);

            const px = lip[0] + lateralShift;
            const py = lip[1] + 7;

            if (pendHang >= 1) {
              const bR = 7 * 1.2;
              const bDrop = 7 * 3;
              spillEl!.remove(); spillEl = null;
              if (rivuletEl) { rivuletEl.remove(); rivuletEl = null; }

              const el = document.createElementNS(
                "http://www.w3.org/2000/svg", "path"
              ) as SVGPathElement;
              el.setAttribute("fill", COL);
              svgEl.appendChild(el);

              fallObj = {
                el, x: px, y: py + bDrop,
                vx: curSr * 10,
                vy: Math.max(20, pendVel * 10),
                r: bR,
              };
              spillState = "falling";
            } else {
              spillEl!.setAttribute("d", pendantPath(px, py, 7, pendHang));
              const stemW = Math.max(0.5, 2 - pendHang * 1.5);
              rivuletEl!.setAttribute("stroke-width", String(stemW));
              rivuletEl!.setAttribute("d",
                "M" + p(lip[0]) + "," + p(lip[1]) +
                "L" + p(px) + "," + p(py));
            }
          }

        } else if (spillState === "falling") {
          if (fallObj) {
            fallObj.vy += 450 * dtS;
            fallObj.x += fallObj.vx * dtS;
            fallObj.y += fallObj.vy * dtS;

            const speed = Math.sqrt(
              fallObj.vx * fallObj.vx + fallObj.vy * fallObj.vy
            );
            const morph = Math.min(speed / 350, 0.75);
            fallObj.el.setAttribute("d",
              dropPath(fallObj.x, fallObj.y, fallObj.r, morph));

            const svgPt = svgEl.createSVGPoint();
            svgPt.x = fallObj.x;
            svgPt.y = fallObj.y;
            const screenPt = svgPt.matrixTransform(svgEl.getScreenCTM()!);
            if (screenPt.y >= window.innerHeight) {
              triggerRippleReveal(screenPt.x, window.innerHeight);
            }
          }
        }

        renderWater();
      };

      gsap.ticker.add(tickerFn);

      /* ── GSAP Timeline ── */
      const timeline = gsap.timeline({ delay: 0.3 });
      tl = timeline;

      /* Phase 1: fade in brand text + tube */
      timeline.to(fb, {
        opacity: 1, duration: 0.6, ease: "power2.out",
      }, 0);
      timeline.fromTo("#tube-group",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0
      );

      /* Phase 2: hold */
      timeline.to({}, { duration: 0 });

      /* Phase 3: brand text moves to nav position + tube tips */
      timeline.to(fb, {
        left: targetX,
        top: targetY,
        scale: 1,
        duration: 1.2,
        ease: "power2.inOut",
      });
      timeline.to("#tube-group", {
        rotation: 65,
        svgOrigin: CX + " " + CY,
        duration: 1.2, ease: "power1.in",
      }, "<");

      /* Phase 4: tube settles */
      timeline.to("#tube-group", {
        rotation: 58,
        duration: 0.55, ease: "power2.out",
      });
    }

    return () => {
      cancelled = true;
      if (gsap && tickerFn) gsap.ticker.remove(tickerFn);
      if (tl) tl.kill();
      if (floatBrandEl) {
        floatBrandEl.remove();
        floatBrandEl = null;
      }
    };
  }, []);

  return (
    <div ref={overlayRef} className="intro-overlay">
      <svg
        ref={svgRef}
        className="intro-svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
      >
        <defs>
          <clipPath id="tube-clip">
            <path d="M458 426 L458 610 A42 42 0 0 0 542 610 L542 426 Z" />
          </clipPath>
        </defs>

        <g id="tube-group" opacity="0">
          <path
            d="M450 420 L450 610 A50 50 0 0 0 550 610 L550 420"
            fill="#070707"
            stroke="#FFEEE1"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1="434" y1="420" x2="566" y2="420"
            stroke="#FFEEE1"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <g clipPath="url(#tube-clip)">
            <path id="water-body" d="" fill="#FFEEE1" />
          </g>
        </g>
      </svg>
    </div>
  );
}
