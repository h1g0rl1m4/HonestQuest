"""
HonestQuest - Schema da Base de Dados
Stack: Python + SQLite + SQLAlchemy
"""

from sqlalchemy import (
    create_engine, Column, Integer, String, Text,
    Boolean, DateTime, ForeignKey, Enum, Time
)
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime
import enum

# Criação da base de dados (ficheiro local honestquest.db)
engine = create_engine("sqlite:///honestquest.db", echo=True)
Base = declarative_base()


# ─────────────────────────────────────────
# ENUMS
# ─────────────────────────────────────────

class NivelProdutividade(str, enum.Enum):
    BAIXO = "baixo"
    MEDIO = "medio"
    ALTO = "alto"

class TipoObjetivo(str, enum.Enum):
    ESTUDO = "estudo"
    TREINO = "treino"
    LEITURA = "leitura"
    OUTRO = "outro"

class StatusMissao(str, enum.Enum):
    PENDENTE = "pendente"
    EM_CURSO = "em_curso"
    COMPLETA = "completa"
    FALHADA = "falhada"

class DiaSemana(str, enum.Enum):
    SEGUNDA = "segunda"
    TERCA = "terca"
    QUARTA = "quarta"
    QUINTA = "quinta"
    SEXTA = "sexta"
    SABADO = "sabado"
    DOMINGO = "domingo"


# ─────────────────────────────────────────
# TABELA: utilizadores
# Tarefa Trello: Registo de conta + Perfil do estudante
# ─────────────────────────────────────────

class Utilizador(Base):
    __tablename__ = "utilizadores"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    # Perfil do estudante
    curso = Column(String(150), nullable=True)
    objetivos_academicos = Column(Text, nullable=True)  # texto livre

    # Avaliação inicial de produtividade
    nivel_produtividade = Column(
        Enum(NivelProdutividade),
        default=NivelProdutividade.MEDIO,
        nullable=True
    )
    onboarding_completo = Column(Boolean, default=False)

    # Timestamps
    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relações
    horarios = relationship("HorarioDisponivel", back_populates="utilizador", cascade="all, delete")
    planos_diarios = relationship("PlanoDiario", back_populates="utilizador", cascade="all, delete")

    def __repr__(self):
        return f"<Utilizador(id={self.id}, nome='{self.nome}', email='{self.email}')>"


# ─────────────────────────────────────────
# TABELA: horarios_disponiveis
# Tarefa Trello: Configuração de horários disponíveis
# ─────────────────────────────────────────

class HorarioDisponivel(Base):
    __tablename__ = "horarios_disponiveis"

    id = Column(Integer, primary_key=True, autoincrement=True)
    utilizador_id = Column(Integer, ForeignKey("utilizadores.id"), nullable=False)

    dia_semana = Column(Enum(DiaSemana), nullable=False)
    hora_inicio = Column(Time, nullable=False)   # ex: 09:00
    hora_fim = Column(Time, nullable=False)      # ex: 12:00
    ativo = Column(Boolean, default=True)

    criado_em = Column(DateTime, default=datetime.utcnow)

    # Relações
    utilizador = relationship("Utilizador", back_populates="horarios")

    def __repr__(self):
        return f"<Horario(dia={self.dia_semana}, {self.hora_inicio}-{self.hora_fim})>"


# ─────────────────────────────────────────
# TABELA: planos_diarios
# O utilizador define o que quer fazer no dia
# ─────────────────────────────────────────

class PlanoDiario(Base):
    __tablename__ = "planos_diarios"

    id = Column(Integer, primary_key=True, autoincrement=True)
    utilizador_id = Column(Integer, ForeignKey("utilizadores.id"), nullable=False)

    data = Column(DateTime, nullable=False, default=datetime.utcnow)
    descricao_intencao = Column(Text, nullable=False)  # "hoje quero estudar e treinar"

    criado_em = Column(DateTime, default=datetime.utcnow)

    # Relações
    utilizador = relationship("Utilizador", back_populates="planos_diarios")
    missoes = relationship("Missao", back_populates="plano", cascade="all, delete")

    def __repr__(self):
        return f"<PlanoDiario(id={self.id}, data={self.data})>"


# ─────────────────────────────────────────
# TABELA: missoes
# Geradas pela IA com base na intenção do dia
# ─────────────────────────────────────────

class Missao(Base):
    __tablename__ = "missoes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    plano_id = Column(Integer, ForeignKey("planos_diarios.id"), nullable=False)

    titulo = Column(String(200), nullable=False)          # "Estudar 2 capítulos de Matemática"
    descricao = Column(Text, nullable=True)
    tipo = Column(Enum(TipoObjetivo), nullable=False)
    duracao_minutos = Column(Integer, nullable=True)       # tempo estimado
    status = Column(Enum(StatusMissao), default=StatusMissao.PENDENTE)
    ordem = Column(Integer, default=0)                     # ordem de apresentação

    concluida_em = Column(DateTime, nullable=True)
    criado_em = Column(DateTime, default=datetime.utcnow)

    # Relações
    plano = relationship("PlanoDiario", back_populates="missoes")

    def __repr__(self):
        return f"<Missao(titulo='{self.titulo}', status={self.status})>"


# ─────────────────────────────────────────
# CRIAR TODAS AS TABELAS
# ─────────────────────────────────────────

def criar_base_de_dados():
    Base.metadata.create_all(engine)
    print("✅ Base de dados criada com sucesso! Ficheiro: honestquest.db")


if __name__ == "__main__":
    criar_base_de_dados()
