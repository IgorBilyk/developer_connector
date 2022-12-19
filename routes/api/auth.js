const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../../midleware/auth");
const User = require("../../models/User");
/* const secret_key = config.get("ACCESS_TOKEN");
const refresh_key = config.get("REFRESH_TOKEN"); */
const secret_key = "_access_key_jwt";
const refresh_key = 12323;

// route - get user
//@ access private

router.get("/auth", auth, async (req, res) => {
  try {
    const { email } = req.body;

    // Get user email
    const newUser = await User.findById(req.user.id).select("-password");
    res.status(200).json({ newUser });
  } catch (err) {
    return res.status(404).json({ msg: "User has not been found." });
  }
});

//Create access/refresh token
// route - authenticate user & get token /auth login
const accessToken = (user) => {
  const payload = {
    id,
  };
  const token = jwt.sign(
    /* JSON.parse(JSON.stringify(payload)), */
    { id: user },
    secret_key,
    { expiresIn: "15min" },
    (err, token) => {
      if (err) throw err;
      return token;
    }
  );
  return token;
};
const refreshToken = (user) => {
  const payload = {
    id,
  };
  const token = jwt.sign(
    /*  JSON.parse(JSON.stringify(payload)), */
    { id: user },

    refresh_key,
    { expiresIn: "15d" },
    (err, token) => {
      if (err) throw err;
      return token;
    }
  );
  return token;
};

//Login route
// @access public
router.post(
  "/auth",

  body("email", "Please include the valid email").isEmail(),
  body("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // See if user exist
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid Credentials " });

      const isMatch = await bcrypt.compare(`${password}`, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid Credentials " });

      /*  const accessTok = accessToken(user);
      const refreshTok = refreshToken(user); */

      const accessTok = jwt.sign({ user: user._id }, secret_key, {
        expiresIn: "14m",
      });
      const refreshTok = jwt.sign({ user: user._id }, secret_key, {
        expiresIn: "15d",
      });
      console.log(accessTok, refreshTok);

      res.json({ user, accessTok, refreshTok });
    } catch (error) {
      console.log(error.message, "error");
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
