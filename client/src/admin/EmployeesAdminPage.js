import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';

const EmployeesAdminPage = () => {
  const [createdEmployee, setCreatedEmployee] = useState(null);

  const handleEmployeeCreation = (createdEmployee) => {
    setCreatedEmployee(createdEmployee);
  };

  return (
    <div className="admin-section">
      {createdEmployee && <p className="success-message">Compte employé créé avec succès</p>}
      <h2>Créer un compte employé</h2>
      <EmployeeForm onCreate={handleEmployeeCreation} />
    </div>
  );
};

export default EmployeesAdminPage;
