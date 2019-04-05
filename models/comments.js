const connection = require("../db/connection");

exports.patchComment = (comment_id, newVotes) => {
  console.log(newVotes);
  return connection("comments")
    .where({ comment_id })
    .increment({ votes: newVotes.inc_votes })
    .returning("*");
};
