# ============================================================
# HonestQuest - Modelos SQLAlchemy (FastAPI)
# ============================================================
# Instalar dependências:
#   pip install fastapi sqlalchemy asyncpg python-dotenv
#   pip install "databases[asyncpg]"
# ============================================================

import uuid
from datetime import datetime, date, time
from typing import Optional
from sqlalchemy import (
    Column, String, Integer, Boolean, Text, Date, Time,
    DateTime, ForeignKey, CheckConstraint, UniqueConstraint, Index
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func

Base = declarative_base()


# ============================================================
# USER
# ============================================================
class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    curso = Column(String(150))
    objetivos_academicos = Column(Text)
    nivel_produtividade_inicial = Column(Integer, default=1)
    xp_total = Column(Integer, default=0)
    nivel = Column(Integer, default=1)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # Relacionamentos
    horarios = relationship("HorarioDisponivel", back_populates="user", cascade="all, delete")
    intencoes = relationship("IntencaoDiaria", back_populates="user", cascade="all, delete")
    planos = relationship("PlanoDiario", back_populates="user", cascade="all, delete")
    missoes = relationship("Missao", back_populates="user", cascade="all, delete")
    sessoes = relationship("SessaoEstudo", back_populates="user", cascade="all, delete")
    conquistas = relationship("UserConquista", back_populates="user", cascade="all, delete")


# ============================================================
# HORÁRIOS DISPONÍVEIS
# ============================================================
class HorarioDisponivel(Base):
    __tablename__ = "horarios_disponiveis"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    dia_semana = Column(Integer, nullable=False)  # 0=Segunda ... 6=Domingo
    hora_inicio = Column(Time, nullable=False)
    hora_fim = Column(Time, nullable=False)
    ativo = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="horarios")

    __table_args__ = (
        CheckConstraint("dia_semana BETWEEN 0 AND 6", name="dia_semana_valido"),
        Index("idx_horarios_user", "user_id"),
    )

    @property
    def dia_nome(self):
        dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
        return dias[self.dia_semana]


# ============================================================
# INTENÇÕES DIÁRIAS
# ============================================================
class IntencaoDiaria(Base):
    __tablename__ = "intencoes_diarias"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    data = Column(Date, nullable=False, default=date.today)
    descricao = Column(Text, nullable=False)
    tipo = Column(String(50))  # 'estudo', 'treino', 'misto', 'outro'
    created_at = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="intencoes")
    plano = relationship("PlanoDiario", back_populates="intencao", uselist=False)

    __table_args__ = (
        UniqueConstraint("user_id", "data", name="uq_intencao_user_data"),
        Index("idx_intencoes_user_data", "user_id", "data"),
    )


# ============================================================
# PLANOS DIÁRIOS (gerados pela IA)
# ============================================================
class PlanoDiario(Base):
    __tablename__ = "planos_diarios"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    intencao_id = Column(UUID(as_uuid=True), ForeignKey("intencoes_diarias.id", ondelete="SET NULL"), nullable=True)
    data = Column(Date, nullable=False, default=date.today)
    resumo = Column(Text)
    gerado_por_ia = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="planos")
    intencao = relationship("IntencaoDiaria", back_populates="plano")
    missoes = relationship("Missao", back_populates="plano", cascade="all, delete")

    __table_args__ = (
        Index("idx_planos_user_data", "user_id", "data"),
    )


# ============================================================
# MISSÕES
# ============================================================
class Missao(Base):
    __tablename__ = "missoes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    plano_id = Column(UUID(as_uuid=True), ForeignKey("planos_diarios.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    titulo = Column(String(200), nullable=False)
    descricao = Column(Text)
    tipo = Column(String(50))           # 'estudo', 'treino', 'leitura', etc.
    duracao_minutos = Column(Integer)
    xp_recompensa = Column(Integer, default=10)
    concluida = Column(Boolean, default=False)
    concluida_em = Column(DateTime, nullable=True)
    ordem = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())

    plano = relationship("PlanoDiario", back_populates="missoes")
    user = relationship("User", back_populates="missoes")
    sessoes = relationship("SessaoEstudo", back_populates="missao")

    __table_args__ = (
        Index("idx_missoes_plano", "plano_id"),
        Index("idx_missoes_user", "user_id"),
    )


# ============================================================
# SESSÕES DE ESTUDO
# ============================================================
class SessaoEstudo(Base):
    __tablename__ = "sessoes_estudo"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    missao_id = Column(UUID(as_uuid=True), ForeignKey("missoes.id", ondelete="SET NULL"), nullable=True)
    data = Column(Date, nullable=False, default=date.today)
    inicio = Column(DateTime, nullable=False)
    fim = Column(DateTime, nullable=True)
    duracao_real_minutos = Column(Integer)
    notas = Column(Text)
    avaliacao = Column(Integer)         # 1-5 estrelas

    user = relationship("User", back_populates="sessoes")
    missao = relationship("Missao", back_populates="sessoes")

    __table_args__ = (
        CheckConstraint("avaliacao BETWEEN 1 AND 5", name="avaliacao_valida"),
        Index("idx_sessoes_user_data", "user_id", "data"),
    )


# ============================================================
# CONQUISTAS (gamificação)
# ============================================================
class Conquista(Base):
    __tablename__ = "conquistas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome = Column(String(100), nullable=False)
    descricao = Column(Text)
    icone = Column(String(50))
    condicao = Column(String(100))      # identificador único da condição


class UserConquista(Base):
    __tablename__ = "user_conquistas"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    conquista_id = Column(UUID(as_uuid=True), ForeignKey("conquistas.id", ondelete="CASCADE"), primary_key=True)
    desbloqueada_em = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="conquistas")
    conquista = relationship("Conquista")
