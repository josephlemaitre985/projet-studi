const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OpeningHours = sequelize.define('OpeningHours', {

day : {
    type : DataTypes.TIME,
   
},

morningfrom : {
    type : DataTypes.TIME,
    
},

morningto : {
    type : DataTypes.TIME,
    
},

afternoonfrom : {
    type : DataTypes.TIME,
    
},

afternoonto : {
    type : DataTypes.TIME,
    
},




}, {
  tableName: 'openinghours', // Ajoutez cette ligne
});
OpeningHours.sync().then(() => {
    console.log("OpeningHours model synced");
  })


module.exports = OpeningHours;
