const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const {emailValidation} = require('../config/validation');
const sgMail = require('@sendgrid/mail');
const sg_API_KEY = process.env.SG_API_KEY;

const resetPassword = async (req, res) => {

    //DATA VALIDATION
    const {error} = await emailValidation(req.body);
    if(error) return res.json({ success: false, msg: error.details[0].message });

    const {email} = req.body;

    //CHECK IF EMAIL DOESNT EXIST
    const user = await userModel.findOne({ email: email });
    if(!user) return res.status(400).json({ success: false, msg: 'Email doesn\'t exist.' });

    //ASSIGN TOKEN
    const token = await jwt.sign({ _id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});

    //SENDING MAIL
    sgMail.setApiKey(sg_API_KEY);
    const message = {
        to: email,
        from: 'yvesvensonceballos@gmail.com',
        subject: 'Account Activation Link',
        html: `
            <h2>Please click on the link to <a href="http://yourDomain.com/${token}">reset</a> your password.</h2>
            <p>${token}</p>
        `
    }

    sgMail
    .send(message)
    .then(response => res.status(200).json({success: true}))
    .catch(error => res.status(500).json(error.message));
}

module.exports = {
    resetPassword
}