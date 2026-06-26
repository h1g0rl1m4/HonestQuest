"use client"

import { Check } from "lucide-react"
import { GOALS, type GoalId } from "@/lib/quest-data"
import { ACCENT } from "./accent"
import { cn } from "@/lib/utils"

export function GoalSelector({
  active,
  onSelect,
}: {
  active: GoalId
  onSelect: (id: GoalId) => void
}) {
  return (
    <section aria-labelledby="goal-heading">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 id="goal-heading" className="font-heading text-lg font-semibold">
          Objetivo do dia
        </h2>
        <span className="text-xs text-muted-foreground">Escolhe o teu foco</span>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {GOALS.map((goal) => {
          const isActive = active === goal.id
          const accent = ACCENT[goal.accent]
          return (
            <button
              key={goal.id}
              onClick={() => onSelect(goal.id)}
              aria-pressed={isActive}
              className={cn(
                "group relative flex flex-col items-start gap-3 rounded-2xl border bg-card p-4 text-left transition-all",
                isActive
                  ? cn("ring-2", accent.ring, accent.border, "animate-hq-pop")
                  : "border-border hover:-translate-y-0.5 hover:border-foreground/20",
              )}
            >
              {isActive && (
                <span
                  className={cn(
                    "absolute right-3 top-3 grid size-5 place-items-center rounded-full",
                    accent.bg,
                  )}
                >
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
              )}
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl transition-colors",
                  isActive ? accent.bg : accent.softBg,
                )}
              >
                <goal.icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-heading text-sm font-semibold">{goal.label}</span>
                <span className="block text-xs text-muted-foreground">{goal.tagline}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
