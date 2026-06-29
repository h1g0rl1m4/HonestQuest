# ============================================================
# HonestQuest - App Principal (FastAPI)
# ============================================================
# Para correr:
#   pip install fastapi uvicorn sqlalchemy asyncpg python-dotenv
#   uvicorn main:app --reload
#
# Documentação automática disponível em:
#   http://localhost:8000/docs
# ============================================================

from fastapi import FastAPI
from contextlib import asynccontextmanager

from database import create_tables
from routers.horarios_router import router as horarios_router
from routers.missoes_router import router as missoes_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Cria tabelas ao arrancar (só em desenvolvimento)
    await create_tables()
    yield


app = FastAPI(
    title="HonestQuest API",
    description="API de produtividade gamificada — missões diárias personalizadas por IA",
    version="0.1.0",
    lifespan=lifespan
)

# Registar routers
app.include_router(horarios_router)
app.include_router(missoes_router)


@app.get("/")
async def root():
    return {"message": "HonestQuest API está online 🎯"}
