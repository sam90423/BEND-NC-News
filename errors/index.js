exports.badRequest = (err, req, res, next) => {
  const badRequestCodes = ["22P02", "42703", "23502"];
  if (badRequestCodes.includes(err.code) || err.code === 400) {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.routeNotFound = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).send({ msg: "Route Not Found" });
  } else next(err);
};

exports.methodNotAllowed = (err, req, res, next) => {
  if (err.code === 405) {
    res.status(405).send({ msg: "Method Not Allowed" });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
