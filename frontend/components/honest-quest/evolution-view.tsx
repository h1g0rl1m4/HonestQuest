"use client"

import { TrendingUp, Clock, Target, Flame } from "lucide-react"

export function EvolutionView() {
  const MOCK_DATA = [
    { dia: "Seg", xp: 45, max: 100 },
    { dia: "Ter", xp: 30, max: 100 },
    { dia: "Qua", xp: 60, max: 100 },
    { dia: "Qui", xp: 20, max: 100 },
    { dia: "Sex", xp: 55, max: 100 },
    { dia: "Sáb", xp: 40, max: 100 },
    { dia: "Dom", xp: 15, max: 100 },
  ]

  const totalXP = 265
  const totalMissions = 18
  const avgFocus = "75 min/dia"

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Evolução</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Relatórios de progresso e análise semanal do teu desempenho.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <TrendingUp className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-heading text-2xl font-bold leading-none">{totalXP}</p>
            <p className="mt-1 text-sm text-muted-foreground">XP Ganhos (Semana)</p>
          </div>
        </article>

        <article className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-success/15 text-success">
            <Target className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-heading text-2xl font-bold leading-none">{totalMissions}</p>
            <p className="mt-1 text-sm text-muted-foreground">Missões Completas</p>
          </div>
        </article>

        <article className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-info/15 text-info">
            <Clock className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-heading text-2xl font-bold leading-none">{avgFocus}</p>
            <p className="mt-1 text-sm text-muted-foreground">Foco Diário (Média)</p>
          </div>
        </article>
      </div>

      <section aria-labelledby="chart-heading" className="rounded-2xl border border-border bg-card p-6">
        <h2 id="chart-heading" className="font-heading text-lg font-semibold mb-6">
          Evolução de XP (Semana Atual)
        </h2>
        
        <div className="flex h-48 items-end gap-2 sm:gap-6 justify-between pt-4 border-b border-border/50 pb-2">
          {MOCK_DATA.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
              <div 
                className="w-full max-w-12 bg-primary/80 rounded-t-md transition-all group-hover:bg-primary relative" 
                style={{ height: `${(d.xp / d.max) * 100}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.xp}
                </span>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{d.dia}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="streak-heading" className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="size-5 text-warning" />
          <h2 id="streak-heading" className="font-heading text-lg font-semibold">
            Análise de Consistência
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Streak Atual (5 dias)</span>
              <span className="text-muted-foreground">Melhor Streak: 12 dias</span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-warning transition-all" style={{ width: `${(5 / 12) * 100}%` }} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Estás a 7 dias de bater o teu recorde pessoal de foco ininterrupto. Mantém o ritmo!
          </p>
        </div>
      </section>
    </div>
  )
}
