# ============================================================
# HonestQuest - Schemas de Horários (Pydantic)
# Validação dos dados que entram e saem da API
# ============================================================

from pydantic import BaseModel, field_validator, model_validator
from typing import Optional
from datetime import time
import uuid

DIAS_SEMANA = {
    0: "Segunda-feira",
    1: "Terça-feira",
    2: "Quarta-feira",
    3: "Quinta-feira",
    4: "Sexta-feira",
    5: "Sábado",
    6: "Domingo"
}


# ============================================================
# REQUEST — O que o utilizador envia para criar um horário
# ============================================================
class HorarioCreate(BaseModel):
    dia_semana: int           # 0=Segunda ... 6=Domingo
    hora_inicio: time         # ex: "08:00"
    hora_fim: time            # ex: "12:00"
    ativo: bool = True

    @field_validator("dia_semana")
    @classmethod
    def validar_dia(cls, v):
        if v not in range(7):
            raise ValueError("dia_semana deve ser entre 0 (Segunda) e 6 (Domingo)")
        return v

    @model_validator(mode="after")
    def validar_horas(self):
        if self.hora_fim <= self.hora_inicio:
            raise ValueError("hora_fim deve ser depois de hora_inicio")
        return self

    model_config = {
        "json_schema_extra": {
            "example": {
                "dia_semana": 0,
                "hora_inicio": "08:00",
                "hora_fim": "12:00",
                "ativo": True
            }
        }
    }


# ============================================================
# REQUEST — Atualizar um horário existente (campos opcionais)
# ============================================================
class HorarioUpdate(BaseModel):
    hora_inicio: Optional[time] = None
    hora_fim: Optional[time] = None
    ativo: Optional[bool] = None

    @model_validator(mode="after")
    def validar_horas(self):
        if self.hora_inicio and self.hora_fim:
            if self.hora_fim <= self.hora_inicio:
                raise ValueError("hora_fim deve ser depois de hora_inicio")
        return self


# ============================================================
# RESPONSE — O que a API devolve ao utilizador
# ============================================================
class HorarioResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    dia_semana: int
    dia_nome: str             # ex: "Segunda-feira"
    hora_inicio: time
    hora_fim: time
    ativo: bool

    model_config = {"from_attributes": True}


# ============================================================
# RESPONSE — Lista de horários agrupados por dia
# ============================================================
class HorariosPorDia(BaseModel):
    dia_semana: int
    dia_nome: str
    horarios: list[HorarioResponse]
