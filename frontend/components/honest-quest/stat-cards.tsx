import { Flame, CheckCircle2, Trophy } from "lucide-react"
import { XpBar } from "./xp-bar"

export function StatCards({
  streak,
  completed,
  level,
  xpInLevel,
  xpForNext,
}: {
  streak: number
  completed: number
  level: number
  xpInLevel: number
  xpForNext: number
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <article className="rounded-2xl border border-border bg-card p-5 sm:col-span-2 lg:col-span-1">
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
