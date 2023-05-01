const BandMember = require('../models/BandMember');

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
      const bandMember = await BandMember.findById(req.params.id)
        .populate('albums', 'name releaseDate');
      if (!bandMember) {
        res.status(404).json({ message: 'Band member not found' });
      } else {
        res.json(bandMember);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const newBandMember = await BandMember.create(req.body);
      res.status(201).json(newBandMember);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const bandMember = await BandMember.findById(req.params.id);
      if (!bandMember) {
        res.status(404).json({ message: 'Band member not found' });
      } else {
        await bandMember.updateOne(req.body);
        res.status(200).json(bandMember);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });

    }
  },
  delete: async (req, res) => {
    try {
      const bandMember = await BandMember.findById(req.params.id);
      if (!bandMember) {
        res.status(404).json({ message: 'Band member not found' });
      }
      await bandMember.deleteOne();
      res.status(200).json({ message: 'Band member deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

};

module.exports = bandMemberController;