"use client";

type Props = {
  governmentMotion: string;
  oppositionMotion: string;
  sessionId: number;
  onContinue: (chosenStance: "Government" | "Opposition") => void;
};

export default function ParchmentChoice({
  governmentMotion,
  oppositionMotion,
  sessionId,
  onContinue,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)]">
      <h1 className="text-5xl font-bold text-[var(--text)]">
        Choose Your Side
      </h1>

      <div className="flex gap-6 mt-10">
  <button
    onClick={() => onContinue("Government")}
    className="rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-black"
  >
    Government
  </button>

  <button
    onClick={() => onContinue("Opposition")}
    className="rounded-xl bg-zinc-700 px-8 py-3 font-semibold text-[var(--text)]"
  >
    Opposition
  </button>
</div>
    </div>
  );
}