"use client"

import { Check, Clock, Sparkles } from "lucide-react"
import type { Mission } from "@/lib/quest-data"
import { cn } from "@/lib/utils"

export function MissionCard({
  mission,
  onComplete,
}: {
  mission: Mission
  onComplete: (id: string) => void
}) {
  const { done } = mission
  return (
    <article
      className={cn(
        "group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-all",
        done ? "border-success/30 bg-success/5" : "border-border bg-card hover:border-foreground/15",
      )}
    >
      <button
        onClick={() => !done && onComplete(mission.id)}
        disabled={done}
        aria-label={done ? `${mission.title} concluída` : `Concluir ${mission.title}`}
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full border-2 transition-all",
          done
            ? "border-success bg-success text-success-foreground"
            : "border-border text-transparent hover:border-success hover:text-success/40",
        )}
      >
        <Check className={cn("size-5", done && "animate-hq-check")} aria-hidden="true" />
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            "truncate font-heading text-sm font-semibold",
            done && "text-muted-foreground line-through",
          )}
        >
          {mission.title}
        </h3>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {mission.duration}
          </span>
          <span className="flex items-center gap-1 font-medium text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />+{mission.xp} XP
          </span>
        </div>
      </div>

      {done ? (
        <span className="hidden shrink-0 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success sm:block">
          Concluída
        </span>
      ) : (
        <button
          onClick={() => onComplete(mission.id)}
          className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          Concluir
        </button>
      )}
    </article>
  )
}
