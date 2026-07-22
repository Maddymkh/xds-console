export default function SearchBar() {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <h2 className="mb-4 text-lg font-semibold text-[var(--text)]">
          Search Participant
        </h2>
  
        <input
          type="text"
          placeholder="Search by Roll Number..."
          className="w-full rounded-xl border border-zinc-700 bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-all focus:border-indigo-500"
        />
      </div>
    );
  }