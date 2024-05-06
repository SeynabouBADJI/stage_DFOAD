import React, { useState } from 'react';
import { Box, Slide, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './Dashboard.css';

const CustomListItem = styled(ListItem)(({ theme }) => ({
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#f4f4f4',
    color: '#28a745',
  },
  backgroundColor: '#ffffff',
  color: '#3e3e3e',
  marginBottom: '8px',
  borderRadius: '4px',
  paddingTop: '4px',
  paddingBottom: '4px',
}));

function Dashboard() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleDashboardClick = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <Box className="dashboard-container">
      <Box p={0.1} bgcolor="#ffffff" borderRadius={4} boxShadow={3} textAlign="center" color="black" sx={{ width: '200px', flexDirection: 'column' }}>
        <IconButton onClick={handleDashboardClick} color="red" sx={{ mb: 2 }}>
          <DashboardIcon /> Dashboard
        </IconButton>
        <Slide direction="right" in={showDashboard} mountOnEnter unmountOnExit>
          <List component="nav" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/enseignants" className="link" style={{ textDecoration: 'none' }}>
              <CustomListItem button>
                <PersonIcon />
                <ListItemText primary="Enseignants" />
              </CustomListItem>
            </Link>

            <Link to="/cours" className="link" style={{ textDecoration: 'none' }}>
              <CustomListItem button>
                <MenuBookIcon />
                <ListItemText primary="Cours" />
              </CustomListItem>
            </Link>

            <Link to="/contrat" className="link" style={{ textDecoration: 'none' }}>
              <CustomListItem button>
                <DescriptionIcon />
                <ListItemText primary="Contrat" />
              </CustomListItem>
            </Link>
          </List>
        </Slide>
      </Box>
    </Box>
  );
}

export default Dashboard;