import React from 'react';
import './ScheduleTable.css';
import Menu from './Menu';

const openingHours = [
  { day: 'Lundi', morningFrom: '08:45', morningTo: '12:00', afternoonFrom: '14:00', afternoonTo: '18:00' },
  { day: 'Mardi', morningFrom: '08:45', morningTo: '12:00', afternoonFrom: '14:00', afternoonTo: '18:00' },
  { day: 'Mercredi', morningFrom: '08:45', morningTo: '12:00', afternoonFrom: '14:00', afternoonTo: '18:00' },
  { day: 'Jeudi', morningFrom: '08:45', morningTo: '12:00', afternoonFrom: '14:00', afternoonTo: '18:00' },
  { day: 'Vendredi', morningFrom: '08:45', morningTo: '12:00', afternoonFrom: '14:00', afternoonTo: '18:00' },
  { day: 'Samedi', morningFrom: '08:45', morningTo: '12:00', afternoonFrom: 'Fermé', afternoonTo: 'Fermé' },
  { day: 'Dimanche', morningFrom: 'Fermé', morningTo: 'Fermé', afternoonFrom: 'Fermé', afternoonTo: 'Fermé' },
];

const ScheduleTable = () => {
  return (
    <div>
      <Menu noMarginTop/>
      <div className='background-schedule'>
      <div className="schedule-table">
        <h2>Horaires d'Ouverture</h2>
        <table>
          <thead>
            <tr>
              <th>Jour</th>
              <th>Matinée</th>
              <th>Après-midi</th>
            </tr>
          </thead>
          <tbody>
            {openingHours.map((schedule) => (
              <tr key={schedule.day}>
                <td>{schedule.day}</td>
                <td>{schedule.morningFrom} - {schedule.morningTo}</td>
                <td>{schedule.afternoonFrom} - {schedule.afternoonTo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="contact-info">
  <div>
    <strong>Téléphone:</strong> <a href="tel:0123456789">0123456789</a>
  </div>
  <div>
    <strong>Email:</strong> <a href="mailto:vincent.parrot@parrot.fr">vincent.parrot@parrot.fr</a>
  </div>
  <div>
     <strong>Adresse:</strong>{" "}
    <a
      href="https://www.google.com/maps?q=10+Rue+des+jacobins,+Caen,+France"
      target="_blank"
      rel="noopener noreferrer"
    >
      10 Rue des Jacobins, 14000, CAEN, FRANCE
    </a>
  </div>
</div>

      </div>
    </div>
    </div>
  );
};

export default ScheduleTable;
