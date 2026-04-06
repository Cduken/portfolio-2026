import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

const Hero = () => {
  const containerRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const firstName = "Ernest";
  const lastName = "Cabarrubias";

  const letterVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.6 + i * 0.045,
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    >
      {/* Diagonal background slice */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            135deg,
            hsl(220 14% 6%) 0%,
            hsl(220 14% 6%) 55%,
            hsl(220 12% 10%) 55%,
            hsl(220 12% 10%) 100%
          )`,
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, hsl(15 85% 60% / 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, hsl(165 60% 50% / 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Floating code decoration */}
      <motion.div
        className="absolute bottom-[18%] left-[3%] font-mono text-[0.6rem] text-primary/15 z-[1] pointer-events-none leading-relaxed hidden md:block"
        style={{ y: y2 }}
      >
        {`const dev = {\n  name: "Ernest",\n  status: "learning"\n}`}
      </motion.div>

      {/* Decorative big tag */}
      <motion.div
        className="absolute top-[10%] right-[6%] font-display text-[6rem] font-extrabold text-primary/[0.03] select-none z-[1] pointer-events-none"
        style={{ y: y1 }}
      >
        {"</>"}
      </motion.div>

      {/* Spinning rings */}
      <motion.div
        className="absolute top-[16%] left-[8%] w-20 h-20 rounded-full border border-dashed border-primary/10 z-[1] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-14 h-14 rounded-full border border-dashed border-accent/10 z-[1] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-2 flex flex-col md:flex-row items-center gap-10 md:gap-6"
      >
        {/* LEFT — text */}
        <div className="flex-1 flex flex-col items-start">
          {/* Status pill */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[10px] font-body text-accent/80 tracking-[0.35em] uppercase">
              Open to opportunities
            </span>
          </motion.div>

          {/* First name */}
          <div className="mb-1 overflow-hidden">
            <div className="flex flex-wrap">
              {firstName.split("").map((l, i) => (
                <motion.span
                  key={i}
                  className="font-display text-[clamp(2.8rem,9vw,8rem)] font-extrabold leading-[0.88] text-foreground"
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Last name */}
          <div className="overflow-hidden mb-4">
            <div className="flex flex-wrap">
              {lastName.split("").map((l, i) => (
                <motion.span
                  key={i}
                  className="font-display text-[clamp(1.8rem,6.5vw,5.5rem)] font-extrabold leading-[0.88] text-gradient-primary"
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i + firstName.length}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-primary/50 via-accent/30 to-transparent mb-5"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
            style={{ width: "100%", maxWidth: "340px" }}
          />

          {/* Tags */}
          <motion.div
            className="flex flex-wrap items-center gap-2 mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {[ "Web Developer"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-body tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-primary/15 text-primary/60 bg-primary/5"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-sm md:text-base text-muted-foreground max-w-sm font-body leading-relaxed mb-9"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            Fresh IT grad who enjoys turning ideas into{" "}
            <span className="text-foreground/80">clean, interactive interfaces</span>.
            I'm still growing — picking up new things on both the frontend and
            backend, one project at a time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            <MagneticButton
              className="relative px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wider uppercase overflow-hidden"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">View My Work</span>
            </MagneticButton>

            <MagneticButton
              className="px-7 py-3.5 rounded-full border border-border text-foreground font-display font-semibold text-xs tracking-wider uppercase hover:border-primary/40 transition-colors"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Say Hello
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT — photo */}
        <motion.div
          className="relative flex-shrink-0 flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ y: y1 }}
        >
          {/* Outer spinning ring with orbiting dot */}
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[370px] md:h-[370px] rounded-full border border-primary/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
              style={{ boxShadow: "0 0 8px hsl(15 85% 60% / 0.8)" }}
            />
          </motion.div>

          {/* Inner dashed ring */}
          <motion.div
            className="absolute w-[260px] h-[260px] md:w-[330px] md:h-[330px] rounded-full border border-dashed border-accent/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Corner brackets */}
          {[
            "top-4 left-4 border-t border-l",
            "top-4 right-4 border-t border-r",
            "bottom-4 left-4 border-b border-l",
            "bottom-4 right-4 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-5 h-5 border-primary/40 z-10 ${cls}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            />
          ))}

          {/* Photo */}
          <div
            className="relative w-[210px] h-[210px] md:w-[270px] md:h-[270px] rounded-full overflow-hidden border-2 border-primary/20 z-[2]"
            style={{
              boxShadow:
                "0 0 40px hsl(15 85% 60% / 0.12), 0 0 80px hsl(15 85% 60% / 0.05)",
            }}
          >
            {/* 👇 Replace /your-photo.jpg with your actual image in /public */}
            <img
              src="/src/assets/gallery/cdu.jpg"
              alt="Ernest Cabarrubias"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              style={{ display: imgError ? "none" : "block" }}
            />

            {/* Fallback initials */}
            {imgError && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-card gap-1">
                <span className="font-display text-5xl font-extrabold text-gradient-primary">
                  EC
                </span>
                <span className="text-[9px] text-muted-foreground tracking-widest uppercase font-body">
                  add your photo
                </span>
              </div>
            )}

            {/* Subtle overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, hsl(15 85% 60% / 0.07) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Floating badge — student */}
          
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
      >
        <span className="text-[10px] text-muted-foreground/40 tracking-[0.4em] uppercase font-body">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-primary/40 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;