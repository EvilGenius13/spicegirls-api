const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../server-test");
const expect = chai.expect;
const mongoose = require("mongoose");
const User = require("../models/User");
const Album = require("../models/Album");
const Song = require("../models/Song");

chai.use(chaiHttp);

describe("Songs", () => {
  before(async () => {
    app.emit("ready"); // to ensure that the server has started before the tests run
    await Album.deleteMany({});
    await Song.deleteMany({});
    await User.deleteMany({});
    const resUser = await chai
      .request(app)
      .post("/api/v1/spicegirls/users/signup")
      .send({
        username: "test",
        password: "test",
        email: "test@example.com",
      });
    expect(resUser).to.have.status(201);
    const user = await User.findOne({ username: "test" });
    apiKey = user.apiKey;
    const albumCreate = await chai
      .request(app)
      .post(`/api/v1/spicegirls/albums?apiKey=${apiKey}`)
      .send({
        name: "Spice",
        releaseDate: "1996",
      });
    expect(albumCreate).to.have.status(201);
    const album = await Album.findOne({ name: "Spice" });
    albumId = album.id;
    await Song.create([
      {
        name: "Wannabe",
        length: "2:53",
        album: albumId,
      },
      {
        name: "Say You'll Be There",
        length: "3:56",
        album: albumId,
      },
      {
        name: "2 Become 1",
        length: "4:01",
        album: albumId,
      },
    ]);
  });

  describe("Songs", () => {
    it("should return an array of songs", async () => {
      const res = await chai.request(app).get("/api/v1/spicegirls/songs");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.lengthOf(3);
    });

    it("should return a single song", async () => {
      const song = await Song.findOne({ name: "Wannabe" });
      const res = await chai
        .request(app)
        .get(`/api/v1/spicegirls/songs/${song.id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("name", "Wannabe");
      expect(res.body).to.have.property("length", "2:53");
      expect(res.body.album._id.toString()).to.equal(albumId.toString());
    });

    it("should add a new song", async () => {
      const resSong = await chai
        .request(app)
        .post(`/api/v1/spicegirls/songs?apiKey=${apiKey}`)
        .send({ name: "Stop", length: "3:24", album: albumId });
      expect(resSong).to.have.status(201);
      expect(resSong.body).to.have.property("name", "Stop");
      expect(resSong.body).to.have.property("length", "3:24");
      expect(resSong.body.album.toString()).to.equal(albumId.toString());
      expect(resSong.body).to.have.property("_id");
      const savedSong = await Song.findById(resSong.body._id);
      expect(savedSong).to.exist;
      expect(savedSong.name).to.equal("Stop");
      expect(savedSong.length).to.equal("3:24");
      expect(savedSong.album.toString()).to.equal(albumId.toString());
    });
  });
  it("should update a song", async () => {
    const song = await Song.findOne({ name: "Say You'll Be There" });
    const res = await chai
      .request(app)
      .put(`/api/v1/spicegirls/songs/${song.id}?apiKey=${apiKey}`)
      .send({ name: "Say You Will Be There" });
    expect(res).to.have.status(200);
    const updatedSong = await Song.findById(song.id);
    expect(updatedSong).to.exist;
    expect(updatedSong.name).to.equal("Say You Will Be There");
  });

  it("should delete a song", async () => {
    const newSong = await Song.create({
      name: "Who Do You Think You Are?",
      length: "3:59",
      album: albumId,
    });

    const song = await Song.findOne({ name: "Who Do You Think You Are?" });
    console.log(song.id);
    const res = await chai
      .request(app)
      .delete(`/api/v1/spicegirls/songs/${song.id}?apiKey=${apiKey}`);
    expect(res).to.have.status(200);
    const deletedSong = await Song.findById(song.id);
    expect(deletedSong).to.not.exist;
  });

  after(async () => {
    await Album.deleteMany({});
    await Song.deleteMany({});
    await User.deleteOne({ username: "test" });
    await mongoose.disconnect();
    console.log("Mongoose connection state:", mongoose.connection.readyState);
    server.close();
  });
});
