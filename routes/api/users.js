const express = require("express");
const config = require("config");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
// Secret key
const secret_key = config.get("ACCESS_TOKEN");

const auth = require("../../midleware/auth");
//Test refresh token
router.get("/refreshToken", (req, res) => {
  
  /*  const accessToken = req.headers.authorization.split(" ")[1];


  if (!accessToken)
    return res.status(401).json({ msg: "No Token, authorization denied" }); */
  /*  try {
    const decoded = jwt.verify(
      accessToken,
      "_access_key_jwt",
      (err, decoded) => {
        if (err) {
          console.log("token validation error", err);
        }
        res.semd(decoded);
      }
    );
    res.json({ decoded });
  } catch (error) {
    res.status(401).json({ error: "Token error" });
  } */
  res.json({ result: "Success" });
});
//TEST JWT
router.post("/test", auth, async (req, res) => {
  const payload = {
    id: 12345676,
  };
  /*   jwt.sign(payload, secret_key, { expiresIn: 60 * 6000 }, (err, token) => {
    if (err) throw err;
    res.json({ accessToken: token });
  }); */

  const accessToken = jwt.sign(payload, secret_key, { expiresIn: "10s" });
  const resreshToken = jwt.sign(payload, secret_key);

  res.json({ accessToken, resreshToken });

  /*   const refreshToken = jwt.sign(
    payload,
    secret_key,
    { expiresIn: 60 * 6000 },
    (err, token) => {
      if (err) throw err;
      return token;
    }
  ); */
});
// route - register user /users
router.post(
  "/users",
  body("name", "The name is required").notEmpty(),
  body("email", "Please include the valid email").isEmail(),
  body(
    "password",
    "Please, enter the password with more than 5 characters"
  ).isLength({ min: 5 }),
  body(
    "password2",
    "Password Confirmation field must have the same value as the password field"
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    // See if user exist
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User with this email already exists" }] });
      }
      // Ger user gravatar
      let avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(`${password}`, salt);
      // Save user in DB
      await user.save();

      /*  // Return Jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, secret_key, { expiresIn: 60 * 6000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      }); */
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);
router.get("/users", auth, async (req, res) => {
  try {
    let users = await User.find();
    if (!users) return res.status(404).send("User was not found!");
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
