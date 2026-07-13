type Station = {
  id: number;
  name: string;
  active: boolean;

  participantName?: string;
  status?: string;
};
export default function StationCard({
  station,
}: {
  station: Station;
}) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
  
        <div className="flex items-center justify-between">
  
          <h2 className="text-lg font-semibold text-white">
          {station.name}
          </h2>
  
          <span
  className={`rounded-full px-3 py-1 text-xs ${
    station.participantName
      ? "bg-yellow-500/15 text-yellow-400"
      : "bg-green-500/15 text-green-400"
  }`}
>
  {station.participantName
    ? station.status ?? "Reserved"
    : "Available"}
</span>
  
        </div>
        <div className="mt-5 space-y-2">

<p className="text-sm text-zinc-500">
  Participant
</p>

<p className="text-white">
  {station.participantName ?? "None"}
</p>

</div>
  
        <button className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-500">
  
          Assign Participant
  
        </button>
  
      </div>
    );
  }