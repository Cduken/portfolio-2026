import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Dialog, DialogContent } from "./ui/dialog";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop", alt: "Coding workspace", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop", alt: "Laptop coding", span: "" },
  { id: 3, src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop", alt: "Monitor with code", span: "" },
  { id: 4, src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop", alt: "Office space", span: "" },
  { id: 5, src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&h=400&fit=crop", alt: "Creative setup", span: "md:col-span-2" },
  { id: 6, src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop", alt: "Team work", span: "" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="gallery" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span className="text-sm font-body text-primary tracking-[0.3em] uppercase mb-8 block">
            02.5 / Gallery
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-16">
            Behind the
            <span className="text-gradient-primary"> scenes</span>.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {galleryImages.map((img, i) => (
            <ScrollReveal key={img.id} delay={i * 0.08}>
              <motion.div
                className={`relative rounded-lg overflow-hidden cursor-pointer group h-full ${img.span}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-body text-foreground tracking-wider uppercase">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl p-2 bg-card border-border">
          {selected && (
            <motion.img
              src={selected.src.replace("w=600", "w=1200").replace("w=400", "w=1200")}
              alt={selected.alt}
              className="w-full h-auto rounded-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
