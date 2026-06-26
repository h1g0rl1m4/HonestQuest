import { BookOpen, Dumbbell, Zap, HeartPulse, type LucideIcon } from "lucide-react"
import { ACCENT, type Accent } from "./accent"
import { cn } from "@/lib/utils"

interface Block {
  time: string
  title: string
  icon: LucideIcon
  accent: Accent
}

const WEEK: { day: string; short: string; blocks: Block[] }[] = [
  {
    day: "Segunda",
    short: "Seg",
    blocks: [
      { time: "08:00", title: "Estudar Cálculo", icon: BookOpen, accent: "primary" },
      { time: "18:30", title: "Treino de força", icon: Dumbbell, accent: "info" },
    ],
  },
  {
    day: "Terça",
    short: "Ter",
    blocks: [{ time: "07:30", title: "Foco profundo", icon: Zap, accent: "warning" }],
  },
  {
    day: "Quarta",
    short: "Qua",
    blocks: [
      { time: "09:00", title: "Revisão ativa", icon: BookOpen, accent: "primary" },
      { time: "19:00", title: "Caminhada", icon: HeartPulse, accent: "success" },
    ],
  },
  {
    day: "Quinta",
    short: "Qui",
    blocks: [{ time: "18:30", title: "Treino de força", icon: Dumbbell, accent: "info" }],
  },
  {
    day: "Sexta",
    short: "Sex",
    blocks: [
      { time: "08:00", title: "Estudar Física", icon: BookOpen, accent: "primary" },
      { time: "17:00", title: "Planear semana", icon: Zap, accent: "warning" },
    ],
  },
  {
    day: "Sábado",
    short: "Sáb",
    blocks: [{ time: "10:00", title: "Caminhada longa", icon: HeartPulse, accent: "success" }],
  },
  {
    day: "Domingo",
    short: "Dom",
    blocks: [{ time: "20:00", title: "Descanso ativo", icon: HeartPulse, accent: "success" }],
  },
]

export function ScheduleView() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Horários</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          O teu plano semanal de missões e blocos de foco.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {WEEK.map((d) => (
          <article key={d.day} className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-sm font-semibold">{d.day}</h2>
              <span className="text-xs text-muted-foreground">{d.blocks.length} blocos</span>
            </div>
            <div className="space-y-2">
              {d.blocks.map((b, i) => {
                const accent = ACCENT[b.accent]
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-2.5"
                  >
                    <span className={cn("grid size-8 place-items-center rounded-lg", accent.softBg)}>
                      <b.icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{b.title}</p>
                      <p className="text-xs text-muted-foreground">{b.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
