const User = require("../models/index");
const jwt = require("jsonwebtoken");

const loginController = {
  loginUser(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (!user) return res.status(401).send("El usuario no existe");
        const isValid = user.validPassword(password);
        if (isValid !== true)
          return res.status(401).send("La password es incorrecta");

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            firsName: user.firstName,
            // iat: moment().unix(), //Guardamos la fecha en formato unix
            //Fecha de expiracion del token
            // exp: moment().add(30, "days").unix, //Damos 30 dias de duracion del token en formato unix para poder compara posteriormente
          },
          "PELICULAS"
        );
        return res.status(200).json({ token });
      })
      .catch((e) => {
        return res.status(401).send("Error en autenticación");
      });
  },
};

module.exports = loginController;
