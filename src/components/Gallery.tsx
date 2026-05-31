// Gallery.tsx — Dark Editorial Redesign with GSAP ScrollTrigger
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Import your images exactly as before ──────────────────────────────────────
import DILG1 from "../assets/gallery/dilg1.jpg";
import DILG2 from "../assets/gallery/dilg2.jpg";
import DILG3 from "../assets/gallery/dilg3.jpg";
import Myself1 from "../assets/gallery/cdu.jpg";
import Myself2 from "../assets/gallery/grad2.jpg";
import Myself3 from "../assets/gallery/me3.jpg";
import Myself4 from "../assets/gallery/me4.jpg";
import Myself5 from "../assets/gallery/me5.jpg";
import Myself6 from "../assets/gallery/me6.jpg";
import Myself7 from "../assets/gallery/me7.jpg";
import Myself8 from "../assets/gallery/me8.jpg";
import Myself9 from "../assets/gallery/grad3.jpg";
import Setup1 from "../assets/gallery/setup1.jpg";

gsap.registerPlugin(ScrollTrigger);

type Category = "All" | "Internship" | "Myself" | "Setup";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: Category;
  caption?: string;
};

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: DILG1,
    alt: "Team collaboration",
    category: "Internship",
    caption: "Turnover of the newly developed report submission system.",
  },
  {
    id: 2,
    src: DILG2,
    alt: "Office meeting",
    category: "Internship",
    caption: "With advisors and mentors during the turnover.",
  },
  {
    id: 3,
    src: DILG3,
    alt: "Open office",
    category: "Internship",
    caption: "Awarded a certification by the Provincial Director.",
  },
  {
    id: 5,
    src: Myself1,
    alt: "Portrait",
    category: "Myself",
    caption: "Stolen shot from a friend",
  },
  {
    id: 6,
    src: Myself2,
    alt: "Graduation",
    category: "Myself",
    caption: "College graduation pictorial",
  },
  {
    id: 7,
    src: Myself3,
    alt: "Candid shot",
    category: "Myself",
    caption: "Stolen shot",
  },
  {
    id: 8,
    src: Myself4,
    alt: "SHS grad",
    category: "Myself",
    caption: "SHS grad pic",
  },
  { id: 9, src: Myself5, alt: "Gym", category: "Myself", caption: "Gym flex" },
  {
    id: 10,
    src: Myself6,
    alt: "Gym 2",
    category: "Myself",
    caption: "Gym flex",
  },
  {
    id: 11,
    src: Myself7,
    alt: "Event",
    category: "Myself",
    caption: "Gym flex",
  },
  {
    id: 12,
    src: Myself8,
    alt: "Selfie",
    category: "Myself",
    caption: "Selfie in our multicab",
  },
  {
    id: 13,
    src: Myself9,
    alt: "Graduation 2",
    category: "Myself",
    caption: "College graduation pictorial",
  },
  {
    id: 14,
    src: Setup1,
    alt: "Work setup",
    category: "Setup",
    caption: "My coding sanctuary",
  },
];

const CATEGORIES: Category[] = ["All", "Internship", "Myself", "Setup"];
const PER_PAGE = 6;

// ── Lightbox ──────────────────────────────────────────────────────────────────
const Lightbox = ({
  image,
  all,
  onClose,
  onNav,
}: {
  image: GalleryImage;
  all: GalleryImage[];
  onClose: () => void;
  onNav: (img: GalleryImage) => void;
}) => {
  const idx = all.findIndex((i) => i.id === image.id);
  const go = (dir: 1 | -1) => onNav(all[(idx + dir + all.length) % all.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [idx]);

  const s = {
    backdrop: {
      position: "fixed" as const,
      inset: 0,
      background: "rgba(0,0,0,0.94)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      animation: "lbFadeIn 0.25s ease forwards",
    },
    imgWrap: {
      position: "relative" as const,
      maxWidth: 680,
      width: "100%",
      border: "1px solid rgba(255,255,255,0.08)",
      animation: "lbScaleIn 0.28s cubic-bezier(0.25,0.4,0.25,1) forwards",
    },
    img: {
      width: "100%",
      maxHeight: "65vh",
      objectFit: "cover" as const,
      display: "block",
    },
    catBadge: {
      position: "absolute" as const,
      top: 12,
      left: 12,
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.25em",
      textTransform: "uppercase" as const,
      padding: "5px 10px",
      background: "rgba(0,0,0,0.7)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.5)",
    },
    meta: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0 0",
    },
    caption: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 13,
      color: "rgba(255,255,255,0.4)",
      fontWeight: 300,
    },
    counter: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      color: "rgba(255,255,255,0.2)",
      letterSpacing: "0.15em",
    },
    navRow: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 16,
    },
    navBtn: {
      width: 36,
      height: 36,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.04)",
      color: "rgba(255,255,255,0.5)",
      cursor: "pointer",
      fontFamily: "monospace",
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
    },
    close: {
      position: "fixed" as const,
      top: 20,
      right: 20,
      width: 32,
      height: 32,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.04)",
      color: "rgba(255,255,255,0.4)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "monospace",
      fontSize: 12,
      zIndex: 51,
      transition: "all 0.2s",
    },
  };

  return (
    <>
      <style>{`
        @keyframes lbFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes lbScaleIn { from{transform:scale(0.96);opacity:0} to{transform:scale(1);opacity:1} }
      `}</style>
      <div style={s.backdrop} onClick={onClose}>
        <button style={s.close} onClick={onClose}>
          ✕
        </button>
        <div
          style={{ width: "100%", maxWidth: 680 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={s.imgWrap}>
            <img key={image.id} src={image.src} alt={image.alt} style={s.img} />
            <div style={s.catBadge}>{image.category}</div>
          </div>
          <div style={s.meta}>
            <span style={s.caption}>{image.caption ?? image.alt}</span>
            <span style={s.counter}>
              {idx + 1} / {all.length}
            </span>
          </div>
          <div style={s.navRow}>
            <button style={s.navBtn} onClick={() => go(-1)}>
              ←
            </button>
            <div style={{ display: "flex", gap: 6, flex: 1 }}>
              {all.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => onNav(img)}
                  style={{
                    height: 2,
                    flex: i === idx ? 3 : 1,
                    background:
                      i === idx ? "#c8ff00" : "rgba(255,255,255,0.15)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <button style={s.navBtn} onClick={() => go(1)}>
              →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [page, setPage] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<GalleryImage | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const marqRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((i) => i.category === activeCategory);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageImages = filtered.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE,
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Parallax marquee ────────────────────────────────────────────────
      gsap.to(marqRef.current, {
        xPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      // ── Header reveal ───────────────────────────────────────────────────
      gsap.from(".gal-eyebrow", {
        yPercent: 100,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gal-eyebrow", start: "top 88%" },
      });

      gsap.from(".gal-heading .split-line", {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gal-heading", start: "top 85%" },
      });

      // ── Category pills ──────────────────────────────────────────────────
      gsap.from(".cat-pill", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cat-pill", start: "top 88%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate grid cards when page/category changes
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".gal-card"),
      { y: 30, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      },
    );
  }, [page, activeCategory]);

  const handleCategory = (cat: Category) => {
    setActiveCategory(cat);
    setPage(0);
  };

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
    marq: {
      position: "absolute" as const,
      top: "12%",
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(80px, 14vw, 140px)",
      color: "rgba(255,255,255,0.02)",
      whiteSpace: "nowrap" as const,
      pointerEvents: "none" as const,
      userSelect: "none" as const,
    },
    inner: {
      position: "relative" as const,
      zIndex: 2,
      maxWidth: 1200,
      margin: "0 auto",
    },
    eyebrowWrap: { overflow: "hidden", marginBottom: 14 },
    eyebrow: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.4em",
      textTransform: "uppercase" as const,
      color: "#c8ff00",
    },
    h2: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(48px, 8vw, 88px)",
      lineHeight: 0.92,
      color: "#f2ede6",
      display: "block",
    },
    h2Acc: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(48px, 8vw, 88px)",
      lineHeight: 0.92,
      background: "linear-gradient(135deg,#c8ff00,#ff2d2d)",
      WebkitBackgroundClip: "text" as const,
      WebkitTextFillColor: "transparent" as const,
      backgroundClip: "text" as const,
      display: "block",
    },
    pills: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: 8,
      margin: "32px 0 40px",
    },
    pill: (active: boolean) => ({
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.25em",
      textTransform: "uppercase" as const,
      padding: "8px 16px",
      border: `1px solid ${active ? "#c8ff00" : "rgba(255,255,255,0.1)"}`,
      background: active ? "#c8ff00" : "transparent",
      color: active ? "#0a0a0a" : "rgba(255,255,255,0.35)",
      cursor: "pointer",
      transition: "all 0.2s",
    }),
    photoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 3,
      marginBottom: 24,
    },
    card: {
      position: "relative" as const,
      aspectRatio: "4/3",
      overflow: "hidden",
      cursor: "pointer",
      background: "#111",
    },
    pagination: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 20,
      borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    pageBtn: (disabled: boolean) => ({
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.25em",
      textTransform: "uppercase" as const,
      padding: "8px 16px",
      border: `1px solid ${disabled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.15)"}`,
      background: "transparent",
      color: disabled ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.4)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s",
    }),
    pageDots: {
      display: "flex",
      gap: 6,
      alignItems: "center",
    },
    footNote: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 8,
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
      color: "rgba(255,255,255,0.15)",
      textAlign: "center" as const,
      marginTop: 16,
    },
  };

  return (
    <section ref={sectionRef} id="gallery" style={s.section}>
      <div style={s.grid} aria-hidden />
      <div ref={marqRef} style={s.marq} aria-hidden>
        BEHIND THE SCENES — GALLERY — BEHIND THE SCENES —
      </div>

      <div style={s.inner}>
        {/* Header */}
        <div style={s.eyebrowWrap}>
          <span className="gal-eyebrow" style={s.eyebrow}>
            02.5 / Gallery
          </span>
        </div>
        <div className="gal-heading">
          {[
            { text: "Behind the", accent: false },
            { text: "scenes.", accent: true },
          ].map((row, i) => (
            <div key={i} style={{ overflow: "hidden", lineHeight: 1 }}>
              <span className="split-line" style={row.accent ? s.h2Acc : s.h2}>
                {row.text}
              </span>
            </div>
          ))}
        </div>

        {/* Category pills */}
        <div style={s.pills}>
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? galleryImages.length
                : galleryImages.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                className="cat-pill"
                style={s.pill(activeCategory === cat)}
                onClick={() => handleCategory(cat)}
              >
                {cat}{" "}
                <span style={{ opacity: 0.5, marginLeft: 4 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div ref={gridRef} style={s.photoGrid}>
          {pageImages.map((img) => (
            <div
              key={img.id}
              className="gal-card"
              style={s.card}
              onClick={() => setLightboxImg(img)}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.querySelector("img")!.style.transform = "scale(1.06)";
                (
                  el.querySelector(".gal-overlay") as HTMLDivElement
                ).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.querySelector("img")!.style.transform = "scale(1)";
                (
                  el.querySelector(".gal-overlay") as HTMLDivElement
                ).style.opacity = "0";
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s cubic-bezier(0.25,0.4,0.25,1)",
                  filter: "grayscale(15%)",
                }}
              />
              <div
                className="gal-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 12,
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: 2,
                    fontWeight: 300,
                  }}
                >
                  {img.caption}
                </p>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 8,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(200,255,0,0.7)",
                  }}
                >
                  {img.category}
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 22,
                  height: 22,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                ↗
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={s.pagination}>
            <button
              style={s.pageBtn(page === 0)}
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              ← Prev
            </button>
            <div style={s.pageDots}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  style={{
                    width: i === page ? 24 : 6,
                    height: 2,
                    background:
                      i === page ? "#c8ff00" : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <button
              style={s.pageBtn(page === totalPages - 1)}
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              Next →
            </button>
          </div>
        )}

        {filtered.length > 0 && (
          <div style={s.footNote}>
            {page * PER_PAGE + 1}–
            {Math.min((page + 1) * PER_PAGE, filtered.length)} of{" "}
            {filtered.length} photos
            {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
          </div>
        )}
      </div>

      {lightboxImg && (
        <Lightbox
          image={lightboxImg}
          all={filtered}
          onClose={() => setLightboxImg(null)}
          onNav={setLightboxImg}
        />
      )}
    </section>
  );
};

export default Gallery;
