import React, { useRef } from "react";
import Firefly from "./Firefly";

export default function FireflyField({ count = 14, area = {} }) {
  const flies = useRef(
    Array.from({ length: count }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }))
  ).current;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={area}
      aria-hidden="true"
    >
      {flies.map((f, i) => (
        <Firefly key={i} style={{ top: f.top, left: f.left }} />
      ))}
    </div>
  );
}
