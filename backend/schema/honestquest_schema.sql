-- ============================================================
-- HonestQuest - Schema da Base de Dados
-- PostgreSQL / Supabase
-- ============================================================

-- Extensão para gerar UUIDs automaticamente
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABELA: users
-- Utilizadores registados na plataforma
-- ============================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    curso VARCHAR(150),
    objetivos_academicos TEXT,                      -- ex: "Passar a cadeira de Cálculo, melhorar inglês"
    nivel_produtividade_inicial INTEGER DEFAULT 1,  -- avaliação inicial (1-10)
    xp_total INTEGER DEFAULT 0,                     -- pontos de experiência acumulados
    nivel INTEGER DEFAULT 1,                        -- nível do utilizador (gamificação)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- TABELA: horarios_disponiveis
-- Janelas de tempo em que o utilizador pode estudar/treinar
-- ============================================================
CREATE TABLE horarios_disponiveis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dia_semana INTEGER NOT NULL CHECK (dia_semana BETWEEN 0 AND 6), -- 0=Segunda, 6=Domingo
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT horario_valido CHECK (hora_fim > hora_inicio)
);

-- ============================================================
-- TABELA: intencoes_diarias
-- O que o utilizador quer fazer hoje (enviado pelo utilizador)
-- ============================================================
CREATE TABLE intencoes_diarias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    data DATE NOT NULL DEFAULT CURRENT_DATE,
    descricao TEXT NOT NULL,           -- ex: "Hoje quero estudar matemática e treinar 30 min"
    tipo VARCHAR(50),                  -- 'estudo', 'treino', 'misto', 'outro'
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE (user_id, data)             -- só uma intenção por dia por utilizador
);

-- ============================================================
-- TABELA: planos_diarios
-- Plano gerado pela IA com base nas intenções do utilizador
-- ============================================================
CREATE TABLE planos_diarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    intencao_id UUID REFERENCES intencoes_diarias(id) ON DELETE SET NULL,
    data DATE NOT NULL DEFAULT CURRENT_DATE,
    resumo TEXT,                       -- resumo do plano gerado pela IA
    gerado_por_ia BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- TABELA: missoes
-- Missões diárias geradas pela IA (tarefas concretas)
-- ============================================================
CREATE TABLE missoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plano_id UUID NOT NULL REFERENCES planos_diarios(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    titulo VARCHAR(200) NOT NULL,        -- ex: "Estudar Capítulo 3 de Cálculo"
    descricao TEXT,
    tipo VARCHAR(50),                    -- 'estudo', 'treino', 'leitura', 'revisao', etc.
    duracao_minutos INTEGER,             -- tempo estimado em minutos
    xp_recompensa INTEGER DEFAULT 10,   -- XP ganho ao completar
    concluida BOOLEAN DEFAULT FALSE,
    concluida_em TIMESTAMP,
    ordem INTEGER DEFAULT 0,            -- ordem de execução sugerida
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- TABELA: sessoes_estudo
-- Registo de sessões de estudo/treino completadas
-- ============================================================
CREATE TABLE sessoes_estudo (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    missao_id UUID REFERENCES missoes(id) ON DELETE SET NULL,
    data DATE NOT NULL DEFAULT CURRENT_DATE,
    inicio TIMESTAMP NOT NULL,
    fim TIMESTAMP,
    duracao_real_minutos INTEGER,       -- calculado ao terminar
    notas TEXT,                         -- reflexão do utilizador após a sessão
    avaliacao INTEGER CHECK (avaliacao BETWEEN 1 AND 5), -- como correu? 1-5 estrelas
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- TABELA: conquistas
-- Badges e conquistas desbloqueadas pelo utilizador
-- ============================================================
CREATE TABLE conquistas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    icone VARCHAR(50),                  -- emoji ou nome do ícone
    condicao VARCHAR(100)               -- ex: '7_dias_seguidos', '10_missoes_completas'
);

CREATE TABLE user_conquistas (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    conquista_id UUID REFERENCES conquistas(id) ON DELETE CASCADE,
    desbloqueada_em TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, conquista_id)
);

-- ============================================================
-- ÍNDICES para performance
-- ============================================================
CREATE INDEX idx_horarios_user ON horarios_disponiveis(user_id);
CREATE INDEX idx_intencoes_user_data ON intencoes_diarias(user_id, data);
CREATE INDEX idx_planos_user_data ON planos_diarios(user_id, data);
CREATE INDEX idx_missoes_plano ON missoes(plano_id);
CREATE INDEX idx_missoes_user ON missoes(user_id);
CREATE INDEX idx_sessoes_user_data ON sessoes_estudo(user_id, data);

-- ============================================================
-- DADOS INICIAIS: Conquistas base
-- ============================================================
INSERT INTO conquistas (nome, descricao, icone, condicao) VALUES
    ('Primeiro Passo', 'Completaste a tua primeira missão!', '🎯', 'primeira_missao'),
    ('Semana Perfeita', '7 dias seguidos com missões completas', '🔥', '7_dias_seguidos'),
    ('Estudante Dedicado', 'Completaste 10 sessões de estudo', '📚', '10_sessoes'),
    ('Atleta', 'Completaste 5 missões de treino', '💪', '5_treinos'),
    ('Nível 5', 'Alcançaste o nível 5', '⭐', 'nivel_5'),
    ('Madrugador', 'Completaste uma missão antes das 8h', '🌅', 'antes_8h');
