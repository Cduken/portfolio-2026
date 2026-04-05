import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

// Internship images
import DILG1 from "../assets/gallery/dilg1.jpg";
import DILG2 from "../assets/gallery/dilg2.jpg";
import DILG3 from "../assets/gallery/dilg3.jpg";

// Myself images
import Myself1 from "../assets/gallery/cdu.jpg";
import Myself2 from "../assets/gallery/ernest.jpg";
import Myself3 from "../assets/gallery/me3.jpg";
import Myself4 from "../assets/gallery/me4.jpg";
import Myself5 from "../assets/gallery/me5.jpg";
import Myself6 from "../assets/gallery/me6.jpg";
import Myself7 from "../assets/gallery/me7.jpg";
import Myself8 from "../assets/gallery/me8.jpg";


//Setup images
import Setup1 from "../assets/gallery/setup1.jpg";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Category = "All" | "Internship" | "Myself" | "Setup";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: Category;
  caption?: string;
};

const galleryImages: GalleryImage[] = [
  { id: 1, src: DILG1, alt: "Team collaboration", category: "Internship", caption: "Turnover of the newly developed report submission system." },
  { id: 2, src: DILG2, alt: "Office meeting", category: "Internship", caption: "Picture together with the advisors and mentors during the turnover." },
  { id: 3, src: DILG3, alt: "Open office", category: "Internship", caption: "Awarded a certification by the Provincial Director during the turnover." },

  { id: 5, src: Myself1, alt: "Portrait", category: "Myself", caption: "Stolen shot from a friend" },
  { id: 6, src: Myself2, alt: "Candid shot", category: "Myself", caption: "College graduation pictorial" },
  { id: 7, src: Myself3, alt: "Street photo", category: "Myself", caption: "Stolen shot" },
  { id: 8, src: Myself4, alt: "Desk setup", category: "Myself", caption: "SHS grad pic" },
  { id: 9, src: Myself5, alt: "Laptop + coffee", category: "Myself", caption: "Gym flex" },
  { id: 10, src: Myself6, alt: "Monitor code", category: "Myself", caption: "Gym flex" },
  { id: 11, src: Myself7, alt: "Tech event", category: "Myself", caption: "Gym flex" },
  { id: 12, src: Myself8, alt: "Workshop", category: "Myself", caption: "Selfie in our multicab" },

  { id: 13, src: Setup1, alt: "Work setup", category: "Setup", caption: "My coding sanctuary" },
];

const CATEGORIES: Category[] = ["All", "Internship", "Myself", "Setup"];
const PER_PAGE = 6;

// ─── Lightbox ─────────────────────────────────────────────────────────────────

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

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-black/92 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={image.id}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/8"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <img
              src={image.src.replace("w=800", "w=1400")}
              alt={image.alt}
              className="w-full max-h-[65vh] object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-body tracking-[0.3em] uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/70">
                {image.category}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between w-full mt-3 px-1">
          <motion.p
            key={image.id}
            className="text-sm font-body text-white/50 pr-4"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {image.caption ?? image.alt}
          </motion.p>
          <span className="text-xs font-body text-white/25 tabular-nums shrink-0">
            {idx + 1} / {all.length}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => go(-1)}
            className="w-9 h-9 rounded-full border border-white/12 bg-white/5 hover:bg-primary hover:border-primary flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 text-sm"
          >
            ←
          </button>
          <div className="flex gap-1.5">
            {all.map((img, i) => (
              <button
                key={img.id}
                onClick={() => onNav(img)}
                className={`rounded-full transition-all duration-300 ${
                  i === idx ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="w-9 h-9 rounded-full border border-white/12 bg-white/5 hover:bg-primary hover:border-primary flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 text-sm"
          >
            →
          </button>
        </div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/12 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all duration-200 text-xs z-20"
      >
        ✕
      </button>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [page, setPage] = useState(0);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [lightboxImg, setLightboxImg] = useState<GalleryImage | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageImages = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const goPage = (dir: 1 | -1) => {
    const next = page + dir;
    if (next < 0 || next >= totalPages) return;
    setSlideDir(dir);
    setPage(next);
  };

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setPage(0);
  };

  // Slide variants — images fly in/out horizontally based on direction
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "6%" : "-6%",
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-6%" : "6%",
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section id="gallery" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <span className="text-sm font-body text-primary tracking-[0.3em] uppercase mb-4 block">
            02.5 / Gallery
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95]">
              Behind the
              <span className="text-gradient-primary"> scenes</span>.
            </h2>
            
          </div>
        </ScrollReveal>

        {/* Category pills */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const count = cat === "All"
                ? galleryImages.length
                : galleryImages.filter((i) => i.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body tracking-[0.15em] uppercase border transition-all duration-200 ${
                    isActive
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-transparent border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                  <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Grid with slide animation */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={slideDir}>
            <motion.div
              key={`${activeCategory}-${page}`}
              custom={slideDir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.45,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
            >
              {pageImages.map((img, i) => (
                <motion.div
                  key={img.id}
                  className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[4/3]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  onClick={() => setLightboxImg(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-xs font-body text-white/90 leading-snug truncate">
                      {img.caption}
                    </p>
                    <span className="text-[10px] font-body text-white/45 tracking-widest uppercase">
                      {img.category}
                    </span>
                  </div>

                  {/* Expand icon */}
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center text-white/50 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    ↗
                  </div>
                </motion.div>
              ))}

              {/* Ghost cards to keep grid stable on last page */}
              {pageImages.length < PER_PAGE &&
                Array.from({ length: PER_PAGE - pageImages.length }).map((_, i) => (
                  <div key={`ghost-${i}`} className="aspect-[4/3] rounded-xl bg-transparent" />
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              className="text-center py-24 text-muted-foreground font-body text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No images in this category yet.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <motion.div
            className="flex items-center justify-between mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Prev */}
            <button
              onClick={() => goPage(-1)}
              disabled={page === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-body tracking-[0.15em] uppercase transition-all duration-200 ${
                page === 0
                  ? "border-border/30 text-muted-foreground/30 cursor-not-allowed"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              ← Prev
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSlideDir(i > page ? 1 : -1);
                    setPage(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === page
                      ? "w-6 h-1.5 bg-primary"
                      : "w-1.5 h-1.5 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => goPage(1)}
              disabled={page === totalPages - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-body tracking-[0.15em] uppercase transition-all duration-200 ${
                page === totalPages - 1
                  ? "border-border/30 text-muted-foreground/30 cursor-not-allowed"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              Next →
            </button>
          </motion.div>
        )}

        {/* Footer count */}
        {filtered.length > 0 && (
          <motion.p
            className="text-center text-xs text-muted-foreground/40 font-body tracking-widest uppercase mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, filtered.length)} of {filtered.length} photos
            {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
          </motion.p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <Lightbox
            image={lightboxImg}
            all={filtered}
            onClose={() => setLightboxImg(null)}
            onNav={setLightboxImg}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;