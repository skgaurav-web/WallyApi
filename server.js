const express = require("express");
const cors = require("cors");
const wallpaperRoutes = require("./routes/wallpaperRoutes");

require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/wallpapers", wallpaperRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
