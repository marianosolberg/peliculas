const S = require("sequelize");
const db = require("../db");

class Favorite extends S.Model {}

Favorite.init(
  {
    movie: {
      type: S.TEXT,
    },
    userId: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, timestamps: false, modelName: "favorite" }
);

module.exports = Favorite;
