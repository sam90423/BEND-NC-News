const connection = require("../db/connection");

exports.getArticles = ({
  author,
  topic,
  sort_by = "created_at",
  order = "desc",
  article_id,
  newVotes
}) => {
  console.log(article_id, newVotes);
  //console.log(newVotes.inc_votes);
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .modify(query => {
      if (article_id) query.where("articles.article_id", article_id);
    })
    .modify(query => {
      if (article_id && newVotes)
        query
          .where("articles.article_id", article_id)
          .increment("votes", newVotes.inc_votes);
    })
    .orderBy(sort_by, order)
    .modify(query => {
      if (topic) query.where("articles.topic", topic);
      else if (author) query.where("articles.author", author);
    });
};

exports.patchArticle = (article_id, newVotes) => {
  console.log(newVotes);
  return connection("articles")
    .where({ article_id })
    .increment({ votes: newVotes.inc_votes })
    .returning("*");
};

exports.deleteArticle = article_id => {
  return connection("articles")
    .where({ article_id })
    .del();
};

exports.getCommentsById = article_id => {
  return connection("comments").where({ article_id });
};
