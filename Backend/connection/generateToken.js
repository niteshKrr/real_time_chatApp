const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateToken = (result) => {
    
    return jwt.sign({ result }, process.env.JWT_KEY, { expiresIn: "15d" });
};

module.exports = generateToken;