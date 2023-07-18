const {  DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('Users', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync().then(() => {
    console.log("User model synced");
  })

module.exports = User;
