const { Router } = require("express");
const URL = require("../models/url");

const router = Router();

// @route   /:code
// @desc    redirect to the longUrl
router.get("/:code", async (req, res) => {
  const code = req.params.code;
  const url = await URL.findOne({ urlCode: code });

  if (!url) {
    return res.status(404).send({ message: "url not found" });
  }

  res.redirect(301, url.longUrl);
});

module.exports = router;
