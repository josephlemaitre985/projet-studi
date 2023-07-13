import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import './CarList.css';
import Menu from './Menu';
import Footer from './Footer';

const CarList = ({ cars }) => {
  const [priceFilter, setPriceFilter] = useState('');
  const [mileageFilter, setMileageFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [filteredCars, setFilteredCars] = useState(cars);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const filterCars = () => {
    const filtered = cars.filter((car) => {
      if (priceFilter && car.price > priceFilter) {
        return false;
      }
      if (mileageFilter && car.kilometers > mileageFilter) {
        return false;
      }
      if (yearFilter && car.year < yearFilter) {
        return false;
      }
      return true;
    });

    setFilteredCars(filtered);
  };

  const resetFilters = () => {
    setPriceFilter('');
    setMileageFilter('');
    setYearFilter('');
    setFilteredCars(cars);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const openModal = (car) => {
    setSelectedCar(car);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
    <div>
      <Menu noMarginTop />
      <div>
        <h1 className="cartitlepage">Nos véhicules d'occasions</h1>
      </div>
      <div className="filter-container">
        <input
          type="number"
          placeholder="Prix maximum"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Kilométrage maximum"
          value={mileageFilter}
          onChange={(e) => setMileageFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Année minimum"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />
        <button onClick={filterCars}>Rechercher</button>
        <button onClick={resetFilters} className="reset-button">
          Réinitialiser
        </button>
      </div>
      <div className="car-container">
        {filteredCars.map((car, index) => (
          <div
            className="car-card"
            key={index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card>
              <div className="car-image-container">
                <CardMedia
                  component="img"
                  className={`car-image ${isHovered ? 'hovered' : ''}`}
                  image={car.photo}
                  alt={`${car.make} ${car.model}`}
                />
                {isHovered && (
                  <div className="overlay">
                    <a className="view-details" onClick={() => openModal(car)}>
                      Voir l'annonce
                    </a>
                  </div>
                )}
              </div>
              <CardContent className="car-description">
                <Typography variant="h6" gutterBottom>
                  {car.make} {car.model}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Année: {car.year}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Prix: {car.price}€
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Kilométrage: {car.kilometers}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Carburant: {car.fuel}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {selectedCar && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              X
            </button>
            <div className="modal-content">
              <div className="car-details">
                <CardMedia
                  component="img"
                  className="car-image-modal"
                  image={selectedCar.photo}
                  alt={`${selectedCar.make} ${selectedCar.model}`}
                />
                <div className="car-info">
                  <Typography variant="h6" gutterBottom>
                    {selectedCar.make} {selectedCar.model}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Année: {selectedCar.year}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Prix: {selectedCar.price}€
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Kilométrage: {selectedCar.kilometers}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Carburant: {selectedCar.fuel}
                  </Typography>
                </div>
              </div>
              <div className="car-description-modal">
                <Typography variant="body2" color="textSecondary">
                  {selectedCar.description}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CarList;
