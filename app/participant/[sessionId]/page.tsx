import { supabase } from "@/lib/supabase";
import ParticipantClient from "@/components/participant/ParticipantClient";

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

      <div className="w-[700px] rounded-3xl bg-zinc-900 p-10">
      <h1 className="text-4xl font-bold text-white">
  {session.participants.name}
</h1>

<p className="mt-2 text-zinc-400">
  {session.participants.roll_number}
</p>

        <p className="text-zinc-400">
          Theme
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white">
          {session.themes.name}
        </h1>

        <div className="mt-10">

          <p className="text-zinc-400">
            Motion
          </p>

          <h2 className="mt-3 text-2xl text-white">
            {session.motions.motion}
          </h2>

        </div>

        <div className="mt-10">

          <p className="text-zinc-400">
            Side
          </p>

          <h2 className="mt-3 text-3xl font-bold text-indigo-400">
            {session.stance}
          </h2>

        </div>
        <ParticipantClient
  sessionId={session.id}
  prepStartedAt={session.prep_started_at}
/>

</div>

    </main>
  );
}