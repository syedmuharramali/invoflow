const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/user.controller.js');
const auth = require("../middleware/user.middleware.js")

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);

module.exports = router;