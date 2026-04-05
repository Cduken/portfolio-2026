import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  year: string;
  images: string[];
};

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setImgIndex((prev) =>
      (prev + dir + project.images.length) % project.images.length
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal — max-w-2xl instead of max-w-4xl */}
      <motion.div
        className="relative z-10 w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Image viewer */}
        <div className="relative w-full aspect-video bg-muted overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.img
              key={imgIndex}
              src={project.images[imgIndex]}
              alt={`${project.title} screenshot ${imgIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent pointer-events-none" />

          {/* Left / Right nav */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur border border-border flex items-center justify-center text-foreground text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 z-10"
          >
            ←
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur border border-border flex items-center justify-center text-foreground text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 z-10"
          >
            →
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > imgIndex ? 1 : -1);
                  setImgIndex(i);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === imgIndex
                    ? "w-5 bg-primary"
                    : "w-1 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200 z-10 text-xs"
          >
            ✕
          </button>
        </div>

        {/* Info */}
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                {project.title}
              </h3>
              <p className="text-xs text-primary font-body tracking-widest uppercase mt-0.5">
                {project.subtitle}
              </p>
            </div>
            <span className="text-xs text-muted-foreground font-body border border-border rounded-full px-2.5 py-1">
              {project.year}
            </span>
          </div>

          <p className="text-muted-foreground font-body leading-relaxed mb-4 text-sm">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border border-primary/30 text-primary/80 font-body tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;