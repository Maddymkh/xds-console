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
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-8">

      <p className="text-zinc-400">
        Theme
      </p>

      <h1 className="mt-3 text-5xl font-bold text-white">
        {theme}
      </h1>

      <div className="mt-16 max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <p className="text-zinc-400">
          Motion
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          {motion}
        </h2>

      </div>

      <div className="mt-12">

        <p className="text-zinc-400">
          Side
        </p>

        <h2 className="mt-3 text-4xl font-bold text-indigo-400">
          {stance}
        </h2>

      </div>

      <button
        onClick={onContinue}
        className="mt-16 rounded-xl bg-amber-500 text-black px-8 py-4 text-xl text-white hover:bg-indigo-500"
      >
        Continue
      </button>

    </div>
  );
}