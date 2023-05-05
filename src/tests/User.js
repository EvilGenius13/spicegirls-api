const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../server-test");
const expect = chai.expect;
const mongoose = require("mongoose");
const User = require("../models/User");

chai.use(chaiHttp);
before(async () => {
  app.emit("ready"); // to ensure that the server has started before the tests run
  await User.deleteMany({});
  const resUser = await chai
    .request(app)
    .post("/api/v1/spicegirls/users/signup")
    .send({
      username: "khadgar",
      password: "test",
      email: "mage@wow.com",
    });
  expect(resUser).to.have.status(201);
  const res = await chai
    .request(app)
    .post(`/api/v1/spicegirls/users/login`)
    .send({
      email: "mage@wow.com",
      password: "test",
    });
  expect(res).to.have.status(200);
  token = res.body.token;
});

describe("Users", () => {
  it("should sign up a user", async () => {
    const resUser = await chai
      .request(app)
      .post("/api/v1/spicegirls/users/signup")
      .send({
        username: "jaina",
        password: "password",
        email: "alliance@easternkingdoms.com",
      });
    expect(resUser).to.have.status(201);
    expect(resUser.body).to.have.property(
      "message",
      "User created successfully"
    );
    expect(resUser.body).to.have.property("apiKey");
  });

  it("should login a user", async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/spicegirls/users/login`)
      .send({
        email: "mage@wow.com",
        password: "test",
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
  });

  it("should see user dashboard", async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/spicegirls/users/dashboard`)
      .set("Authorization", `Bearer ${token}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("email", "mage@wow.com");
    expect(res.body).to.have.property("username", "khadgar");
    expect(res.body).to.have.property("apiKey");
  });

  it("should see metrics", async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/spicegirls/users/metrics`)
      .set("Authorization", `Bearer ${token}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    for (const obj of res.body) {
      expect(obj).to.have.property("_id");
      expect(obj).to.have.property("route");
      expect(obj).to.have.property("count");
    }
  });

  after(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
    console.log("Mongoose connection state:", mongoose.connection.readyState);
    server.close();
  });
});
