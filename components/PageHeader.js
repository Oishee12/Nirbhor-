export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-current/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-600">
            {eyebrow}
          </p>
        )}

        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1.5 text-sm opacity-65">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </header>
  );
}