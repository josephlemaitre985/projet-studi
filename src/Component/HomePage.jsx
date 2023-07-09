import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import "./HomePage.css";
import Menu from './Menu';
import Footer from './Footer'; 

const HomePage = ({ handleLogin }) => {
  return (

    <Box className='background-logonav' sx={{ p: 4 }}>
      <img src='https://i0.wp.com/my-barn.com/wp-content/uploads/2023/05/logo-garage-1.png?resize=1200%2C720&ssl=1' alt="Logo du garage" className="logo-homepage" />
      <Link to="/login">
        <Button variant="contained" className="connectbutton" onClick={handleLogin}>
          Se connecter
        </Button>
      </Link>
      <Menu className='menu' />
      <div className='header'>
        <img className='imghomepage' src='https://www.routebleueautomobile.fr/upload-articles/suivi-des-methodes-peugeot-route-bleue-automobile-pornic.jpeg'></img>
        <div className='text-overlay'>
          <h1>Garage Vincent Parrot</h1>
          <div>
          <p>Réparation Carosserie et Mécanique</p>
          <p>Entretient de votre véhicule</p>
          <p>Vente de voitures d'occasions</p>
          </div>
        </div>
      </div>




      <Box className="presentation" sx={{ mt: 4 }}>
        <Typography variant="h2" gutterBottom>
          Présentation de l'entreprise
        </Typography>
        <Typography variant="body1" gutterBottom>
          Vincent Parrot, expert en réparation automobile, a fondé son propre garage à Toulouse en 2021. Fort de ses 15 années d'expérience, Vincent est passionné par l'industrie automobile et met tout en œuvre pour offrir un service de qualité à ses clients.
          Au Garage V. Parrot, nous proposons une large gamme de services pour répondre à tous les besoins de nos clients. Nous effectuons la réparation de carrosserie et de mécanique, ainsi que l'entretien régulier des véhicules afin de garantir leur performance et leur sécurité.
          Nous sommes également spécialisés dans la vente de véhicules d'occasion de qualité, soigneusement sélectionnés et vérifiés par notre équipe d'experts.
          Chez nous, votre voiture est entre de bonnes mains. Nous sommes fiers de notre réputation de confiance et de notre engagement à fournir un service professionnel et fiable.       </Typography>
        <Typography variant="h2" gutterBottom>
          Nos services
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Réparation Carosserie et Mécanique" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Entretient de votre véhicule" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Vente de voitures d'occasions" />
          </ListItem>
          {/* Ajoutez d'autres services */}
        </List>
      </Box>

<Footer/>


    </Box>
  );
};

export default HomePage;
