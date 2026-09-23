import React, { useRef } from "react";
import { MOTION, PALETTE } from "../../constants";

export default function Starfield() {
  const starCount =
    typeof window !== "undefined" && window.innerWidth <= 640
      ? MOTION.starfield.mobile
      : MOTION.starfield.desktop;

  const stars = useRef(
    Array.from({ length: starCount }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }))
  ).current;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="enchanted-star absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: PALETTE.cream,
            "--star-duration": `${s.duration}s`,
            "--star-delay": `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
