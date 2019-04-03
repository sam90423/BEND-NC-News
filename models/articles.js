const connection = require("../db/connection");

exports.getArticles = (author, topic) => {
  return connection
    .select("*")
    .from("articles")
    .modify(query => {
      if (topic) query.where("topic", topic);
      else if (author) query.where("author", author);
    });
};
