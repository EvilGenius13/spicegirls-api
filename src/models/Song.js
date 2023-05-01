const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  length: { type: String, required: true },
  album: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Album',
    required: true
  }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;