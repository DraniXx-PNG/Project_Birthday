import React from "react";
import { motion } from "framer-motion";
import { PALETTE, STORY_CONTENT } from "../../constants";

export default function OurStorySection() {
  return (
    <section className="relative w-full overflow-hidden px-5 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto mb-16 sm:mb-20 max-w-4xl text-center"
      >
        <div
          className="mb-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.35em]"
          style={{ color: `${PALETTE.gold}b3` }}
        >
          <span>—</span>
          <span>{STORY_CONTENT.eyebrow}</span>
          <span>—</span>
        </div>

        <h2
          className="font-serif text-4xl font-light tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: PALETTE.cream }}
        >
          {STORY_CONTENT.title}
        </h2>

        <p
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed sm:text-base"
          style={{ color: `${PALETTE.rose}b3` }}
        >
          {STORY_CONTENT.description}
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-5xl">
        <div
          className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 md:block"
          style={{
            background: `linear-gradient(to bottom, transparent, ${PALETTE.gold}4d, transparent)`,
          }}
        />

        <div className="space-y-10 sm:space-y-12 md:space-y-20">
          {STORY_CONTENT.items.map((story, index) => {
            const isRight = index % 2 === 0;

            return (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16"
              >
                <div
                  className="absolute left-1/2 top-10 z-20 hidden h-3 w-3 -translate-x-1/2 rounded-full md:block"
                  style={{
                    background: PALETTE.gold,
                    boxShadow: `0 0 18px ${PALETTE.gold}b3`,
                  }}
                />

                <div
                  className={isRight ? "hidden md:block" : "hidden md:block md:order-2"}
                />

                <div
                  className={isRight ? "md:col-start-2" : "md:col-start-1"}
                >
                  <div
                    className="relative rounded-[22px] border bg-black/15 px-6 py-6 sm:px-7 sm:py-7 shadow-xl backdrop-blur-md transition duration-300 hover:bg-black/20"
                    style={{ borderColor: `${PALETTE.gold}26` }}
                  >
                    <div className="mb-5 text-2xl">{story.icon}</div>

                    <div
                      className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em]"
                      style={{ color: PALETTE.rose }}
                    >
                      {story.label}
                    </div>

                    <h3
                      className="font-serif text-2xl font-medium sm:text-3xl"
                      style={{ color: PALETTE.cream }}
                    >
                      {story.title}
                    </h3>

                    <p
                      className="mt-4 text-sm leading-7 sm:text-base"
                      style={{ color: `${PALETTE.rose}a6` }}
                    >
                      {story.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
