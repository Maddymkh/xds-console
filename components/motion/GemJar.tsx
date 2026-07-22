"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)]">

      <h1 className="mb-3 text-5xl font-bold text-[var(--text)]">
      Choose a Motion
      </h1>

      <p className="mb-12 text-[var(--muted)]">
      Select one crystal below to receive your motion.
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-4xl">

        {gems.map((_, i) => (
          <motion.button
          key={i}
          disabled={loading}
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: selectedGem === i ? 1.25 : 1,
          }}
          transition={{
            delay: i * 0.05,
            duration: 0.5,
          }}
          whileHover={{
            scale: 1.12,
            y: -8,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={async () => {
            setSelectedGem(i);
            setLoading(true);
        
            await onSelect();
          }}
          className={`
              h-20
              w-20
              rounded-full
              border
              border-white/20
        
              bg-gradient-to-br
              from-violet-300
              via-indigo-500
              to-indigo-900
        
              shadow-[0_0_30px_rgba(120,100,255,.5)]
        
              transition-all
        
              ${
                loading && selectedGem !== i
                  ? "opacity-20"
                  : ""
              }
          `}
        />
        ))}

      </div>

      {loading && (
        <p className="mt-10 text-[var(--muted)]">
          Drawing your motion...
        </p>
      )}

    </div>
  );
}