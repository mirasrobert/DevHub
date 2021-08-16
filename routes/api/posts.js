const express = require('express');
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

const auth = passport.authenticate('jwt', { session: false });

/*
 * @route 	GET api/posts
 * @desc 	  Get All Posts
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
 * @desc 	  Create a post
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
 * @desc 	  Get Post by Id
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
 * @desc 	  Delete Post by Id
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

/*
 * @route 	PUT api/posts/like/:postId
 * @desc 	  Like a post
 * @access 	Private
 */

router.put('/like/:postId', auth, async (req, res) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.postId);

    // Check if the post is already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    // Push to the array but place on the 1st index
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
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
 * @route 	PUT api/posts/like/:postId
 * @desc 	  Unlike a post
 * @access 	Private
 */

router.put('/unlike/:postId', auth, async (req, res) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.postId);

    // Check if the post is already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked' });
    }

    // Get index of user like
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // Remove the like
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
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
 * @route 	POST api/posts/comment/:postId
 * @desc 	  Add comment on a post
 * @access 	Private
 */

router.post(
  '/comment/:postId',
  [auth, [check('text', 'Text is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get the post
      const post = await Post.findById(req.params.postId);

      // We can get the authenticared user via - req.user

      // Post Model Fields
      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
      };

      // Push to the comments array on POST COLLECTION/TABLE
      // array.push (add to the last index) -- array.unshift() (add to the 1st index)
      post.comments.unshift(newComment);

      // Save the post on to the database.
      await post.save();

      res.json(post.comments); // Return the comments
    } catch (error) {
      console.error(error.message);

      // If Id is not object id
      if (error.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }

      res.status(500).send('Server Error');
    }
  }
);

/*
 * @route 	DELETE api/posts/comment/:postId/:commentId
 * @desc 	  Delete comment on a post
 * @access 	Private
 */
router.delete('/comment/:postId/:commentId', auth, async (req, res) => {
  try {
    // Get the post
    const post = await Post.findById(req.params.postId);

    // Get the comment from the post
    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.commentId
    );

    console.log(comment);

    // Make sure comment exist
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check if user owns the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get the index of the comment
    const removeIndex = post.comments
      .map((comment) => comment._id.toString())
      .indexOf(req.params.commentId);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
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
