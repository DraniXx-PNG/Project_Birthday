import React from "react";
import { PALETTE } from "../../constants";

export default function SectionHeading({ eyebrow, children }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <p
          className="text-[13px] tracking-wide mb-2"
          style={{ color: PALETTE.gold, fontFamily: "'Quicksand', sans-serif" }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-4xl md:text-5xl"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: PALETTE.cream }}
      >
        {children}
      </h2>
    </div>
  );
}
