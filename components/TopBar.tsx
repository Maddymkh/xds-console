export default function TopBar() {
    const today = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  
    return (
      <header className="flex items-center justify-between border-b border-zinc-800 bg-[var(--bg)] px-8 py-5">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">
            XDS Console
          </h1>
  
          <p className="text-sm text-[var(--muted)]">
            Recruitment Management System
          </p>
        </div>
  
        <div className="text-right">
          <p className="text-sm text-zinc-500">{today}</p>
  
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
  
            <span className="text-sm font-medium text-zinc-200">
              Organizer
            </span>
          </div>
        </div>
      </header>
    );
  }