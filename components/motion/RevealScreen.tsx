"use client";

type Props = {
  theme: string;
  motion: string;
  stance: string;
  onContinue: () => void;
};

export default function RevealScreen({
  theme,
  motion,
  stance,
  onContinue,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-8">

      <p className="text-[var(--muted)]">
        Theme
      </p>

      <h1 className="mt-3 text-5xl font-bold text-[var(--text)]">
        {theme}
      </h1>

      <div className="mt-16 max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <p className="text-[var(--muted)]">
          Motion
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-[var(--text)]">
          {motion}
        </h2>

      </div>

      <div className="mt-12">

        <p className="text-[var(--muted)]">
          Side
        </p>

        <h2 className="mt-3 text-4xl font-bold text-indigo-400">
          {stance}
        </h2>

      </div>

      <button
        onClick={onContinue}
        className="mt-16 rounded-xl bg-[var(--accent)] text-black px-8 py-4 text-xl text-[var(--text)] hover:bg-[var(--accent)]"
      >
        Continue
      </button>

    </div>
  );
}