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
import { useParams } from 'react-router-dom';




const Parcours = () => {
  const [pars, setPars] = useState([]);
  const [loading, setLoading] = useState(true);
  const TYPES_ENUM = ['Type1', 'Type2', 'Type3']; // Remplacez par vos valeurs réelles

  const [formData, setFormData] = useState({
    id:'',
    libelle:'',
    type:'',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { id } = useParams();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/formation/${id}`);
      setPars(response.data.parcours);
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
        await axios.put(`http://localhost:3000/formation/${id}/${formData.id}`, formData);
      } else {
        const newParcours = {
          libelle: formData.libelle,
          type: formData.type,
        };
        await axios.post(`http://localhost:3000/formation/${id}/parcours`, newParcours);
      }
      setFormData({
        libelle:'',
        type:'',
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating cours:', error);
    }
  };
  
  

  const handleEdit = (par) => {
    setFormData({
      id: par.id,
      libelle:par.libelle,
      type:par.type,
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce parcours ?")) {
            await axios.delete(`http://localhost:3000/formation/${id}/${formData.id}`);

            const nouveauxParcours = pars.filter(par => par.id !== id);
            setPars(nouveauxParcours);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'UE:', error);
    }
};

  const columns = [
    { field: 'libelle', headerName: 'Libellé', width: 300 },
    { field: 'type', headerName: 'Type', width: 200 },
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

  const filteredParcours = Array.isArray(pars) ? pars.filter(par => {
    return par.libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      TYPES_ENUM.includes(par.type.toLowerCase()) 
  }) : [];
  

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
        <div  className={`form-container ${isAdding ? 'visible' : ''}`}>
        
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
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              select
              SelectProps={{
                native: true,
              }}
              className="form-field"
            >
              {TYPES_ENUM.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </TextField>

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
            rows={filteredParcours}
            columns={columns}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};
export default Parcours;
