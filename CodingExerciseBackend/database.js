var sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
			(err) => {
				if (err) {
					// Table already created
				} else {
					// Table just created, creating some rows
					var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
					bcrypt.hash("user123456", saltRounds, function (err, hash) {
						db.run(insert, ["user1", "user1@example.com", hash]);
					});
					bcrypt.hash("user123456", saltRounds, function (err, hash) {
						db.run(insert, ["user2", "user2@example.com", hash]);
					});
				}
			});
		db.run(`CREATE TABLE favorite (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER, 
                repository_id text
                )`,
			(err) => {
				if (err) {
					// Table already created
				} else {
					// Table just created
					var insert = 'INSERT INTO favorite (user_id, repository_id) VALUES (?,?)';
					db.run(insert, [1, "haha1"]);
					db.run(insert, [2, "haha2"]);
				}
			});
	}
});

module.exports = db
