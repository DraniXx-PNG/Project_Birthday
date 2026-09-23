import React, {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Sparkles,
} from "lucide-react";

import {
  PALETTE,
} from "../../constants";

import {
  FireflyField,
  VineDivider,
} from "../shared";


// ============================================================
// PHASE GIFT
// ============================================================

export default function PhaseGift({
  onOpened,
}) {

  const [opening, setOpening] =
    useState(false);


  // ==========================================================
  // CLICK GIFT
  // ==========================================================

  const handleClick = () => {

    if (opening) {
      return;
    }


    // ========================================================
    // PENTING:
    //
    // onOpened DIPANGGIL LANGSUNG DARI EVENT CLICK.
    //
    // Ini memungkinkan App.jsx memulai audio
    // tanpa terkena autoplay restriction browser.
    // ========================================================

    if (onOpened) {
      onOpened();
    }


    // Setelah audio dimulai,
    // jalankan animasi gift.

    setOpening(true);

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <motion.div
      className="
        fixed
        inset-0
        z-[200]
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
      "
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      style={{
        background:
          `radial-gradient(
            ellipse at 50% 40%,
            ${PALETTE.night2},
            ${PALETTE.night} 75%
          )`,
      }}
    >

      {/* ====================================================
          BACKGROUND
      ==================================================== */}

      <FireflyField
        count={18}
      />


      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(232,197,107,.08), transparent 35%)",
        }}
      />


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          px-5
          text-center
        "
      >

        {/* ==================================================
            LABEL
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            mb-5
            flex
            items-center
            gap-3
            text-[10px]
            sm:text-xs
            uppercase
            tracking-[.35em]
          "
          style={{
            color:
              `${PALETTE.gold}bb`,
          }}
        >

          <span>—</span>

          <span>
            A Little Surprise
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
            duration: 0.9,
            delay: 0.1,
          }}
          className="
            font-serif
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-light
            tracking-tight
          "
          style={{
            color:
              PALETTE.cream,
          }}
        >
          I have something
          <br />
          <span
            style={{
              color:
                PALETTE.gold,
            }}
          >
            for you
          </span>
        </motion.h1>


        {/* ==================================================
            DIVIDER
        ================================================== */}

        <VineDivider />


        {/* ==================================================
            GIFT
        ================================================== */}

        <motion.button
          type="button"
          onClick={
            handleClick
          }
          disabled={opening}
          aria-label="Open your gift"
          className="
            relative
            mt-8
            sm:mt-10
            flex
            h-[210px]
            w-[210px]
            sm:h-[250px]
            sm:w-[250px]
            items-center
            justify-center
            rounded-full
            outline-none
            touch-manipulation
          "
          whileHover={
            !opening
              ? {
                  scale: 1.04,
                }
              : {}
          }
          whileTap={
            !opening
              ? {
                  scale: 0.96,
                }
              : {}
          }
        >

          {/* ================================================
              OUTER GLOW
          ================================================ */}

          <motion.div
            className="
              absolute
              inset-0
              rounded-full
            "
            animate={
              opening
                ? {
                    scale: [
                      1,
                      1.15,
                      1.4,
                    ],
                    opacity: [
                      0.35,
                      0.5,
                      0,
                    ],
                  }
                : {
                    scale: [
                      1,
                      1.06,
                      1,
                    ],
                    opacity: [
                      0.2,
                      0.35,
                      0.2,
                    ],
                  }
            }
            transition={
              opening
                ? {
                    duration: 1.2,
                    ease: "easeOut",
                  }
                : {
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            style={{
              background:
                `radial-gradient(
                  circle,
                  ${PALETTE.gold}55,
                  transparent 65%
                )`,
              filter:
                "blur(10px)",
            }}
          />


          {/* ================================================
              GIFT BOX
          ================================================ */}

          <motion.div
            className="
              relative
              h-[120px]
              w-[130px]
              sm:h-[140px]
              sm:w-[150px]
            "
            animate={
              opening
                ? {
                    scale: [
                      1,
                      1.05,
                      1.15,
                      1.4,
                    ],
                    opacity: [
                      1,
                      1,
                      0.8,
                      0,
                    ],
                    y: [
                      0,
                      -5,
                      -15,
                      -35,
                    ],
                  }
                : {
                    y: [
                      0,
                      -5,
                      0,
                    ],
                  }
            }
            transition={
              opening
                ? {
                    duration: 1.25,
                    ease: "easeInOut",
                  }
                : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >

            {/* BOX BODY */}

            <div
              className="
                absolute
                bottom-0
                left-1/2
                h-[78%]
                w-[86%]
                -translate-x-1/2
                rounded-b-[16px]
                rounded-t-[8px]
              "
              style={{
                background:
                  "linear-gradient(145deg, #d9a5ad, #8c5361)",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,.4)",
              }}
            />


            {/* BOX LID */}

            <motion.div
              className="
                absolute
                left-1/2
                top-[12%]
                h-[25%]
                w-full
                -translate-x-1/2
                rounded-[10px]
              "
              animate={
                opening
                  ? {
                      y: -45,
                      rotate:
                        -8,
                    }
                  : {}
              }
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              style={{
                background:
                  "linear-gradient(145deg, #e7b8c0, #a66372)",
                boxShadow:
                  "0 10px 20px rgba(0,0,0,.3)",
              }}
            />


            {/* GOLD RIBBON VERTICAL */}

            <div
              className="
                absolute
                left-1/2
                top-[12%]
                bottom-0
                w-[20px]
                -translate-x-1/2
              "
              style={{
                background:
                  `linear-gradient(
                    90deg,
                    #9d6e34,
                    ${PALETTE.gold},
                    #9d6e34
                  )`,
              }}
            />


            {/* GOLD RIBBON HORIZONTAL */}

            <div
              className="
                absolute
                left-[7%]
                right-[7%]
                top-[27%]
                h-[17px]
              "
              style={{
                background:
                  `linear-gradient(
                    180deg,
                    #9d6e34,
                    ${PALETTE.gold},
                    #9d6e34
                  )`,
              }}
            />


            {/* BOW */}

            <motion.div
              className="
                absolute
                left-1/2
                top-[1%]
                h-[32px]
                w-[52px]
                -translate-x-1/2
              "
              animate={
                opening
                  ? {
                      y: -48,
                      opacity: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.65,
              }}
            >

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[18px]
                  w-[18px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  z-10
                "
                style={{
                  background:
                    PALETTE.gold,
                }}
              />

              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-[26px]
                  w-[30px]
                  rounded-full
                  -rotate-[28deg]
                "
                style={{
                  background:
                    PALETTE.gold,
                }}
              />

              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-[26px]
                  w-[30px]
                  rounded-full
                  rotate-[28deg]
                "
                style={{
                  background:
                    PALETTE.gold,
                }}
              />

            </motion.div>

          </motion.div>


          {/* ================================================
              SPARKLES
          ================================================ */}

          <AnimatePresence>

            {opening && (

              <>
                {Array.from(
                  { length: 14 }
                ).map(
                  (_, i) => {

                    const angle =
                      (i / 14) *
                      Math.PI *
                      2;

                    const distance =
                      100 +
                      (i % 3) *
                        35;

                    return (

                      <motion.div
                        key={i}
                        className="
                          absolute
                          left-1/2
                          top-1/2
                          pointer-events-none
                        "
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 1,
                          scale: 0.4,
                        }}
                        animate={{
                          x:
                            Math.cos(
                              angle
                            ) *
                            distance,

                          y:
                            Math.sin(
                              angle
                            ) *
                            distance,

                          opacity: 0,

                          scale: 1.3,
                        }}
                        transition={{
                          duration:
                            1.1,

                          ease:
                            "easeOut",
                        }}
                      >

                        <Sparkles
                          size={
                            14 +
                            (i % 3) *
                              5
                          }
                          style={{
                            color:
                              i % 2 ===
                              0
                                ? PALETTE.gold
                                : PALETTE.firefly,
                          }}
                        />

                      </motion.div>

                    );

                  }
                )}

              </>

            )}

          </AnimatePresence>

        </motion.button>


        {/* ==================================================
            INSTRUCTION
        ================================================== */}

        <AnimatePresence mode="wait">

          {!opening ? (

            <motion.p
              key="closed"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 0.65,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.6,
              }}
              className="
                mt-7
                text-sm
                tracking-wide
              "
              style={{
                color:
                  PALETTE.cream,
                fontFamily:
                  "'Quicksand', sans-serif",
              }}
            >
              Tap the gift to open it
            </motion.p>

          ) : (

            <motion.p
              key="opening"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 0.7,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                mt-7
                text-sm
                tracking-wide
              "
              style={{
                color:
                  PALETTE.gold,
                fontFamily:
                  "'Quicksand', sans-serif",
              }}
            >
              Something special is waiting...
            </motion.p>

          )}

        </AnimatePresence>

      </div>

    </motion.div>

  );

}