import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">

      <div className="w-[500px] rounded-3xl border border-zinc-800 bg-zinc-900/70 p-10">

        <h1 className="text-center text-5xl font-bold text-white">
          XDS
        </h1>

        <p className="mt-3 text-center text-zinc-400">
          Recruitment Management System
        </p>

        <div className="mt-10 space-y-4">

          <Link
            href="/organizer"
            className="block rounded-xl bg-indigo-600 py-4 text-center font-medium text-white transition hover:bg-indigo-500"
          >
            Organizer
          </Link>

          <Link
            href="/judge/login"
            className="block rounded-xl border border-zinc-700 py-4 text-center font-medium text-white transition hover:border-indigo-500"
          >
            Judge
          </Link>

        </div>

      </div>

    </main>
  );
}