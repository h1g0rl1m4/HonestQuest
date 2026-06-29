from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional
from database import get_db
from models import Missao, PlanoDiario
from ai_engine import gerar_missao_secreta_async
import datetime

router = APIRouter(
    prefix="/missoes",
    tags=["missoes"],
)

class GerarMissaoRequest(BaseModel):
    nome: str
    objetivo: str
    tempo: int

class MissaoResponse(BaseModel):
    id: str
    titulo: str
    detalhes: str
    tipo: str
    concluida: bool
    xp_recompensa: int

@router.post("/gerar-secreta", response_model=MissaoResponse)
async def gerar_missao_secreta(req: GerarMissaoRequest, db: AsyncSession = Depends(get_db)):
    """Gera uma nova missão secreta usando IA e salva no plano de hoje."""
    hoje = datetime.date.today()
    
    # 1. Pegar ou criar o Plano de Hoje
    result = await db.execute(select(PlanoDiario).filter(PlanoDiario.data == hoje))
    plano = result.scalar_one_or_none()
    if not plano:
        # Pega um user_id genérico ou o primeiro usuário da DB para o mock
        from models import User
        user_result = await db.execute(select(User).limit(1))
        user = user_result.scalar_one_or_none()
        if not user:
            user = User(nome="Usuário Genérico", email="user@honestquest.com", password_hash="123")
            db.add(user)
            await db.commit()
            await db.refresh(user)

        plano = PlanoDiario(data=hoje, user_id=user.id)
        db.add(plano)
        await db.commit()
        await db.refresh(plano)
        
    # 2. Gerar a missão com IA
    try:
        resultado = await gerar_missao_secreta_async({
            "nome": req.nome,
            "objetivo": req.objetivo,
            "tempo": req.tempo
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro na IA: {str(e)}")
        
    # 3. Guardar na BD
    nova_missao = Missao(
        plano_id=plano.id,
        user_id=plano.user_id,
        titulo=resultado["titulo"],
        descricao=resultado["detalhes"],
        tipo="secreta",
        concluida=False,
        xp_recompensa=100  # Missões secretas dão muito XP!
    )
    
    db.add(nova_missao)
    await db.commit()
    await db.refresh(nova_missao)
    
    return {
        "id": str(nova_missao.id),
        "titulo": nova_missao.titulo,
        "detalhes": nova_missao.descricao,
        "tipo": nova_missao.tipo,
        "concluida": nova_missao.concluida,
        "xp_recompensa": nova_missao.xp_recompensa
    }

