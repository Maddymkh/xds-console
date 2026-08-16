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
<details className="panel mx-auto mt-6 max-w-3xl p-4">
  <summary className="cursor-pointer text-sm font-semibold text-[var(--text)]">
    Scoring Guidelines
  </summary>

  <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
    <p>
      <strong className="text-[var(--text)]">1:</strong>{" "}
      The speaker did not speak at all, or their speech was equivalent to not
      speaking at all.
    </p>

    <p>
      <strong className="text-[var(--text)]">2:</strong>{" "}
      The speech rarely makes relevant claims, only occasionally formulates
      arguments, and has shallow or rudimentary analysis. The speech is
      difficult to follow due to little or no structure or clarity.
    </p>

    <p>
      <strong className="text-[var(--text)]">3:</strong>{" "}
      A few sentences are coherent and make sense with additional analysis,
      but they are relatively minimal or rudimentary. The speaker struggles
      to engage effectively with the core issues of the debate.
    </p>

    <p>
      <strong className="text-[var(--text)]">4:</strong>{" "}
      Relevant arguments are occasionally made but with very rudimentary
      explanations. The speaker attempts to engage with the core issues but
      often fails to develop their arguments or fulfil their role.
    </p>

    <p>
      <strong className="text-[var(--text)]">5:</strong>{" "}
      The speaker is clear enough to be understood at some moments but is
      inconsistent in quality. They occasionally engage with core issues and
      provide some analysis but struggle to sustain a compelling argument.
    </p>

    <p>
      <strong className="text-[var(--text)]">6:</strong>{" "}
      The speaker spoke the full allotted time and made relevant arguments to
      the motion. This represents an average speech.
    </p>

    <p>
      <strong className="text-[var(--text)]">7:</strong>{" "}
      Multiple relevant arguments or good arguments. The speaker demonstrates
      a good understanding of the topic but could have developed stronger
      arguments to be more persuasive.
    </p>

    <p>
      <strong className="text-[var(--text)]">8:</strong>{" "}
      A speech that would work in a PD. Decent analysis and engagement with
      the core issues.
    </p>

    <p>
      <strong className="text-[var(--text)]">9:</strong>{" "}
      A speech with proper setup and arguments. Relevant and engaging.
    </p>

    <p>
      <strong className="text-[var(--text)]">10:</strong>{" "}
      A NG-winning debate speech.
    </p>
  </div>
</details>
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