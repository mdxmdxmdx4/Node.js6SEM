const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tgbot.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY, chat_id INTEGER UNIQUE)");
});

module.exports = db;
