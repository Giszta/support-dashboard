import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Support Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Starter aplikacji gotowy
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Kolejny etap to budowa MVP dashboardu supportowego.
          </p>
        </div>

        <Link
          href="/overview"
          className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium transition hover:bg-slate-800 text-white"
        >
          Przejdź do dashboardu
        </Link>
      </div>
    </main>
  );
}
