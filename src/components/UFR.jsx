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



const UFR = () => {
  const [ufrs, setUfrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id:'',
    libelle:'',
    abreviation:'',
    email:'',
    type:'',
    dateCreation:'',
    arreteCreation:''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/ufr');
      setUfrs(response.data);
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
        await axios.put(`http://localhost:3000/ufr/${formData.id}`, formData);
      } else {
        const newufr = {
          libelle: formData.libelle,
          id:formData.id,
          libelle:formData.libelle, 
          abreviation:formData.abreviation,
          email:formData.email,
          type:formData.type,
          dateCreation:formData.dateCreation,
          arreteCreation:formData.arreteCreation
        };
        await axios.post('http://localhost:3000/ufr', newufr);
      }
      setFormData({
        id:'',
        libelle:'',
        abreviation:'',
        email:'',
        type:'',
        dateCreation:'',
        arreteCreation:''
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating UE:', error);
    }
  };
  
  

  const handleEdit = (ufr) => {
    setFormData({
      id: ufr.id,
      libelle:ufr.libelle,
      abreviation:ufr.abreviation,
      email:ufr.email,
      type:ufr.type,
      dateCreation:ufr.dateCreation,
      arreteCreation:ufr.arreteCreation
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette ufr ?")) {
            await axios.delete(`http://localhost:3000/ufr/${id}`);

            const nouveauxUFR = ufrs.filter(ufr => ufr.id !== id);
            setUfrs(nouveauxUFR);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'UE:', error);
    }
};

  const columns = [
    { field: 'libelle', headerName: 'Libellé', width: 150 },
    { field: 'abreviation', headerName: 'Abréviation', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'dateCreation', headerName: 'Date de Création', width: 150 },
    { field: 'arreteCreation', headerName: 'Arrêté de Création', width: 150 },
    {
      field: 'edit',
      headerName: 'Modifier',
      width: 100,
      renderCell: (params) => (
        <EditIcon className="edit-icon" onClick={() => handleEdit(params.row)} />
      )
    },
    {
      field: 'delete',
      headerName: 'Supprimer',
      width: 100,
      renderCell: (params) => (
        <DeleteIcon className="delete-icon" onClick={() => handleDelete(params.row.id)} />
      )
    },
    {
        field: 'departement',
        headerName: 'Departement',
        width: 100,
        renderCell: (params) => (
            <Link to={{ pathname: `/ufr/${params.row.id}/departement`, state: { ufrs: params.row } }}>
                <Button variant="contained" startIcon={<VisibilityIcon />}>
                    
                </Button>
            </Link>
        )
    }
    
      
  ];

  const filteredUFr = ufrs.filter(ufr => {
    return ufr.libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ufr.abreviation.toLowerCase().includes(searchQuery.toLowerCase()) 
  });

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
              label="Abreviation"
              name="abreviation"
              value={formData.abreviation}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
             <TextField
              fullWidth
              label="Type"
              name="type"
              value={formData.type}
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
              label="ArreteCreation"
              name="arreateCreation"
              value={formData.arreteCreation}
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
            rows={filteredUFr}
            columns={columns}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};
export default UFR;
