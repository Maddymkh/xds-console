"use client";

import { useRouter } from "next/navigation";
import { drawMotion } from "@/lib/drawMotion";
import { useState } from "react";

export default function MotionRevealClient({
  sessionId,
}: {
  sessionId: number;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <button
      disabled={loading}
      onClick={async () => {
        setLoading(true);

        try {
          await drawMotion(sessionId);

          router.refresh();
        } catch (err) {
          console.error(err);
          alert("Failed to draw motion.");
          setLoading(false);
        }
      }}
      className="mt-12 rounded-2xl bg-indigo-600 px-8 py-4 text-xl text-white hover:bg-indigo-500 disabled:opacity-50"
    >
      {loading ? "Drawing..." : "Begin Motion Draw"}
    </button>
  );
}