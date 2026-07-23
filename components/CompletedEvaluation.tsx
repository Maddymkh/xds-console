"use client";

import { useRouter } from "next/navigation";

export default function CompletedEvaluation() {
  const router = useRouter();

  return (
    <div className="text-center">

      <div className="mb-8 text-7xl">
        ✓
      </div>

      <h2 className="display text-4xl text-[var(--accent)]">
        Evaluation Complete
      </h2>

      <p className="caption mt-4">
        All scores and remarks have been saved.
      </p>

      <div className="divider my-10" />

      <p className="text-[var(--muted)]">
        You may now wait for the next participant.
      </p>

      <button
        onClick={() => router.refresh()}
        className="copper-button mt-10 px-8 py-4"
      >
        Return to Dashboard
      </button>

    </div>
  );
}