function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse rounded bg-zinc-100 dark:bg-zinc-800 ${className ?? ""}`} style={style} />;
}

export default function SkeletonResults() {
  return (
    <div className="mt-6 flex flex-col gap-5">
      {/* Profile card */}
      <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
        <div className="mb-3 flex items-center justify-between">
          <Bone className="h-4 w-28" />
          <Bone className="h-3 w-36" />
        </div>
        <div className="flex flex-col gap-3">
          <div><Bone className="mb-1.5 h-2.5 w-16" /><div className="flex gap-1.5"><Bone className="h-5 w-28 rounded-full" /><Bone className="h-5 w-36 rounded-full" /><Bone className="h-5 w-24 rounded-full" /></div></div>
          <div><Bone className="mb-1.5 h-2.5 w-16" /><div className="flex gap-1.5"><Bone className="h-5 w-20 rounded-full" /><Bone className="h-5 w-28 rounded-full" /></div></div>
        </div>
      </div>

      {/* Trial list */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <Bone className="h-4 w-40" />
          <Bone className="h-3 w-28" />
        </div>
        <ul className="flex flex-col gap-3">
          {[72, 56, 80].map((w) => (
            <li key={w} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
              <div className="mb-1.5 flex items-start justify-between gap-3">
                <Bone className={`h-4 w-${w}/100`} style={{ width: `${w}%` }} />
                <Bone className="h-5 w-16 shrink-0 rounded-full" />
              </div>
              <Bone className="mb-2 h-3 w-52" />
              <Bone className="h-3 w-44" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
