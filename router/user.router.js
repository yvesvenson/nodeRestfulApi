const router = require('express').Router();
const userController = require('../controller/user.controller');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;