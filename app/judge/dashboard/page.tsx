import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import JudgeDashboardClient from "@/components/JudgeDashboardClient";
import SpeechTimer from "@/components/SpeechTimer";
import { SessionStatus } from "@/lib/sessionStatus";
import SpeechEvaluation from "@/components/SpeechEvaluation";
import Interview from "@/components/Interview";
import InterviewEvaluation from "@/components/InterviewEvaluation";
import SkillsEvaluation from "@/components/SkillsEvaluation";
import GeneralRemarks from "@/components/GeneralRemarks";

export default async function JudgeDashboard() {
  const cookieStore = await cookies();

  const stationId = Number(cookieStore.get("stationId")?.value);

  if (!stationId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-[var(--text)]">
        No station selected.
      </main>
    );
  }

  const { data: judges } = await supabase
    .from("station_judges")
    .select(`
      judges (
        id,
        name
      )
    `)
    .eq("station_id", stationId)
    .eq("logged_in", true);

  const { data: session } = await supabase
    .from("sessions")
    .select(`
      *,
      participants (
        name,
        roll_number
      ),
      motions (
        motion
      )
    `)
    .eq("station_id", stationId)
    .neq("status", "completed")
    .order("id", { ascending: false })
.limit(1)
.single();

  console.log("Session ID:", session?.id);
  console.log("Speech started:", session?.speech_started_at);
  console.log("Status:", session?.status);

  return (
    <main className="min-h-screen bg-[var(--bg)] p-8">
      <h1 className="text-4xl font-bold text-[var(--text)]">
        Station {stationId}
      </h1>

      <p className="mt-3 text-[var(--muted)]">
        {judges?.map((j: any) => j.judges.name).join(" • ")}
      </p>

      <div className="mt-10 rounded-2xl bg-zinc-900 p-8">
        {!session ? (
          <p className="caption">
            Waiting for participant...
          </p>
        ) : session.status === SessionStatus.SPEAKING ? (
          <SpeechTimer
            speechStartedAt={session.speech_started_at}
            sessionId={session.id}
          />
        ) : session.status === SessionStatus.SPEECH_EVALUATION ? (
          <SpeechEvaluation
            sessionId={session.id}
          />
        ) : session.status === SessionStatus.INTERVIEW ? (
          <Interview
            sessionId={session.id}
          />
        ) : session.status === SessionStatus.INTERVIEW_EVALUATION ? (
          <InterviewEvaluation
            sessionId={session.id}
          />
        ) : session.status === SessionStatus.VERTICAL ? (
          <SkillsEvaluation
    sessionId={session.id}
    participantId={session.participant_id}
/>
        ) : session.status === SessionStatus.GENERAL_REMARKS ? (
          <GeneralRemarks
  sessionId={session.id}
  judgeIds={
    judges?.map((j: any) => j.judges.id) ?? []
  }
/>
        ) :(
          <>
            <h2 className="text-3xl font-bold text-[var(--text)]">
              {session.participants.name}
            </h2>

            <p className="mt-2 text-[var(--muted)]">
              {session.participants.roll_number}
            </p>

            <div className="mt-8">
              <p className="text-[var(--muted)]">Motion</p>

              <p className="mt-2 text-xl text-[var(--text)]">
                {session.motions?.motion ?? "Not assigned"}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-[var(--muted)]">Side</p>

              <p className="mt-2 text-2xl font-bold text-accent">
                {session.stance}
              </p>
            </div>

            <JudgeDashboardClient
              sessionId={session.id}
            />
          </>
        )}
      </div>
    </main>
  );
}