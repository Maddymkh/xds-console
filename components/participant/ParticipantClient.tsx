"use client";
import { useEffect } from "react";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Props = {
  sessionId: number;
  prepStartedAt: string | null;
};

export default function ParticipantClient({
  sessionId,
  prepStartedAt,
}: Props) {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const router = useRouter();
  useEffect(() => {
    if (!prepStartedAt) return;
  
    const interval = setInterval(() => {
      const started = new Date(prepStartedAt).getTime();
  
      const elapsed =
        Math.floor((Date.now() - started) / 1000);
  
      const remaining = Math.max(600 - elapsed, 0);
  
      setTimeLeft(remaining);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [prepStartedAt]);

  if (!started) {
    return (
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);

          const { error } = await supabase
            .from("sessions")
            .update({
              prep_started_at: new Date().toISOString(),
              status: "preparing",
            })
            .eq("id", sessionId);

          if (error) {
            alert(error.message);
            setLoading(false);
            return;
          }

          setStarted(true);
          router.refresh();
        }}
        className="mt-10 w-full rounded-2xl bg-indigo-600 py-4 text-xl text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Starting..." : "Start Preparation"}
      </button>
    );
  }

  return (
    <div className="mt-12 text-center">

      <p className="text-zinc-400">
        Remaining Time
      </p>

      <h1 className="mt-3 text-6xl font-bold text-white">
      {`${Math.floor(timeLeft / 60)}:${String(
  timeLeft % 60
).padStart(2, "0")}`}
      </h1>

    </div>
  );
}