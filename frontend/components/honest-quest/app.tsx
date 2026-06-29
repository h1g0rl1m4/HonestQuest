"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
import { EvolutionView } from "./evolution-view"
import { LevelUpModal } from "./level-up-modal"
import { OnboardingModal, type OnboardingResult } from "./onboarding-modal"
import { Sword } from "lucide-react"

const NAME = "Caio Hero"
const BASE_XP = 1200
const BASE_COMPLETED = 12
const ONBOARDING_KEY = "hq_onboarding_done"

function buildMissions(goal: GoalId): Mission[] {
  return MISSIONS_BY_GOAL[goal].map((m, i) => ({
    ...m,
    done: i === 0 && goal === "estudos",
  }))
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

  // ─── Level-up tracking ────────────────────────────────────────────────────
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [justLeveledUp, setJustLeveledUp] = useState(false)
  const [lastCompletedEpic, setLastCompletedEpic] = useState(false)
  const prevLevelRef = useRef<number | null>(null)

  // ─── Onboarding ───────────────────────────────────────────────────────────
  const [onboardingDone, setOnboardingDone] = useState<boolean>(true) // true by default for SSR to prevent hydration mismatch

  useEffect(() => {
    const isDone = localStorage.getItem(ONBOARDING_KEY) === "true"
    setOnboardingDone(isDone)
  }, [])

  const totalXp = BASE_XP + earnedXp
  const { level, xpInLevel, xpForNext } = useMemo(() => levelFromXp(totalXp), [totalXp])
  const completed = BASE_COMPLETED + extraCompleted

  const completionRate = missions.length > 0 ? missions.filter(m => m.done).length / missions.length : 0

  // Detecta subida de nível
  useEffect(() => {
    if (prevLevelRef.current === null) {
      prevLevelRef.current = level
      return
    }
    if (level > prevLevelRef.current) {
      prevLevelRef.current = level
      setShowLevelUp(true)
      setJustLeveledUp(true)
      setTimeout(() => setJustLeveledUp(false), 5000)
    }
  }, [level])

  function handleOnboardingComplete(result: OnboardingResult) {
    localStorage.setItem(ONBOARDING_KEY, "true")
    localStorage.setItem("hq_profile", JSON.stringify(result))
    // Aplica o objetivo escolhido no onboarding
    if (result.mainGoal as GoalId) {
      setActiveGoal(result.mainGoal as GoalId)
      setMissions(buildMissions(result.mainGoal as GoalId))
    }
    setOnboardingDone(true)
  }

  function selectGoal(goal: GoalId) {
    setActiveGoal(goal)
    setMissions(buildMissions(goal))
    setLastCompletedEpic(false)
  }

  function completeMission(id: string) {
    setMissions((prev) => {
      const target = prev.find((m) => m.id === id)
      if (!target || target.done) return prev

      const isEpic = !!target.isEpic
      const xpGain = target.xp

      setEarnedXp((xp) => xp + xpGain)
      setExtraCompleted((c) => c + 1)
      setLastCompletedEpic(isEpic)
      fireConfetti()

      return prev.map((m) => (m.id === id ? { ...m, done: true } : m))
    })
  }

  const greeting = `Bem-vindo de volta, ${NAME.split(" ")[0]}! 🚀`

  const [isGeneratingSecret, setIsGeneratingSecret] = useState(false)

  async function generateSecretMission() {
    setIsGeneratingSecret(true)
    try {
      // Lê perfil do localStorage (salvo no onboarding)
      const profileData = localStorage.getItem("hq_profile")
      const profile = profileData ? JSON.parse(profileData) : {}
      
      const reqBody = {
        nome: profile.name || NAME.split(" ")[0],
        objetivo: profile.mainGoal || activeGoal,
        tempo: parseInt(profile.timeAvailable || "30", 10)
      }

      const res = await fetch("http://127.0.0.1:8000/missoes/gerar-secreta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody)
      })
      
      if (!res.ok) throw new Error("Erro ao gerar missão")
      const data = await res.json()
      
      const newMission: Mission = {
        id: `secret-${Date.now()}`,
        title: data.titulo,
        detail: data.detalhes,
        duration: "?? min",
        xp: data.xp_recompensa || 100,
        icon: Sword, // Ou outro ícone para missão secreta
        done: false,
        isEpic: true,
      }
      
      setMissions(prev => [...prev, newMission])
    } catch (err) {
      console.error(err)
      alert("Falha ao contactar a IA local. Verifica se o backend está a correr.")
    } finally {
      setIsGeneratingSecret(false)
    }
  }

  return (
    <>
      {/* Onboarding na primeira visita */}
      {!onboardingDone && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}

      {/* Modal de level-up */}
      {showLevelUp && (
        <LevelUpModal
          level={level}
          totalXp={totalXp}
          onClose={() => setShowLevelUp(false)}
        />
      )}

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
                lastCompletedEpic={lastCompletedEpic}
                justLeveledUp={justLeveledUp}
                onGenerateSecretMission={generateSecretMission}
                isGeneratingSecret={isGeneratingSecret}
                completionRate={completionRate}
              />
            )}

            {view === "horarios" && <ScheduleView />}
            {view === "evolucao" && <EvolutionView />}

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
    </>
  )
}
