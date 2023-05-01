const Album = require('../models/Album');
const BandMember = require('../models/BandMember');

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
      const newAlbum = await Album.create(req.body);
      res.status(201).json(newAlbum);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        res.status(404).json({ message: 'Album not found' });
      } else {
        const updatedAlbum = await Album.findByIdAndUpdate(
          req.params.id,
          { $addToSet: { bandMembers: req.body.bandMembers } }, // use $addToSet to add bandMembers only if they don't already exist in the array
          { new: true }
        ).populate({
          path: 'bandMembers',
          select: 'name'
        });
  
        // Save the album to the bandMembers
        const bandMembers = updatedAlbum.bandMembers;
        for (let i = 0; i < bandMembers.length; i++) {
          const bandMemberId = bandMembers[i]._id;
          const bandMember = await BandMember.findByIdAndUpdate(
            bandMemberId,
            { $addToSet: { albums: updatedAlbum._id } },
            { new: true }
          );
        }
  
        res.status(200).json(updatedAlbum);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
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