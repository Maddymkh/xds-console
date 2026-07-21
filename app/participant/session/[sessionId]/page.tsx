import { supabase } from "@/lib/supabase";
import ParticipantClient from "@/components/participant/ParticipantClient";
import MotionReveal from "@/components/participant/MotionReveal";

export default async function ParticipantPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

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
        ),
        themes (
          name
        )
      `)
    .eq("id", Number(sessionId))
    .single();

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Session not found.
      </main>
    );
  }
  
  console.log(session.prep_started_at);
  return (
    
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">

return (
  <MotionReveal
    session={session}
  />
);

    </main>
  );
}