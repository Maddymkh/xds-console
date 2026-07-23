"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import WelcomeScreen from "../motion/WelcomeScreen"; 
import ThemeReveal from "../motion/ThemeReveal"; 
import GemJar from "../motion/GemJar"; 
import MotionReveal from "../motion/MotionReveal"; 
import ParchmentChoice from "../motion/ParchmentChoice";
import QRModal from "../QRModal";
type Props = {
  sessionId: number;
  onClose: () => void;
};

export default function MotionDrawModal({
  sessionId,
  onClose,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [step, setStep] = useState<
  | "idle"
  | "welcome"
  | "theme"
  | "star"
  | "motion"
  | "stance"
  | "qr"
>("idle");

const [themeName, setThemeName] = useState("");

const [motionText, setMotionText] = useState("");
const [selectedMotionId, setSelectedMotionId] = useState<number | null>(null);
const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
const [stanceText, setStanceText] = useState("");
const [selectedTablet, setSelectedTablet] = useState<number | null>(null);
const [availableMotions, setAvailableMotions] = useState<any[]>([]);
useEffect(() => {
  
}, [step]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

<div
  className="
  w-[92vw]
  max-w-6xl
  max-h-[90vh]
  overflow-y-auto
  rounded-[36px]
  border
  border-white/10
  bg-black/50
  p-16
  backdrop-blur-3xl
  "
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.82)), url('/backgrounds/motionback.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

<AnimatePresence mode="wait">

{step === "idle" && (

<motion.div
key="idle"
initial={{ opacity: 0 }}
animate={{
  opacity: 1,
  y: 0,
  scale: [0.96, 1.02, 1],
}}
transition={{
  duration: 0.8,
}}
exit={{ opacity: 0 }}
className="text-center"
>

<h1 className="text-4xl font-bold text-[var(--text)]">
Motion Draw
</h1>

<p className="mt-5 text-[var(--muted)]">
XDS Awaits
</p>

<button
disabled={loading}
onClick={async () => {
setLoading(true);

    const { data: themes, error } = await supabase
      .from("themes")
      .select("*");

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    console.log(themes);
    if (!themes || themes.length === 0) {
        alert("No themes found.");
        setLoading(false);
        return;
      }
      
      const theme =
        themes[Math.floor(Math.random() * themes.length)];
      
      console.log("Selected theme:", theme);
      const { data: motions, error: motionError } = await supabase
  .from("motions")
  .select("*")
  .eq("theme_id", theme.id);

if (motionError) {
  alert(motionError.message);
  setLoading(false);
  return;
}

console.log(motions);
if (!motions || motions.length === 0) {
    alert("No motions found for this theme.");
    setLoading(false);
    return;
  }
  
  setThemeName(theme.name);
  setSelectedThemeId(theme.id);


// shuffle motions
const shuffled = [...motions].sort(() => Math.random() - 0.5);

// show at most 6 tablets
setAvailableMotions(shuffled.slice(0, 6));

   
setLoading(false);
setStep("theme");

}}
className="mt-10 rounded-2xl bg-[var(--accent)] px-8 py-4 text-lg font-semibold text-black hover:bg-[var(--accent-hover)]"
>

{loading ? "Drawing..." : "Begin Draw"}

</button>

</motion.div>

)}

{step === "theme" && (
  <ThemeReveal
  theme={themeName}
  onContinue={() => {
    setStep("star");
  }}
/>
)}
{step === "star" && (
  <GemJar
    onSelect={async () => {
      // Pick one of the shuffled motions
      const chosen =
        availableMotions[
          Math.floor(Math.random() * availableMotions.length)
        ];

      setSelectedMotionId(chosen.id);
      setMotionText(chosen.motion);

      setStep("motion");
    }}
  />
)}
{step === "motion" && (
  <MotionReveal
  motionText={motionText}
  onComplete={() => {
    setStep("stance");
  }}
/>
)}
{step === "stance" && (
 <ParchmentChoice
 governmentMotion={motionText}
 oppositionMotion={motionText}
 sessionId={sessionId}
 onContinue={async (side: "Government" | "Opposition") => {
   setStanceText(side);

   const { error } = await supabase
     .from("sessions")
     .update({
       theme_id: selectedThemeId,
       motion_id: selectedMotionId,
       stance: side,
     })
     .eq("id", sessionId);

   if (error) {
     alert(error.message);
     return;
   }

   setShowQR(true);
 }}
/>
)}
    


</AnimatePresence>
{showQR && (
  <QRModal
    sessionId={sessionId}
    onClose={() => {
      setShowQR(false);
      onClose(); // closes the MotionDrawModal too
    }}
  />
)}


      </div>

    </div>
  );
}