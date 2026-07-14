"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Judge = {
  id: number;
  name: string;
};

export default function JudgeLoginClient({
  judges,
}: {
  judges: Judge[];
}) {
  const router = useRouter();

  const [selectedJudge, setSelectedJudge] = useState(
    judges[0]?.id ?? 0
  );

  return (
    <>
      <select
        value={selectedJudge}
        onChange={(e) =>
          setSelectedJudge(Number(e.target.value))
        }
        className="mt-6 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
      >
        {judges.map((judge) => (
          <option
            key={judge.id}
            value={judge.id}
          >
            {judge.name}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
            document.cookie = `judgeId=${selectedJudge}; path=/`;
            router.push("/judge/dashboard");
          }}
        className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-white"
      >
        Continue
      </button>
    </>
  );
}