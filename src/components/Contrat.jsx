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


const Contrat = () => {
  const [contrats, setContrats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cours, setCours] = useState([]);
  const [enseignant, setEnseignant] = useState([]);
  const [formData, setFormData] = useState({
    dateExcecution:'',
    dateCommencement:'',
    duree:'',
    signatureEnseignant:'',
    signatureResponsable:'',
    cours: '',
    enseignant: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
    fetchEnseignant();
    fetchCours();
  }, []);
  const getEtatContrat = (contrat) => {
    if (contrat.signatureEnseignant && contrat.signatureResponsable) {
      return "Signé par les deux";
    } else if (contrat.signatureEnseignant) {
      return "Signé par l'enseignant";
    } else if (contrat.signatureResponsable) {
      return "Signé par le responsable";
    }
    return "Non signé";
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/contrats');
      setContrats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchEnseignant = async () => {
    try {
        const response = await axios.get('http://localhost:3000/enseignants');
        setEnseignant(response.data);  // Mettre à jour l'état avec les données récupérées
    } catch (error) {
        console.error('Error fetching enseignant:', error);
    }
};

const fetchCours = async () => {
    try {
        const response = await axios.get('http://localhost:3000/cours');
        setCours(response.data);  // Mettre à jour l'état avec les données récupérées
    } catch (error) {
        console.error('Error fetching cours:', error);
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
      const newContrat = {
        dateExcecution: formData.dateExcecution,
        dateCommencement: formData.dateCommencement,
        duree: formData.duree,
        signatureEnseignant: formData.signatureEnseignant,
        signatureResponsable: formData.signatureResponsable,
        cours: formData.cours,
        enseignant: formData.enseignant,
      };
  
      if (formData.id) {
        await axios.put(`http://localhost:3000/contrats/${formData.id}`, newContrat);
      } else {
        await axios.post('http://localhost:3000/contrats', newContrat);
      }
  
      setFormData({
        id: '',
        dateExcecution: '',
        dateCommencement: '',
        duree: '',
        signatureEnseignant: '',
        signatureResponsable: '',
        cours: '', // Remise à zéro du champ cours
        enseignant: '', // Remise à zéro du champ enseignant
      });
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating contrat:', error);
    }
  };
  
  const handleEdit = (contrat) => {
    setFormData({
      id: contrat.id,
      libelle: contrat.libelle,
      dateExcecution: contrat.dateExcecution,
      dateCommencement: contrat.dateCommencement,
      duree: contrat.duree,
      signatureEnseignant: contrat.signatureEnseignant,
      signatureResponsable: contrat.signatureResponsable
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce Contrat ?")) {
        await axios.delete(`http://localhost:3000/contrats/${id}`);
        const nouveauxContrats = contrats.filter(contrat => contrat.id !== id);
        setContrats(nouveauxContrats);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du contrat:', error);
    }
  };

  const columns = [
    { field: 'dateExcecution', headerName: 'dateExcecution', width: 150 },
    { field: 'dateCommencement', headerName: 'DateCommencement', width: 150 },
    { field: 'duree', headerName: 'Duree', width: 100 },
    { field: 'signatureEnseignant', headerName: 'SignatureEnseignant', width: 150 },
    { field: 'signatureResponsable', headerName: 'SignatureResponsable', width: 150 },
    { field: 'etat', headerName: 'Etat', width: 150, renderCell: (params) => getEtatContrat(params.row) },
    {
        field: 'cours',
        headerName: 'Cours',
        width: 150,
        renderCell: (params) => (
          <TextField
            select
            value={params.row.cours ? params.row.cours : (cours && cours[0] ? cours[0].id : '')} // Sélectionnez le premier cours si le cours du contrat n'est pas défini
            style={{ width: '150px' }}
            onChange={(e) => {
              handleCoursChange(params.row.id, e.target.value);
            }}
            variant="outlined"
          >
          {cours && cours.map(c => (
            <MenuItem key={c.id} value={c.id}>
              {c.libelle} {/* Assurez-vous que c.libelle est le texte que vous souhaitez afficher dans les options */}
            </MenuItem>
          ))}
        </TextField>

        )
      },
      {
        field: 'enseignant',
        headerName: 'Enseignant',
        width: 150,
        renderCell: (params) => (
          <TextField
            select
            value={params.row.enseignant ? params.row.enseignant : enseignant && enseignant[0] ? enseignant[0].id : ''} // Sélectionnez le premier enseignant si l'enseignant du contrat n'est pas défini
            style={{ width: '150px' }}
            onChange={(e) => {
                handleEnseignantChange(params.row.id, e.target.value);
            }}
            variant="outlined"
          >
            {enseignant && enseignant.map(e => (
              <MenuItem key={e.id} value={e.id}>{e.nom}</MenuItem>
            ))}
          </TextField>
        )
      },
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
  ];

  const filteredContrats = contrats.filter(contrat => {
    const dateExcecution = contrat.dateExcecution && typeof contrat.dateExcecution === 'string' ? contrat.dateExcecution.toLowerCase() : '';
    const dateCommencement = contrat.dateCommencement && typeof contrat.dateCommencement === 'string' ? contrat.dateCommencement.toLowerCase() : ''
    const duree = contrat.duree && typeof contrat.duree === 'string' ? contrat.duree.toLowerCase() : '';
    const signatureEnseignant = contrat.signatureEnseignant && typeof contrat.signatureEnseignant === 'string' ? contrat.signatureEnseignant.toLowerCase() : '';
    const signatureResponsable = contrat.signatureResponsable && typeof contrat.signatureResponsable === 'string' ? contrat.signatureResponsable.toLowerCase() : '';

    return (
      dateExcecution.includes(searchQuery.toLowerCase()) ||
      dateCommencement.includes(searchQuery.toLowerCase()) ||
      duree.includes(searchQuery.toLowerCase()) ||
      signatureEnseignant.includes(searchQuery.toLowerCase()) ||
      signatureResponsable.includes(searchQuery.toLowerCase())
    );
  });

  const handleCoursChange = (contratId, selectedCoursId) => {
    // Mettre à jour le cours pour le contrat donné
    const updatedContrats = contrats.map(contrat => contrat.id === contratId ? { ...contrat, cours: selectedCoursId } : contrat);
    setContrats(updatedContrats);
  };

  const handleEnseignantChange = (contratId, selectedEnseignantId) => {
    const updatedContrats = contrats.map(contrat => contrat.id === contratId ? { ...contrat, enseignant: selectedEnseignantId } : contrat);
    setContrats(updatedContrats);
  };

  return (
    <div className="ue-container">
      <div className="ue-header">
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
  label="DateExcecution"
  type="date"
  name="dateExcecution"
  value={formData.dateExcecution}
  onChange={handleChange}
  className="form-field"
/><br/><br/>
<TextField
  fullWidth
  label="DateCommencement"
  type="date"
  name="dateCommencement"
  value={formData.dateCommencement}
  onChange={handleChange}
  className="form-field"
/><br/><br/>
<TextField
  fullWidth
  label="Duree"
  name="duree"
  type='number'
  value={formData.duree}
  onChange={handleChange}
  className="form-field"
/><br/><br/>
<TextField
  fullWidth
  label="Signature de l'enseignant"
  name="signatureEnseignant"
  type="date" // Utilisation du type "date"
  value={formData.signatureEnseignant}
  onChange={handleChange}
  className="form-field"
  InputLabelProps={{
    shrink: true, // Pour éviter que le label ne reste en haut lorsqu'une date est sélectionnée
  }}
/><br/><br/>

<TextField
  fullWidth
  label="Signature du responsable"
  name="signatureResponsable"
  type="date" // Utilisation du type "date"
  value={formData.signatureResponsable}
  onChange={handleChange}
  className="form-field"
  InputLabelProps={{
    shrink: true, // Pour éviter que le label ne reste en haut lorsqu'une date est sélectionnée
  }}
/><br/><br/>


      {/* Ajouter le champs pour sélectionner le cours */}
      <TextField
        select
        label="Cours"
        name="cours"
        value={formData.cours}
        onChange={handleChange}
        className="form-field"
      >
        {cours && cours.map(c => (
          <MenuItem key={c.id} value={c.id}>
            {c.libelle}
          </MenuItem>
        ))}
      </TextField><br/><br/>
      {/* Ajouter le champs pour sélectionner l'enseignant */}
      <TextField
        select
        label="Enseignant"
        name="enseignant"
        value={formData.enseignant}
        onChange={handleChange}
        className="form-field"
      >
        {enseignant && enseignant.map(e => (
          <MenuItem key={e.id} value={e.id}>{e.nom} {e.prenom}</MenuItem>
        ))}
      </TextField><br/><br/>
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
)}
        {/* {enseignant && <Typography>{`Enseignant concerné : ${enseignant.nom}`}</Typography>}
        {cours && <Typography>{`Cours concerné : ${cours.titre}`}</Typography>} */}
        {loading ? (
          <Typography variant="h3" className="loading-text">Loading...</Typography>
        ) : (
          <div className="data-grid-container">
            <DataGrid
              rows={filteredContrats}
              columns={columns}
              className="data-grid"
            />
          </div>
        )}
      </div>
    );
  };
  export default Contrat;