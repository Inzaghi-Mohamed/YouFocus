const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;


// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const CoursesRouter = require('./routes/courses.router');
const ytSearchRouter = require('./routes/youtubeSearch.router');
const youtubeApiRouter = require('./routes/youtubeApi.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/courses', CoursesRouter);
app.use('/api/videos', ytSearchRouter);
app.use('/api/youtube', youtubeApiRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});