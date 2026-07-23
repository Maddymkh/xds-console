"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CeremonyLayout from "../ui/CeremonyLayout";
type Props = {
  onSelect: () => Promise<void>;
};

export default function GemJar({
  onSelect,
}: Props) {
  const stars = [
    // Top row
    { left: "18%", top: "12%", size: 48, drift: 8 },
    { left: "36%", top: "9%",  size: 60, drift: 12 },
    { left: "56%", top: "15%", size: 52, drift: 10 },
    { left: "78%", top: "11%", size: 58, drift: 14 },
  
    // Upper middle
    { left: "27%", top: "33%", size: 54, drift: 10 },
    { left: "49%", top: "39%", size: 80, drift: 16 }, // central hero star
    { left: "72%", top: "31%", size: 58, drift: 12 },
  
    // Middle
    { left: "19%", top: "52%", size: 48, drift: 9 },
    { left: "38%", top: "58%", size: 56, drift: 11 },
    { left: "63%", top: "56%", size: 64, drift: 14 },
    { left: "86%", top: "46%", size: 48, drift: 8 },
  
    // Bottom
    { left: "13%", top: "75%", size: 52, drift: 10 },
    { left: "45%", top: "74%", size: 62, drift: 13 },
    { left: "74%", top: "69%", size: 56, drift: 10 },
    
  ];

  const [selectedGem, setSelectedGem] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);
    const [hoveredStar, setHoveredStar] =
  useState<number | null>(null);
  
  

  return (
    <CeremonyLayout
  title="Motion Draw"
  subtitle="Catch a star"
  size="sm"
  embedded
>
<div className="flex justify-center">
  
<motion.div
  className="relative mt-8 h-[420px] w-full"
  animate={{
    scale: selectedGem !== null ? 1.06 : 1,
  }}
  transition={{
    duration: 0.6,
    ease: "easeOut",
  }}
>
<div
  className="
absolute
inset-0
rounded-full
blur-3xl
opacity-30
"
style={{
background:
"radial-gradient(circle at center, rgba(255,145,60,.15), transparent 70%)"
}}
/>
{Array.from({ length: 80 }).map((_, i) => (
  <motion.div
    key={`dust-${i}`}
    className="absolute rounded-full bg-[#FFE3A3]"
    style={{
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.2,
    }}
    animate={{
      x: selectedGem !== null ? "0vw" : 0,
      y: selectedGem !== null ? "0vh" : 0,
      opacity: selectedGem !== null ? [0.7, 0] : [0.2, 0.7, 0.2],
      scale: selectedGem !== null ? [1, 0] : [1, 1.6, 1],
    }}
    transition={{
      duration: 2 + Math.random() * 3,
      repeat: Infinity,
      delay: Math.random() * 3,
    }}
  />
))}
<div
  className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    h-[340px]
    w-[340px]
    rounded-full
    blur-[120px]
    opacity-25
  "
  style={{
    background:
      "radial-gradient(circle, rgba(255,175,70,.18), transparent 70%)",
  }}
/>
        {stars.map((star, i) => (
          <motion.button
          key={i}
          disabled={loading}
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.8,
            
          }}
          style={{
            position: "absolute",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            x:
              selectedGem === i
                ? 0
                : [
                    0,
                    star.drift,
                    -star.drift * 0.7,
                    star.drift * 0.5,
                    0,
                  ],
          
            y:
              selectedGem === i
                ? -170
                : [
                    0,
                    -star.drift * 1.3,
                    star.drift * 0.6,
                    -star.drift,
                    0,
                  ],
          
            rotate:
              selectedGem === i
                ? [0, 40, 140]
                : [0, 5, -4, 3, 0],
          
                scale:
                selectedGem === i
                  ? [1, 2.5, 18, 24]
                  : hoveredStar === i
                  ? 1.45
                  : hoveredStar !== null
                  ? 0.7
                  : [1, 1.08, 0.97, 1.04, 1],
          
                  opacity:
  selectedGem === i
    ? [1, 1, 0]
    : selectedGem !== null
    ? 0.08
    : hoveredStar === i
    ? 1
    : hoveredStar !== null
    ? 0.25
    : [0.75, 1, 0.82, 1],
          }}
          transition={
            selectedGem === i
              ? {
                  duration: 0.55,
                  ease: "easeOut",
                }
              : {
                  duration: 8 + i * 0.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
          whileHover={{
            y: -18,
            scale: 1.12,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onHoverStart={() => setHoveredStar(i)}
onHoverEnd={() => setHoveredStar(null)}

onClick={() => {
  if (loading) return;

  setSelectedGem(i);
  setLoading(true);

  setTimeout(async () => {
    await onSelect();
  },1800);
}}
          className="group absolute cursor-pointer"
              
            >
<div
  className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    blur-2xl
  "
  style={{
    width:
      selectedGem === i
        ? star.size * 18
        : hoveredStar === i
        ? star.size * 1.2
        : star.size * 0.8,
  
    height:
      selectedGem === i
        ? star.size * 18
        : hoveredStar === i
        ? star.size * 1.2
        : star.size * 0.8,
    background:
      hoveredStar === i
        ? "radial-gradient(circle, rgba(255,235,170,.85) 0%, rgba(255,170,70,.4) 55%, transparent 82%)"
        : "radial-gradient(circle, rgba(255,210,120,.55) 0%, rgba(210,120,40,.22) 55%, transparent 80%)",
  }}
/>
{selectedGem === i && (
  <motion.div
    initial={{
      scale: 0,
      opacity: 0.7,
    }}
    animate={{
      scale: [0,45 ],
      opacity: [0,0.4,0],
    }}
    transition={{
      duration: 0.75,
      ease: "easeOut",
    }}
    className="
      absolute
      inset-0
      rounded-full
      bg-[#FFF4D0]
      blur-3xl
    "
  />
)}
<motion.span
  animate={{
    scale:
      selectedGem === i
        ? [1, 1.8, 5]
        : 1,

    color:
      selectedGem === i
        ? "#FFFFFF"
        : "#FFF8DC",
  }}
  transition={{
    duration: .55,
    ease: "easeOut",
  }}
  className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    text-[26px]
    drop-shadow-[0_0_30px_rgba(255,255,220,.95)]
  "
>
  ✦
</motion.span>
{Array.from({ length: 4 }).map((_, p) => (
  <motion.div
    key={p}
    className="absolute rounded-full bg-[#FFE9A8]"
    style={{
      width: 3,
      height: 3,
      left: "50%",
      top: "50%",
    }}
    animate={{
      x: [
        0,
        (Math.random() - 0.5) * 35,
      ],
      y: [
        0,
        (Math.random() - 0.5) * 35,
      ],
      opacity: [0.9, 0],
      scale: [1, 0],
    }}
    transition={{
      duration: 1.5 + Math.random(),
      repeat: Infinity,
      delay: p * 0.3,
      ease: "easeOut",
    }}
  />
))}
            
            
        </motion.button>
        ))}

      </motion.div>
      </div>
      {loading && (
        <p className="mt-10 text-[var(--muted)]">
          Drawing your motion...
        </p>
      )}
</CeremonyLayout>
  );
}