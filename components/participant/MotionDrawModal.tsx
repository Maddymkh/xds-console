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
    "theme" |
    "motion" |
    "stance" |
    "qr"
    >("idle");

const [themeName, setThemeName] = useState("");

const [motionText, setMotionText] = useState("");
const [selectedMotionId, setSelectedMotionId] = useState<number | null>(null);
const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
const [stanceText, setStanceText] = useState("");
const [selectedTablet, setSelectedTablet] = useState<number | null>(null);
const [availableMotions, setAvailableMotions] = useState<any[]>([]);
useEffect(() => {
  if (step === "drawing") {
    const timer = setTimeout(() => {
      setStep("theme");
    }, 2200);

    return () => clearTimeout(timer);
  }

  if (step === "theme") {
    const timer = setTimeout(() => {

      setStep("motion");
    }, 2000);

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
  className="max-w-3xlmax-h-[85vh] overflow-y-auto] rounded-[36px] border border-white/10 bg-black/50 p-14 backdrop-blur-3xl"
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

<h1 className="text-5xl font-bold text-[var(--text)]">
Motion Draw
</h1>

<p className="mt-5 text-[var(--muted)]">
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
  setSelectedThemeId(theme.id);


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

<h2 className="mt-10 text-4xl font-bold text-[var(--text)]">
Deci
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

<h2 className="mt-8 text-6xl font-bold text-[var(--text)]">
{themeName}
</h2>

</motion.div>
)}
{step === "motion" && (

<motion.div
    key="motion"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="py-10"
>

<p className="text-center uppercase tracking-[0.45em] text-zinc-500">
Choose Motion
</p>

<div className="mt-10 grid gap-5">

{availableMotions.map((item, index) => (

<motion.button
key={item.id}
whileHover={{
    scale:1.02,
    y:-3
}}
whileTap={{
    scale:0.98
}}

onClick={() => {
  setSelectedTablet(index);
  setSelectedMotionId(item.id);
  setMotionText(item.motion);
  setStep("stance");
}}

className={`
rounded-3xl
border
p-6
text-left
transition-all
duration-300

${
selectedTablet===index
? "border-[#E2D2B1] bg-[#E2D2B1]/15"
: "border-white/10 bg-white/5 hover:border-[#E2D2B1]/60"
}
`}
>

<h3 className="text-xl leading-relaxed text-[var(--text)]">
{item.motion}
</h3>

</motion.button>

))}

</div>

</motion.div>

)}
  {step === "stance" && (

<motion.div
key="stance"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="py-12 text-center"
>

<p className="uppercase tracking-[0.45em] text-zinc-500">
Choose Side
</p>

<div className="mt-12 flex justify-center gap-10">

<button
onClick={async () => {

  setStanceText("Government");

  const { error } = await supabase
    .from("sessions")
    .update({
      theme_id: selectedThemeId,
      motion_id: selectedMotionId,
      stance: "Government",
    })
    .eq("id", sessionId);

  if (error) {
    alert(error.message);
    return;
  }

  setStep("qr");
}}
className="h-48 w-48 rounded-full border-4 border-[#E2D2B1]
bg-[#7b5d32]/30 text-2xl font-bold text-[var(--text)]
hover:scale-105 transition"
>
Government

</button>

<button
onClick={async () => {

  setStanceText("Opposition");

  const { error } = await supabase
    .from("sessions")
    .update({
      theme_id: selectedThemeId,
      motion_id: selectedMotionId,
      stance: "Opposition",
    })
    .eq("id", sessionId);

  if (error) {
    alert(error.message);
    return;
  }

  setStep("qr");
}}
className="h-48 w-48 rounded-full border-4 border-[#E2D2B1]
bg-[#5d302f]/30 text-2xl font-bold text-[var(--text)]
hover:scale-105 transition"
>

Opposition

</button>

</div>


</motion.div>
    
    )}
    {step === "qr" && (

      <motion.div
        key="qr"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
      
      <h2 className="text-4xl font-bold text-[var(--text)]">
      Ready to Begin
      </h2>
      
      <p className="mt-6 text-[var(--muted)]">
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