"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
type Motion = {
  id: number;
  theme_id: number;
  motion: string;
};

type Props = {
  sessionId: number;
  motions: Motion[];
  onClose: (sessionId: number) => void;
};

export default function ManualMotionModal({
    sessionId,
    motions,
    onClose,
  }: Props)
 {
  const [selectedMotionId, setSelectedMotionId] =
    useState<number>();
    

  const [stance, setStance] =
    useState<"government" | "opposition">("government");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-[650px] rounded-2xl bg-zinc-900 p-8">

        <h2 className="text-2xl font-semibold text-white">
          Manual Motion
        </h2>


        <select
          className="mt-6 w-full rounded-lg bg-zinc-800 p-3"
          value={selectedMotionId}
          onChange={(e) =>
            setSelectedMotionId(Number(e.target.value))
          }
        >
          <option>Select Motion</option>

          {motions.map((motion) => (
            <option
              key={motion.id}
              value={motion.id}
            >
              {motion.motion}
            </option>
          ))}
        </select>

        <div className="mt-6 flex gap-4">

          <button
            onClick={() => setStance("government")}
            className={`flex-1 rounded-lg p-3 ${
              stance === "government"
                ? "bg-[var(--accent)] text-black"
                : "bg-zinc-800"
            }`}
          >
            Government
          </button>

          <button
            onClick={() => setStance("opposition")}
            className={`flex-1 rounded-lg p-3 ${
              stance === "opposition"
                ? "bg-[var(--accent)] text-black"
                : "bg-zinc-800"
            }`}
          >
            Opposition
          </button>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={() => onClose(sessionId)}
            className="rounded-lg border border-zinc-700 px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
                const motion = motions.find(
                  (m) => m.id === selectedMotionId
                );
              
                if (!motion) {
                  alert("Choose a motion.");
                  return;
                }
              
                const { error } = await supabase
                  .from("sessions")
                  .update({
                    theme_id: motion.theme_id,
                    motion_id: motion.id,
                    stance,
                    manually_assigned: true,
                    assignment_method: "MANUAL",
                    status: "motion_revealed",
                  })
                  .eq("id", sessionId);
              
                if (error) {
                  alert(error.message);
                  return;
                }
                const { data: check } = await supabase
  .from("sessions")
  .select("*")
  .eq("id", sessionId)
  .single();

console.log(check);

              
                onClose(sessionId);
              }}
            className="rounded-lg bg-[var(--accent)] px-5 py-2 text-black"
          >
            Assign Motion
          </button>

        </div>

      </div>

    </div>
  );
}