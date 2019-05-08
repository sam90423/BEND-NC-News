const { getUsers, checkUserId } = require("../models/users");

exports.sendUsers = (req, res, next) => {
  const { username } = req.params;

  Promise.all([checkUserId(username)])
    .then(([user]) => {
      if (user.length === 0) return Promise.reject({ code: 404 });
      else return getUsers(username);
    })
    .then(([user]) => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};
