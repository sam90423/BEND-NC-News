const connection = require("../db/connection");

exports.getArticles = ({
  author,
  topic,
  sort_by = "created_at",
  order = "desc"
}) => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .orderBy(sort_by, order)
    .modify(query => {
      if (topic) {
        console.log(topic);
        query.where("articles.topic", topic[0].slug);
      } else if (author) {
        console.log(author);
        query.where("articles.author", author[0].username);
      }
    });
};

exports.getArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .where("articles.article_id", article_id);
};

exports.checkArticleId = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .where("articles.article_id", article_id);
};

exports.checkTopic = topic => {
  if (topic) {
    return connection
      .select("topics.*")
      .from("topics")
      .where("topics.slug", topic);
  } else return false;
};

exports.checkAuthor = author => {
  if (author) {
    return connection
      .select("users.*")
      .from("users")
      .where("users.username", author);
  } else return false;
};

exports.patchArticle = (article_id, newVotes) => {
  return connection("articles")
    .where({ article_id })
    .increment({ votes: newVotes.inc_votes || 0 })
    .returning("*");
};

exports.deleteArticle = article_id => {
  return connection("articles")
    .where({ article_id })
    .del();
};

exports.getCommentsById = ({
  article_id,
  sort_by = "created_at",
  order = "desc"
}) => {
  console.log(article_id);
  return connection("comments").where("comments.article_id", article_id);
  // .orderBy(sort_by, order);
};

exports.postComment = (article_id, newComment) => {
  console.log(newComment, "hello");
  return connection("comments")
    .insert({
      article_id,
      author: newComment.username,
      body: newComment.body
    })
    .returning([
      "comments.comment_id",
      "comments.votes",
      "comments.created_at",
      "comments.author",
      "comments.body"
    ]);
};
