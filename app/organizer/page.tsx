import TopBar from "@/components/TopBar";
import SearchBar from "@/components/SearchBar";
import ParticipantCard from "@/components/ParticipantCard";
import StationCard from "@/components/StationCard";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <TopBar />

      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 p-8">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
          <SearchBar />

          <div className="space-y-4">
            <ParticipantCard />
            <ParticipantCard />
            <ParticipantCard />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <StationCard />
          <StationCard />
          <StationCard />
        </div>
      </div>
    </main>
  );
}