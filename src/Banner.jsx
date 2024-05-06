import React from 'react';
import { Typography } from '@mui/material';
import banner from './images/banner.jpg'; // Importez votre image de bannière

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <Typography variant="h1">L'enseignement a distance</Typography>
        <Typography variant="subtitle1" style={{ textAlign: "center" }}>Découvrez nos formations diversifiées et nos services académiques</Typography>
      </div>
      <img src={banner} alt="Bannière d'accueil" className="banner-image" style={{ width: '100%', height: '400px' }} />
    </div>
  );
}

export default Banner;