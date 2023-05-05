const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../server-test");
const expect = chai.expect;
const mongoose = require("mongoose");
const User = require("../models/User");
const Album = require("../models/Album");
const Song = require("../models/Song");

chai.use(chaiHttp);

describe("Albums", () => {
  let apiKey, albumId;

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
    await Album.create([
      {
        name: "Spice",
        releaseDate: "1996",
      },
      {
        name: "Spiceworld",
        releaseDate: "1997",
      },
    ]);
  });

  describe("Album List", () => {
    it("should return an array of albums", async () => {
      const res = await chai.request(app).get("/api/v1/spicegirls/albums");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.lengthOf(2);
    });

    it("should return a single album", async () => {
      const album = await Album.findOne({ name: "Spice" });
      const res = await chai
        .request(app)
        .get(`/api/v1/spicegirls/albums/${album.id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("name", "Spice");
      expect(res.body).to.have.property("releaseDate", "1996");
    });

    it("should add a new album", async () => {
      const resAlbum = await chai
        .request(app)
        .post(`/api/v1/spicegirls/albums?apiKey=${apiKey}`)
        .send({ name: "Spiceworld", releaseDate: "1997" });
      expect(resAlbum).to.have.status(201);
      expect(resAlbum.body).to.have.property("name", "Spiceworld");
      expect(resAlbum.body).to.have.property("releaseDate", "1997");
      expect(resAlbum.body).to.have.property("_id");
      const savedAlbum = await Album.findById(resAlbum.body._id);
      expect(savedAlbum).to.exist;
      expect(savedAlbum.name).to.equal("Spiceworld");
      expect(savedAlbum.releaseDate).to.equal("1997");
    });

    it("should update an album", async () => {
      const album = await Album.findOne({ name: "Spice" });
      const res = await chai
        .request(app)
        .put(`/api/v1/spicegirls/albums/${album.id}?apiKey=${apiKey}`)
        .send({ name: "Spice Reunion" });
      expect(res).to.have.status(200);
      const updatedAlbum = await Album.findById(album.id);
      expect(updatedAlbum).to.exist;
      expect(updatedAlbum.name).to.equal("Spice Reunion");
    });

    it("should delete an album", async () => {
      const newAlbum = await Album.create({
        name: "Forever",
        releaseDate: "2000",
      });

      const album = await Album.findOne({ name: "Forever" });
      const res = await chai
        .request(app)
        .delete(`/api/v1/spicegirls/albums/${album.id}?apiKey=${apiKey}`);
      expect(res).to.have.status(200);
      const deletedAlbum = await Album.findById(album.id);
      expect(deletedAlbum).to.not.exist;
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
});
