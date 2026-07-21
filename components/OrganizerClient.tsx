"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ParticipantCard from "./ParticipantCard";
import AssignStationModal from "./AssignStationModal";
import { supabase } from "@/lib/supabase";
import AddParticipantModal from "./AddParticipantModal";
import StationCard from "./StationCard";
import QRModal from "./QRModal";
import MotionDrawModal from "@/components/participant/MotionDrawModal";

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
  id: number;
  participant_id: number;
  station_id: number;
  status: string;
};

type Station = {
  id: number;
  name: string;
  active: boolean;
  participantName?: string;
  status?: string;
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
  const [qrSessionId, setQrSessionId] = useState<number | null>(null);
  const [motionDrawSessionId, setMotionDrawSessionId] =
  useState<number | null>(null);
const [showAssignModal, setShowAssignModal] =
  useState(false);
  const [showAddParticipantModal, setShowAddParticipantModal] =
  useState(false);
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel("sessions-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sessions",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);
  const waitingParticipants = participants.filter(
    (participant) =>
      !sessions.some(
        (session) => session.participant_id === participant.id
      )
  );
  const motionDrawSessions = sessions.filter(
    (session) => session.status === "assigned"
  );
  
  const preparingSessions = sessions.filter(
    (session) => session.status === "preparing"
  );
  const occupiedStationIds = new Set(
    sessions
    .filter(
      (session) =>
        session.status === "assigned" ||
        session.status === "preparing"
    )
      .map((session) => session.station_id)
  );

console.log("Occupied stations:", [...occupiedStationIds]);

console.table(
  sessions.map((s) => ({
    id: s.id,
    station: s.station_id,
    status: s.status,
  }))
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
          Motion Draw
</h2>

<div className="mt-4 space-y-2">
  {motionDrawSessions.map((session) => {
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
        key={session.id}
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
      >
        <p className="font-medium text-white">
          {participant.name}
        </p>

        <p className="text-sm text-zinc-500">
          Station {session.station_id}
        </p>
      </div>
    );
  })}
</div>
</div>
<h2 className="mt-10 text-xl font-semibold text-white">
  Stations
</h2>

<div className="mt-4 space-y-4">
  {stations.map((station) => {
    const session = sessions.find(
      (s) =>
        s.station_id === station.id &&
        s.status !== "completed"
    );

    const participant = participants.find(
      (p) => p.id === session?.participant_id
    );

    return (
      <StationCard
      key={station.id}
      station={{
        ...station,
        participantName: participant?.name,
        status: session?.status,
      }}
     /* onAction={async () => {
        if (!session) return;
    
        const nextStatus =
          session.status === "assigned"
            ? "preparing"
            : session.status === "preparing"
            ? "speaking"
            : session.status === "speaking"
            ? "evaluation"
            : session.status === "evaluation"
            ? "completed"
            : session.status;
    
        const { error } = await supabase
          .from("sessions")
          .update({
            status: nextStatus,
          })
          .eq("id", session.id);
    
        if (error) {
          alert(error.message);
          return;
        }
    
        router.refresh();
      }}*/
    />
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
  const blockedStatuses = [
    "motion_reveal",
    "assigned",
    "preparing",
  ];
  
  const stationBusy = sessions.some(
    (session) =>
      session.station_id === stationId &&
      blockedStatuses.includes(session.status)
  );
  
  if (stationBusy) {
    alert("This station is currently occupied.");
    return;
  }
  
  if (existingSession) {
    alert("This participant is already assigned.");
    return;
  }
  const { data, error } = await supabase
  .from("sessions")
  .insert({
    participant_id: selectedParticipant.id,
    station_id: stationId,
    status: "assigned",
    session_type: "individual",
  })
  .select()
  .single();

    if (error) {
      console.log(error);
      console.log(JSON.stringify(error, null, 2));
      alert(error.message);
      return;
    }

    setShowAssignModal(false);
setSelectedParticipant(null);
setMotionDrawSessionId(data.id);

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
{motionDrawSessionId && (
  <MotionDrawModal
    sessionId={motionDrawSessionId}
    onClose={() => {
      setQrSessionId(motionDrawSessionId);
      setMotionDrawSessionId(null);
    }}
  />
)}
{qrSessionId && (
  <QRModal
    sessionId={qrSessionId}
    onClose={() => {
      setQrSessionId(null);
      router.refresh();
    }}
  />
)}
        </>
        
      );
}