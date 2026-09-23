import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FOOTER_CONTENT, MOTION, PALETTE } from "../../constants";
import { FireflyField, VineDivider } from "../shared";

function FallingParticle({ particle }) {
  return (
    <div
      className="birthday-falling-particle pointer-events-none fixed z-[90]"
      style={{
        left: `${particle.x}px`,
        top: `${particle.y}px`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        fontSize: `${particle.size}px`,
        lineHeight: 1,
        "--fall-distance": `${particle.fallDistance}px`,
        "--rotation": `${particle.rotation}deg`,
        "--duration": `${particle.duration}s`,
        "--delay": `${particle.delay}s`,
        "--particle-size": `${particle.size}px`,
      }}
    >
      {particle.emoji}
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const [showBirthday, setShowBirthday] = useState(false);
  const [particles, setParticles] = useState([]);
  const timerRef = useRef(null);
  const particleTimerRef = useRef(null);

  const createBirthdayParticles = () => {
    const isMobile = window.innerWidth <= 640;
    const count = isMobile
      ? MOTION.footerParticles.mobile
      : MOTION.footerParticles.desktop;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const generated = [];

    for (let i = 0; i < count; i++) {
      generated.push({
        id: `${Date.now()}-${i}-${Math.random()}`,
        x: Math.random() * Math.max(0, screenWidth - 20),
        y: -30 - Math.random() * 180,
        fallDistance: screenHeight + 250 + Math.random() * 250,
        emoji:
          FOOTER_CONTENT.particleEmojis[
            Math.floor(Math.random() * FOOTER_CONTENT.particleEmojis.length)
          ],
        delay: Math.random() * MOTION.footerParticles.delayRange,
        duration:
          MOTION.footerParticles.durationMin +
          Math.random() * MOTION.footerParticles.durationRange,
        rotation:
          (Math.random() > 0.5 ? 1 : -1) *
          (MOTION.footerParticles.rotationMin +
            Math.random() * MOTION.footerParticles.rotationRange),
        size:
          MOTION.footerParticles.sizeMin +
          Math.random() * MOTION.footerParticles.sizeRange,
      });
    }

    setParticles(generated);

    clearTimeout(particleTimerRef.current);
    particleTimerRef.current = window.setTimeout(() => {
      setParticles([]);
    }, 8500);
  };

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setShowBirthday(true);
          }, 500);
        }
      },
      { threshold: [0.55] }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTimeout(timerRef.current);
      clearTimeout(particleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!showBirthday) {
      setParticles([]);
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(createBirthdayParticles, 120);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [showBirthday]);

  useEffect(() => {
    if (!showBirthday) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowBirthday(false);
        setParticles([]);
        clearTimeout(particleTimerRef.current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showBirthday]);

  const closeBirthday = () => {
    setShowBirthday(false);
    setParticles([]);
    clearTimeout(particleTimerRef.current);
  };

  return (
    <footer
      ref={footerRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 sm:px-6 py-20 text-center snap-start overflow-hidden"
      style={{ scrollSnapAlign: "start" }}
    >
      <FireflyField count={MOTION.fireflies.footer} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(217,165,173,.10), transparent 34%), radial-gradient(circle at 50% 80%, rgba(232,197,107,.06), transparent 28%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-2xl px-2"
      >
        <VineDivider />

        <div className="mt-7 mb-4 flex items-center justify-center gap-3 opacity-65">
          <Sparkles size={13} style={{ color: PALETTE.gold }} />
          <span
            className="text-[9px] sm:text-[10px] tracking-[.28em] sm:tracking-[.38em] uppercase"
            style={{ color: PALETTE.gold }}
          >
            {FOOTER_CONTENT.eyebrow}
          </span>
          <Sparkles size={13} style={{ color: PALETTE.gold }} />
        </div>

        <h2
          className="text-4xl sm:text-5xl md:text-6xl leading-[.95] mb-5"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: PALETTE.gold,
          }}
        >
          {FOOTER_CONTENT.titleLine1}
          <br />
          {FOOTER_CONTENT.titleLine2}
        </h2>

        <p
          className="text-sm opacity-70 mt-6"
          style={{
            fontFamily: "'Quicksand', sans-serif",
            color: PALETTE.cream,
          }}
        >
          {FOOTER_CONTENT.signature} <span aria-hidden="true">♡</span>
        </p>
      </motion.div>

      <AnimatePresence>
        {particles.map((particle) => (
          <FallingParticle key={particle.id} particle={particle} />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {showBirthday && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="birthday-popup-title"
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ type: "spring", stiffness: 170, damping: 18 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[calc(100vw-32px)] sm:w-[86vw] md:w-[60vw] max-w-[820px] min-h-[420px] max-h-[calc(100svh-32px)] rounded-[26px] sm:rounded-[30px] px-6 py-7 sm:px-10 sm:py-10 text-center flex flex-col items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(44,22,35,.97), rgba(13,15,31,.98))",
              border: "1px solid rgba(232,197,107,.38)",
              boxShadow:
                "0 25px 90px rgba(0,0,0,.62), 0 0 45px rgba(217,165,173,.10)",
            }}
          >
            <motion.div
              className="mb-5 sm:mb-7 flex items-center justify-center"
              initial={{ opacity: 0, y: -12, scale: 0.7 }}
              animate={{
                opacity: 1,
                y: [0, -5, 0, -3, 0],
                scale: 1,
                rotate: [0, -3, 3, -2, 0],
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5, type: "spring", stiffness: 180 },
                y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <span className="text-6xl sm:text-7xl md:text-8xl" aria-hidden="true">
                🎂
              </span>
            </motion.div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={13} style={{ color: PALETTE.gold }} />
              <p
                className="text-[9px] sm:text-[10px] tracking-[.2em] sm:tracking-[.25em] uppercase"
                style={{ color: PALETTE.rose }}
              >
                {FOOTER_CONTENT.popupLabel}
              </p>
              <Sparkles size={13} style={{ color: PALETTE.gold }} />
            </div>

            <h3
              id="birthday-popup-title"
              className="text-4xl sm:text-5xl md:text-6xl leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: PALETTE.cream,
              }}
            >
              {FOOTER_CONTENT.popupTitle}
            </h3>

            <p
              className="mt-4 sm:mt-5 text-sm opacity-65"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                color: PALETTE.cream,
              }}
            >
              {FOOTER_CONTENT.popupSubtitle}
            </p>

            <motion.button
              type="button"
              onClick={closeBirthday}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-7 sm:mt-8 min-w-[105px] px-6 py-3 rounded-full text-xs font-medium tracking-wide transition-all touch-manipulation"
              style={{
                color: PALETTE.cream,
                background: "rgba(217,165,173,.12)",
                border: "1px solid rgba(217,165,173,.32)",
                fontFamily: "'Quicksand', sans-serif",
              }}
            >
              {FOOTER_CONTENT.close}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
