import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";

const Admin: React.FC = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-title">科大小Y 后台</div>
        <nav className="sidebar-nav">
          <ul>
            <NavLink to="/admin/users" className={({ isActive }) => `admin-link-button${isActive ? " active" : ""}`}>
              <li>👤 用户管理</li>
            </NavLink>
            <NavLink to="/admin/coursecomments" className={({ isActive }) => `admin-link-button${isActive ? " active" : ""}`}>
              <li>💬 评论管理</li>
            </NavLink>
            <NavLink to="/admin/courses" className={({ isActive }) => `admin-link-button${isActive ? " active" : ""}`}>
              <li>📖 课程管理</li>
            </NavLink>
            <NavLink to="/admin/locations" className={({ isActive }) => `admin-link-button${isActive ? " active" : ""}`}>
              <li>📍 地点管理</li>
            </NavLink>
            <NavLink to="/admin/dishs" className={({ isActive }) => `admin-link-button${isActive ? " active" : ""}`}>
              <li>🍜 食物管理</li>
            </NavLink>
          </ul>
        </nav>
        <div className="sidebar-footer">v1.0 · 科大小Y</div>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <h2>欢迎，管理员 👋</h2>
          <NavLink to="/" className="admin-link-main">
            <span>🏠 返回首页</span>
          </NavLink>
        </header>
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Admin;
