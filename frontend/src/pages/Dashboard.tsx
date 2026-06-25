import { CheckCircle2, Circle, Flame, Target, BookOpen, Trophy } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">Resumo do Herói</h2>
          <p className="text-muted">Aqui está o teu estado atual e missões do dia.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card glass hover-lift">
          <div className="stat-icon streak"><Flame size={24} /></div>
          <div className="stat-info">
            <span className="stat-value">5 Dias</span>
            <span className="stat-label">Streak Foco</span>
          </div>
        </div>
        <div className="stat-card glass hover-lift">
          <div className="stat-icon missions"><Target size={24} /></div>
          <div className="stat-info">
            <span className="stat-value">12</span>
            <span className="stat-label">Missões Concluídas</span>
          </div>
        </div>
        <div className="stat-card glass hover-lift">
          <div className="stat-icon xp"><Trophy size={24} /></div>
          <div className="stat-info">
            <span className="stat-value">1200 / 2000</span>
            <span className="stat-label">XP para Lvl 6</span>
          </div>
          <div className="progress-bar-container mt-auto">
            <div className="progress-bar" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Left Column */}
        <div className="main-column">
          <div className="glass section-card">
            <h3 className="section-title">Missões de Hoje</h3>
            
            <div className="mission-list">
              <div className="mission-item hover-lift">
                <button className="check-btn completed"><CheckCircle2 size={24} /></button>
                <div className="mission-details">
                  <h4>Estudar Cálculo (Cap. 3)</h4>
                  <span className="mission-meta text-muted"><BookOpen size={14} /> 45 min • +20 XP</span>
                </div>
              </div>

              <div className="mission-item hover-lift active">
                <button className="check-btn"><Circle size={24} /></button>
                <div className="mission-details">
                  <h4>Treino de Força</h4>
                  <span className="mission-meta text-muted"><Target size={14} /> 30 min • +15 XP</span>
                </div>
                <button className="btn-primary">Iniciar Sessão</button>
              </div>

              <div className="mission-item hover-lift">
                <button className="check-btn"><Circle size={24} /></button>
                <div className="mission-details">
                  <h4>Ler Artigo de Física</h4>
                  <span className="mission-meta text-muted"><BookOpen size={14} /> 20 min • +10 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="side-column">
          <div className="glass section-card intention-card">
            <h3 className="section-title">Intenção do Dia</h3>
            <p className="intention-text text-muted">
              "Hoje quero focar-me em avançar na matéria de Cálculo e não falhar o treino."
            </p>
            <button className="btn-secondary w-full mt-4">Atualizar Intenção</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
