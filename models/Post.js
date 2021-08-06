const mongoose = require('mongoose');

// Create a User/Table Schema
// Schema = Table columns
const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // user table id
    ref: 'user', // reference users collection/table
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, // user table id
        ref: 'user', // reference users collection/table
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, // user table id
        ref: 'user', // reference users collection/table
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create a user model
const Post = mongoose.model('post', PostSchema);

module.exports = Post;
