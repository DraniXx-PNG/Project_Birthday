import React, { useState } from "react";
import { motion } from "framer-motion";
import { Delete, LockKeyhole, RotateCcw } from "lucide-react";
import { LOCK_CONTENT, MOTION, PALETTE, SECRET_CODE } from "../../constants";
import { FireflyField } from "../shared";

export default function PhaseLock({ onUnlock }) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);

  /* =========================================================
     KEYPAD
     ========================================================= */

  const pressKey = (key) => {
    if (shake) return;

    /* DELETE */
    if (key === "delete") {
      setValue((current) => current.slice(0, -1));
      return;
    }

    /* CLEAR */
    if (key === "clear") {
      setValue("");
      return;
    }

    /* MAX 6 DIGIT */
    if (value.length < SECRET_CODE.length) {
      setValue((current) => current + key);
    }
  };

  /* =========================================================
     SUBMIT PIN
     ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value === SECRET_CODE) {
      onUnlock();
      return;
    }

    setShake(true);
    setValue("");

    setTimeout(() => {
      setShake(false);
    }, 600);
  };

  /* =========================================================
     KEYBOARD SUPPORT
     ========================================================= */

  const handleKeyDown = (e) => {
    if (/^[0-9]$/.test(e.key)) {
      pressKey(e.key);
    } else if (e.key === "Backspace") {
      pressKey("delete");
    } else if (e.key === "Escape") {
      pressKey("clear");
    } else if (e.key === "Enter" && value.length === SECRET_CODE.length) {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      key="phase-lock"
      className="
        relative z-10
        min-h-screen
        w-full
        flex flex-col
        items-center
        justify-center
        px-4 sm:px-6
        py-8 sm:py-10
        overflow-hidden
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(6px)",
      }}
      transition={{ duration: 0.8 }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >

      {/* =====================================================
          FIREFLIES
          ===================================================== */}

      <FireflyField count={MOTION.fireflies.lock} />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <motion.div
        initial={{
          y: -10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="
          relative
          flex flex-col
          items-center
          text-center
          w-full
          max-w-sm
        "
      >

        {/* ===================================================
            LOCK ICON
            =================================================== */}

        <motion.div
          animate={{
            opacity: [0.65, 1, 0.65],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="mb-5 rounded-2xl p-3 sm:p-3.5"
          style={{
            background:
              "linear-gradient(145deg, rgba(232,197,107,0.14), rgba(232,197,107,0.03))",

            border:
              `1px solid ${PALETTE.gold}35`,

            boxShadow:
              "0 12px 35px rgba(0,0,0,0.35), 0 0 28px rgba(232,197,107,0.08)",
          }}
        >
          <LockKeyhole
            size={30}
            className="sm:w-8 sm:h-8"
            color={PALETTE.gold}
            strokeWidth={1.4}
          />
        </motion.div>

        {/* ===================================================
            TITLE
            =================================================== */}

        <h1
          className="
            text-3xl
            sm:text-4xl
            mb-2
            leading-tight
          "
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",

            color:
              PALETTE.cream,
          }}
        >
          {LOCK_CONTENT.title}
        </h1>

        {/* ===================================================
            DESCRIPTION
            =================================================== */}

        <p
          className="
            mb-6
            sm:mb-7
            text-sm
            sm:text-base
            opacity-75
            leading-relaxed
            px-2
          "
          style={{
            fontFamily:
              "'Quicksand', sans-serif",

            color:
              PALETTE.cream,
          }}
        >
          {LOCK_CONTENT.description}
        </p>

        {/* ===================================================
            FORM
            =================================================== */}

        <motion.form
          onSubmit={handleSubmit}
          animate={
            shake
              ? {
                  x: [0, -12, 12, -8, 8, 0],
                }
              : {
                  x: 0,
                }
          }
          transition={{
            duration: 0.5,
          }}
          className="
            w-full
            max-w-[320px]
            flex flex-col
            items-center
          "
        >

          {/* =================================================
              PIN DISPLAY
              ================================================= */}

          <div
            className="
              w-full
              rounded-2xl
              px-4
              sm:px-5
              py-4
              mb-4
              sm:mb-5
            "
            style={{
              background:
                "linear-gradient(145deg, rgba(8,11,27,0.92), rgba(25,31,67,0.72))",

              border:
                `1px solid ${
                  shake
                    ? "#c96b6b88"
                    : `${PALETTE.gold}45`
                }`,

              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 40px rgba(0,0,0,0.3)",
            }}
          >

            <div
              className="
                flex
                justify-center
                gap-2.5
                sm:gap-4
              "
              aria-label="PIN entry"
            >

              {/* 6 DIGIT PIN */}

              {Array.from({ length: SECRET_CODE.length }, (_, index) => {
                const filled =
                  index < value.length;

                return (
                  <motion.span
                    key={index}
                    animate={
                      filled
                        ? {
                            scale: [
                              0.8,
                              1.15,
                              1,
                            ],
                          }
                        : {
                            scale: 1,
                          }
                    }
                    className="
                      w-3
                      h-3
                      sm:w-3.5
                      sm:h-3.5
                      rounded-full
                      shrink-0
                    "
                    style={{
                      background: filled
                        ? PALETTE.gold
                        : "transparent",

                      border:
                        `1px solid ${
                          filled
                            ? PALETTE.gold
                            : `${PALETTE.cream}55`
                        }`,

                      boxShadow: filled
                        ? `0 0 12px ${PALETTE.gold}80`
                        : "none",
                    }}
                  />
                );
              })}

            </div>
          </div>

          {/* =================================================
              KEYPAD
              ================================================= */}

          <div
            className="
              grid
              grid-cols-3
              gap-2
              sm:gap-2.5
              w-full
              p-2.5
              sm:p-3
              rounded-[22px]
              sm:rounded-[24px]
            "
            style={{
              background:
                "linear-gradient(145deg, rgba(18,23,48,0.9), rgba(6,9,22,0.94))",

              border:
                `1px solid ${PALETTE.gold}28`,

              boxShadow:
                "0 20px 55px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >

            {/* =================================================
                NUMBER 1 - 9
                ================================================= */}

            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
              (key) => (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() =>
                    pressKey(String(key))
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  className="
                    h-12
                    sm:h-14
                    rounded-xl
                    text-lg
                    sm:text-xl
                    select-none
                    touch-manipulation
                  "
                  style={{
                    fontFamily:
                      "'Quicksand', sans-serif",

                    color:
                      PALETTE.cream,

                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))",

                    border:
                      "1px solid rgba(244,236,216,0.10)",

                    boxShadow:
                      "0 4px 0 rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.035)",
                  }}
                >
                  {key}
                </motion.button>
              )
            )}

            {/* =================================================
                CLEAR
                ================================================= */}

            <motion.button
              type="button"
              onClick={() =>
                pressKey("clear")
              }
              whileTap={{
                scale: 0.94,
              }}
              className="
                h-12
                sm:h-14
                rounded-xl
                flex
                items-center
                justify-center
                text-[10px]
                sm:text-xs
                tracking-wider
                touch-manipulation
              "
              style={{
                fontFamily:
                  "'Quicksand', sans-serif",

                color:
                  `${PALETTE.cream}99`,

                background:
                  "rgba(255,255,255,0.025)",

                border:
                  "1px solid rgba(244,236,216,0.07)",
              }}
            >
              <RotateCcw
                size={14}
                className="mr-1.5"
              />

              CLEAR
            </motion.button>

            {/* =================================================
                ZERO
                ================================================= */}

            <motion.button
              type="button"
              onClick={() =>
                pressKey("0")
              }
              whileTap={{
                scale: 0.94,
              }}
              className="
                h-12
                sm:h-14
                rounded-xl
                text-lg
                sm:text-xl
                touch-manipulation
              "
              style={{
                fontFamily:
                  "'Quicksand', sans-serif",

                color:
                  PALETTE.cream,

                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))",

                border:
                  "1px solid rgba(244,236,216,0.10)",

                boxShadow:
                  "0 4px 0 rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.035)",
              }}
            >
              0
            </motion.button>

            {/* =================================================
                DELETE
                ================================================= */}

            <motion.button
              type="button"
              onClick={() =>
                pressKey("delete")
              }
              whileTap={{
                scale: 0.94,
              }}
              className="
                h-12
                sm:h-14
                rounded-xl
                flex
                items-center
                justify-center
                touch-manipulation
              "
              style={{
                color:
                  `${PALETTE.cream}99`,

                background:
                  "rgba(255,255,255,0.025)",

                border:
                  "1px solid rgba(244,236,216,0.07)",
              }}
              aria-label="Delete last digit"
            >
              <Delete size={18} />
            </motion.button>

          </div>

          {/* =================================================
              UNLOCK BUTTON
              ================================================= */}

          <motion.button
            type="submit"
            disabled={value.length !== SECRET_CODE.length}
            whileHover={
              value.length === SECRET_CODE.length
                ? { scale: 1.03 }
                : {}
            }
            whileTap={
              value.length === SECRET_CODE.length
                ? { scale: 0.97 }
                : {}
            }
            className="
              mt-4
              sm:mt-5
              w-full
              h-11
              sm:h-12
              rounded-xl
              text-sm
              tracking-wide
              transition-opacity
              touch-manipulation
            "
            style={{
              fontFamily:
                "'Quicksand', sans-serif",

              background:
                value.length === SECRET_CODE.length
                  ? `linear-gradient(135deg, ${PALETTE.gold}, #b98f3e)`
                  : "rgba(232,197,107,0.12)",

              color:
                value.length === SECRET_CODE.length
                  ? "#241a05"
                  : `${PALETTE.cream}45`,

              border:
                `1px solid ${
                  value.length === SECRET_CODE.length
                    ? PALETTE.gold
                    : `${PALETTE.gold}20`
                }`,

              boxShadow:
                value.length === SECRET_CODE.length
                  ? `0 8px 25px ${PALETTE.gold}25`
                  : "none",
            }}
          >
            {LOCK_CONTENT.unlockLabel}
          </motion.button>

        </motion.form>

        {/* ===================================================
            HINT
            =================================================== */}

        <p
          className="
            mt-4
            text-[11px]
            sm:text-xs
            opacity-40
          "
          style={{
            fontFamily:
              "'Quicksand', sans-serif",

            color:
              PALETTE.cream,
          }}
        >
          {LOCK_CONTENT.hint}
        </p>

        {/* ===================================================
            ERROR MESSAGE
            =================================================== */}

        {shake && (
          <motion.p
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-3 text-xs"
            style={{
              color: "#e2a3a3",
            }}
          >
            {LOCK_CONTENT.error}
          </motion.p>
        )}

      </motion.div>

    </motion.div>
  );
}