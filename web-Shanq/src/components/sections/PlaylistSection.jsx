import React, {
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Music2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Disc3,
  Volume2,
  VolumeX,
} from "lucide-react";

import {
  PALETTE,
  PLAYLIST_CONTENT,
} from "../../constants";

import {
  SectionHeading,
} from "../shared";


// ============================================================
// MAIN
// ============================================================

export default function PlaylistSection({

  audioRef,

  current,

  playing,

  muted,

  song,

  songs,

  onTogglePlay,

  onSelectSong,

  onNext,

  onPrevious,

  onToggleMute,

}) {

  // ==========================================================
  // LOCAL UI
  // ==========================================================

  const [progress, setProgress] =
    React.useState(0);

  const [duration, setDuration] =
    React.useState(0);

  const [liked, setLiked] =
    useState(false);


  // ==========================================================
  // WAVEFORM
  // ==========================================================

  const bars = useMemo(
    () =>
      Array.from(
        { length: 24 },
        (_, i) =>
          0.25 +
          ((i * 17) % 100) / 130
      ),
    []
  );


  // ==========================================================
  // AUDIO TIME UPDATE
  //
  // Playlist membaca audio GLOBAL
  // ==========================================================

  React.useEffect(() => {

    const audio =
      audioRef?.current;

    if (!audio) {
      return;
    }


    const updateProgress = () => {

      if (!song) {
        return;
      }


      const start =
        song.startTime || 0;


      const end =
        song.endTime != null
          ? Math.min(
              song.endTime,
              audio.duration
            )
          : audio.duration;


      const clipDuration =
        Number.isFinite(end)
          ? Math.max(
              0,
              end - start
            )
          : 0;


      const currentProgress =
        Math.max(
          0,
          audio.currentTime - start
        );


      setDuration(
        clipDuration
      );


      setProgress(
        Math.min(
          currentProgress,
          clipDuration
        )
      );

    };


    audio.addEventListener(
      "timeupdate",
      updateProgress
    );

    audio.addEventListener(
      "loadedmetadata",
      updateProgress
    );


    updateProgress();


    return () => {

      audio.removeEventListener(
        "timeupdate",
        updateProgress
      );

      audio.removeEventListener(
        "loadedmetadata",
        updateProgress
      );

    };

  }, [
    audioRef,
    song,
  ]);


  // ==========================================================
  // SEEK
  // ==========================================================

  const seek = (event) => {

    const audio =
      audioRef?.current;

    if (
      !audio ||
      !duration ||
      !song
    ) {
      return;
    }


    const rect =
      event.currentTarget
        .getBoundingClientRect();


    const ratio =
      Math.min(
        1,
        Math.max(
          0,
          (event.clientX -
            rect.left) /
            rect.width
        )
      );


    const start =
      song.startTime || 0;


    const targetTime =
      start +
      ratio * duration;


    audio.currentTime =
      targetTime;


    setProgress(
      targetTime - start
    );

  };


  // ==========================================================
  // FORMAT TIME
  // ==========================================================

  const formatTime = (
    seconds
  ) => {

    if (
      !Number.isFinite(seconds)
    ) {

      return "0:00";

    }


    return `${Math.floor(
      seconds / 60
    )}:${String(
      Math.floor(
        seconds % 60
      )
    ).padStart(2, "0")}`;

  };


  // ==========================================================
  // PROGRESS %
  // ==========================================================

  const progressPercent =
    duration
      ? Math.min(
          100,
          Math.max(
            0,
            (progress /
              duration) *
              100
          )
        )
      : 0;


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <section
      className="
        relative
        min-h-[100svh]
        flex
        items-center
        justify-center
        px-4
        sm:px-5
        py-24
        sm:py-28
        overflow-hidden
      "
    >

      {/* ====================================================
          BACKGROUND GLOW
      ==================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-40
        "
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(217,165,173,.10), transparent 35%)",
        }}
      />


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1,
        }}
        className="
          relative
          z-10
          w-full
          max-w-4xl
        "
      >

        <SectionHeading
          eyebrow={
            PLAYLIST_CONTENT.eyebrow
          }
        >
          {PLAYLIST_CONTENT.title}
        </SectionHeading>


        {/* ==================================================
            PLAYER CARD
        ================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            sm:rounded-[34px]
            p-4
            sm:p-6
            md:p-8
          "
          style={{
            background:
              "linear-gradient(145deg, rgba(36,23,43,.92), rgba(8,11,28,.96))",

            border:
              "1px solid rgba(232,197,107,.20)",

            boxShadow:
              "0 30px 90px rgba(0,0,0,.45), inset 0 1px rgba(255,255,255,.05)",
          }}
        >

          <div
            className="
              grid
              md:grid-cols-[240px_1fr]
              gap-7
              md:gap-8
              items-center
            "
          >

            {/* =================================================
                VINYL
            ================================================= */}

            <div
              className="
                relative
                mx-auto
                w-[180px]
                h-[180px]
                sm:w-[210px]
                sm:h-[210px]
                md:w-[230px]
                md:h-[230px]
              "
            >

              <motion.div
                animate={{
                  rotate:
                    playing
                      ? 360
                      : 0,
                }}
                transition={{
                  duration: 10,
                  repeat:
                    playing
                      ? Infinity
                      : 0,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-0
                  rounded-full
                  p-3
                "
                style={{
                  background:
                    "repeating-radial-gradient(circle, #17131e 0 5px, #26202d 6px 7px)",

                  boxShadow:
                    "0 18px 35px rgba(0,0,0,.4)",

                  willChange:
                    "transform",
                }}
              >

                <div
                  className="
                    w-full
                    h-full
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                  style={{
                    background:
                      "radial-gradient(circle, #e8c56b 0 5%, #9d6e34 6% 10%, #251a28 11% 100%)",
                  }}
                >

                  <span
                    className="
                      w-4
                      h-4
                      sm:w-5
                      sm:h-5
                      rounded-full
                    "
                    style={{
                      background:
                        "radial-gradient(circle at 35% 30%, #f5d98a, #9d6e34 70%, #51341d)",
                    }}
                  />

                </div>

              </motion.div>


              {/* Tonearm */}

              <div
                className="
                  absolute
                  -right-1
                  sm:-right-2
                  top-6
                  sm:top-8
                  w-12
                  sm:w-16
                  h-1
                  rounded-full
                  origin-left
                  rotate-[25deg]
                "
                style={{
                  background:
                    PALETTE.gold,

                  boxShadow:
                    `0 0 12px ${PALETTE.gold}66`,
                }}
              />

            </div>


            {/* =================================================
                PLAYER
            ================================================= */}

            <div className="min-w-0">

              {/* ==============================================
                  TITLE
              ============================================== */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-3
                  sm:gap-4
                "
              >

                <div className="min-w-0">

                  <p
                    className="
                      text-[10px]
                      sm:text-xs
                      tracking-[.28em]
                      uppercase
                      mb-2
                    "
                    style={{
                      color:
                        PALETTE.gold,
                    }}
                  >
                    {
                      PLAYLIST_CONTENT.nowPlaying
                    }
                  </p>


                  <h3
                    className="
                      text-3xl
                      sm:text-4xl
                      leading-tight
                    "
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', serif",

                      color:
                        PALETTE.cream,
                    }}
                  >
                    {song?.title}
                  </h3>


                  <p
                    className="
                      mt-1
                      text-sm
                      opacity-60
                      leading-relaxed
                    "
                    style={{
                      fontFamily:
                        "'Quicksand', sans-serif",

                      color:
                        PALETTE.cream,
                    }}
                  >
                    {song?.artist}
                    {" · "}
                    {song?.note}
                  </p>

                </div>


                {/* ============================================
                    LIKE
                ============================================ */}

                <button
                  type="button"
                  aria-label="Favorite song"
                  onClick={() =>
                    setLiked(
                      !liked
                    )
                  }
                  className="
                    rounded-full
                    p-3
                    shrink-0
                    touch-manipulation
                  "
                  style={{
                    color:
                      liked
                        ? PALETTE.rose
                        : PALETTE.cream,

                    background:
                      "rgba(255,255,255,.05)",
                  }}
                >

                  <Heart
                    size={19}
                    fill={
                      liked
                        ? "currentColor"
                        : "none"
                    }
                  />

                </button>

              </div>


              {/* =================================================
                  WAVEFORM
              ================================================= */}

              <div
                className="
                  flex
                  items-end
                  justify-center
                  gap-[3px]
                  h-12
                  sm:h-14
                  my-6
                  sm:my-7
                "
              >

                {bars.map(
                  (b, i) => (

                    <motion.span
                      key={i}
                      className="
                        w-[3px]
                        sm:w-1
                        rounded-full
                      "
                      style={{
                        background:
                          PALETTE.firefly,

                        willChange:
                          "height",
                      }}
                      animate={
                        playing
                          ? {
                              height: [
                                `${15 + b * 25}%`,
                                `${25 + b * 70}%`,
                                `${12 + b * 20}%`,
                              ],
                            }
                          : {
                              height:
                                "12%",
                            }
                      }
                      transition={{
                        duration:
                          0.65 + b,

                        repeat:
                          Infinity,

                        delay:
                          i * 0.025,
                      }}
                    />

                  )
                )}

              </div>


              {/* =================================================
                  PROGRESS
              ================================================= */}

              <div
                onClick={seek}
                role="slider"
                aria-label="Song progress"
                aria-valuemin={0}
                aria-valuemax={
                  duration || 0
                }
                aria-valuenow={
                  progress
                }
                className="
                  h-2
                  rounded-full
                  cursor-pointer
                  touch-manipulation
                "
                style={{
                  background:
                    "rgba(255,255,255,.10)",
                }}
              >

                <div
                  className="
                    h-full
                    rounded-full
                  "
                  style={{
                    width:
                      `${progressPercent}%`,

                    background:
                      `linear-gradient(
                        90deg,
                        ${PALETTE.rose},
                        ${PALETTE.gold}
                      )`,
                  }}
                />

              </div>


              {/* =================================================
                  TIME
              ================================================= */}

              <div
                className="
                  flex
                  justify-between
                  text-[11px]
                  opacity-45
                  mt-2
                "
                style={{
                  color:
                    PALETTE.cream,
                }}
              >

                <span>
                  {formatTime(
                    progress
                  )}
                </span>

                <span>
                  {formatTime(
                    duration
                  )}
                </span>

              </div>


              {/* =================================================
                  CONTROLS
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-4
                  sm:gap-5
                  mt-5
                "
              >

                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={
                    onPrevious
                  }
                  className="
                    p-2
                    opacity-70
                    hover:opacity-100
                    transition-opacity
                    touch-manipulation
                  "
                  aria-label="Previous song"
                >
                  <SkipBack
                    size={19}
                  />
                </button>


                {/* PLAY / PAUSE */}

                <button
                  type="button"
                  onClick={
                    onTogglePlay
                  }
                  className="
                    rounded-full
                    p-4
                    touch-manipulation
                  "
                  aria-label={
                    playing
                      ? "Pause song"
                      : "Play song"
                  }
                  style={{
                    background:
                      `linear-gradient(
                        145deg,
                        ${PALETTE.gold},
                        #9d6e34
                      )`,

                    color:
                      "#211708",

                    boxShadow:
                      `0 8px 30px ${PALETTE.gold}33`,
                  }}
                >

                  {playing ? (

                    <Pause
                      size={23}
                    />

                  ) : (

                    <Play
                      size={23}
                      fill="currentColor"
                    />

                  )}

                </button>


                {/* NEXT */}

                <button
                  type="button"
                  onClick={
                    onNext
                  }
                  className="
                    p-2
                    opacity-70
                    hover:opacity-100
                    transition-opacity
                    touch-manipulation
                  "
                  aria-label="Next song"
                >
                  <SkipForward
                    size={19}
                  />
                </button>


                {/* MUTE */}

                <button
                  type="button"
                  onClick={
                    onToggleMute
                  }
                  className="
                    p-2
                    opacity-70
                    hover:opacity-100
                    transition-opacity
                    touch-manipulation
                  "
                  aria-label={
                    muted
                      ? "Unmute"
                      : "Mute"
                  }
                >

                  {muted ? (

                    <VolumeX
                      size={19}
                    />

                  ) : (

                    <Volume2
                      size={19}
                    />

                  )}

                </button>

              </div>

            </div>

          </div>


          {/* ====================================================
              SONG LIST
          ==================================================== */}

          <div
            className="
              mt-7
              sm:mt-8
              pt-5
            "
            style={{
              borderTop:
                "1px solid rgba(255,255,255,.07)",
            }}
          >

            <div
              className="
                flex
                items-center
                gap-2
                mb-3
                opacity-60
              "
            >

              <Disc3
                size={15}
              />

              <span
                className="
                  text-xs
                  tracking-[.18em]
                  uppercase
                "
              >
                {
                  PLAYLIST_CONTENT.chooseSong
                }
              </span>

            </div>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-2
              "
            >

              {songs.map(
                (item, i) => (

                  <button
                    type="button"
                    key={item.file}
                    onClick={() =>
                      onSelectSong(i)
                    }
                    className="
                      text-left
                      rounded-2xl
                      p-3
                      transition-all
                      touch-manipulation
                    "
                    style={{
                      background:
                        i === current
                          ? "rgba(232,197,107,.11)"
                          : "rgba(255,255,255,.035)",

                      border:
                        `1px solid ${
                          i === current
                            ? "rgba(232,197,107,.25)"
                            : "rgba(255,255,255,.04)"
                        }`,
                    }}
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <span
                        className="
                          w-8
                          h-8
                          rounded-full
                          shrink-0
                        "
                        style={{
                          background:
                            "radial-gradient(circle at 35% 30%, #f5d98a, #9d6e34 42%, #241824 44% 100%)",

                          border:
                            "1px solid rgba(232,197,107,.30)",
                        }}
                      />


                      <span
                        className="
                          min-w-0
                        "
                      >

                        <strong
                          className="
                            block
                            text-sm
                            truncate
                          "
                          style={{
                            color:
                              PALETTE.cream,
                          }}
                        >
                          {item.title}
                        </strong>


                        <small
                          className="
                            opacity-45
                          "
                          style={{
                            color:
                              PALETTE.cream,
                          }}
                        >
                          {item.artist}
                        </small>

                      </span>


                      {i === current && (

                        <Music2
                          size={14}
                          className="
                            ml-auto
                            shrink-0
                          "
                          style={{
                            color:
                              PALETTE.gold,
                          }}
                        />

                      )}

                    </div>

                  </button>

                )
              )}

            </div>

          </div>

        </div>

      </motion.div>

    </section>

  );
}