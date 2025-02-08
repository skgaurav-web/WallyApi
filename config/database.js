const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,  // Ensure this is a STRING
    database: process.env.DB_NAME,
    
  options: {
    encrypt: false, // Set to true for Azure SQL
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed! ", err);
    process.exit(1);
  });

module.exports = { sql, poolPromise };
