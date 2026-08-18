"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SessionStatus } from "@/lib/sessionStatus";

type SpeechTimerProps = {
  speechStartedAt: string;
  sessionId: number;
  motion?: string | null;
  showMotion?: boolean;
};

export default function SpeechTimer({
  speechStartedAt,
  sessionId,
  motion,
  showMotion = true,
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

      {/* MOTION */}
      {showMotion && motion && (
        <div className="mb-10 w-full max-w-4xl px-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
            Motion
          </p>

          <h2 className="font-serif text-3xl leading-relaxed tracking-tight text-[var(--text)] md:text-4xl">
            {motion}
          </h2>
        </div>
      )}

      {/* SPEECH STATUS */}
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
        Speech In Progress
      </p>

      {/* TIMER */}
      <p
        className={`mt-4 font-mono text-8xl font-medium tabular-nums tracking-tight md:text-9xl ${
          overtime
            ? "text-red-500"
            : "text-[var(--accent)]"
        }`}
      >
        {String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:
        {String(elapsedSeconds % 60).padStart(2, "0")}
      </p>

      {/* OVERTIME */}
      {overtime && (
        <p className="mt-4 font-semibold uppercase tracking-[0.2em] text-red-500">
          ⚠ Overtime
        </p>
      )}

      <p className="mt-6 text-sm text-[var(--muted)]">
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