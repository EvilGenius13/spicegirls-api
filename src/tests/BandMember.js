const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../server-test");
const BandMember = require("../models/BandMember");
const expect = chai.expect;
const mongoose = require("mongoose");
const User = require("../models/User");


chai.use(chaiHttp);

describe("BandMembers", () => {
  before(async () => {
    app.emit("ready"); // to ensure that the server has started before the tests run
    await BandMember.deleteMany({});
    await User.deleteMany({});
    const resUser = await chai.request(app).post("/api/v1/spicegirls/users/signup").send({
      username: "test",
      password: "test",
      email: "test@example.com",
    });
    expect(resUser).to.have.status(201);
    const user = await User.findOne({ username: "test" });
    apiKey = user.apiKey;
    await BandMember.create([
      {
        name: "Melanie Brown",
        realName: "Melanie Janine Brown",
        dateOfBirth: "1975-05-29",
      },
      {
        name: "Melanie Chisholm",
        realName: "Melanie Jayne Chisholm",
        dateOfBirth: "1974-01-12",
      },
      {
        name: "Emma Bunton",
        realName: "Emma Lee Bunton",
        dateOfBirth: "1976-01-21",
      },
      {
        name: "Geri Halliwell",
        realName: "Geraldine Estelle Horner",
        dateOfBirth: "1972-08-06",
      },
      {
        name: "Victoria Beckham",
        realName: "Victoria Caroline Beckham",
        dateOfBirth: "1974-04-17",
      },
    ]);
  });

  describe("Homepage", () => {
    it("should return a message with the Spice Girls homepage", async () => {
      const res = await chai.request(app).get("/");
      expect(res).to.have.status(200);
      expect(res.text).to.equal("You've reached the spice girls homepage!");
    });
  });

  describe("Band Members", () => {
    it("should return an array of band members", async () => {
      const res = await chai.request(app).get("/api/v1/spicegirls/band-members");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.lengthOf(5);
    });

    it("should return a single band member", async () => {
      const bandMember = await BandMember.findOne({ name: "Melanie Brown" });
      const res = await chai.request(app).get(`/api/v1/spicegirls/band-members/${bandMember.id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("bandMember");
      expect(res.body.bandMember).to.have.property("name", "Melanie Brown");
      expect(res.body.bandMember).to.have.property("realName", "Melanie Janine Brown");
      expect(res.body.bandMember).to.have.property("dateOfBirth", "1975-05-29");
    });

    it("should add a new band member", async () => {
      const resBandMember = await chai.request(app).post(`/api/v1/spicegirls/band-members?apiKey=${apiKey}`).send({
        name: "Melanie C",
        realName: "Melanie Jayne Chisholm",
        dateOfBirth: "1974-01-12",
      });
      expect(resBandMember).to.have.status(201);
      expect(resBandMember.body).to.have.property("name", "Melanie C");
      expect(resBandMember.body).to.have.property("realName", "Melanie Jayne Chisholm");
      expect(resBandMember.body).to.have.property("dateOfBirth", "1974-01-12");
      expect(resBandMember.body).to.have.property("_id");
      const savedBandMember = await BandMember.findById(resBandMember.body._id);
      expect(savedBandMember).to.exist;
      expect(savedBandMember.name).to.equal("Melanie C");
      expect(savedBandMember.realName).to.equal("Melanie Jayne Chisholm");
      expect(savedBandMember.dateOfBirth).to.equal("1974-01-12");
    });
  });
  it("should update a band member", async () => {
    const bandMember = await BandMember.findOne({ name: "Victoria Beckham" });
    const res = await chai
      .request(app)
      .put(`/api/v1/spicegirls/band-members/${bandMember.id}?apiKey=${apiKey}`)
      .send({ name: "Victoria B" });
    expect(res).to.have.status(200);
    const updatedBandMember = await BandMember.findById(bandMember.id);
    expect(updatedBandMember).to.exist;
    expect(updatedBandMember.name).to.equal("Victoria B");
  });
  
  it("should delete a band member", async () => {
    const newBandMember = await BandMember.create({
      name: "Testy Spice",
      realName: "The Test Spice",
      dateOfBirth: "1975-05-29",
    });
    
    const bandMember = await BandMember.findOne({ name: "Testy Spice" });
    const res = await chai.request(app).delete(`/api/v1/spicegirls/band-members/${bandMember.id}?apiKey=${apiKey}`);
    expect(res).to.have.status(200);
    const deletedBandMember = await BandMember.findById(bandMember.id);
    expect(deletedBandMember).to.not.exist;
  });

  after(async () => {
    await BandMember.deleteMany({});
    await User.deleteMany({});
    await mongoose.disconnect();
    server.close();
  });
});
