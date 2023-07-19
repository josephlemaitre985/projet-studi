import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [employees, setEmployees] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true); // Ajouté cette nouvelle variable d'état

  const fetchEmployeesData = async () => {
    try {
      const response = await axios.get('http://51.210.124.204:3000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des employés', error);
    }
  };

  // Utilisez `shouldFetch` comme dépendance ici
  useEffect(() => {
    if (shouldFetch) {
      fetchEmployeesData();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://51.210.124.204:3000/api/employees', employeeData);
      setShouldFetch(true);
    } catch (error) {
      console.error('Erreur lors de la création de l\'employé', error);
    }
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
    <div>
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

      <h2>Liste des employés</h2>
      {employees.map((employee) => (
        <div key={employee.id}>
          <h3>{employee.firstName} {employee.lastName}</h3>
          <p>Email: {employee.email}</p>
          {/* Affiche d'autres informations sur l'employé si nécessaire */}
          <button>Modifier</button>
        </div>
      ))}
    </div>
  );
};

export default EmployeeForm;
