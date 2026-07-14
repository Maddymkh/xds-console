type Participant = {
  id: number;
  roll_number: string;
  name: string;
  checked_in: boolean;
  stationName?: string;
  status?: string;

  participant_verticals: {
    verticals: {
      name: string;
    };
  }[];
};

export default function ParticipantCard({
  participant,
  onAssign,
}: {
  participant: Participant;
  onAssign: (participant: Participant) => void;
}) { 
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            {participant.roll_number}
          </p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            {participant.name}
          </h2>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            participant.checked_in
              ? "bg-green-500/15 text-green-400"
              : "bg-yellow-500/15 text-yellow-400"
          }`}
        >
          {participant.checked_in ? "Checked In" : "Waiting"}
        </span>

      </div>

      <div className="mt-5 flex flex-wrap gap-2">
  {participant.participant_verticals.map((pv) => (
    <span
      key={pv.verticals.name}
      className="rounded-full border border-zinc-700 bg-zinc-800/70 px-3 py-1 text-xs font-medium text-zinc-200"
    >
      {pv.verticals.name}
    </span>
  ))}
</div>

<button
  onClick={() => onAssign(participant)}
  className="mt-5 w-full rounded-lg bg-white py-2.5 font-medium text-black transition hover:scale-[1.02]"
>
Assign to Station →
</button>

    </div>
  );
}