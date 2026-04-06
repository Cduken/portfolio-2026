import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "./useChat";

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [forward, setForward] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    const atEnd = forward && indexRef.current === text.length;
    const atStart = !forward && indexRef.current === 0;

    const delay = atEnd ? 1800 : atStart ? 600 : forward ? 80 : 40;

    const timeout = setTimeout(() => {
      if (atEnd) {
        setForward(false);
        return;
      }
      if (atStart) {
        setForward(true);
        return;
      }
      if (forward) {
        indexRef.current += 1;
      } else {
        indexRef.current -= 1;
      }
      setDisplayed(text.slice(0, indexRef.current));
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayed, forward, text]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        style={{ color: "hsl(15 85% 60%)" }}
      >
        |
      </motion.span>
    </span>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, loading, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, hsl(15 85% 60%), hsl(35 90% 55%))",
          color: "hsl(220 14% 6%)",
          fontSize: "22px",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
          boxShadow:
            "0 0 24px hsl(15 85% 60% / 0.35), 0 4px 16px rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {open ? "✕" : "💬"}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              position: "fixed",
              bottom: "96px",
              right: "28px",
              width: "340px",
              height: "500px",
              background: "hsl(220 12% 10%)",
              border: "1px solid hsl(220 10% 18%)",
              borderRadius: "20px",
              boxShadow:
                "0 0 40px hsl(15 85% 60% / 0.08), 0 24px 64px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              zIndex: 999,
              overflow: "hidden",
              fontFamily: "var(--font-body)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 18px",
                borderBottom: "1px solid hsl(220 10% 18%)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "hsl(220 12% 10%)",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, hsl(15 85% 60%), hsl(35 90% 55%))",
                  boxShadow: "0 0 8px hsl(15 85% 60% / 0.6)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "hsl(40 20% 92%)",
                  letterSpacing: "0.01em",
                }}
              >
                <TypewriterText text="Hello, Ask me anything" />
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "11px",
                  color: "hsl(220 10% 50%)",
                  fontFamily: "var(--font-body)",
                }}
              >
                DukenAI
              </span>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px 12px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                scrollbarWidth: "thin",
                scrollbarColor: "hsl(220 10% 20%) transparent",
              }}
            >
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  style={{
                    textAlign: "center",
                    marginTop: "2rem",
                    padding: "0 12px",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                    👋
                  </div>
                  <p
                    style={{
                      color: "hsl(220 10% 50%)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                    }}
                  >
                    Hi! I'm Cduken's AI assistant.
                    <br />
                    Ask me about projects, skills, or experience.
                  </p>
                  {/* Suggestion chips */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      justifyContent: "center",
                      marginTop: "14px",
                    }}
                  >
                    {[
                      "What are your skills?",
                      "Show me projects",
                      "How to contact?",
                    ].map((q) => (
                      <motion.button
                        key={q}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => sendMessage(q)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          background: "hsl(220 10% 16%)",
                          border: "1px solid hsl(220 10% 22%)",
                          color: "hsl(40 20% 75%)",
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                    }}
                  >
                    <div
                      style={{
                        padding: "9px 13px",
                        borderRadius: "14px",
                        fontSize: "13px",
                        lineHeight: 1.55,
                        ...(m.role === "user"
                          ? {
                              background:
                                "linear-gradient(135deg, hsl(15 85% 60%), hsl(35 90% 55%))",
                              color: "hsl(220 14% 6%)",
                              borderBottomRightRadius: "4px",
                              fontWeight: 500,
                            }
                          : {
                              background: "hsl(220 10% 16%)",
                              color: "hsl(40 20% 88%)",
                              border: "1px solid hsl(220 10% 20%)",
                              borderBottomLeftRadius: "4px",
                            }),
                      }}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      alignSelf: "flex-start",
                      background: "hsl(220 10% 16%)",
                      border: "1px solid hsl(220 10% 20%)",
                      borderRadius: "14px",
                      borderBottomLeftRadius: "4px",
                      padding: "10px 14px",
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "hsl(15 85% 60%)",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px",
                borderTop: "1px solid hsl(220 10% 18%)",
                display: "flex",
                gap: "8px",
                background: "hsl(220 12% 10%)",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something..."
                style={{
                  flex: 1,
                  padding: "9px 13px",
                  borderRadius: "10px",
                  border: "1px solid hsl(220 10% 22%)",
                  background: "hsl(220 10% 14%)",
                  color: "hsl(40 20% 92%)",
                  fontSize: "13px",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                }}
              />
              <motion.button
                onClick={handleSend}
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                style={{
                  padding: "9px 16px",
                  background:
                    "linear-gradient(135deg, hsl(15 85% 60%), hsl(35 90% 55%))",
                  color: "hsl(220 14% 6%)",
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
