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

  async function saveRemarks() {
    const { error } = await supabase
      .from("evaluations")
      .update({
        general_remarks: remarks,
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
      <h2 className="text-3xl font-bold text-[var(--text)]">
        General Remarks
      </h2>

      <textarea
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        placeholder="Overall comments..."
        className="mt-8 h-48 w-full rounded-xl bg-zinc-800 p-4 text-[var(--text)]"
      />

      <button
        onClick={saveRemarks}
        className="mt-8 rounded-xl bg-[var(--bg)] text-black px-6 py-3 text-[var(--text)]"
      >
        Save & Finish
      </button>
    </div>
  );
}