const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const authorRoutes = require("./authorRoutes");
const bookRoutes = require("./bookRoutes");
const userRoutes = require("./userRoutes");

router.use("/auth", authRoutes);


router.use("/book", bookRoutes);
router.use("/user", userRoutes);
router.use("/author", authorRoutes);

module.exports = router;
