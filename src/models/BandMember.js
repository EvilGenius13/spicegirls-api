const mongoose = require('mongoose');

const bandMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  realName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
});

const BandMember = mongoose.model('BandMember', bandMemberSchema);

module.exports = BandMember;