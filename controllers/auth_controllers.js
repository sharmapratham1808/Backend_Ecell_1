const User = require("../models/user_models.js");

// -----------------------------< Home Page >-------------------------------------------------------

const Home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the Home page");
  } catch (error) {
    console.log(error);
  }
};

// -----------------------------< Registration Page >-------------------------------------------------------

const Register = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    // console.log(req.body);
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    // console.log(userCreated);
    res.status(201).json({
      msg: "Registration Successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

// -----------------------------------------< LOGIN PAGE >-------------------------------------------------------------------

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    // console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials " });
    }

    const isMatch = await userExist.comparePassword(password);
    if (isMatch) {
      res.status(200).send({
        msg: "Login Successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email and Password" });
    }
  } catch (error) {
    next(error);
  }
};

//- ------------------------User Logic-- Send user data----------------------------------------------------------------------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = { Home, Register, Login, user };
