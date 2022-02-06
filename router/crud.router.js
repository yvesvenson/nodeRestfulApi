const router = require('express').Router();
const crudController = require('../controller/crud.controller');

router.post('/add', crudController.addData);

router.get('/view', crudController.viewAll);

router.get('/view/:id', crudController.viewData);

router.patch('/update/:id', crudController.updateData);

router.delete('/:id', crudController.deleteData);

module.exports = router;