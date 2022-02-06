const crudModel = require('../model/crud.model');
//CREATE
const addData = async (req, res) => {
    //GATHER DATA
    let addData = new crudModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email: req.body.email
    });
    //SAVING DATA
    try{
        const savedAddData = await addData.save();
        res.status(200).json(savedAddData);
    }catch(err){
        res.status(400).json(err);
    }
}

//READ ALL
const viewAll = async (req, res) => {
    try{
    const viewData = await crudModel.find();
    res.status(200).json(viewData);
    }
    catch(err){
        res.status(400).json(err);
    }
}

//READ SPECIFIC
const viewData = async (req, res) => {
    try{
        await crudModel.findOne({ _id: req.params.id });
        res.status(200).json({ success: true });
    }catch(err){
        res.status(400).json({ success: false, data: err });
    }
}

//UPDATE SPECIFC
//UPDATEONE WILL UPDATE ONLY FOR ONE FIELD
//UPDATEMANY WILL UPDATE FOR MANY EVEN FOR OTHER FIELD
const updateData = async (req, res) => {
    try{
        const updatedData = await crudModel.updateMany(
            { 
                _id: req.params.id
            },
            { 
                $set: { 
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    mobile: req.body.mobile,
                    email: req.body.email
                }
            });
        res.status(200).json(updatedData);
    }catch(err){
        res.status(400).json(err);
    }
}

//DELETE SPECIFIC
const deleteData = async (req, res) => {
    try{
        await crudModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true });
    }catch(err){
        res.status(400).json({ success: false, data: err });
    }
}



module.exports = {
    addData,
    deleteData,
    viewAll,
    viewData,
    updateData
}