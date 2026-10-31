export default function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = "teal",
}) {
  const accentClasses = {
    teal: "bg-teal-50 text-teal-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <article className="rounded-xl border border-[#D8DFDD] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        {Icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              accentClasses[accent] ?? accentClasses.teal
            }`}
          >
            <Icon size={19} />
          </div>
        )}
      </div>

      {detail && (
        <p className="mt-3 text-[11px] leading-5 text-slate-500">
          {detail}
        </p>
      )}
    </article>
  );
}