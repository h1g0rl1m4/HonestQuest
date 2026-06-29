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
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database import create_tables
from routers.horarios_router import router as horarios_router
from routers.missoes_router import router as missoes_router
from routers.progresso_router import router as progresso_router

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

# Adicionar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registar routers
app.include_router(horarios_router)
app.include_router(missoes_router)
app.include_router(progresso_router)


@app.get("/")
async def root():
    return {"message": "HonestQuest API está online 🎯"}
