const router = require('express').Router();
const resetController = require('../controller/reset.controller');

router.post('/', resetController.resetPassword);
router.patch('/changePassword/:token', resetController.changePassword);

module.exports = router;