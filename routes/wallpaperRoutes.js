const express = require("express");
// const { uploadWallpaper, getAllWallpapers } = require("../controllers/wallpaperController");

const { uploadWallpaper, getAllWallpapers, likeWallpaper, unlikeWallpaper, getLikedWallpapers } =
 require("../controllers/wallpaperController");


const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect routes with authentication middleware
// router.post("/upload", authMiddleware, uploadWallpaper);

// router.post("/like", authMiddleware, likeWallpaper);
// router.post("/unlike", authMiddleware, unlikeWallpaper);
// router.get("/liked", authMiddleware, getLikedWallpapers);
router.get("/all", getAllWallpapers);
router.post("/upload", authMiddleware.verifyToken, uploadWallpaper);
router.post("/like", authMiddleware.verifyToken, likeWallpaper);
router.post("/unlike", authMiddleware.verifyToken, unlikeWallpaper);
router.get("/liked", authMiddleware.verifyToken, getLikedWallpapers);


module.exports = router;
