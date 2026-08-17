"use client";
import { useEffect, useState } from "react";
import ParticipantClient from "./ParticipantClient";

type Props = {
  session: any;
};

export default function MotionReveal({
  session,
}: Props) {
    const [step, setStep] = useState(0);

useEffect(() => {
  const timers = [
    setTimeout(() => setStep(1), 800),
    setTimeout(() => setStep(2), 1700),
    setTimeout(() => setStep(3), 2700),
    setTimeout(() => setStep(4), 3700),
    setTimeout(() => setStep(5), 5200),
  ];

  return () => timers.forEach(clearTimeout);
}, []);

  return (

    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)]">

<div
  className="
    panel
    mx-auto
    w-full
    max-w-3xl
    rounded-[36px]
    px-14
    py-16
    text-center
  "
>

      {step >= 1 && (
<>
<h1 className="display text-4xl text-[var(--text)]">
{session.participants.name}
</h1>

<p className="caption mt-2">
          {session.participants.roll_number}
        </p>
        <p className="mt-4 text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
  Station
</p>

<p className="mt-1 text-xl font-semibold text-[var(--accent)]">
  {session.stations?.name ?? "Not assigned"}
</p>
        </>

)}

        
<div className="divider my-10" />     
        
        
        {step >= 2 && (
            <>
            <p className="caption tracking-[0.35em] uppercase">
    THEME
</p>
        <h2 className="text-3xl font-bold text-[var(--text)]">
          {session.themes?.name ?? "Not assigned"}
        </h2>
        </>
        )}
         
         <div className="divider my-10" />    
        {step >= 3 && (
            <>
             <p className="caption tracking-[0.35em] uppercase">
    MOTION
</p>
        <h2 className="text-2xl text-[var(--text)]">
          {session.motions?.motion ?? "Not assigned"}
        </h2>
        </>
        
         )}
       <div className="divider my-10" /> 
        {step >= 4 && (
            <>
            <p className="caption tracking-[0.35em] uppercase">
    STANCE
</p>

        <h2 className="text-3xl font-bold text-accent">
          {session.stance}
        </h2>
        </>
        )}
        <div className="divider my-10" />
        {step >= 5 && (

<ParticipantClient
  sessionId={session.id}
  prepStartedAt={session.prep_started_at}
  status={session.status}
  stationName={session.stations?.name ?? "Not assigned"}
/>

)}

      </div>

    </main>

  );
}