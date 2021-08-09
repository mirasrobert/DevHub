const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const issueJwt = require('../../utils/issue-jwt');
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

/*
 * @route 	POST api/users
 * @desc 	Register New User
 * @access 	Public
 */

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req); // Returns validation error object
    // Check for validation errors
    if (!errors.isEmpty()) {
      // Return status of 400 and response with array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure
    const { name, email, password } = req.body;

    try {
      // Check if user exist
      let user = await User.findOne({ email: email });

      // If user is actually found
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User is already exists" }] });
      }

      // Gets users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Create new user
      user = new User({
        name: name,
        email: email,
        avatar: avatar,
        password: password,
      });

      // Encyrpt the password using bcrypt
      const salt = await bcrypt.genSalt(10);

      // Overwrite password from user object and encrypt
      user.password = await bcrypt.hash(password, salt);

      // Save user to the database
      await user.save();

      const jwt = issueJwt(user);

      // Issue a jwt token
      res.json({ success: true, token: jwt.token, expiresIn: jwt.expires });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error"); // Return a response of status 500
    }
  }
);

module.exports = router;
