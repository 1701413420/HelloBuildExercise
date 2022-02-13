const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
var cors = require('cors')
var db = require("./database.js");
const saltRounds = 10;
const bcrypt = require('bcrypt');
var request = require('request');
const port = 3000;

// parse application/json
app.use(bodyParser.json())

// config dotenv
dotenv.config();

app.use(cors())

app.get('/', (req, res) => {
    res.send('Server is running!')
})

app.post('/login', function (req, res) {
    var sql = "select * from user where email = ?";
    db.get(sql, [req.body.email], (err, row) => {
        if (err) {
            res.status(400).json({ "message": `Bad request, ${err.message}` });
            return;
        }
        if (!row) {
            res.status(404).json({ "message": "User not found" });
            return;
        }
        bcrypt.compare(req.body.password, row.password, function (err, result) {
            if (!result) {
                res.status(401).json({ "message": 'Wrong password' });
                return;
            }
            res.status(200).json({ id: row.id, name: row.name, email: row.email });
        });
    });
});

app.post('/register', function (req, res) {
    var errors = []
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (!req.body.password) {
        errors.push("No password specified");
    }
    if (!req.body.email) {
        errors.push("No email specified");
    }
    if (errors.length) {
        res.status(400).json({ "message": errors.join(", ") });
        return;
    }
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
        var params = [req.body.name, req.body.email, hash]
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "message": err.message })
                return;
            }
            res.status(200).json({ "message": "user created" })
        });
    });
});

app.post('/github', function (req, res) {
    var errors = []
    if (!req.body.code) {
        errors.push("No code specified");
    }
    const body = {
        code: req.body.code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }

    var clientServerOptions = {
        uri: 'https://github.com/login/oauth/access_token',
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    request(clientServerOptions, function (err, response) {
        if (err) {
            res.status(400).json({ "message": 'An error has ocurred' });
            return;
        }
        const data = JSON.parse(response.body);
        if (data.error) {
            res.status(400).json({ "message": `An error has ocurred, ${data.error_description}` });
            return;
        }
        res.status(200).json({ access_token: data.access_token })
    });
});

app.get('/favorites', (req, res) => {
    var sql = "select * from favorite where user_id = ?";
    db.all(sql, [req.query.id], (err, row) => {
        if (err) {
            res.status(400).json({ "message": `Bad request, ${err.message}` });
            return;
        }
        if (!row) {
            res.status(404).json({ "message": "User not found" });
            return;
        }
        res.status(200).json(row);
    });
})

app.post('/favorites', function (req, res) {
    var errors = []
    if (!req.body.user_id) {
        errors.push("No user_id specified");
    }
    if (!req.body.repository_id) {
        errors.push("No repository_id specified");
    }
    if (errors.length) {
        res.status(400).json({ "message": errors.join(", ") });
        return;
    }
    var sql = "select * from user where id = ?";
    db.get(sql, [req.body.user_id], (err, row) => {
        if (err) {
            res.status(400).json({ "message": `Bad request, ${err.message}` });
            return;
        }
        if (!row) {
            res.status(404).json({ "message": "User not found" });
            return;
        }
        if (req.body.is_favorite) {
            var sql = 'DELETE from favorite where user_id= ? AND repository_id = ?';
            db.run(sql, [req.body.user_id, req.body.repository_id], function (error, result) {
                if (error) {
                    res.status(400).json({ "message": error.message })
                    return;
                }
                res.status(200).json({ "message": "favorite deleted" })
            });
        } else {
            var insert = 'INSERT INTO favorite (user_id, repository_id) VALUES (?,?)';
            db.run(insert, [req.body.user_id, req.body.repository_id], function (error, result) {
                if (error) {
                    res.status(400).json({ "message": error.message })
                    return;
                }
                res.status(200).json({ "message": "favorite added" })
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});