import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './stat.css';

Chart.register(...registerables);

const CoursStatsPage = () => {
  const [contrats, setContrats] = useState([]);
  const [cours, setCours] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEnseignants, setTotalEnseignants] = useState(0);
  const [coursAvecContrat, setCoursAvecContrat] = useState(0);
  const [statutsEnseignants, setStatutsEnseignants] = useState({});
  const [chart, setChart] = useState(null);
  const [contratsEvolutionData, setContratsEvolutionData] = useState({}); // Ajout de l'état pour les données de l'évolution des contrats

  useEffect(() => {
    fetchData();
    return () => {
      if (chart) {
        chart.destroy(); // Destruction du graphique avant de démonter le composant
      }
    };
  }, []);

  const fetchData = async () => {
    try {
      // Fetching contracts, courses, and teachers data
      const [contractsResponse, coursesResponse, teachersResponse] = await Promise.all([
        axios.get('http://localhost:3000/contrats'),
        axios.get('http://localhost:3000/cours'),
        axios.get('http://localhost:3000/enseignants')
      ]);
  
      const contractsData = contractsResponse.data;
      const coursesData = coursesResponse.data;
  
      setContrats(contractsData);
      setCours(coursesData);
      setEnseignants(teachersResponse.data);
  
      // Calculate total number of teachers
      setTotalEnseignants(teachersResponse.data.length);
  
      // Calculate number of courses with contracts
      const coursesWithContracts = coursesData.filter(course => {
        return contractsData.some(contract => contract.cours === course.id);
      });
      setCoursAvecContrat(coursesWithContracts.length);
  
      // Calculate teacher status statistics
      calculateStatutsEnseignants(teachersResponse.data);
  
      // Calculate contract evolution data
      calculateContratsEvolutionData(contractsData);
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  

  const calculateStatutsEnseignants = (data) => {
    const statutCounts = data.reduce((acc, enseignant) => {
      acc[enseignant.type] = (acc[enseignant.type] || 0) + 1;
      return acc;
    }, {});

    setStatutsEnseignants(statutCounts);
  };

  const calculateContratsEvolutionData = (contrats) => {
    const contratsParAnnee = {};
  
    contrats.forEach((contrat) => {
      const anneeDebut = new Date(contrat.dateCommencement).getFullYear();
  
      if (!contratsParAnnee[anneeDebut]) {
        contratsParAnnee[anneeDebut] = 1;
      } else {
        contratsParAnnee[anneeDebut]++;
      }
    });
  
    const labels = Object.keys(contratsParAnnee);
    const data = Object.values(contratsParAnnee);

    setContratsEvolutionData({ labels: labels, datasets: [{ label: 'Évolution du nombre de contrats', backgroundColor: 'rgba(75, 192, 192, 0.6)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1, data: data }] });
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'category',
      },
    },
  };

  return (
    <div className="cours-stats-container"> {/* Ajout d'une classe pour le conteneur principal */}
      <h1>Statistiques des Cours</h1>
      <p>Nombre total d'enseignants : {totalEnseignants}</p>
      <p>Nombre de cours concernés par un contrat : {coursAvecContrat}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="statuts-enseignants-container" style={{textAlign:"right"}}> {/* Ajout d'une classe pour le conteneur des statistiques */}
            <h2>Répartition des enseignants par statut</h2>
            <ul>
              {Object.entries(statutsEnseignants).map(([statut, count]) => (
                <li key={statut}>
                  {statut}: {count} ({((count / totalEnseignants) * 100).toFixed(2)}%)
                </li>
              ))}
            </ul>
          </div>
          <div className="chart-container"> {/* Ajout d'une classe pour le conteneur du graphique */}
            <Bar data={contratsEvolutionData} options={options} ref={(ref) => setChart(ref)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursStatsPage;
