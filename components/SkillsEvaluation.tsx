"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SessionStatus } from "@/lib/sessionStatus";

type Props = {
  sessionId: number;
  participantId: number;
};

const SCORES = [1,2,3,4,5,6,7,8,9,10];

export default function SkillsEvaluation({
  sessionId,
  participantId,
}: Props) {
    console.log("Submit clicked");

  const router = useRouter();

  const [score, setScore] = useState<number | null>(null);
  const [remarks, setRemarks] = useState("");
  const [allVerticals, setAllVerticals] = useState<any[]>([]);
const [selectedVerticals, setSelectedVerticals] = useState<any[]>([]);
const availableVerticals = allVerticals.filter(
  (v) =>
    !selectedVerticals.some(
      (s: any) => s.vertical_id === v.id
    )
);


useEffect(() => {
  loadVerticals();
}, []);

async function loadVerticals() {
  const { data: verticals } = await supabase
    .from("verticals")
    .select("*");

  const { data: selected } = await supabase
    .from("participant_verticals")
    .select("vertical_id, verticals(*)")
    .eq("participant_id", participantId);

  setAllVerticals(verticals ?? []);
  setSelectedVerticals(selected ?? []);
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

<div className="text-center">
  <h2 className="display text-4xl text-[var(--accent)]">
    Skills Evaluation
  </h2>

  <p className="caption mt-3">
    Rate the participant's selected vertical skills out of 10
  </p>

  <div className="divider my-8" />
</div>

<h3 className="mb-3 font-semibold">
  Selected Verticals
</h3>

<div className="mb-8 flex flex-wrap gap-2">

  {selectedVerticals.map((v: any) => (

<span
key={v.vertical_id}
className="
  flex
  items-center
  gap-2
  rounded-full
  bg-[var(--accent)]/20
  px-4
  py-2
"
>
{v.verticals.name}

<button
  type="button"
  onClick={async () => {
    const verticalId = v.vertical_id;

    const { error } = await supabase
      .from("participant_verticals")
      .delete()
      .eq("participant_id", participantId)
      .eq("vertical_id", verticalId);

    if (error) {
      console.error("REMOVE VERTICAL ERROR:", error);
      alert(error.message);
      return;
    }

    // Immediately update UI
    setSelectedVerticals((prev) =>
      prev.filter(
        (selected) => selected.vertical_id !== verticalId
      )
    );
  }}
  className="
    flex h-6 w-6
    items-center justify-center
    rounded-full
    text-sm
    opacity-70
    transition
    hover:bg-white/10
    hover:opacity-100
  "
  aria-label={`Remove ${v.verticals.name}`}
>
  ×
</button>
</span>
    
  ))}

</div>
<h3 className="mb-3 mt-8 font-semibold">
  Add Another Vertical
</h3>
<div className="mb-8 flex flex-wrap gap-2">

  {availableVerticals.map((vertical: any) => (

    <button
     type="button"
      key={vertical.id}
      onClick={async () => {

        const { error } = await supabase
          .from("participant_verticals")
          .insert({
            participant_id: participantId,
            vertical_id: vertical.id,
          });

        if (error) {
          alert(error.message);
          return;
        }

        loadVerticals();

      }}
      className="
        rounded-full
        border
        border-[var(--accent)]/30
        px-4
        py-2
        transition
        hover:bg-[var(--accent)]/20
      "
    >
      + {vertical.name}
    </button>

  ))}

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
  <div className="text-center">
    <p>Poor</p>
  
  </div>

  <div className="text-center">
    <p>Average</p>
    
  </div>

  <div className="text-center">
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
  Continue to General Remarks 
</button>

    </div>

  );

}