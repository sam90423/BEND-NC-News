const { getArticles } = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  getArticles().then(article => {
    res.status(200).send({ articles: article });
  });
};
