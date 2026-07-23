"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SessionStatus } from "@/lib/sessionStatus";

type Props = {
  sessionId: number;
};

export default function Interview({
  sessionId,
}: Props) {

  const router = useRouter();

  async function endInterview() {

    const { error } = await supabase
      .from("sessions")
      .update({
        status: SessionStatus.INTERVIEW_EVALUATION,
      })
      .eq("id", sessionId);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <div>

<div className="text-center">
  <div className="mb-6 text-7xl">
    💬
  </div>

  <h2 className="display text-4xl text-[var(--accent)]">
    Interview
  </h2>

  <p className="caption mt-3">
    Conduct the interview at your own pace.
  </p>

  <div className="divider my-8" />
</div>

<p className="mx-auto mt-6 max-w-xl text-center text-[var(--muted)]">
When the interview is complete,
continue to the evaluation stage.
      </p>
      <div className="panel mt-10 rounded-2xl p-6 text-center">

<p className="caption">
  REMINDER
</p>

<ul className="mt-6 space-y-3 text-[var(--muted)]">
  <li>• Ask follow-up questions naturally.</li>
  <li>• Assess confidence and clarity.</li>
  <li>• Keep the conversation conversational.</li>
  <li>• Proceed when satisfied.</li>
</ul>

</div>
      <button
        onClick={endInterview}
        className="copper-button mt-10 w-full py-4 text-lg"
      >
        Continue to Interview Evaluation 
      </button>

    </div>
  );
}