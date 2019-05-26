const {
  getArticles,
  getArticleById,
  patchArticle,
  deleteArticle,
  getCommentsById,
  postComment,
  checkTopic,
  checkAuthor,
  checkArticleId
} = require("../models/articles");

exports.sendArticles = (req, res, next) => {
  const { author, topic, sort_by, order } = req.query;

  if (
    sort_by &&
    [
      "article_id",
      "title",
      "topic",
      "created_at",
      "votes",
      "comment_count",
      "author"
    ].every(valCol => {
      Object.keys(sort_by).includes(valCol);
    })
  )
    return next({ code: 400 });

  Promise.all([checkAuthor(author), checkTopic(topic)])
    .then(([author, topic]) => {
      if (author.length === 0) {
        return Promise.reject({ code: 404 });
      } else if (topic.length === 0) {
        return Promise.reject({ code: 404 });
      } else if (author) {
        return getArticles({ author, topic, sort_by, order });
      } else if (topic) {
        return getArticles({ author, topic, sort_by, order });
      } else if (author === false && topic) {
        return Promise.reject({ code: 404 });
      } else if (topic === false && author) {
        return Promise.reject({ code: 404 });
      } else if (author === false && topic === false) {
        return getArticles({ author, topic, sort_by, order });
      }
    })
    .then(article => {
      res.status(200).send({ articles: article });
    })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;

  Promise.all([checkArticleId(article_id)])
    .then(([article]) => {
      if (article.length === 0) return Promise.reject({ code: 404 });
      else return getArticleById(article_id);
    })
    .then(([article]) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
};

exports.sendPatchedArticle = (req, res, next) => {
  const newVotes = req.body;
  const { article_id } = req.params;

  Promise.all([checkArticleId(article_id)])
    .then(([article]) => {
      if (article.length === 0) return Promise.reject({ code: 404 });
      else return patchArticle(article_id, newVotes);
    })
    .then(([patchedArticle]) => {
      res.status(200).send({ article: patchedArticle });
    })
    .catch(next);
};

exports.sendDeletedArticle = (req, res, next) => {
  const { article_id } = req.params;

  Promise.all([checkArticleId(article_id)])
    .then(([article]) => {
      if (article.length === 0) {
        return Promise.reject({ code: 404 });
      } else return deleteArticle(article_id);
    })
    .then(deletedArticle => {
      if (deletedArticle === 1) res.status(204).send();
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;

  if (
    sort_by &&
    [
      "article_id",
      "title",
      "topic",
      "created_at",
      "votes",
      "comment_count",
      "author"
    ].every(valCol => {
      Object.keys(sort_by).includes(valCol);
    })
  )
    return next({ code: 400 });

  Promise.all([checkArticleId(article_id)])
    .then(([article]) => {
      if (article.length === 0) return Promise.reject({ code: 404 });
      else {
        return getCommentsById({ article_id, sort_by, order });
      }
    })
    .then(comments => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};

exports.sendNewComment = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;

  Promise.all([checkArticleId(article_id)])
    .then(([article]) => {
      if (article.length === 0) return Promise.reject({ code: 404 });
      else return postComment(article_id, newComment);
    })
    .then(([postedComment]) => {
      res.status(201).send({ comment: postedComment });
    })
    .catch(err => {
      next(err);
    });
};
