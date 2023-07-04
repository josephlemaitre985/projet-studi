import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '/Users/josephlemaitre/projet-studi/src/Component/LoginForm.css';

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoute ici la logique pour traiter les données de connexion (envoi au backend, validation, etc.)
  };

  return (
    <div className="form div">
      <h1 className='title'>Connexion admin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label className='label'>Email:</label>
            <input className='input' type="email" value={email} onChange={handleEmailChange} placeholder='Votre adresse mail' />
          </div>
          <div>
            <label className='label'>Mot de passe:</label>
            <input className='input' type="password" value={password} onChange={handlePasswordChange} placeholder='Votre mot de passe' />
          </div>
          <button className='button' type="submit">Se connecter</button>
        </div>
      </form>
      <img src='https://i0.wp.com/my-barn.com/wp-content/uploads/2023/05/logo-garage-1.png?resize=1200%2C720&ssl=1' alt="Logo du garage" className='logo' />
      <Link to="/">
        <button className='homepagebutton'>Retour à la page d'accueil</button>
      </Link>
    </div>
  );
};

export default LoginForm;
