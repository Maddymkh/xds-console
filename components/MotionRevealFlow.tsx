"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeScreen from "./motion/WelcomeScreen";
import GemJar from "./motion/GemJar";
import { drawMotion } from "@/lib/drawMotion";
import RevealScreen from "./motion/RevealScreen";
import ThemeReveal from "./motion/ThemeReveal";
import ParchmentChoice from "./motion/ParchmentChoice";


export default function MotionRevealFlow({
  sessionId,
  name,
  rollNumber,
}: {
  sessionId: number;
  name: string;
  rollNumber: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState<
  | "welcome"
  | "jar"
  | "theme"
  | "parchment"
  | "reveal"
  | "qr"
>("welcome");

const [result, setResult] = useState<any>(null);
  if (step === "welcome") {
    return (
      <WelcomeScreen
        name={name}
        rollNumber={rollNumber}
        onBegin={async () => {
          const motion = await drawMotion(sessionId);
        
          setResult(motion);
        
          setStep("theme");
        }}
      />
    );
  }
  if (step === "theme" && result) {
    return (
      <ThemeReveal
        theme={result.theme.name}
        onContinue={() => setStep("jar")}
      />
    );
  }
  if (step === "jar") {
    return (
      <GemJar
        onSelect={async () => {
          const motion = await drawMotion(sessionId);
  
          setResult(motion);
  
          setStep("parchment");
        }}
      />
    );
  }
  
  if (step === "parchment" && result) {
    return (
      <ParchmentChoice
    governmentMotion={result.motion.motion}
    oppositionMotion={result.motion.motion}
    sessionId={sessionId}
    onContinue={(chosenStance) => {
        setResult({
            ...result,
            stance: chosenStance,
        });

        setStep("reveal");
    }}
/>
    );
  }
  if (step === "reveal" && result) {
    return (
      <RevealScreen
        theme={result.theme.name}
        motion={result.motion.motion}
        stance={result.stance}
        onContinue={() => {
          router.push(`/participant/${sessionId}`);
        }}
      />
    );
  }
  
  return null;
}