from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from database import get_db
from models import Missao, PlanoDiario, TipoMissao
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
    id: int
    titulo: str
    detalhes: str
    tipo: str
    concluida: bool
    xp_recompensa: int

@router.post("/gerar-secreta", response_model=MissaoResponse)
async def gerar_missao_secreta(req: GerarMissaoRequest, db: Session = Depends(get_db)):
    """Gera uma nova missão secreta usando IA e salva no plano de hoje."""
    hoje = datetime.date.today()
    
    # 1. Pegar ou criar o Plano de Hoje
    plano = db.query(PlanoDiario).filter(PlanoDiario.data == hoje).first()
    if not plano:
        plano = PlanoDiario(data=hoje)
        db.add(plano)
        db.commit()
        db.refresh(plano)
        
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
        plano_diario_id=plano.id,
        titulo=resultado["titulo"],
        descricao=resultado["detalhes"],
        tipo=TipoMissao.SECRETA,
        concluida=False,
        xp_recompensa=100  # Missões secretas dão muito XP!
    )
    
    db.add(nova_missao)
    db.commit()
    db.refresh(nova_missao)
    
    return {
        "id": nova_missao.id,
        "titulo": nova_missao.titulo,
        "detalhes": nova_missao.descricao,
        "tipo": nova_missao.tipo.value,
        "concluida": nova_missao.concluida,
        "xp_recompensa": nova_missao.xp_recompensa
    }
