const { getArticles } = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  const { author, topic } = req.query;
  getArticles(author, topic).then(article => {
    res.status(200).send({ articles: article });
  });
};
