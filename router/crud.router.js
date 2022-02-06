const router = require('express').Router();
const crudController = require('../controller/crud.controller');
const verify = require('../config/verifyToken');

router.post('/add/:userId', verify, crudController.addData);

router.get('/view', verify, crudController.viewAll);

router.get('/view/:id', verify, crudController.viewData);

router.patch('/update/:cruId/:userId', verify, crudController.updateData);

router.delete('/delete/:cruId/:userId', verify, crudController.deleteData);

module.exports = router;