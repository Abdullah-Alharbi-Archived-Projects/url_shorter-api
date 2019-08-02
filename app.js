const serverDebugger = require("debug")("app:server");
const config = require("config");
const express = require("express");

const port = process.env.PORT || process.argv[2] || config.get("port") || 8000;

const app = express();

// Do not expose software used
app.disable("x-powered-by");

require("./startup/logger")(app);
require("./startup/database")();
require("./startup/config")(app);
require("./startup/middleware")(app);
require("./startup/routes")(app);

app.listen(port, () =>
  serverDebugger(`Listening on http://localhost:${port}/ ...`)
);
