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
import ManualMotionModal from "./ManualMotionModal";

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
type Motion = {
  id: number;
  theme_id: number;
  motion: string;
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

type Vertical = {
  id: number;
  name: string;
};

export default function OrganizerClient({
  participants,
  sessions: initialSessions,
  stations,
  verticals,
  motions,
}: {
  participants: Participant[];
  sessions: Session[];
  stations: Station[];
  verticals: Vertical[];
  motions: Motion[];
}) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
    const [search, setSearch] = useState("");
    console.log(motions);
    const [selectedParticipant, setSelectedParticipant] =
  useState<Participant | null>(null);
  const [manualSessionId, setManualSessionId] =
  useState<number | null>(null);

  const [motionDrawSessionId, setMotionDrawSessionId] =
  useState<number | null>(null);
const [showAssignModal, setShowAssignModal] =
  useState(false);
  const [showAddParticipantModal, setShowAddParticipantModal] =
  useState(false);
  const router = useRouter();
  const [manualMotionDrawSessionId,
    setManualMotionDrawSessionId] =
    useState<number | null>(null);
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
          (payload) => {
            console.log("SESSION CHANGE:", payload);
    
            if (payload.eventType === "INSERT") {
              setSessions((prev) => {
                if (prev.some((s) => s.id === payload.new.id)) {
                  return prev;
                }
    
                return [...prev, payload.new as Session];
              });
            }
    
            if (payload.eventType === "UPDATE") {
              setSessions((prev) =>
                prev.map((s) =>
                  s.id === payload.new.id
                    ? (payload.new as Session)
                    : s
                )
              );
            }
    
            if (payload.eventType === "DELETE") {
              setSessions((prev) =>
                prev.filter((s) => s.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe((status) => {
          console.log("SESSIONS REALTIME:", status);
        });
    
      return () => {
        supabase.removeChannel(channel);
      };
    }, []);
           
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
  const readySessions = sessions.filter(
    (s) => s.status === "ready_for_judge"
  );
  
  const speakingSessions = sessions.filter(
    (s) => s.status === "speaking"
  );
  
  const interviewSessions = sessions.filter(
    (s) => s.status === "interview"
  );
  
  const skillsSessions = sessions.filter(
    (s) => s.status === "vertical"
  );
  
  const remarksSessions = sessions.filter(
    (s) => s.status === "general_remarks"
  );
  const occupiedStationIds = new Set(
    sessions
      .filter((session) =>
        ["motion_reveal", "assigned", "preparing"].includes(session.status)
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
  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-[var(--text)] outline-none"
/>

<button
  onClick={() => setShowAddParticipantModal(true)}
  className="rounded-xl bg-[var(--accent)] text-black px-5 text-[var(--text)] hover:bg-[var(--accent)]"
>
  + Add
</button>

{/* LEFT COLUMN */}
</div>

  
<div className="grid grid-cols-10 gap-6 h-[78vh]">

    {/* ================= LEFT ================= */}

    <div className="col-span-4 rounded-2xl border border-zinc-800 bg-black/45 p-5 flex flex-col">

      <h2 className="text-xl font-semibold text-[var(--text)]">
         Participants
      </h2>

      <p className="mt-1 text-sm text-zinc-500">
        {waitingParticipants.length} waiting
      </p>

      <div className="mt-5 flex-1 overflow-y-auto space-y-3 pr-2">

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

    </div>

    {/* ================= MIDDLE ================= */}

    <div className="col-span-3 rounded-2xl border border-zinc-800 bg-black/45 p-5 flex flex-col" >

      <h2 className="text-xl font-semibold text-[var(--text)]">
        In Progress
      </h2>

      <div className="mt-6">

        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Motion Draw
        </p>
        

        <div className="mt-3 space-y-3">

          {motionDrawSessions.map((session) => {

            const participant = participants.find(
              (p) => p.id === session.participant_id
            );

            if (!participant) return null;
            

            return (
              <div
                key={session.id}
                className="rounded-xl border border-zinc-800 bg-[var(--bg)] p-4"
              >
                <p className="font-medium text-[var(--text)]">
                  {participant.name}
                </p>

                <p className="text-sm text-zinc-500">
                  Station {String.fromCharCode(64 + session.station_id)}
                </p>
              </div>
            );

          })}

        </div>
        <div className="my-6 border-t border-zinc-800" />
        <p className="mt-8 text-xs uppercase tracking-widest text-zinc-500">
  Preparing
</p>

<div className="mt-3 space-y-3">

  {preparingSessions.map((session) => {

    const participant = participants.find(
      (p) => p.id === session.participant_id
    );

    if (!participant) return null;

    return (
      <div
        key={session.id}
        className="rounded-xl border border-zinc-800 bg-[var(--bg)] p-4"
      >
        <p className="font-medium text-[var(--text)]">
          {participant.name}
        </p>

        <p className="text-sm text-zinc-500">
          Station {String.fromCharCode(64 + session.station_id)}
        </p>
      </div>
    );

  })}

</div>
<div className="my-6 border-t border-zinc-800" />
<p className="mt-8 text-xs uppercase tracking-widest text-zinc-500">
  Waiting for Judge
</p>

<div className="mt-3 space-y-3">

  {readySessions.map((session) => {

    const participant = participants.find(
      (p) => p.id === session.participant_id
    );

    if (!participant) return null;

    return (
      <div
        key={session.id}
        className="rounded-xl border border-zinc-800 bg-[var(--bg)] p-4"
      >
        <p className="font-medium text-[var(--text)]">
          {participant.name}
        </p>

        <p className="text-sm text-zinc-500">
          Station {String.fromCharCode(64 + session.station_id)}
        </p>
      </div>
    );

  })}

</div>
<div className="my-6 border-t border-zinc-800" />
<p className="mt-8 text-xs uppercase tracking-widest text-zinc-500">
  Speaking
</p>

<div className="mt-3 space-y-3">

  {speakingSessions.map((session) => {

    const participant = participants.find(
      (p) => p.id === session.participant_id
    );

    if (!participant) return null;

    return (
      <div
        key={session.id}
        className="rounded-xl border border-zinc-800 bg-[var(--bg)] p-4"
      >
        <p className="font-medium text-[var(--text)]">
          {participant.name}
        </p>

        <p className="text-sm text-zinc-500">
          Station {String.fromCharCode(64 + session.station_id)}
        </p>
      </div>
    );

  })}

</div>
<div className="my-6 border-t border-zinc-800" />
<p className="mt-8 text-xs uppercase tracking-widest text-zinc-500">
  General Interview
</p>

<div className="mt-3 space-y-3">

  {interviewSessions.map((session) => {

    const participant = participants.find(
      (p) => p.id === session.participant_id
    );

    if (!participant) return null;

    return (
      <div
        key={session.id}
        className="rounded-xl border border-zinc-800 bg-[var(--bg)] p-4"
      >
        <p className="font-medium text-[var(--text)]">
          {participant.name}
        </p>

        <p className="text-sm text-zinc-500">
          Station {String.fromCharCode(64 + session.station_id)}
        </p>
      </div>
    );

  })}

</div>
<div className="my-6 border-t border-zinc-800" />
<p className="mt-8 text-xs uppercase tracking-widest text-zinc-500">
  Vertical Interview
</p>

<div className="mt-3 space-y-3">

  {skillsSessions.map((session) => {

    const participant = participants.find(
      (p) => p.id === session.participant_id
    );

    if (!participant) return null;

    return (
      <div
        key={session.id}
        className="rounded-xl border border-zinc-800 bg-[var(--bg)] p-4"
      >
        <p className="font-medium text-[var(--text)]">
          {participant.name}
        </p>

        <p className="text-sm text-zinc-500">
          Station {String.fromCharCode(64 + session.station_id)}
        </p>
      </div>
    );

  })}

</div>
<div className="my-6 border-t border-zinc-800" />
<p className="mt-8 text-xs uppercase tracking-widest text-zinc-500">
  Remarks
</p>

<div className="mt-3 space-y-3">

  {remarksSessions.map((session) => {

    const participant = participants.find(
      (p) => p.id === session.participant_id
    );

    if (!participant) return null;

    return (
      <div
        key={session.id}
        className="rounded-xl border border-zinc-800 bg-[var(--bg)] p-4"
      >
        <p className="font-medium text-[var(--text)]">
          {participant.name}
        </p>

        <p className="text-sm text-zinc-500">
          Station {String.fromCharCode(64 + session.station_id)}
        </p>
      </div>
    );

  })}

</div>
      </div>

      <div className="my-6 border-t border-zinc-800" />

      <div className="flex-1 overflow-y-auto">



      </div>

    </div>

    {/* ================= RIGHT ================= */}

    <div className="col-span-3 rounded-2xl border border-zinc-800 bg-black/45 p-5 flex flex-col">

      <h2 className="text-xl font-semibold text-[var(--text)]">
        Stations
      </h2>

      <div className="mt-5 flex-1 overflow-y-auto space-y-4 pr-2">

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
  onAction={async () => {
    if (!session) return;

    if (session.status === "assigned") {
      const { error } = await supabase
        .from("sessions")
        .update({ status: "preparing" })
        .eq("id", session.id);

      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      setSessions((prev) =>
        prev.map((s) =>
          s.id === session.id
            ? { ...s, status: "preparing" }
            : s
        )
      );
    }
  }}
/>
          );

        })}

      </div>

    </div>

  </div>


          {showAssignModal && selectedParticipant && (
 <AssignStationModal
 participantName={selectedParticipant.name}
 stations={availableStations}
 onClose={() => {
   setShowAssignModal(false);
 }}
 
 onAssign={async (stationId, mode) => {
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
    session_type: "individual",
  
    status:
      mode === "online"
        ? "ready_for_judge"
        : "assigned",
  
    online_interview:
      mode === "online",
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

// Immediately update the Organizer UI
setSessions((prev) => [...prev, data]);

    if (mode === "normal") {
      setMotionDrawSessionId(data.id);
    }
    
    if (mode === "manual") {
      setManualSessionId(data.id);
    }
    
    if (mode === "online") {
      setShowAssignModal(false);
      setSelectedParticipant(null);
  
      router.push(`/judge/dashboard`);
      return;
  }

}}
/>

)}
{showAddParticipantModal && (
  <AddParticipantModal
  verticals={verticals}
  onClose={() => setShowAddParticipantModal(false)}
  onSave={async (
    name,
    rollNumber,
    email,
    phone,
    course,
    year,
    selectedVerticals
  ) => {
    const { data: participant, error } = await supabase
  .from("participants")
  .insert({
    name,
    roll_number: rollNumber,
    email,
    phone,
    course,
    year,
    checked_in: false,
  })
  .select()
  .single();


  
    if (error) {
      alert(error.message);
      return;
    }
    const rows = selectedVerticals.map((verticalId) => ({
      participant_id: participant.id,
      vertical_id: verticalId,
    }));
    console.log("Participant inserted");

if (selectedVerticals.length > 0) {
  const { error: verticalError } = await supabase
    .from("participant_verticals")
    .insert(rows);

  if (verticalError) {
    console.log(verticalError);
    alert(verticalError.message);
    return;
  }

  console.log("Verticals inserted");
}

console.log("Closing modal");
setShowAddParticipantModal(false);
console.log("Modal state updated");
//router.refresh();

  
    setShowAddParticipantModal(false);
     router.refresh();
  }}
/>
)}
{motionDrawSessionId && (
  <MotionDrawModal
    sessionId={motionDrawSessionId}
    manual={false}
    onClose={() => {
      setMotionDrawSessionId(null);
    }}
  />
)}
{manualSessionId && (
  <ManualMotionModal
    sessionId={manualSessionId}
    motions={motions}
    onClose={(sessionId) => {
      setManualSessionId(null);
      setManualMotionDrawSessionId(sessionId);
    }}
  />
)}
{manualMotionDrawSessionId && (
    <MotionDrawModal
        sessionId={manualMotionDrawSessionId}
        manual={true}
        onClose={()=>{
            setManualMotionDrawSessionId(null);
        }}
    />
)}

        </>
        
      );
}