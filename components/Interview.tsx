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

      <h2 className="text-3xl font-bold text-[var(--text)]">
        Interview
      </h2>

      <p className="mt-6 text-[var(--muted)]">
        Conduct the interview, then click below.
      </p>

      <button
        onClick={endInterview}
        className="mt-10 rounded-xl bg-red-600 px-6 py-3 text-[var(--text)]"
      >
        End Interview
      </button>

    </div>
  );
}