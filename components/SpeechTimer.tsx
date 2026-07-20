"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SessionStatus } from "@/lib/sessionStatus";

type SpeechTimerProps = {
  speechStartedAt: string;
  sessionId: number;
};

export default function SpeechTimer({
  speechStartedAt,
  sessionId,
}: SpeechTimerProps) {
  const router = useRouter();

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const started = new Date(speechStartedAt).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - started) / 1000);

      setElapsedSeconds(Math.max(0, elapsed));
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [speechStartedAt]);

  async function endSpeech() {
    const { error } = await supabase
      .from("sessions")
      .update({
        status: SessionStatus.SPEECH_EVALUATION,
      })
      .eq("id", sessionId);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-10 rounded-2xl bg-zinc-900 p-8">
      <h2 className="text-3xl font-bold text-white">
        🎤 Speech in Progress
      </h2>

      <p className="mt-8 text-5xl font-bold text-indigo-400">
        {String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:
        {String(elapsedSeconds % 60).padStart(2, "0")}
      </p>

      <button
        onClick={endSpeech}
        className="mt-10 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        End Speech
      </button>
    </div>
  );
}