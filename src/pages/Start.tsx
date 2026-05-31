/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVisitorCount } from "../userVisitorCount";

// ── Fonts: add to your index.html <head> ──────────────────────────────────────
// <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet" />

const TICKER_ITEMS = [
  "Web Development", "·", "UI / UX Design", "·", "React", "·",
  "Information Technology", "·", "Mater Dei College", "·", "Cduken", "·",
  "Web Development", "·", "UI / UX Design", "·", "React", "·",
  "Information Technology", "·", "Mater Dei College", "·", "Cduken", "·",
];

// ── Noise canvas ───────────────────────────────────────────────────────────────
function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let lastTime = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw(now: number) {
      raf = requestAnimationFrame(draw);
      if (now - lastTime < 120) return; // ~8fps for grain
      lastTime = now;
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      if (!w || !h) return;
      const id = ctx.createImageData(w, h);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(id, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.04,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
const Start = () => {
  const navigate = useNavigate();
  const { count, isLoading } = useVisitorCount();
  const year = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    // Tiny delay so CSS animations start after first paint
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // ── Inline styles (no extra CSS file needed) ─────────────────────────────
  const s = {
    stage: {
      position: "relative" as const,
      width: "100%",
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      padding: "48px 52px 40px",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    } as React.CSSProperties,

    scanLines: {
      position: "absolute" as const,
      inset: 0,
      background: `repeating-linear-gradient(
        180deg,
        transparent,
        transparent 2px,
        rgba(255,255,255,0.012) 2px,
        rgba(255,255,255,0.012) 4px
      )`,
      pointerEvents: "none" as const,
      zIndex: 10,
    } as React.CSSProperties,

    redLine: {
      position: "absolute" as const,
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: "#ff2d2d",
      zIndex: 5,
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.4s 0.1s",
    } as React.CSSProperties,

    metaBar: {
      position: "absolute" as const,
      top: 28,
      left: 52,
      right: 52,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.18em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.25)",
      zIndex: 6,
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.6s 0.2s",
    } as React.CSSProperties,

    statusDot: {
      display: "inline-block",
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "#c8ff00",
      marginRight: 6,
      verticalAlign: "middle",
      animation: "pulseDot 2s infinite",
    } as React.CSSProperties,

    indexNum: {
      position: "absolute" as const,
      right: -12,
      bottom: -20,
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 220,
      color: "rgba(255,255,255,0.03)",
      lineHeight: 1,
      pointerEvents: "none" as const,
      userSelect: "none" as const,
      zIndex: 0,
    } as React.CSSProperties,

    eyebrow: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.45em",
      textTransform: "uppercase" as const,
      color: "#c8ff00",
      marginBottom: 16,
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s 0.2s, transform 0.6s 0.2s",
    } as React.CSSProperties,

    bigName: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(88px, 16vw, 148px)",
      lineHeight: 0.88,
      color: "#f2ede6",
      letterSpacing: "-0.01em",
      position: "relative" as const,
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.7s 0.4s, transform 0.7s 0.4s",
    } as React.CSSProperties,

    subRow: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 8,
      fontFamily: "'Space Mono', monospace",
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.35)",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s 0.65s, transform 0.6s 0.65s",
    } as React.CSSProperties,

    divider: {
      width: "100%",
      height: 1,
      background: "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 100%)",
      margin: "32px 0",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left",
      transition: "opacity 0.8s 0.85s, transform 0.8s 0.85s",
    } as React.CSSProperties,

    bottomRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s 1.0s, transform 0.6s 1.0s",
    } as React.CSSProperties,

    tagline: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 300,
      fontSize: 13,
      color: "rgba(255,255,255,0.35)",
      lineHeight: 1.75,
      maxWidth: 280,
    } as React.CSSProperties,

    taglineEm: {
      fontStyle: "normal",
      color: "rgba(255,255,255,0.7)",
    } as React.CSSProperties,

    ctaBtn: {
      display: "flex",
      alignItems: "center",
      gap: 0,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
    } as React.CSSProperties,

    ctaPill: {
      background: btnHovered ? "#0a0a0a" : "#c8ff00",
      color: btnHovered ? "#c8ff00" : "#0a0a0a",
      padding: "14px 28px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "'Space Mono', monospace",
      fontSize: 10,
      letterSpacing: "0.22em",
      fontWeight: 700,
      textTransform: "uppercase" as const,
      border: "1px solid #c8ff00",
      transition: "background 0.3s, color 0.3s",
      position: "relative" as const,
      overflow: "hidden" as const,
    } as React.CSSProperties,

    ctaArrow: {
      fontSize: 14,
      transition: "transform 0.3s",
      transform: btnHovered ? "translateX(4px)" : "translateX(0)",
    } as React.CSSProperties,

    vertLabel: {
      position: "absolute" as const,
      right: 28,
      top: "50%",
      transform: "translateY(-50%) rotate(90deg)",
      transformOrigin: "center",
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.35em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.12)",
      whiteSpace: "nowrap" as const,
      opacity: mounted ? 1 : 0,
      transition: "opacity 1s 1.4s",
      zIndex: 4,
    } as React.CSSProperties,

    footerStrip: {
      position: "absolute" as const,
      bottom: 24,
      left: 52,
      right: 52,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.6s 1.3s",
      zIndex: 6,
    } as React.CSSProperties,

    footerMono: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.25em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.15)",
    } as React.CSSProperties,

    visitorRow: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.2em",
      color: "rgba(255,255,255,0.2)",
    } as React.CSSProperties,

    visitorDot: {
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: "rgba(200,255,0,0.5)",
      display: "inline-block",
      animation: "pulseDot 2s infinite",
    } as React.CSSProperties,

    tickerWrap: {
      position: "absolute" as const,
      bottom: 64,
      left: 0,
      right: 0,
      overflow: "hidden",
      height: 24,
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.6s 1.5s",
      maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      zIndex: 4,
    } as React.CSSProperties,

    tickerInner: {
      display: "flex",
      animation: "tickerScroll 24s linear infinite",
      whiteSpace: "nowrap" as const,
      width: "max-content",
    } as React.CSSProperties,
  };

  // ── Corners ────────────────────────────────────────────────────────────────
  const cornerBase: React.CSSProperties = {
    position: "absolute",
    width: 18,
    height: 18,
    borderColor: "rgba(255,255,255,0.18)",
    borderStyle: "solid",
    zIndex: 6,
    opacity: mounted ? 1 : 0,
    transition: "opacity 0.6s 0.3s",
  };

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes glitch1 {
          0%,89%,100% { transform:translate(0); opacity:0; }
          90% { transform:translate(-3px,1px); opacity:0.8; }
          92% { transform:translate(3px,-1px); opacity:0.8; }
          94% { transform:translate(0); opacity:0; }
          96% { transform:translate(-2px); opacity:0.6; }
          98% { transform:translate(0); opacity:0; }
        }
        @keyframes glitch2 {
          0%,91%,100% { transform:translate(0); opacity:0; }
          92% { transform:translate(4px,2px); opacity:0.7; }
          94% { transform:translate(-4px); opacity:0.7; }
          96% { transform:translate(0); opacity:0; }
          98% { transform:translate(2px,-1px); opacity:0.5; }
          99% { transform:translate(0); opacity:0; }
        }
        .glitch-name::before,
        .glitch-name::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: inherit;
          line-height: inherit;
          letter-spacing: inherit;
          width: 100%;
          overflow: hidden;
        }
        .glitch-name::before {
          color: #ff2d2d;
          animation: glitch1 4s infinite;
          clip-path: polygon(0 20%, 100% 20%, 100% 45%, 0 45%);
        }
        .glitch-name::after {
          color: #c8ff00;
          animation: glitch2 4s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
        }
      `}</style>

      <div style={s.stage}>
        {/* Noise grain */}
        <NoiseCanvas />

        {/* Scan lines overlay */}
        <div style={s.scanLines} aria-hidden="true" />

        {/* Red left accent */}
        <div style={s.redLine} aria-hidden="true" />

        {/* Corners */}
        <div style={{ ...cornerBase, top: 20, left: 20, borderWidth: "1px 0 0 1px" }} aria-hidden="true" />
        <div style={{ ...cornerBase, top: 20, right: 20, borderWidth: "1px 1px 0 0" }} aria-hidden="true" />
        <div style={{ ...cornerBase, bottom: 20, left: 20, borderWidth: "0 0 1px 1px" }} aria-hidden="true" />
        <div style={{ ...cornerBase, bottom: 20, right: 20, borderWidth: "0 1px 1px 0" }} aria-hidden="true" />

        {/* Top meta bar */}
        <div style={s.metaBar}>
          <div>
            <span style={s.statusDot} />
            Available for work
          </div>
          <div>Portfolio — {year}</div>
          <div>MDC · BSIT</div>
        </div>

        {/* Decorative large index */}
        <div style={s.indexNum} aria-hidden="true">01</div>

        {/* ── Main content ── */}
        <div style={{ position: "relative", zIndex: 3 }}>
          <div style={s.eyebrow}>— Cduken presents</div>

          {/* Glitch title */}
          <div
            className="glitch-name"
            data-text="Hello."
            style={s.bigName}
            aria-label="Hello."
          >
            Hello.
          </div>

          {/* Role row */}
          <div style={s.subRow}>
            <span>Web Developer</span>
            <span style={{ color: "rgba(255,255,255,0.18)" }}>/</span>
            <span>IT Student</span>
            <span style={{ color: "rgba(255,255,255,0.18)" }}>/</span>
            <span>Mater Dei College</span>
          </div>
        </div>

        {/* Divider */}
        <div style={s.divider} aria-hidden="true" />

        {/* Bottom row */}
        <div style={s.bottomRow}>
          <p style={s.tagline}>
            Building <em style={s.taglineEm}>deliberate</em> digital experiences
            with an obsessive attention to detail and craft.
          </p>

          <button
            style={s.ctaBtn}
            onClick={() => navigate("/portfolio")}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            aria-label="Enter portfolio"
          >
            <div style={s.ctaPill}>
              <span>Enter Portfolio</span>
              <span style={s.ctaArrow}>→</span>
            </div>
          </button>
        </div>

        {/* Vertical side label */}
        <div style={s.vertLabel} aria-hidden="true">Scroll to explore ·</div>

        {/* Scrolling ticker */}
        <div style={s.tickerWrap} aria-hidden="true">
          <div style={s.tickerInner}>
            {TICKER_ITEMS.map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 8,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  padding: "0 36px",
                  color: item === "·" ? "rgba(200,255,0,0.3)" : "rgba(255,255,255,0.1)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Footer strip */}
        <div style={s.footerStrip}>
          <span style={s.footerMono}>Based in Bohol, PH</span>
          <div style={s.visitorRow}>
            <span style={s.visitorDot} />
            {!isLoading && count !== undefined
              ? `${count.toLocaleString()} visitors`
              : "Live portfolio"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;