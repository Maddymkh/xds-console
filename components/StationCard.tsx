export default function StationCard() {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
  
        <div className="flex items-center justify-between">
  
          <h2 className="text-lg font-semibold text-white">
            Station A
          </h2>
  
          <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-400">
            Available
          </span>
  
        </div>
  
        <div className="mt-5 space-y-2">
  
          <p className="text-sm text-zinc-500">
            Judges
          </p>
  
          <p className="text-white">
            Ananya
          </p>
  
          <p className="text-white">
            Rohan
          </p>
  
        </div>
  
        <button className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-500">
  
          Assign Participant
  
        </button>
  
      </div>
    );
  }