"use client"

import { useEffect, useState } from "react"
import { MessageSquare, ChevronRight } from "lucide-react"
import { getMentorMessage, detectMood, type MentorMood } from "@/lib/mentor-data"
import { cn } from "@/lib/utils"

interface MentorCardProps {
  streak: number
  missionsDone: number
  totalMissions: number
  epicDoneThisAction?: boolean
  justLeveledUp?: boolean
  isNewSession?: boolean
  onCtaClick?: () => void
}

export function MentorCard({
  streak,
  missionsDone,
  totalMissions,
  epicDoneThisAction,
  justLeveledUp,
  isNewSession,
  onCtaClick,
}: MentorCardProps) {
  const mood: MentorMood = detectMood({
    streak,
    missionsDone,
    totalMissions,
    epicDoneThisAction,
    justLeveledUp,
    isNewSession,
  })

  const [message, setMessage] = useState(() => getMentorMessage(mood))

  // Atualiza a mensagem quando o estado muda
  useEffect(() => {
    setMessage(getMentorMessage(mood))
  }, [mood, missionsDone, justLeveledUp, epicDoneThisAction])

  const moodStyles: Record<MentorMood, string> = {
    motivate:    "from-primary/10 via-card border-primary/20",
    celebrate:   "from-success/10 via-card border-success/30",
    epic_done:   "from-warning/15 via-card border-warning/40",
    all_done:    "from-success/15 via-card border-success/40",
    level_up:    "from-primary/20 via-card border-primary/50",
    low_streak:  "from-destructive/10 via-card border-destructive/25",
    morning:     "from-info/10 via-card border-info/20",
    challenge:   "from-warning/10 via-card border-warning/25",
  }

  const moodEmoji: Record<MentorMood, string> = {
    motivate:   "🧠",
    celebrate:  "💪",
    epic_done:  "⚡",
    all_done:   "🏆",
    level_up:   "🚀",
    low_streak: "⚠️",
    morning:    "🌅",
    challenge:  "🗡️",
  }

  return (
    <section
      aria-label="Mensagem do Sensei"
      className={cn(
        "rounded-2xl border bg-gradient-to-br p-4 transition-all",
        moodStyles[mood],
      )}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span
          className="grid size-8 place-items-center rounded-xl bg-card/80 text-base"
          aria-hidden="true"
        >
          {moodEmoji[mood]}
        </span>
        <div className="flex flex-col">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Sensei
          </span>
        </div>
        <MessageSquare className="ml-auto size-4 text-muted-foreground/40" aria-hidden="true" />
      </div>

      <p className="text-sm leading-relaxed text-foreground/90">
        &ldquo;{message.text}&rdquo;
      </p>

      {message.cta && onCtaClick && (
        <button
          onClick={onCtaClick}
          className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
        >
          {message.cta}
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </section>
  )
}
