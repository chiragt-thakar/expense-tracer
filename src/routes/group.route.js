var express = require('express');
const auth = require('../middlewares/auth');
var router = express.Router();
const validate = require("../middlewares/validate.js");


router.route("/").post(auth,validate())
module.exports = router;
