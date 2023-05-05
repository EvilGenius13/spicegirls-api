const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: {type: String,required: true},
  releaseDate: {type: String,required: true},
  songs: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Song'
  }],
  bandMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BandMember'
  }],
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;