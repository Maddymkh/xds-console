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
  const overtime = elapsedSeconds >= 300;

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
    <div className="mt-10 flex flex-col items-center text-center">
      <h2 className="display text-4xl text-[var(--accent)]">
    Speech In Progress
</h2>

<p
  className={`display mt-8 text-9xl tracking-wider text-[var(--accent) ${
    overtime
      ? "text-red-500"
      : "text-[var(--accent)]"
  }`}
>
        {String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:
        {String(elapsedSeconds % 60).padStart(2, "0")}
      </p>
      {overtime && (
  <p className="mt-4 font-semibold tracking-wider text-red-500">
    ⚠ OVERTIME
  </p>
)}
      <p className="mt-6 text-[var(--muted)]">
  The timer will continue until you end the speech.
</p>

<div className="divider my-10 w-full" />

<button
  onClick={endSpeech}
  className="copper-button mt-8 w-full py-4 text-lg"
>
  End Speech & Begin Interview
</button>
    </div>
  );
}