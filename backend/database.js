const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (it will create 'ideas.db' if it doesn't exist)
const db = new sqlite3.Database('./ideas.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create ideas table if it doesn’t exist
    db.run(`
      CREATE TABLE IF NOT EXISTS ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

module.exports = db;
