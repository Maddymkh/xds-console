import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export default async function JudgeDashboard() {
  const cookieStore = await cookies();

  const stationId = Number(
    cookieStore.get("stationId")?.value
  );

  if (!stationId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        No station selected.
      </main>
    );
  }

  // Logged-in judges
  const { data: judges } = await supabase
    .from("judges_stations")
    .select(`
      judges (
        id,
        name
      )
    `)
    .eq("station_id", stationId)
    .eq("logged_in", true);

  // Active participant
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
    .single();

  return (
    <main className="min-h-screen bg-zinc-950 p-8">

      <h1 className="text-4xl font-bold text-white">
        Station {stationId}
      </h1>

      <p className="mt-3 text-zinc-400">
        {judges?.map((j: any) => j.judges.name).join(" • ")}
      </p>

      <div className="mt-10 rounded-2xl bg-zinc-900 p-8">

        {session ? (
          <>
            <h2 className="text-3xl font-bold text-white">
              {session.participants.name}
            </h2>

            <p className="mt-2 text-zinc-400">
              {session.participants.roll_number}
            </p>

            <div className="mt-8">
              <p className="text-zinc-400">
                Motion
              </p>

              <p className="mt-2 text-xl text-white">
                {session.motions.motion}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-zinc-400">
                Side
              </p>

              <p className="mt-2 text-2xl font-bold text-indigo-400">
                {session.stance}
              </p>
            </div>

            <button className="mt-10 rounded-xl bg-indigo-600 px-6 py-3 text-white">
              Start Speech
            </button>
          </>
        ) : (
          <p className="text-zinc-500">
            Waiting for participant...
          </p>
        )}

      </div>

    </main>
  );
}