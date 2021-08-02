const express = require("express");
const router = express.Router();
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
    const errors = validationResult(req); // Returns error object
    // Check for errors
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
        res.status(400).json({ errors: [{ msg: "User is already exists" }] });
      }

      // Gets users gravatar

      // Encyrpt the password

      // Return the jsonwebtoken

      res.send("User Route");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error"); // Return a response of status 500
    }
  }
);

module.exports = router;
