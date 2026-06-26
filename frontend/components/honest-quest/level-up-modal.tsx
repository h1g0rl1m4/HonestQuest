"use client"

import { useEffect, useState } from "react"
import { Trophy, Star, Zap, X } from "lucide-react"
import { getLevelTitle } from "@/lib/quest-data"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"

interface LevelUpModalProps {
  level: number
  totalXp: number
  onClose: () => void
}

export function LevelUpModal({ level, totalXp, onClose }: LevelUpModalProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Delay para animação de entrada
    const t = setTimeout(() => setVisible(true), 50)

    // Confetti épico de level-up
    const colors = ["#a78bfa", "#fbbf24", "#34d399", "#60a5fa", "#f472b6"]
    confetti({
      particleCount: 120,
      spread: 90,
      startVelocity: 45,
      origin: { y: 0.5 },
      colors,
      scalar: 1.1,
      disableForReducedMotion: true,
    })
    // Segunda rajada após 600ms
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 50,
        startVelocity: 30,
        origin: { x: 0.2, y: 0.6 },
        colors,
        disableForReducedMotion: true,
      })
      confetti({
        particleCount: 60,
        spread: 50,
        startVelocity: 30,
        origin: { x: 0.8, y: 0.6 },
        colors,
        disableForReducedMotion: true,
      })
    }, 600)

    return () => clearTimeout(t)
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
        visible ? "bg-black/60 backdrop-blur-sm" : "bg-transparent",
      )}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-3xl border border-primary/40 bg-card shadow-2xl shadow-primary/20 transition-all duration-500",
          visible ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-8",
        )}
      >
        {/* Gradiente de fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-warning/10 pointer-events-none" />

        {/* Botão fechar */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full bg-card/80 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Fechar"
        >
          <X className="size-4" />
        </button>

        <div className="relative p-8 text-center">
          {/* Ícone animado */}
          <div className="mx-auto mb-5 relative">
            <div className="mx-auto grid size-24 place-items-center rounded-full bg-gradient-to-br from-primary via-warning to-chart-5 shadow-lg shadow-primary/40 animate-hq-pop">
              <Trophy className="size-12 text-white" aria-hidden="true" />
            </div>
            {/* Estrelas decorativas */}
            <Star className="absolute -top-1 -right-1 size-6 text-warning animate-pulse" fill="currentColor" />
            <Star className="absolute -bottom-1 -left-1 size-4 text-primary animate-pulse delay-300" fill="currentColor" />
          </div>

          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Nível desbloqueado
          </p>

          <h2 className="font-heading text-5xl font-bold tracking-tight">
            {level}
          </h2>

          <p className="mt-1 font-heading text-xl font-semibold text-muted-foreground">
            {getLevelTitle(level)}
          </p>

          <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Zap className="size-4" />
            {totalXp.toLocaleString("pt-BR")} XP acumulados
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            "Cada nível é a prova de que não desististe. Continua."
          </p>
          <p className="mt-1 text-xs font-semibold text-primary">— Sensei</p>

          <button
            onClick={handleClose}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-primary to-info py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-95"
          >
            Continuar a jornada 🚀
          </button>
        </div>
      </div>
    </div>
  )
}
