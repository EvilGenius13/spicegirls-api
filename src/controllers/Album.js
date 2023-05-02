const Album = require('../models/Album');
const BandMember = require('../models/BandMember');
const User = require('../models/User');

const albumController = {
  getAll: async (req, res) => {
    try {
      const albums = await Album.find({}).select('name releaseDate');

      res.status(200).json(albums);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const album = await Album.findById(req.params.id)
      .populate({
        path: 'songs',
        select: 'name length',
        options: { strictPopulate: false }
      })
      .populate({
        path: 'bandMembers',
        select: 'name',
        options: { strictPopulate: false }
      });
      if (!album) {
        res.status(404).json({ message: 'Album not found' });
      } else {
        res.json(album);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const apiKey = req.query.apiKey;
      const user = await User.findOne({ apiKey: apiKey });
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const newAlbum = await Album.create(req.body);
      res.status(201).json(newAlbum);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  
  update: async (req, res) => {
    try {
      const apiKey = req.query.apiKey;
      const user = await User.findOne({ apiKey: apiKey });
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const album = await Album.findById(req.params.id);
      if (!album) {
        res.status(404).json({ message: 'Album not found' });
      } else {
        // Update album name and/or release date if provided in the request
        if (req.body.name) album.name = req.body.name;
        if (req.body.releaseDate) album.releaseDate = req.body.releaseDate;
  
        // Add band members to album if provided in the request
        if (req.body.bandMembers && req.body.bandMembers.length > 0) {
          const newBandMembers = req.body.bandMembers;
          const existingBandMembers = album.bandMembers.map(m => m.toString());
  
          for (let i = 0; i < newBandMembers.length; i++) {
            const bandMemberId = newBandMembers[i];
            if (!existingBandMembers.includes(bandMemberId)) {
              album.bandMembers.push(bandMemberId);
              const bandMember = await BandMember.findByIdAndUpdate(
                bandMemberId,
                { $addToSet: { albums: album._id } },
                { new: true }
              );
            }
          }
          
          await album.save(); // save the changes to album document
        }
  
        const updatedAlbum = await album.save();
  
        res.status(200).json(updatedAlbum);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  
  delete: async (req, res) => {
    try {
      const apiKey = req.query.apiKey;
      const user = await User.findOne({ apiKey: apiKey });
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const album = await Album.findById(req.params.id);
      if (!album) {
        res.status(404).json({ message: 'Album not found' });
      }
      await album.deleteOne();
      res.status(200).json({ message: 'Album deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

};

module.exports = albumController;