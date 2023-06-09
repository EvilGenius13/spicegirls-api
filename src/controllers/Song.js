const Song = require('../models/Song');
const Album = require('../models/Album');
const User = require('../models/User');

const songController = {
  getAll: async (req, res) => {
    try {
      const songs = await Song.find({}).select('name');

      res.status(200).json(songs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const song = await Song.findById(req.params.id).populate({ path: 'album', select: 'name releaseDate' });

      if (!song) {
        res.status(404).json({ message: 'Song not found' });
      } else {
        res.json(song);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  create: async (req, res) => {
      const album = await Album.findById(req.body.album);
      if (!album) {
        res.status(400).json({ message: 'Invalid album ID' });
        return;
      }

      const newSong = await Song.create({
        name: req.body.name,
        length: req.body.length,
        album: album._id,
      });

      album.songs.push(newSong._id);
      await album.save();

      res.status(201).json(newSong);
  },
  update: async (req, res) => {
      const song = await Song.findById(req.params.id);
      if (!song) {
        res.status(404).json({ message: 'Song not found' });
      } else {
        Object.assign(song, req.body);
        await song.save();
        res.status(200).json(song);
      }
  },
  delete: async (req, res) => {
      const song = await Song.findById(req.params.id);
      if (!song) {
        res.status(404).json({ message: 'Song not found' });
        return;
      }

      const album = await Album.findById(song.album);
      if (!album) {
        res.status(500).json({ message: 'Album not found' });
        return;
      }

      album.songs.pull(song._id);
      await album.save();

      await song.deleteOne();
      res.status(200).json({ message: 'Song deleted' });
  },
};

module.exports = songController;