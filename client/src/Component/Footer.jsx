import React from 'react';
import { FaClock, FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>Horaires d'ouverture</h3>
        <p><FaClock /> Lun - Ven: 8h45 - 18h</p>
        <p><FaClock /> Sam: 8h45 - 12h</p>
        <p><FaClock /> Dim: Fermé</p>
      </div>
      <div className="footer-section">
        <h3>Contact</h3>
        <p><FaEnvelope /> Email: vincent.parrot@parrot.fr</p>
        <p><FaPhone /> Téléphone: +1234567890</p>
      </div>
      <div className="footer-section">
        <h3>Adresse</h3>
        <p><FaMapMarker /> 123 Rue du Paradis</p>
        <p> 31000 Toulouse, France</p>
      </div>
      <div className="footer-section">
        <h3>Formulaire</h3>
        <Link to="/information">
          <button className="footer-button">Nous contacter</button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
