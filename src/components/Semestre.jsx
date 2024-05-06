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




const Semestre = () => {
  const [sems, setSems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    numero:'',
    dateDebut:'',
    dateFin:''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/formation/${id}`);
      setSems(response.data.semestre);
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
        const newSems = {
          numero: formData.numero,
          dateDebut: formData.dateDebut,
          dateFin: formData.dateFin
        };
        await axios.post(`http://localhost:3000/formation/${id}/semestre`, newSems);
      }
      setFormData({
        numero:'',
        dateDebut:'',
        dateFin:''
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating annee:', error);
    }
  };
  
  

  const handleEdit = (sem) => {
    setFormData({
      id: sem.id,
      numero:sem.numero,
      dateDebut:sem.dateDebut,
      dateFin:sem.dateFin
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annee ?")) {
          await axios.delete(`http://localhost:3000/formation/${id}/${formData.id}`);

            const nouveauxSemestres = sems.filter(sem => sem.id !== id);
            setSems(nouveauxSemestres);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du semestre:', error);
    }
};

  const columns = [
    { field: 'numero', headerName: 'Numero', width: 300 },
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
    },
      
  ];

  const filteredSems = Array.isArray(sems) ? sems.filter(sem => {
    const numero = typeof sem.numero === 'string' ? sem.numero.toLowerCase() : sem.numero.toString().toLowerCase();
    return numero.includes(searchQuery.toLowerCase()) ||
      sem.dateDebut.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sem.dateFin.toLowerCase().includes(searchQuery.toLowerCase());
  }) : [];
  

  return (
    <div className="ue-container">
      <div className="ue-header"><br />
        {/* <h3 className="ue-title">Liste des Semestre</h3> */}
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
            type="number" // Définir le type sur "number"
            value={formData.numero}
            onChange={handleChange}
            className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              label="DateDebut"
              name="dateDebut"
              type="date" // Définir le type sur "date"
              value={formData.dateDebut}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              label="DateFin"
              name="dateFin"
              type="date" // Définir le type sur "date"
              value={formData.dateFin}
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
            rows={filteredSems}
            columns={columns}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};
export default Semestre;
