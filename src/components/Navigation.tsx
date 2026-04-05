import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 150);
    setScrolled(latest > 50);
  });

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-colors duration-300 ${
        scrolled ? "backdrop-blur-md bg-background/80" : ""
      }`}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.a
        href="#"
        className="font-display font-bold text-lg text-foreground"
        whileHover={{ scale: 1.05 }}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        CDUKEN<span className="text-primary">.</span>
      </motion.a>

      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors relative"
            onClick={() => scrollTo(item.href)}
            whileHover={{ y: -1 }}
          >
            {item.label}
            <motion.span
              className="absolute -bottom-1 left-0 h-px bg-primary"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
