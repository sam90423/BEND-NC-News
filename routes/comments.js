const commentsRouter = require("express").Router();
const { sendPatchedComment } = require("../controllers/comments");

commentsRouter.route("/:comment_id").patch(sendPatchedComment);

module.exports = { commentsRouter };
