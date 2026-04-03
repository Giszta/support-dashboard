export function AppTopbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Workspace
        </p>
        <h1 className="text-base font-semibold text-slate-900">
          Support Team Alpha
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:block">
          agent.sophie@support.dev
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          S
        </div>
      </div>
    </header>
  );
}
