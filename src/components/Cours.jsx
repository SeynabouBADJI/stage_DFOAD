import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import '../styles/UE.css';



const Cours = () => {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id:'',
    libelle:'',
    volumeHoraire:'',
    estPresentiel:''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cours');
      setCours(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://localhost:3000/cours/${formData.id}`, formData);
      } else {
        const newCours = {
          libelle: formData.libelle,
          volumeHoraire: formData.volumeHoraire,
          estPresentiel: formData.estPresentiel
        };
        await axios.post('http://localhost:3000/cours', newCours);
      }
      setFormData({
        libelle:'',
        volumeHoraire:'',
        estPresentiel:''
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating cours:', error);
    }
  };
  
  

  const handleEdit = (cour) => {
    setFormData({
      id: cour.id,
      libelle:cour.libelle,
      volumeHoraire:cour.volumeHoraire,
      estPresentiel:cour.estPresentiel
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
            await axios.delete(`http://localhost:3000/cours/${id}`);

            const nouveauxCours = cours.filter(cour => cour.id !== id);
            setCours(nouveauxCours);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'UE:', error);
    }
};

  const columns = [
    { field: 'libelle', headerName: 'Libellé', width: 300 },
    { field: 'volumeHoraire', headerName: 'VolumeHoraire', width: 200 },
    { field: 'estPresentiel', headerName: 'EstPresentiel', width: 200 },
    {
      field: 'edit',
      headerName: 'Modifier',
      width: 150,
      renderCell: (params) => (
        <EditIcon className="edit-icon" onClick={() => handleEdit(params.row)} />
      )
    },
    {
      field: 'delete',
      headerName: 'Supprimer',
      width: 150,
      renderCell: (params) => (
        <DeleteIcon className="delete-icon" onClick={() => handleDelete(params.row.id)} />
      )
    },
    {
      field: 'UE',
      headerName: 'UE',
      width: 100,
      renderCell: (params) => (
          <Link to={{ pathname: `/cours/${params.row.id}/ues`, state: { cours: params.row } }}>
              <Button variant="contained" startIcon={<VisibilityIcon />}>
              </Button>
          </Link>
      )
  },
  {
    field: 'EC',
    headerName: 'EC',
    width: 100,
    renderCell: (params) => (
        <Link to={{ pathname: `/cours/${params.row.id}/ecs`, state: { cours: params.row } }}>
            <Button variant="contained" startIcon={<VisibilityIcon />}>
            </Button>
        </Link>
    )
}

  
    
      
  ];

  const filteredCours = cours.filter(cour => {
    return (
      cour.libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof cour.volumeHoraire === 'string' && cour.volumeHoraire.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cour.estPresentiel.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  

  return (
    <div className="ue-container">
      <div className="ue-header"><br />
        {/* <h3 className="ue-title">Liste des Annees</h3> */}
        <div className="search-bar">
          <TextField
            variant="outlined"
            label="Rechercher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />
            }}
          />
        </div>
      </div>
      <div className="add-button-container">
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAdding(true)}>
          Ajouter
        </Button>
      </div>

      {isAdding && (
        <div className={`form-container ${isAdding ? 'visible' : ''}`}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Libellé"
              name="libelle"
              value={formData.libelle}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              label="Volume Horaire"
              name="volumeHoraire"
              type="number"
              value={formData.volumeHoraire}
              onChange={handleChange}
              className="form-field"
              InputProps={{ inputProps: { min: 0 } }} // Pour spécifier une valeur minimale
            />

            <TextField
              fullWidth
              label="EstPresentiel"
              name="estPresentiel"
              value={formData.estPresentiel}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <div className="form-buttons">
              <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                Ajouter
              </Button>
              <Button variant="contained" onClick={() => setIsAdding(false)} startIcon={<CancelIcon />}>
                Annuler
              </Button>
            </div>
          </form>
        </div>
      )}<br/>

      {loading ? (
        <Typography variant="h3" className="loading-text">Loading...</Typography>
      ) : (
        <div className="data-grid-container">
          <DataGrid
            rows={filteredCours}
            columns={columns}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};
export default Cours;
