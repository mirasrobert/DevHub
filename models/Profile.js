const mongoose = require("mongoose");

// Create a User/Table Schema
// Schema = Table columns
const ProfileShema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,  // user table id
      ref: 'user'
  },
  company: {
    type: String 
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String], // Array of Strings
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [ // Array of objects // Has Many in RDBMS
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: false
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [ // Array of objects // Has Many in RDBMS
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: { // Nested Object // Has One in RDMBS
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a user model
const Profile = mongoose.model("profile", ProfileShema);

module.exports = Profile;
