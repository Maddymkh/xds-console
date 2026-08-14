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

  const statusConfig = {
    idle: {
      label: "Available",
      className:
        "border-zinc-700 bg-zinc-800 text-zinc-300",
    },
    
    assigned: {
      label: "Assigned",
      className:
        "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]",
    },
    
    motion_revealed: {
      label: "Motion Draw",
      className:
        "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]",
    },
    
    preparing: {
      label: "Preparing",
      className:
        "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]",
    },
    
    speaking: {
      label: "Speaking",
      className:
        "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]",
    },
    
    evaluation: {
      label: "Evaluation",
      className:
        "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]",
    },
    
    completed: {
      label: "Completed",
      className:
        "border-zinc-600 bg-zinc-800 text-zinc-400",
    },
  } as const;
  
  const config =
    statusConfig[status as keyof typeof statusConfig] ??
    statusConfig.idle;

  let buttonText = "Waiting...";
  let buttonStyle =
    "bg-zinc-800 text-zinc-500 cursor-not-allowed";

  if (status === "assigned") {
    buttonText = "Start Preparation";
    buttonStyle =
      "bg-[var(--accent)] hover:bg-[var(--muted)] text-white";
  } else if (status === "motion_revealed") {
    buttonText = "Begin Speech";
    buttonStyle =
      "bg-[var(--accent)] hover:bg-[var(--muted)] text-black";
  }
  else if (status === "preparing") {
    buttonText = "Start Speech";
    buttonStyle =
      "bg-[var(--accent)] hover:bg-[var(--muted)] text-black";
  } else if (status === "speaking") {
    buttonText = "End Speech";
    buttonStyle =
      "bg-[var(--accent)] hover:bg-[var(--muted)] text-black";
  } else if (status === "evaluation") {
    buttonText = "Finish";
    buttonStyle =
      "bg-[var(--accent)] hover:bg-[var(--muted)] text-black";
  } else if (status === "completed") {
    buttonText = "Completed";
    buttonStyle =
      "bg-zinc-800 text-[var(--muted)] cursor-default";
  }
  else if (status === "ready_for_judge") {
    buttonText = "Waiting for Judge";
    buttonStyle =
      "bg-[var(--accent)] text-white cursor-default";
  }
  
  else if (status === "interview") {
    buttonText = "Interview";
    buttonStyle =
      "bg-zinc-800 text-white cursor-default";
  }
  
  else if (status === "interview_evaluation") {
    buttonText = "Interview Evaluation";
    buttonStyle =
      "bg-zinc-800 text-white cursor-default";
  }
  
  else if (status === "vertical") {
    buttonText = "Skills Evaluation";
    buttonStyle =
      "bg-zinc-800 text-white cursor-default";
  }
  
  else if (status === "general_remarks") {
    buttonText = "General Remarks";
    buttonStyle =
      "bg-zinc-800 text-white cursor-default";
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold text-[var(--text)]">
            {station.name}
          </h3>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {station.participantName ?? "Awaiting assignment"}
          </p>

        </div>

        <span
  className={`
    rounded-full
    border
    px-3
    py-1
    text-xs
    font-medium
    ${config.className}
  `}
>
  {config.label}
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