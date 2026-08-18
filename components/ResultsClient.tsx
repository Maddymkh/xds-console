"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Props = {
  results: any[];
};

export default function ResultsClient({ results }: Props) {
  const router = useRouter();
    const [selectedResult, setSelectedResult] = useState<any | null>(null);
    const [search, setSearch] = useState("");
    const [judgeFilter, setJudgeFilter] = useState("All");
const [verticalFilter, setVerticalFilter] = useState("All");
const [recommendationFilter, setRecommendationFilter] = useState("All");
const [sortBy, setSortBy] = useState("score");

useEffect(() => {
  const channel = supabase
    .channel("results-live")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "evaluations",
      },
      (payload) => {
        console.log("EVALUATION CHANGE:", payload);
        router.refresh();
      }
    )
    .subscribe((status) => {
      console.log("RESULTS REALTIME:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, [router]);

    const completed = results.length;

const averageScore =
  results.length === 0
    ? 0
    : (
        results.reduce((sum, r) => {
          const score =
            r.skills_score != null
              ? (2 * r.speech_score + 2 * r.skills_score + r.interview_score) / 5
              : (2 * r.speech_score + r.interview_score) / 3;

          return sum + score;
        }, 0) / results.length
      ).toFixed(1);

const recommended = results.filter(
  (r) => r.final_recommendation === "Recommend"
).length;

const maybe = results.filter(
  (r) => r.final_recommendation === "Maybe"
).length;
const getFinalScore = (r: any) =>
  r.skills_score != null
    ? (2 * r.speech_score + 2 * r.skills_score + r.interview_score) / 5
    : (2 * r.speech_score + r.interview_score) / 3;

    const judges = Array.from(
      new Set(
        results.flatMap((r) =>
          r.evaluation_judges
            ?.map((ej: any) => ej.judges?.name)
            .filter(Boolean) ?? []
        )
      )
    ).sort();
    
    const verticals = Array.from(
      new Set(
        results.flatMap(
          (r) =>
            r.sessions?.participants?.participant_verticals
              ?.map((pv: any) => pv.verticals?.name)
              .filter(Boolean) ?? []
        )
      )
    ).sort();

    const filteredResults = [...results]
    .filter((r) => {
      const name =
        r.sessions?.participants?.name?.toLowerCase() ?? "";
  
      const roll =
        r.sessions?.participants?.roll_number?.toLowerCase() ?? "";
  
      const q = search.toLowerCase();
  
      const matchesSearch =
        name.includes(q) || roll.includes(q);
  
      const participantJudges =
        r.evaluation_judges
          ?.map((ej: any) => ej.judges?.name)
          .filter(Boolean) ?? [];
  
      const matchesJudge =
        judgeFilter === "All" ||
        participantJudges.includes(judgeFilter);
  
      const participantVerticals =
        r.sessions?.participants?.participant_verticals
          ?.map((pv: any) => pv.verticals?.name)
          .filter(Boolean) ?? [];
  
      const matchesVertical =
        verticalFilter === "All" ||
        participantVerticals.includes(verticalFilter);
  
      const matchesRecommendation =
        recommendationFilter === "All" ||
        r.final_recommendation === recommendationFilter;
  
      return (
        matchesSearch &&
        matchesJudge &&
        matchesVertical &&
        matchesRecommendation
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.sessions.participants.name.localeCompare(
          b.sessions.participants.name
        );
      }
  
      if (sortBy === "roll") {
        return a.sessions.participants.roll_number.localeCompare(
          b.sessions.participants.roll_number
        );
      }
  
      return getFinalScore(b) - getFinalScore(a);
    });


  return (
    <main className="min-h-screen bg-[var(--bg)] p-10">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-black/30 p-10 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,.45)]">
      <h1 className="text-4xl font-bold mb-10">
        Recruitment Results
      </h1>

      <div className="mt-10 mb-10 grid grid-cols-4 gap-5">

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-white/10">
    <p className="text-sm text-[var(--muted)]">Completed</p>
    <p className="mt-2 text-4xl font-bold text-[var(--accent)]">
      {completed}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-white/10">
    <p className="text-sm text-[var(--muted)]">Average Score</p>
    <p className="mt-2 text-4xl font-bold text-[var(--accent)]">
      {averageScore}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-white/10">
    <p className="text-sm text-[var(--muted)]">Recommend</p>
    <p className="mt-2 text-4xl font-bold text-[var(--accent)]">
      {recommended}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-white/10">
    <p className="text-sm text-[var(--muted)]">Maybe</p>
    <p className="mt-2 text-4xl font-bold text-[var(--accent)]">
      {maybe}
    </p>
  </div>

</div>
<div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">

  {/* Search */}
  <div className="relative lg:col-span-2">
    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
    />

    <input
      type="text"
      placeholder="Search name or roll number..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-full rounded-2xl
        border border-white/10
        bg-white/5
        py-3 pl-11 pr-4
        text-[var(--text)]
        placeholder:text-[var(--muted)]
        outline-none
        transition
        focus:border-[var(--accent)]
      "
    />
  </div>

  {/* Judge */}
  <select
    value={judgeFilter}
    onChange={(e) => setJudgeFilter(e.target.value)}
    className="
      rounded-2xl border border-white/10
      bg-zinc-900 px-4 py-3
      text-[var(--text)]
      outline-none
      focus:border-[var(--accent)]
    "
  >
    <option value="All">All Judges</option>

    {judges.map((judge) => (
      <option key={judge} value={judge}>
        {judge}
      </option>
    ))}
  </select>

  {/* Vertical */}
  <select
    value={verticalFilter}
    onChange={(e) => setVerticalFilter(e.target.value)}
    className="
      rounded-2xl border border-white/10
      bg-zinc-900 px-4 py-3
      text-[var(--text)]
      outline-none
      focus:border-[var(--accent)]
    "
  >
    <option value="All">All Verticals</option>

    {verticals.map((vertical) => (
      <option key={vertical} value={vertical}>
        {vertical}
      </option>
    ))}
  </select>

  {/* Recommendation */}
  <select
    value={recommendationFilter}
    onChange={(e) => setRecommendationFilter(e.target.value)}
    className="
      rounded-2xl border border-white/10
      bg-zinc-900 px-4 py-3
      text-[var(--text)]
      outline-none
      focus:border-[var(--accent)]
    "
  >
    <option value="All">All Recommendations</option>
    <option value="Recommend">Recommend</option>
    <option value="Maybe">Maybe</option>
    <option value="Reject">Reject</option>
  </select>

</div>
<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
  
      <table className="w-full border-collapse">
        <thead>
        <tr className="border-b border-white/10 bg-white/5">
            <th className="p-4 text-left">Roll</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Verticals</th>
            <th className="p-4 text-left">Judge</th>
            <th className="p-4">Speech</th>
            <th className="p-4">Interview</th>
            <th className="p-4">Skills</th>
            <th className="p-4">Final</th>
            <th className="p-4">Recommendation</th>
            <th className="p-4">View</th>
          </tr>
        </thead>

        <tbody>
          {filteredResults.map((r) => (
            <tr
              key={r.id}
              className="border-b border-white/10 transition-all duration-200 hover:bg-white/5"
            >
              <td className="px-4 py-5">
                {r.sessions.participants.roll_number}
              </td>

              <td className="px-4 py-5">
  {r.sessions.participants.name}
</td>
<td className="px-4 py-5">
  <div className="flex flex-wrap gap-1">
    {r.sessions.participants.participant_verticals?.map(
      (pv: any, index: number) => (
        <span
          key={index}
          className="
            rounded-full
            border border-white/10
            bg-white/5
            px-2 py-1
            text-xs
            text-[var(--muted)]
          "
        >
          {pv.verticals?.name}
        </span>
      )
    )}
  </div>
</td>

<td className="px-4 py-5 text-left text-sm text-[var(--muted)]">
  {r.evaluation_judges?.length
    ? r.evaluation_judges
        .map((ej: any) => ej.judges?.name)
        .filter(Boolean)
        .join(" • ")
    : "—"}
</td>

<td className="text-center">
  {r.speech_score}
</td>

              <td className="text-center">
                {r.interview_score}
              </td>

              <td className="text-center">
                {r.skills_score ?? "-"}
              </td>

              <td className="text-center text-lg font-bold text-[var(--accent)]">
  {getFinalScore(r).toFixed(1)}
</td>
<td className="text-center">
  <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-sm font-medium text-[var(--accent)]">
    {r.final_recommendation}
  </span>
</td>
<td className="text-center">
<button
  onClick={() => setSelectedResult(r)}
  className="rounded-xl bg-[var(--accent)] px-4 py-2 font-semibold text-black transition hover:opacity-90"
>
  View
</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {selectedResult && (
 <div
 className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm"
 onClick={() => setSelectedResult(null)}
>
 <div
   className="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-900/90 p-6 shadow-2xl"
   onClick={(e) => e.stopPropagation()}
 >
      <div className="mb-6">
      <h2 className="text-2xl font-bold text-[var(--text)]">
          {selectedResult.sessions.participants.name}
        </h2>

        <p className="mt-2 text-[var(--muted)]">
          {selectedResult.sessions.participants.roll_number}
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
  Judge(s):{" "}
  <span className="text-[var(--text)]">
    {selectedResult.evaluation_judges?.length
      ? selectedResult.evaluation_judges
          .map((ej: any) => ej.judges?.name)
          .filter(Boolean)
          .join(" • ")
      : "Not recorded"}
  </span>
</p>
      </div>

      <div className="space-y-5">

      <div className="rounded-0.5xl border border-white/10 bg-white/5 p-2">
  <h3 className="font-semibold text-[var(--accent)]">
    Speech Remarks
  </h3>

  <p className="mt-2 text-[var(--muted)] whitespace-pre-wrap">
    {selectedResult.speech_remarks || "No remarks provided."}
  </p>
</div>

<hr className="border-white/10" />

<div className="rounded-0.5xl border border-white/10 bg-white/5 p-2">
  <h3 className="font-semibold text-[var(--accent)]">
    Interview Remarks
  </h3>

  <p className="mt-2 text-[var(--muted)] whitespace-pre-wrap">
    {selectedResult.interview_remarks || "No remarks provided."}
  </p>
</div>

<hr className="border-white/10" />

<div className="rounded-0.5xl border border-white/10 bg-white/5 p-2">
  <h3 className="font-semibold text-[var(--accent)]">
    Skills Remarks
  </h3>

  <p className="mt-2 text-[var(--muted)] whitespace-pre-wrap">
    {selectedResult.skills_remarks || "No remarks provided."}
  </p>
</div>

<hr className="border-white/10" />

<div className="rounded-0.5xl border border-white/10 bg-white/5 p-2">
  <h3 className="font-semibold text-[var(--accent)]">
    General Remarks
  </h3>

  <p className="mt-2 text-[var(--muted)] whitespace-pre-wrap">
    {selectedResult.general_remarks || "No remarks provided."}
  </p>
</div>

<hr className="border-white/10" />

<div className="rounded-0.5xl border border-white/10 bg-white/5 p-2">
  <h3 className="font-semibold text-[var(--accent)]">
    Recommendation  </h3>

  <p className="mt-2 text-[var(--muted)] whitespace-pre-wrap">
    {selectedResult.final_recommendation || "Not specified"}
  </p>
</div>
      </div>

      <button
        onClick={() => setSelectedResult(null)}
        className="mt-8 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-black"
      >
        Close
      </button>
    </div>
  </div>
)}
</div>
    </main>
  );
}