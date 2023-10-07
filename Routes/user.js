const express = require("express");
const {
  register,
  login,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../Controllers/user");
const { Authenticate } = require("../middleware/Authenticate");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updatepassword").patch(Authenticate, updatePassword);
router.route("/forgotpassword").post(forgotPassword);
router.route("/reset/password/:resettoken").post(resetPassword);

module.exports = router;
