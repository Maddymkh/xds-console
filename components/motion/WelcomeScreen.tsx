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
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">

      <h1 className="text-5xl font-bold text-white">
        {name}
      </h1>

      <p className="mt-3 text-zinc-400">
        {rollNumber}
      </p>

      <p className="mt-12 text-lg text-zinc-300">
        When you're ready,
        begin your motion draw.
      </p>

      <button
        onClick={onBegin}
        className="mt-10 rounded-2xl bg-indigo-600 px-8 py-4 text-xl text-white hover:bg-indigo-500"
      >
        Begin Motion Draw
      </button>

    </div>
  );
}