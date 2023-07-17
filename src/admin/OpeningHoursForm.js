import React, { useState, useEffect } from 'react';

const OpeningHoursForm = ({ onUpdate }) => {
  const [openingHours, setOpeningHours] = useState({
    monday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    tuesday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    wednesday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    thursday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    friday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    saturday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    sunday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/openinghours')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOpeningHours(data.openingHours);
        } else {
          console.error('Erreur lors de la récupération des horaires d\'ouverture:', data.error);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des horaires d\'ouverture:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/api/openinghours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(openingHours),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onUpdate(openingHours);
        } else {
          console.error('Erreur lors de la mise à jour des horaires d\'ouverture:', data.error);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi des données:', error);
      });
  };

  const handleInputChange = (day, timeSlot, event) => {
    const { value } = event.target;
    setOpeningHours((prevOpeningHours) => ({
      ...prevOpeningHours,
      [day]: {
        ...prevOpeningHours[day],
        [timeSlot]: value,
      },
    }));
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const timeslots = ['morningfrom', 'morningto', 'afternoonfrom', 'afternoonto'];

  return (
    <form onSubmit={handleSubmit}>
      {days.map((day) => (
        <div key={day}>
          <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
          {timeslots.map((timeslot) => (
            <div key={timeslot}>
              <label>{timeslot}:</label>
              <input type="text" name={`${day}-${timeslot}`} value={openingHours[day][timeslot]} onChange={(event) => handleInputChange(day, timeslot, event)} />
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default OpeningHoursForm;
