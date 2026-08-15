"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

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
  const router = useRouter();

  const started = !!prepStartedAt;

  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [pageWarning, setPageWarning] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const completionHandledRef = useRef(false);

  const progress = (timeLeft / 600) * 100;

  // -----------------------------
  // AUDIO
  // -----------------------------

  const unlockAudio = async () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }
    } catch (error) {
      console.error("Audio unlock failed:", error);
    }
  };

  const playPrepFinishedBeep = () => {
    const audio = audioContextRef.current;

    if (!audio) {
      console.warn("Audio context not available");
      return;
    }

    const now = audio.currentTime;

    [0, 0.45, 0.9].forEach((delay) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        880,
        now + delay
      );

      gain.gain.setValueAtTime(
        0.001,
        now + delay
      );

      gain.gain.exponentialRampToValueAtTime(
        0.25,
        now + delay + 0.02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + delay + 0.3
      );

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.start(now + delay);
      oscillator.stop(now + delay + 0.3);
    });
  };

  // -----------------------------
  // FINISH PREPARATION
  // -----------------------------

  const finishPreparation = useCallback(async () => {
    const { error } = await supabase
      .from("sessions")
      .update({
        status: "ready_for_judge",
      })
      .eq("id", sessionId);

    if (error) {
      console.error("FINISH PREPARATION ERROR:", error);
      alert(error.message);
      return;
    }

    router.refresh();
  }, [sessionId, router]);

  // -----------------------------
  // PAGE LEAVE DETECTION
  // -----------------------------

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "hidden") {
        console.log("PARTICIPANT LEFT PAGE");

        const { error } = await supabase
          .from("sessions")
          .update({
            participant_page_state: "hidden",
            last_page_hidden_at: new Date().toISOString(),
          })
          .eq("id", sessionId);

        if (error) {
          console.error(
            "PAGE HIDDEN UPDATE ERROR:",
            error
          );
        }

        return;
      }

      if (document.visibilityState === "visible") {
        console.log("PARTICIPANT RETURNED");

        const { data, error } = await supabase
          .from("sessions")
          .select("page_leave_count")
          .eq("id", sessionId)
          .single();

        if (error) {
          console.error(
            "PAGE STATE READ ERROR:",
            error
          );
          return;
        }

        const leaveCount =
          (data?.page_leave_count ?? 0) + 1;

        const { error: updateError } = await supabase
          .from("sessions")
          .update({
            participant_page_state: "active",
            page_leave_count: leaveCount,
          })
          .eq("id", sessionId);

        if (updateError) {
          console.error(
            "PAGE RETURN UPDATE ERROR:",
            updateError
          );
        }

        setPageWarning(true);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [sessionId]);

  // -----------------------------
  // PREPARATION TIMER
  // -----------------------------

  useEffect(() => {
    if (!prepStartedAt) return;

    completionHandledRef.current = false;

    const startedAt =
      new Date(prepStartedAt).getTime();

    const updateTimer = () => {
      const elapsed = Math.floor(
        (Date.now() - startedAt) / 1000
      );

      const remaining = Math.max(
        600 - elapsed,
        0
      );

      setTimeLeft(remaining);

      if (
        remaining === 0 &&
        !completionHandledRef.current
      ) {
        completionHandledRef.current = true;

        // 🔔 Beep
        playPrepFinishedBeep();

        // Update session
        finishPreparation();
      }
    };

    // Run immediately
    updateTimer();

    const interval = setInterval(
      updateTimer,
      1000
    );

    return () => clearInterval(interval);
  }, [prepStartedAt, finishPreparation]);

  // -----------------------------
  // REALTIME SESSION UPDATES
  // -----------------------------

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
          console.log(
            "Realtime update received!"
          );

          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, router]);

  // -----------------------------
  // START PREPARATION
  // -----------------------------

  if (!started) {
    return (
      <div>
        {pageWarning && (
          <div className="mb-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-center">
            <p className="font-semibold text-yellow-400">
              ⚠️ You left the participant screen.
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              Please remain on this page for the
              duration of your evaluation.
            </p>

            <button
              type="button"
              onClick={() =>
                setPageWarning(false)
              }
              className="mt-3 rounded-xl bg-[var(--accent)] px-4 py-2 font-medium text-black"
            >
              Continue
            </button>
          </div>
        )}

        <button
          disabled={loading}
          onClick={async () => {
            setLoading(true);

            // Unlock audio from user interaction
            await unlockAudio();

            const { error } = await supabase
              .from("sessions")
              .update({
                prep_started_at:
                  new Date().toISOString(),
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
          className="
            mt-10
            w-full
            rounded-2xl
            bg-[var(--accent)]
            py-4
            text-xl
            font-medium
            text-black
            disabled:opacity-50
          "
        >
          {loading
            ? "Starting..."
            : "Start Preparation"}
        </button>
      </div>
    );
  }

  // -----------------------------
  // PREPARATION
  // -----------------------------

  if (status === "preparing") {
    return (
      <div className="mt-12 text-center">
        {pageWarning && (
          <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">
            <p className="font-semibold text-yellow-400">
              ⚠️ You left the preparation screen.
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              Please remain on this page for the
              rest of your evaluation.
            </p>

            <button
              type="button"
              onClick={() =>
                setPageWarning(false)
              }
              className="mt-3 rounded-xl bg-[var(--accent)] px-4 py-2 font-medium text-black"
            >
              Continue
            </button>
          </div>
        )}

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
            text-6xl
            tracking-wider
            text-[var(--accent)]
            sm:text-7xl
            lg:text-8xl
          "
        >
          {`${Math.floor(
            timeLeft / 60
          )}:${String(timeLeft % 60).padStart(
            2,
            "0"
          )}`}
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
          type="button"
          onClick={finishPreparation}
          className="
            mt-8
            rounded-xl
            bg-[var(--accent)]
            px-6
            py-3
            font-medium
            text-black
          "
        >
          Finish Preparation
        </button>
      </div>
    );
  }

  // -----------------------------
  // JUDGING
  // -----------------------------

  if (status === "judging") {
    return (
      <div className="mt-12 text-center">
        <div className="mb-6 text-7xl">
          🎙️
        </div>

        <h2 className="display text-4xl text-[var(--accent)]">
          Your Evaluation Has Begun
        </h2>

        <p className="mt-4 text-zinc-400">
          Please begin speaking when instructed
          by your judge.
        </p>
      </div>
    );
  }

  // -----------------------------
  // COMPLETED
  // -----------------------------

  if (status === "completed") {
    return (
      <div className="mt-12 text-center">
        <div className="mb-6 text-7xl">
          ✓
        </div>

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

  // -----------------------------
  // WAITING FOR JUDGE
  // -----------------------------

  return (
    <div className="mt-12 text-center">
      {pageWarning && (
        <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">
          <p className="font-semibold text-yellow-400">
            ⚠️ You left the participant screen.
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            Please remain on this page for the
            rest of your evaluation.
          </p>

          <button
            type="button"
            onClick={() =>
              setPageWarning(false)
            }
            className="mt-3 rounded-xl bg-[var(--accent)] px-4 py-2 font-medium text-black"
          >
            Continue
          </button>
        </div>
      )}

      <h2 className="display text-4xl text-[var(--accent)]">
        Preparation Complete
      </h2>

      <p className="mt-4 text-zinc-400">
        Your judge has been notified.
        <br />
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