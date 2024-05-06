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
import { MenuItem } from '@mui/material';

const Enseignant = () => {
  const [enseignants, setEnseignants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    type: 'titulaire',
    estFonctionnaire: false,
    statut: 'Actif',
    periode: '',
    poste: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/enseignants');
      setEnseignants(response.data);
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
        await axios.put(`http://localhost:3000/enseignants/${formData.id}`, formData);
      } else {
        const newEnseignant = {
          matricule: formData.matricule,
          nom: formData.nom,
          prenom: formData.prenom,
          type: formData.type,
          estFonctionnaire: formData.estFonctionnaire,
          statut: formData.statut,
          periode: formData.periode,
          poste: formData.poste
        };
        await axios.post('http://localhost:3000/enseignants', newEnseignant);
      }
      setFormData({
        matricule: '',
        nom: '',
        prenom: '',
        type: 'titulaire',
        estFonctionnaire: false,
        statut: 'Actif',
        periode: '',
        poste: ''
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating enseignants:', error);
    }
  };

  const handleEdit = (enseignant) => {
    setFormData({
      id: enseignant.id,
      matricule: enseignant.matricule,
      nom: enseignant.nom,
      prenom: enseignant.prenom,
      type: enseignant.type,
      estFonctionnaire: enseignant.estFonctionnaire,
      statut: enseignant.statut,
      periode: enseignant.periode,
      poste: enseignant.poste
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?")) {
        await axios.delete(`http://localhost:3000/enseignants/${id}`);
        const nouveauxEnseignants = enseignants.filter(enseignant => enseignant.id !== id);
        setEnseignants(nouveauxEnseignants);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'Enseignant:', error);
    }
  };

  const columns = [
    { field: 'matricule', headerName: 'Matricule', width: 100 },
    { field: 'nom', headerName: 'Nom', width: 150 },
    { field: 'prenom', headerName: 'Prénom', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'estFonctionnaire', headerName: 'Fonctionnaire', width: 100 },
    { field: 'statut', headerName: 'Statut', width: 150 },
    { field: 'periode', headerName: 'Période', width: 150 },
    { field: 'poste', headerName: 'Poste', width: 150 },
    {
      field: 'edit',
      headerName: 'Modifier',
      width: 80,
      renderCell: (params) => (
        <EditIcon className="edit-icon" onClick={() => handleEdit(params.row)} />
      )
    },
    {
      field: 'delete',
      headerName: 'Supprimer',
      width: 80,
      renderCell: (params) => (
        <DeleteIcon className="delete-icon" onClick={() => handleDelete(params.row.id)} />
      )
    }
  ];

  const filteredEnseignants = enseignants.filter(enseignant => {
    return (
      enseignant.matricule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enseignant.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enseignant.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enseignant.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (enseignant.estFonctionnaire ? 'oui' : 'non').includes(searchQuery.toLowerCase()) ||
      enseignant.statut.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enseignant.periode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enseignant.poste.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="enseignant-container">
      <div className="enseignant-header"><br />
        {/* <h3 className="enseignant-title">Liste des Enseignants</h3> */}
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
              label="Matricule"
              name="matricule"
              value={formData.matricule}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
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
              label="Prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-field"
              error={formData.type !== "vacataire" && formData.type !== "titulaire"}
              helperText={
                formData.type !== "vacataire" && formData.type !== "titulaire"
                  ? "Le type doit être soit 'Vacataire' ou 'Titulaire'"
                  : ""
              }
            >
              <MenuItem key="vacataire" value="vacataire">Vacataire</MenuItem>
              <MenuItem key="titulaire" value="titulaire">Titulaire</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Fonctionnaire"
              name="estFonctionnaire"
              type="checkbox"
              checked={formData.estFonctionnaire}
              onChange={(e) => setFormData({ ...formData, estFonctionnaire: e.target.checked })}
              className="form-field"
            /><br/><br/>
            <TextField
              fullWidth
              label="Statut"
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
            <TextField
            fullWidth
            label="Période"
            name="periode"
            type="date"
            value={formData.periode}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            className="form-field"
          /><br/><br/>

            <TextField
              fullWidth
              label="Poste"
              name="poste"
              value={formData.poste}
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
            rows={filteredEnseignants}
            columns={columns}
            getRowId={(row) => row.matricule + '-' + row.nom}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};

export default Enseignant;
