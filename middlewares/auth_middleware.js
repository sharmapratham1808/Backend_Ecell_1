const jwt = require("jsonwebtoken");
const User = require("../models/user_models.js");

const authMiddleware = async (req, res, next) => {
  
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  // console.log('token from auth middleware', jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token" });
  }
  next();
};

module.exports = authMiddleware;
