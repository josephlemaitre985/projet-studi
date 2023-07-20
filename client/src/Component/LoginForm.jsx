import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../admin/config.js';
import './LoginForm.css';
import config from '../admin/config.js';

const LoginForm = ({ handleLogin, handleLogout }) => { // Ajout de handleLogout ici
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (email === config.adminEmail && password === config.adminPassword) {
      handleLogin('admin');
      navigate('/admin');
    } else if (email === config.employeeEmail && password === config.employeePassword) {
      handleLogin('employee');
      navigate('/admin'); 
    } else {
      setErrorMessage('Adresse e-mail ou mot de passe incorrect.');
    }
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
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
      </form>
      <img src='https://i0.wp.com/my-barn.com/wp-content/uploads/2023/05/logo-garage-1.png?resize=1200%2C720&ssl=1' alt="Logo du garage" className='logo' />
      <Link to="/">
        <button 
          className='homepagebutton' 
          onClick={handleLogout} // Ajout de handleLogout ici
        >
          Retour à la page d'accueil
        </button>
      </Link>
    </div>
  );
};

export default LoginForm;
