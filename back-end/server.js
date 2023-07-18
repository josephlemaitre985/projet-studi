const express = require('express');

const app = express();
const port = 3000; // Choisis le port que tu souhaites utiliser
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importe les routes pour les annonces de voiture et les horaires d'ouverture
const carRoutes = require('./routes/carRoutes');
const openinghoursRoutes = require('./routes/openinghoursRoutes'); // Nouvelle ligne
const employeesRoutes = require('./routes/employeesRoutes');

app.use(cors());

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Chouchou12072019!',
  database: 'garage-projet-studi'
});

// Vérification de la connexion à la base de données
pool.connect((err, client, done) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données', err);
  } else {
    console.log('Connexion réussie à la base de données');
  }
});

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API du garage !');
});

app.use('/api/cars', carRoutes);
app.use('/api/openinghours', openinghoursRoutes); // Nouvelle ligne
app.use('/api/employees', employeesRoutes);


// Montage des routes pour les annonces de voiture
