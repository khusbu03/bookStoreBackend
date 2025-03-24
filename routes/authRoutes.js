const express = require("express");
const router = express.Router();
const {login,signup,createAccessToken,updatePassword,verifyOTP,forgotPassword,changePassword}=require("../controllers/authController")
const {userAuth}=require("../middlewares/auth")

router.post("/login", login);
router.post("/signup", signup);
router.post("/generateAccessToken", createAccessToken);
router.post("/updatePassword",userAuth, updatePassword);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyOTP", verifyOTP);
router.post("/changePassword", changePassword);

module.exports = router;
