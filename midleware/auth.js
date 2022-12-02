const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //  Get token from header
  const token = req.headers.authorization.split(" ")[1];
  // Check if token is valid
  if (!token)
    return res.status(401).json({ msg: "No Token, authorization denied" });
  //
  try {
    const decoded = jwt.verify(token, config.get("ACCESS_TOKEN"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: "Token Error " }] });
  }
};
