"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/organizer");
    } else {
      alert("Wrong password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-96 rounded-2xl bg-zinc-900 p-8">
        <h1 className="mb-6 text-3xl font-bold text-white">
          XDS Console
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full rounded-lg bg-zinc-800 p-3 text-white"
        />

        <button
          onClick={login}
          className="mt-5 w-full rounded-lg bg-[var(--accent)] py-3 text-black"
        >
          Continue
        </button>
      </div>
    </div>
  );
}