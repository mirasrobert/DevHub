const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const issueJwt = require('../../utils/issue-jwt');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

const auth = passport.authenticate('jwt', { session: false });
/*
 * @route 	GET api/auth
 * @desc 	Get the authenticated user
 * @access 	Public
 * @protected-route    auth middleware
 */
router.get('/', auth, async (req, res) => {
  // If user has verified token from middleware 'auth'
  try {
    const user = await User.findById(req.user.id).select('-password'); // Return user without password

    // Return response of user json
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/*
 * @route 	POST api/auth
 * @desc 	Authenticate User and Get token -- LOGIN
 * @access 	Public
 */
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is requrired').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); // Returns validation error object
    // Check for validation errors
    if (!errors.isEmpty()) {
      // Return status of 400 and response with array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure
    const { email, password } = req.body;

    try {
      // Check if user email exist
      let user = await User.findOne({ email: email });

      // If user is NOT found or Wrong Email
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] }); // Return error to the client
      }

      /*
       * IF USER HAS BEEN FOUND
       */

      // Check if encrypted password from database is match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] }); // Return error to the client
      }

      const jwt = issueJwt(user); // Issue a jwt token

      // Issue a jwt token
      res.json({ success: true, token: jwt.token, expiresIn: jwt.expires });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error'); // Return a response of status 500
    }
  }
);

module.exports = router;
