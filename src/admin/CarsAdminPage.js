import React, { useState, useEffect } from 'react';
import CarForm from './CarForm';
import axios from 'axios';

const CarsAdminPage = () => {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const response = await axios.get('http://51.210.124.204:3000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces de voiture', error);
      }
    };

    fetchCarsData();
  }, []);

  const handleCarDelete = async (carId) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?");
    if (confirmation) {
      try {
        await axios.delete(`http://51.210.124.204:3000/api/cars/${carId}`);
        setCars(cars => cars.filter((car) => car.id !== carId));
      } catch (error) {
        console.error(`Erreur lors de la suppression de la voiture avec l'id ${carId}`, error);
      }
    }
  };

  const handleCarUpdate = (updatedCar) => {
    setCars(cars.map((car) => car.id === updatedCar.id ? updatedCar : car));
    setMessage("L'annonce a bien été mise à jour.");
  };

  const handleCarAdd = (newCar) => {
    setCars([...cars, newCar]);
  };

  return (
    <div className="admin-section">
      <h2>Gérer les annonces de voitures</h2>
      {message && <div className="success-message">{message}</div>}      {cars.map((car) => (
        <div key={car.id}>
          <h3>{car.make} {car.model}</h3> 
          <CarForm carId={car.id} initialData={car} onUpdate={handleCarUpdate} onAddCar={handleCarAdd} />
          <button onClick={() => handleCarDelete(car.id)}>Supprimer cette voiture</button>
        </div>
      ))}
      <h2>Ajouter une nouvelle voiture</h2>
      <CarForm carId={null} initialData={{}} onAddCar={handleCarAdd} />
    </div>
  );
};

export default CarsAdminPage;
