import { Flame, CheckCircle2, Trophy, Gauge } from "lucide-react"
import { XpBar } from "./xp-bar"

export function StatCards({
  streak,
  completed,
  level,
  xpInLevel,
  xpForNext,
  completionRate = 0.78,
}: {
  streak: number
  completed: number
  level: number
  xpInLevel: number
  xpForNext: number
  completionRate?: number
}) {
  let diffLabel = "Fácil"
  let diffColor = "text-success"
  let diffBg = "bg-success/15"

  if (completionRate > 0.8) {
    diffLabel = "Difícil"
    diffColor = "text-destructive"
    diffBg = "bg-destructive/15"
  } else if (completionRate >= 0.5) {
    diffLabel = "Intermédio"
    diffColor = "text-warning"
    diffBg = "bg-warning/15"
  }

  const ratePercent = Math.round(completionRate * 100)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-warning/15 text-warning">
          <Flame className="size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-2xl font-bold leading-none">{streak} dias</p>
          <p className="mt-1 text-sm text-muted-foreground">Streak de foco</p>
        </div>
      </article>

      <article className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-success/15 text-success">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-2xl font-bold leading-none">{completed}</p>
          <p className="mt-1 text-sm text-muted-foreground">Missões concluídas</p>
        </div>
      </article>

      <article className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${diffBg} ${diffColor}`}>
          <Gauge className="size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-2xl font-bold leading-none">{diffLabel}</p>
          <p className="mt-1 text-sm text-muted-foreground">Dificuldade ({ratePercent}%)</p>
        </div>
      </article>

      <article className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Trophy className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-heading text-2xl font-bold leading-none">
              {xpInLevel.toLocaleString("pt-BR")}{" "}
              <span className="text-base font-medium text-muted-foreground">
                / {xpForNext.toLocaleString("pt-BR")}
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">XP para o Nível {level + 1}</p>
          </div>
        </div>
        <XpBar value={xpInLevel} max={xpForNext} className="mt-4" />
      </article>
    </div>
  )
}
