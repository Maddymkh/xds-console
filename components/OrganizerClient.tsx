"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ParticipantCard from "./ParticipantCard";
import AssignStationModal from "./AssignStationModal";
import { supabase } from "@/lib/supabase";
import AddParticipantModal from "./AddParticipantModal";

type Participant = {
  id: number;
  roll_number: string;
  name: string;
  checked_in: boolean;

  participant_verticals: {
    verticals: {
      name: string;
    };
  }[];
};

type Session = {
  participant_id: number;
  station_id: number;
  status: string;
};

type Station = {
  id: number;
  name: string;
};

export default function OrganizerClient({
  participants,
  sessions,
  stations,
}: {
  participants: Participant[];
  sessions: Session[];
  stations: Station[];
}) {
    const [search, setSearch] = useState("");
    const [selectedParticipant, setSelectedParticipant] =
  useState<Participant | null>(null);

const [showAssignModal, setShowAssignModal] =
  useState(false);
  const [showAddParticipantModal, setShowAddParticipantModal] =
  useState(false);
  const router = useRouter();
  const waitingParticipants = participants.filter(
    (participant) =>
      !sessions.some(
        (session) => session.participant_id === participant.id
      )
  );
  
  const preparingSessions = sessions.filter(
    (session) => session.status === "assigned"
  );
  const occupiedStationIds = new Set(
    sessions
      .filter((session) => session.status !== "completed")
      .map((session) => session.station_id)
  );
  
  const availableStations = stations.filter(
    (station) => !occupiedStationIds.has(station.id)
  );
  return (
        <>
         <div className="mb-4 flex gap-3">

<input
  type="text"
  placeholder="Search by roll number or name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
/>

<button
  onClick={() => setShowAddParticipantModal(true)}
  className="rounded-xl bg-indigo-600 px-5 text-white hover:bg-indigo-500"
>
  + Add
</button>

</div>
      
          <div className="space-y-4">
          {waitingParticipants
  .filter((participant) => {
    const q = search.toLowerCase();

    return (
      participant.name.toLowerCase().includes(q) ||
      participant.roll_number.toLowerCase().includes(q)
    );
  })
  .map((participant) => (
    <ParticipantCard
      key={participant.id}
      participant={participant}
      onAssign={(participant) => {
        setSelectedParticipant(participant);
        setShowAssignModal(true);
      }}
    />
))}
          
          </div>
          <h2 className="mt-10 text-xl font-semibold text-white">
  Preparing
</h2>

<div className="mt-4 space-y-2">
  {preparingSessions.map((session) => {
    const participant = participants.find(
      (p) => p.id === session.participant_id
    );

    if (!participant) return null;

    return (
      <div
        key={session.participant_id}
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
      >
        <p className="text-white font-medium">
          {participant.name}
        </p>

        <p className="text-sm text-zinc-500">
          Station {session.station_id}
        </p>
      </div>
    );
  })}
</div>
          {showAssignModal && selectedParticipant && (
 <AssignStationModal
 participantName={selectedParticipant.name}
 stations={availableStations}
 onClose={() => {
   setShowAssignModal(false);
 }}
 
 onAssign={async (stationId) => {
  if (!selectedParticipant) return;
  const existingSession = sessions.find(
    (session) =>
      session.participant_id === selectedParticipant.id &&
      session.status !== "completed"
  );
  
  if (existingSession) {
    alert("This participant is already assigned.");
    return;
  }
  const { error } = await supabase
    .from("sessions")
    .insert({
      participant_id: selectedParticipant.id,
      station_id: stationId,
      status: "assigned",
      session_type: "individual",
    });

    if (error) {
      console.log(error);
      console.log(JSON.stringify(error, null, 2));
      alert(error.message);
      return;
    }

    setShowAssignModal(false);
    setSelectedParticipant(null);
    
    router.refresh();

}}
/>

)}
{showAddParticipantModal && (
  <AddParticipantModal
  onClose={() => setShowAddParticipantModal(false)}
  onSave={async (name, rollNumber) => {
    const { error } = await supabase
      .from("participants")
      .insert({
        name,
        roll_number: rollNumber,
        checked_in: false,
      });
  
    if (error) {
      alert(error.message);
      return;
    }
  
    setShowAddParticipantModal(false);
    router.refresh();
  }}
/>
)}
        </>
        
      );
}