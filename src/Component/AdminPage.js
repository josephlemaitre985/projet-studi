import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarForm from './CarForm';
import OpeningHoursForm from './OpeningHoursForm';
import EmployeeForm from './EmployeeForm';
import './AdminPage.css';
import axios from 'axios'; // Importez le module axios pour effectuer des requêtes API

const AdminPage = () => {
  const [carId, setCarId] = useState(''); // État pour stocker l'ID de l'annonce de voiture
  const [initialData, setInitialData] = useState({ make: '', model: '' }); // État pour stocker les données initiales de l'annonce de voiture

  const [updatedCar, setUpdatedCar] = useState(null);
  const [updatedOpeningHours, setUpdatedOpeningHours] = useState(null);
  const [createdEmployee, setCreatedEmployee] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cars'); // Récupère toutes les annonces de voiture
        const cars = response.data;
        if (cars.length > 0) {
          const firstCar = cars[0];
          setCarId(firstCar.id);
          setInitialData({ make: firstCar.make, model: firstCar.model }); // Met à jour les données initiales avec les données réelles de l'annonce de voiture
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces de voiture', error);
      }
    };
  
    fetchCarData();
  }, []);
  
  const handleCarUpdate = (updatedCar) => {
    setUpdatedCar(updatedCar);
    // Effectue les actions nécessaires après la mise à jour de l'annonce (par ex. afficher un message de succès)
  };

  const handleOpeningHoursUpdate = (updatedOpeningHours) => {
    setUpdatedOpeningHours(updatedOpeningHours);
    // Effectue les actions nécessaires après la mise à jour des horaires d'ouverture (par ex. afficher un message de succès)
  };

  const handleEmployeeCreation = (createdEmployee) => {
    setCreatedEmployee(createdEmployee);
    // Effectue les actions nécessaires après la création d'un compte employé (par ex. afficher un message de succès)
  };

  return (
    <div className="admin-page">
      {/* Affiche le formulaire de modification si l'annonce de voiture a été mise à jour */}
      {updatedCar && <p className="success-message">Annonce de voiture mise à jour avec succès</p>}
      {/* Affiche un message si les horaires d'ouverture ont été modifiés */}
      {updatedOpeningHours && <p className="success-message">Horaires d'ouverture mis à jour avec succès</p>}
      {/* Affiche un message si un compte employé a été créé */}
      {createdEmployee && <p className="success-message">Compte employé créé avec succès</p>}

      <h1 className="admin-page-title">Page d'administration</h1>

      <div className="admin-navigation">
        <Link to="/">Accueil</Link>
      </div>

      <div className="admin-section">
        <h2>Modifier une annonce de voiture</h2>
        <CarForm carId={carId} initialData={initialData} onUpdate={handleCarUpdate} />
      </div>

      <div className="admin-section">
        <h2>Modifier les horaires d'ouverture</h2>
        <OpeningHoursForm onUpdate={handleOpeningHoursUpdate} />
      </div>

      <div className="admin-section">
        <h2>Créer un compte employé</h2>
        <EmployeeForm onCreate={handleEmployeeCreation} />
      </div>
    </div>
  );
};

export default AdminPage;
