/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { ArrowUpRight, Mail } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import ContactModal from "./ContactModal";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Cduken",
    icon: FaGithub,
    // GitHub: dark charcoal
    color: "hover:text-[#e6edf3] hover:border-[#e6edf3]/40",
    glow: "bg-[#e6edf3]/5",
    iconColor: "group-hover:text-[#e6edf3]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ernestojr-cabarrubias-3154342a1/",
    icon: FaLinkedin,
    // LinkedIn: brand blue
    color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40",
    glow: "bg-[#0A66C2]/5",
    iconColor: "group-hover:text-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cdukenzxc",
    icon: FaInstagram,
    // Instagram: pink/magenta
    color: "hover:text-[#E1306C] hover:border-[#E1306C]/40",
    glow: "bg-[#E1306C]/5",
    iconColor: "group-hover:text-[#E1306C]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/cdukenzxc",
    icon: FaFacebook,
    // Facebook: brand blue
    color: "hover:text-[#1877F2] hover:border-[#1877F2]/40",
    glow: "bg-[#1877F2]/5",
    iconColor: "group-hover:text-[#1877F2]",
  },
];

const Contact = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const currentYear = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.95, 1]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        className="max-w-5xl mx-auto text-center"
        style={{ rotateX: rotate, scale, perspective: 1000 }}
      >
        {/* Eyebrow */}
        <ScrollReveal>
          <span className="text-sm font-body text-primary tracking-[0.3em] uppercase mb-8 block">
            03 / Get in Touch
          </span>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8">
            Let's create
            <br />
            <span className="text-gradient-primary">something</span>
            <br />
            extraordinary.
          </h2>
        </ScrollReveal>

        {/* Subline */}
        <ScrollReveal delay={0.2}>
          <p className="text-muted-foreground font-body text-lg max-w-md mx-auto mb-14">
            Have a project in mind? I'd love to hear about it. Let's discuss how
            we can work together.
          </p>
        </ScrollReveal>

        {/* CTA Button */}
        <ScrollReveal delay={0.3}>
          <div className="flex justify-center mb-20">
            <MagneticButton
              onClick={() => setContactOpen(true)}
              className="group relative flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-display font-bold text-base tracking-wider uppercase overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-accent"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary-foreground/15 group-hover:rotate-12 transition-transform duration-300">
                <Mail className="w-4 h-4" />
              </span>
              <span className="relative z-10">Say Hello</span>
              <motion.span
                className="relative z-10"
                initial={{ x: -6, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={0.4}>
          <div className="flex justify-center flex-wrap gap-3">
            {SOCIALS.map(
              ({ label, href, icon: Icon, color, glow, iconColor }) => {
                const isHovered = hoveredSocial === label;
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onHoverStart={() => setHoveredSocial(label)}
                    onHoverEnd={() => setHoveredSocial(null)}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`group relative flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm text-sm font-body text-muted-foreground transition-colors duration-200 cursor-pointer ${color}`}
                  >
                    {/* Platform icon with wiggle */}
                    <motion.span
                      animate={
                        isHovered
                          ? { rotate: [0, -10, 10, 0], scale: 1.2 }
                          : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.35 }}
                      className={`flex items-center transition-colors duration-200 ${iconColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.span>

                    {/* Label */}
                    <span>{label}</span>

                    {/* External arrow on hover */}
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={
                        isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }
                      }
                      transition={{ duration: 0.15 }}
                      className="flex items-center"
                    >
                      <ArrowUpRight className="w-3 h-3" />
                    </motion.span>

                    {/* Brand-colored glow backdrop */}
                    <motion.div
                      className={`absolute inset-0 rounded-full ${glow}`}
                      initial={{ opacity: 0 }}
                      animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                );
              },
            )}
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
