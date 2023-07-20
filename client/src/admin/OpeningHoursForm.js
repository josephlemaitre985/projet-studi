import React, { useState, useEffect } from 'react';

const OpeningHoursForm = ({ onUpdate }) => {
  const [openingHours, setOpeningHours] = useState({
    Monday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    Tuesday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    Wednesday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    Thursday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    Friday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    Saturday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
    Sunday: { morningfrom: '', morningto: '', afternoonfrom: '', afternoonto: '' },
  });
  

  useEffect(() => {
    fetch('/api/openinghours')
      .then((response) => response.json())
      .then((data) => {
        console.log('Raw API response:', data);
        if (data.success && data.openingHours.length > 0) {
          const openingHours = days.reduce((acc, currentDay) => {
            const apiDayData = data.openingHours.find(dayData => dayData.day === currentDay);
            return {
              ...acc, 
              [currentDay]: {
                morningfrom: apiDayData ? apiDayData.morningfrom || '' : '',
                morningto: apiDayData ? apiDayData.morningto || '' : '',
                afternoonfrom: apiDayData ? apiDayData.afternoonfrom || '' : '',
                afternoonto: apiDayData ? apiDayData.afternoonto || '' : ''
              }
            };
          }, {});
          setOpeningHours(openingHours);
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
  
    days.forEach(day => {
      fetch(`/api/openinghours/${day}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...openingHours[day]
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            onUpdate(day, data.openingHours);
          } else {
            console.error(`Erreur lors de la mise à jour des horaires d\'ouverture pour ${day}:`, data.error);
          }
        })
        .catch((error) => {
          console.error(`Erreur lors de l'envoi des données pour ${day}:`, error);
        });
    })
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

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeslots = ['morningfrom', 'morningto', 'afternoonfrom', 'afternoonto'];

  return (
    <form onSubmit={handleSubmit}>
      {days.map((day) => (
        <div key={day}>
          <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
          {timeslots.map((timeslot) => (
            <div key={timeslot}>
              <label>{timeslot}:</label>
              <input type="text" name={`${day}-${timeslot}`} value={openingHours[day] ? openingHours[day][timeslot] : ''} onChange={(event) => handleInputChange(day, timeslot, event)} />
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default OpeningHoursForm;
