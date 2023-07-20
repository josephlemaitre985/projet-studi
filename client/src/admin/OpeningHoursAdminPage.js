import React, { useState } from 'react';
import OpeningHoursForm from './OpeningHoursForm';

const OpeningHoursAdminPage = () => {
  const [updatedOpeningHours, setUpdatedOpeningHours] = useState(null);

  const handleOpeningHoursUpdate = (updatedOpeningHours) => {
    setUpdatedOpeningHours(updatedOpeningHours);
  };

  return (
    <div className="admin-section">
      {updatedOpeningHours && <p className="success-message">Horaires d'ouverture mis à jour avec succès</p>}
      <h2>Modifier les horaires d'ouverture</h2>
      <OpeningHoursForm onUpdate={handleOpeningHoursUpdate} />
    </div>
  );
};

export default OpeningHoursAdminPage;
