# HonestQuest 🎯

App de gamificação de hábitos e disciplina pessoal. Complete missões diárias, ganhe XP, suba de nível e mantenha o seu streak.

## Estrutura do Projeto

```
HonestQuest/
├── backend/          # API REST (FastAPI + SQLite)
│   ├── main.py       # Ponto de entrada da API
│   ├── models.py     # Modelos da base de dados (SQLAlchemy)
│   ├── database.py   # Configuração da base de dados (SQLite assíncrono)
│   ├── routers/
│   │   └── horarios_router.py  # Endpoints de horários disponíveis
│   └── schemas/
│       └── horarios_schema.py  # Schemas Pydantic (validação)
│
└── frontend/         # Interface Web (Next.js 16 + Tailwind CSS v4)
    ├── app/          # App Router (Next.js)
    ├── components/
    │   └── honest-quest/  # Componentes principais da aplicação
    └── lib/          # Dados, tipos e utilitários
```

## Como correr

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
API disponível em: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App disponível em: http://localhost:3000
