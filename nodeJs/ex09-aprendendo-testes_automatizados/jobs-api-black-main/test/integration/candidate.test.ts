import supertest from "supertest";
import { Candidate, sequelize } from "../../src/models";
import { CandidateInstance } from "../../src/models/candidate";
import { candidateFactory } from "../../src/models/factories/candidate";
import { app } from "../../src/app";

describe("Candidates endpoints", () => {
  let candidates: CandidateInstance[];

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    candidates = await Candidate.bulkCreate(candidateFactory.buildList(5));
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should return all candidates", async () => {
    const { statusCode, body } = await supertest(app).get("/candidates");
    expect(statusCode).toBe(200);
    expect(body.length).toBe(5);
  });

  it("should create a new candidade if the values are valid", async () => {
    const candidate = candidateFactory.build();
    const { body, status } = await supertest(app)
      .post("/candidates")
      .send(candidate);

    expect(body.message).toBeUndefined();
    expect(status).toBe(201);
    expect(body).toHaveProperty("id");

    expect(body.name).toBe(candidate.name);
    expect(body.email).toBe(candidate.email);
    expect(body.bio).toBe(candidate.bio);
    expect(body.openToWork).toBe(candidate.openToWork);
    expect(body.phone).toBe(candidate.phone);
  });

  it("should return a specific candidate if the id is valid", async () => {
    const { body } = await supertest(app).get(`/candidates/${candidates[0].id}`);

    expect(body.message).toBeUndefined();
    expect(body.id).toBe(candidates[0].id);
    expect(body.name).toBe(candidates[0].name);
    expect(body.email).toBe(candidates[0].email);
    expect(body.bio).toBe(candidates[0].bio);
    expect(body.openToWork).toBe(candidates[0].openToWork);
    expect(body.phone).toBe(candidates[0].phone);
  });

  it("should not return a candidate if the id is invalid", async () => {
    const invalidId = candidates[candidates.length - 1].id + 1;
    const { body, status } = await supertest(app).get(`/candidates/${invalidId}`);

    expect(status).toBe(404);
    expect(body).toHaveProperty("message");
  });

  it("should updated a candidate if the id is valid", async () => {
    const { body, status } = await supertest(app)
      .put(`/candidates/${candidates[0].id}`)
      .send({
        name: "Jhon Doe",
        phone: "9999-9999",
      });

    expect(status).toBe(200);
    expect(body.name).toBe("Jhon Doe");
    expect(body.bio).toBe(candidates[0].bio);
    expect(body.email).toBe(candidates[0].email);
    expect(body.phone).toBe("9999-9999");
  });

  it("should not update a candidate if the id is invalid", async () => {
    const invalidId = candidates[candidates.length - 1].id + 1;
    const { body, status } = await supertest(app)
      .put(`/candidates/${invalidId}`)
      .send({
        name: "Jhon IsInvalid",
        phone: "9999-9999",
      });

    expect(status).toBe(404);
    expect(body.message).toBe("Candidato não encontrado");
  });

  it("should delete a candidate", async () => {
    const { body, status } = await supertest(app).delete(`/candidates/${candidates[0].id}`);
    const deletedCandidate = await Candidate.findByPk(candidates[0].id);

    expect(status).toBe(204);
    expect(body).toEqual({});
    expect(deletedCandidate).toBeNull();
  });
});
