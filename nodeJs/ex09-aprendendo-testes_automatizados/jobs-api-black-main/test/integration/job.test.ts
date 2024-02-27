import supertest from "supertest";
import { Candidate, Company, Job, sequelize } from "../../src/models";
import { CompanyInstance } from "../../src/models/company";
import { companyFactory } from "../../src/models/factories/company";
import { jobFactory } from "../../src/models/factories/job";
import { JobInstance } from "../../src/models/job";
import { app } from "../../src/app";
import { candidateFactory } from "../../src/models/factories/candidate";

describe("Jobs endpoints", () => {
  let company: CompanyInstance;
  let jobs: JobInstance[];

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    company = await Company.create(companyFactory.build());
    jobs = await Job.bulkCreate(jobFactory.buildList(5));
  });

  afterAll(async () => {
    sequelize.close();
  });

  it("should return all jobs", async () => {
    const { body, statusCode } = await supertest(app).get("/jobs");

    expect(statusCode).toBe(200);
    expect(body.length).toBe(5);
  });

  it("should create a job", async () => {
    const newJob = jobFactory.build();
    const { body, status } = await supertest(app).post("/jobs").send(newJob);

    expect(status).toBe(201);
    expect(body).toHaveProperty("id");
    expect(body.title).toBe(newJob.title);
    expect(body.description).toBe(newJob.description);
    expect(new Date(body.limitDate)).toEqual(newJob.limitDate);
    expect(body.companyId).toBe(company.id);
  });

  it("should return a candidate if the id is valid", async () => {
    const { body, statusCode } = await supertest(app).get(
      `/jobs/${jobs[0].id}`
    );

    expect(statusCode).toBe(200);
    expect(body.id).toBe(jobs[0].id);
    expect(body.title).toBe(jobs[0].title);
    expect(body.description).toBe(jobs[0].description);
    expect(new Date(body.limitDate)).toEqual(jobs[0].limitDate);
    expect(body.companyId).toBe(company.id);
    expect(body).toHaveProperty("candidatesCount");
  });

  it("should not return a candidate if the id is invalid", async () => {
    const invalidId = jobs[jobs.length - 1].id + 1;
    const { body, status } = await supertest(app).get(`/jobs/${invalidId}`);

    expect(status).toBe(404);
    expect(body.message).toBe("Vaga não encontrada");
  });

  it("should update a job if the id is valid", async () => {
    const { body, statusCode } = await supertest(app)
      .put(`/jobs/${jobs[0].id}`)
      .send({
        title: "testOfUpdate",
      });

    expect(statusCode).toBe(200);
    expect(body.id).toBe(jobs[0].id);
    expect(body.title).toBe("testOfUpdate");
    expect(body.description).toBe(jobs[0].description);
    expect(new Date(body.limitDate)).toEqual(jobs[0].limitDate);
    expect(body.companyId).toBe(company.id);
  });

  it("should not update a job if the id is invalid", async () => {
    const invalidId = jobs[jobs.length - 1].id + 1;
    const { body, status } = await supertest(app)
      .put(`/jobs/${invalidId}`)
      .send({
        title: "testOfUpdate",
      });

    expect(status).toBe(404);
    expect(body.message).toBe("Vaga não encontrada");
  });

  it("should delete a job", async () => {
    const { body, status } = await supertest(app).delete(`/jobs/${jobs[0].id}`);
    const deletedJob = await Job.findByPk(jobs[0].id);

    expect(status).toBe(204);
    expect(body).toEqual({});
    expect(deletedJob).toBeNull();
  });

  it("should add a candidate", async () => {
    const newCandidate = await Candidate.create(candidateFactory.build());
    const { body, status } = await supertest(app)
      .post(`/jobs/${jobs[0].id}/addCandidate`)
      .send({ candidateId: newCandidate.id });

    const jobCandidates = await jobs[0].getCandidates();

    expect(status).toBe(201);
    expect(body).toEqual({});
    expect(jobCandidates.length).toBe(1);
    expect(jobCandidates[0].id).toBe(newCandidate.id);
    expect(jobCandidates[0].name).toBe(newCandidate.name);
    expect(jobCandidates[0].email).toBe(newCandidate.email);
  });

  it("should not add candidate if ID is not provided", async () => {
    const { body, status } = await supertest(app).post(
      `/jobs/${jobs[0].id}/addCandidate`
    );

    expect(status).toBe(400);
    expect(body.message).toBe("candidateId é obrigatório");
  });

  it("should not add candidate if the job does not exist", async () => {
    const invalidJobId = jobs[jobs.length - 1].id + 1;
    const newCandidate = await Candidate.create(candidateFactory.build());
    const { body, status } = await supertest(app)
      .post(`/jobs/${invalidJobId}/addCandidate`)
      .send({ candidateId: newCandidate.id });

    expect(status).toBe(404);
    expect(body.message).toBe("Vaga de emprego não encontrada");
  });

  it("should not add a candidate that already exists", async () => {
    const newCandidates = await Candidate.bulkCreate(
      candidateFactory.buildList(3)
    );
    await jobs[0].addCandidates(newCandidates.map((candidate) => candidate.id));

    const { body, statusCode } = await supertest(app)
      .post(`/jobs/${jobs[0].id}/addCandidate`)
      .send({ candidateId: newCandidates[0].id });

    const jobCandidates = await jobs[0].getCandidates();

    expect(statusCode).toBe(400);
    expect(body.message).toBe("Candidato já cadastrado");
    expect(jobCandidates.length).toBe(3);
  });

  it("should remove a candidate", async () => {
    const newCandidates = await Candidate.bulkCreate(
      candidateFactory.buildList(3)
    );
    await jobs[0].addCandidates(newCandidates.map((candidate) => candidate.id));

    const { body, status } = await supertest(app)
      .post(`/jobs/${jobs[0].id}/removeCandidate`)
      .send({ candidateId: newCandidates[0].id });

    const jobCandidates = await jobs[0].getCandidates();
    const candidate = await jobs[0].hasCandidate(newCandidates[0].id);

    expect(status).toBe(204);
    expect(body).toEqual({});
    expect(jobCandidates.length).toBe(2);
    expect(candidate).toBeFalsy();
  });

  it("should not remove a candidate if the job does not exist", async () => {
    const invalidJobId = jobs[jobs.length - 1].id + 1;

    const newCandidates = await Candidate.bulkCreate(candidateFactory.buildList(3));
    await jobs[0].addCandidates(newCandidates.map((candidate) => candidate.id));

    const { body, status } = await supertest(app)
      .post(`/jobs/${invalidJobId}/removeCandidate`)
      .send({ candidateId: newCandidates[0].id });

    expect(status).toBe(404);
    expect(body.message).toBe("Vaga de emprego não encontrada");
  });

  it("should not remove a candidate if ID is not provided", async () => {
    const newCandidates = await Candidate.bulkCreate(candidateFactory.buildList(3));
    await jobs[0].addCandidates(newCandidates.map((candidate) => candidate.id));

    const { body, status } = await supertest(app)
      .post(`/jobs/${jobs[0].id}/removeCandidate`);

    expect(status).toBe(400);
    expect(body.message).toBe("candidateId é obrigatório");
  });
});
