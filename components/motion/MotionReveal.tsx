"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import CeremonyLayout from "../ui/CeremonyLayout";
type Props = {
  motionText: string;
  onComplete: () => void;
};

export default function MotionReveal({
  motionText,
  onComplete,
}: Props) {
    
      
      return (
        <CeremonyLayout
  title="Motion Draw"
  subtitle="XDS Awaits"
  size="sm"
  embedded
>
  
      <motion.div
  initial={{
    opacity: 0,
    scale: 0.96,
    y: 25,
  }}
  
  animate={{
    opacity: 1,
    scale: 1,
    y: 0,
  }}
  
  transition={{
    duration: 0.6,
    ease: "easeOut",
  }}
  className="
  panel
  mx-auto
  max-w-3xl
  origin-top
  rounded-[36px]
  p-14
  text-center
  "
>
<div
  className="
    absolute
    inset-0
    rounded-[36px]
    -z-10
    blur-3xl
    opacity-20
  "
  style={{
    background:
      "radial-gradient(circle at center, rgba(216,154,71,.35), transparent 70%)",
  }}
/>
<div className="divider mb-8" />

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="caption"
>
  YOUR MOTION
</motion.p>

<div className="divider mt-8 mb-12" />
<motion.h1
  initial={{
    opacity: 0,
    y: 25,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 1,
    duration: 0.6,
  }}
  className="
display
text-4xl
leading-tight
tracking-wide
max-w-3xl
mx-auto
text-[var(--text)]
"
>
  {motionText}
</motion.h1>
<motion.button
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2 }}
  onClick={onComplete}
  className="copper-button mt-14 px-8 py-4"
>
  Choose Your Side →
</motion.button>
</motion.div>

        </CeremonyLayout>
      );

}
