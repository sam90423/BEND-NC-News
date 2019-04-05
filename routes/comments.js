const commentsRouter = require("express").Router();
const {
  sendPatchedComment,
  sendDeletedComment
} = require("../controllers/comments");

commentsRouter.route("/:comment_id").patch(sendPatchedComment);

commentsRouter.route("/:comment_id").delete(sendDeletedComment);

module.exports = { commentsRouter };
