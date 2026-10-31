import { ShieldCheck } from "lucide-react";

export default function Brand({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-teal-200">
        <ShieldCheck size={22} strokeWidth={1.8} />
      </div>

      <div className={compact ? "hidden" : "min-w-0"}>
        <h1 className="text-sm font-bold tracking-tight text-white">
          Nirbhor
        </h1>

        <p className="text-[10px] text-teal-100/75">
          Verified Trust Portal
        </p>
      </div>
    </div>
  );
}