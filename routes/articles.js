const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticleById,
  sendPatchedArticle,
  sendDeletedArticle,
  sendCommentsByArticleId,
  sendNewComment
} = require("../controllers/articles");
const { methodNotAllowed } = require("../errors");

articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(sendPatchedArticle)
  .delete(sendDeletedArticle)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticleId)
  .post(sendNewComment)
  .all(methodNotAllowed);

module.exports = { articlesRouter };
