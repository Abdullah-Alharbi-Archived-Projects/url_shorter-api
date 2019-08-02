const { Router } = require("express");
const URL = require("../models/url"); // the model

const router = Router(); // initialize express router

// @route   /:code
// @desc    redirect to the longUrl
router.get("/:code", async (req, res) => {
  const code = req.params.code; // get the code
  const url = await URL.findOne({ urlCode: code }); // find the code

  // if code not exists
  if (!url) {
    return res.status(404).send({ message: "url not found" }); // return 404 NOT Found response
  }

  res.redirect(301, url.longUrl); // if the url is exists then redirect
});

module.exports = router;
