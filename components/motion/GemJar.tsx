"use client";

import { useState } from "react";

type Props = {
  onSelect: () => Promise<void>;
};

export default function GemJar({
  onSelect,
}: Props) {
  const gems = Array.from({ length: 12 });

  const [selectedGem, setSelectedGem] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">

      <h1 className="mb-3 text-5xl font-bold text-white">
        Draw Your Motion
      </h1>

      <p className="mb-12 text-zinc-400">
        Choose one crystal.
      </p>

      <div className="grid grid-cols-4 gap-6">

        {gems.map((_, i) => (
          <button
            key={i}
            disabled={loading}
            onClick={async () => {
              setSelectedGem(i);
              setLoading(true);

              await onSelect();
            }}
            className={`
              h-20
              w-20
              rounded-2xl
              shadow-lg
              transition-all
              duration-300

              ${
                selectedGem === i
                  ? "scale-125 bg-indigo-300"
                  : "bg-gradient-to-br from-indigo-400 to-violet-700 hover:scale-110"
              }

              ${
                loading &&
                selectedGem !== i
                  ? "opacity-20"
                  : ""
              }
            `}
          />
        ))}

      </div>

      {loading && (
        <p className="mt-10 text-zinc-400">
          Drawing motion...
        </p>
      )}

    </div>
  );
}