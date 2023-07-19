const { Sequelize } = require('sequelize');

// Définissez les informations de connexion à votre base de données PostgreSQL
const sequelize = new Sequelize('garagevparrot_j', 'garagevparrot_j', 'Okolo2023', {
  host: 'pj624348-001.eu.clouddb.ovh.net',
  dialect: 'postgres'
});

module.exports = sequelize;
