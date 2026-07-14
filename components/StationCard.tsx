type Station = {
  id: number;
  name: string;
  active?: boolean;
  participantName?: string;
  status?: string;
};
export default function StationCard({
  station,
  onAction,
}: {
  station: Station;
  onAction?: () => void;
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
<p className="mt-2 text-sm text-zinc-400">
  Status:{" "}
  <span className="font-medium text-white capitalize">
    {station.status ?? "Available"}
  </span>
</p>

</div>
  
{!station.participantName ? (
  <button
    disabled
    className="mt-6 w-full rounded-xl bg-zinc-800 py-3 font-medium text-zinc-500"
  >
    Waiting...
  </button>
) : station.status === "assigned" ? (
  <button
  onClick={onAction}
  className="mt-6 w-full rounded-xl bg-yellow-600 py-3 font-medium text-white"
>
  ▶ Start Preparation
</button>
) : station.status === "preparing" ? (
  <button
    className="mt-6 w-full rounded-xl bg-orange-600 py-3 font-medium text-white"
  >
    🎤 Start Speech
  </button>
) : station.status === "speaking" ? (
  <button
    className="mt-6 w-full rounded-xl bg-red-600 py-3 font-medium text-white"
  >
    ⏹ End Speech
  </button>
) : station.status === "evaluation" ? (
  <button
    className="mt-6 w-full rounded-xl bg-purple-600 py-3 font-medium text-white"
  >
    ✅ Complete Session
  </button>
) : (
  <button
    disabled
    className="mt-6 w-full rounded-xl bg-green-700 py-3 font-medium text-white"
  >
    Completed
  </button>
)}
  
      </div>
    );
  }