"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SessionStatus } from "@/lib/sessionStatus";

type Props = {
  sessionId: number;
};

const SCORES = [1,2,3,4,5,6,7,8,9,10];

export default function SkillsEvaluation({
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
      return "bg-yellow-500";

    if(score<=9)
      return "bg-green-600";

    return "bg-blue-600";
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
        skills_score: score,
        skills_remarks: remarks,
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
        status:SessionStatus.GENERAL_REMARKS,
      })
      .eq("id",sessionId);

    router.refresh();
  }

  return(

    <div>

      <h2 className="text-3xl font-bold text-[var(--text)]">
        Skills Evaluation
      </h2>

      <div className="mt-8 flex flex-wrap gap-3">

        {SCORES.map((s)=>(

          <button
            key={s}
            onClick={()=>setScore(s)}
            className={`h-12 w-12 rounded-full text-[var(--text)] font-bold transition
              ${colour(s)}
              ${score===s ? "ring-4 ring-white":"opacity-70"}
            `}
          >
            {s}
          </button>

        ))}

      </div>

      <textarea
        value={remarks}
        onChange={(e)=>setRemarks(e.target.value)}
        placeholder="Remarks..."
        className="mt-8 h-40 w-full rounded-xl bg-zinc-800 p-4 text-[var(--text)]"
      />

      <button
        onClick={submitEvaluation}
        className="mt-8 rounded-xl bg-[var(--accent)] text-black px-6 py-3 text-[var(--text)]"
      >
        Submit Evaluation
      </button>

    </div>

  );

}