"use client";
import { useEffect } from "react";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Props = {
  sessionId: number;
  prepStartedAt: string | null;
  status: string;
};

export default function ParticipantClient({
  sessionId,
  prepStartedAt,
  status,
}: Props) {
  const started = !!prepStartedAt;
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const progress = (timeLeft / 600) * 100;
  const [finished, setFinished] = useState(false);
  
  const router = useRouter();
  const finishPreparation = async () => {
    const { error } = await supabase
      .from("sessions")
      .update({
        status: "ready_for_judge",
      })
      .eq("id", sessionId);
  
    if (error) {
      alert(error.message);
      return;
    }
  
    router.refresh();
  };

  useEffect(() => {
    if (!prepStartedAt) return;
  
    const interval = setInterval(() => {
      const started = new Date(prepStartedAt).getTime();
  
      const elapsed =
        Math.floor((Date.now() - started) / 1000);
  
      const remaining = Math.max(600 - elapsed, 0);
      
      
      setTimeLeft(remaining);
     if (remaining === 0 && !finished) {
    setFinished(true);
    /*const beep = () => {
      const audio = new AudioContext();
    
      const play = (delay: number) => {
        const osc = audio.createOscillator();
        const gain = audio.createGain();
    
        osc.connect(gain);
        gain.connect(audio.destination);
    
        osc.type = "square";
        osc.frequency.value = 900;
    
        gain.gain.setValueAtTime(0.25, audio.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          audio.currentTime + delay + 0.35
        );
    
        osc.start(audio.currentTime + delay);
        osc.stop(audio.currentTime + delay + 0.35);
      };
    
      play(0);
      play(0.5);
    };
    setFinished(true);
beep();*/
finishPreparation();
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [prepStartedAt]);

  useEffect(() => {
    const channel = supabase
      .channel(`session-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "sessions",
          filter: `id=eq.${sessionId}`,
        },
        
          () => {
            console.log("Realtime update received!");
          router.refresh();
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, router]);

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
  
          router.refresh();
        }}
        className="mt-10 w-full rounded-2xl bg-[var(--accent)] py-4 text-xl font-medium text-black disabled:opacity-50"
      >
        {loading ? "Starting..." : "Start Preparation"}
      </button>
    );
  }

  
  if (status === "preparing") {
    return (
      <div className="mt-12 text-center">
  
        <p className="text-zinc-400">
          Remaining Time
        </p>
        <p className="caption">
    PREPARATION
</p>
        <h1
  className="
    display
    mt-4
    text-8xl
    tracking-wider
    text-[var(--accent)]
  "
>
          {`${Math.floor(timeLeft / 60)}:${String(
            timeLeft % 60
          ).padStart(2, "0")}`}
        </h1>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
  <div
    className="h-full rounded-full bg-[var(--accent)] transition-all duration-1000"
    style={{
      width: `${progress}%`,
    }}
  />
</div>

        <button
          onClick={finishPreparation}
          className="mt-8 rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-black"
        >
          Finish Preparation
        </button>
  
      </div>
    );
  }
    
  if (status === "judging") {
    return (
      <div className="mt-12 text-center">
        <div className="mb-6 text-7xl">🎙️</div>
  
        <h2 className="display text-4xl text-[var(--accent)]">
          Your Evaluation Has Begun
        </h2>
  
        <p className="mt-4 text-zinc-400">
          Please begin speaking when instructed by your judge.
        </p>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="mt-12 text-center">
        <div className="mb-6 text-7xl">✓</div>
  
        <h2 className="display text-4xl text-[var(--accent)]">
          Thank You
        </h2>
  
        <p className="mt-4 text-zinc-400">
          Your evaluation has concluded.
          <br />
          You may now leave the venue.
        </p>
      </div>
    );
  }
    return (
      <div className="mt-12 text-center">

<h2 className="display text-4xl text-[var(--accent)]">
    Preparation Complete
</h2>
    
        <p className="mt-4 text-zinc-400">
        Your judge has been notified.
        Please remain seated.
        </p>
        <div className="divider my-10" />

<p className="caption">
PLEASE WAIT
</p>

<div className="mt-6 flex justify-center">
  <div className="h-3 w-3 animate-pulse rounded-full bg-[var(--accent)]" />
</div>
      </div>
      
    );
  
}