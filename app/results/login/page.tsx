"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function login() {
    if (!password || loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/results-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/results");
        router.refresh();
      } else {
        alert("Incorrect results password.");
        setPassword("");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">

      <div className="relative w-full max-w-md">

        <div className="mb-8 text-center">

          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[var(--muted)]">
            XDS Recruitment 2026–27
          </p>

          <h1 className="display text-4xl text-[var(--text)]">
            Results
          </h1>

          <p className="subtitle mt-3">
            Restricted Evaluation Records
          </p>

        </div>

        <div className="panel rounded-[28px] p-8 backdrop-blur-xl">

          <h2 className="text-xl font-semibold text-[var(--text)]">
            Results Access
          </h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Enter the results access password to continue.
          </p>

          <label className="mb-2 mt-7 block text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter results password"
            value={password}
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
            className="
              w-full rounded-xl
              border border-white/10
              bg-black/40
              px-4 py-3
              text-[var(--text)]
              outline-none
              placeholder:text-zinc-600
              focus:border-[var(--accent)]
              focus:ring-1
              focus:ring-[var(--accent)]
            "
          />

          <button
            onClick={login}
            disabled={!password || loading}
            className="
              copper-button
              mt-5
              w-full
              px-5 py-3
              text-sm font-semibold
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Authenticating..." : "View Results"}
          </button>

        </div>

      </div>

    </main>
  );
}