export type Accent = "primary" | "success" | "info" | "warning"

interface AccentClasses {
  text: string
  bg: string
  softBg: string
  ring: string
  border: string
  gradient: string
}

export const ACCENT: Record<Accent, AccentClasses> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary text-primary-foreground",
    softBg: "bg-primary/15 text-primary",
    ring: "ring-primary/40",
    border: "border-primary/50",
    gradient: "from-primary to-chart-5",
  },
  success: {
    text: "text-success",
    bg: "bg-success text-success-foreground",
    softBg: "bg-success/15 text-success",
    ring: "ring-success/40",
    border: "border-success/50",
    gradient: "from-success to-info",
  },
  info: {
    text: "text-info",
    bg: "bg-info text-info-foreground",
    softBg: "bg-info/15 text-info",
    ring: "ring-info/40",
    border: "border-info/50",
    gradient: "from-info to-primary",
  },
  warning: {
    text: "text-warning",
    bg: "bg-warning text-warning-foreground",
    softBg: "bg-warning/15 text-warning",
    ring: "ring-warning/40",
    border: "border-warning/50",
    gradient: "from-warning to-chart-5",
  },
}
