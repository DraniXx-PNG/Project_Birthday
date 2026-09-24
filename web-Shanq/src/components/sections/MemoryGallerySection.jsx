import React from "react";
import { motion } from "framer-motion";
import { MEMORY_CONTENT, PALETTE } from "../../constants";
import { SectionHeading } from "../shared";

const MEMORY_IMAGES = [
  "/images/Foto1.jpeg",
  "/images/Foto2.jpeg",
  "/images/Foto3.jpeg",
  "/images/Foto4.jpeg",
  "/images/Foto5.jpeg",
  "/images/Foto6.jpeg",
];

export default function MemoryGallerySection() {
  return (
    <section className="relative min-h-[95svh] flex flex-col items-center justify-center px-5 sm:px-6 py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl"
      >
        <SectionHeading eyebrow={MEMORY_CONTENT.eyebrow}>
          {MEMORY_CONTENT.title}
        </SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
          {MEMORY_IMAGES.map((image, i) => (
            <motion.div
              key={image}
              initial={{
                opacity: 0,
                y: 40,
                rotate: i % 2 === 0 ? -4 : 4,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: i % 2 === 0 ? -2 : 2,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                rotate: 0,
                scale: 1.03,
              }}
              className="relative rounded-xl p-2"
              style={{
                background: "rgba(13,18,48,0.6)",
                border: `1px solid ${PALETTE.gold}44`,
                boxShadow: `0 0 30px -6px ${PALETTE.gold}33`,
              }}
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-[#11172f]">
                <img
                  src={image}
                  alt={`Memory ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-[1.02]"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}