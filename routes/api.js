const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { topicsRouter } = require("./topics");
const { articlesRouter } = require("./articles");
const { commentsRouter } = require("./comments");
const { usersRouter } = require("./users");

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use("/topics", topicsRouter).all(methodNotAllowed);

apiRouter.use("/articles", articlesRouter).all(methodNotAllowed);

apiRouter.use("/comments", commentsRouter).all(methodNotAllowed);

apiRouter.use("/users", usersRouter).all(methodNotAllowed);

module.exports = apiRouter;
