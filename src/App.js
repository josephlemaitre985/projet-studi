import React, { useState } from 'react';
import LoginForm from './Component/LoginForm'; // Utilisez un chemin relatif pour l'importation
import HomePage from './Component/HomePage'; // Utilisez un chemin relatif pour l'importation
import './Component/LoginForm.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScheduleTable from './Component/ScheduleTable';
import CarList from './Component/CarList';
import ServicesPage from './Component/ServicesPage';
import FormPage from './Component/FormPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const cars = [
    { make: 'Toyota', model: 'Corolla', year: 2018, price: 15000, kilometers: 50000, fuel: 'Petrol', photo: 'https://cdn.car-recalls.eu/wp-content/uploads/2021/07/Toyota-Corolla-2019-fuel-pump-768x431.jpg', description: 'Voiture en excellent état, aucun défaut.'},
    { make: 'Honda', model: 'Civic', year: 2017, price: 14000, kilometers: 60000, fuel: 'Diesel', photo: 'https://www.automobile-magazine.fr/asset/cms/73867/config/56702/la-dixieme-generation-de-honda-civic-devoile-desormais-sa-version-cinq-portes-europeenne-identique-a-la-variante-americaine-a-quelques-details-declairage-pres.jpg' },
    { make: 'Ford', model: 'Mustang', year: 2015, price: 25000, kilometers: 30000, fuel: 'Petrol', photo: 'https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/14q4/638369/2015-ford-mustang-gt-automatic-test-review-car-and-driver-photo-644182-s-original.jpg?fill=2:1&resize=1200:*' },
    // ... autres voitures
  ];

  const services = [
    { make: 'Réparation Carrosserie', price: 15000, photo: 'https://www.carflex.fr/data/news/img/137-1-zoom.png'},
    { make: 'Entretien du véhicule', price: 14000,  photo: 'https://www.creditmutuel.fr/partage/fr/CC/CM/assets/articles/entretien-auto-des-conseils-pour-meviter-les-mauvaises-surprises/entete_800x400.jpg' },
  ]

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage handleLogin={handleLogin} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/information" element={<ScheduleTable />} /> {/* Modification de la route pour correspondre à /informations */}
          <Route path="/occasion" element={<CarList cars={cars} />} /> {/* Passage des données des voitures au composant CarList */}
          <Route path="/réparations" element={<ServicesPage services={services}/>} />
          <Route path="/formulaire" element={<FormPage />} />
        </Routes>
       
        <div></div>
      </div>
    </Router>
  );
};

export default App;
