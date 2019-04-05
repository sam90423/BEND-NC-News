const { patchComment } = require("../models/comments");

exports.sendPatchedComment = (req, res, next) => {
  const { comment_id } = req.params;
  const newVotes = req.body;

  patchComment(comment_id, newVotes)
    .then(([patchedComment]) => {
      res.status(200).send({ patchedComment });
    })
    .catch(next);
};
