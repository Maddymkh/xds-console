"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Judge = {
  id: number;
  name: string;
};

type Station = {
  id: number;
  name: string;
};

export default function JudgeLoginClient({
  judges,
  stations,
}: {
  judges: Judge[];
  stations: Station[];
}) {
  const router = useRouter();

  const [selectedStation, setSelectedStation] = useState(
    stations[0]?.id ?? 0
  );

  const [selectedJudges, setSelectedJudges] = useState<number[]>([]);

  async function login() {
    if (selectedJudges.length === 0) {
      alert("Select at least one judge.");
      return;
    }

    // Log everyone out from this station
    await supabase
      .from("station_judges")
      .update({ logged_in: false })
      .eq("station_id", selectedStation);

    // Log selected judges in
    const rows = selectedJudges.map((judgeId) => ({
      station_id: selectedStation,
      judge_id: judgeId,
      logged_in: true,
    }));

    const { error } = await supabase
      .from("station_judges")
      .upsert(rows);

    if (error) {
      alert(error.message);
      return;
    }

    document.cookie = `stationId=${selectedStation}; path=/`;

    router.push("/judge/dashboard");
  }

  return (
    <>
      <p className="subtitle mt-6">Station</p>

      <select
        value={selectedStation}
        onChange={(e) =>
          setSelectedStation(Number(e.target.value))
        }
        className="
        w-full
        rounded-xl
        border
        border-white/10
        bg-zinc-900
        text-[var(--text)]
        px-4
        py-3
      
"
      >
        {stations.map((station) => (
          <option
            key={station.id}
            value={station.id}
          >
            {station.name}
          </option>
        ))}
      </select>

      <p className="subtitle mt-8">Judges</p>

      <div className="mt-3 space-y-3">
        {judges.map((judge) => (
          <label
            key={judge.id}
            className="
flex
items-center
gap-3
rounded-2xl
border
border-white/10
bg-white/5
px-4
py-3
transition
hover:border-[var(--accent)]/30
hover:bg-white/10
cursor-pointer
"
          >
            <input
            
  className="h-4 w-4 accent-[var(--accent)]"
              type="checkbox"
              checked={selectedJudges.includes(judge.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedJudges([
                    ...selectedJudges,
                    judge.id,
                  ]);
                } else {
                  setSelectedJudges(
                    selectedJudges.filter(
                      (id) => id !== judge.id
                    )
                  );
                }
              }}
            />

            {judge.name}
          </label>
        ))}
      </div>

      <button
        onClick={login}
        className="
copper-button
mt-8
w-full
py-3
font-semibold
"
      >
        Continue
      </button>
    </>
  );
}