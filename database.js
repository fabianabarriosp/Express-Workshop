const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db', (err) => {
if (err) {
console.error(err.message);
}
console.log('Connected to the SQLite database.');
});
db.serialize(() => {
db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created or already exists.');
    }
  });   
});
module.exports = db;