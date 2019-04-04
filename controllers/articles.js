const { getArticles, patchArticle } = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  const { author, topic, sort_by, order } = req.query;
  const { article_id } = req.params;
  console.log(article_id);
  getArticles({ author, topic, sort_by, order, article_id }).then(article => {
    res.status(200).send({ articles: article });
  });
  //.catch(next);
};

exports.sendPatchedArticle = (req, res, next) => {
  const newVotes = req.body;
  const { article_id } = req.params;

  patchArticle(article_id, newVotes)
    .then(([patchedArticle]) => {
      res.status(200).send({ articles: patchedArticle });
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  getArticles(article_id)
    .then(article => {
      console.log(article);
      getComments(article);
    })
    .then(comment => {
      res.status(200).send({ comments: comment });
    });
};
