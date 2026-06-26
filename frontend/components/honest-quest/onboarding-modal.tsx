"use client"

import { useState } from "react"
import {
  Target,
  Moon,
  Zap,
  Brain,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface OnboardingResult {
  wakeTime: string         // "cedo" | "tarde"
  peakFocus: string        // "manha" | "tarde" | "noite"
  mainGoal: string         // "estudos" | "treino" | "produtividade" | "habitos"
  productivityScore: number // 1-5
}

interface OnboardingModalProps {
  onComplete: (result: OnboardingResult) => void
}

const STEPS = [
  {
    id: "wakeTime",
    title: "Que horas costumas acordar?",
    subtitle: "Isto ajuda o Sensei a calibrar o teu plano.",
    icon: Moon,
    options: [
      { value: "cedo", label: "Antes das 7h", emoji: "🌅", desc: "Madrugador disciplinado" },
      { value: "meio", label: "Entre 7h e 9h", emoji: "☀️", desc: "Ritmo equilibrado" },
      { value: "tarde", label: "Depois das 9h", emoji: "🌤️", desc: "Período noturno de foco" },
    ],
  },
  {
    id: "peakFocus",
    title: "Quando tens mais foco?",
    subtitle: "O teu pico de produtividade natural.",
    icon: Brain,
    options: [
      { value: "manha", label: "De manhã", emoji: "🧠", desc: "Mente fresca e descansada" },
      { value: "tarde", label: "À tarde", emoji: "⚡", desc: "Motor a plena carga" },
      { value: "noite", label: "À noite", emoji: "🌙", desc: "Silêncio e concentração" },
    ],
  },
  {
    id: "mainGoal",
    title: "Qual é o teu foco principal?",
    subtitle: "Vais poder mudar isto a qualquer momento.",
    icon: Target,
    options: [
      { value: "estudos",        label: "Estudar",        emoji: "📚", desc: "Avançar no conhecimento" },
      { value: "treino",         label: "Treinar",         emoji: "💪", desc: "Mexer e fortalecer o corpo" },
      { value: "produtividade",  label: "Produtividade",   emoji: "🎯", desc: "Fazer acontecer o que importa" },
      { value: "habitos",        label: "Hábitos",         emoji: "🌱", desc: "Construir disciplina diária" },
    ],
  },
  {
    id: "productivityScore",
    title: "Como avalias a tua produtividade atual?",
    subtitle: "Sem julgamentos. O Sensei precisa saber de onde partes.",
    icon: Zap,
    options: [
      { value: "1", label: "Muito baixa",  emoji: "😔", desc: "Difícil de manter o foco" },
      { value: "2", label: "Baixa",        emoji: "😐", desc: "Inconsistente" },
      { value: "3", label: "Média",        emoji: "🙂", desc: "Funciono mas poderia ser melhor" },
      { value: "4", label: "Alta",         emoji: "😊", desc: "Já tenho boa rotina" },
      { value: "5", label: "Muito alta",   emoji: "🔥", desc: "Modo guerreiro ativo" },
    ],
  },
]

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const selected = answers[current.id]

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }))
  }

  function next() {
    if (!selected) return
    if (isLast) {
      onComplete({
        wakeTime: answers.wakeTime,
        peakFocus: answers.peakFocus,
        mainGoal: answers.mainGoal,
        productivityScore: Number(answers.productivityScore),
      })
    } else {
      setStep((s) => s + 1)
    }
  }

  const Icon = current.icon
  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4">
      {/* Fundo decorativo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[400px] rounded-full bg-info/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Barra de progresso */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Configuração inicial</span>
            <span>{step + 1} / {STEPS.length}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-info transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card principal */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl">
          {/* Ícone e título */}
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-primary/15 text-primary">
              <Icon className="size-7" />
            </span>
            <h2 className="font-heading text-xl font-bold">{current.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{current.subtitle}</p>
          </div>

          {/* Opções */}
          <div className="space-y-2.5">
            {current.options.map((opt) => {
              const isSelected = selected === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => selectOption(opt.value)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 ring-1 ring-primary/40"
                      : "border-border bg-background/50 hover:border-foreground/20 hover:bg-card",
                  )}
                >
                  <span className="text-2xl" aria-hidden="true">{opt.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm font-semibold">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                  {isSelected && (
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Navegação */}
          <div className="mt-6 flex items-center gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="size-4" />
                Voltar
              </button>
            )}
            <button
              onClick={next}
              disabled={!selected}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all",
                selected
                  ? "bg-gradient-to-r from-primary to-info text-primary-foreground hover:scale-[1.02] active:scale-95"
                  : "cursor-not-allowed bg-muted text-muted-foreground",
              )}
            >
              {isLast ? "Começar a jornada 🚀" : "Continuar"}
              {!isLast && <ChevronRight className="size-4" />}
            </button>
          </div>
        </div>

        {/* Assinatura do Sensei */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          "O autoconhecimento é o primeiro passo." — <span className="font-semibold text-primary">Sensei</span>
        </p>
      </div>
    </div>
  )
}
