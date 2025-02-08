const WallpaperModel = require("../models/wallpaperModel");

exports.uploadWallpaper = async (req, res) => {
  try {
    const { name, type, isPremium, imageUrl, collectionName } = req.body;
    const userId = req.user.userId; // User from authentication

    if (!name || !type || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newWallpaper = await WallpaperModel.uploadWallpaper(
      name,
      type,
      isPremium,
      userId,
      imageUrl,
      collectionName
    );

    res.status(201).json({ message: "Wallpaper uploaded successfully", wallpaperId: newWallpaper.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllWallpapers = async (req, res) => {
  try {
    const wallpapers = await WallpaperModel.getAllWallpapers();
    res.status(200).json(wallpapers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.likeWallpaper = async (req, res) => {
  try {
    const { wallpaperId } = req.body;
    const userId = req.user.userId;

    const liked = await WallpaperModel.likeWallpaper(userId, wallpaperId);
    if (liked) {
      res.status(200).json({ message: "Wallpaper liked" });
    } else {
      res.status(400).json({ message: "Wallpaper already liked" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.unlikeWallpaper = async (req, res) => {
  try {
    const { wallpaperId } = req.body;
    const userId = req.user.userId;

    const unliked = await WallpaperModel.unlikeWallpaper(userId, wallpaperId);
    if (unliked) {
      res.status(200).json({ message: "Wallpaper unliked" });
    } else {
      res.status(400).json({ message: "Wallpaper not liked" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLikedWallpapers = async (req, res) => {
  try {
    const userId = req.user.userId;
    const likedWallpapers = await WallpaperModel.getLikedWallpapers(userId);
    res.status(200).json(likedWallpapers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
