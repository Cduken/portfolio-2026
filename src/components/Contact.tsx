/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import ContactModal from "./ContactModal";

const Contact = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const sectionRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.95, 1]);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-6 overflow-hidden">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        style={{ rotateX: rotate, scale, perspective: 1000 }}
      >
        <ScrollReveal>
          <span className="text-sm font-body text-primary tracking-[0.3em] uppercase mb-8 block">
            03 / Get in Touch
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8">
            Let's create
            <br />
            <span className="text-gradient-primary">something</span>
            <br />
            extraordinary.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-muted-foreground font-body text-lg max-w-md mx-auto mb-12">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <MagneticButton
            className="group relative mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm tracking-wider uppercase overflow-hidden flex items-center justify-center"
            onClick={() => setContactOpen(true)}
          >
            <span className="relative z-10">Say Hello</span>
            <motion.div
              className="absolute inset-0 rounded-full bg-accent"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          </MagneticButton>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={0.4}>
          <div className="flex justify-center gap-8 mt-20">
            {["GitHub", "LinkedIn", "Twitter", "Dribbble"].map((social, i) => (
              <motion.a
                key={social}
                href="#"
                className="text-sm text-muted-foreground font-body hover:text-primary transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {social}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="max-w-6xl mx-auto mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-xs text-muted-foreground font-body">
          © {currentYear} — Ernest Cabarrubias
        </span>
        <span className="text-xs text-muted-foreground font-body">
          Built with React, Framer Motion & Tailwind
        </span>
      </motion.div>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default Contact;