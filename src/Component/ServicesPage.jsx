import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, collapseClasses } from '@mui/material';
import './ServicesPage.css'; 
import Menu from './Menu';
import Footer from './Footer'; 


const ServicesPage = ({ services }) => {
  return (
    <div>
      <Menu noMarginTop />
      <div>
        <h1 className='servicestitlepage'>Nos Services</h1>
      </div>
      <div className="services-container">
        {services.map((services, index) => (
            <div className="service-card card-width" key={index}>
            <Card>
              <CardMedia 
                component="img"
                className="service-image"
                image={services.photo} // Ajout de la propriété "photo" dans l'objet car pour l'URL de l'image
                alt={`${services.make} `}
              />
              <CardContent className='service-description'>
                <Typography variant="h6" gutterBottom>
                  {services.make} {services.model}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                 
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Prix: {services.price}€
                </Typography>
                {/* Add more details about the car */}
                <Typography variant="body2" color="textSecondary">
                  
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  
                </Typography>
                <a  className="contact-services" href="/information"> Vous êtes intéressé ? Contactez-nous !</a>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
    
  );
};

export default ServicesPage;
