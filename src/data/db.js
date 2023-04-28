// Requirements
require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

// // Connect to MongoDB
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   replicaSet: 'rs0',
// }).then(() => {
//   console.log('Connected to MongoDB replica set');
// }).catch((error) => {
//   console.log('Error connecting to MongoDB replica set: ', error);
// });

// // Connection events
// const db = mongoose.connection;

// db.once('open', () => {
//   console.log('MongoDB connection opened');
// });

// db.on('error', (error) => {
//   console.log('MongoDB connection error: ', error);
// });

// // Change stream events
// const changeStream = db.collection('spicegirls').watch();

// changeStream.on('change', (change) => {
//   console.log('Change stream event:', change);
// });


// Connect to MongoDB
const mongoUri = 'mongodb://localhost/spicegirls';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB: ', error));

module.exports = mongoose.connection;