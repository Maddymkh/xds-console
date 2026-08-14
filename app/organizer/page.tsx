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

  const { data: motions } = await supabase
  .from("motions")
  .select("*")
  .order("motion");

const { data: sessions } = await supabase
  .from("sessions")
  .select("*");
  const { data: verticals } = await supabase
  .from("verticals")
  .select("*")
  .order("id");

if (error) {
  console.error(error);
}
console.log(participants);
console.dir(participants, { depth: null });
  return (
    <main className="min-h-screen">
      <TopBar />

      <div className="mx-auto max-w-6xl p-6">
        {/* LEFT */}
        <div className="space-y-6">
        <div className="flex items-center gap-4">



</div>

<OrganizerClient
  participants={participants ?? []}
  sessions={sessions ?? []}
  stations={stations ?? []}
  verticals={verticals ?? []}
  motions={motions ?? []}
/>
        </div>

        {/* RIGHT */}
        
      </div>
</main>
  );
}