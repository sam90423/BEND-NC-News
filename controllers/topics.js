const { getTopics } = require("../models/topics");

exports.sendTopics = (req, res, next) => {
  getTopics().then(topic => {
    res.status(200).send({ topics: topic });
  });
};
