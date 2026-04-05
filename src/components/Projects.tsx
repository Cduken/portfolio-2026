import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ProjectModal, { type Project } from "./projects/ProjectModal";

const projects: Project[] = [
  {
    id: 1,
    title: "ShopEase",
    subtitle: "E-Commerce Platform",
    description:
      "A secure e-commerce platform for mobile phones with authentication, where users must log in to place orders. It features an admin dashboard to manage phone stocks and categories, providing full control over product inventory and listings. This project was developed as a mini capstone and is not yet deployed.",
    tags: ["Laravel", "PHP", "Node.js", "MySQL"],
    color: "from-primary/20 to-accent/10",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
    ],
  },
  {
    id: 2,
    title: "AquaTrack",
    subtitle: "Clarin Water Management System",
    description:
  "An AquaTrack platform that allows residents of Clarin, Bohol to report water-related issues, track their reports, and monitor monthly billings and meter readings through their accounts. It also includes an admin dashboard with a map view to locate and manage reported issues in real time.",
    tags: ["VueJS", "InertiaJS", "Tailwind", "NodeJS", "MySQL"],
    color: "from-accent/20 to-primary/10",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80",
    ],
  },
  {
    id: 3,
    title: "DILG RSS",
    subtitle: "Report Submission System",
    description:
      "An award-winning agency site featuring immersive scroll-driven narratives, WebGL transitions, and micro-interactions.",
    tags: ["ReactJS", "InertiaJS", "MySQL"],
    color: "from-primary/15 to-secondary",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
    ],
  },
  {
    id: 4,
    title: "Aether",
    subtitle: "SaaS Platform",
    description:
      "A sophisticated project management tool with real-time collaboration, beautiful charts, and drag-and-drop workflows.",
    tags: ["React", "Socket.io", "PostgreSQL"],
    color: "from-accent/15 to-muted",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    ],
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span className="text-sm font-body text-primary tracking-[0.3em] uppercase mb-4 block">
            02 / Selected Work
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-20">
            Featured
            <span className="text-gradient-primary"> Projects</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <motion.div
                className="group relative cursor-pointer border-t border-border"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                onClick={() => setModalProject(project)}
                layout
              >
                <div className="relative py-8 md:py-10 px-4 overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0`}
                    animate={{ opacity: activeProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-6 md:gap-12">
                      <span className="text-xs text-muted-foreground font-body hidden md:block w-12">
                        {project.year}
                      </span>
                      <motion.h3
                        className="font-display text-2xl md:text-4xl font-bold"
                        animate={{ x: activeProject === project.id ? 20 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.title}
                      </motion.h3>
                      <span className="text-sm text-muted-foreground font-body hidden md:block">
                        {project.subtitle}
                      </span>
                    </div>

                    <motion.div
                      className="flex items-center gap-4"
                      animate={{ x: activeProject === project.id ? -10 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="hidden md:flex gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <motion.span
                        className="text-xl"
                        animate={{
                          rotate: activeProject === project.id ? 45 : 0,
                          scale: activeProject === project.id ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        ↗
                      </motion.span>
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {activeProject === project.id && (
                      <motion.div
                        className="relative z-10 md:pl-[7.5rem]"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.4, 0.25, 1],
                        }}
                      >
                        <p className="text-sm text-muted-foreground font-body max-w-lg pt-2 pb-2">
                          {project.description}
                        </p>
                        <span className="text-xs text-primary/60 font-body tracking-widest uppercase pb-4 block">
                          Click to view gallery →
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>

      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            project={modalProject}
            onClose={() => setModalProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
