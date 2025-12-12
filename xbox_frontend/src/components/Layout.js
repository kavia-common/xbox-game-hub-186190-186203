import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './layout.css';

// PUBLIC_INTERFACE
export default function Layout({ children }) {
  /** Top-level layout with sidebar, header, and main content area */
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">🎮</span>
          <span className="brand-text">Xbox Hub</span>
        </div>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span>Home</span>
          </NavLink>
          <NavLink to="/account" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span>Account</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <a className="muted small" href="https://reactjs.org" target="_blank" rel="noreferrer">React</a>
        </div>
      </aside>
      <div className="main">
        <header className="header">
          <Link to="/" className="header-title">Xbox Game Hub</Link>
          <div className="header-actions">
            <Link to="/account" className="btn small">Sign In</Link>
          </div>
        </header>
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}
