const mongoose = require("mongoose");

// Create a User/Table Schema
// Schema = Table columns
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    required: Date.now,
  },
});

// Create a user model
const User = mongoose.model("user", UserSchema);

module.exports = User;
