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




const UE = () => {
  const [ues, setUes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: '',
    libelle: '',
    code: '',
    base: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cours/${id}`);
      setUes(response.data.ues);
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
        await axios.put(`http://localhost:3000/cours/${id}/${formData.id}`, formData);
      } else {
        const newUE = {
          libelle: formData.libelle,
          code: formData.code,
          base: formData.base
        };
        await axios.post(`http://localhost:3000/cours/${id}/ues`, newUE);

      }
      setFormData({
        id: '',
        libelle: '',
        code: '',
        base: ''
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating UE:', error);
    }
  };
  
  

  const handleEdit = (ue) => {
    setFormData({
      id: ue.id,
      libelle: ue.libelle,
      code: ue.code,
      base: ue.base
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette UE ?")) {
            await axios.delete(`http://localhost:3000/cours/${id}/${formData.id}`);

            const nouveauxUes = ues.filter(ue => ue.id !== id);
            setUes(nouveauxUes);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'UE:', error);
    }
};

  const columns = [
    { field: 'libelle', headerName: 'Libellé', width: 300 },
    { field: 'code', headerName: 'Code', width: 200 },
    { field: 'base', headerName: 'Base', width: 200 },
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

  const filteredUes = ues && Array.isArray(ues) ? ues.filter(ue => {
    const libelleMatch = ue.libelle.toLowerCase().includes(searchQuery.toLowerCase());
    const codeMatch = ue.code.toLowerCase().includes(searchQuery.toLowerCase());
    const baseMatch = typeof ue.base === 'string' && ue.base.toLowerCase().includes(searchQuery.toLowerCase());
  
    return libelleMatch || codeMatch || baseMatch;
  }) : [];
  

  return (
    <div className="ue-container">
      <div className="ue-header"><br />
        {/* <h3 className="ue-title">Liste des UE</h3> */}
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
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              label="Base"
              name="base"
              type="number"
              value={formData.base}
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
            rows={filteredUes}
            columns={columns}
            getRowId={(row) => row.libelle + '-' + row.code}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};
export default UE;
