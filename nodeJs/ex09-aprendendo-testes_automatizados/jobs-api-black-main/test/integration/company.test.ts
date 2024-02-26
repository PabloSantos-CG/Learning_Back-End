import supertest from "supertest";
import { Company, sequelize } from "../../src/models";
import { app } from "../../src/app";
import { ComapnyInstance } from "../../src/models/company";
import { companyFactory } from "../../src/models/factories/company";

describe("Candidates endpoints", () => {
  let companies: ComapnyInstance[];

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    companies = await Company.bulkCreate(companyFactory.buildList(5));
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should return all companies", async () => {
    const { body, statusCode } = await supertest(app).get("/companies");

    expect(statusCode).toBe(200);
    expect(body.length).toBe(5);
  });

  it("should create a new company if the values are valid", async () => {
    const newCompany = companyFactory.build();
    const { body, status } = await supertest(app)
      .post("/companies")
      .send(newCompany);

    expect(status).toBe(201);
    expect(body).toHaveProperty("id");
    expect(body.name).toBe(newCompany.name);
    expect(body.bio).toBe(newCompany.bio);
    expect(body.website).toBe(newCompany.website);
    expect(body.email).toBe(newCompany.email);
  });

  it("should return a specific company if the id is valid", async () => {
    const { body, statusCode } = await supertest(app).get(
      `/companies/${companies[0].id}`
    );

    expect(body.message).toBeUndefined();
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("id");
    expect(body.name).toBe(companies[0].name);
    expect(body.bio).toBe(companies[0].bio);
    expect(body.website).toBe(companies[0].website);
    expect(body.email).toBe(companies[0].email);
  });

  it("should not return a company if the id is invalid", async () => {
    const invalidId = companies[companies.length - 1].id + 1;
    const { body, status } = await supertest(app).get(
      `/companies/${invalidId}`
    );

    expect(status).toBe(404);
    expect(body.message).toBe("Empresa não encontrada");
  });

  it("should updated a company if the id is valid", async () => {
    const testJson = { name: "HDtest", email: "HDtest@test.com" };
    const { body, statusCode } = await supertest(app)
      .put(`/companies/${companies[0].id}`)
      .send(testJson);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("id");
    expect(body.name).toBe(testJson.name);
    expect(body.email).toBe(testJson.email);
    expect(body.bio).toBe(companies[0].bio);
    expect(body.website).toBe(companies[0].website);
  });

  it("should not update a company if the id is invalid", async () => {
    const invalidId = companies[companies.length - 1].id + 1;
    const testJson = { name: "HDtest", email: "HDtest@test.com" };
    const { body, status } = await supertest(app)
      .put(`/companies/${invalidId}`)
      .send(testJson);

    expect(status).toBe(404);
    expect(body.message).toBe("Empresa não encontrada");
  });

  it("should delete a company", async () => {
    const { body, status } = await supertest(app).delete(
      `/companies/${companies[0].id}`
    );
    const company = await Company.findByPk(companies[0].id);

    expect(status).toBe(204);
    expect(body).toEqual({});
    expect(company).toBeNull();
  });
});
