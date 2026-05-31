// About.tsx — Dark Editorial Redesign with GSAP ScrollTrigger
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiVuedotjs,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", Icon: SiHtml5, color: "#E44D26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Vue JS", Icon: SiVuedotjs, color: "#42B883" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "PHP", Icon: SiPhp, color: "#8892BF" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
];

const stats = [
  { num: "10+", label: "Projects Shipped" },
  { num: "1+", label: "Years Building" },
  { num: "3", label: "Ongoing Projects" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqRef = useRef<HTMLDivElement>(null);
  const marqRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Horizontal marquee background text ─────────────────────────────
      gsap.to(marqRef.current, {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(marqRef2.current, {
        xPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ── Section label + heading clip-up ────────────────────────────────
      gsap.from(".about-eyebrow", {
        yPercent: 100,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-eyebrow",
          start: "top 88%",
        },
      });

      gsap.from(".about-heading .split-line", {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
        },
      });

      // ── Bio paragraphs fade + slide ─────────────────────────────────────
      gsap.from(".about-bio p", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-bio",
          start: "top 82%",
        },
      });

      // ── Skill cards staggered flip-in ──────────────────────────────────
      gsap.from(".skill-card", {
        y: 40,
        opacity: 0,
        rotateX: -20,
        duration: 0.6,
        stagger: {
          each: 0.06,
          grid: [3, 3],
          from: "start",
        },
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 82%",
        },
      });

      // ── Stats counter-ish reveal ────────────────────────────────────────
      gsap.from(".stat-item", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-row",
          start: "top 86%",
        },
      });

      // ── Horizontal rule draw ────────────────────────────────────────────
      gsap.from(".about-hr", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".about-hr",
          start: "top 88%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const s = {
    section: {
      position: "relative" as const,
      background: "#0a0a0a",
      padding: "130px 52px",
      overflow: "hidden",
    },
    marqBase: {
      position: "absolute" as const,
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(80px, 14vw, 160px)",
      whiteSpace: "nowrap" as const,
      pointerEvents: "none" as const,
      userSelect: "none" as const,
      zIndex: 0,
      letterSpacing: "0.06em",
    },
    grid: {
      position: "absolute" as const,
      inset: 0,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`,
      backgroundSize: "60px 60px",
      pointerEvents: "none" as const,
    },
    inner: {
      position: "relative" as const,
      zIndex: 2,
      maxWidth: 1200,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "5fr 7fr",
      gap: 80,
      alignItems: "start",
    },
    eyebrowWrap: { overflow: "hidden", marginBottom: 20 },
    eyebrow: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.4em",
      textTransform: "uppercase" as const,
      color: "#c8ff00",
    },
    headingWrap: { marginBottom: 28 },
    headingLine: {
      overflow: "hidden",
      lineHeight: 1,
      marginBottom: 4,
    },
    h2: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(48px, 7vw, 76px)",
      lineHeight: 0.92,
      color: "#f2ede6",
      display: "block",
    },
    h2Accent: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(48px, 7vw, 76px)",
      lineHeight: 0.92,
      background: "linear-gradient(135deg, #c8ff00 0%, #ff2d2d 100%)",
      WebkitBackgroundClip: "text" as const,
      WebkitTextFillColor: "transparent" as const,
      backgroundClip: "text" as const,
      display: "block",
    },
    bioPara: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 300,
      fontSize: 13,
      lineHeight: 1.85,
      color: "rgba(255,255,255,0.38)",
      marginBottom: 16,
    },
    skillsLabel: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.35em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.25)",
      marginBottom: 20,
    },
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 2,
      marginBottom: 48,
    },
    skillCard: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "20px 12px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      cursor: "default",
      transition: "background 0.2s, border-color 0.2s",
    },
    hr: {
      height: 1,
      background:
        "linear-gradient(90deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))",
      marginBottom: 32,
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
    },
    statNum: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 44,
      lineHeight: 1,
      background: "linear-gradient(135deg, #c8ff00, #ff2d2d)",
      WebkitBackgroundClip: "text" as const,
      WebkitTextFillColor: "transparent" as const,
      backgroundClip: "text" as const,
      marginBottom: 4,
    },
    statLabel: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.25em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.25)",
    },
  };

  return (
    <section ref={sectionRef} id="about" style={s.section}>
      <div style={s.grid} aria-hidden />

      {/* Marquee bg text */}
      <div
        ref={marqRef}
        style={{ ...s.marqBase, top: "8%", color: "rgba(255,255,255,0.022)" }}
        aria-hidden
      >
        ABOUT ME — WHO I AM — ABOUT ME — WHO I AM —
      </div>
      <div
        ref={marqRef2}
        style={{
          ...s.marqBase,
          bottom: "8%",
          color: "rgba(200,255,0,0.018)",
          right: 0,
        }}
        aria-hidden
      >
        WEB DEVELOPER — BOHOL PH — WEB DEVELOPER —
      </div>

      <div style={s.inner}>
        {/* LEFT */}
        <div>
          <div style={s.eyebrowWrap}>
            <span className="about-eyebrow" style={s.eyebrow}>
              01 / About
            </span>
          </div>

          <div className="about-heading" style={s.headingWrap}>
            {[
              { text: "Building the web,", accent: false },
              { text: "one pixel", accent: true },
              { text: "at a time.", accent: false },
            ].map((row, i) => (
              <div key={i} style={s.headingLine}>
                <span
                  className="split-line"
                  style={row.accent ? s.h2Accent : s.h2}
                >
                  {row.text}
                </span>
              </div>
            ))}
          </div>

          <div className="about-bio">
            <p style={s.bioPara}>
              I'm a fresh graduate passionate about front-end development, eager
              to build clean, responsive, and user-friendly web experiences. I
              enjoy turning ideas into interactive interfaces that balance both
              design and functionality.
            </p>
            <p style={s.bioPara}>
              Although I'm just starting my professional journey, I'm highly
              motivated to learn, improve my skills, and contribute my best to
              every project — growing with modern web technologies every step of
              the way.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div style={s.skillsLabel}>My Stack</div>
          <div className="skills-grid" style={s.skillsGrid}>
            {skills.map((sk) => (
              <div
                key={sk.name}
                className="skill-card"
                style={s.skillCard}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    `${sk.color}12`;
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    `${sk.color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,255,255,0.06)";
                }}
              >
                <sk.Icon
                  size={28}
                  style={{ color: sk.color, transition: "transform 0.2s" }}
                />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 8,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    textAlign: "center",
                  }}
                >
                  {sk.name}
                </span>
              </div>
            ))}
          </div>

          <div className="about-hr" style={s.hr} />

          <div className="stats-row" style={s.statsRow}>
            {stats.map((st) => (
              <div key={st.label} className="stat-item">
                <div style={s.statNum}>{st.num}</div>
                <div style={s.statLabel}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
