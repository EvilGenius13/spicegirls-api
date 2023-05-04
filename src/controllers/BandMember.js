const BandMember = require('../models/BandMember');
const User = require('../models/User');
const axios = require('axios');

const bandMemberController = {
  getAll: async (req, res) => {
    try {
      const bandMembers = await BandMember.find({}).select('name');
      res.status(200).json(bandMembers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const bandMember = await BandMember.findById(req.params.id).populate('albums', 'name releaseDate');
      if (!bandMember) {
        res.status(404).json({ message: 'Band member not found' });
      } else {
        const API_KEY = process.env.API_KEY;
        const tenorResponse = await axios.get(`https://tenor.googleapis.com/v2/search?q=${bandMember.name}&limit=1&key=${API_KEY}`);
        const gifUrl = tenorResponse.data.results[0].media_formats.mediumgif.url;
        const responseObj = { bandMember: bandMember.toObject(), gifUrl };
        res.json(responseObj);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  create: async (req, res) => {
      const newBandMember = await BandMember.create(req.body);
      res.status(201).json(newBandMember);
  },
  update: async (req, res) => {
      const bandMember = await BandMember.findById(req.params.id);
      if (!bandMember) {
        res.status(404).json({ message: 'Band member not found' });
      } else {
        await bandMember.updateOne(req.body);
        res.status(200).json(bandMember);
      }
  },
  delete: async (req, res) => {
      const bandMember = await BandMember.findById(req.params.id);
      if (!bandMember) {
        res.status(404).json({ message: 'Band member not found' });
      } else {
        await bandMember.deleteOne();
        res.status(200).json({ message: 'Band member deleted' });
      }
  }
};

module.exports = bandMemberController;