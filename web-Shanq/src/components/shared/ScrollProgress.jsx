import React, { useEffect, useRef } from "react";
import { PALETTE } from "../../constants";

export default function ScrollProgress() {
  const fillRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;

        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const progress =
          max > 0
            ? Math.min(100, Math.max(0, (window.scrollY / max) * 100))
            : 0;

        if (fillRef.current) {
          fillRef.current.style.width = `${progress}%`;
        }

        if (labelRef.current) {
          labelRef.current.textContent = `${Math.round(progress)}%`;
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[120] pointer-events-none">
      <div
        className="h-[3px] w-full"
        style={{ background: "rgba(244,236,216,.07)" }}
      >
        <div
          ref={fillRef}
          className="h-full origin-left"
          style={{
            width: "0%",
            background: `linear-gradient(90deg, ${PALETTE.rose}, ${PALETTE.gold})`,
            boxShadow: `0 0 12px ${PALETTE.gold}70`,
            transition: "width 120ms linear",
          }}
        />
      </div>

      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 opacity-55"
        style={{
          background: "rgba(7,10,26,.45)",
          border: "1px solid rgba(232,197,107,.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          ref={labelRef}
          className="text-[9px] tracking-[.28em] uppercase"
          style={{ color: PALETTE.gold }}
        >
          0%
        </span>
      </div>
    </div>
  );
}
