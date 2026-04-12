import mysql from "mysql2";
import dotenv from 'dotenv'
dotenv.config()

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "*****",
  database: "resilient_ci"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  } else {
    console.log("Connected to MySQL database");
  }
});

export default db;