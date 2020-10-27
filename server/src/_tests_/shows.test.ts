process.env.NODE_ENV = "test";

import request from "supertest";
import { app } from "../../index";
const knex = require("../../db/client");

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
  it("should get all Shows in DB", async () => {
    const res = await request(app).get("/shows");
    expect(200);
    expect(res.body).toHaveLength(10);
    expect(res.body[0].name).toBe("aurora");
    expect(res.body[2].name).toBe("cue 2");
    expect(res.body[5].name).toBe("hudson");
    expect(res.body[9].name).toBe("woodstock");
  });
});

describe("SHOW", () => {
  it("should get show and have name, with no displays_id ", async () => {
    const res = await request(app).get("/shows/1");
    expect(200);
    expect(res.body).toHaveProperty("name", "move red");
    expect(res.body).toHaveProperty("display_id", null);
  });

  it("should get show and have name, with no displays_id ", async () => {
    const res = await request(app).get("/shows/6");
    expect(200);
    expect(res.body).toHaveProperty("name", "hudson");
    expect(res.body).toHaveProperty("display_id", 1);
  });
  it("should have a display_id 0f null after display is deleted", async () => {
    await request(app).delete("/displays/1");
    const res = await request(app).get("/shows/6");
    expect(200);
    expect(res.body).toHaveProperty("display_id", null);
  });
  it("should return error of show doesnt exist", async () => {
    const res = await request(app).get("/shows/21");
    expect(404);
    expect(res.body.message).toBe("show does not exist");
  });
});

describe("DELETE", () => {
  it("should delete the show", async () => {
    await request(app).delete("/shows/1");
    const res = await request(app).get("/shows/1");
    expect(404);
    expect(res.body.message).toBe("show does not exist");
  });
});


