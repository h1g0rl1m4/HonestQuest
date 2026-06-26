// ─── MENTOR: Personalidade e Tom do Motivador ─────────────────────────────────
// O mentor chama-se "Sensei" — é direto, sem filtros, mas leal.
// Celebra vitórias, chama atenção quando necessário e nunca deixa o utilizador desistir.

export type MentorMood =
  | "motivate"    // neutro, a motivar
  | "celebrate"   // quando completa missão
  | "epic_done"   // quando completa épica
  | "all_done"    // quando termina o dia
  | "level_up"    // quando sobe de nível
  | "low_streak"  // streak baixo (< 3)
  | "morning"     // início do dia
  | "challenge"   // a empurrar para missão épica

export interface MentorMessage {
  text: string
  cta?: string  // call to action opcional
}

// Mapeamento de estado → mensagens (aleatórias dentro de cada categoria)
export const MENTOR_MESSAGES: Record<MentorMood, MentorMessage[]> = {
  motivate: [
    {
      text: "Cada missão que completas é uma versão melhor de ti. Não pares agora.",
      cta: "Ver missões",
    },
    {
      text: "Disciplina não é talent o. É uma escolha que fazes todos os dias.",
    },
    {
      text: "A versão de ti de daqui a 6 meses está a observar o que fazes agora.",
      cta: "Agir agora",
    },
    {
      text: "Os que chegam longe não são os mais talentosos. São os mais consistentes.",
    },
  ],
  celebrate: [
    {
      text: "ISSO! Mais uma riscada. Continua — o momentum é real.",
    },
    {
      text: "Missão destruída. Esse é o Caio que eu conheço. Qual é a próxima?",
      cta: "Próxima missão",
    },
    {
      text: "Feito. Sem drama, sem desculpas. É assim que se constrói algo grande.",
    },
  ],
  epic_done: [
    {
      text: "🔥 MISSÃO ÉPICA CONCLUÍDA! Isso é raro. Isso é nível superior. Orgulho.",
    },
    {
      text: "Sessão épica terminada? Isso não é rotina normal — és diferente da maioria.",
    },
    {
      text: "LENDÁRIO. Essa sessão longa que toda a gente evita? Tu fizeste. Respeito.",
    },
  ],
  all_done: [
    {
      text: "Todas as missões do dia: eliminadas. Vai descansar — amanhã atacamos de novo.",
    },
    {
      text: "Dia perfeito. Guarda energia para amanhã. O streak continua.",
    },
  ],
  level_up: [
    {
      text: "SUBISTE DE NÍVEL! Não é só um número — é prova de que não desististe.",
    },
    {
      text: "NÍVEL NOVO DESBLOQUEADO. Cada level é uma versão que o teu eu do passado não conseguia imaginar.",
    },
  ],
  low_streak: [
    {
      text: "Ei. Vejo que paraste. Tudo bem — o importante é recomeçar HOJE.",
      cta: "Recomeçar agora",
    },
    {
      text: "Streak interrompido? Não é o fim. É um teste. Volta.",
      cta: "Voltar à luta",
    },
  ],
  morning: [
    {
      text: "Bom dia, guerreiro. O dia ainda não aconteceu — tu decides como termina.",
      cta: "Começar o dia",
    },
    {
      text: "Novo dia, nova oportunidade. As missões de hoje não se fazem sozinhas.",
      cta: "Ver missões",
    },
  ],
  challenge: [
    {
      text: "Tem uma missão épica à tua espera. A maioria das pessoas nunca a vai tentar.",
      cta: "Aceitar o desafio",
    },
    {
      text: "Já fizeste as normais. Agora vai buscar a épica — é aí que o crescimento real acontece.",
      cta: "Ver épica",
    },
  ],
}

export function getMentorMessage(mood: MentorMood): MentorMessage {
  const pool = MENTOR_MESSAGES[mood]
  return pool[Math.floor(Math.random() * pool.length)]
}

// Determina o mood com base no estado atual do utilizador
export function detectMood(params: {
  streak: number
  missionsDone: number
  totalMissions: number
  epicDoneThisAction?: boolean
  justLeveledUp?: boolean
  isNewSession?: boolean
}): MentorMood {
  const { streak, missionsDone, totalMissions, epicDoneThisAction, justLeveledUp, isNewSession } =
    params

  if (justLeveledUp) return "level_up"
  if (epicDoneThisAction) return "epic_done"
  if (missionsDone === totalMissions && totalMissions > 0) return "all_done"
  if (isNewSession) return "morning"
  if (streak < 2) return "low_streak"
  if (missionsDone > 0) return "celebrate"
  return "motivate"
}
