const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

    //UPDATE RESET LINK
    await userModel.updateOne(
        { _id: user._id },
        { $set: { resetLink: token }}
    );

    //SENDING MAIL
    sgMail.setApiKey(sg_API_KEY);
    const message = {
        to: email,
        from: 'yvesvensonceballos@gmail.com',
        subject: 'Account Activation Link',
        html: `
            <h2>Please click on the link to <a href="yourDomainHere/reset/changePassword/${token}">reset</a> your password.</h2>
            <p>${token}</p>
        `
    }

    sgMail
    .send(message)
    .then(response => res.status(200).json({success: true}))
    .catch(error => res.status(500).json(error.message));
}

const changePassword = async (req, res) => {
    //ENCRYPT PASSWORD
    const newPassword = req.body.newPassword;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const resetLink = req.params.token;

    await userModel.updateMany(
        { resetLink: resetLink },
        { $set: { 
            resetLink: '',
            password: hashedPassword
        }}
    );

    //res.status(200).json({success: true});


    //res.send(newPassword + ' xx ' + resetLink);
    //Change Password
    try {
        const verifyLink = await jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function(error){
            if(error){
                return res.status(400).json({error: 'User with this token does not exist.'});
            }

            //SET RESET LINK TO NULL AND CHANGED PASSWORD
            userModel.updateOne(
                { resetLink },
                { $set: { 
                    resetLink: null,
                    password: hashedPassword
                }}
            );

            res.status(200).json({success: true});

        });

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    resetPassword,
    changePassword
}