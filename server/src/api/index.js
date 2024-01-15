const express = require("express");

const user = require("./auth");
const conversation = require("./conversation");

const router = express.Router();

router.use("/auth", user);
router.use("/conversation", conversation);

module.exports = router;
