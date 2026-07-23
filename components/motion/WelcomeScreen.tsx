"use client";
import CeremonyLayout from "../ui/CeremonyLayout";
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
    <CeremonyLayout
  title="Motion Draw"
  subtitle="XDS Awaits"
  size="sm"
  embedded
>
      <div className="flex flex-col items-center">
  
        <h2 className="body-ui text-3xl font-semibold text-[var(--text)]">
          {name}
        </h2>
  
        <p className="mt-2 body-ui text-lg text-[var(--muted)]">
          {rollNumber}
        </p>
  
        <button
          onClick={onBegin}
          className="copper-button mt-12 px-10 py-4 text-lg font-semibold"
        >
          Begin Draw
        </button>
  
      </div>
    </CeremonyLayout>
  );
}