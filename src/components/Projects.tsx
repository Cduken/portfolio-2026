// Projects.tsx — Dark Editorial Redesign with GSAP ScrollTrigger
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectModal, { type Project } from "./projects/ProjectModal";

// ── Import your images exactly as before ─────────────────────────────────────
import ShopEase1 from "../assets/projects/shopease1.jpg";
import ShopEase2 from "../assets/projects/shopease2.jpg";
import ShopEase3 from "../assets/projects/shopease3.jpg";
import ShopEase4 from "../assets/projects/shopease4.jpg";
import ShopEase5 from "../assets/projects/shopease5.jpg";
import Shopease6 from "../assets/projects/shopease6.jpg";
import ShopEase7 from "../assets/projects/shopease7.jpg";
import ShopEase8 from "../assets/projects/shopease8.jpg";
import ShopEase9 from "../assets/projects/shopease9.jpg";
import ShopEase10 from "../assets/projects/shopease10.jpg";
import ShopEase11 from "../assets/projects/shopease11.jpg";
import ShopEase12 from "../assets/projects/shopease12.jpg";
import ShopEase13 from "../assets/projects/shopease13.jpg";
import ShopEase14 from "../assets/projects/shopease14.jpg";
import ShopEase15 from "../assets/projects/shopease15.jpg";
import ShopEase16 from "../assets/projects/shopease16.jpg";
import Aquatrack1 from "../assets/projects/aqt1.jpg";
import Aquatrack2 from "../assets/projects/aqt2.jpg";
import Aquatrack3 from "../assets/projects/aqt3.jpg";
import Aquatrack4 from "../assets/projects/aqt4.jpg";
import Aquatrack5 from "../assets/projects/aqt5.jpg";
import Aquatrack6 from "../assets/projects/aqt6.jpg";
import RSS1 from "../assets/projects/rss1.jpg";
import RSS2 from "../assets/projects/rss2.jpg";
import RSS3 from "../assets/projects/rss3.jpg";
import RSS4 from "../assets/projects/rss4.jpg";
import RSS5 from "../assets/projects/rss5.jpg";
import RSS6 from "../assets/projects/rss6.jpg";
import RSS7 from "../assets/projects/rss7.jpg";
import RSS8 from "../assets/projects/rss8.jpg";
import RSS9 from "../assets/projects/rss9.jpg";
import Pinkleball1 from "../assets/projects/pb1.jpg";
import Pinkleball2 from "../assets/projects/pb2.jpg";
import Pinkleball3 from "../assets/projects/pb3.jpg";
import Pinkleball4 from "../assets/projects/pb4.jpg";
import Pinkleball5 from "../assets/projects/pb5.jpg";
import Pinkleball6 from "../assets/projects/pb6.jpg";
import Pinkleball7 from "../assets/projects/pb7.jpg";
import Pinkleball8 from "../assets/projects/pb8.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    id: 1,
    title: "ShopEase",
    subtitle: "E-Commerce Platform",
    description:
      "A secure e-commerce platform for mobile phones with authentication. Admin dashboard manages phone stocks and categories with full control over product inventory and listings.",
    tags: ["Laravel", "Blade", "Tailwind CSS", "MySQL"],
    color: "from-primary/20 to-accent/10",
    year: "2025",
    link: "#",
    images: [
      ShopEase1,
      ShopEase2,
      ShopEase3,
      ShopEase4,
      ShopEase5,
      Shopease6,
      ShopEase7,
      ShopEase8,
      ShopEase9,
      ShopEase10,
      ShopEase11,
      ShopEase12,
      ShopEase13,
      ShopEase14,
      ShopEase15,
      ShopEase16,
    ],
  },
  {
    id: 2,
    title: "AquaTrack",
    subtitle: "Clarin Water Management System",
    description:
      "Allows Clarin, Bohol residents to report water-related issues, track reports, and monitor monthly billings. Admin dashboard includes a map view to locate issues in real time.",
    tags: ["VueJS", "InertiaJS", "Tailwind CSS", "MySQL"],
    color: "from-accent/20 to-primary/10",
    year: "2025",
    link: "",
    images: [
      Aquatrack1,
      Aquatrack2,
      Aquatrack3,
      Aquatrack4,
      Aquatrack5,
      Aquatrack6,
    ],
  },
  {
    id: 3,
    title: "DILG RSS",
    subtitle: "Report Submission System",
    description:
      "A role-based report submission system for DILG with tailored dashboards for Program Heads, Field Officers, Focal Persons, and the Provincial Director.",
    tags: ["ReactJS", "InertiaJS", "Tailwind CSS", "MySQL"],
    color: "from-primary/15 to-secondary",
    year: "2026",
    link: "https://report-submission.dilgbohol.com/",
    images: [RSS1, RSS2, RSS3, RSS4, RSS5, RSS6, RSS7, RSS8, RSS9],
  },
  {
    id: 4,
    title: "PinkleBall",
    subtitle: "Pickleball Court Reservation",
    description:
      "A user-friendly pickleball court reservation system with real-time availability updates and responsive design for a seamless booking experience.",
    tags: ["ReactJS", "TypeScript", "Tailwind CSS", "Supabase"],
    color: "from-primary/15 to-secondary",
    year: "2026",
    link: "https://pinkleball.vercel.app/",
    images: [
      Pinkleball1,
      Pinkleball2,
      Pinkleball3,
      Pinkleball4,
      Pinkleball5,
      Pinkleball6,
      Pinkleball7,
      Pinkleball8,
    ],
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Eyebrow + heading ───────────────────────────────────────────────
      gsap.from(".proj-eyebrow", {
        yPercent: 100,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proj-eyebrow", start: "top 88%" },
      });

      gsap.from(".proj-heading .split-line", {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proj-heading", start: "top 85%" },
      });

      // ── Count-up number ─────────────────────────────────────────────────
      gsap.from(".proj-count", {
        textContent: 0,
        duration: 1.2,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: { trigger: ".proj-count", start: "top 85%" },
      });

      // ── Each project row: reveal from below + line draw ─────────────────
      gsap.utils.toArray<HTMLElement>(".proj-row").forEach((row, i) => {
        // The top border draws in
        gsap.from(row.querySelector(".proj-row-line"), {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
          },
        });

        // Content slides up with stagger offset
        gsap.from(row.querySelectorAll(".proj-row-content"), {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 86%",
          },
        });
      });

      // ── Final bottom line ───────────────────────────────────────────────
      gsap.from(".proj-end-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".proj-end-line", start: "top 90%" },
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
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 60,
    },
    eyebrowWrap: { overflow: "hidden", marginBottom: 14 },
    eyebrow: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.4em",
      textTransform: "uppercase" as const,
      color: "#c8ff00",
    },
    heading: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(48px, 8vw, 88px)",
      lineHeight: 0.9,
      color: "#f2ede6",
    },
    headingAccent: {
      background: "linear-gradient(135deg, #c8ff00 0%, #ff2d2d 100%)",
      WebkitBackgroundClip: "text" as const,
      WebkitTextFillColor: "transparent" as const,
      backgroundClip: "text" as const,
    },
    countBlock: {
      textAlign: "right" as const,
    },
    countNum: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 72,
      color: "rgba(255,255,255,0.06)",
      lineHeight: 1,
    },
    countLabel: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.18)",
    },
    rowLine: {
      height: 1,
      background: "rgba(255,255,255,0.08)",
    },
    row: (hov: boolean) => ({
      position: "relative" as const,
      cursor: "pointer",
      background: hov ? "rgba(255,255,255,0.02)" : "transparent",
      transition: "background 0.3s",
    }),
    rowInner: {
      padding: "28px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },
    rowLeft: {
      display: "flex",
      alignItems: "center",
      gap: 32,
    },
    rowYear: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.2em",
      color: "rgba(255,255,255,0.2)",
      width: 36,
      flexShrink: 0,
    },
    rowTitle: (hov: boolean) => ({
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(28px, 4vw, 48px)",
      color: hov ? "#c8ff00" : "#f2ede6",
      lineHeight: 1,
      transition: "color 0.25s",
      transform: hov ? "translateX(12px)" : "translateX(0)",
      transition2: "transform 0.3s",
    }),
    rowSub: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
      color: "rgba(255,255,255,0.25)",
    },
    rowRight: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    tag: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.15em",
      textTransform: "uppercase" as const,
      padding: "4px 10px",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "rgba(255,255,255,0.25)",
    },
    arrow: (hov: boolean) => ({
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 20,
      color: hov ? "#c8ff00" : "rgba(255,255,255,0.2)",
      transform: hov ? "rotate(45deg)" : "rotate(0deg)",
      transition: "all 0.25s",
      lineHeight: 1,
    }),
    expandDesc: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 300,
      fontSize: 12,
      color: "rgba(255,255,255,0.3)",
      lineHeight: 1.75,
      maxWidth: 500,
      paddingBottom: 16,
      paddingLeft: 68,
    },
    expandHint: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
      color: "rgba(200,255,0,0.4)",
      paddingLeft: 68,
      paddingBottom: 16,
    },
  };

  return (
    <section ref={sectionRef} id="projects" style={s.section}>
      <div style={s.grid} aria-hidden />

      <div style={s.inner}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <div style={s.eyebrowWrap}>
              <span className="proj-eyebrow" style={s.eyebrow}>
                02 / Selected Work
              </span>
            </div>
            <div className="proj-heading">
              {["Featured", "Projects"].map((word, i) => (
                <div key={i} style={{ overflow: "hidden", lineHeight: 1 }}>
                  <span
                    className="split-line"
                    style={
                      i === 1 ? { ...s.heading, ...s.headingAccent } : s.heading
                    }
                  >
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={s.countBlock}>
            <div className="proj-count" style={s.countNum}>
              {projects.length}
            </div>
            <div style={s.countLabel}>Projects</div>
          </div>
        </div>

        {/* Rows */}
        <div>
          {projects.map((p) => {
            const hov = hoveredId === p.id;
            return (
              <div
                key={p.id}
                className="proj-row"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setModalProject(p)}
              >
                <div className="proj-row-line" style={s.rowLine} />
                <div style={s.row(hov)}>
                  <div className="proj-row-content" style={s.rowInner}>
                    <div style={s.rowLeft}>
                      <span style={s.rowYear}>{p.year}</span>
                      <span
                        style={{
                          ...s.rowTitle(hov),
                          transform: hov ? "translateX(12px)" : "translateX(0)",
                          transition: "color 0.25s, transform 0.3s",
                        }}
                      >
                        {p.title}
                      </span>
                      <span style={s.rowSub}>{p.subtitle}</span>
                    </div>
                    <div style={s.rowRight}>
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} style={s.tag}>
                          {t}
                        </span>
                      ))}
                      <span style={s.arrow(hov)}>↗</span>
                    </div>
                  </div>

                  {/* Expanded description on hover */}
                  <div
                    style={{
                      maxHeight: hov ? 120 : 0,
                      overflow: "hidden",
                      transition:
                        "max-height 0.4s cubic-bezier(0.25,0.4,0.25,1)",
                    }}
                  >
                    <p style={s.expandDesc}>{p.description}</p>
                    <span style={s.expandHint}>Click to view gallery →</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className="proj-end-line"
            style={{ height: 1, background: "rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>

      {/* Modal — reuse your existing ProjectModal, it's already great */}
      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
