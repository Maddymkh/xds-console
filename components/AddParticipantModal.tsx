"use client";

import { useState } from "react";
type Props = {
    onClose: () => void;
    onSave: (
      name: string,
      rollNumber: string
    ) => void;
  };
  
  export default function AddParticipantModal({
    onClose,
    onSave,
  }: Props) {
    const [name, setName] = useState("");
const [rollNumber, setRollNumber] = useState("");
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
  
        <div className="w-[500px] rounded-2xl bg-zinc-900 p-6">
  
          <h2 className="text-2xl font-semibold text-white">
            Add Participant
          </h2>
  
          <p className="mt-2 text-zinc-400">
            Walk-in registration
          </p>
  
          <div className="mt-6 space-y-4">
  
          <input
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
            />
  
  <input
  placeholder="Roll Number"
  value={rollNumber}
  onChange={(e) => setRollNumber(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
            />
  
          </div>
  
          <div className="mt-6 flex justify-end gap-3">
  
            <button
              onClick={onClose}
              className="rounded-xl bg-zinc-800 px-5 py-2 text-white"
            >
              Cancel
            </button>
  
            <button
  onClick={() => {
    console.log("SAVE CLICKED");
    console.log(name, rollNumber);
    onSave(name, rollNumber);
  }}
  className="rounded-xl bg-indigo-600 px-5 py-2 text-white"
>
  Save
</button>
          </div>
  
        </div>
  
      </div>
    );
  }