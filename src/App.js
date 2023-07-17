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
import AdminPage from './admin/AdminPage';

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

  const handleAddCar = async (newCar) => {
    try {
      const response = await axios.post('http://localhost:3000/api/cars', newCar);
      if (response.status === 201) {
        setCars([...cars, newCar]);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout de la voiture', error);
    }
  };
  
  const handleDeleteCar = async (carId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/cars/${carId}`);
      if (response.status === 200) {
        const updatedCars = cars.filter((car) => car.id !== carId);
        setCars(updatedCars);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression de la voiture', error);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cars');
        if (response.status === 200) {
          setCars(response.data);
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des voitures', error);
      }
    };

    fetchCars();
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
            path="/admin/*" // Ajoutez le '/*' ici
            element={
              isLoggedIn ? (
                <AdminPage 
                  handleLogout={handleLogout} 
                  onUpdate={handleUpdateCars} 
                  onAddCar={handleAddCar} 
                  onDeleteCar={handleDeleteCar} 
                  cars={cars} 
                />
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
