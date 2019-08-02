const serverDebugger = require("debug")("app:server");
const { Router } = require("express");
const { isUri } = require("valid-url"); // this function will validate the url from the client
const { generate } = require("shortid"); // this function will generate short id which well be used for url code
const URL = require("../models/url"); // the model

const router = Router(); // initialize express router

// @route   POST /api/url/shorten
// @desc    create short url
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body; // get the url from client
  const baseUrl = "http://localhost:8001"; // domain name

  if (!isUri(baseUrl)) {
    // validate the domain is valid to use
    return res.status(400).send({ message: "Invalid base url." });
  }

  if (!isUri(longUrl)) {
    // validate the given url from client
    return res.status(400).send({ message: "Invalid url." });
  }

  try {
    let url = await URL.findOne({ longUrl }); // try to find the given url
    if (url) {
      res.send({ url }); // if exists send the url back
    } else {
      // generate code
      const code = generate(); // generate short id
      const shortUrl = baseUrl + "/" + code; // this well redirect the user to the given url

      url = new URL({ urlCode: code, longUrl, shortUrl }); // save the url code, given url, generated url

      url = await url.save(); // save the record

      res.send({ url }); // return the url object
    }
  } catch (O_O) {
    serverDebugger("Got error %o", O_O);
    res.status(500).send({ message: "Unable to short the link." });
  }
});

router.get("/", async (req, res) => {
  const urls = await URL.find(); // get all the records
  res.send({ urls }); // return the urls array
});

module.exports = router;
