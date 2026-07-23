"use client";
import CeremonyLayout from "../ui/CeremonyLayout";
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
    <CeremonyLayout
  title="Theme"
  subtitle="XDS Awaits"
  size="sm"
  embedded
>
      <div className="flex flex-col items-center">
  
        <h2 className="display mt-4 text-6xl text-[var(--text)]">
          {theme}
        </h2>
  
        <button
          onClick={onContinue}
          className="copper-button mt-16 px-10 py-4 text-lg font-semibold"
        >
          Continue
        </button>
  
      </div>
    </CeremonyLayout>
    
  );
}