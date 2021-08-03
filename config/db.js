const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); // Get the URI from default.json

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true 
    });

    console.log("MongoDB is Connected");
  } catch (error) {
    console.error(error.message);

    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB; // Export and return a function
