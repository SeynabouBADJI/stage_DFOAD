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

const AnneeScolaire = () => {
  const [ans, setAns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    libelle:'',
    dateDebut: new Date(),
    dateFin: new Date()
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/annees');
      setAns(response.data);
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
      const newANS = {
        libelle: formData.libelle,
        dateDebut: formData.dateDebut.toISOString(), // Convert to ISO string
        dateFin: formData.dateFin.toISOString() // Convert to ISO string
      };
      await axios.post('http://localhost:3000/annees', newANS);
      
      setFormData({
        libelle:'',
        dateDebut: new Date(),
        dateFin: new Date()
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating annee:', error);
    }
  };

  const handleEdit = (an) => {
    setFormData({
      id: an.id,
      libelle: an.libelle,
      dateDebut: new Date(an.dateDebut),
      dateFin: new Date(an.dateFin)
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cette année ?")) {
        await axios.delete(`http://localhost:3000/annees/${id}`);
        const nouveauxAnnees = ans.filter(an => an.id !== id);
        setAns(nouveauxAnnees);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'UE:', error);
    }
  };

  const columns = [
    { field: 'libelle', headerName: 'Libellé', width: 300 },
    { field: 'dateDebut', headerName: 'DateDebut', width: 200 },
    { field: 'dateFin', headerName: 'DateFin', width: 200 },
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
    }
  ];

  const filteredAns = ans.filter(an => {
    return an.libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      an.dateDebut.toLowerCase().includes(searchQuery.toLowerCase()) ||
      an.dateFin.toLowerCase().includes(searchQuery.toLowerCase());
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
              type="date"
              label="DateDebut"
              name="dateDebut"
              value={formData.dateDebut.toISOString().split('T')[0]}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              type="date"
              label="DateFin"
              name="dateFin"
              value={formData.dateFin.toISOString().split('T')[0]}
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
            rows={filteredAns}
            columns={columns}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};
export default AnneeScolaire;
