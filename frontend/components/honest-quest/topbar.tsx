"use client"

import { Bell, Settings, Flame } from "lucide-react"
import { Logo } from "./navigation"

export function Topbar({
  name,
  level,
  totalXp,
  streak,
  greeting,
}: {
  name: string
  level: number
  totalXp: number
  streak: number
  greeting: string
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md md:px-8">
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          <Logo />
        </div>
        <p className="hidden text-sm text-muted-foreground md:block">{greeting}</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1.5 text-sm font-semibold text-warning">
          <Flame className="size-4" aria-hidden="true" />
          {streak}
        </div>
        <button
          className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Notificações"
        >
          <Bell className="size-[18px]" />
        </button>
        <button
          className="hidden size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:grid"
          aria-label="Configurações"
        >
          <Settings className="size-[18px]" />
        </button>
        <div className="flex items-center gap-2.5 rounded-full bg-card py-1 pl-1 pr-3 ring-1 ring-border">
          <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-primary to-info text-sm font-bold text-primary-foreground">
            {initials}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">
              Nível {level} · {totalXp.toLocaleString("pt-BR")} XP
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
