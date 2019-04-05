const connection = require("../db/connection");

exports.getUsers = username => {
  return connection
    .select("*")
    .from("users")
    .where("users.username", username);
};
