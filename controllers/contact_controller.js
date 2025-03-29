const Contact = require('../models/contact_models.js');

const ContactForm = async (req, res) => {
    try {
        const response = req.body;
        // console.log(response);
        await Contact.create(response);
        return res.status(200).json({message: "Message sent Successfully"});
    } catch (error) {
        res.status(500).json({ message: "Message not delivered"})
    }
}

module.exports = ContactForm;