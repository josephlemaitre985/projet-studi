const { Sequelize } = require('sequelize');

// Définissez les informations de connexion à votre base de données PostgreSQL
const sequelize = new Sequelize('garage-projet-studi', 'postgres', 'Chouchou12072019!', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
