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
      .from("judges_stations")
      .update({ logged_in: false })
      .eq("station_id", selectedStation);

    // Log selected judges in
    const rows = selectedJudges.map((judgeId) => ({
      station_id: selectedStation,
      judge_id: judgeId,
      logged_in: true,
    }));

    const { error } = await supabase
      .from("judges_stations")
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
      <p className="mt-6 text-zinc-400">
        Station
      </p>

      <select
        value={selectedStation}
        onChange={(e) =>
          setSelectedStation(Number(e.target.value))
        }
        className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
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

      <p className="mt-8 text-zinc-400">
        Judges
      </p>

      <div className="mt-3 space-y-3">
        {judges.map((judge) => (
          <label
            key={judge.id}
            className="flex items-center gap-3 text-white"
          >
            <input
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
        className="mt-8 w-full rounded-xl bg-indigo-600 py-3 text-white"
      >
        Continue
      </button>
    </>
  );
}