const { Sequelize, DataTypes } = require('sequelize');
const db = require('../util/database')

const Car = db.define('Car', {
  id : {
    type : DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey : true,
    allowNull : false
  },
  make: {
    type: DataTypes.STRING
   
  },
  model: {
    type: DataTypes.STRING,
   
  },
  year: {
    type: DataTypes.INTEGER,
    
  },
  price: {
    type: DataTypes.INTEGER,
    
  },
  kilometers: {
    type: DataTypes.INTEGER,
    
  },
  fuel: {
    type: DataTypes.STRING,
    
  },
  photo: {
    type: DataTypes.STRING,
    
  },
  description: {
    type: DataTypes.STRING,
   
  }
});

Car.sync().then(() => {
  console.log("Car model synced");
})
module.exports = Car;

