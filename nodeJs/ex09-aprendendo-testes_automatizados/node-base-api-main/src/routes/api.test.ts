import request from "supertest";
import app from "../app";
import { User } from "../models/User";

describe("testing api router", () => {
  let email = "test@gmail.com";
  let password = "oneTwoThree";

  beforeAll(async () => {
    await User.sync({ force: true });
  });

  it("should return true for every pong", (done) => {
    request(app)
      .get("/ping")
      .then((res) => {
        expect(res.body.pong).toBeTruthy();
        return done();
      });
  });

  it("should allow registration", (done) => {
    request(app)
      .post("/register")
      .send(`email=${email}&password=${password}`)
      .then((res) => {
        expect(res.body.error).toBeUndefined();
        expect(res.body).toHaveProperty("id");
        return done();
      });
  });

  it("should not allow a user to register if it already exists", (done) => {
    request(app)
      .post("/register")
      .send(`email=${email}&password=${password}`)
      .then((res) => {
        expect(res.body.error).not.toBeUndefined();
        return done();
      });
  });

  it("should allow access", (done) => {
    request(app)
      .post("/login")
      .send(`email=${email}&password=${password}`)
      .then((res) => {
        expect(res.body.error).toBeUndefined();
        expect(res.body.authorization).toBeTruthy();
        return done();
      });
  });

  it("should not allow access if the user does not exist", (done) => {
    let invalidEmail = "invalid@gmail.com";

    request(app)
      .post("/login")
      .send(`email=${invalidEmail}&password=${password}`)
      .then((res) => {
        expect(res.body.error).not.toBeUndefined();
        return done();
      });
  });

  it("should not allow access if the password is invalid", (done) => {
    let invalidPassword = "invalid123";

    request(app)
      .post("/login")
      .send(`email=${email}&password=${invalidPassword}`)
      .then((res) => {
        expect(res.body.error).toBeUndefined();
        expect(res.body.authorization).toBeFalsy();
        return done();
      });
  });

  it("should return an array of users", (done) => {
    request(app)
      .get("/list")
      .then((res) => {
        expect(res.body.error).toBeUndefined();
        expect(res.body.list.length).toBeGreaterThanOrEqual(1);
        return done();
      });
  });
});
