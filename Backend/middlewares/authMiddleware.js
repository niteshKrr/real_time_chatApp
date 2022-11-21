const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      // verify token
      const userId  = jwt.verify(token, process.env.JWT_KEY);

      console.log(userId.result.userId);

      //get user from token
      req.user = await User.findById(userId.result.userId).select("-password");
      next();
      console.log(req.user);
    } catch (err) {
      res.status(401).send(err);
    }
  }

  if (!token) {
    res.status(401).send("no token found");
  }
};

module.exports = userAuth;
