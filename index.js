const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');

const app = express();

// Load config env
require('dotenv').config();

// Connect Database
connectDB(process.env.MONGO_URI);

// Pass the global passport object into the configuration function
require('./middleware/passport-jwt')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define API Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// If there is no env port then use port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`${process.env.NODE_ENV} server started on PORT ${PORT}`));
