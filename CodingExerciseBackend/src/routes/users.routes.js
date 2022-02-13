const express = require('express');
const userControllers = require('../Controllers/user.controller.js');
const router = express.Router();

router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.post('/github', userControllers.github);
router.get('/favorites', userControllers.getFavorites);
router.post('/favorites', userControllers.postFavorite);

module.exports = router;