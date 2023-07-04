import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, collapseClasses } from '@mui/material';
import './CarList.css'; 
import Menu from './Menu';

const CarList = ({ cars }) => {
  return (
    <div>
      <Menu />
      <div>
        <h1 className='cartitlepage'>Nos véhicules d'occasions</h1>
      </div>
      <div className="car-container"> {/* Ajout de la classe car-container */}
        {cars.map((car, index) => (
            <div className="car-card card-width" key={index}>
            <Card>
              <CardMedia 
                component="img"
                className="car-image" // Ajoutez la classe "car-image"
                image={car.photo} // Ajout de la propriété "photo" dans l'objet car pour l'URL de l'image
                alt={`${car.make} ${car.model}`}
              />
              <CardContent className='car-description'>
                <Typography variant="h6" gutterBottom>
                  {car.make} {car.model}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Année: {car.year}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Prix: {car.price}€
                </Typography>
                {/* Add more details about the car */}
                <Typography variant="body2" color="textSecondary">
                  Kilométrage: {car.kilometers}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Carburant: {car.fuel}
                </Typography>
                <a  className="contact" href="/information"> Vous êtes intéressé ? Contactez-nous !</a>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
