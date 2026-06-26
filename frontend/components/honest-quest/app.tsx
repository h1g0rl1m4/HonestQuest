"use client"

import { useMemo, useState } from "react"
import confetti from "canvas-confetti"
import {
  MISSIONS_BY_GOAL,
  levelFromXp,
  type GoalId,
  type Mission,
} from "@/lib/quest-data"
import { Sidebar, BottomNav, type ViewId } from "./navigation"
import { Topbar } from "./topbar"
import { DashboardView } from "./dashboard-view"
import { ScheduleView } from "./schedule-view"
import { ProfileView } from "./profile-view"

const NAME = "Caio Hero"
const BASE_XP = 1200
const BASE_COMPLETED = 12

function buildMissions(goal: GoalId): Mission[] {
  return MISSIONS_BY_GOAL[goal].map((m, i) => ({ ...m, done: i === 0 && goal === "estudos" }))
}

function fireConfetti() {
  const colors = ["#a78bfa", "#34d399", "#60a5fa", "#fbbf24"]
  confetti({
    particleCount: 70,
    spread: 70,
    startVelocity: 38,
    origin: { y: 0.7 },
    colors,
    scalar: 0.9,
    disableForReducedMotion: true,
  })
}

export function HonestQuestApp() {
  const [view, setView] = useState<ViewId>("dashboard")
  const [activeGoal, setActiveGoal] = useState<GoalId>("estudos")
  const [missions, setMissions] = useState<Mission[]>(() => buildMissions("estudos"))
  const [earnedXp, setEarnedXp] = useState(0)
  const [extraCompleted, setExtraCompleted] = useState(0)
  const [intention, setIntention] = useState(
    "Hoje quero focar-me em avançar na matéria de Cálculo e não falhar o treino.",
  )

  const totalXp = BASE_XP + earnedXp
  const { level, xpInLevel, xpForNext } = useMemo(() => levelFromXp(totalXp), [totalXp])
  const completed = BASE_COMPLETED + extraCompleted

  function selectGoal(goal: GoalId) {
    setActiveGoal(goal)
    setMissions(buildMissions(goal))
  }

  function completeMission(id: string) {
    setMissions((prev) => {
      const target = prev.find((m) => m.id === id)
      if (!target || target.done) return prev
      setEarnedXp((xp) => xp + target.xp)
      setExtraCompleted((c) => c + 1)
      fireConfetti()
      return prev.map((m) => (m.id === id ? { ...m, done: true } : m))
    })
  }

  const greeting = `Bem-vindo de volta, ${NAME.split(" ")[0]}! 🚀`

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar active={view} onChange={setView} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          name={NAME}
          level={level}
          totalXp={totalXp}
          streak={5}
          greeting={greeting}
        />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-6 md:px-8 lg:pb-10">
          {view === "dashboard" && (
            <DashboardView
              name={NAME}
              activeGoal={activeGoal}
              onSelectGoal={selectGoal}
              missions={missions}
              onComplete={completeMission}
              intention={intention}
              onIntentionChange={setIntention}
              streak={5}
              completed={completed}
              level={level}
              xpInLevel={xpInLevel}
              xpForNext={xpForNext}
            />
          )}

          {view === "horarios" && <ScheduleView />}

          {view === "perfil" && (
            <ProfileView
              name={NAME}
              level={level}
              totalXp={totalXp}
              xpInLevel={xpInLevel}
              xpForNext={xpForNext}
              streak={5}
              completed={completed}
            />
          )}
        </main>
      </div>

      <BottomNav active={view} onChange={setView} />
    </div>
  )
}
