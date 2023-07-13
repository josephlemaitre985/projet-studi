import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './Component/LoginForm';
import HomePage from './Component/HomePage';
import './Component/LoginForm.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ScheduleTable from './Component/ScheduleTable';
import CarList from './Component/CarList';
import ServicesPage from './Component/ServicesPage';
import FormPage from './Component/FormPage';
import AdminPage from './Component/AdminPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const adminStatus = localStorage.getItem('isAdmin');
      const loginStatus = localStorage.getItem('isLoggedIn');

      if (adminStatus && loginStatus) {
        setIsAdmin(JSON.parse(adminStatus));
        setIsLoggedIn(JSON.parse(loginStatus));
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('isAdmin', true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  };

  const handleUpdateCars = async (updatedCar) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/cars/${updatedCar.id}`, updatedCar);
      if (response.status === 200) {
        const updatedCars = cars.map((car) => {
          if (car.id === updatedCar.id) {
            return response.data;
          }
          return car;
        });
        setCars(updatedCars);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la mise à jour de la voiture', error);
    }
  };
  

  const initialCars = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Corolla',
      year: 2018,
      price: 15000,
      kilometers: 50000,
      fuel: 'Petrol',
      photo: 'https://cdn.car-recalls.eu/wp-content/uploads/2021/07/Toyota-Corolla-2019-fuel-pump-768x431.jpg',
      description: 'Voiture en excellent état, aucun défaut.',
      editable: true // Ajoute la propriété "editable" à true pour les voitures
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2017,
      price: 14000,
      kilometers: 60000,
      fuel: 'Diesel',
      photo: 'https://www.automobile-magazine.fr/asset/cms/73867/config/56702/la-dixieme-generation-de-honda-civic-devoile-desormais-sa-version-cinq-portes-europeenne-identique-a-la-variante-americaine-a-quelques-details-declairage-pres.jpg',
      editable: true // Ajoute la propriété "editable" à true pour les voitures
    },
    {
      id: 3,
      make: 'Ford',
      model: 'Mustang',
      year: 2015,
      price: 25000,
      kilometers: 30000,
      fuel: 'Petrol',
      photo: 'https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/14q4/638369/2015-ford-mustang-gt-automatic-test-review-car-and-driver-photo-644182-s-original.jpg?fill=2:1&resize=1200:*',
      editable: true // Ajoute la propriété "editable" à true pour les voitures
    },
    // ... autres voitures
  ];

  useEffect(() => {
    setCars(initialCars);
  }, []);

  const services = [
    { make: 'Réparation Carrosserie', price: 15000, photo: 'https://www.carflex.fr/data/news/img/137-1-zoom.png' },
    { make: 'Entretien du véhicule', price: 14000, photo: 'https://www.creditmutuel.fr/partage/fr/CC/CM/assets/articles/entretien-auto-des-conseils-pour-meviter-les-mauvaises-surprises/entete_800x400.jpg' },
  ];

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
          <Route path="/information" element={<ScheduleTable />} />
          <Route path="/occasion" element={<CarList cars={cars} isAdmin={isAdmin} />} />
          <Route path="/réparations" element={<ServicesPage services={services} />} />
          <Route path="/formulaire" element={<FormPage />} />
          <Route
  path="/admin"
  element={
    isLoggedIn ? (
      <AdminPage handleLogout={handleLogout} onUpdateCars={handleUpdateCars} cars={cars} />
    ) : (
      <Navigate to="/login" replace state={{ from: '/admin' }} />
    )
  }
/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
