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



const Superviseur = () => {
  const [sups, setSups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id:'',
    nom:'',
    dateCreation:'',
    dateModification:'',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/superviseur');
      setSups(response.data);
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
        await axios.put(`http://localhost:3000/superviseur/${formData.id}`, formData);
      } else {
        const newSuperviseur = {
            nom:formData.nom,
          dateCreation:formData.dateCreation,
          dateModification:formData.dateModification,        };
        await axios.post('http://localhost:3000/superviseur', newSuperviseur);
      }
      setFormData({
        nom:'',
        dateCreation:'',
        dateModification:'',
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating cours:', error);
    }
  };
  
  

  const handleEdit = (sup) => {
    setFormData({
      id: sup.id,
      nom:sup.nom,
      dateCreation:sup.dateCreation,
      dateModification:sup.dateModification,
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce superviseur ?")) {
            await axios.delete(`http://localhost:3000/superviseur/${id}`);

            const nouveauxSuperviseur = sups.filter(sup => sup.id !== id);
            setSups(nouveauxSuperviseur);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'UE:', error);
    }
};

  const columns = [
    { field: 'nom', headerName: 'Nom', width: 300 },
    { field: 'dateCreation', headerName: 'DateCreation', width: 300 },
    { field: 'dateModification', headerName: 'DateModification', width: 200 },
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
    // {
    //     field: 'details',
    //     headerName: 'Détails',
    //     width: 200,
    //     renderCell: (params) => (
    //         <Link to={{ pathname: `/annee/${params.row.id}/formation`, state: { ans: params.row } }}>
    //             <Button variant="contained" startIcon={<VisibilityIcon />}>
    //                 Détails
    //             </Button>
    //         </Link>
    //     )
    // }
    
      
  ];

  const filteredSuperviseurs = sups.filter(sup => {
    // Convertir en minuscules uniquement si le champ est une chaîne de caractères
    const dateCreation = typeof sup.dateCreation === 'string' ? sup.dateCreation.toLowerCase() : sup.dateCreation;
    const dateModification = typeof sup.dateModification === 'string' ? sup.dateModification.toLowerCase() : sup.dateModification;
    const nom = typeof sup.nom === 'string' ? sup.nom.toLowerCase() : sup.nom;

   
    // Maintenant, vous pouvez rechercher dans les champs convertis en minuscules
    return (dateCreation && dateCreation.includes(searchQuery.toLowerCase())) ||
      (dateModification && dateModification.includes(searchQuery.toLowerCase())) ||
      (nom && nom.includes(searchQuery.toLowerCase())) 

      
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
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              label="DateCreation"
              name="dateCreation"
              value={formData.dateCreation}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              label="DateModification"
              name="dateModification"
              value={formData.dateModification}
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
            rows={filteredSuperviseurs}
            columns={columns}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};
export default Superviseur;
