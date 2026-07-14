"use client";

import { useRouter } from "next/navigation";
import { drawMotion } from "@/lib/drawMotion";

type Session = {
  id: number;
  participant_id: number;
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
          <p className="text-white">
            Participant #{session.participant_id}
          </p>

          <button
            onClick={async () => {
              try {
                await drawMotion(session.id);
                router.refresh();
              } catch (err) {
                console.error(err);
                alert("Failed to draw motion.");
              }
            }}
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-500"
          >
            Draw Motion
          </button>
        </div>
      ))}
    </div>
  );
}