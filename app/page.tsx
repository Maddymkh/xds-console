export default function Home() {
  return (
    <>
      <style>{`
        @keyframes glow-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.45; }
          33% { transform: translate(4%, -6%) scale(1.08); opacity: 0.55; }
          66% { transform: translate(-3%, 4%) scale(0.96); opacity: 0.4; }
        }
        @keyframes glow-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          50% { transform: translate(-5%, 5%) scale(1.12); opacity: 0.5; }
        }
        @keyframes glow-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          40% { transform: translate(6%, 3%) scale(1.06); opacity: 0.38; }
          80% { transform: translate(-4%, -2%) scale(0.94); opacity: 0.3; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .glow-orb-1 { animation: glow-drift-1 18s ease-in-out infinite; }
        .glow-orb-2 { animation: glow-drift-2 22s ease-in-out infinite; }
        .glow-orb-3 { animation: glow-drift-3 26s ease-in-out infinite; }
        .fade-up { animation: fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-up-delay-1 { animation-delay: 0.12s; opacity: 0; }
        .fade-up-delay-2 { animation-delay: 0.24s; opacity: 0; }
        .fade-up-delay-3 { animation-delay: 0.36s; opacity: 0; }
      `}</style>

      <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[#030303] font-sans text-zinc-100">
        {/* Glowing background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.18),transparent)]" />
          <div className="glow-orb-1 absolute -left-[10%] top-[10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.35)_0%,transparent_70%)] blur-3xl" />
          <div className="glow-orb-2 absolute -right-[5%] top-[30%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.28)_0%,transparent_70%)] blur-3xl" />
          <div className="glow-orb-3 absolute bottom-[-10%] left-[30%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(3,3,3,0.4)_50%,#030303_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        {/* Main content */}
        <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 sm:px-10">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-zinc-400 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
              </span>
              Recruitment &amp; Debate Platform
            </div>

            <h1 className="fade-up fade-up-delay-1 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              XDS Recruitment Portal
            </h1>

            <p className="fade-up fade-up-delay-2 mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg md:mt-8 md:text-xl">
              A smart QR-based recruitment and debate preparation platform.
            </p>

            <div className="fade-up fade-up-delay-3 mt-10 flex w-full flex-col items-stretch gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 text-sm font-medium text-zinc-950 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-[0.98] sm:min-w-[180px]"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-zinc-900">
                  Organizer Login
                </span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-white via-zinc-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              <a
                href="#"
                className="group inline-flex h-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] px-8 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:border-white/[0.22] hover:bg-white/[0.07] hover:text-white hover:shadow-[0_0_32px_rgba(139,92,246,0.12)] active:scale-[0.98] sm:min-w-[180px]"
              >
                <span className="flex items-center gap-2">
                  Participant Scan
                  <svg
                    className="h-4 w-4 translate-x-0 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 9.75h.008v.008h-.008V9.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 3.75h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-4.125 3.75h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 px-6 py-8 text-center">
          <p className="text-xs font-medium tracking-widest text-zinc-600 uppercase">
            Built for XDS
          </p>
        </footer>
      </div>
    </>
  );
}
