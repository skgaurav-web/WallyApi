const { sql, poolPromise } = require("../config/database");

class WallpaperModel {
  static async likeWallpaper(userId, wallpaperId) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("wallpaperId", sql.Int, wallpaperId)
        .query(
          "IF NOT EXISTS (SELECT 1 FROM LikedWallpapers WHERE userId = @userId AND wallpaperId = @wallpaperId) " +
          "BEGIN INSERT INTO LikedWallpapers (userId, wallpaperId) VALUES (@userId, @wallpaperId) END"
        );
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  }
  static async unlikeWallpaper(userId, wallpaperId) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("wallpaperId", sql.Int, wallpaperId)
        .query(
          "DELETE FROM LikedWallpapers WHERE userId = @userId AND wallpaperId = @wallpaperId"
        );
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  }
  static async uploadWallpaper(name, type, isPremium, userId, imageUrl, collectionName) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("type", sql.VarChar, type) // "single" or "collection"
        .input("isPremium", sql.Bit, isPremium)
        .input("userId", sql.Int, userId)
        .input("imageUrl", sql.VarChar, imageUrl)
        .input("collectionName", sql.VarChar, collectionName)
        .query(
          "INSERT INTO Wallpapers (name, type, isPremium, userId, imageUrl, collectionName) OUTPUT INSERTED.id VALUES (@name, @type, @isPremium, @userId, @imageUrl, @collectionName)"
        );
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }
  static async getLikedWallpapers(userId) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .query(
          "SELECT w.* FROM Wallpapers w " +
          "JOIN LikedWallpapers lw ON w.id = lw.wallpaperId " +
          "WHERE lw.userId = @userId"
        );
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }
  static async getAllWallpapers() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM Wallpapers");
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = WallpaperModel;
