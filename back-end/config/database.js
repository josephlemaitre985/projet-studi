const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('garagevparrot_j', 'garagevparrot_j', 'Okolo2023', {
  host: 'pj624348-001.eu.clouddb.ovh.net',
  dialect: 'postgres'
});

module.exports = sequelize;
