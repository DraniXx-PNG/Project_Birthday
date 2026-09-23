import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  PALETTE,
  SITE,
  PLAYLIST_CONTENT,
} from "./constants";

import { Starfield } from "./components/shared";

import ScrollProgress from "./components/shared/ScrollProgress";

import {
  PhaseLock,
  PhaseGift,
} from "./components/phases";

import {
  HeroSection,
  BouquetSection,
  LoveLetterSection,
  MemoryGallerySection,
  OurStorySection,
  PlaylistSection,
  GratitudeJarSection,
  Footer,
} from "./components/sections";


// ============================================================
// MAIN
// ============================================================

export default function EnchantedBirthday() {

  // ==========================================================
  // PHASE
  // ==========================================================

  const [phase, setPhase] = useState(1);


  // ==========================================================
  // GLOBAL AUDIO
  //
  // HANYA ADA SATU AUDIO UNTUK SELURUH WEBSITE
  // ==========================================================

  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [muted, setMuted] = useState(false);


  // ==========================================================
  // SONG LIST
  // ==========================================================

  const songs = PLAYLIST_CONTENT.songs;

  const currentSongData =
    songs[currentSong] || songs[0];


  // ==========================================================
  // DOCUMENT TITLE
  // ==========================================================

  useEffect(() => {
    document.title =
      `${SITE.browserTitle}, ${SITE.recipient}`;
  }, []);


  // ==========================================================
  // INITIAL AUDIO SETUP
  // ==========================================================

  useEffect(() => {

    const audio = audioRef.current;

    if (!audio || !currentSongData) {
      return;
    }

    audio.preload = "metadata";

    audio.src = currentSongData.file;

    audio.load();

  }, []);


  // ==========================================================
  // CHANGE SONG
  // ==========================================================

  useEffect(() => {

    const audio = audioRef.current;

    if (!audio || !currentSongData) {
      return;
    }

    // Jangan lakukan apa-apa kalau audio
    // sedang menjalankan source yang sama.
    if (
      audio.src.endsWith(
        currentSongData.file
      )
    ) {
      return;
    }

    audio.pause();

    setPlaying(false);

    audio.src = currentSongData.file;

    audio.load();

  }, [currentSong]);


  // ==========================================================
  // HANDLE SONG METADATA
  // ==========================================================

  const handleLoadedMetadata = () => {

    const audio = audioRef.current;

    if (!audio || !currentSongData) {
      return;
    }

    const start =
      currentSongData.startTime || 0;

    const safeStart = Math.min(
      start,
      Number.isFinite(audio.duration)
        ? audio.duration
        : start
    );

    audio.currentTime = safeStart;

  };


  // ==========================================================
  // HANDLE TIME UPDATE
  // ==========================================================

  const handleTimeUpdate = () => {

    const audio = audioRef.current;

    if (!audio || !currentSongData) {
      return;
    }

    const end =
      currentSongData.endTime != null
        ? Math.min(
            currentSongData.endTime,
            audio.duration
          )
        : audio.duration;

    if (
      Number.isFinite(end) &&
      audio.currentTime >= end
    ) {

      playNextSong();

    }

  };


  // ==========================================================
  // AUDIO PLAY
  // ==========================================================

  const handleAudioPlay = () => {
    setPlaying(true);
  };


  // ==========================================================
  // AUDIO PAUSE
  // ==========================================================

  const handleAudioPause = () => {
    setPlaying(false);
  };


  // ==========================================================
  // NEXT SONG
  // ==========================================================

  const playNextSong = () => {

    if (!songs.length) {
      return;
    }

    setCurrentSong(
      (current) =>
        (current + 1) % songs.length
    );

    setPlaying(true);

  };


  // ==========================================================
  // PREVIOUS SONG
  // ==========================================================

  const playPreviousSong = () => {

    if (!songs.length) {
      return;
    }

    setCurrentSong(
      (current) =>
        (current - 1 + songs.length) %
        songs.length
    );

    setPlaying(true);

  };


  // ==========================================================
  // TOGGLE PLAY / PAUSE
  // ==========================================================

  const togglePlay = () => {

    const audio = audioRef.current;

    if (!audio || !currentSongData) {
      return;
    }


    // ========================================================
    // PAUSE
    // ========================================================

    if (!audio.paused) {

      audio.pause();

      setPlaying(false);

      return;
    }


    // ========================================================
    // PLAY
    // ========================================================

    const start =
      currentSongData.startTime || 0;

    const end =
      currentSongData.endTime != null
        ? currentSongData.endTime
        : null;


    // Kalau posisi berada di luar clip,
    // kembali ke awal clip.

    if (
      audio.currentTime < start ||
      (end != null &&
        audio.currentTime >= end)
    ) {

      audio.currentTime = start;

    }


    audio
      .play()
      .then(() => {

        setPlaying(true);

      })
      .catch((error) => {

        console.warn(
          "Music gagal diputar:",
          error
        );

        setPlaying(false);

      });

  };


  // ==========================================================
  // SELECT SONG
  // ==========================================================

  const selectSong = (index) => {

    if (
      index < 0 ||
      index >= songs.length
    ) {
      return;
    }

    setCurrentSong(index);

    setPlaying(true);

  };


  // ==========================================================
  // MUTE / UNMUTE
  // ==========================================================

  const toggleMute = () => {

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextMuted = !muted;

    audio.muted = nextMuted;

    setMuted(nextMuted);

  };


  // ==========================================================
  // START MUSIC AFTER GIFT
  //
  // DIPANGGIL LANGSUNG DARI KLIK GIFT
  // SUPAYA BROWSER MENGANGGAPNYA USER-INITIATED.
  //
  // Musik sebenarnya mulai dalam keadaan silent,
  // kemudian setelah animasi gift selesai:
  //
  // 1. posisi kembali ke 1:56
  // 2. mute dibuka
  // 3. phase berubah ke website utama
  // ==========================================================

  const startMusicAfterGift = () => {

    const audio = audioRef.current;

    const firstSong = songs[0];

    if (!audio || !firstSong) {

      setPhase(3);

      return;

    }


    // Pastikan lagu pertama

    setCurrentSong(0);


    // Load lagu pertama

    audio.pause();

    audio.src = firstSong.file;

    audio.load();


    // Silent selama animasi gift

    audio.muted = true;

    setMuted(true);


    // Mulai playback langsung dari event click
    // supaya tidak diblokir browser.

    const playPromise =
      audio.play();


    if (playPromise) {

      playPromise
        .then(() => {

          setPlaying(true);

        })
        .catch((error) => {

          console.warn(
            "Music gagal dimulai:",
            error
          );

          setPlaying(false);

        });

    }


    // ========================================================
    // SETELAH ANIMASI GIFT
    // ========================================================

    window.setTimeout(() => {

      const currentAudio =
        audioRef.current;

      if (!currentAudio) {
        return;
      }


      const start =
        firstSong.startTime || 0;


      // Kembalikan ke titik awal clip
      // yaitu 1:56 untuk Lesung Pipi.

      try {

        currentAudio.currentTime =
          start;

      } catch (error) {

        console.warn(
          "Gagal seek music:",
          error
        );

      }


      // Buka suara

      currentAudio.muted = false;

      setMuted(false);


      // Pastikan tetap playing

      currentAudio
        .play()
        .catch((error) => {

          console.warn(
            "Music gagal dilanjutkan:",
            error
          );

        });


      // Masuk ke website utama

      setPhase(3);

    }, 1600);

  };


  // ==========================================================
  // AUTO NEXT
  //
  // Ketika currentSong berubah karena tombol
  // atau lagu sebelumnya selesai.
  // ==========================================================

  useEffect(() => {

    const audio = audioRef.current;

    const song = songs[currentSong];

    if (!audio || !song) {
      return;
    }


    // Kalau source belum sesuai,
    // ganti source.

    if (
      !audio.src.endsWith(song.file)
    ) {

      audio.pause();

      audio.src = song.file;

      audio.load();

    }


    const handleReady = () => {

      const start =
        song.startTime || 0;

      audio.currentTime = start;


      if (playing) {

        audio
          .play()
          .catch((error) => {

            console.warn(
              "Gagal auto-play lagu berikutnya:",
              error
            );

            setPlaying(false);

          });

      }

    };


    audio.addEventListener(
      "loadedmetadata",
      handleReady,
      { once: true }
    );


    // Kalau metadata sudah tersedia

    if (
      audio.readyState >= 1
    ) {

      handleReady();

    }


    return () => {

      audio.removeEventListener(
        "loadedmetadata",
        handleReady
      );

    };

  }, [currentSong]);


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{
        background:
          `radial-gradient(
            ellipse at 50% 0%,
            ${PALETTE.night2},
            ${PALETTE.night} 70%
          )`,
      }}
    >

      {/* ======================================================
          STARFIELD
      ====================================================== */}

      <Starfield />


      {/* ======================================================
          GLOBAL AUDIO
          
          INI SATU-SATUNYA <audio>
          DI SELURUH WEBSITE.
      ====================================================== */}

      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={
          handleLoadedMetadata
        }
        onTimeUpdate={
          handleTimeUpdate
        }
        onPlay={
          handleAudioPlay
        }
        onPause={
          handleAudioPause
        }
        onEnded={
          playNextSong
        }
      />


      {/* ======================================================
          PHASE 1 / PHASE 2
      ====================================================== */}

      <AnimatePresence mode="wait">

        {phase === 1 && (

          <PhaseLock
            key="lock"
            onUnlock={() =>
              setPhase(2)
            }
          />

        )}


        {phase === 2 && (

          <PhaseGift
            key="gift"
            onOpened={
              startMusicAfterGift
            }
          />

        )}

      </AnimatePresence>


      {/* ======================================================
          PHASE 3
      ====================================================== */}

      {phase === 3 && (

        <motion.main
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1.2,
          }}
          className="relative z-10"
        >

          <ScrollProgress />


          <HeroSection />


          <BouquetSection />


          <LoveLetterSection />


          <MemoryGallerySection />


          <OurStorySection />


          <PlaylistSection
            audioRef={audioRef}
            current={currentSong}
            playing={playing}
            muted={muted}
            song={currentSongData}
            songs={songs}
            onTogglePlay={togglePlay}
            onSelectSong={
              selectSong
            }
            onNext={
              playNextSong
            }
            onPrevious={
              playPreviousSong
            }
            onToggleMute={
              toggleMute
            }
          />


          <GratitudeJarSection />


          <Footer />

        </motion.main>

      )}

    </div>

  );
}