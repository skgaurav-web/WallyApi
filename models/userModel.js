const { sql, poolPromise } = require("../config/database");
const bcrypt = require("bcryptjs");  // or "bcrypt" if you installed that package

class UserModel {
  static async registerUser(name, email, phone, password, profilePic, instaLink, threadsLink, xLink, userRole = "user") {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("email", sql.VarChar, email)
        .input("phone", sql.VarChar, phone)
        .input("userRole", sql.VarChar, userRole)
        .input("password", sql.VarChar, hashedPassword)
        .input("profilePic", sql.VarChar, profilePic)
        .input("instaLink", sql.VarChar, instaLink)
        .input("threadsLink", sql.VarChar, threadsLink)
        .input("xLink", sql.VarChar, xLink)
      
        .query(
          "INSERT INTO Users (name, email, phone, password, profilePic, instaLink, threadsLink, xLink, userRole) " +
          "OUTPUT INSERTED.id VALUES (@name, @email, @phone,  @password, @profilePic, @instaLink, @threadsLink, @xLink, @userRole)"
        );
  
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }
  

  static async findByEmail(email) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM Users WHERE email = @email");
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
