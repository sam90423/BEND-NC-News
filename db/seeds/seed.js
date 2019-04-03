const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");

const { formatArticlesData } = require("../../utils/formatArticlesData");
const { formatCommentData } = require("../../utils/formatCommentData");
exports.seed = (connection, Promise) => {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      return connection("topics")
        .insert(topicsData)
        .returning("*");
    })
    .then(() => {
      return connection("users")
        .insert(usersData)
        .returning("*");
    })
    .then((users, topics) => {
      return connection("articles")
        .insert(formatArticlesData(articlesData, users, topics))
        .into("articles")
        .returning("*");
    })
    .then((articles, users) => {
      return connection("comments")
        .insert(formatCommentData(commentsData, articles, users))
        .into("comments")
        .returning("*");
    });
};
