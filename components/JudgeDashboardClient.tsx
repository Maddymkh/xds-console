"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function JudgeDashboardClient({
  sessionId,
}: {
  sessionId: number;
}) {
  const router = useRouter();

  async function startSpeech() {
    const { error } = await supabase
      .from("sessions")
      .update({
        status: "speaking",
        speech_started_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={startSpeech}
      className="mt-10 rounded-xl bg-indigo-600 px-6 py-3 text-white"
    >
      Start Speech
    </button>
  );
}