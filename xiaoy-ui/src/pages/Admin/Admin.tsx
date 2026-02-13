import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Admin.css';

const Admin: React.FC = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-title animate-pop">🎩 科大小Y后管</div>
        <nav className="sidebar-nav">
          <ul>
            
            <NavLink to="/admin/users" className="admin-link">
              <li className="animate-nav">
                <span role="img" aria-label="user">
                  👤 用户管理
                </span>
              </li>
            </NavLink>
            <NavLink to="/admin/coursecomments" className="admin-link">
              <li className="animate-nav">
                <span role="img" aria-label="shield">
                  💬 评论管理
                </span>
              </li>
            </NavLink>
            <NavLink to="/admin/courses" className="admin-link">
              <li className="animate-nav">
                <span role="img" aria-label="log">
                  📖 课程管理
                </span>
              </li>
            </NavLink>
            <NavLink to="/admin/locations" className="admin-link">
              <li className="animate-nav">
                
                  📍 地点管理
                
              </li>
            </NavLink>
            <NavLink to="/admin/dishs" className="admin-link"> 
              <li className="animate-nav">
                <span role="img" aria-label="setting">
                  🍜 食物管理
                </span>
              </li>
            </NavLink>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">
        <header className="admin-header animate-fadein">
          <h2 style={{margin:"auto 50px"}}>
            <span  role="img" aria-label="hi">
              欢迎，管理员{" "} 👋
            </span>
          </h2>
        </header>
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Admin;

