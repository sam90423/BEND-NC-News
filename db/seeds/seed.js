const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");

exports.seed = (connection, Promise) => {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      return connection
        .insert(topicsData)
        .into("topics")
        .returning("*");
      // insert data
    });
};
