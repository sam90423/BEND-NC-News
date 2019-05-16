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

  // if (
  //   [
  //     !("article_id",
  //     "title",
  //     "topic",
  //     "created_at",
  //     "votes",
  //     "comment_count",
  //     "author")
  //   ].includes(sort_by)
  // )
  //   return next({ code: 400 });
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
      console.log(valCol);
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
      console.log("hello");
      res.status(200).send({ articles: article });
    })
    .catch(next);

  // getArticles({ author, topic, sort_by, order })
  //   .then(article => {
  //     res.status(200).send({ articles: article });
  //   })
  //   .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;

  Promise.all([checkArticleId(article_id)])
    .then(([article]) => {
      //console.log(article);
      if (article.length === 0) return Promise.reject({ code: 404 });
      else return getArticleById(article_id);
    })
    .then(([article]) => {
      console.log(article);
      res.status(200).send({ article: article });
    })
    .catch(next);

  // if (article_id) {
  //   checkArticleId(article_id)
  //     .then(article => {
  //       console.log(article);
  //       if (article.length === 0) Promise.reject({ code: 404 });
  //       return article;
  //     })
  //     .catch(next)
  //     .then(() => {
  //       getArticleById(article_id)
  //         .then(([article]) => {
  //           // if (!["body"].includes(article)) return next({ status: 404 });
  //           res.status(200).send({ article: article });
  //         })
  //         .catch(next);
  //     });
  // } else {
  //   getArticleById(article_id)
  //     .then(([article]) => {
  //       // if (!["body"].includes(article)) return next({ status: 404 });
  //       res.status(200).send({ article: article });
  //     })
  //     .catch(next);
  // }
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

  // patchArticle(article_id, newVotes)
  //   .then(([patchedArticle]) => {
  //     res.status(200).send({ article: patchedArticle });
  //   })
  //   .catch(next);
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

  // deleteArticle(article_id)
  //   .then(deletedArticle => {
  //     if (!deletedArticle)
  //       res.status(404).send({ msg: `No article with a ${article_id}` });
  //     if (deletedArticle === 1) res.status(204).send();
  //   })
  //   .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;

  if (
    [
      !("article_id",
      "title",
      "topic",
      "created_at",
      "votes",
      "comment_count",
      "author")
    ].includes(sort_by)
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
      console.log(comments);
      res.status(200).send({ comments: comments });
    })
    .catch(next);

  // getCommentsById({ article_id, sort_by, order })
  //   .then(comment => {
  //     res.status(200).send({ comments: comment });
  //   })
  //   .catch(next);
};

exports.sendNewComment = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;
  console.log(Object.keys(newComment));

  // if (Object.keys(newComment).includes(!["username", "body"])) {
  //   return next({ code: 400 });
  // }
  Promise.all([checkArticleId(article_id)])
    .then(([article]) => {
      if (article.length === 0) return Promise.reject({ code: 404 });
      else return postComment(article_id, newComment);
    })
    .then(([postedComment]) => {
      res.status(201).send({ comment: postedComment });
    })
    .catch(err => {
      console.log(err, "helloshahsd");
      next(err);
    });

  // postComment(article_id, newComment)
  //   .then(([postedComment]) => {
  //     if (Object.keys(newComment).includes(!["username", "body"]))
  //       return next({ code: 400 });
  //     res.status(201).send({ comment: postedComment });
  //   })
  //   .catch(next);
};
