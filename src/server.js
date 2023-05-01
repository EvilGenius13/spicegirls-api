require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

// Routes
const bandMemberRouter = require('./routes/BandMember');
const albumRouter = require('./routes/Album');
const songRouter = require('./routes/Song');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Connect to MongoDB
require('./data/db');

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/band-members', bandMemberRouter);
app.use('/albums', albumRouter);
app.use('/songs', songRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
