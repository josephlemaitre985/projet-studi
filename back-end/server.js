const express = require('express');

const app = express();
const port = 3000; 
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const carRoutes = require('./routes/carRoutes');
const openinghoursRoutes = require('./routes/openinghoursRoutes'); 
const employeesRoutes = require('./routes/employeesRoutes');

app.use(cors());

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

const { Pool } = require('pg');

const pool = new Pool({
  host: 'pj624348-001.eu.clouddb.ovh.net',
  port: 35286,
  user: 'garagevparrot_j',
  password: 'Okolo2023',
  database: 'garagevparrot_j'
});

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
app.use('/api/openinghours', openinghoursRoutes); 
app.use('/api/employees', employeesRoutes);


