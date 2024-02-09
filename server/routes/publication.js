const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publication");
const check = require("../middlewares/auth");
const {imagePublication} = require("../middlewares/imagePublication");

router.post("/save", [check.auth, imagePublication.single("file0")], publicationController.save)

module.exports = router;