const User = require('../models/user_models.js')
const Contact = require("../models/contact_models.js")

// --------------------------------------< Get all Users >----------------------------------------------------------------------------------

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        // console.log(users);                  
        if(!users || users.length === 0){
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
    }
}

// ------------------------------------< Update user by admin >-----------------------------------------------------------

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;

        const updatedData = await User.updateOne({ _id: id }, {
            $set: updateUserData,
        })

        return res.status(200).json(updatedData)
    } catch (error) {
        console.log(error);
    }
}

// ------------------------------------< Delete user by admin >-----------------------------------------------------------

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});
        return res.status(200).json({message: "User Deleted Successfully"})
    } catch (error) {
        console.log(error);
    }
}


// ------------------------------------< Edit user by admin >-----------------------------------------------------------

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password: 0});

        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

// ------------------------------------------< Get all contact >-------------------------------------------------------------------------

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        // console.log(contacts);
        if(!contacts || contacts.length === 0){
            return res.status(404).json({ message: "No contacts Found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
    }
}

// ------------------------------------< Delete contacts by admin >-----------------------------------------------------------

const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id});
        return res.status(200).json({message: "Contact Deleted Successfully"})
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById };