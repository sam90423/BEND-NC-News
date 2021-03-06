const connection = require("../db/connection");

exports.patchComment = (comment_id, newVotes) => {
  return connection("comments")
    .where({ comment_id })
    .increment({ votes: newVotes.inc_votes })
    .returning("*");
};

exports.checkCommentId = comment_id => {
  return connection("comments").where({ comment_id });
};

exports.deleteComment = comment_id => {
  return connection("comments")
    .where({ comment_id })
    .del();
};
