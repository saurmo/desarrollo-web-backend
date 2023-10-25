const jwt = require("jsonwebtoken");

const SECRET = "f3625dde02dc8b71899a525940761446d9eb7ade";
const createToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { createToken, verifyToken };
