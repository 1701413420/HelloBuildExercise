const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const usersRouter = require('./src/routes/users.routes.js');
const port = 3000;

// Configs
const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});