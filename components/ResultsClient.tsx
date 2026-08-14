"use client";

import { useState } from "react";
import { Search } from "lucide-react";

type Props = {
  results: any[];
};

export default function ResultsClient({ results }: Props) {
    const [selectedResult, setSelectedResult] = useState<any | null>(null);
    const [search, setSearch] = useState("");
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
const filteredResults = results.filter((r) => {
    const name = r.sessions.participants.name.toLowerCase();
    const roll = r.sessions.participants.roll_number.toLowerCase();
  
    return (
      name.includes(search.toLowerCase()) ||
      roll.includes(search.toLowerCase())
    );
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
<div className="mb-8 flex justify-end">
  <div className="relative">
    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
    />

    <input
      type="text"
      placeholder="Search by name or roll number..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-80
        rounded-2xl
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
</div>
<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
  
      <table className="w-full border-collapse">
        <thead>
        <tr className="border-b border-white/10 bg-white/5">
            <th className="p-4 text-left">Roll</th>
            <th className="p-4 text-left">Name</th>
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
  {(
    r.skills_score != null
      ? (2 * r.speech_score + 2 * r.skills_score + r.interview_score) / 5
      : (2 * r.speech_score + r.interview_score) / 3
  ).toFixed(1)}
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
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    onClick={() => setSelectedResult(null)}
  >
    <div
     className="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl p-6 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-6">
      <h2 className="text-2xl font-bold text-[var(--text)]">
          {selectedResult.sessions.participants.name}
        </h2>

        <p className="mt-2 text-[var(--muted)]">
          {selectedResult.sessions.participants.roll_number}
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