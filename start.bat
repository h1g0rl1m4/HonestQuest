@echo off
echo ==========================================
echo Inicializando HonestQuest...
echo ==========================================

echo [1/3] Instalando dependencias do backend...
cd backend
python -m pip install -r requirements.txt
cd ..

echo [2/3] Instalando dependencias do frontend...
cd frontend
call npm install
cd ..

echo [3/3] Iniciando servidores...
echo O backend rodara em http://127.0.0.1:8000
echo O frontend rodara em http://localhost:3000
echo Pressione CTRL+C para encerrar.

call npx concurrently "cd backend && uvicorn main:app --reload" "cd frontend && npm run dev"
