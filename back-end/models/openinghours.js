const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OpeningHours = sequelize.define('OpeningHours', {

day: {
    type: DataTypes.STRING,
},

isOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
},

morningfrom: {
    type: DataTypes.TIME,
    defaultValue: '00:00:00',
},

morningto: {
    type: DataTypes.TIME,
    defaultValue: '00:00:00',
},

afternoonfrom: {
    type: DataTypes.TIME,
    defaultValue: '00:00:00',
},

afternoonto: {
    type: DataTypes.TIME,
    defaultValue: '00:00:00',
},
}, {
  tableName: 'openinghours',
});

OpeningHours.sync().then(() => {
  console.log("OpeningHours model synced");
});

module.exports = OpeningHours;
