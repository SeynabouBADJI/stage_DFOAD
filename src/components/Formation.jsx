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
import { MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import '../styles/UE.css';



const Formation = () => {
  const [forms, setForms] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [niveaux, setNiveaux] = useState([]);
const [parcours, setParcours] = useState([]);
const [semestres, setSemestres] = useState([]);


  const [formData, setFormData] = useState({
    id:'',
    code:'',
    grade:'',
    libelle:'',
    mention:'',
    specialite:'',
    estValide:'',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Récupérer toutes les formations
      const formsResponse = await axios.get(`http://localhost:3000/formation`);
      setForms(formsResponse.data);
  
      // Récupérer les données de niveau, de semestre et de parcours pour chaque formation
      const formsData = formsResponse.data;
  
      const niveauxData = formsData.map(async (formation) => {
        if (formation.niveau && formation.niveau.id) {
          const niveauResponse = await axios.get(`http://localhost:3000/niveaux/${formation.niveau.id}`);
          return niveauResponse.data;
        } else {
          return null;
        }
      });
      setNiveaux(await Promise.all(niveauxData));
  
      const parcoursData = formsData.map(async (formation) => {
        if (formation.parcours && formation.parcours.id) {
          const parcoursResponse = await axios.get(`http://localhost:3000/parcours/${formation.parcours.id}`);
          return parcoursResponse.data;
        } else {
          return null;
        }
      });
      setParcours(await Promise.all(parcoursData));
  
      const semestresData = formsData.map(async (formation) => {
        if (formation.semestre && formation.semestre.id) {
          const semestreResponse = await axios.get(`http://localhost:3000/semestres/${formation.semestre.id}`);
          return semestreResponse.data;
        } else {
          return null;
        }
      });
      setSemestres(await Promise.all(semestresData));
  
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

  const handleNiveauChange = (event) => {
    setFormData({ ...formData, niveau: event.target.value });
  };
  
  const handleParcoursChange = (event) => {
    setFormData({ ...formData, parcours: event.target.value });
  };
  
  const handleSemestreChange = (event) => {
    setFormData({ ...formData, semestre: event.target.value });
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://localhost:3000/formation/${formData.id}`, formData);
      } else {
        const newForm = {
          code: formData.code,
          grade: formData.grade,
          libelle: formData.libelle,
          mention: formData.mention,
          specialite: formData.specialite,
          estValide: formData.estValide,
          niveau: formData.niveau,
          parcours: formData.parcours,
          semestre: formData.semestre
        };
        await axios.post(`http://localhost:3000/formation`, newForm);
      }
  
      // Réinitialiser le formulaire après la soumission
      setFormData({
        code: '',
        grade: '',
        libelle: '',
        mention: '',
        specialite: '',
        estValide: '',
        niveau: '', // Réinitialiser le niveau
        parcours: '', // Réinitialiser le parcours
        semestre: '' // Réinitialiser le semestre
      });
  
      fetchData();
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding/updating EC:', error);
    }
  };
  

  const handleEdit = (fo) => {
    setFormData({
      code: '',
      grade: '',
      libelle: '',
      mention: '',
      specialite: '',
      estValide: '',
    });
  
    setFormData({
      id: fo.id,
      code: fo.code,
      grade: fo.grade,
      libelle: fo.libelle,
      mention: fo.mention,
      specialite: fo.specialite,
      estValide: fo.estValide,
    });
  
    // Activer le mode d'édition du formulaire
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette Formation ?")) {
            await axios.delete(`http://localhost:3000/formation/${id}`);

            const nouveauxFormations = forms.filter(fo => fo.id !== id);
            setForms(nouveauxFormations);
            
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'EC:', error);
    }
};

  const columns = [
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'grade', headerName: 'Grade', width: 150 },
    { field: 'libelle', headerName: 'Libellé', width: 150 },
    { field: 'mention', headerName: 'Mention', width: 100 },
    { field: 'specialite', headerName: 'Specialite', width: 150 },
    { field: 'estValide', headerName: 'EstValide', width: 100 },
    {
      field: 'Niveau',
      headerName: 'Niveau',
      width: 100,
      renderCell: (params) => (
        <Link to={{ pathname: `/formation/${params.row.id}/niveau`, state: { forms: params.row } }}>
            <Button variant="contained" startIcon={<VisibilityIcon />}>
            </Button>
        </Link>
    )
    },
    {
      field: 'Semestre',
      headerName: 'Semestre',
      width: 100,
      renderCell: (params) => (
        params.row ? (
          <Link to={{ pathname: `/formation/${params.row.id}/semestre`, state: { forms: params.row } }}>
            <Button variant="contained" startIcon={<VisibilityIcon />}></Button>
          </Link>
        ) : null
      )
    },
    {
      field: 'Parcours',
      headerName: 'Parcours',
      width: 100,
      renderCell: (params) => (
        params.row ? (
          <Link to={{ pathname: `/formation/${params.row.id}/parcours`, state: { forms: params.row } }}>
            <Button variant="contained" startIcon={<VisibilityIcon />}></Button>
          </Link>
        ) : null
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
}

 
    
      
  ];

 
  const filteredFormation = forms?.filter(fo => {
    return fo.libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fo.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fo.grade.toLowerCase().includes(searchQuery.toLowerCase());
  });

  
  return (
    <div className="ec-container">
      <div className="ec-header"><br />
        {/* <h3 className="ec-title">Liste des formations</h3> */}
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
              label="Grade"
              name="grade"
              value={formData.grade}
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
              label="Mention"
              name="mention"
              value={formData.mention}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>

            <TextField
              fullWidth
              label="Specialite"
              name="specialite"
              value={formData.specialite}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>

            <TextField
              fullWidth
              label="EstValide"
              name="estValide"
              value={formData.estValide}
              onChange={handleChange}
              className="form-field"
            /><br/><br/>
           <TextField
  select
  label="Niveau"
  value={formData.niveau}
  onChange={handleNiveauChange}
>
{niveaux.map((niveau) => (
  <MenuItem key={niveau?.id} value={niveau?.id}>
    {niveau && niveau.id ? (
      niveau.numero // Afficher le nom du niveau si niveau et niveau.id sont définis
    ) : (
      'N/A' // Sinon, afficher 'N/A'
    )}
  </MenuItem>
))}
</TextField><br/><br/>

<TextField
  select
  label="Parcours"
  value={formData.parcours}
  onChange={handleParcoursChange}
>
{parcours.map((parcours) => (
  <MenuItem key={parcours?.id} value={parcours?.id}>
    {parcours?.nom}
  </MenuItem>
))}
</TextField><br/><br/>

<TextField
  select
  label="Semestre"
  value={formData.semestre}
  onChange={handleSemestreChange}
>
{semestres.map((semestre) => (
  <MenuItem key={semestre?.id} value={semestre?.id}>
    {semestre?.nom}
  </MenuItem>
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
      )}<br/>

      {loading ? (
        <Typography variant="h3" className="loading-text">Loading...</Typography>
      ) : (
        <div className="data-grid-container">
          <DataGrid
            rows={filteredFormation}
            columns={columns}
            className="data-grid"
          />
        </div>
      )}
    </div>
  );
};
export default Formation;
