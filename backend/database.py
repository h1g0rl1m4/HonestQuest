# ============================================================
# HonestQuest - Configuração da Base de Dados (SQLite Assíncrono)
# ============================================================
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from models import Base

# Caminho para o ficheiro local SQLite
DATABASE_URL = "sqlite+aiosqlite:///./honestquest.db"

# Criar o motor assíncrono para o SQLite
engine = create_async_engine(DATABASE_URL, echo=True)

# Criar a fábrica de sessões
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
)

async def get_db():
    """
    Dependência do FastAPI para injetar a sessão de base de dados nas rotas.
    """
    async with AsyncSessionLocal() as session:
        yield session

async def create_tables():
    """
    Cria as tabelas na base de dados ao arrancar a aplicação,
    caso ainda não existam.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print("✅ Base de dados configurada com sucesso!")
