"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SessionStatus } from "@/lib/sessionStatus";

type Props = {
  sessionId: number;
};

const SCORES = [1,2,3,4,5,6,7,8,9,10];

export default function InterviewEvaluation({
  sessionId,
}: Props) {

  const router = useRouter();

  const [score, setScore] = useState<number | null>(null);
  const [remarks, setRemarks] = useState("");


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
      interview_score: score,
      interview_remarks: remarks,
    },
    {
      onConflict: "session_id",
    }
  );

    if(error){
      alert(error.message);
      return;
    }

    // Find the participant for this session
    const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("participant_id")
    .eq("id", sessionId)
    .single();
  
  if (sessionError || !session) {
    alert(sessionError?.message ?? "Could not find participant.");
    return;
  }

// Check if the participant selected any verticals
const { data: verticals, error: verticalError } = await supabase
.from("participant_verticals")
.select("id")
.eq("participant_id", session.participant_id);

if (verticalError) {
alert(verticalError.message);
return;
}

const nextStatus =
verticals && verticals.length > 0
  ? SessionStatus.VERTICAL
  : SessionStatus.GENERAL_REMARKS;

  const { error: updateError } = await supabase
  .from("sessions")
  .update({
    status: nextStatus,
  })
  .eq("id", sessionId);

if (updateError) {
  alert(updateError.message);
  return;
}

router.refresh();
  }

  return(

    <div>

<div className="text-center">
  <h2 className="display text-4xl text-[var(--accent)]">
    Interview Evaluation
  </h2>

  <p className="caption mt-3">
    Rate the participant's interview out of 10
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
      <div className="mx-auto mt-3 flex w-[640px] justify-between text-xs text-[var(--muted)]">
  <div>
    <p>Poor</p>
    
  </div>

  <div>
    <p>Average</p>
    
  </div>

  <div>
    <p>Excellent</p>
    
  </div>
</div>
      <textarea
        value={remarks}
        onChange={(e)=>setRemarks(e.target.value)}
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
        className="copper-button mt-8 w-full py-4"
      >
        Continue
      </button>

    </div>

  );

}