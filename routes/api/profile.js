const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

/*
 * @route 	GET api/profile/me
 * @desc 	Get current user's profile
 * @access 	Private
 * @protected-route auth middleware
 */

router.get("/me", auth, async (req, res) => {
  try {
    // Find and select the profile by user's id from jwt token payload user id
    // and get also the user [name and avatar] fields
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      [
        "name",
        "avatar", // Users table field
      ]
    );

    // Check if profile is found or exists -- If there is NO profile
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    // If there is a profile
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
