import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  Dumbbell,
  Zap,
  HeartPulse,
  Brain,
  Droplets,
  Footprints,
  NotebookPen,
  Timer,
  Moon,
  Apple,
  Target,
} from "lucide-react"

export type GoalId = "estudos" | "treino" | "produtividade" | "habitos"

export interface Goal {
  id: GoalId
  label: string
  tagline: string
  icon: LucideIcon
  /** token name used for accent color: primary | success | info | warning */
  accent: "primary" | "success" | "info" | "warning"
}

export interface Mission {
  id: string
  title: string
  detail: string
  duration: string
  xp: number
  icon: LucideIcon
  done: boolean
}

export const GOALS: Goal[] = [
  {
    id: "estudos",
    label: "Estudar",
    tagline: "Avançar no conhecimento",
    icon: BookOpen,
    accent: "primary",
  },
  {
    id: "treino",
    label: "Treinar",
    tagline: "Mexer o corpo",
    icon: Dumbbell,
    accent: "info",
  },
  {
    id: "produtividade",
    label: "Produtividade",
    tagline: "Fazer acontecer",
    icon: Zap,
    accent: "warning",
  },
  {
    id: "habitos",
    label: "Hábitos",
    tagline: "Cuidar de si",
    icon: HeartPulse,
    accent: "success",
  },
]

export const MISSIONS_BY_GOAL: Record<GoalId, Omit<Mission, "done">[]> = {
  estudos: [
    {
      id: "est-1",
      title: "Estudar Cálculo (Cap. 3)",
      detail: "Leitura focada sem distrações",
      duration: "45 min",
      xp: 20,
      icon: BookOpen,
    },
    {
      id: "est-2",
      title: "Revisão ativa com flashcards",
      detail: "Recordar o que aprendeu ontem",
      duration: "15 min",
      xp: 10,
      icon: Brain,
    },
    {
      id: "est-3",
      title: "Ler artigo de Física",
      detail: "Aprofundar um tema novo",
      duration: "20 min",
      xp: 10,
      icon: NotebookPen,
    },
  ],
  treino: [
    {
      id: "tre-1",
      title: "Treino de força",
      detail: "Foco em pernas e core",
      duration: "30 min",
      xp: 15,
      icon: Dumbbell,
    },
    {
      id: "tre-2",
      title: "Caminhada ao ar livre",
      detail: "10.000 passos no dia",
      duration: "25 min",
      xp: 12,
      icon: Footprints,
    },
    {
      id: "tre-3",
      title: "Alongamento e mobilidade",
      detail: "Recuperação ativa",
      duration: "10 min",
      xp: 8,
      icon: HeartPulse,
    },
  ],
  produtividade: [
    {
      id: "pro-1",
      title: "Bloco de foco profundo",
      detail: "Uma tarefa, zero distrações",
      duration: "50 min",
      xp: 20,
      icon: Timer,
    },
    {
      id: "pro-2",
      title: "Planejar o dia seguinte",
      detail: "Definir as 3 prioridades",
      duration: "10 min",
      xp: 10,
      icon: Target,
    },
    {
      id: "pro-3",
      title: "Inbox zero",
      detail: "Limpar e-mails e mensagens",
      duration: "15 min",
      xp: 10,
      icon: Zap,
    },
  ],
  habitos: [
    {
      id: "hab-1",
      title: "Beber 2L de água",
      detail: "Mantenha-se hidratado",
      duration: "Dia todo",
      xp: 10,
      icon: Droplets,
    },
    {
      id: "hab-2",
      title: "Dormir antes das 23h",
      detail: "Sono de qualidade",
      duration: "8h",
      xp: 15,
      icon: Moon,
    },
    {
      id: "hab-3",
      title: "Refeição saudável",
      detail: "Comer bem sem pressa",
      duration: "30 min",
      xp: 10,
      icon: Apple,
    },
  ],
}

export const XP_PER_LEVEL = 2000

export function levelFromXp(totalXp: number) {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1
  const xpInLevel = totalXp % XP_PER_LEVEL
  return { level, xpInLevel, xpForNext: XP_PER_LEVEL }
}
