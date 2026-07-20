"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeScreen from "./motion/WelcomeScreen";
import GemJar from "./motion/GemJar";
import { drawMotion } from "@/lib/drawMotion";
import RevealScreen from "./motion/RevealScreen";



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
  "welcome" | "jar" | "reveal" | "qr"
>("welcome");

const [result, setResult] = useState<any>(null);
  if (step === "welcome") {
    return (
      <WelcomeScreen
        name={name}
        rollNumber={rollNumber}
        onBegin={() => setStep("jar")}
      />
    );
  }

  if (step === "jar") {
    return (
      <GemJar
        onSelect={async () => {
          const motion = await drawMotion(sessionId);
  
          setResult(motion);
  
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