import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 80 },
  { name: "Tailwind CSS", level: 70 },
  { name: "JavaScript", level: 60 },
  { name: "React", level: 50 },
  { name: "VueJS", level: 50 },
  { name: "Node.js", level: 70 },
  { name: "PHP", level: 80 },
  { name: "Laravel", level: 80 },
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
          {/* Left column - asymmetric */}
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
                Although I’m just starting my professional journey, I’m highly
                motivated to learn, improve my skills, and contribute my best to
                every project. I’m excited to gain real-world experience and
                grow as a developer while working with modern web technologies.
              </p>
            </ScrollReveal>
          </div>

          {/* Right column - skills */}
          <div className="md:col-span-7">
            <ScrollReveal delay={0.3}>
              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <ScrollReveal key={skill.name} delay={0.1 * i}>
                    <div className="group">
                      <div className="flex justify-between mb-2">
                        <span className="font-body text-sm text-foreground">
                          {skill.name}
                        </span>
                        <span className="font-body text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-px bg-border relative overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: 0.2 + i * 0.1,
                            ease: [0.25, 0.4, 0.25, 1],
                          }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

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
