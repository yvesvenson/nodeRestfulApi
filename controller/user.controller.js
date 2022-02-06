const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../config/validation');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    //DATA VALIDATION
    const {error} = await registerValidation(req.body);
    if(error) return res.json({ success: false, msg: error.details[0].message });

    //CHECK IF EMAIL ALREADY EXIST
    const emailExist = await userModel.findOne({ email: req.body.email });
    if(emailExist) return res.json({ success: false, msg: 'Email already exist.' });

    //ENCRYPT PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Gather Data
    let registerData = new userModel({
        password: hashedPassword,
        email: req.body.email,
        role: req.body.role
    });

    //SAVING DATA TO DB
    try{
        const savedRegisterData = await registerData.save();
        res.json({
            success: true
        });
    }catch(err){
        res.json({ success: false, data: err });
    }
}

const loginUser = async (req, res) => {
    //DATA VALIDATION
    const {error} = await loginValidation(req.body);
    if(error) return res.json({success: false, msg: error.details[0].message });

    //CHECK IF EMAIL DOESNT EXIST
    const user = await userModel.findOne({ email: req.body.email });
    if(!user) return res.json({ success: false, msg: 'Email doesn\'t exist.' });

    //COMPARE PASSWORD IF CORRECT
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.json({ success: false, msg: 'Password is incorrect.' });

    //ASSIGN TOKEN
    //NOTE: env still works in here
    const token = await jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET);
    res.json({
        success: true,
        id: user._id,
        token: `JWT ${token}`
    });
}

module.exports = {
    registerUser,
    loginUser
}