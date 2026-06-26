import { cn } from "@/lib/utils"

interface XpBarProps {
  value: number
  max: number
  className?: string
  showShimmer?: boolean
}

export function XpBar({ value, max, className, showShimmer = true }: XpBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div
      className={cn("relative h-2.5 w-full overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div
        className="relative h-full rounded-full bg-gradient-to-r from-primary via-chart-5 to-info transition-[width] duration-700 ease-out"
        style={{ width: `${pct}%` }}
      >
        {showShimmer && pct > 0 && (
          <span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ animation: "hq-shimmer 2.2s ease-in-out infinite" }}
          />
        )}
      </div>
    </div>
  )
}
