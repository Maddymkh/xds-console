import { supabase } from "@/lib/supabase";
import TopBar from "@/components/TopBar";
import OrganizerClient from "@/components/OrganizerClient";
import StationCard from "@/components/StationCard";



export default async function Page() {
  const { data: participants, error } = await supabase
  .from("participants")
  .select(`
    *,
    participant_verticals (
      verticals (
        name
      )
    )
  `)
  .order("roll_number");
  const { data: stations, error: stationError } = await supabase
  .from("stations")
  .select("*")
  .order("id");

const { data: sessions } = await supabase
  .from("sessions")
  .select("*");

if (error) {
  console.error(error);
}
console.log(participants);
console.dir(participants, { depth: null });
  return (
    <main className="min-h-screen bg-zinc-950">
      <TopBar />

      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 p-8">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
        <div className="flex items-center gap-4">


  <button className="mt-10 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-500 transition">
    + Add Participant
  </button>
</div>

<OrganizerClient
  participants={participants ?? []}
  sessions={sessions ?? []}
  stations={stations ?? []}
/>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
        {stations?.map((station) => {
  const session = sessions?.find(
    (s) =>
      s.station_id === station.id &&
      s.status !== "completed"
  );

  const participant = participants?.find(
    (p) => p.id === session?.participant_id
  );

  return (
    <StationCard
      key={station.id}
      station={{
        ...station,
        participantName: participant?.name,
        status: session?.status,
      }}
    />
  );
})}
        </div>
      </div>
</main>
  );
}