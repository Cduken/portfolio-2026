/* eslint-disable @typescript-eslint/no-unused-vars */
// Hero.tsx — Dark Editorial Redesign
// Requires: gsap, gsap/ScrollTrigger
// npm install gsap
// Fonts in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cdu from "../assets/gallery/cdu.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const [btnHover, setBtnHover] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entry timeline ──────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Name letters stagger up
      tl.from(".hero-letter", {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.035,
        delay: 0.3,
      })
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.3",
        )
        .from(metaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(bioRef.current, { y: 24, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          imgRef.current,
          { x: 60, opacity: 0, duration: 1, ease: "power3.out" },
          0.5,
        );

      // ── Scroll parallax ─────────────────────────────────────────────────
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          xPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Photo parallax up
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Left text fades as you scroll away
      gsap.to(".hero-left", {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "80% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const firstName = "Ernest";
  const lastName = "Cabarrubias";
  const fullName = firstName + " " + lastName;

  const s = {
    section: {
      position: "relative" as const,
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: "0 52px",
    },
    scanLines: {
      position: "absolute" as const,
      inset: 0,
      background: `repeating-linear-gradient(180deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.014) 4px)`,
      pointerEvents: "none" as const,
      zIndex: 5,
    },
    bgText: {
      position: "absolute" as const,
      top: "50%",
      left: "0",
      transform: "translateY(-50%)",
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(120px, 22vw, 240px)",
      color: "rgba(255,255,255,0.025)",
      whiteSpace: "nowrap" as const,
      pointerEvents: "none" as const,
      userSelect: "none" as const,
      zIndex: 0,
      letterSpacing: "0.04em",
    },
    grid: {
      position: "absolute" as const,
      inset: 0,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`,
      backgroundSize: "60px 60px",
      pointerEvents: "none" as const,
      zIndex: 0,
    },
    redLine: {
      position: "absolute" as const,
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: "#ff2d2d",
      zIndex: 6,
    },
    inner: {
      position: "relative" as const,
      zIndex: 2,
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      gap: 60,
    },
    left: {
      flex: 1,
    },
    nameWrap: {
      marginBottom: 20,
    },
    nameRow: {
      overflow: "hidden",
      lineHeight: 0.88,
    },
    letter: {
      display: "inline-block",
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(72px, 11vw, 130px)",
      color: "#f2ede6",
      lineHeight: 0.88,
    },
    letterGrad: {
      display: "inline-block",
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(50px, 7.5vw, 88px)",
      lineHeight: 0.88,
      background: "linear-gradient(135deg, #c8ff00 0%, #ff2d2d 100%)",
      WebkitBackgroundClip: "text" as const,
      WebkitTextFillColor: "transparent" as const,
      backgroundClip: "text" as const,
    },
    line: {
      height: 1,
      background:
        "linear-gradient(90deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.04) 100%)",
      maxWidth: 380,
      marginBottom: 20,
    },
    meta: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: 8,
      marginBottom: 24,
    },
    tag: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
      color: "#c8ff00",
      border: "1px solid rgba(200,255,0,0.25)",
      padding: "5px 12px",
    },
    bio: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 300,
      fontSize: 14,
      lineHeight: 1.8,
      color: "rgba(255,255,255,0.4)",
      maxWidth: 340,
      marginBottom: 36,
    },
    bioEm: {
      color: "rgba(255,255,255,0.75)",
      fontStyle: "normal",
    },
    cta: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap" as const,
    },
    btnPrimary: (hov: boolean) => ({
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
      fontWeight: 700,
      padding: "14px 28px",
      background: hov ? "#0a0a0a" : "#c8ff00",
      color: hov ? "#c8ff00" : "#0a0a0a",
      border: "1px solid #c8ff00",
      cursor: "pointer",
      transition: "all 0.25s",
    }),
    btnSecondary: (hov: boolean) => ({
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
      fontWeight: 700,
      padding: "14px 28px",
      background: "transparent",
      color: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
      border: `1px solid ${hov ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)"}`,
      cursor: "pointer",
      transition: "all 0.25s",
    }),
    right: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    imgFrame: {
      position: "relative" as const,
      width: 300,
      height: 380,
    },
    imgInner: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
    },
    imgOverlay: {
      position: "absolute" as const,
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(200,255,0,0.06) 0%, transparent 60%)",
      pointerEvents: "none" as const,
    },
    cornerTL: {
      position: "absolute" as const,
      top: -8,
      left: -8,
      width: 20,
      height: 20,
      borderTop: "2px solid #c8ff00",
      borderLeft: "2px solid #c8ff00",
    },
    cornerBR: {
      position: "absolute" as const,
      bottom: -8,
      right: -8,
      width: 20,
      height: 20,
      borderBottom: "2px solid #ff2d2d",
      borderRight: "2px solid #ff2d2d",
    },
    imgBadge: {
      position: "absolute" as const,
      bottom: -16,
      left: -20,
      background: "#0a0a0a",
      border: "1px solid rgba(255,255,255,0.1)",
      padding: "10px 16px",
      zIndex: 3,
    },
    badgeMono: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.25em",
      textTransform: "uppercase" as const,
    },
    scrollHint: {
      position: "absolute" as const,
      bottom: 36,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: 8,
      zIndex: 6,
    },
    scrollMono: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.2)",
    },
  };

  return (
    <section ref={sectionRef} id="hero" style={s.section}>
      <div style={s.scanLines} aria-hidden />
      <div style={s.grid} aria-hidden />
      <div style={s.redLine} aria-hidden />

      {/* BIG background text */}
      <div ref={bgTextRef} style={s.bgText} aria-hidden>
        ERNEST CABARRUBIAS — PORTFOLIO —
      </div>

      <div style={s.inner}>
        {/* LEFT */}
        <div className="hero-left" ref={nameRef} style={s.left}>
          <div style={s.nameWrap}>
            {/* First name */}
            <div style={s.nameRow}>
              {firstName.split("").map((l, i) => (
                <span key={i} className="hero-letter" style={s.letter}>
                  {l}
                </span>
              ))}
            </div>
            {/* Space */}
            <div style={{ height: 4 }} />
            {/* Last name */}
            <div style={s.nameRow}>
              {lastName.split("").map((l, i) => (
                <span key={i} className="hero-letter" style={s.letterGrad}>
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div ref={lineRef} style={s.line} />

          <div ref={metaRef} style={s.meta}>
            {["Frontend Developer", "IT Graduate", "Mater Dei College"].map(
              (t) => (
                <span key={t} style={s.tag}>
                  {t}
                </span>
              ),
            )}
          </div>

          <p ref={bioRef} style={s.bio}>
            Fresh IT grad who enjoys turning ideas into{" "}
            <em style={s.bioEm}>clean, interactive interfaces</em>. Growing on
            both frontend and backend — one project at a time.
          </p>

          <div ref={ctaRef} style={s.cta}>
            <button
              style={s.btnPrimary(btnHover === "work")}
              onMouseEnter={() => setBtnHover("work")}
              onMouseLeave={() => setBtnHover(null)}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work →
            </button>
            <button
              style={s.btnSecondary(btnHover === "hello")}
              onMouseEnter={() => setBtnHover("hello")}
              onMouseLeave={() => setBtnHover(null)}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Say Hello
            </button>
          </div>
        </div>

        {/* RIGHT — photo */}
        <div style={s.right} ref={imgRef}>
          <div style={s.imgFrame}>
            <div style={s.cornerTL} />
            <div style={s.cornerBR} />
            <div style={s.imgInner}>
              {!imgError ? (
                <img
                  src={Cdu}
                  alt="Ernest Cabarrubias"
                  onError={() => setImgError(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "grayscale(20%)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue'",
                      fontSize: 64,
                      color: "rgba(200,255,0,0.4)",
                    }}
                  >
                    EC
                  </span>
                </div>
              )}
              <div style={s.imgOverlay} />
            </div>
            <div style={s.imgBadge}>
              <div
                style={{
                  ...s.badgeMono,
                  color: "rgba(200,255,0,0.7)",
                  marginBottom: 2,
                }}
              >
                Bohol, PH
              </div>
              <div style={{ ...s.badgeMono, color: "rgba(255,255,255,0.25)" }}>
                Available for work
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={s.scrollHint}>
        <span style={s.scrollMono}>Scroll</span>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(200,255,0,0.5), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%,100%{transform:scaleY(0.4);transform-origin:top;opacity:0.4}
          50%{transform:scaleY(1);opacity:1}
        }
      `}</style>
    </section>
  );
};

export default Hero;
