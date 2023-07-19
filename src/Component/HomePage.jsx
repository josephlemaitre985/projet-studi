import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import "./HomePage.css";
import Menu from './Menu';
import Footer from './Footer'; 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const HomePage = ({ handleLogin, isLoggedIn, handleLogout }) => {

  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      review: 'Excellent service, rapide et professionnel. Je recommande vivement le Garage Vincent Parrot !',
    },
    {
      id: 2,
      name: 'Jane Smith',
      review: 'J\'ai eu une expérience fantastique avec le Garage Vincent Parrot. Leur équipe est compétente et sympathique.',
    },
    // Ajoute d'autres avis
  ];

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        Previous
      </div>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        Next
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Box className='background-logonav' sx={{ p: 4 }}>
      <img src='https://i0.wp.com/my-barn.com/wp-content/uploads/2023/05/logo-garage-1.png?resize=1200%2C720&ssl=1' alt="Logo du garage" className="logo-homepage" />
      {isLoggedIn ? (
        <>
          <Button variant="contained" className="admin-button" component={Link} to="/admin">
            Admin
          </Button>
          <Button variant="contained" className="connectbutton" onClick={handleLogout}>
            Se déconnecter
          </Button>
        </>
      ) : (
        <Link to="/login">
          <Button variant="contained" className="connectbutton" onClick={handleLogin}>
            Se connecter
          </Button>
        </Link>
      )}
      <Menu className='menu' />
      <div className='header'>
        <div className='imghomepage'>
          <img src='https://www.routebleueautomobile.fr/upload-articles/suivi-des-methodes-peugeot-route-bleue-automobile-pornic.jpeg' alt="Image de la page d'accueil" ></img>
          <div className='text-overlay'>
            <h1>Garage Vincent Parrot</h1>
            <div>
              <p>Réparation Carosserie et Mécanique</p>
              <p>Entretient de votre véhicule</p>
              <p>Vente de voitures d'occasions</p>
            </div>
          </div>
        </div>
      </div>

      <Box className="presentation" sx={{ mt: 4 }}>
        <Typography variant="h2" gutterBottom>
          Présentation de l'entreprise
        </Typography>
        <Typography variant="body1" gutterBottom className='text-presentation'>
          Vincent Parrot, expert en réparation automobile, a fondé son propre garage à Toulouse en 2021. Fort de ses 15 années d'expérience, Vincent est passionné par l'industrie automobile et met tout en œuvre pour offrir un service de qualité à ses clients.
          Au Garage V. Parrot, nous proposons une large gamme de services pour répondre à tous les besoins de nos clients. Nous effectuons la réparation de carrosserie et de mécanique, ainsi que l'entretien régulier des véhicules afin de garantir leur performance et leur sécurité.
          Nous sommes également spécialisés dans la vente de véhicules d'occasion de qualité, soigneusement sélectionnés et vérifiés par notre équipe d'experts.
          Chez nous, votre voiture est entre de bonnes mains. Nous sommes fiers de notre réputation de confiance et de notre engagement à fournir un service professionnel et fiable.
        </Typography>
        <Typography variant="h2" gutterBottom>
          Nos services
        </Typography>
        <Slider {...settings}>
          <div className="service-slide">
            <img src="https://www.carflex.fr/data/news/img/137-1-zoom.png" alt="Image Carrosserie" />
            <div className="slide-content">
              <h3>Réparation Carrosserie et Mécanique</h3>
              <p>Description de ton service de réparation carrosserie et mécanique.</p>
            </div>
          </div>
          <div className="service-slide">
            <img src="https://www.creditmutuel.fr/partage/fr/CC/CM/assets/articles/entretien-auto-des-conseils-pour-meviter-les-mauvaises-surprises/entete_800x400.jpg" alt="Image Entretien" />
            <div className="slide-content">
              <h3>Entretien de votre véhicule</h3>
              <p>Description de ton service d'entretien de véhicule.</p>
            </div>
          </div>
          <div className="service-slide vente-silde">
            <img src="https://i-df.unimedias.fr/2023/03/06/voiture-occasion-achat.jpg?auto=format,compress&cs=tinysrgb" alt="Image Vente" />
            <div className="slide-content">
              <h3>Vente de voitures d'occasions</h3>
              <p>Description de ton service de vente de voitures d'occasion.</p>
            </div>
          </div>
        </Slider>
      </Box>

      <div className="reviews-container">
        <Typography variant="h2" gutterBottom>
          Avis et retours clients
        </Typography>
        <Slider {...settings}>
          {reviews.map(review => (
            <div key={review.id}>
              <h3>{review.name}</h3>
              <p>{review.review}</p>
            </div>
          ))}
        </Slider>
      </div>

      <Footer/>
    </Box>
  );
};

export default HomePage;
