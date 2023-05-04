require('dotenv').config();
const mongoose = require('mongoose');
const ATLAS_TEST_USER = process.env.ATLAS_TEST_USER;
const ATLAS_TEST_PASSWORD = process.env.ATLAS_TEST_PASSWORD;
const ATLAS_TEST_URI = process.env.ATLAS_TEST_URI;

// Connect to MongoDB Test Database
const mongoTestUri = `mongodb+srv://${ATLAS_TEST_USER}:${ATLAS_TEST_PASSWORD}${ATLAS_TEST_URI}`;

mongoose.connect(mongoTestUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Test Database'))
.catch(error => console.error('Error connecting to MongoDB Test Database: ', error));

module.exports = mongoose.connection;