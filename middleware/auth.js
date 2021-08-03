const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get the token from the header
  const token = req.header("x-auth-token");

  // Check if there is NO token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" }); // Return not authorized
  }

  // If there is token then, Verify token
  try {
    const decodedToken = jwt.verify(token, config.get("jwtSecret"));

    req.user = decodedToken.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
