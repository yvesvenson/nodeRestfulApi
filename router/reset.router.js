const router = require('express').Router();
const resetController = require('../controller/reset.controller');

router.post('/', resetController.resetPassword);

module.exports = router;