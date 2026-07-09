export default function ParticipantCard() {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900">
  
        <div className="flex items-start justify-between">
  
          <div>
  
            <p className="text-sm text-zinc-500">
              23BCOM145
            </p>
  
            <h2 className="mt-1 text-xl font-semibold text-white">
              Aryan Mukherjee
            </h2>
  
          </div>
  
          <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400">
  
            Checked In
  
          </span>
  
        </div>
  
        <div className="mt-5 flex flex-wrap gap-2">
  
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
            PR
          </span>
  
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
            Debating
          </span>
  
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
            Content
          </span>
  
        </div>
  
        <button className="mt-6 w-full rounded-xl bg-white py-3 font-medium text-black transition hover:scale-[1.02]">
  
          Start Session
  
        </button>
  
      </div>
    );
  }