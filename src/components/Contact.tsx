// Contact.tsx — Dark Editorial Redesign with GSAP ScrollTrigger
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import ContactModal from "./ContactModal";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Cduken",
    Icon: FaGithub,
    accent: "#e6edf3",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ernestojr-cabarrubias-3154342a1/",
    Icon: FaLinkedin,
    accent: "#0A66C2",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cdukenzxc",
    Icon: FaInstagram,
    accent: "#E1306C",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/cdukenzxc",
    Icon: FaFacebook,
    accent: "#1877F2",
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);
  const [hovSocial, setHovSocial] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Big background text pinned slow scroll ──────────────────────────
      gsap.to(bigTextRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ── Divider draw in ─────────────────────────────────────────────────
      gsap.from(".contact-hr-top", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".contact-hr-top", start: "top 88%" },
      });

      // ── Eyebrow clip-up ─────────────────────────────────────────────────
      gsap.from(".contact-eyebrow", {
        yPercent: 100,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-eyebrow", start: "top 88%" },
      });

      // ── Big headline letters ────────────────────────────────────────────
      gsap.from(".contact-heading .split-line", {
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
      });

      // ── Sub + button ────────────────────────────────────────────────────
      gsap.from([".contact-sub", ".contact-cta"], {
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".contact-sub", start: "top 85%" },
      });

      // ── Social links cascade ────────────────────────────────────────────
      gsap.from(".social-link", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".social-link", start: "top 88%" },
      });

      // ── Footer fade ─────────────────────────────────────────────────────
      gsap.from(".contact-footer", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".contact-footer", start: "top 92%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  const s = {
    section: {
      position: "relative" as const,
      background: "#0a0a0a",
      padding: "130px 52px 80px",
      overflow: "hidden",
    },
    scanLines: {
      position: "absolute" as const,
      inset: 0,
      background: `repeating-linear-gradient(180deg,transparent,transparent 2px,rgba(255,255,255,0.01) 2px,rgba(255,255,255,0.012) 4px)`,
      pointerEvents: "none" as const,
    },
    bigText: {
      position: "absolute" as const,
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(100px, 20vw, 220px)",
      color: "rgba(255,255,255,0.02)",
      whiteSpace: "nowrap" as const,
      pointerEvents: "none" as const,
      userSelect: "none" as const,
      letterSpacing: "0.06em",
    },
    inner: {
      position: "relative" as const,
      zIndex: 2,
      maxWidth: 900,
      margin: "0 auto",
      textAlign: "center" as const,
    },
    hr: {
      height: 1,
      background: "rgba(255,255,255,0.08)",
      marginBottom: 60,
    },
    eyebrowWrap: { overflow: "hidden", marginBottom: 20 },
    eyebrow: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.4em",
      textTransform: "uppercase" as const,
      color: "#c8ff00",
    },
    headingRow: { overflow: "hidden", lineHeight: 1, marginBottom: 6 },
    h2: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(64px, 10vw, 120px)",
      lineHeight: 0.9,
      color: "#f2ede6",
      display: "block",
    },
    h2Acc: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(64px, 10vw, 120px)",
      lineHeight: 0.9,
      background: "linear-gradient(135deg,#c8ff00 0%,#ff2d2d 100%)",
      WebkitBackgroundClip: "text" as const,
      WebkitTextFillColor: "transparent" as const,
      backgroundClip: "text" as const,
      display: "block",
    },
    sub: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 300,
      fontSize: 14,
      color: "rgba(255,255,255,0.3)",
      lineHeight: 1.8,
      maxWidth: 380,
      margin: "32px auto 48px",
    },
    btn: (hov: boolean) => ({
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
      fontWeight: 700,
      padding: "16px 36px",
      background: hov ? "#0a0a0a" : "#c8ff00",
      color: hov ? "#c8ff00" : "#0a0a0a",
      border: "1px solid #c8ff00",
      cursor: "pointer",
      transition: "all 0.25s",
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 64,
    }),
    socialsRow: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap" as const,
      gap: 10,
      marginBottom: 80,
    },
    socialLink: (hov: boolean, accent: string) => ({
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 18px",
      border: `1px solid ${hov ? `${accent}40` : "rgba(255,255,255,0.08)"}`,
      background: hov ? `${accent}10` : "transparent",
      color: hov ? accent : "rgba(255,255,255,0.3)",
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
      textDecoration: "none",
      transition: "all 0.22s",
      transform: hov ? "translateY(-3px)" : "translateY(0)",
    }),
    footerRow: {
      borderTop: "1px solid rgba(255,255,255,0.06)",
      paddingTop: 32,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    footMono: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.15)",
    },
  };

  return (
    <section ref={sectionRef} id="contact" style={s.section}>
      <div style={s.scanLines} aria-hidden />
      <div ref={bigTextRef} style={s.bigText} aria-hidden>
        CONTACT
      </div>

      <div style={s.inner}>
        <div className="contact-hr-top" style={s.hr} />

        <div style={s.eyebrowWrap}>
          <span className="contact-eyebrow" style={s.eyebrow}>
            03 / Get in Touch
          </span>
        </div>

        <div className="contact-heading">
          {[
            { text: "Let's create", accent: false },
            { text: "something", accent: true },
            { text: "extraordinary.", accent: false },
          ].map((row, i) => (
            <div key={i} style={s.headingRow}>
              <span className="split-line" style={row.accent ? s.h2Acc : s.h2}>
                {row.text}
              </span>
            </div>
          ))}
        </div>

        <p className="contact-sub" style={s.sub}>
          Have a project in mind? I'd love to hear about it. Let's discuss how
          we can work together.
        </p>

        <div className="contact-cta">
          <button
            style={s.btn(hovBtn)}
            onMouseEnter={() => setHovBtn(true)}
            onMouseLeave={() => setHovBtn(false)}
            onClick={() => setContactOpen(true)}
          >
            ✉ Say Hello {hovBtn ? "↗" : ""}
          </button>
        </div>

        <div style={s.socialsRow}>
          {SOCIALS.map(({ label, href, Icon, accent }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              style={s.socialLink(hovSocial === label, accent)}
              onMouseEnter={() => setHovSocial(label)}
              onMouseLeave={() => setHovSocial(null)}
            >
              <Icon style={{ fontSize: 14 }} />
              {label}
            </a>
          ))}
        </div>

        <div className="contact-footer" style={s.footerRow}>
          <span style={s.footMono}>© {year} — Ernest Cabarrubias</span>
          <span style={s.footMono}>Built with React · GSAP · Tailwind</span>
        </div>
      </div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default Contact;
