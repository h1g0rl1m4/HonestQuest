import {
  Flame,
  Trophy,
  Target,
  Sunrise,
  BookOpen,
  Dumbbell,
  Crown,
  Lock,
  type LucideIcon,
} from "lucide-react"
import { XpBar } from "./xp-bar"
import { cn } from "@/lib/utils"
import { getLevelTitle } from "@/lib/quest-data"


interface Achievement {
  title: string
  desc: string
  icon: LucideIcon
  unlocked: boolean
}

const ACHIEVEMENTS: Achievement[] = [
  { title: "Primeiros passos", desc: "Completaste a tua 1ª missão", icon: Target, unlocked: true },
  { title: "Em chamas", desc: "Streak de 5 dias seguidos", icon: Flame, unlocked: true },
  { title: "Madrugador", desc: "Missão antes das 8h", icon: Sunrise, unlocked: true },
  { title: "Rato de biblioteca", desc: "10 missões de estudo", icon: BookOpen, unlocked: true },
  { title: "Força total", desc: "20 treinos concluídos", icon: Dumbbell, unlocked: false },
  { title: "Lendário", desc: "Alcança o Nível 10", icon: Crown, unlocked: false },
]

export function ProfileView({
  name,
  level,
  totalXp,
  xpInLevel,
  xpForNext,
  streak,
  completed,
}: {
  name: string
  level: number
  totalXp: number
  xpInLevel: number
  xpForNext: number
  streak: number
  completed: number
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Perfil & Conquistas</h1>
        <p className="mt-1 text-sm text-muted-foreground">A tua jornada como herói até agora.</p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="h-24 bg-gradient-to-r from-primary via-chart-5 to-info" />
        <div className="px-5 pb-5">
          <div className="-mt-10 flex items-end gap-4">
            <div className="grid size-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-info text-2xl font-bold text-primary-foreground ring-4 ring-card">
              {initials}
            </div>
            <div className="pb-1">
              <h2 className="font-heading text-xl font-bold">{name}</h2>
              <p className="text-sm text-muted-foreground">Nível {level} · {getLevelTitle(level)}</p>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium">Progresso para o Nível {level + 1}</span>
              <span className="text-muted-foreground">
                {xpInLevel.toLocaleString("pt-BR")} / {xpForNext.toLocaleString("pt-BR")} XP
              </span>
            </div>
            <XpBar value={xpInLevel} max={xpForNext} />
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Flame} label="Streak" value={`${streak} dias`} tone="text-warning" bg="bg-warning/15" />
        <Stat icon={Trophy} label="XP total" value={totalXp.toLocaleString("pt-BR")} tone="text-primary" bg="bg-primary/15" />
        <Stat icon={Target} label="Missões" value={String(completed)} tone="text-success" bg="bg-success/15" />
      </div>

      <section aria-labelledby="ach-heading">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="ach-heading" className="font-heading text-lg font-semibold">
            Conquistas
          </h2>
          <span className="text-sm text-muted-foreground">
            {unlocked}/{ACHIEVEMENTS.length} desbloqueadas
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a) => (
            <article
              key={a.title}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-4",
                a.unlocked ? "border-border bg-card" : "border-dashed border-border bg-card/40",
              )}
            >
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-xl",
                  a.unlocked ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
                )}
              >
                {a.unlocked ? <a.icon className="size-5" aria-hidden="true" /> : <Lock className="size-5" aria-hidden="true" />}
              </span>
              <div className={cn(!a.unlocked && "opacity-70")}>
                <p className="font-heading text-sm font-semibold">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </div>
            </article>
          ))}
        </div>
      <section aria-labelledby="titles-heading" className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="titles-heading" className="font-heading text-lg font-semibold">
            Biblioteca de Títulos
          </h2>
          <span className="text-sm text-muted-foreground">
            Desbloqueados ao subir de nível
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {Array.from({ length: 10 }).map((_, i) => {
            const targetLevel = i + 1
            const titleName = getLevelTitle(targetLevel)
            const isUnlocked = level >= targetLevel

            return (
              <div
                key={targetLevel}
                className={cn(
                  "flex items-center justify-between rounded-xl border p-3",
                  isUnlocked ? "border-primary/30 bg-primary/5" : "border-dashed border-border bg-card/40 opacity-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "flex size-8 items-center justify-center rounded-lg text-xs font-bold",
                    isUnlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    L{targetLevel}
                  </span>
                  <span className={cn("font-medium", isUnlocked ? "text-foreground" : "text-muted-foreground")}>
                    {titleName}
                  </span>
                </div>
                {!isUnlocked && <Lock className="size-4 text-muted-foreground" />}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
  bg,
}: {
  icon: LucideIcon
  label: string
  value: string
  tone: string
  bg: string
}) {
  return (
    <article className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <span className={cn("grid size-11 place-items-center rounded-xl", bg, tone)}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="font-heading text-lg font-bold leading-none">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </article>
  )
}
