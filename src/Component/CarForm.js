import React, { useState } from 'react';
import axios from 'axios';

const CarForm = ({ carId, initialData, onUpdate, onUpdateCars }) => {
  const [make, setMake] = useState(initialData.make);
  const [model, setModel] = useState(initialData.model);
  // Ajoute d'autres champs de formulaire pour les propriétés de l'annonce de voiture que tu souhaites modifier

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      make,
      model,
      // Ajoute d'autres propriétés mises à jour
    };

    try {
      const response = await axios.put('http://localhost:3000/api/cars/' + carId, updatedData);
      const updatedCar = response.data;
      onUpdate(updatedCar); // Appelle la fonction de mise à jour fournie par le composant parent
      onUpdateCars(updatedCar); // Met à jour les annonces de voiture dans le composant parent
      // Effectue les actions nécessaires après la mise à jour de l'annonce (par ex. afficher un message de succès)
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'annonce de voiture', error);
      // Gère l'erreur (par ex. afficher un message d'erreur)
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="make">Marque:</label>
        <input type="text" id="make" value={make} onChange={(e) => setMake(e.target.value)} />
      </div>
      <div>
        <label htmlFor="model">Modèle:</label>
        <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
      </div>
      {/* Ajoute d'autres champs de formulaire pour les propriétés de l'annonce de voiture que tu souhaites modifier */}
      <button type="submit">Mettre à jour</button>
    </form>
  );
};

export default CarForm;
