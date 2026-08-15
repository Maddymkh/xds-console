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

    setLoading(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <p className="caption">
            XDS Recruitment 2026–27
          </p>

          <h1 className="display mt-4 text-5xl text-[var(--text)]">
            Results
          </h1>

          <p className="subtitle mt-3">
            Restricted Access
          </p>

        </div>

        <div className="panel p-8">

          <h2 className="text-xl font-semibold text-[var(--text)]">
            Results Access
          </h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Enter the results password to continue.
          </p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
            className="
              mt-6
              w-full
              rounded-xl
              border
              border-white/10
              bg-black/40
              px-4
              py-3
              text-[var(--text)]
              outline-none
              placeholder:text-zinc-600
              focus:border-[var(--accent)]
            "
          />

          <button
            onClick={login}
            disabled={!password || loading}
            className="
              copper-button
              mt-5
              w-full
              px-5
              py-3
              font-semibold
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