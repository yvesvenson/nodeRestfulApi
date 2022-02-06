const router = require('express').Router();
const imagesController = require('../controller/images.controller');

//GET IMAGE
router.get('/', imagesController.getImage);

module.exports = router