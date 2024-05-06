import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './images/logo.jpg'; 

const Header = () => {
  return (
    <header className="header" style={{ backgroundImage: 'linear-gradient(120deg, #006400, #ffffff)', color: '#333', padding: '10px' }}>
      <div className="header-content">
        <div className="header-logo">
          <img src={logo} alt="Logo" style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '10px' }} />
          <h1 style={{ fontSize: '1.5rem', margin: 0 ,color: "white" }}>DFOAD</h1><br/>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Accueil</Link>|
          <Link to="/formation" className="nav-link">Formations</Link>|
          <Link to="/apropos" className="nav-link">À Propos</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;