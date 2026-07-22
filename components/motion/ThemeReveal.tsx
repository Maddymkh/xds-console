"use client";

import { motion } from "framer-motion";

type Props = {
  theme: string;
  onContinue: () => void;
};

export default function ThemeReveal({
  theme,
  onContinue,
}: Props) {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/greek-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative w-[700px] rounded-3xl border border-[var(--border)] bg-stone-900/80 p-14 text-center shadow-2xl"
      >
        <p className="text-sm uppercase tracking-[0.5em] text-[var(--text)]">
          Theme
        </p>

        <h1 className="mt-8 text-6xl font-serif text-[var(--text)]">
          {theme}
        </h1>

        <button
          onClick={onContinue}
          className="mt-14 rounded-2xl bg-[var(--muted)] px-10 py-4 text-lg font-semibold text-black transition hover:scale-105"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}