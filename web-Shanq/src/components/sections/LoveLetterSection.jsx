import React from "react";
import { motion } from "framer-motion";
import { Heart, Feather } from "lucide-react";
import { LOVE_LETTER_CONTENT, MOTION, PALETTE } from "../../constants";
import { FireflyField } from "../shared";

export default function LoveLetterSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-4 py-24 sm:py-28 overflow-hidden">
      <FireflyField count={MOTION.fireflies.loveLetter} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(217,165,173,.09), transparent 38%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="text-center mb-9">
          <p
            className="text-[11px] tracking-[.3em] uppercase mb-2"
            style={{ fontFamily: "'Quicksand', sans-serif", color: PALETTE.gold }}
          >
            {LOVE_LETTER_CONTENT.eyebrow}
          </p>

          <h2
            className="text-4xl sm:text-5xl italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: PALETTE.cream }}
          >
            {LOVE_LETTER_CONTENT.title}
          </h2>
        </div>

        <div className="relative mx-auto max-w-[790px]">
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[92%] h-28 rounded-b-[18px]"
            style={{
              background: "linear-gradient(145deg, #8c3447, #5d2031)",
              boxShadow: "0 28px 45px rgba(0,0,0,.4)",
            }}
          />

          <motion.article
            initial={{ rotate: -1.3 }}
            whileInView={{ rotate: -0.35 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 0, y: -3 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2px]"
            style={{
              color: "#493523",
              background:
                "radial-gradient(ellipse at 14% 10%, rgba(255,255,255,.65), transparent 22%), radial-gradient(ellipse at 88% 84%, rgba(111,70,31,.10), transparent 32%), repeating-linear-gradient(0deg, rgba(95,65,33,.025) 0 1px, transparent 1px 4px), linear-gradient(105deg, #f5e8ca, #ead9b8 48%, #f2e4c6)",
              border: "1px solid rgba(105,72,36,.30)",
              boxShadow:
                "0 30px 65px rgba(0,0,0,.48), 0 5px 10px rgba(0,0,0,.22), inset 0 0 55px rgba(100,65,30,.10)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow:
                  "inset 12px 0 20px rgba(95,59,25,.055), inset -12px 0 20px rgba(95,59,25,.055), inset 0 -18px 25px rgba(95,59,25,.07)",
              }}
            />

            <div
              className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,70,74,.10), transparent 65%)",
              }}
            />

            <div className="relative px-6 py-8 sm:px-12 sm:py-10 md:px-16 md:py-14">
              <div className="flex items-start justify-between mb-8 gap-4">
                <div>
                  <p
                    className="text-3xl italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {LOVE_LETTER_CONTENT.greeting}
                  </p>
                  <div
                    className="w-20 h-px mt-2"
                    style={{ background: "rgba(91,58,28,.3)" }}
                  />
                </div>
                <Feather size={21} className="opacity-45 rotate-12 shrink-0" />
              </div>

              <div
                className="whitespace-pre-line text-[17px] sm:text-[18px] md:text-[19px] leading-[1.9]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  textShadow: "0 .2px 0 rgba(50,30,10,.25)",
                }}
              >
                {LOVE_LETTER_CONTENT.body}
              </div>

              <div className="mt-10 flex items-end justify-between gap-6">
                <div>
                  <p className="text-sm italic opacity-60">
                    {LOVE_LETTER_CONTENT.signoff}
                  </p>
                  <p
                    className="text-3xl italic mt-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {LOVE_LETTER_CONTENT.sender}
                  </p>
                </div>
                <Heart size={22} className="opacity-60 shrink-0" fill="currentColor" />
              </div>
            </div>

            {[...Array(24)].map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: i % 4 === 0 ? 2 : 1,
                  height: i % 4 === 0 ? 2 : 1,
                  left: `${5 + ((i * 37) % 90)}%`,
                  top: `${4 + ((i * 53) % 91)}%`,
                  background: "rgba(73,48,24,.11)",
                }}
              />
            ))}
          </motion.article>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, type: "spring" }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle at 35% 28%, #b95768, #711f35 70%)",
              border: "3px solid rgba(82,19,37,.65)",
              boxShadow:
                "0 7px 14px rgba(0,0,0,.35), inset 2px 2px 5px rgba(255,255,255,.12)",
            }}
          >
            <Heart
              size={22}
              color="#f1cfd3"
              fill="rgba(241,207,211,.15)"
            />
          </motion.div>
        </div>

        <p
          className="text-center mt-12 text-xs opacity-40 italic"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: PALETTE.cream,
          }}
        >
          {LOVE_LETTER_CONTENT.footerNote}
        </p>
      </motion.div>
    </section>
  );
}
