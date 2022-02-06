const mongoose = require('mongoose');

const crudSchema = mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true }
});

module.exports = mongoose.model('Crud', crudSchema);