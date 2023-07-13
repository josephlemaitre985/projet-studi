import React, { useState } from 'react';

const OpeningHoursForm = ({ onUpdate }) => {
  const [openingHours, setOpeningHours] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Effectuer les actions nécessaires avec les horaires d'ouverture (par ex. les envoyer au backend)
    onUpdate(openingHours);
    // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaires
    setOpeningHours({
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOpeningHours((prevOpeningHours) => ({
      ...prevOpeningHours,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Lundi:</label>
        <input type="text" name="monday" value={openingHours.monday} onChange={handleInputChange} />
      </div>
      <div>
        <label>Mardi:</label>
        <input type="text" name="tuesday" value={openingHours.tuesday} onChange={handleInputChange} />
      </div>
      <div>
        <label>Mercredi:</label>
        <input type="text" name="wednesday" value={openingHours.wednesday} onChange={handleInputChange} />
      </div>
      <div>
        <label>Jeudi:</label>
        <input type="text" name="thursday" value={openingHours.thursday} onChange={handleInputChange} />
      </div>
      <div>
        <label>Vendredi:</label>
        <input type="text" name="friday" value={openingHours.friday} onChange={handleInputChange} />
      </div>
      <div>
        <label>Samedi:</label>
        <input type="text" name="saturday" value={openingHours.saturday} onChange={handleInputChange} />
      </div>
      <div>
        <label>Dimanche:</label>
        <input type="text" name="sunday" value={openingHours.sunday} onChange={handleInputChange} />
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default OpeningHoursForm;
