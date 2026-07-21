"use client";

import { useRouter } from "next/navigation";
import { drawMotion } from "@/lib/drawMotion";

type Session = {
    id: number;
  
    participants: {
      name: string;
      roll_number: string;
    };
  };

export default function MotionDeskClient({
  sessions,
}: {
  sessions: Session[];
}) {
  const router = useRouter();

  return (
    <div className="mt-8 space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
        >
          
          <div>
  <h2 className="text-xl font-semibold text-white">
    {session.participants.name}
  </h2>

  <p className="text-zinc-400">
    {session.participants.roll_number}
  </p>
</div>
        

          <button
            onClick={async () => {
              try {
                router.push(`/motion/${session.id}`);
                router.refresh();
              } catch (err) {
                console.error(err);
                alert("Failed to draw motion.");
              }
            }}
            className="mt-4 rounded-xl bg-amber-500 text-black px-5 py-2 text-white hover:bg-indigo-500"
          >
            Draw Motion
          </button>
        </div>
      ))}
    </div>
  );
}