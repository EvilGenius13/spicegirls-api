require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT;

// Routes
const bandMemberRouter = require('./routes/BandMember');
const albumRouter = require('./routes/Album');
const songRouter = require('./routes/Song');
const userRouter = require('./routes/User');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Docsify
app.use(express.static(path.join(__dirname, '../docs')));

// Connect to MongoDB
require('./data/db');

app.get('/', (req, res) => {
  res.send("You've reached the spice girls homepage!");
});
app.use('/api/v1/spicegirls/band-members', bandMemberRouter);
app.use('/api/v1/spicegirls/albums', albumRouter);
app.use('/api/v1/spicegirls/songs', songRouter);
app.use('/api/v1/spicegirls/users', userRouter);

// Connection to server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;