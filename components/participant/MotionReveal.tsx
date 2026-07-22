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
  ];

  return () => timers.forEach(clearTimeout);
}, []);

  return (

    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)]">

      <div className="w-[700px] rounded-3xl bg-zinc-900 p-10">

      {step >= 1 && (
<>
<h1
className="text-4xl font-bold text-[var(--text)] transition-all duration-700"
>
{session.participants.name}
</h1>

<p className="mt-2 text-[var(--muted)]">
          {session.participants.roll_number}
        </p>
        </>

)}

        
      
        
        
        {step >= 2 && (
            <>
            <p className="mt-8 text-[var(--muted)]">
          Theme
        </p>
        <h2 className="text-3xl font-bold text-[var(--text)]">
          {session.themes?.name ?? "Not assigned"}
        </h2>
        </>
        )}
         
       
        {step >= 3 && (
            <>
             <p className="mt-8 text-[var(--muted)]">
             Motion
           </p>
        <h2 className="text-2xl text-[var(--text)]">
          {session.motions?.motion ?? "Not assigned"}
        </h2>
        </>
        
         )}
        
        {step >= 4 && (
            <>
            <p className="mt-8 text-[var(--muted)]">
            Side
          </p>

        <h2 className="text-3xl font-bold text-indigo-400">
          {session.stance}
        </h2>
        </>
        )}
        {step >= 4 && (

<ParticipantClient
sessionId={session.id}
prepStartedAt={session.prep_started_at}
/>

)}

      </div>

    </main>

  );
}