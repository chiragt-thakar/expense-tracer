const express = require("express");
const router = express.Router();
const {registerValidation, loginValidation} = require('../validations/auth.validation.js');
const validate = require('../middlewares/validate.js');
const {registerController, loginController, logoutController, refreshTokenController} = require('../controller/auth.controller.js');
const auth = require("../middlewares/auth.js");


router.route("/register").post(validate(registerValidation), registerController);
router.route("/login").post(validate(loginValidation), loginController);
router.route("/logout").post(auth, logoutController);
router.route("/refresh/token").post(auth, refreshTokenController);



module.exports = router;
