"use client";

import { useEffect, useState } from "react";

export default function MMModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mmMode, setMmMode] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "m") {
        console.log("MM MODE TOGGLED");
        e.preventDefault();
        setMmMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <div className={mmMode ? "mm-mode min-h-screen" : "min-h-screen"}>
  {mmMode && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <h1
        className="
          text-8xl
          font-serif
          tracking-[0.35em]
          text-pink-200
          opacity-10
          select-none
        "
      >
        MM × XDS
      </h1>
    </div>
  )}

  {children}
</div>
  );
}