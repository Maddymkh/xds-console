"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
type Props = {
  sessionId: number;
  onClose: () => void;
};

export default function MotionDrawModal({
  sessionId,
  onClose,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<
  "idle" |
"drawing" |
"choose" |
"theme" |
"motion" |
"stance" |
"qr"
>("idle");

const [themeName, setThemeName] = useState("");

const [motionText, setMotionText] = useState("");

const [stanceText, setStanceText] = useState("");
const [selectedTablet, setSelectedTablet] = useState<number | null>(null);
const [availableMotions, setAvailableMotions] = useState<any[]>([]);
useEffect(() => {
  if (step === "drawing") {
    const timer = setTimeout(() => {
      setStep("choose");
    }, 2200);

    return () => clearTimeout(timer);
  }

  if (step === "theme") {
    const timer = setTimeout(() => {

      setStep("motion");
    }, 2000);

    return () => clearTimeout(timer);
  }

  if (step === "motion") {
    const timer = setTimeout(() => {
      setStep("stance");
    }, 2500);

    return () => clearTimeout(timer);
  }

  if (step === "stance") {
    const timer = setTimeout(() => {
      setStep("qr");
    }, 1800);

    return () => clearTimeout(timer);
  }
}, [step]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

<div
  className="w-[760px] rounded-[36px] border border-white/10 bg-black/50 p-14 backdrop-blur-3xl"
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

<h1 className="text-5xl font-bold text-white">
Motion Draw
</h1>

<p className="mt-5 text-zinc-400">
The Assembly Awaits
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

// shuffle motions
const shuffled = [...motions].sort(() => Math.random() - 0.5);

// show at most 6 tablets
setAvailableMotions(shuffled.slice(0, 6));

   
setLoading(false);
setStep("drawing");

}}
className="mt-10 rounded-2xl bg-[#E2D2B1] px-8 py-4 text-lg font-semibold text-black hover:bg-[#D5C3A0]"
>

{loading ? "Drawing..." : "Begin Draw"}

</button>

</motion.div>

)}

{step === "drawing" && (

<motion.div
key="drawing"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="py-20 text-center"
>

<motion.div
animate={{
rotate: 360,
scale: [1, 1.15, 1]
}}
transition={{
  rotate:{
      repeat:Infinity,
      duration:1.5,
      ease:"linear"
  },
  scale:{
      repeat:Infinity,
      repeatType:"mirror",
      duration:1.2
  }
}}
className="mx-auto h-24 w-24 rounded-full border-2 border-[#E2D2B1] border-t-transparent"
/>

<h2 className="mt-10 text-4xl font-bold text-white">
Consulting the Assembly
</h2>

<p className="mt-4 text-zinc-500">
Selecting Theme...
</p>

</motion.div>

)}

{step === "theme" && (

<motion.div
key="theme"
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
className="py-20 text-center"
>

<p className="uppercase tracking-[0.5em] text-zinc-500">
Theme
</p>

<h2 className="mt-8 text-6xl font-bold text-white">
{themeName}
</h2>

</motion.div>
)}
{step === "motion" && (

  <motion.div
    key="motion"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center py-10"
  >
  
  <p className="uppercase tracking-[0.5em] text-zinc-500">
  Motion
  </p>
  
  <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
    <h2
        className="text-3xl leading-relaxed font-medium text-white"
    >
        {motionText}
    </h2>
</div>
  
  </motion.div>
  
  )}
  {step === "stance" && (

    <motion.div
      key="stance"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20"
    >
    
    <p className="uppercase tracking-[0.4em] text-zinc-500">
    Assigned Side
    </p>
    
    <h1
      className={`mt-8 text-7xl font-black ${
        stanceText === "Government"
          ? "text-emerald-300 drop-shadow-[0_0_25px_rgba(16,185,129,.5)]"
          : "text-red-300 drop-shadow-[0_0_25px_rgba(248,113,113,.5)]"
      }`}
    >
      {stanceText}
    </h1>
    
    </motion.div>
    
    )}
    {step === "qr" && (

      <motion.div
        key="qr"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
      
      <h2 className="text-4xl font-bold text-white">
      Ready to Begin
      </h2>
      
      <p className="mt-6 text-zinc-400">
      Scan the QR code or continue on this device.
      </p>
      
      <div className="mx-auto mt-10 h-48 w-48 rounded-2xl border-2 border-dashed border-[#E2D2B1] flex items-center justify-center text-zinc-500">
      <div className="mx-auto mt-10 flex h-52 w-52 items-center justify-center rounded-3xl bg-white p-4">
    <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 49 }).map((_, i) => (
            <div
                key={i}
                className={`h-5 w-5 ${
                    Math.random() > 0.5 ? "bg-black" : "bg-white"
                }`}
            />
        ))}
    </div>
</div>
      </div>
      
      <button
        onClick={onClose}
        className="mt-10 rounded-xl bg-[#E2D2B1] px-6 py-3 font-semibold text-black"
      >
        Close
      </button>
      
      </motion.div>
      
      )}


</AnimatePresence>


      </div>

    </div>
  );
}