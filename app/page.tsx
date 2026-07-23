import Link from "next/link";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-start px-52 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.50), rgba(0,0,0,.70)), url('/backgrounds/landing.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
      }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Card */}
      <div className="relative w-[620px] rounded-[36px] border border-white/10 bg-black/35 p-14 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,.45)]">

        {/* Glow */}
        <div
          className="
            absolute
            left-1/2
            top-24
            h-40
            w-40
            -translate-x-1/2
            rounded-full
            bg-[var(--accent)]/10
            blur-3xl
          "
        />

        <div className="relative text-center">

          <h1
            className={`${cinzel.className} text-7xl tracking-[0.25em] text-[var(--text)]`}
          >
            XDS
          </h1>

          <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-zinc-500">
            Recruitment Portal
          </p>

          <p className="mt-2 text-[var(--muted)]">
            Xaverian Debating Society
          </p>

        </div>

        <div className="mt-12 space-y-4">

          <Link
            href="/organizer"
            className="
              block
              rounded-2xl
              bg-[var(--accent)]
              py-4
              text-center
              text-lg
              font-semibold
              text-black
              transition-all
              duration-200
              hover:bg-[var(--accent-hover)]
              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            Organizer
          </Link>

          <Link
            href="/judge/login"
            className="
              block
              rounded-2xl
              border
              border-zinc-700
              bg-white/5
              py-4
              text-center
              text-lg
              font-semibold
              text-[var(--text)]
              transition-all
              duration-200
              hover:border-[var(--accent)]
              hover:bg-white/10
              hover:-translate-y-0.5
            "
          >
            Judge
          </Link>

          <Link
            href="/results"
            className="
              block
              rounded-2xl
              border
              border-zinc-700
              bg-white/5
              py-4
              text-center
              text-lg
              font-semibold
              text-[var(--text)]
              transition-all
              duration-200
              hover:border-[var(--accent)]
              hover:bg-white/10
              hover:-translate-y-0.5
            "
          >
            Results
          </Link>

        </div>

      </div>
    </main>
  );
}