import React, { useRef } from "react";
import { PALETTE } from "../../constants";

export default function Firefly({ style }) {
  const motion = useRef({
    duration: 6 + Math.random() * 5,
    delay: Math.random() * 4,
  }).current;

  return (
    <span
      className="enchanted-firefly absolute rounded-full pointer-events-none"
      style={{
        width: 4,
        height: 4,
        background: PALETTE.firefly,
        boxShadow: `0 0 8px 2px ${PALETTE.firefly}, 0 0 16px 4px rgba(255,224,138,0.4)`,
        "--firefly-duration": `${motion.duration}s`,
        "--firefly-delay": `${motion.delay}s`,
        ...style,
      }}
    />
  );
}
