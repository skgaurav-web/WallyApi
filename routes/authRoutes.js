const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyToken, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Example of a protected admin route
router.get("/admin/dashboard", verifyToken, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;
