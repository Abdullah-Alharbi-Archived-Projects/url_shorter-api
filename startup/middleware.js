const { json } = require("express");
const helmet = require("helmet");
const cors = require("cors");

module.exports = function(app) {
  app.use(json());
  app.use(helmet());
  app.use(cors());
};
