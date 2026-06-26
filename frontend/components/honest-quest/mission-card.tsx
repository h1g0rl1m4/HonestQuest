"use client"

import { Check, Clock, Sparkles, Sword } from "lucide-react"
import type { Mission } from "@/lib/quest-data"
import { cn } from "@/lib/utils"

export function MissionCard({
  mission,
  onComplete,
}: {
  mission: Mission
  onComplete: (id: string) => void
}) {
  const { done, isEpic } = mission

  return (
    <article
      className={cn(
        "group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-all",
        done
          ? "border-success/30 bg-success/5"
          : isEpic
            ? "border-warning/40 bg-gradient-to-r from-warning/5 via-card to-card hover:border-warning/60"
            : "border-border bg-card hover:border-foreground/15",
      )}
    >
      {/* Barra lateral dourada para épicas */}
      {isEpic && !done && (
        <span className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-warning via-chart-5 to-warning" />
      )}

      {/* Botão de check */}
      <button
        onClick={() => !done && onComplete(mission.id)}
        disabled={done}
        aria-label={done ? `${mission.title} concluída` : `Concluir ${mission.title}`}
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full border-2 transition-all",
          done
            ? "border-success bg-success text-success-foreground"
            : isEpic
              ? "border-warning/60 text-transparent hover:border-warning hover:text-warning/60"
              : "border-border text-transparent hover:border-success hover:text-success/40",
        )}
      >
        <Check className={cn("size-5", done && "animate-hq-check")} aria-hidden="true" />
      </button>

      {/* Conteúdo da missão */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={cn(
              "truncate font-heading text-sm font-semibold",
              done && "text-muted-foreground line-through",
            )}
          >
            {mission.title}
          </h3>
          {isEpic && !done && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warning">
              <Sword className="size-3" aria-hidden="true" />
              Épica
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {mission.duration}
          </span>
          <span className={cn("flex items-center gap-1 font-medium", isEpic ? "text-warning" : "text-primary")}>
            <Sparkles className="size-3.5" aria-hidden="true" />
            +{mission.xp} XP{isEpic && mission.xpMultiplier ? ` (×${mission.xpMultiplier})` : ""}
          </span>
        </div>
        {isEpic && !done && (
          <p className="mt-1 text-xs text-muted-foreground/70 italic">{mission.detail}</p>
        )}
      </div>

      {/* CTA / Badge concluída */}
      {done ? (
        <span className="hidden shrink-0 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success sm:block">
          Concluída
        </span>
      ) : (
        <button
          onClick={() => onComplete(mission.id)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-transform hover:scale-105 active:scale-95",
            isEpic
              ? "bg-warning text-warning-foreground"
              : "bg-primary text-primary-foreground",
          )}
        >
          {isEpic ? "Aceitar" : "Concluir"}
        </button>
      )}
    </article>
  )
}
