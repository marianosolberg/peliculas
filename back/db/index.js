const Sequelize = require("sequelize");
const db = new Sequelize(
  "postgres:/omdb",

  {
    logging: false,
    dialect: "postgres",
  }
);

module.exports = db;
