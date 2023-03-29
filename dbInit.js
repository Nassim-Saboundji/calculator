const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data.db')

db.serialize(() => {
    try {
        db.run(`DROP TABLE IF EXISTS users`)
        db.run(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL
            );
        `);
    } catch (error) {
        console.log(error)
    }
});

db.close();