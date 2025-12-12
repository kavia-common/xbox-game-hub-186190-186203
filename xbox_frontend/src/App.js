import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Account from './pages/Account';

// PUBLIC_INTERFACE
function App() {
  /** Root of the React app with theme toggle and top-level routing */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Switches app theme between light and dark */
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<div className="detail-section">Page not found</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
