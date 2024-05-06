import React from 'react';
import { FaUserCircle, FaPowerOff } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const ProfileSection = ({ username, onLogout }) => {
  const history = useHistory();

  const handleLogout = () => {
    // Effectuer les actions de déconnexion ici, par exemple, supprimer les données d'authentification, etc.
    onLogout();
    // Rediriger l'utilisateur vers la page de connexion
    history.push('/login');
  };

  return (
    <div className="profile-section">
      <div className="profile-info">
        <FaUserCircle className="profile-icon" />
        <span>{username}</span>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        <FaPowerOff />
        <span>Déconnexion</span>
      </button>
    </div>
  );
};

export default ProfileSection;