const { getUsers } = require("../models/users");

exports.sendUsers = (req, res, next) => {
  const { username } = req.params;
  getUsers(username)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(next);
};
