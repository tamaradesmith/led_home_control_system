process.env.NODE_ENV = "test";

import request from "supertest";
import { app } from "../../index";
const knex = require("../../db/client");

const newColour = {
  id: 4,
  name: "purple",
  saturation: 90,
  lightness: 65,
  hue: 270,
};

beforeEach(function (done) {
  knex.migrate.rollback().then(function () {
    knex.migrate.latest().then(function () {
      return knex.seed.run().then(function () {
        done();
      });
    });
  });
});

afterEach(function (done) {
  knex.migrate.rollback().then(function () {
    done();
  });
});

describe("INDEX", () => {
  it("should return all colours in DB", async () => {
    const res = await request(app).get(`/colours`);
    expect(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0].name).toBe("blue");
    expect(res.body[1].name).toBe("green");
    expect(res.body[2].name).toBe("red");
  });
  it("should return an error", async () => {
    const res = await request(app).get(`/colour`);
    expect(500);
    expect(res.ok).toBe(false);
  });
});
describe("SHOW", () => {
  it("should have name, hue, saturation, lightness, id", async () => {
    const res = await request(app).get("/colours/1");
    expect(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("hue");
    expect(res.body).toHaveProperty("saturation");
    expect(res.body).toHaveProperty("lightness");
    expect(res.body).toHaveProperty("id");
  });
  it("should get right colour", async () => {
    const res = await request(app).get("/colours/3");
    expect(200);
    expect(res.body).toHaveProperty("name", "green");
    expect(res.body).toHaveProperty("hue", 100);
    expect(res.body).toHaveProperty("saturation", 70);
    expect(res.body).toHaveProperty("lightness", 100);
    expect(res.body).toHaveProperty("id", "3");
  });
});

describe("CREATE", () => {
  it("should create a new colour", async () => {
    const res = await request(app).post("/colours").send({ colour: newColour });
    expect(200);
    expect(res.body).toHaveProperty("name", newColour.name);
    expect(res.body).toHaveProperty("hue", newColour.hue);
    expect(res.body).toHaveProperty("saturation", newColour.saturation);
    expect(res.body).toHaveProperty("lightness", newColour.lightness);
    expect(res.body).toHaveProperty("id");
  });
  it("should not create with invalid data: missing name", async () => {
    const invalidColour = {
      id: 4,
      saturation: 90,
      lightness: 65,
      hue: 270,
    };
    const res = await request(app)
      .post("/colours")
      .send({ colour: invalidColour });
    expect(422);
    expect(res.ok).toBe(false);
  });
  it("should not create with invalid data: saturation too high", async () => {
    const invalidColour = {
      id: 4,
      name: "pink",
      saturation: 190,
      lightness: 65,
      hue: 270,
    };
    const res = await request(app)
      .post("/colours")
      .send({ colour: invalidColour });
    expect(422);
    expect(res.ok).toBe(false);
  });
  it("should not create with invalid data: Lightness too low", async () => {
    const invalidColour = {
      id: 4,
      name: "pink",
      saturation: 89,
      lightness: -13,
      hue: 270,
    };
    const res = await request(app)
      .post("/colours")
      .send({ colour: invalidColour });
    expect(422);
    expect(res.ok).toBe(false);
  });
  it("should not create with invalid data: missing hue value", async () => {
    const invalidColour = {
      id: 4,
      name: "pink",
      saturation: 90,
      lightness: 25,
    };
    const res = await request(app)
      .post("/colours")
      .send({ colour: invalidColour });
    expect(422);
    expect(res.ok).toBe(false);
  });
  it("should not create with invalid data: missing hue value", async () => {
    const invalidColour = {
      id: 4,
      name: "pink",
      saturation: 90,
      lightness: 25,
      hue: 34,
      notAllow:  "I should be stopped"
    };
    const res = await request(app)
      .post("/colours")
      .send({ colour: invalidColour });
    expect(422);
    expect(res.ok).toBe(false);
  });
});
