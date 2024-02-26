import supertest from "supertest";
import { Company, Job, sequelize } from "../../src/models";
import { CompanyInstance } from "../../src/models/company";
import { companyFactory } from "../../src/models/factories/company";
import { jobFactory } from "../../src/models/factories/job";
import { JobInstance } from "../../src/models/job";
import { app } from "../../src/app";

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
});
