"use client";

type Props = {
  name: string;
  rollNumber: string;
  onBegin: () => void;
};

export default function WelcomeScreen({
  name,
  rollNumber,
  onBegin,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)]">

      <h1 className="text-5xl font-bold text-[var(--text)]">
        {name}
      </h1>

      <p className="mt-3 text-[var(--muted)]">
        {rollNumber}
      </p>

      <p className="mt-12 text-lg text-zinc-300">
        When you're ready,
        begin your motion draw.
      </p>

      <button
        onClick={onBegin}
        className="mt-10 rounded-2xl bg-[var(--accent)] text-black px-8 py-4 text-xl text-[var(--text)] hover:bg-[var(--accent)]"
      >
        Begin Motion Draw
      </button>

    </div>
  );
}