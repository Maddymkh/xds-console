"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SessionStatus } from "@/lib/sessionStatus";

type Props = {
  sessionId: number;
};

const SCORES = [1,2,3,4,5,6,7,8,9,10];

export default function SpeechEvaluation({
  sessionId,
}: Props) {
    console.log("Submit clicked");

  const router = useRouter();

  const [score, setScore] = useState<number | null>(null);
  const [remarks, setRemarks] = useState("");

  function colour(score:number){

    if(score<=3)
      return "bg-red-600";

    if(score<=6)
      return "bg-accent";

    if(score<=9)
      return "bg-green-600";

    return "bg-accent";
  }

  async function submitEvaluation(){

    if(score===null){
      alert("Select a score");
      return;
    }

    const { error } = await supabase
    .from("evaluations")
    .upsert(
      {
        session_id: sessionId,
        speech_score: score,
        speech_remarks: remarks,
      },
      {
        onConflict: "session_id",
      }
    );
    if(error){
      alert(error.message);
      return;
    }

    await supabase
      .from("sessions")
      .update({
        status:SessionStatus.INTERVIEW,
      })
      .eq("id",sessionId);

    router.refresh();
  }

  return(

    <div>

<div className="text-center">
  <h2 className="display text-4xl text-[var(--accent)]">
    Speech Evaluation
  </h2>

  <p className="caption mt-3">
    Rate the participant's speech out of 10
  </p>

  <div className="divider my-8" />
</div>

<div className="mt-8 flex justify-center gap-4">

        {SCORES.map((s)=>(

          <button
            key={s}
            onClick={() => setScore(score === s ? null : s)}
            className={`
              h-14
              w-14
              rounded-full
              border
              border-[var(--accent)]/30
              font-bold
              transition
              ${
                score === s
                  ? "bg-[var(--accent)] text-black ring-2 ring-[var(--accent)]"
                  : "bg-[var(--panel)] hover:border-[var(--accent)]"
              }
              `}
          >
            {s}
          </button>

        ))}

      </div>
      <div className="mx-auto mt-3 flex w-[640px] justify-between text-sm text-[var(--muted)]">
  <span>Poor</span>
  <span>Average</span>
  <span>Excellent</span>
</div>
      <textarea
  value={remarks}
  onChange={(e) => setRemarks(e.target.value)}
  placeholder="Remarks..."
  className="
    mt-8
    h-40
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
  onClick={submitEvaluation}
  className="copper-button mt-8 w-full py-4 text-lg"
>
  Continue to Interview →
</button>


    </div>

  );

}