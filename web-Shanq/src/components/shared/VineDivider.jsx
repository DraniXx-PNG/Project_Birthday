import React from "react";
import { Sparkles } from "lucide-react";
import { PALETTE } from "../../constants";

export default function VineDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4 opacity-70">
      <span className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${PALETTE.gold})` }} />
      <Sparkles size={16} color={PALETTE.gold} />
      <span className="h-px w-16" style={{ background: `linear-gradient(270deg, transparent, ${PALETTE.gold})` }} />
    </div>
  );
}
