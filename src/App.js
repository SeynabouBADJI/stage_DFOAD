import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import theme from './theme';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Footer from './Footer';
import APropos from './APropos';
import Cours from './components/Cours';
import EC from './components/EC';
import Enseignant from './components/Enseignant';
import UE from './components/UE';
import Contrat from './components/Contrat';
import AnneeScolaire from './components/AnneeScolaire';
import Semestre from './components/Semestre';
import Formation from './components/Formation';
import Niveau from './components/Niveau';
import Parcours from './components/Parcours';
import ResponsableDFOAD from './components/ResponsableDFOAD';
import Superviseur from './components/Superviseur';
import UFR from './components/UFR';
import CoursStats from './CoursStats';
import Departement from './components/Departement';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header />
          <Sidebar>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/apropos" component={APropos} />
              <Route path="/cours" exact component={Cours} />
              <Route path="/ufr" exact component={UFR} />
              <Route path="/ufr/:id/departement" exact component={Departement} />
              <Route path="/cours/:id/ecs" component={EC} /> 
              <Route path="/cours/:id/ues" exact component={UE} />
              <Route path="/enseignants" exact component={Enseignant} />
              <Route path="/contrat" exact component={Contrat} />
              <Route path="/annee" exact component={AnneeScolaire} />
              <Route path="/formation/:id/semestre" exact component={Semestre} />  
              <Route path="/formation/:id/parcours" exact component={Parcours} />  
              <Route path="/responsable" exact component={ResponsableDFOAD} />  
              <Route path="/formation/:id/niveau" exact component={Niveau} />  
              <Route path="/superviseur" exact component={Superviseur} />  
              <Route path="/statics" exact component={CoursStats} />  
              <Route path="/formation" component={Formation} /> 




            </Switch>
          </Sidebar>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
