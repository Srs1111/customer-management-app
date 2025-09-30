const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./customerdb.sqlite", (err) => {
  if (err) {
    console.log("Error opening Db:", err.message);
  } else {
    console.log("Connected to Sqlite database");
  }
});
db.run("PRAGMA foreign_keys = ON;");
const path = require("path");
console.log("DB Path:", path.resolve("./customerdb.sqlite"));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          department TEXT,
          phone TEXT NOT NULL,
          email TEXT UNIQUE,
          city TEXT,
          state TEXT,
          pincode TEXT )`);

  db.run(`CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER,
    street TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    FOREIGN KEY(customerId) REFERENCES customers(id) ON DELETE CASCADE)`);
});

module.exports = db;
