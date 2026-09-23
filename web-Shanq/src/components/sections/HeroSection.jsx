import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { HERO_CONTENT, MOTION, PALETTE } from "../../constants";
import { FireflyField } from "../shared";

export default function HeroSection() {
  const petalCount =
    typeof window !== "undefined" && window.innerWidth <= 640
      ? MOTION.heroPetals.mobile
      : MOTION.heroPetals.desktop;

  const petals = useRef(
    Array.from({ length: petalCount }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 6,
      size: 8 + Math.random() * 10,
    }))
  ).current;

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-5 sm:px-6">
      <FireflyField count={MOTION.fireflies.hero} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {petals.map((p, i) => (
          <span
            key={i}
            className="hero-petal absolute rounded-full"
            style={{
              left: p.left,
              top: -20,
              width: p.size,
              height: p.size * 0.6,
              background: `radial-gradient(circle at 30% 30%, ${PALETTE.rose}, ${PALETTE.gold})`,
              opacity: 0.8,
              "--petal-duration": `${p.duration}s`,
              "--petal-delay": `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex justify-center mb-4"
        >
          <Star size={22} color={PALETTE.gold} />
        </motion.div>

        <p
          className="text-xs sm:text-sm tracking-wide mb-3"
          style={{ fontFamily: "'Quicksand', sans-serif", color: PALETTE.gold }}
        >
          {HERO_CONTENT.eyebrow}
        </p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: PALETTE.cream }}
        >
          {HERO_CONTENT.title}
          <br />
          <span style={{ color: PALETTE.gold }}>{HERO_CONTENT.name}</span>
        </h1>

        <p
          className="mt-6 text-sm sm:text-base md:text-lg opacity-80 leading-relaxed"
          style={{ fontFamily: "'Quicksand', sans-serif", color: PALETTE.cream }}
        >
          {HERO_CONTENT.description}
        </p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 sm:mt-14 text-xs tracking-widest opacity-60"
          style={{ color: PALETTE.cream }}
        >
          {HERO_CONTENT.scrollLabel}
        </motion.div>
      </motion.div>
    </section>
  );
}
