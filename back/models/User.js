const S = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

class User extends S.Model {}

User.init(
  {
    firstName: {
      type: S.STRING,
      allowNull: false,
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: { msg: "El email ya existe" },
      validate: {
        isEmail: {
          msg: "Agrega un correo válido",
        },
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },

    resetToken: {
      type: S.STRING,
      defaultValue: "",
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, timestamps: false, modelName: "user" }
);

//ANTES DE CREAR AL USUARIO USA LA FUNCION DE HASHEO PARA ENCRIPTAR LA PASSWORD

User.addHook("beforeCreate", (user) => {
  user.salt = crypto.randomBytes(20).toString("hex");
  user.password = user.hashPassword(user.password);
});
// ACA ESTA LA FUNCION HASH QUE USA EL BEFORE CREATE
User.prototype.hashPassword = function (password) {
  return crypto.createHmac("Sha1", this.salt).update(password).digest("hex");
};
// VALIDAMOS EL PASSWORD SI COINCIDE CON EL PASSWORD HASHEADO
User.prototype.validPassword = function (passwordEnLogin) {
  return this.password === this.hashPassword(passwordEnLogin);
};

module.exports = User;
