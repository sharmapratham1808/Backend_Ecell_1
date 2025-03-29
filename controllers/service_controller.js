const Service = require("../models/service_model.js");

const service = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ msg: "No Service Found!!!" });
      return;
    }
    res.status(200).json({ message: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = service;
