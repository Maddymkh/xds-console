"use client";
import { useState } from "react";
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-[500px] rounded-2xl bg-zinc-900 p-8">

        <h2 className="text-2xl font-bold text-white">
          Motion Draw
        </h2>

        <p className="mt-4 text-zinc-400">
          Session #{sessionId}
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
  
  const motion =
    motions[Math.floor(Math.random() * motions.length)];
  
  console.log("Selected motion:", motion);
  const stance = Math.random() < 0.5 ? "Government" : "Opposition";

console.log("Selected stance:", stance);
    setLoading(false);
    const { error: updateError } = await supabase
  .from("sessions")
  .update({
    theme_id: theme.id,
    motion_id: motion.id,
    stance,
  })
  .eq("id", sessionId);

if (updateError) {
  alert(updateError.message);
  setLoading(false);
  return;
}
  }}
  className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white disabled:opacity-50"
>
  {loading ? "Drawing..." : "Draw Motion"}
</button>

      </div>

    </div>
  );
}