var express = require("express");
var router = express.Router();
const connection = require("../config/db");
const sha1 = require("sha1");
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
