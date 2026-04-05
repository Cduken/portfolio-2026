import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const letterVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        delay: 0.8 + i * 0.04,
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  const firstName = "Ernest";
  const lastName = "Cabarrubias";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    >
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-[15%] w-20 h-20 rounded-full border border-primary/20"
        style={{ y: y1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 left-[10%] w-2 h-2 rounded-full bg-accent"
        style={{ y: y2 }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[40%] right-[8%] w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-[30%] left-[5%] w-32 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        style={{ y: y2 }}
      />

      {/* Extra floating accent — subtle bracket decorations */}
      <motion.span
        className="absolute top-[22%] left-[6%] font-display text-6xl font-extrabold text-primary/5 select-none"
        style={{ y: y1 }}
      >
        {"<"}
      </motion.span>
      <motion.span
        className="absolute bottom-[20%] right-[6%] font-display text-6xl font-extrabold text-primary/5 select-none"
        style={{ y: y2 }}
      >
        {"/>"}
      </motion.span>

      <motion.div style={{ opacity, scale }} className="relative z-10 px-6">
        {/* Status line */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-body text-muted-foreground tracking-[0.3em] uppercase">
            Available for projects
          </span>
        </motion.div>

        {/* Main title — First name */}
        <div className="overflow-hidden mb-1">
          <div className="flex">
            {firstName.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="font-display text-[clamp(2.8rem,10vw,8.5rem)] font-extrabold leading-[0.9] text-foreground"
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Last name — gradient, slightly smaller to fit */}
        <div className="overflow-hidden mb-6">
          <div className="flex flex-wrap">
            {lastName.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="font-display text-[clamp(2rem,7.5vw,6.5rem)] font-extrabold leading-[0.9] text-gradient-primary"
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                custom={i + firstName.length}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-md font-body leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          I’m a fresh graduate from Mater Dei College, passionate about building
          modern, responsive websites and continuously learning to improve my
          craft in web development.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <MagneticButton
            className="group relative px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wider uppercase overflow-hidden"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="relative z-10">View Work</span>
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </MagneticButton>
          <MagneticButton
            className="px-8 py-4 rounded-full border border-border text-foreground font-display font-semibold text-sm tracking-wider uppercase hover:border-primary/50 transition-colors"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Say Hello
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-xs text-muted-foreground tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
