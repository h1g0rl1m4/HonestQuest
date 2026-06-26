"use client"

import { ListChecks, PartyPopper } from "lucide-react"
import type { GoalId, Mission } from "@/lib/quest-data"
import { GoalSelector } from "./goal-selector"
import { StatCards } from "./stat-cards"
import { MissionCard } from "./mission-card"
import { IntentionCard } from "./intention-card"

export function DashboardView({
  name,
  activeGoal,
  onSelectGoal,
  missions,
  onComplete,
  intention,
  onIntentionChange,
  streak,
  completed,
  level,
  xpInLevel,
  xpForNext,
}: {
  name: string
  activeGoal: GoalId
  onSelectGoal: (id: GoalId) => void
  missions: Mission[]
  onComplete: (id: string) => void
  intention: string
  onIntentionChange: (value: string) => void
  streak: number
  completed: number
  level: number
  xpInLevel: number
  xpForNext: number
}) {
  const remaining = missions.filter((m) => !m.done).length
  const allDone = remaining === 0

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-balance font-heading text-2xl font-bold sm:text-3xl">
          Resumo do herói
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Olá, {name.split(" ")[0]}. Aqui está o teu estado atual e as missões do dia.
        </p>
      </header>

      <StatCards
        streak={streak}
        completed={completed}
        level={level}
        xpInLevel={xpInLevel}
        xpForNext={xpForNext}
      />

      <GoalSelector active={activeGoal} onSelect={onSelectGoal} />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section aria-labelledby="missions-heading" className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListChecks className="size-5 text-primary" aria-hidden="true" />
              <h2 id="missions-heading" className="font-heading text-lg font-semibold">
                Missões de hoje
              </h2>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {remaining} restantes
            </span>
          </div>

          {allDone ? (
            <div className="animate-hq-pop flex flex-col items-center gap-2 rounded-xl border border-success/30 bg-success/5 px-4 py-10 text-center">
              <PartyPopper className="size-8 text-success" aria-hidden="true" />
              <p className="font-heading text-base font-semibold">Todas as missões concluídas!</p>
              <p className="text-sm text-muted-foreground">
                Mandaste bem. Volta amanhã para manter o teu streak.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {missions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} onComplete={onComplete} />
              ))}
            </div>
          )}
        </section>

        <IntentionCard intention={intention} onChange={onIntentionChange} />
      </div>
    </div>
  )
}
