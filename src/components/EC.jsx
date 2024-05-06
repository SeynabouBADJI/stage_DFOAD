import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import '../styles/UE.css';



const EC = () => {
  const [ecs, setEcs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    code: '',
    libelle: '',
    estObligatoire: false,
    coefficient: 0,
    base: 0.0,
    formuleCalcul: '',
    champinconnuMaquette: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recherche, setRecherche] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cours/${id}`);
      setEcs(response.data.ecs);
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
        const newEC = {
          code: formData.code,
          libelle: formData.libelle,
          estObligatoire: formData.estObligatoire,
          coefficient: formData.coefficient,
          base: formData.base,
          formuleCalcul: formData.formuleCalcul,
          champinconnuMaquette: formData.champinconnuMaquette
        };
        // Utiliser l'URL correcte pour l'ajout d'un nouvel EC
        await axios.post(`http://localhost:3000/cours/${id}/ecs`, newEC);
      }
      setFormData({
        code: '',
        libelle: '',
        estObligatoire: false,
        coefficient: 0,
        base: 0.0,
        formuleCalcul: '',
        champinconnuMaquette: ''
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating EC:', error);
    }
  };
  
  

  const handleEdit = (ec) => {
    setFormData({
        code: ec.code,
        libelle: ec.libelle,
        estObligatoire: ec.estObligatoire,
        coefficient: ec.coefficient,
        base: ec.base,
        formuleCalcul: ec.formuleCalcul,
        champinconnuMaquette: ec.champinconnuMaquette
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette EC ?")) {
            await axios.delete(`http://localhost:3000/cours/${id}${formData.id}`);

            const nouveauxEcs = ecs.filter(ec => ec.id !== id);
            setEcs(nouveauxEcs);
            
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'EC:', error);
    }
};

  const columns = [
    { field: 'libelle', headerName: 'Libellé', width: 150 },
    { field: 'code', headerName: 'Code', width: 150 },
    { field: 'estObligatoire', headerName: 'Obligatoire', width: 150 },
    { field: 'coefficient', headerName: 'Coefficient', width: 150 },
    { field: 'base', headerName: 'Base', width: 150 },
    { field: 'formuleCalcul', headerName: 'Formule de Calcul', width: 150 },
    { field: 'champinconnuMaquette', headerName: 'Champ Inconnu de la Maquette', width: 250 },
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
  const filteredEcs = ecs.filter(ec =>
    ec.libelle.toLowerCase().includes(recherche.toLowerCase()) ||
    ec.code.toLowerCase().includes(recherche.toLowerCase()) ||
    ec.coefficient.toString().includes(recherche.toLowerCase()) || // Recherche par coefficient
    ec.base.toString().includes(recherche.toLowerCase()) // Recherche par base
  );
  

  
  return (
    <div className="ec-container">
      <div className="ec-header">
        <h3 className="ec-title">Liste des EC</h3>
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
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
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
              label="EstObligatoire"
              name="estObligatoire"
              value={formData.estObligatoire}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>

              <TextField
                fullWidth
                label="Coefficient"
                name="coefficient"
                type="number" // Définir le type comme "number" pour permettre uniquement les nombres
                value={formData.coefficient}
                onChange={handleChange}
                inputProps={{ min: 0 }} // Définir une valeur minimale pour le coefficient
                className="form-field"
              /><br/><br/>

              <TextField
                fullWidth
                label="Base"
                name="base"
                type="number" // Définir le type comme "number" pour permettre uniquement les nombres
                value={formData.base}
                onChange={handleChange}
                inputProps={{ step: 0.01, min: 0 }} // Définir une valeur minimale et une étape pour la base
                className="form-field"
              /><br/><br/>


            <TextField
              fullWidth
              label="FormuleCalcul"
              name="formuleCalcul"
              value={formData.formuleCalcul}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>

            <TextField
              fullWidth
              label="ChampinconnuMaquette"
              name="champinconnuMaquette"
              value={formData.champinconnuMaquette}
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
            rows={filteredEcs}
            columns={columns}
            getRowId={(row) => row.code + '-' + row.libelle}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};
export default EC;
