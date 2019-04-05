const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendPatchedArticle,
  sendDeletedArticle,
  sendCommentsByArticleId,
  sendNewComment
} = require("../controllers/articles");

articlesRouter.route("/").get(sendArticles);

articlesRouter.route("/:article_id").get(sendArticles);

articlesRouter.route("/:article_id/").patch(sendPatchedArticle);

articlesRouter.route("/:article_id").delete(sendDeletedArticle);

articlesRouter.route("/:article_id/comments").get(sendCommentsByArticleId);

articlesRouter.route("/:article_id/comments").post(sendNewComment);

module.exports = { articlesRouter };
