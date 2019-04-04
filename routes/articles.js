const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendPatchedArticle
  //sendCommentsByArticleId
} = require("../controllers/articles");

articlesRouter.route("/").get(sendArticles);

articlesRouter.route("/:article_id").get(sendArticles);

articlesRouter.route("/:article_id/").patch(sendPatchedArticle);

//articlesRouter.route("/:article_id/comments").get(sendCommentsByArticleId);

module.exports = { articlesRouter };
