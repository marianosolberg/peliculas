const User = require("../models/index");

const registerController = {
  create(req, res) {
    User.create(req.body).then((user) => {
      res.send(user);
    });
  },
};
module.exports = registerController;
