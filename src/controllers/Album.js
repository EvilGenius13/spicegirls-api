const Album = require('../models/Album');
const Song = require('../models/Song');

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
      const album = await Album.findById(req.params.id).populate({ path: 'songs', options: { strictPopulate: false } });

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
        await album.updateOne(req.body);
        res.status(200).json(album);
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
  }
};

module.exports = albumController;