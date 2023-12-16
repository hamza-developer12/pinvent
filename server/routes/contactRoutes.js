const express = require("express")
const router = express.Router();
const contactUs = require("../controllers/contactController");
const protectedRoute = require("../middlewares/authMiddleware");

router.post("/", contactUs);
module.exports = router;