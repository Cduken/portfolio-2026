/* eslint-disable react-hooks/purity */
import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import CustomCursor from "../components/CustomCursor";

// --- Typewriter hook (one-time, no loop) ---
const FULL_TEXT = "Hello";
const TYPE_SPEED = 300;

function useTypewriterOnce() {
  const [displayed, setDisplayed] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (displayed.length < FULL_TEXT.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(FULL_TEXT.slice(0, displayed.length + 1));
      }, TYPE_SPEED);
    }
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [displayed]);

  return displayed;
}

// --- Rolling text labels ---
const LABELS = ["Web Developer", "Information Technology", "Mater Dei College"];

// --- Floating particle component ---
const Particle = ({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-primary/30 pointer-events-none z-[2]"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 0.8, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 4 + Math.random() * 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

const PARTICLES = [
  { delay: 0, x: "10%", y: "70%", size: 3 },
  { delay: 0.8, x: "20%", y: "40%", size: 2 },
  { delay: 1.5, x: "80%", y: "60%", size: 4 },
  { delay: 2.1, x: "70%", y: "30%", size: 2 },
  { delay: 0.4, x: "90%", y: "75%", size: 3 },
  { delay: 1.9, x: "35%", y: "80%", size: 2 },
  { delay: 3.0, x: "55%", y: "20%", size: 3 },
  { delay: 2.5, x: "15%", y: "25%", size: 2 },
];

const Start = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const flashlightRef = useRef<HTMLDivElement>(null);
  const tRef = useRef(0);
  const displayedText = useTypewriterOnce();
  const [labelIndex, setLabelIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLabelIndex((i) => (i + 1) % LABELS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useAnimationFrame(() => {
    tRef.current += 0.004;
    const t = tRef.current;
    const x = 50 + 42 * Math.sin(t * 1.3);
    const y = 50 + 42 * Math.sin(t * 0.9 + 1);
    if (flashlightRef.current) {
      flashlightRef.current.style.background = `radial-gradient(circle 380px at ${x}% ${y}%,
        rgba(120,80,255,0.16) 0%,
        rgba(80,40,200,0.07) 45%,
        transparent 70%)`;
    }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden noise-overlay">
      <CustomCursor />

      {/* Grid lines background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Infinite roaming flashlight */}
      <div
        ref={flashlightRef}
        className="absolute inset-0 z-[1] pointer-events-none transition-none"
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Decorative rings */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full border border-primary/10 z-[2]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[12%] w-48 h-48 rounded-full border border-accent/10 z-[2]"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[12%] w-2 h-2 rounded-full bg-accent/40 z-[2]"
        animate={{ scale: [1, 2, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[60%] left-[8%] w-px h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent z-[2]"
        animate={{ scaleY: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[15%] right-[20%] w-40 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent z-[2]"
        animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-[3] flex flex-col items-center px-6">
        {/* Badge pill */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-body text-primary/80 tracking-[0.4em] uppercase">
            Portfolio — {year}
          </span>
        </motion.div>

        {/* Main title — typewriter */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-9xl font-extrabold leading-[0.9] text-center mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="text-foreground">{displayedText}</span>
          <motion.span
            className="text-gradient-primary"
            animate={{
              opacity: displayedText.length < FULL_TEXT.length ? [1, 0, 1] : 0,
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.h1>

        {/* Nickname */}
        <motion.p
          className="font-display text-lg md:text-2xl font-bold tracking-[0.35em] uppercase text-muted-foreground mb-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Cduken
        </motion.p>

        {/* Rolling label */}
        <div className="overflow-hidden h-[1.4em] mb-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={labelIndex}
              className="text-[10px] tracking-[0.5em] uppercase text-primary/90 block"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {LABELS[labelIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ── Improved CTA button ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MagneticButton
            className="group relative flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-display font-bold text-base tracking-wider uppercase overflow-hidden glow-primary"
            onClick={() => navigate("/portfolio")}
          >
            {/* Ripple hover fill */}
            <motion.div
              className="absolute inset-0 rounded-full bg-accent"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Sparkle icon badge */}
            <motion.span
              className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary-foreground/15"
              animate={
                isHovered ? { rotate: 20, scale: 1.1 } : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.span>

            {/* Label */}
            <span className="relative z-10">Get Started</span>

            {/* Arrow slides in on hover */}
            <motion.span
              className="relative z-10 flex items-center"
              animate={isHovered ? { x: 0, opacity: 1 } : { x: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom hint */}
      <motion.div
        className="absolute bottom-8 flex items-center gap-2 z-[3]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-6 bg-gradient-to-b from-primary/60 to-transparent mx-auto"
        />
        <span className="text-xs text-muted-foreground/50 font-body tracking-widest">
          Click to enter
        </span>
      </motion.div>
    </div>
  );
};

export default Start;
