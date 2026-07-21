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
  const status = station.status ?? "idle";

  const badge =
    status === "assigned" ||
    status === "preparing" ||
    status === "speaking" ||
    status === "evaluation";

  let buttonText = "Waiting...";
  let buttonStyle =
    "bg-zinc-800 text-zinc-500 cursor-not-allowed";

  if (status === "assigned") {
    buttonText = "Start Preparation";
    buttonStyle =
      "bg-amber-500 hover:bg-amber-400 text-black";
  } else if (status === "preparing") {
    buttonText = "Start Speech";
    buttonStyle =
      "bg-amber-500 hover:bg-amber-400 text-black";
  } else if (status === "speaking") {
    buttonText = "End Speech";
    buttonStyle =
      "bg-amber-500 hover:bg-amber-400 text-black";
  } else if (status === "evaluation") {
    buttonText = "Finish";
    buttonStyle =
      "bg-amber-500 hover:bg-amber-400 text-black";
  } else if (status === "completed") {
    buttonText = "Completed";
    buttonStyle =
      "bg-zinc-800 text-zinc-400 cursor-default";
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-base font-semibold text-white">
            {station.name}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {station.participantName ?? "No participant assigned"}
          </p>

        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${
            badge
              ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
              : "border-zinc-700 bg-zinc-800 text-zinc-300"
          }`}
        >
          {status === "idle" ? "Available" : status}
        </span>

      </div>

      <div className="mt-5">

        <button
          disabled={
            !station.participantName ||
            status === "completed"
          }
          onClick={onAction}
          className={`w-full rounded-xl py-2.5 text-sm font-medium transition ${buttonStyle}`}
        >
          {buttonText}
        </button>

      </div>

    </div>
  );
}