"use client";

import { motion } from "framer-motion";

interface WaveDividerProps {
  fill?: string;
  background?: string;
  flip?: boolean;
}

// 5 wave layers — each is a path that tiles seamlessly every 1440px
// Rendered in a 200%-wide SVG; animated -50% (= one full container width) → seamless loop
const LAYERS = [
  { d: "M0,25 C360,55 720,0 1080,30 C1260,45 1380,15 1440,25 C1800,55 2160,0 2520,30 C2700,45 2820,15 2880,25 L2880,72 L0,72 Z", opacity: 0.12, dur: 70 },
  { d: "M0,35 C240,65 480,5  720,38 C960,68 1200,8  1440,35 C1680,65 1920,5  2160,38 C2400,68 2640,8  2880,35 L2880,72 L0,72 Z", opacity: 0.22, dur: 55 },
  { d: "M0,44 C200,68 400,20 600,46 C800,70 1000,18 1200,44 C1400,68 1600,20 1800,46 C2000,70 2200,18 2880,44 L2880,72 L0,72 Z", opacity: 0.38, dur: 44 },
  { d: "M0,52 C160,70 320,32 480,54 C640,74 800,30 960,52 C1120,72 1280,28 1440,52 C1600,70 1760,28 1920,52 C2080,72 2240,28 2880,52 L2880,72 L0,72 Z", opacity: 0.6,  dur: 34 },
  { d: "M0,60 C120,72 240,48 360,62 C480,74 600,46 720,60 C840,72 960,44 1080,60 C1200,74 1320,44 1440,60 C1560,72 1680,44 1800,60 C1920,74 2040,44 2880,60 L2880,72 L0,72 Z", opacity: 1,    dur: 26 },
];

export default function WaveDivider({ fill = "#ffffff", background = "transparent", flip = false }: WaveDividerProps) {
  return (
    <div
      aria-hidden
      style={{
        background,
        lineHeight: 0,
        overflow: "hidden",
        position: "relative",
        height: "clamp(52px, 5.5vw, 76px)",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      {LAYERS.map((layer, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "200%" }}
          animate={{ x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ duration: layer.dur, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 2880 72"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <path d={layer.d} fill={fill} fillOpacity={layer.opacity} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
