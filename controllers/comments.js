const {
  patchComment,
  deleteComment,
  checkCommentId
} = require("../models/comments");

exports.sendPatchedComment = (req, res, next) => {
  const { comment_id } = req.params;
  const newVotes = req.body;

  Promise.all([checkCommentId(comment_id)])
    .then(([comment]) => {
      if (comment.length === 0) return Promise.reject({ code: 404 });
      else return patchComment(comment_id, newVotes);
    })
    .then(([comment]) => {
      res.status(200).send({ comment: comment });
    })
    .catch(next);
};

exports.sendDeletedComment = (req, res, next) => {
  const { comment_id } = req.params;

  Promise.all([checkCommentId(comment_id)])
    .then(([comment]) => {
      if (comment.length === 0) return Promise.reject({ code: 404 });
      else return deleteComment(comment_id);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
