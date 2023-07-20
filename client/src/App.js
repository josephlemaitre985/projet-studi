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
  const [isEmployee, setIsEmployee] = useState(false); // Nouveau état
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const adminStatus = localStorage.getItem('isAdmin');
      const loginStatus = localStorage.getItem('isLoggedIn');
      const employeeStatus = localStorage.getItem('isEmployee'); // Nouveau

      if (loginStatus) {
        setIsLoggedIn(JSON.parse(loginStatus));
        setIsAdmin(adminStatus ? JSON.parse(adminStatus) : false);
        setIsEmployee(employeeStatus ? JSON.parse(employeeStatus) : false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = (role) => { // role passé en argument
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);

    if (role === 'admin') {
      setIsAdmin(true);
      setIsEmployee(false);
      localStorage.setItem('isAdmin', true);
      localStorage.removeItem('isEmployee');
    } else if (role === 'employee') {
      setIsAdmin(false);
      setIsEmployee(true);
      localStorage.setItem('isEmployee', true);
      localStorage.removeItem('isAdmin');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsEmployee(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isEmployee');
  };

  const handleUpdateCars = async (updatedCar) => {
    try {
      const response = await axios.put(`/api/cars/${updatedCar.id}`, updatedCar);
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
      const response = await axios.post('/api/cars', newCar);
      if (response.status === 201) {
        setCars([...cars, newCar]);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout de la voiture', error);
    }
  };
  
  const handleDeleteCar = async (carId) => {
    try {
      const response = await axios.delete(`/api/cars/${carId}`);
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
        const response = await axios.get('/api/cars');
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
    { make: 'Réparation Carrosserie', price: 800, photo: 'https://www.carflex.fr/data/news/img/137-1-zoom.png' },
    { make: 'Entretien du véhicule', price: 300, photo: 'https://www.creditmutuel.fr/partage/fr/CC/CM/assets/articles/entretien-auto-des-conseils-pour-meviter-les-mauvaises-surprises/entete_800x400.jpg' },
  ];

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} handleLogout={handleLogout} />} /> {/* Ajout de handleLogout ici */}
          <Route path="/information" element={<ScheduleTable />} />
          <Route path="/occasion" element={<CarList cars={cars} isAdmin={isAdmin} />} />
          <Route path="/réparations" element={<ServicesPage services={services} />} />
          <Route path="/formulaire" element={<FormPage />} />
          <Route
            path="/admin/*"
            element={
              isLoggedIn ? (
                <AdminPage 
                  handleLogout={handleLogout} 
                  onUpdate={isAdmin ? handleUpdateCars : null}
                  onAddCar={isAdmin ? handleAddCar : null}
                  onDeleteCar={isAdmin ? handleDeleteCar : null}
                  cars={cars} 
                  isEmployee={isEmployee} // Nouveau
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
