"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SessionStatus } from "@/lib/sessionStatus";

type Props = {
  sessionId: number;
};

export default function GeneralRemarks({ sessionId }: Props) {
  const router = useRouter();
  const [remarks, setRemarks] = useState("");
  const [recommendation, setRecommendation] = useState<string | null>(null);

  async function saveRemarks() {
    const { error } = await supabase
  .from("evaluations")
  .update({
    general_remarks: remarks,
    final_recommendation: recommendation,
  })
  .eq("session_id", sessionId);

    if (error) {
      alert(error.message);
      return;
    }

    await supabase
      .from("sessions")
      .update({
        status: SessionStatus.COMPLETED,
      })
      .eq("id", sessionId);

    router.refresh();
  }

  return (
    <div>
  
      <div className="text-center">
  
        <h2 className="display text-4xl text-[var(--accent)]">
          General Remarks
        </h2>
  
        <p className="caption mt-3">
          Overall observations and final recommendation
        </p>
  
        <div className="divider my-8" />
  
      </div>
    


<div className="mb-8 flex justify-center gap-4">

  {[
    "Strongly Recommend",
    "Recommend",
    "Maybe",
    "Do Not Recommend",
  ].map((r) => (

    <button
      key={r}
      onClick={() => setRecommendation(r)}
      className={`
        rounded-xl
        border
        px-5
        py-3
        transition
        ${
          recommendation === r
            ? "bg-[var(--accent)] text-black"
            : "border-[var(--accent)]/30 hover:border-[var(--accent)]"
        }
      `}
    >
      {r}
    </button>

  ))}

</div>

      <textarea
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        placeholder="Write your overall observations, strengths, weaknesses, recommendations, or anything noteworthy..."
        className="
          h-56
          w-full
          rounded-2xl
          border
          border-white/10
          bg-[var(--panel)]
          p-5
          text-[var(--text)]
          placeholder:text-[var(--muted)]
          focus:border-[var(--accent)]
          focus:outline-none
        "
      />
  
      <button
        onClick={saveRemarks}
        className="copper-button mt-8 w-full py-4"
      >
        Complete Evaluation
      </button>
  
    </div>
  );
}