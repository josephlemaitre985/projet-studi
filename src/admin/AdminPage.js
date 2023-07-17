import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import CarsAdminPage from './CarsAdminPage';
import OpeningHoursAdminPage from './OpeningHoursAdminPage';
import EmployeesAdminPage from './EmployeesAdminPage';
import AdminNav from './AdminNav';
import './AdminPage.css';

const AdminPage = ({ onUpdate, onUpdateCars, onAddCar, onDeleteCar }) => {
  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Page d'administration</h1>
      <AdminNav />

      <Routes>
        <Route 
          path="/cars" 
          element={
            <CarsAdminPage 
              onUpdate={onUpdate}
              onUpdateCars={onUpdateCars}
              onAddCar={onAddCar}
              onDeleteCar={onDeleteCar}
            />
          }
        />
        <Route path="/openinghours" element={<OpeningHoursAdminPage />} />
        <Route path="/employees" element={<EmployeesAdminPage />} />
      </Routes>

      <div className="admin-navigation">
        <Link to="/">Accueil</Link>
      </div>
    </div>
  );
};

export default AdminPage;
