import React, { useState } from 'react';

const EmployeeForm = ({ onCreate }) => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Effectuer les actions nécessaires pour créer le compte employé (par ex. les envoyer au backend)
    onCreate(employeeData);
    // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaires
    setEmployeeData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Prénom:</label>
        <input type="text" name="firstName" value={employeeData.firstName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Nom:</label>
        <input type="text" name="lastName" value={employeeData.lastName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={employeeData.email} onChange={handleInputChange} />
      </div>
      <div>
        <label>Mot de passe:</label>
        <input type="password" name="password" value={employeeData.password} onChange={handleInputChange} />
      </div>
      <button type="submit">Créer le compte</button>
    </form>
  );
};

export default EmployeeForm;
