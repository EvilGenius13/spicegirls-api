require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

// Routes
const bandMemberRouter = require('./routes/BandMember');
const albumRouter = require('./routes/Album');
const songRouter = require('./routes/Song');
const userRouter = require('./routes/User');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Connect to MongoDB
require('./data/db');

app.get('/', (req, res) => {
  res.send("You've reached the spice girls homepage!");
});
app.use('/band-members', bandMemberRouter);
app.use('/albums', albumRouter);
app.use('/songs', songRouter);
app.use('/users', userRouter);

// Connection to server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
