const User = require("../models/User");
const Favorite = require("../models/Favorite");

const userController = {
  find(req, res, next) {
    User.findAll()
      .then((users) => res.send(users))
      .catch((e) => res.sendStatus(500));
  },
  findOnlyUser(req, res, next) {
    User.findByPk(req.params.id)
      .then((user) => {
        console.log(user, "useerrrrrrrrrrrrrr");
        res.send(user);
      })

      .catch((e) => res.sendStatus(500));
  },
  favorites(req, res, next) {
    const { userId, mov } = req.body;
    // console.log(req.body);
    // if (mov) {
    //   console.log("esta pelicula ya esta en la base de datos");
    // }
    Favorite.create({ userId, movie: mov }) //pasar datos aca bien por eso me devolvia null la base de datos
      .then((data) => {
        //   console.log(data.movie, "datttttttttttttttttaaaaaaaa");
        //  console.log(mov, "movvvvvvvvvvvvv");
        res.send(data);
      })
      .catch((err) => res.send(err));
  },
  deleteFav(req, res, next) {
    const { userId, mov } = req.params;
    console.log(req.params);
    Favorite.destroy({
      where: {
        userId: userId,
        movie: mov,
      },
    })
      .then((deleted) => {
        console.log(deleted);
        res.send(req.params);
      })
      .catch(() => res.sendStatus(500));
  },
  favId(req, res, next) {
    console.log(req.params, "ruta favoritossssssssssssssss");
    Favorite.findAll({ where: { userId: req.params.id } })
      .then((favorites) => {
        res.send(favorites);
      })
      .catch((e) => res.sendStatus(500));
  },
};

module.exports = userController;
