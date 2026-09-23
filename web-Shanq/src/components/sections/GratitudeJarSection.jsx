import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { GRATITUDE_CONTENT, PALETTE } from "../../constants";
import { SectionHeading } from "../shared";

export default function GratitudeJarSection() {
  const [message, setMessage] = useState(null);
  const [shaking, setShaking] = useState(false);
  const timerRef = useRef(null);

  const shakeJar = () => {
    if (shaking) return;

    setShaking(true);
    setMessage(null);

    timerRef.current = window.setTimeout(() => {
      const reasons = GRATITUDE_CONTENT.reasons;
      const random = reasons[Math.floor(Math.random() * reasons.length)];
      setMessage(random);
      setShaking(false);
    }, 700);
  };

  React.useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return (
    <section className="relative min-h-[90svh] flex flex-col items-center justify-center px-5 sm:px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md text-center"
      >
        <SectionHeading eyebrow={GRATITUDE_CONTENT.eyebrow}>
          {GRATITUDE_CONTENT.title}
        </SectionHeading>

        <motion.div
          animate={
            shaking
              ? { rotate: [0, -8, 8, -6, 6, 0], x: [0, -4, 4, -3, 3, 0] }
              : {}
          }
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 relative flex items-center justify-center"
          style={{ width: 120, height: 140 }}
        >
          <div
            className="absolute inset-0 rounded-b-[40px] rounded-t-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(232,197,107,0.15), rgba(63,111,86,0.25))",
              border: `1.5px solid ${PALETTE.gold}88`,
              boxShadow: `0 0 35px -4px ${PALETTE.gold}55`,
            }}
          />
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-t-md"
            style={{
              width: 44,
              height: 14,
              background: PALETTE.forestDeep,
              border: `1px solid ${PALETTE.gold}66`,
            }}
          />
          <Heart
            size={30}
            color={PALETTE.gold}
            className="relative z-10 opacity-80"
          />
        </motion.div>

        <button
          type="button"
          onClick={shakeJar}
          className="mb-8 px-7 py-2.5 rounded-full text-sm tracking-wide transition-transform hover:scale-105 active:scale-95 touch-manipulation"
          style={{
            fontFamily: "'Quicksand', sans-serif",
            background: `linear-gradient(135deg, ${PALETTE.forest}, ${PALETTE.forestDeep})`,
            color: PALETTE.cream,
            border: `1px solid ${PALETTE.gold}55`,
          }}
        >
          {GRATITUDE_CONTENT.button}
        </button>

        <div className="min-h-[110px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                key={message}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="px-6 py-5 rounded-2xl italic"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  color: PALETTE.cream,
                  background: "rgba(232,197,107,0.1)",
                  border: `1px solid ${PALETTE.gold}55`,
                }}
              >
                {GRATITUDE_CONTENT.prefix} {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
