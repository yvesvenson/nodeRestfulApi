const router = require('express').Router();
const crudController = require('../controller/crud.controller');
const verify = require('../config/verifyToken');

router.post('/add', verify, crudController.addData);

router.get('/view', verify, crudController.viewAll);

router.get('/view/:id', verify, crudController.viewData);

router.patch('/update/:id', verify, crudController.updateData);

router.delete('/:id', verify, crudController.deleteData);

module.exports = router;