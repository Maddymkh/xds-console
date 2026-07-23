"use client";
import { motion } from "framer-motion";
type Props = {
  theme: string;
  debateMotion: string;
  stance: string;
  onContinue: () => void;
};

export default function RevealScreen({
  theme,
  debateMotion,
  stance,
  onContinue,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-8"
    >

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="text-center"
>
  <p className="text-[var(--muted)]">
    Theme
  </p>

  <h1 className="mt-3 text-4xl font-bold text-[var(--text)]">
    {theme}
  </h1>
</motion.div>
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
>

        <p className="text-[var(--muted)]">
          Motion
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-[var(--text)]">
          {debateMotion}
        </h2>

      </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8 }}
  className="mt-12 text-center"
>

        <p className="text-[var(--muted)]">
          Side
        </p>

        <h2 className="mt-3 text-4xl font-bold text-accent">
          {stance}
        </h2>

      </motion.div>

      <motion.button
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 1.1 }}
  onClick={onContinue}
  className="mt-16 rounded-xl bg-[var(--accent)] px-8 py-4 text-xl font-semibold text-black hover:scale-105 transition"
>
  Begin Preparation →
</motion.button>

      </motion.div>
  );
}