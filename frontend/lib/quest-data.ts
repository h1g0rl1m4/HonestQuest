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
  Sword,
  FlameKindling,
  ScrollText,
  Microscope,
  Mountain,
} from "lucide-react"

export type GoalId = "estudos" | "treino" | "produtividade" | "habitos"

export interface Goal {
  id: GoalId
  label: string
  tagline: string
  icon: LucideIcon
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
  isEpic?: boolean     // Missão épica: sessão longa com XP bónus
  xpMultiplier?: number // Multiplicador de XP para épicas (default 2x)
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
    // ÉPICA
    {
      id: "est-epic-1",
      title: "Maratona de Estudo: Cálculo Completo",
      detail: "Três capítulos seguidos. Modo guerreiro ativado.",
      duration: "2h 30min",
      xp: 80,
      icon: Microscope,
      isEpic: true,
      xpMultiplier: 2,
    },
    {
      id: "est-epic-2",
      title: "Projeto de pesquisa aprofundada",
      detail: "Escolhe um tema e escreve um resumo completo",
      duration: "1h 45min",
      xp: 60,
      icon: ScrollText,
      isEpic: true,
      xpMultiplier: 2,
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
    // ÉPICA
    {
      id: "tre-epic-1",
      title: "Desafio do Guerreiro: Full Body",
      detail: "Treino completo sem pausas. Sem desculpas.",
      duration: "1h 30min",
      xp: 60,
      icon: Sword,
      isEpic: true,
      xpMultiplier: 2,
    },
    {
      id: "tre-epic-2",
      title: "Trilha da Montanha",
      detail: "Corrida longa ou caminhada de alta intensidade",
      duration: "1h 15min",
      xp: 50,
      icon: Mountain,
      isEpic: true,
      xpMultiplier: 2,
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
    // ÉPICA
    {
      id: "pro-epic-1",
      title: "Sessão Épica de Foco Profundo",
      detail: "3 blocos Pomodoro consecutivos. Sem redes sociais.",
      duration: "2h 30min",
      xp: 75,
      icon: FlameKindling,
      isEpic: true,
      xpMultiplier: 2,
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
    // ÉPICA
    {
      id: "hab-epic-1",
      title: "Dia de Hábito Perfeito",
      detail: "Água, sono, refeição E exercício. Tudo no mesmo dia.",
      duration: "Dia todo",
      xp: 70,
      icon: FlameKindling,
      isEpic: true,
      xpMultiplier: 2,
    },
  ],
}

// ─── XP & NÍVEIS ─────────────────────────────────────────────────────────────
export const XP_PER_LEVEL = 2000

export function levelFromXp(totalXp: number) {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1
  const xpInLevel = totalXp % XP_PER_LEVEL
  return { level, xpInLevel, xpForNext: XP_PER_LEVEL }
}

// Títulos por nível — parte do sistema de gamificação
export const LEVEL_TITLES: Record<number, string> = {
  1:  "Recruta",
  2:  "Aprendiz",
  3:  "Estudante Sério",
  4:  "Focado",
  5:  "Disciplinado",
  6:  "Guerreiro do Foco",
  7:  "Mestre da Rotina",
  8:  "Lenda em Progresso",
  9:  "Quase Lendário",
  10: "LENDÁRIO ⚡",
}

export function getLevelTitle(level: number): string {
  return LEVEL_TITLES[level] ?? `Nível ${level} Supremo`
}
