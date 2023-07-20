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
        <p><FaEnvelope /> Email: <a href="mailto:vincent.parrot@parrot.fr">vincent.parrot@parrot.fr</a></p>
        <p><FaPhone /> Téléphone: <a href="tel:+1234567890">+1234567890</a></p>
      </div>
      <div className="footer-section">
        <h3>Adresse</h3>
        <p><FaMapMarker /> <a href="https://www.google.com/maps?q=155+rue+de+Charonne,+Paris,+France" target="_blank" rel="noopener noreferrer">123 Rue du Paradis, 31000 Toulouse, France</a></p>
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
