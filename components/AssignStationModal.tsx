"use client";

import { useState } from "react";
type Station = {
    id: number;
    name: string;
  };
 
  
  export default function AssignStationModal({
    participantName,
    stations,
    onAssign,
    onClose,
  }: {
    participantName: string;
    stations: Station[];
    onAssign: (
      stationId: number,
      mode: "normal" | "manual" | "online"
    ) => void;
    onClose: () => void;
  }) {
    const [selectedStation, setSelectedStation] = useState<number | null>(null); 
    const [mode, setMode] = useState<
  "normal" | "manual" | "online"
>("normal");
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
  
        <div className="w-[450px] rounded-2xl bg-zinc-900 p-6">
  
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            Assign Participant
          </h2>
  
          <p className="mt-2 text-[var(--muted)]">
            {participantName}
          </p>
  
          <div className="mt-6 space-y-3">
  
            {stations.map((station) => (
              <button
              key={station.id}
              onClick={() => setSelectedStation(station.id)}
              className={`w-full rounded-xl border p-3 text-left transition ${
                selectedStation === station.id
                  ? "border-indigo-500 bg-[var(--accent)]/10 text-[var(--text)]"
                  : "border-zinc-700 text-[var(--text)] hover:border-indigo-500"
              }`}
            >
                {station.name}
              </button>
              

            ))}
  
          </div>

          <div className="mt-6">

  <p className="mb-3 text-sm text-zinc-400">
    Interview Mode
  </p>

  <div className="grid grid-cols-3 gap-2">

    <button
      onClick={() => setMode("normal")}
      className={`rounded-lg p-2 ${
        mode === "normal"
          ? "bg-[var(--accent)] text-black"
          : "bg-zinc-800"
      }`}
    >
      Normal
    </button>

    <button
      onClick={() => setMode("manual")}
      className={`rounded-lg p-2 ${
        mode === "manual"
          ? "bg-[var(--accent)] text-black"
          : "bg-zinc-800"
      }`}
    >
      Manual
    </button>

    <button
      onClick={() => setMode("online")}
      className={`rounded-lg p-2 ${
        mode === "online"
          ? "bg-[var(--accent)] text-black"
          : "bg-zinc-800"
      }`}
    >
      Online
    </button>

  </div>

</div>
  
          <div className="mt-6 flex justify-end gap-3">
  
          <button
  onClick={onClose}
  className="rounded-xl bg-zinc-800 px-5 py-2 text-[var(--text)]"
>
  Cancel
</button>
  
<button
  disabled={selectedStation === null}
  onClick={() => {
    if (selectedStation !== null) {
      onAssign(selectedStation, mode);
    }
  }}
  className={`rounded-xl px-5 py-2 text-[var(--text)] ${
    selectedStation === null
      ? "bg-zinc-700 cursor-not-allowed"
      : "bg-[var(--accent)] text-black hover:bg-[var(--accent)] text-black"
  }`}
>
  Assign
</button>
  
          </div>
  
        </div>
  
      </div>
    );
  }