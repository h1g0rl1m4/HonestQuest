"use client"

import { ListChecks, PartyPopper, Sword } from "lucide-react"
import type { GoalId, Mission } from "@/lib/quest-data"
import { GoalSelector } from "./goal-selector"
import { StatCards } from "./stat-cards"
import { MissionCard } from "./mission-card"
import { IntentionCard } from "./intention-card"
import { MentorCard } from "./mentor-card"

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
  lastCompletedEpic,
  justLeveledUp,
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
  lastCompletedEpic?: boolean
  justLeveledUp?: boolean
  onGenerateSecretMission?: () => void
  isGeneratingSecret?: boolean
}) {
  const regularMissions = missions.filter((m) => !m.isEpic)
  const epicMissions = missions.filter((m) => m.isEpic)
  const regularRemaining = regularMissions.filter((m) => !m.done).length
  const epicRemaining = epicMissions.filter((m) => !m.done).length
  const allRegularDone = regularRemaining === 0 && regularMissions.length > 0

  const totalDone = missions.filter((m) => m.done).length

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
        {/* Coluna esquerda: Missões */}
        <div className="space-y-5">
          {/* Missões regulares */}
          <section aria-labelledby="missions-heading" className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListChecks className="size-5 text-primary" aria-hidden="true" />
                <h2 id="missions-heading" className="font-heading text-lg font-semibold">
                  Missões de hoje
                </h2>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {regularRemaining} restantes
              </span>
            </div>

            {allRegularDone ? (
              <div className="animate-hq-pop flex flex-col items-center gap-2 rounded-xl border border-success/30 bg-success/5 px-4 py-8 text-center">
                <PartyPopper className="size-8 text-success" aria-hidden="true" />
                <p className="font-heading text-base font-semibold">Missões diárias concluídas!</p>
                <p className="text-sm text-muted-foreground">
                  {epicRemaining > 0
                    ? "Tens missões épicas à tua espera ⬇️"
                    : "Mandaste bem. Volta amanhã para manter o teu streak."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {regularMissions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} onComplete={onComplete} />
                ))}
              </div>
            )}
          </section>

          {/* Missões épicas */}
          {epicMissions.length > 0 && (
            <section aria-labelledby="epic-heading" className="rounded-2xl border border-warning/30 bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sword className="size-5 text-warning" aria-hidden="true" />
                  <h2 id="epic-heading" className="font-heading text-lg font-semibold">
                    Missões épicas
                  </h2>
                  <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warning">
                    Sessões longas
                  </span>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {epicRemaining} restantes
                </span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">
                Desafios de alto esforço com XP bónus. Apenas para os determinados.
              </p>
              <div className="space-y-3">
                {epicMissions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} onComplete={onComplete} />
                ))}
              </div>
            </section>
          )}
          {/* Motor de missões secretas (IA) */}
          <section aria-labelledby="secret-heading" className="rounded-2xl border border-primary/30 bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PartyPopper className="size-5 text-primary" aria-hidden="true" />
                <h2 id="secret-heading" className="font-heading text-lg font-semibold">
                  Missão Secreta (IA)
                </h2>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                  Gerada na hora
                </span>
              </div>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Deixa a inteligência artificial analisar o teu perfil e criar um desafio surpresa.
            </p>
            <button
              onClick={onGenerateSecretMission}
              disabled={isGeneratingSecret}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGeneratingSecret ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  A IA está a pensar...
                </>
              ) : (
                <>
                  <PartyPopper className="size-4" />
                  Gerar Missão Secreta
                </>
              )}
            </button>
          </section>
        </div>

        {/* Coluna direita: Mentor + Intenção */}
        <div className="space-y-4">
          <MentorCard
            streak={streak}
            missionsDone={totalDone}
            totalMissions={missions.length}
            epicDoneThisAction={lastCompletedEpic}
            justLeveledUp={justLeveledUp}
            isNewSession={totalDone === 0}
          />
          <IntentionCard intention={intention} onChange={onIntentionChange} />
        </div>
      </div>
    </div>
  )
}
