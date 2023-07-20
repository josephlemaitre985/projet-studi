const { Sequelize, DataTypes } = require('sequelize');
const db = require('../util/database');
const bcrypt = require('bcryptjs');

const User = db.define('Users', {
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
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hashedPassword);
    },
  },
});

User.sync().then(() => {
  console.log("User model synced");
});

module.exports = User;
