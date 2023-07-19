import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarForm.css'; // Import CSS file


const CarForm = ({ carId, initialData = {}, onUpdate, onAddCar }) => {
  const [make, setMake] = useState(initialData.make || '');
  const [model, setModel] = useState(initialData.model || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [kilometers, setKilometers] = useState(initialData.kilometers || '');
  const [year, setYear] = useState(initialData.year || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [photo, setPhoto] = useState(initialData.photo || '');
  const [fuel, setFuel] = useState(initialData.fuel || '');


  useEffect(() => {
    setMake(initialData.make || '');
    setModel(initialData.model || '');
    setPrice(initialData.price || '');
    setKilometers(initialData.kilometers || '');
    setYear(initialData.year || '');
    setDescription(initialData.description || '');
    setPhoto(initialData.photo || '');
    setFuel(initialData.fuel || '');
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      make,
      model,
      price,
      kilometers,
      year,
      description,
      photo,
      fuel
    };

    try {
      if (carId) { // If carId exists, update the car
        const response = await axios.put('http://localhost:3000/api/cars/' + carId, updatedData);
        const updatedCar = response.data;
        onUpdate(updatedCar); // Call the update function provided by the parent component
      } else { // If carId does not exist, create a new car
        const response = await axios.post('http://localhost:3000/api/cars', updatedData);
        const newCar = response.data;
        onAddCar(newCar); // Call the add function provided by the parent component
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'annonce de voiture', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="CarForm">
      <label>
        Marque:
        <input type="text" value={make} onChange={(e) => setMake(e.target.value)} className="CarForm-input" />
      </label>
      <label>
        Modèle:
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="CarForm-input" />
      </label>
      <label>
        Prix:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="CarForm-input" />
      </label>
      <label>
        Kilomètres:
        <input type="number" value={kilometers} onChange={(e) => setKilometers(e.target.value)} className="CarForm-input" />
      </label>
      <label>
        Année:
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="CarForm-input" />
      </label>
      <label>
        Carburant:
        <input type="text" value={fuel} onChange={(e) => setFuel(e.target.value)} className="CarForm-input" />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="CarForm-input" />
      </label>
      <label>
        URL de la photo:
        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className="CarForm-input" />
      </label>
      <button type="submit" className="CarForm-button">{carId ? 'Mettre à jour' : 'Ajouter'}</button>
    </form>
  );
};

export default CarForm;