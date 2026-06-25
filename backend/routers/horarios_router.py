# ============================================================
# HonestQuest - Rotas de Horários Disponíveis
# ============================================================
# Endpoints:
#   GET    /horarios/              → listar todos os horários do utilizador
#   GET    /horarios/semana        → horários agrupados por dia da semana
#   POST   /horarios/              → criar novo horário
#   PUT    /horarios/{id}          → atualizar um horário
#   DELETE /horarios/{id}          → eliminar um horário
#   PATCH  /horarios/{id}/toggle   → ativar/desativar um horário
# ============================================================

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from typing import List
import uuid

from database import get_db
from models import HorarioDisponivel, User
from schemas.horarios_schema import (
    HorarioCreate,
    HorarioUpdate,
    HorarioResponse,
    HorariosPorDia,
    DIAS_SEMANA
)

router = APIRouter(
    prefix="/horarios",
    tags=["Horários Disponíveis"]
)


# ============================================================
# HELPER — Buscar horário por ID e verificar que é do utilizador
# ============================================================
async def get_horario_ou_404(
    horario_id: uuid.UUID,
    user_id: uuid.UUID,
    db: AsyncSession
) -> HorarioDisponivel:
    resultado = await db.execute(
        select(HorarioDisponivel).where(
            and_(
                HorarioDisponivel.id == horario_id,
                HorarioDisponivel.user_id == user_id
            )
        )
    )
    horario = resultado.scalar_one_or_none()

    if not horario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Horário não encontrado"
        )
    return horario


# ============================================================
# GET /horarios/ — Listar todos os horários do utilizador
# ============================================================
@router.get("/", response_model=List[HorarioResponse])
async def listar_horarios(
    user_id: uuid.UUID,             # TODO: substituir por autenticação JWT
    apenas_ativos: bool = False,    # filtro opcional
    db: AsyncSession = Depends(get_db)
):
    """
    Devolve todos os horários disponíveis do utilizador.
    Usa `apenas_ativos=true` para filtrar só os horários ativos.
    """
    query = select(HorarioDisponivel).where(
        HorarioDisponivel.user_id == user_id
    )

    if apenas_ativos:
        query = query.where(HorarioDisponivel.ativo == True)

    query = query.order_by(
        HorarioDisponivel.dia_semana,
        HorarioDisponivel.hora_inicio
    )

    resultado = await db.execute(query)
    horarios = resultado.scalars().all()

    return [
        HorarioResponse(
            id=h.id,
            user_id=h.user_id,
            dia_semana=h.dia_semana,
            dia_nome=h.dia_nome,
            hora_inicio=h.hora_inicio,
            hora_fim=h.hora_fim,
            ativo=h.ativo
        )
        for h in horarios
    ]


# ============================================================
# GET /horarios/semana — Horários agrupados por dia da semana
# ============================================================
@router.get("/semana", response_model=List[HorariosPorDia])
async def horarios_por_semana(
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Devolve os horários organizados por dia da semana.
    Útil para mostrar uma vista de calendário semanal.
    """
    resultado = await db.execute(
        select(HorarioDisponivel)
        .where(HorarioDisponivel.user_id == user_id)
        .order_by(HorarioDisponivel.dia_semana, HorarioDisponivel.hora_inicio)
    )
    horarios = resultado.scalars().all()

    # Agrupar por dia
    agrupado = {}
    for dia_num, dia_nome in DIAS_SEMANA.items():
        agrupado[dia_num] = HorariosPorDia(
            dia_semana=dia_num,
            dia_nome=dia_nome,
            horarios=[]
        )

    for h in horarios:
        agrupado[h.dia_semana].horarios.append(
            HorarioResponse(
                id=h.id,
                user_id=h.user_id,
                dia_semana=h.dia_semana,
                dia_nome=h.dia_nome,
                hora_inicio=h.hora_inicio,
                hora_fim=h.hora_fim,
                ativo=h.ativo
            )
        )

    return list(agrupado.values())


# ============================================================
# POST /horarios/ — Criar novo horário
# ============================================================
@router.post("/", response_model=HorarioResponse, status_code=status.HTTP_201_CREATED)
async def criar_horario(
    user_id: uuid.UUID,
    dados: HorarioCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Cria um novo horário disponível para o utilizador.

    Exemplo de body:
    ```json
    {
        "dia_semana": 0,
        "hora_inicio": "08:00",
        "hora_fim": "12:00",
        "ativo": true
    }
    ```
    """
    # Verificar se o utilizador existe
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilizador não encontrado"
        )

    # Verificar conflito de horários no mesmo dia
    conflito = await db.execute(
        select(HorarioDisponivel).where(
            and_(
                HorarioDisponivel.user_id == user_id,
                HorarioDisponivel.dia_semana == dados.dia_semana,
                HorarioDisponivel.ativo == True,
                HorarioDisponivel.hora_inicio < dados.hora_fim,
                HorarioDisponivel.hora_fim > dados.hora_inicio
            )
        )
    )
    if conflito.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Já existe um horário ativo que conflitua nesse período em {DIAS_SEMANA[dados.dia_semana]}"
        )

    novo_horario = HorarioDisponivel(
        user_id=user_id,
        dia_semana=dados.dia_semana,
        hora_inicio=dados.hora_inicio,
        hora_fim=dados.hora_fim,
        ativo=dados.ativo
    )

    db.add(novo_horario)
    await db.commit()
    await db.refresh(novo_horario)

    return HorarioResponse(
        id=novo_horario.id,
        user_id=novo_horario.user_id,
        dia_semana=novo_horario.dia_semana,
        dia_nome=novo_horario.dia_nome,
        hora_inicio=novo_horario.hora_inicio,
        hora_fim=novo_horario.hora_fim,
        ativo=novo_horario.ativo
    )


# ============================================================
# PUT /horarios/{id} — Atualizar horário existente
# ============================================================
@router.put("/{horario_id}", response_model=HorarioResponse)
async def atualizar_horario(
    horario_id: uuid.UUID,
    user_id: uuid.UUID,
    dados: HorarioUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Atualiza hora_inicio, hora_fim ou estado ativo de um horário.
    Só é necessário enviar os campos que se quer alterar.
    """
    horario = await get_horario_ou_404(horario_id, user_id, db)

    if dados.hora_inicio is not None:
        horario.hora_inicio = dados.hora_inicio
    if dados.hora_fim is not None:
        horario.hora_fim = dados.hora_fim
    if dados.ativo is not None:
        horario.ativo = dados.ativo

    await db.commit()
    await db.refresh(horario)

    return HorarioResponse(
        id=horario.id,
        user_id=horario.user_id,
        dia_semana=horario.dia_semana,
        dia_nome=horario.dia_nome,
        hora_inicio=horario.hora_inicio,
        hora_fim=horario.hora_fim,
        ativo=horario.ativo
    )


# ============================================================
# DELETE /horarios/{id} — Eliminar horário
# ============================================================
@router.delete("/{horario_id}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminar_horario(
    horario_id: uuid.UUID,
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Elimina permanentemente um horário.
    Se só quiseres desativar, usa o endpoint /toggle.
    """
    horario = await get_horario_ou_404(horario_id, user_id, db)

    await db.delete(horario)
    await db.commit()


# ============================================================
# PATCH /horarios/{id}/toggle — Ativar ou desativar horário
# ============================================================
@router.patch("/{horario_id}/toggle", response_model=HorarioResponse)
async def toggle_horario(
    horario_id: uuid.UUID,
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Alterna entre ativo/inativo sem eliminar o horário.
    Útil para fins de semana ou semanas de exames.
    """
    horario = await get_horario_ou_404(horario_id, user_id, db)

    horario.ativo = not horario.ativo
    await db.commit()
    await db.refresh(horario)

    return HorarioResponse(
        id=horario.id,
        user_id=horario.user_id,
        dia_semana=horario.dia_semana,
        dia_nome=horario.dia_nome,
        hora_inicio=horario.hora_inicio,
        hora_fim=horario.hora_fim,
        ativo=horario.ativo
    )
