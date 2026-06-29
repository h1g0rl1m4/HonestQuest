# HonestQuest 🎯

A tua jornada épica para a disciplina pessoal. HonestQuest é uma aplicação de produtividade gamificada onde completas missões diárias, ganhas XP, sobes de nível e manténs o teu "streak" de foco, tudo acompanhado por um mentor virtual e missões geradas por Inteligência Artificial!

## 🌟 Funcionalidades Principais (Sprint 3 Completo)

- **Gamificação de Hábitos**: Missões diárias, Missões Épicas (foco profundo) e Micro-missões rápidas para combater a inatividade.
- **Progressão e Conquistas**: Ganha XP, sobe de nível e desbloqueia novos títulos (ex: "Aprendiz", "Lenda").
- **Motor de Missões por IA**: Gera missões secretas e surpresa baseadas no teu perfil usando um modelo LLM local (`llama-cpp-python` opcional).
- **Análise de Evolução**: Acompanha o teu progresso semanal, horas mais produtivas e o teu "streak".
- **Adaptação Dinâmica de Dificuldade**: O sistema ajusta-se se estiveres a completar demasiadas (ou poucas) missões.
- **Mentor Virtual**: O teu guia pessoal que reage ao teu progresso (Sábio, Entusiasmado ou Sério).

## 📁 Estrutura do Projeto

```
HonestQuest/
├── backend/          # API REST (FastAPI + SQLite + IA)
│   ├── ai_engine.py  # Motor de Geração de Missões por IA
│   ├── main.py       # Ponto de entrada da API com CORS
│   └── routers/      # Endpoints (Missões, Horários, Progresso)
│
├── frontend/         # Interface Web Premium (Next.js + Tailwind CSS)
│   ├── components/honest-quest/ # Interface Gamificada
│   └── lib/          # Estado global e dados mockados
│
└── start.bat / .sh   # Scripts automáticos para iniciar tudo com 1 clique
```

## 🚀 Como Executar Facilmente (Qualquer Computador)

Para facilitar a execução em qualquer máquina, criámos scripts automáticos que instalam as dependências e iniciam o Backend e o Frontend ao mesmo tempo.

### Em Windows
Basta dar um duplo clique no ficheiro **`start.bat`** (ou correr na consola).
O script irá:
1. Instalar as bibliotecas de Python necessárias.
2. Instalar os pacotes Node.js (se necessário).
3. Iniciar o servidor FastAPI e o servidor Next.js em paralelo.

### Em Mac/Linux
Abre o terminal na pasta do projeto e corre:
```bash
./start.sh
```

A aplicação abrirá automaticamente em `http://localhost:3000` e a documentação da API em `http://localhost:8000/docs`.

---
*Nota: Para utilizar as Missões Secretas geradas por IA, o backend irá tentar descarregar e utilizar um modelo leve caso a biblioteca `llama-cpp-python` seja instalada.*
