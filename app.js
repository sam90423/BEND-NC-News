const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500, badRequest } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => routeNotFound({ code: 404 }, req, res, next));

app.use(badRequest);
app.use(routeNotFound);
app.use(handle500);

module.exports = app;
