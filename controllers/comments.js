const { patchComment, deleteComment } = require("../models/comments");

exports.sendPatchedComment = (req, res, next) => {
  const { comment_id } = req.params;
  const newVotes = req.body;

  patchComment(comment_id, newVotes)
    .then(([patchedComment]) => {
      res.status(200).send({ patchedComment });
    })
    .catch(next);
};

exports.sendDeletedComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(deletedComment => {
      if (!deletedComment)
        res.status(404).send({ msg: `No comment with a ${comment_id}` });
      if (deletedComment === 1) res.status(204).send();
    })
    .catch(next);
};
