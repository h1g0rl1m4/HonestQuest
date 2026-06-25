const Horarios = () => {
  return (
    <div className="horarios-page">
      <div className="dashboard-header mb-8">
        <h2 className="page-title">Configuração de Horários</h2>
        <p className="text-muted">Define as tuas janelas de disponibilidade para as missões.</p>
      </div>

      <div className="glass section-card">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 className="gradient-text mb-4">Em Construção</h3>
          <p className="text-muted">
            Este módulo será ligado à API FastAPI que criaste (`/horarios`).
            Aqui os utilizadores poderão adicionar e editar os blocos de tempo livres.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Horarios;
