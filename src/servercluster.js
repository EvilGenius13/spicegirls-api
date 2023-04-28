require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Routes
const bandMemberRouter = require('./routes/BandMember');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB replica set
const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?replicaSet=${process.env.MONGO_REPLICA_SET_NAME}`;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
  readPreference: 'primaryPreferred',
};

mongoose
  .connect(mongoUri, mongoOptions)
  .then(() => console.log('Connected to MongoDB replica set'))
  .catch((err) => console.error('Error connecting to MongoDB replica set', err));

// Set up changestream to listen for changes
const bandMemberCollection = mongoose.connection.collection('bandMembers');
const bandMemberChangeStream = bandMemberCollection.watch({ fullDocument: 'updateLookup' });

bandMemberChangeStream.on('change', (change) => {
  console.log('Change:', change);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/band-members', bandMemberRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});