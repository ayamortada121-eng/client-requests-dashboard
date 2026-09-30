const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./requests.db", (error) => {
  if (error) {
    console.error("Database error:", error.message);
  } else {
    console.log("Database connected!");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clientName TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New'
  )
`);

module.exports = db;