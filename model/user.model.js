const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user'},
    resetLink: { type: String, default: ''},
});

module.exports = mongoose.model('User', userSchema);