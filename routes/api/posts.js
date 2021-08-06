const express = require('express');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

/*
 * @route 	GET api/posts
 * @desc 	Get All Posts
 * @access 	Private
 */

router.get('/', auth, async (req, res) => {
  try {
    // Sort : -1 latest, oldest default
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/*
 * @route 	POST api/posts
 * @desc 	Create a post
 * @access 	Private
 */

router.post(
  '/',
  [auth, [check('text', 'Text is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get the authenticated user
      const user = await User.findById(req.user.id).select('-password');

      // Post Model Fields
      const newPost = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      // Create a post
      const post = new Post(newPost);

      // Save the post on to the database.
      await post.save();

      res.json(post); // Return the post
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/*
 * @route 	GET api/posts/:id
 * @desc 	Get Post by Id
 * @access 	Private
 */

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // If post does not exist
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);

    // If Id is not object id
    if (error.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

/*
 * @route 	DELETE api/posts/:id
 * @desc 	Delete Post by Id
 * @access 	Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // If post does not exist
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // check if user owned the post
    if (post.user.toString() !== req.user.id) {
      // If not
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove(); // Remove post

    res.json({ msg: 'Post removed' });

    // If post does not exist
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    return post;
  } catch (error) {
    console.error(error.message);

    // If Id is not object id
    if (error.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

module.exports = router;
