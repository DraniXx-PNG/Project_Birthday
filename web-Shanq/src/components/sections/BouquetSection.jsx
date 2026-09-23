import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BOUQUET_CONTENT, MOTION } from "../../constants";

/* ============================================================
   PARTICLE
   ============================================================ */

function Particle({ particle }) {
  return (
    <motion.span
      className="
        pointer-events-none
        fixed
        z-[9999]
        select-none
      "
      style={{
        left: `${particle.x}px`,
        top: `${particle.y}px`,
        fontSize: `${particle.size}px`,
        lineHeight: 1,
      }}
      initial={{
        opacity: 0,
        scale: 0.3,
        x: "-50%",
        y: "-50%",
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.35, 1, 0.65],
        x: `calc(-50% + ${particle.moveX}px)`,
        y: `calc(-50% + ${particle.moveY}px)`,
        rotate: particle.rotate,
      }}
      transition={{
        duration: particle.duration,
        ease: "easeOut",
      }}
    >
      {particle.emoji}
    </motion.span>
  );
}

/* ============================================================
   FLOWER
   ============================================================ */

function Flower({
  emoji,
  name,
  index,
  position,
  active,
  onHover,
  onHoverEnd,
  onClick,
}) {
  return (
    /*
      ==========================================================
      OUTER WRAPPER

      PENTING:

      left/top = titik pusat bunga

      translate(-50%, -50%)
      = pivot tepat berada di tengah.

      Framer Motion TIDAK digunakan pada wrapper.
      ==========================================================
    */

    <div
      className="
        absolute
        z-[100]
      "
      style={{
        left: position.left,
        top: position.top,

        width: `${position.size}px`,
        height: `${position.size}px`,

        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.button
        type="button"
        aria-label={`Buka pesan ${name}`}
        className="
          relative
          flex
          h-full
          w-full
          cursor-pointer
          select-none
          items-center
          justify-center
          border-0
          bg-transparent
          p-0
          outline-none
          touch-manipulation
        "
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: active ? 1.12 : 1,
        }}
        transition={{
          opacity: {
            duration: 0.55,
            delay: index * 0.08,
          },

          scale: {
            duration: 0.2,
          },
        }}
        whileHover={{
          scale: 1.12,
        }}
        whileTap={{
          scale: 0.86,
        }}
        onMouseEnter={onHover}
        onMouseLeave={onHoverEnd}
        onFocus={onHover}
        onClick={(event) => onClick(event)}
      >
        {/* ==================================================
            GLOW
           ================================================== */}

        {active && (
          <motion.div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              -z-10
              h-[90px]
              w-[90px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              
              blur-2xl
            "
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1.15,
            }}
            transition={{
              duration: 0.3,
            }}
          />
        )}

        {/* ==================================================
            FLOWER EMOJI

            Flex center memastikan emoji tepat di tengah
            wrapper/button.
           ================================================== */}

        <span
          className="
            relative
            block
          "
          style={{
            fontSize: `${position.size}px`,
            lineHeight: 1,

            fontFamily:
              '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',

            filter:
              "drop-shadow(0 5px 6px rgba(0,0,0,0.35))",
          }}
        >
          {emoji}
        </span>

        {/* ==================================================
            SMALL ACTIVE SPARKLES

            Hanya 2 sparkle kecil ketika aktif.
           ================================================== */}

        {active && (
          <>
            <motion.span
              className="
                pointer-events-none
                absolute
                -right-3
                -top-3
                text-lg
              "
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.1, 0.5],
                rotate: [0, 20, 40],
              }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
              }}
            >
              ✨
            </motion.span>

            <motion.span
              className="
                pointer-events-none
                absolute
                -bottom-2
                -left-3
                text-sm
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [3, -4, -9],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            >
              ⭐
            </motion.span>
          </>
        )}
      </motion.button>
    </div>
  );
}

/* ============================================================
   BOUQUET
   ============================================================ */

function Bouquet() {
  return (
    <div
      className="
        absolute
        bottom-0
        left-1/2
        h-[230px]
        w-[280px]
      "
      style={{
        transform: "translateX(-50%)",
      }}
    >
      {/* ======================================================
          CENTER STEM
         ====================================================== */}

      <motion.div
        className="
          absolute
          bottom-[18px]
          left-1/2
          h-[190px]
          w-[7px]
          -translate-x-1/2
          rounded-full
          bg-green-700
        "
        initial={{
          scaleY: 0,
        }}
        animate={{
          scaleY: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        style={{
          transformOrigin: "bottom",
        }}
      />

      {/* ======================================================
          LEFT STEM
         ====================================================== */}

      <motion.div
        className="
          absolute
          bottom-[18px]
          left-[40%]
          h-[165px]
          w-[6px]
          -rotate-[18deg]
          rounded-full
          bg-green-600
        "
        initial={{
          scaleY: 0,
        }}
        animate={{
          scaleY: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
        }}
        style={{
          transformOrigin: "bottom",
        }}
      />

      {/* ======================================================
          RIGHT STEM
         ====================================================== */}

      <motion.div
        className="
          absolute
          bottom-[18px]
          right-[40%]
          h-[165px]
          w-[6px]
          rotate-[18deg]
          rounded-full
          bg-green-600
        "
        initial={{
          scaleY: 0,
        }}
        animate={{
          scaleY: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.5,
        }}
        style={{
          transformOrigin: "bottom",
        }}
      />

      {/* ======================================================
          FAR LEFT STEM
         ====================================================== */}

      <motion.div
        className="
          absolute
          bottom-[18px]
          left-[29%]
          h-[135px]
          w-[5px]
          -rotate-[30deg]
          rounded-full
          bg-green-600
        "
        initial={{
          scaleY: 0,
        }}
        animate={{
          scaleY: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.6,
        }}
        style={{
          transformOrigin: "bottom",
        }}
      />

      {/* ======================================================
          FAR RIGHT STEM
         ====================================================== */}

      <motion.div
        className="
          absolute
          bottom-[18px]
          right-[29%]
          h-[135px]
          w-[5px]
          rotate-[30deg]
          rounded-full
          bg-green-600
        "
        initial={{
          scaleY: 0,
        }}
        animate={{
          scaleY: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.7,
        }}
        style={{
          transformOrigin: "bottom",
        }}
      />

      {/* ======================================================
          LEAVES
         ====================================================== */}

      <motion.div
        className="
          absolute
          bottom-[92px]
          left-[24%]
          h-[55px]
          w-[24px]
          -rotate-[45deg]
          rounded-full
          bg-green-500
        "
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.8,
        }}
      />

      <motion.div
        className="
          absolute
          bottom-[115px]
          left-[36%]
          h-[50px]
          w-[22px]
          -rotate-[28deg]
          rounded-full
          bg-green-600
        "
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.9,
        }}
      />

      <motion.div
        className="
          absolute
          bottom-[92px]
          right-[24%]
          h-[55px]
          w-[24px]
          rotate-[45deg]
          rounded-full
          bg-green-500
        "
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 1,
        }}
      />

      <motion.div
        className="
          absolute
          bottom-[115px]
          right-[36%]
          h-[50px]
          w-[22px]
          rotate-[28deg]
          rounded-full
          bg-green-600
        "
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 1.1,
        }}
      />

      {/* ======================================================
          WRAPPER
         ====================================================== */}

      <motion.div
        className="
          absolute
          bottom-0
          left-1/2
          h-[78px]
          w-[155px]
          -translate-x-1/2
        "
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.6,
        }}
      >
        {/* wrapper body */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-pink-300
            to-pink-500
            shadow-lg
          "
          style={{
            clipPath:
              "polygon(4% 0, 96% 0, 82% 100%, 18% 100%)",

            borderRadius:
              "12px 12px 35px 35px",
          }}
        />

        {/* wrapper shine */}

        <div
          className="
            absolute
            left-1/2
            top-[7px]
            h-[55px]
            w-[30px]
            -translate-x-1/2
            rounded-full
            bg-white/20
          "
        />

        {/* ==================================================
            RIBBON
           ================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-[16px]
            z-10
            -translate-x-1/2
          "
        >
          <div
            className="
              relative
              h-[20px]
              w-[20px]
              rounded-full
              bg-pink-600
            "
          >
            <div
              className="
                absolute
                right-[7px]
                top-[2px]
                h-[20px]
                w-[48px]
                -rotate-[25deg]
                rounded-full
                bg-pink-500
              "
            />

            <div
              className="
                absolute
                left-[7px]
                top-[2px]
                h-[20px]
                w-[48px]
                rotate-[25deg]
                rounded-full
                bg-pink-500
              "
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   MAIN
   ============================================================ */

export default function BouquetSection({ onComplete }) {
  /*
    hovered:
    bunga yang sedang di-hover mouse.

    selected:
    bunga yang terakhir diklik/tap.

    Dengan dua state ini:
    - desktop hover bisa menampilkan pesan
    - click bisa membuat pesan tetap terbuka
    - mobile tap tetap bekerja
  */

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const [particles, setParticles] = useState([]);

  /* ==========================================================
     ALWAYS 8 FLOWERS
     ========================================================== */

  const bouquetFlowers = BOUQUET_CONTENT.flowers;

  /* ==========================================================
     CREATE PARTICLES
     
     SEKARANG PARTICLE MENGGUNAKAN
     getBoundingClientRect()

     Jadi koordinat particle benar-benar
     berasal dari posisi bunga di layar.

     Bukan lagi menggunakan:
        50%
        31%
        dll.

     Ini yang membuat particle tepat
     muncul dari tengah bunga.
     ========================================================== */

  const createParticles = (index, buttonElement) => {
    if (!buttonElement) return;

    const rect =
      buttonElement.getBoundingClientRect();

    /*
      Titik tengah button.

      Karena wrapper dan button sudah
      dibuat center, ini juga menjadi
      titik tengah emoji.
    */

    const originX =
      rect.left + rect.width / 2;

    const originY =
      rect.top + rect.height / 2;

    const flowerEmoji =
      BOUQUET_CONTENT.flowers[index].emoji;

    const generated = [];

    /* ========================================================
       FLOWER PARTICLES

       Hanya 6 supaya ringan.
       ======================================================== */

    for (let i = 0; i < MOTION.bouquetParticles.flowers; i++) {
      const angle =
        (Math.PI * 2 * i) / MOTION.bouquetParticles.flowers +
        (Math.random() - 0.5) * 0.5;

      const distance =
        45 + Math.random() * 80;

      generated.push({
        id:
          `flower-${Date.now()}-${i}-${Math.random()}`,

        emoji:
          flowerEmoji,

        x:
          originX,

        y:
          originY,

        moveX:
          Math.cos(angle) * distance,

        moveY:
          Math.sin(angle) * distance -
          35,

        rotate:
          (Math.random() - 0.5) * 180,

        size:
          11 + Math.random() * 9,

        duration:
          0.9 + Math.random() * 0.35,
      });
    }

    /* ========================================================
       STAR PARTICLES

       Hanya 5.
       ======================================================== */

    for (let i = 0; i < MOTION.bouquetParticles.stars; i++) {
      const angle =
        (Math.PI * 2 * i) / MOTION.bouquetParticles.stars +
        0.5;

      const distance =
        60 + Math.random() * 95;

      generated.push({
        id:
          `star-${Date.now()}-${i}-${Math.random()}`,

        emoji:
          i % 2 === 0
            ? "✨"
            : "⭐",

        x:
          originX,

        y:
          originY,

        moveX:
          Math.cos(angle) * distance,

        moveY:
          Math.sin(angle) * distance -
          45,

        rotate:
          (Math.random() - 0.5) * 180,

        size:
          10 + Math.random() * 9,

        duration:
          0.85 + Math.random() * 0.4,
      });
    }

    /*
      Ganti particle sebelumnya.

      Jadi tidak ada particle menumpuk
      kalau user spam click.
    */

    setParticles(generated);

    /*
      Hapus particle setelah animasi selesai.
    */

    window.setTimeout(() => {
      setParticles([]);
    }, 1500);
  };

  /* ==========================================================
     FLOWER CLICK / TAP
     ========================================================== */

  const handleFlowerClick = (
    index,
    event
  ) => {
    setSelected(index);

    createParticles(
      index,
      event.currentTarget
    );
  };

  /* ==========================================================
     CURRENT ACTIVE FLOWER

     Hover mempunyai prioritas ketika mouse
     sedang berada di atas bunga.

     Kalau tidak sedang hover,
     gunakan bunga terakhir yang diklik.
     ========================================================== */

  const active =
    hovered !== null
      ? hovered
      : selected;

  const activeFlower =
    active !== null
      ? bouquetFlowers[active]
      : null;

  /* ==========================================================
     RETURN
     ========================================================== */

  return (
    <section
      className="
        relative
        flex
        min-h-screen
        w-full
        flex-col
        items-center
        overflow-hidden
        bg-transparent
      "
    >
      {/* ======================================================
          PARTICLES
         ====================================================== */}

      <AnimatePresence>
        {particles.map(
          (particle) => (
            <Particle
              key={particle.id}
              particle={particle}
            />
          )
        )}
      </AnimatePresence>

      {/* ======================================================
          CONTENT
         ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          max-w-4xl
          flex-col
          items-center
          px-5
          pb-10
          pt-12
        "
      >
        {/* ==================================================
            LABEL
           ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mb-4
            flex
            items-center
            gap-3
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-[#e8c56b]/70
          "
        >
          <span>—</span>

          <span>
            {BOUQUET_CONTENT.eyebrow}
          </span>

          <span>—</span>
        </motion.div>

        {/* ==================================================
            TITLE
           ================================================== */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            text-center
            font-serif
            text-5xl
            font-light
            tracking-tight
            text-[#f4ecd8]
            sm:text-6xl
          "
        >
          {BOUQUET_CONTENT.title}
        </motion.h1>

        {/* ==================================================
            SUBTITLE
           ================================================== */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            mt-4
            text-center
            text-sm
            text-[#d9a5ad]/80
            sm:text-base
          "
        >
          {BOUQUET_CONTENT.subtitle}
        </motion.p>

        {/* ==================================================
            FLOWER AREA
           ================================================== */}

        <div
          className="
            relative
            mt-8
            h-[500px]
            w-full
            max-w-[600px]
          "
        >
          {/* =================================================
              8 FLOWERS
             ================================================= */}

          {bouquetFlowers.map(
            (
              flower,
              index
            ) => {
              const position =
                BOUQUET_CONTENT.positions[index];

              return (
                <Flower
                  key={`${flower.id}-${index}`}
                  emoji={
                    BOUQUET_CONTENT.flowers[index].emoji
                  }
                  name={
                    flower.name
                  }
                  index={
                    index
                  }
                  position={
                    position
                  }
                  active={
                    active === index
                  }
                  onHover={() => {
                    setHovered(index);
                  }}
                  onHoverEnd={() => {
                    setHovered(null);
                  }}
                  onClick={(event) => {
                    handleFlowerClick(
                      index,
                      event
                    );
                  }}
                />
              );
            }
          )}

          {/* =================================================
              BOUQUET
             ================================================= */}

          <Bouquet />
        </div>

        {/* ==================================================
            MESSAGE
           ================================================== */}

        <div
          className="
            relative
            z-[150]
            min-h-[130px]
            w-full
            max-w-[500px]
          "
        >
          <AnimatePresence
            mode="wait"
          >
            {activeFlower ? (
              <motion.div
                key={
                  activeFlower.id
                }
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="
                  rounded-[22px]
                  border
                  border-[#e8c56b]/20
                  bg-black/20
                  px-7
                  py-6
                  text-center
                  shadow-xl
                  backdrop-blur-md
                "
              >
                {/* flower name */}

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <span className="text-xl">
                    {
                      BOUQUET_CONTENT.flowers[active].emoji
                    }
                  </span>

                  <span
                    className="
                      text-xs
                      uppercase
                      tracking-[0.25em]
                      text-[#e8c56b]
                    "
                  >
                    {
                      activeFlower.name
                    }
                  </span>

                  <span className="text-xl">
                    {
                      BOUQUET_CONTENT.flowers[active].emoji
                    }
                  </span>
                </div>

                {/* message */}

                <p
                  className="
                    font-serif
                    text-lg
                    italic
                    leading-relaxed
                    text-[#f4ecd8]
                    sm:text-xl
                  "
                >
                  “
                  {
                    activeFlower.message
                  }
                  ”
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="
                  flex
                  min-h-[110px]
                  items-center
                  justify-center
                  rounded-[22px]
                  border
                  border-[#e8c56b]/15
                  bg-black/10
                  px-6
                  text-center
                  backdrop-blur-sm
                "
              >
                <p
                  className="
                    font-serif
                    text-base
                    italic
                    leading-relaxed
                    text-[#d9a5ad]
                    sm:text-lg
                  "
                >
                  {BOUQUET_CONTENT.emptyMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ==================================================
            INSTRUCTION
           ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
          }}
          className="
            mt-7
            flex
            items-center
            gap-3
            text-xs
            tracking-wide
            text-[#e8c56b]/60
          "
        >
          <span>✦</span>

          <span className="hidden sm:inline">
            {BOUQUET_CONTENT.instructionDesktop}
          </span>

          <span className="sm:hidden">
            {BOUQUET_CONTENT.instructionMobile}
          </span>

          <span>✦</span>
        </motion.div>
      </div>

      {/* ======================================================
          NEXT BUTTON
         ====================================================== */}

      {onComplete && (
        <motion.button
          type="button"
          onClick={onComplete}
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 1.8,
          }}
          className="
            absolute
            bottom-5
            right-5
            z-[400]
            rounded-full
            bg-[#f4ecd8]
            px-5
            py-2.5
            text-sm
            font-semibold
            text-[#0d1230]
            shadow-lg
            transition
            hover:scale-105
            active:scale-95
          "
        >
          {BOUQUET_CONTENT.continueLabel}
        </motion.button>
      )}
    </section>
  );
}