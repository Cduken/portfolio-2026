import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
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

const skills = [
  { name: "HTML", Icon: SiHtml5, color: "#E44D26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Vue JS", Icon: SiVuedotjs, color: "#42B883" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "PHP", Icon: SiPhp, color: "#8892BF" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
];

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Parallax background text */}
      <motion.div
        className="absolute top-20 left-0 font-display text-[8rem] md:text-[12rem] font-extrabold text-muted/30 whitespace-nowrap select-none pointer-events-none"
        style={{ x: xLeft }}
      >
        ABOUT ME — ABOUT ME —
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left column */}
          <div className="md:col-span-5 md:mt-20">
            <ScrollReveal>
              <span className="text-sm font-body text-primary tracking-[0.3em] uppercase mb-4 block">
                01 / About
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
                Building the web,
                <br />
                <span className="text-gradient-primary">one pixel</span>
                <br />
                at a time.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                I'm a fresh graduate passionate about front-end development,
                eager to build clean, responsive, and user-friendly web
                experiences. I enjoy turning ideas into interactive interfaces
                that balance both design and functionality.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                Although I'm just starting my professional journey, I'm highly
                motivated to learn, improve my skills, and contribute my best to
                every project. I'm excited to gain real-world experience and
                grow as a developer while working with modern web technologies.
              </p>
            </ScrollReveal>
          </div>

          {/* Right column — My Stack */}
          <div className="md:col-span-7">
            <ScrollReveal delay={0.2}>
              <span className="text-sm font-body text-primary tracking-[0.3em] uppercase mb-6 block">
                My Stack
              </span>
            </ScrollReveal>

            <div className="grid grid-cols-3 gap-3">
              {skills.map((skill, i) => (
                <ScrollReveal key={skill.name} delay={0.05 * i}>
                  <motion.div
                    className="group relative flex flex-col items-center justify-center gap-2.5 py-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm cursor-default overflow-hidden"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    {/* Subtle brand-color glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                      style={{
                        background: `radial-gradient(ellipse at 50% 60%, ${skill.color}18 0%, transparent 70%)`,
                      }}
                    />

                    {/* Icon */}
                    <skill.Icon
                      size={32}
                      style={{ color: skill.color }}
                      className="relative z-10 transition-transform duration-200 group-hover:scale-110"
                    />

                    {/* Label */}
                    <span className="relative z-10 font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200 text-center leading-tight px-2">
                      {skill.name}
                    </span>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-border"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {[
                { number: "10+", label: "Projects" },
                { number: "1+", label: "Years" },
                { number: "3", label: "Ongoing Projects" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-3xl md:text-4xl font-bold text-gradient-primary">
                    {stat.number}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-1 tracking-wider uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom parallax text */}
      <motion.div
        className="absolute bottom-10 right-0 font-display text-[6rem] md:text-[10rem] font-extrabold text-muted/20 whitespace-nowrap select-none pointer-events-none"
        style={{ x: xRight }}
      >
        WEB — DEVELOPER —
      </motion.div>
    </section>
  );
};

export default About;
