@echo off
title HonestQuest - Inicializador do Sistema
:: Define fundo preto e texto verde brilhante (Estilo Matrix/Retro)
color 0A

cls
echo.
echo  ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»
echo  º                                                                           º
echo  º    _   _                       _    _____                 _               º
echo  º   ^| ^| ^| ^| ___  _ __   ___  ___^| ^|_ ^|  _  ^| _   _  ___  ___^| ^|_             º
echo  º   ^| ^|_^| ^|/ _ \^| '_ \ / _ \/ __^| __^|^| ^| ^| ^|^| ^| ^| ^|/ _ \/ __^| __^|            º
echo  º   ^|  _  ^| (_) ^| ^| ^| ^|  __/\__ \ ^|_ ^| ^\_^| ^|^| ^|_^| ^|  __/\__ \ ^|_             º
echo  º   ^|_^| ^|_^|\___/^|_^| ^|_^|\___^|^|___/\__^| \__\_\\__,_^|\___^|^|___/\__^|            º
echo  º                                                                           º
echo  ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼
echo.
echo  ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»
echo  º [1/3] A invocar os guardioes do Backend (Python)                          º
echo  ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼
cd backend
python -m pip install -q -r requirements.txt
cd ..
echo    * Backend preparado com sucesso!
echo.
echo  ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»
echo  º [2/3] A forjar as armas do Frontend (Node.js)                             º
echo  ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼
cd frontend
call npm install --silent
cd ..
echo    * Frontend forjado com sucesso!
echo.
echo  ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»
echo  º [3/3] A iniciar o mundo de HonestQuest...                                 º
echo  ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼
echo.
echo    [FRONTEND] O teu painel estara disponivel em: http://localhost:3000
echo    [BACKEND]  O servidor de magias (API) em:     http://127.0.0.1:8000
echo.
echo    ! Pressiona CTRL+C no terminal a qualquer momento para sair em seguranca. !
echo.

call npx concurrently -n "BACKEND,FRONTEND" -c "bgBlue.bold,bgGreen.bold" "cd backend && uvicorn main:app --reload" "cd frontend && npm run dev"

