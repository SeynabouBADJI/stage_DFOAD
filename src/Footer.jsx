import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer  style={{ backgroundImage: 'linear-gradient(120deg, #ffffff, #006400)', color: '#ecf0f1', padding: '20px', textAlign: 'center', marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <a href="https://github.com/SeynabouBADJI/Projet_DAOS.git" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', marginRight: '10px' }}>
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/pasdeprofil" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', marginRight: '10px' }}>
          <FaLinkedin />
        </a>
        <a href="https://twitter.com/pasdeprofil" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
          <FaTwitter />
        </a>
      </div>
      <div>

        <h3 style={{ margin: '10px 0',color:"black" }}>Ministère de l'Enseignement Supérieur et de la Recherche (MESR)</h3>
        <h4 style={{ margin: '10px 0',color:"black" }}>Université Assane Seck de Ziguinchor (UASZ)</h4>
        <p style={{ fontSize: '12px',color:"black" }}>
          &copy; 2024 DFOAD | Djiby&Zeyna  - Tous droits réservés !
        </p>
      </div>
    </footer>
  );
}

export default Footer;