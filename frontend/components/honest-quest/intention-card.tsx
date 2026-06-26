"use client"

import { useState } from "react"
import { Quote, Pencil, Check } from "lucide-react"

export function IntentionCard({
  intention,
  onChange,
}: {
  intention: string
  onChange: (value: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(intention)

  function save() {
    onChange(draft.trim() || intention)
    setEditing(false)
  }

  return (
    <section
      aria-labelledby="intention-heading"
      className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-5"
    >
      <div className="mb-3 flex items-center gap-2">
        <Quote className="size-4 text-primary" aria-hidden="true" />
        <h2 id="intention-heading" className="font-heading text-base font-semibold">
          Intenção do dia
        </h2>
      </div>

      {editing ? (
        <div className="space-y-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            autoFocus
            className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm leading-relaxed text-foreground outline-none ring-primary/40 focus:ring-2"
            placeholder="O que queres alcançar hoje?"
          />
          <button
            onClick={save}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Check className="size-4" aria-hidden="true" />
            Guardar intenção
          </button>
        </div>
      ) : (
        <>
          <p className="text-pretty text-sm italic leading-relaxed text-foreground/90">
            &ldquo;{intention}&rdquo;
          </p>
          <button
            onClick={() => {
              setDraft(intention)
              setEditing(true)
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <Pencil className="size-4" aria-hidden="true" />
            Atualizar intenção
          </button>
        </>
      )}
    </section>
  )
}
