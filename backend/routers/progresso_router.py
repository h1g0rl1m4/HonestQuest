from fastapi import APIRouter

router = APIRouter(
    prefix="/progresso",
    tags=["progresso"],
)

@router.get("/semanal")
async def progresso_semanal():
    """
    Retorna o relatório de evolução semanal com dados mockados.
    """
    return {
        "semana": [
            {"dia": "Seg", "missoes_feitas": 3, "xp_ganho": 45, "minutos_foco": 90},
            {"dia": "Ter", "missoes_feitas": 2, "xp_ganho": 30, "minutos_foco": 60},
            {"dia": "Qua", "missoes_feitas": 4, "xp_ganho": 60, "minutos_foco": 120},
            {"dia": "Qui", "missoes_feitas": 1, "xp_ganho": 20, "minutos_foco": 30},
            {"dia": "Sex", "missoes_feitas": 3, "xp_ganho": 55, "minutos_foco": 85},
            {"dia": "Sáb", "missoes_feitas": 2, "xp_ganho": 40, "minutos_foco": 45},
            {"dia": "Dom", "missoes_feitas": 1, "xp_ganho": 15, "minutos_foco": 20}
        ],
        "total_xp_semana": 280,
        "total_missoes_semana": 18,
        "media_diaria_minutos": 75,
        "streak_atual": 5,
        "melhor_streak": 12
    }

@router.get("/horarios-produtivos")
async def horarios_produtivos():
    """
    Retorna a análise de horários produtivos com dados mockados.
    """
    return {
        "blocos": [
            {"hora": "08:00", "produtividade": 85},
            {"hora": "09:00", "produtividade": 92},
            {"hora": "10:00", "produtividade": 88},
            {"hora": "11:00", "produtividade": 75},
            {"hora": "12:00", "produtividade": 45},
            {"hora": "13:00", "produtividade": 30},
            {"hora": "14:00", "produtividade": 40},
            {"hora": "15:00", "produtividade": 55},
            {"hora": "16:00", "produtividade": 65},
            {"hora": "17:00", "produtividade": 75},
            {"hora": "18:00", "produtividade": 80},
            {"hora": "19:00", "produtividade": 60}
        ],
        "melhor_horario": "09:00-11:00",
        "pior_horario": "13:00-14:00",
        "sugestao": "Os teus picos de foco são de manhã. Agenda tarefas difíceis entre as 9h e as 11h."
    }

@router.get("/inatividade")
async def deteccao_inatividade():
    """
    Retorna o status de inatividade e sugere micro-missões.
    """
    return {
        "inativo": False, # Este valor seria calculado dinamicamente
        "dias_sem_atividade": 0,
        "micro_missoes": [
            {"id": "micro-1", "titulo": "Bebe um copo de água agora", "xp": 5, "duracao": "1 min"},
            {"id": "micro-2", "titulo": "Levanta-te e alonga por 2 min", "xp": 5, "duracao": "2 min"},
            {"id": "micro-3", "titulo": "Escreve 1 objetivo para hoje", "xp": 10, "duracao": "3 min"}
        ]
    }

@router.get("/dificuldade")
async def adaptacao_dificuldade():
    """
    Retorna o estado atual do algoritmo de adaptação de dificuldade.
    """
    return {
        "nivel_atual": "intermedio",
        "taxa_conclusao": 0.78,
        "ajuste_sugerido": "manter",
        "mensagem": "Estás a completar 78% das missões. O nível de dificuldade está equilibrado.",
        "historico": [
            {"semana": 1, "taxa": 0.65, "nivel": "facil"},
            {"semana": 2, "taxa": 0.72, "nivel": "intermedio"},
            {"semana": 3, "taxa": 0.78, "nivel": "intermedio"}
        ]
    }
