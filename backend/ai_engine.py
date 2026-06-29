import os
import asyncio
import random
from typing import Optional

try:
    from llama_cpp import Llama
    HAS_LLAMA = True
except ImportError:
    HAS_LLAMA = False
    Llama = None

# Singleton instance for the model
_llm_instance: Optional['Llama'] = None
_loading_lock = asyncio.Lock()

async def get_llm():
    """Lazy loads the LLM asynchronously on first request."""
    global _llm_instance
    if not HAS_LLAMA:
        return None

    if _llm_instance is not None:
        return _llm_instance
        
    async with _loading_lock:
        if _llm_instance is not None:
            return _llm_instance
            
        def _load_model():
            base_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(base_dir, "ai", "Llama-3.2-3B-Instruct-Q4_K_S.gguf")
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Modelo não encontrado em: {model_path}")
                
            return Llama(
                model_path=model_path,
                n_ctx=512,
                n_threads=4,
                verbose=False
            )
            
        _llm_instance = await asyncio.to_thread(_load_model)
        return _llm_instance

async def gerar_missao_secreta_async(perfil_usuario: dict) -> dict:
    """Gera uma missão personalizada de forma assíncrona usando o Llama-3 local ou fallback."""
    llm = await get_llm()
    
    nome = perfil_usuario.get("nome", "Guerreiro")
    objetivo = perfil_usuario.get("objetivo", "Produtividade")
    tempo = perfil_usuario.get("tempo", 30)
    
    if not llm:
        # FALLBACK: Se o llama-cpp não estiver instalado (por falta de compiladores C++)
        # Usa um gerador pseudo-aleatório baseado no objetivo
        await asyncio.sleep(1.5) # Simula o tempo de geração
        missoes_fallback = [
            {"titulo": "Desconectar para Reconectar", "detalhes": f"Objetivo: Foco absoluto.\nComo fazer:\n1. Desliga a internet do telemóvel por {tempo} minutos.\n2. Foca-te apenas no teu objetivo ({objetivo}).\n3. Regista como te sentiste no final.\nDica: O mundo não acaba se ficares offline."},
            {"titulo": "A Regra dos 2 Minutos", "detalhes": f"Objetivo: Vencer a procrastinação.\nComo fazer:\n1. Encontra uma tarefa relacionada com '{objetivo}' que demore menos de 2 minutos.\n2. Faz isso imediatamente.\n3. Repete mais duas vezes hoje.\nDica: A inércia é o teu pior inimigo."},
            {"titulo": "Revisão de Metas", "detalhes": f"Objetivo: Clareza mental.\nComo fazer:\n1. Pega num papel e caneta.\n2. Escreve porque é que '{objetivo}' é importante para ti, {nome}.\n3. Lê isso em voz alta.\nDica: Lembrar o 'porquê' recarrega a energia."}
        ]
        return random.choice(missoes_fallback)

    prompt = f"""<|im_start|>system
Você é um assistente de hábitos e rotina saudável. Gere uma missão diária personalizada seguindo exatamente o formato abaixo:

TITULO: [Deve ser uma ação muito clara, curta, direta e autoexplicativa sobre o que fazer. Exemplo: "Beba 2 litros de água hoje", "Faça uma caminhada de 15 minutos", "Escreva 3 objetivos para o seu dia"]

DETALHES:
- Objetivo: [Breve frase com o benefício ou propósito da missão]
- Como fazer:
  1. [Primeiro passo prático]
  2. [Segundo passo prático]
  3. [Terceiro passo prático]
- Dica: [Uma dica rápida e útil de sucesso]

Instruções: Não use outros textos, explicações, nem caracteres extras como asteriscos ou hashtags. Responda apenas o bloco formatado.<|im_end|>
<|im_start|>user
Perfil do usuário:
- Nome: {nome}
- Objetivo: {objetivo}
- Tempo disponível: {tempo} minutos por dia<|im_end|>
<|im_start|>assistant
"""
    
    def _generate():
        response = llm(
            prompt,
            max_tokens=300,
            temperature=0.7,
            stop=["<|im_end|>", "\n\n\n\n"]
        )
        return response["choices"][0]["text"].strip()
        
    texto = await asyncio.to_thread(_generate)
    
    # Parse do texto
    titulo = "Missão Secreta"
    detalhes = ""
    
    if "TITULO:" in texto.upper() and "DETALHES:" in texto.upper():
        parts = texto.split("DETALHES:")
        titulo_part = parts[0]
        detalhes_part = parts[1] if len(parts) > 1 else ""
        
        titulo = titulo_part.replace("TITULO:", "").replace("titulo:", "").replace("Titulo:", "").strip()
        detalhes = detalhes_part.strip()
    else:
        linhas = texto.split("\n")
        if linhas:
            titulo = linhas[0].replace("TITULO:", "").strip()
            detalhes = "\n".join(linhas[1:]).replace("DETALHES:", "").strip()

    # Limpeza extra
    titulo = titulo.replace("**", "").replace("##", "").replace("[", "").replace("]", "").strip()
    detalhes = detalhes.replace("**", "").replace("##", "").replace("[", "").replace("]", "").strip()
    
    if detalhes.upper().startswith("DETALHES:"):
        detalhes = detalhes[9:].strip()
        
    return {
        "titulo": titulo,
        "detalhes": detalhes
    }
