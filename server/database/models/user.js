const Sequelize = require("sequelize");
const sequelize = require("../database_connection");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true, // Ensures a valid email format
      },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: Sequelize.DOUBLE,
  },
});

module.exports = User;
