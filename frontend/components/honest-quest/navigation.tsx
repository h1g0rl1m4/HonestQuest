"use client"

import { Home, CalendarDays, Trophy, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export type ViewId = "dashboard" | "horarios" | "perfil" | "evolucao"

const NAV: { id: ViewId; label: string; icon: typeof Home }[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "horarios", label: "Horários", icon: CalendarDays },
  { id: "perfil", label: "Perfil & Conquistas", icon: Trophy },
  { id: "evolucao", label: "Evolução", icon: TrendingUp },
]

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30">
        <Target className="size-5 text-primary-foreground" aria-hidden="true" />
      </div>
      <span className="font-heading text-lg font-bold tracking-tight">HonestQuest</span>
    </div>
  )
}

export function Sidebar({
  active,
  onChange,
}: {
  active: ViewId
  onChange: (v: ViewId) => void
}) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-8 border-r border-border bg-sidebar px-4 py-6 lg:flex">
      <div className="px-2">
        <Logo />
      </div>
      <nav className="flex flex-col gap-1.5" aria-label="Navegação principal">
        {NAV.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
              )}
            >
              <item.icon className="size-[18px]" aria-hidden="true" />
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-border bg-card/60 p-4">
        <p className="font-heading text-sm font-semibold">Dica do dia</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Pequenas missões diárias constroem grandes hábitos. Comece pela mais fácil.
        </p>
      </div>
    </aside>
  )
}

export function BottomNav({
  active,
  onChange,
}: {
  active: ViewId
  onChange: (v: ViewId) => void
}) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-border bg-sidebar/95 backdrop-blur lg:hidden"
      aria-label="Navegação principal"
    >
      {NAV.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="size-5" aria-hidden="true" />
            {item.label.split(" ")[0]}
          </button>
        )
      })}
    </nav>
  )
}

export { Logo }
