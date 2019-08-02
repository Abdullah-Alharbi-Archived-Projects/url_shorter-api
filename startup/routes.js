const index = require("../routes/index");
const url = require("../routes/url");

module.exports = function(app) {
  app.use("/", index);
  app.use("/api/url", url);
};
