const commentsRouter = require("express").Router();
const {
  sendPatchedComment,
  sendDeletedComment
} = require("../controllers/comments");
const { methodNotAllowed } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(sendPatchedComment)
  .delete(sendDeletedComment)
  .all(methodNotAllowed);

module.exports = { commentsRouter };
