import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import '../styles/UE.css';
import { useParams } from 'react-router-dom';

const Niveau = () => {
  const [nivs, setNivs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    numero: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/formation/${id}`);
      setNivs(response.data.niveau);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Mise à jour d'un niveau existant
        await axios.put(`http://localhost:3000/formation/${id}/${formData.id}`, formData);
      } else {
        // Ajout d'un nouveau niveau
        const newNiveau = {
          id: id, // Ajoutez l'identifiant de la formation
          numero: formData.numero,
      };
      await axios.post(`http://localhost:3000/formation/${id}/niveau`, newNiveau);
      
      }
      
      setFormData({ numero: '' });
      fetchData(); // Mettez à jour les niveaux après l'ajout ou la mise à jour
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating niveau:', error);
    }
  };
  
  

  const handleEdit = (niv) => {
    setFormData({
      id: niv.id,
      numero: niv.libelle,
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette niveau ?")) {
            await axios.delete(`http://localhost:3000/formation/${id}/${formData.id}`);

            const nouveauxniveaux = nivs.filter(niv => niv.id !== id);
            setNivs(nouveauxniveaux);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'UE:', error);
    }
};

  const columns = [
    { field: 'numero', headerName: 'Numero', width: 300 },
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
  ];

  const filteredNiveau = Array.isArray(nivs) ? nivs.filter(niv => {
    // Vérifier si niv.numero est défini avant de tenter de l'utiliser
    if (niv.numero !== undefined && niv.numero !== null) {
        const numero = typeof niv.numero === 'string' ? niv.numero.toLowerCase() : niv.numero.toString().toLowerCase();
        return numero.includes(searchQuery.toLowerCase());
    }
    return false; // Si niv.numero est undefined ou null, exclure cet élément du filtre
}) : [];


  return (
    <div className="ue-container">
      <div className="ue-header"><br />
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
              label="Numero"
              name="numero"
              type="number"
              value={formData.numero}
              onChange={handleChange}
              className="form-field"
            /><br/>

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
            rows={filteredNiveau}
            columns={columns}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};

export default Niveau;
