import { motion, useAnimationFrame } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import MagneticButton from "../components/MagneticButton";
import CustomCursor from "../components/CustomCursor";

const Start = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const flashlightRef = useRef<HTMLDivElement>(null);
  const tRef = useRef(0);

  // Infinite autonomous flashlight using Lissajous path
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

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full border border-primary/10 z-[2]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
      />

      {/* Content — z-[3] so it sits above grid + flashlight */}
      <div className="relative z-[3] flex flex-col items-center">
        {/* Small top label */}
        <motion.span
          className="text-xs font-body text-muted-foreground tracking-[0.4em] uppercase mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Portfolio — {year}
        </motion.span>

        {/* Main title */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-9xl font-extrabold leading-[0.9] text-center mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="text-foreground">Hello</span>
          <span className="text-gradient-primary">.</span>
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

        {/* IT label */}
        <motion.span
          className="text-[10px] tracking-[0.5em] uppercase text-primary/90 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Web Developer &#x25CB; Information Technology &#x25CB; Mater Dei College
        </motion.span>

        {/* Description */}
        

        {/* Get Started button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <MagneticButton
            className="group relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm tracking-wider uppercase overflow-hidden flex items-center justify-center glow-primary"
            onClick={() => navigate("/portfolio")}
          >
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 rounded-full bg-accent"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom hint */}
      <motion.span
        className="absolute bottom-8 text-xs text-muted-foreground/50 font-body tracking-widest z-[3]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Click to enter
      </motion.span>
    </div>
  );
};

export default Start;