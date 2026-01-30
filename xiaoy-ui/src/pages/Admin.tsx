import React from 'react';
import './Admin.css';

const Admin: React.FC = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-title animate-pop">🎩 管理员后台</div>
        <nav className="sidebar-nav">
          <ul>
            <li className="animate-nav"><span role="img" aria-label="user">👤</span> 用户管理</li>
            <li className="animate-nav"><span role="img" aria-label="shield">🛡️</span> 权限设置</li>
            <li className="animate-nav"><span role="img" aria-label="log">📜</span> 系统日志</li>
            <li className="animate-nav"><span role="img" aria-label="setting">⚙️</span> 设置</li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">
        <header className="admin-header animate-fadein">
          <h2>欢迎，管理员 <span role="img" aria-label="hi">👋</span></h2>
        </header>
        <nav className="admin-navbar">
          <ul>
            <li className="animate-nav"><span role="img" aria-label="home">🏠</span> 首页</li>
            <li className="animate-nav"><span role="img" aria-label="bell">🔔</span> 通知</li>
            <li className="animate-nav"><span role="img" aria-label="help">❓</span> 帮助</li>
          </ul>
        </nav>
        <section className="admin-content">
          <div className="content-placeholder animate-card">✨ 欢迎使用管理员系统！<span role="img" aria-label="star">🌟</span></div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
