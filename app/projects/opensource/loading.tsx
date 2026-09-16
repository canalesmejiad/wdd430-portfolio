export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-5xl px-6 py-12"
      aria-busy="true"
      aria-label="Loading open source projects"
    >
      <div className="mb-8 h-10 w-72 animate-pulse rounded bg-slate-300" />

      <section className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-lg border border-slate-300 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 h-7 w-3/4 rounded bg-slate-300" />
            <div className="mb-3 h-4 w-full rounded bg-slate-200" />
            <div className="mb-6 h-4 w-2/3 rounded bg-slate-200" />
            <div className="h-4 w-1/2 rounded bg-slate-300" />
          </div>
        ))}
      </section>
    </main>
  );
}