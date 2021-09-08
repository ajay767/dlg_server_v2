const express = require("express");
const authController = require("./../controllers/authController");
const captchaController = require("./../controllers/captchaController");
const router = express.Router();

// router.route('/signup').post(authController.signUp);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/generateCaptcha", captchaController.generateCaptcha);
router.get("/getAllCaptcha", captchaController.getAll);
router.get("/getcurrentuser", authController.protect, authController.getuser);
router.patch(
  "/updateuser/:id",
  authController.protect,
  authController.updateuser
);
module.exports = router;
