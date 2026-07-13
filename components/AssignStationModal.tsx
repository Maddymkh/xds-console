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
    onAssign: (stationId: number) => void;
    onClose: () => void;
  }) {
    const [selectedStation, setSelectedStation] = useState<number | null>(null); 
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
  
        <div className="w-[450px] rounded-2xl bg-zinc-900 p-6">
  
          <h2 className="text-2xl font-semibold text-white">
            Assign Participant
          </h2>
  
          <p className="mt-2 text-zinc-400">
            {participantName}
          </p>
  
          <div className="mt-6 space-y-3">
  
            {stations.map((station) => (
              <button
              key={station.id}
              onClick={() => setSelectedStation(station.id)}
              className={`w-full rounded-xl border p-3 text-left transition ${
                selectedStation === station.id
                  ? "border-indigo-500 bg-indigo-500/10 text-white"
                  : "border-zinc-700 text-white hover:border-indigo-500"
              }`}
            >
                {station.name}
              </button>
            ))}
  
          </div>
  
          <div className="mt-6 flex justify-end gap-3">
  
          <button
  onClick={onClose}
  className="rounded-xl bg-zinc-800 px-5 py-2 text-white"
>
  Cancel
</button>
  
<button
  disabled={selectedStation === null}
  onClick={() => {
    if (selectedStation !== null) {
      onAssign(selectedStation);
    }
  }}
  className={`rounded-xl px-5 py-2 text-white ${
    selectedStation === null
      ? "bg-zinc-700 cursor-not-allowed"
      : "bg-indigo-600 hover:bg-indigo-500"
  }`}
>
  Assign
</button>
  
          </div>
  
        </div>
  
      </div>
    );
  }