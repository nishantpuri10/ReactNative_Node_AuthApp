const Sequelize = require("sequelize");

const sequelize = new Sequelize("stock_market_sequelize", "root", "12344321", {
  dialect: "mysql",
  host: "localhost",
});

// Test database connection immediately
sequelize
  .sync()
  .then((result) => {
    console.log("Database connection verified successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
