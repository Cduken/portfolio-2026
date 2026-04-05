//ContactForm.tsx

import {
  AnimatePresence,
  motion,
  easeOut,
  easeIn,
  cubicBezier,
} from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ── EmailJS Configuration ──────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_69y1nre";
const EMAILJS_TEMPLATE_ID = "template_iryycln";
const EMAILJS_PUBLIC_KEY = "haBwul-5ELHqN2sgY";
// ─────────────────────────────────────────────────────────────────

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: easeIn } },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 8,
    transition: { duration: 0.2, ease: easeIn },
  },
};

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        onOpenChange(false);
        setStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setStatus({
        type: "error",
        message:
          "Failed to send message. Please try again or email me directly.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {/* Animated backdrop */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => onOpenChange(false)}
          />

          {/* Animated content panel - FIXED CENTERING */}
          <DialogContent
            className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] p-0 overflow-hidden bg-card border-border shadow-2xl"
            onInteractOutside={(e) => {
              e.preventDefault();
              onOpenChange(false);
            }}
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-8"
            >
              <DialogHeader className="space-y-2">
                <DialogTitle className="font-display text-2xl font-bold text-foreground">
                  Let's Talk<span className="text-gradient-primary">.</span>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground font-body text-sm">
                  Fill out the form and I'll get back to you soon.
                </DialogDescription>
              </DialogHeader>

              <div className="flex gap-4 mt-4 mb-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                  <Mail className="w-3 h-3 text-primary" />
                  hello@dev.com
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                  <MapPin className="w-3 h-3 text-accent" />
                  Remote
                </div>
              </div>

              {/* Status Message */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 p-3 rounded-lg text-sm font-body ${
                    status.type === "success"
                      ? "bg-green-500/10 text-green-600 border border-green-500/20"
                      : "bg-red-500/10 text-red-600 border border-red-500/20"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  {
                    delay: 0.1,
                    field: "name",
                    type: "text",
                    placeholder: "Your name",
                  },
                  {
                    delay: 0.15,
                    field: "email",
                    type: "email",
                    placeholder: "Your email",
                  },
                ].map(({ delay, field, type, placeholder }) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay }}
                  >
                    <input
                      type={type}
                      placeholder={placeholder}
                      required
                      value={formData[field as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      disabled={isSending}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <textarea
                    placeholder="Tell me about your project..."
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    disabled={isSending}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wider uppercase py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
