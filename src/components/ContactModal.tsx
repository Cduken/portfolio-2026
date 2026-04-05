import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold text-foreground">
            Let's Talk<span className="text-gradient-primary">.</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-body text-sm">
            Fill out the form and I'll get back to you soon.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 mt-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
            <Mail className="w-3 h-3 text-primary" />
            hello@dev.com
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
            <MapPin className="w-3 h-3 text-accent" />
            Remote
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <input
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <input
              type="email"
              placeholder="Your email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <textarea
              placeholder="Tell me about your project..."
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wider uppercase py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Send Message
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;