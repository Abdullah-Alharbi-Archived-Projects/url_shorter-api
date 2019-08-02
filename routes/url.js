const serverDebugger = require("debug")("app:server");
const config = require("config");
const { Router } = require("express");
const { isUri } = require("valid-url");
const shortId = require("shortid");
const URL = require("../models/url");

const router = Router();

// @route   POST /api/url/shorten
// @desc    create short url
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = "http://localhost:8001";

  if (!isUri(longUrl)) {
    return res.status(400).send({ message: "Invalid base url." });
  }

  if (!isUri(longUrl)) {
    return res.status(400).send({ message: "Invalid url." });
  }

  try {
    let url = await URL.findOne({ longUrl });
    if (url) {
      res.send({ url });
    } else {
      // generate code
      const code = shortId.generate();
      const shortUrl = baseUrl + "/" + code;

      url = new URL({ urlCode: code, longUrl, shortUrl });

      url = await url.save();

      res.send({ url });
    }
  } catch (O_O) {
    serverDebugger("Got error %o", O_O);
    res.status(500).send({ message: "Unable to short the link." });
  }
});

module.exports = router;
