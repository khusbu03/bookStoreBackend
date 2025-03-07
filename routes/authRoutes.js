const express = require("express");
const router = express.Router();
const {login}=require("../controllers/authController")

router.post("/login", login);
router.post("/signup", signup);
router.post("/updatePassword",userAuth, forgotPassword);
router.post("/forgotPassword", forgotPassword);

module.exports = router;
