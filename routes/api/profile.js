const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { response } = require('express');

/*
 * @route 	GET api/profile/me
 * @desc 	  Get current user's profile
 * @access 	Private
 * @protected-route auth middleware
 */

router.get('/me', auth, async (req, res) => {
  try {
    // Find and select the profile by user's id from jwt token payload user id
    // and get also the user [name and avatar] fields (inner joins in RDMS)
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      [
        'name',
        'avatar', // Users table field
      ]
    );

    // Check if profile is found or exists -- If there is NO profile
    if (!profile)
      return res.status(400).json({ msg: 'There is no profile for this user' });

    // If there is a profile
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/*
 * @route 	POST api/profile
 * @desc 	  Create or Update a users profile
 * @access 	Private
 * @protected-route auth middleware
 */

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Please include a skills').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Request body that user submitted
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile fields object like profile model fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    // Remove coma and spaces
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // If there is profile then, UPDATE a profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // If there is no profile then, CREATE a profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

/*
 * @route 	GET api/profile
 * @desc 	  GET all Profiles
 * @access 	Public
 */

router.get('/', async (req, res) => {
  try {
    // Find and select the profile
    // and get also the user [name and avatar] fields from users model (inner joins in RDMS)
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/*
 * @route 	GET api/profile/user/:user_id
 * @desc 	  GET Profile By user ID
 * @access 	Public
 */

router.get('/user/:user_id', async (req, res) => {
  try {
    // Find and select the profile
    // and get also the user [name and avatar] fields from users model (inner joins in RDMS)
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    // Check if there is a profile
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    res.json(profile); // Return profile
  } catch (error) {
    console.log(error.message);

    // If object id is wrong
    if (error.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.status(500).send('Server Error');
  }
});

/*
 * @route 	DELETE api/profile
 * @desc 	  Delete profile, user & posts
 * @access 	Private
 * @protected-route auth middleware
 */

router.delete('/', auth, async (req, res) => {
  try {
    //TODO: remove user's post

    // Remove the profile by user's Id
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove the user by user's id
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.log(error.message);

    res.status(500).send('Server Error');
  }
});

/*
 * @route 	PUT api/profile/experience
 * @desc 	  Add Profile Experience
 * @access 	Private
 * @protected-route auth middleware
 */

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').notEmpty(),
      check('company', 'Company is required').notEmpty(),
      check('from', 'From date is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    // Create an object of what users submitted
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      // Get the profile
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp); // Push to the array and place on the first

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

/*
 * @route 	DELETE api/profile/experience/:exp_id
 * @desc 	  Delete Profile Experience
 * @access 	Private
 * @protected-route auth middleware
 */

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    // Get profile by user field id
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map((exp) => exp.id) // Make an array of all id in the array of objects
      .indexOf(req.params.exp_id); // Get the index of that id on the new array

    profile.experience.splice(removeIndex, 1); // Remove the item on the array by index

    await profile.save(); // Save
 
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

/*
 * @route 	PUT api/profile/education
 * @desc 	  Add Profile Education
 * @access 	Private
 * @protected-route auth middleware
 */

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').notEmpty(),
      check('degree', 'Degree is required').notEmpty(),
      check('fieldsofstudy', 'Field of study is required').notEmpty(),
      check('from', 'From date is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    // Create an object of what users submitted
    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      // Get the profile
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEducation); // Push to the array and place on the first

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

/*
 * @route 	DELETE api/profile/education/:edu_id
 * @desc 	  Delete Profile Education
 * @access 	Private
 * @protected-route auth middleware
 */

router.delete('/education/:exp_id', auth, async (req, res) => {
  try {
    // Get profile by user field id
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map((edu) => edu.id) // Make an array of all id in the array of objects
      .indexOf(req.params.edu_id); // Get the index of that id on the new array

    profile.education.splice(removeIndex, 1); // Remove the item on the array by index

    await profile.save(); // Save
 
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
