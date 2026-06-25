import { Outlet, NavLink } from 'react-router-dom';
import { Home, Calendar, User, Target, Bell, Settings } from 'lucide-react';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar glass">
        <div className="sidebar-header">
          <div className="logo-container">
            <Target className="logo-icon" size={28} />
            <h1 className="logo-text gradient-text">HonestQuest</h1>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active hover-lift" : "nav-item hover-lift"} end>
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/horarios" className={({ isActive }) => isActive ? "nav-item active hover-lift" : "nav-item hover-lift"}>
            <Calendar size={20} />
            <span>Horários</span>
          </NavLink>
          <div className="nav-item hover-lift disabled">
            <User size={20} />
            <span>Perfil & Conquistas</span>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar glass">
          <div className="topbar-search">
            {/* Can add search or breadcrumbs later */}
            <span className="text-muted">Bem-vindo de volta! 🚀</span>
          </div>
          <div className="topbar-actions">
            <button className="icon-btn hover-lift"><Bell size={20} /></button>
            <button className="icon-btn hover-lift"><Settings size={20} /></button>
            <div className="user-profile hover-lift">
              <div className="avatar-placeholder">
                <img src="https://ui-avatars.com/api/?name=Hero+Student&background=8b5cf6&color=fff&bold=true" alt="User Avatar" />
              </div>
              <div className="user-info">
                <span className="user-name">Caio Hero</span>
                <span className="user-level gradient-text">Lvl 5 • 1200 XP</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
