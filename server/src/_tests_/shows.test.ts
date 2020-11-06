process.env.NODE_ENV = "test";

import request from "supertest";
import { app } from "../../index";
const knex = require("../../db/client");

interface Show {
  name: string;
  id: number;
  type_id?: number;
  type?: string;
  display_id?: number;
}

const show: Show = {
  name: "test show",
  id: 25,
  type_id: 1,
};
const patternShow = {
  id: 4,
  show_id: 6,
  colours: [3, 2, 1],
  pattern_length: 3,
  wait_time: 3,
  group_length: 2,
  fade: 3,
};

const randomShow = {
  show_id: 11,
  saturation: 60,
  lightness: 50,
  fade: 2,
  wait_time: 4,
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
  it("should get all Shows in DB", async () => {
    const res = await request(app).get("/shows");
    expect(200);
    expect(res.body).toHaveLength(11);
    expect(res.body[0].name).toBe("aurora");
    expect(res.body[0]).toHaveProperty("type");
    expect(res.body[2].name).toBe("cue 2");
    expect(res.body[5].name).toBe("hudson");
    expect(res.body[10].name).toBe("woodstock");
  });
});

describe("SHOW", () => {
  it("should get show and have name, with no displays_id ", async () => {
    const res = await request(app).get("/shows/1");
    expect(200);
    expect(res.body).toHaveProperty("name", "move red");
    expect(res.body).toHaveProperty("display_id", null);
    expect(res.body).toHaveProperty("type", "pattern");
    expect(res.body).toHaveProperty("cue");
  });

  it("should get show and have name, with  displays_id ", async () => {
    const res = await request(app).get("/shows/6");
    expect(200);
    expect(res.body).toHaveProperty("name", "hudson");
    expect(res.body).toHaveProperty("display_id", 1);
    expect(res.body).toHaveProperty("cue");
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

describe("CREATE", () => {
  it("should create a new show", async () => {
    const res = await request(app).post("/shows").send({ show });
    expect(200);
    expect(res.body).toHaveProperty("id", "25");
  });

  it("should create a new show with display id", async () => {
    show.display_id = 1;
    const res = await request(app).post("/shows").send({ show });
    expect(200);
    expect(res.body).toHaveProperty("id", "25");
  });

  it("should not create Show with missing params", async () => {
    const invalidShow = { id: 25, display_id: 1, type_id: 1 };
    const res = await request(app).post("/shows").send({ show: invalidShow });
    expect(422);
    expect(res.ok).toBe(false);
  });

  it("should not create Show with missing params", async () => {
    const invalidShow = { id: 25, display_id: 1, name: "missing type" };
    const res = await request(app).post("/shows").send({ show: invalidShow });
    expect(422);
    expect(res.ok).toBe(false);
  });

  it("should not create show with extra params", async () => {
    const invalidShow = {
      id: 25,
      display_id: 1,
      name: "extra params",
      extraParams: "should not save",
    };
    const res = await request(app).post("/shows").send({ show: invalidShow });
    expect(422);
    expect(res.ok).toBe(false);
  });
});

describe("UPDATE", () => {
  it("should update the show in the db", async () => {
    const info = await request(app).get("/shows/2");
    const updateShow = info.body;
    updateShow.name = "new name";
    const res = await request(app).patch("/shows/2").send({ show: updateShow });
    expect(200);
    expect(res.body).toHaveProperty("id", "2");
  });

  it("should not update the show with invalid params in the db", async () => {
    const info = await request(app).get("/shows/2");
    const updateShow = info.body;
    updateShow.name = "";
    const res = await request(app).patch("/shows/2").send({ show: updateShow });
    expect(422);
    expect(res.ok).toBe(false);
  });
});

// PATTERN

describe("PATTERN SHOW", () => {
  it("CREATE Pattern show", async () => {
    const res = await request(app)
      .post(`/shows/${patternShow.show_id}/cue`)
      .send({ cue: patternShow });
    expect(200);
    expect(res.body).toHaveProperty("id", "4");
    expect(res.body).toHaveProperty("show_id", 6);
    expect(res.body).toHaveProperty("colours", ["3", "2", "1"]);
    expect(res.body).toHaveProperty("pattern_length", 3);
    expect(res.body).toHaveProperty("wait_time", 3);
    expect(res.body).toHaveProperty("group_length", 2);
  });

  it("GET ONE PATTERN SHOW Cue", async () => {
    const res = await request(app).get(`/shows/1/cue`);
    expect(200);
    expect(res.body).toHaveProperty("id", "1");
    expect(res.body).toHaveProperty("show_id", 1);
    expect(res.body).toHaveProperty("colours", ["1", "2", "3"]);
    expect(res.body).toHaveProperty("pattern_length", 3);
    expect(res.body).toHaveProperty("wait_time", 3);
    expect(res.body).toHaveProperty("group_length", 1);
  });

  it("UPDATE Pattern Show cue", async () => {
    const getCue = await request(app).get("/shows/1/cue");
    const cue = getCue.body;
    cue.colours = [1, 2, 2, 1];
    cue.pattern_length = 4;
    const res = await request(app).patch("/shows/1/cue").send({ cue });
    expect(200);
    expect(res.body).toHaveProperty("colours", ["1", "2", "2", "1"]);
    expect(res.body).toHaveProperty("pattern_length", 4);
    expect(res.body).toHaveProperty("wait_time", 3);
  });
});

// RANDOM SHOWS

describe("RANDOM SHOWS", () => {
  it("gets one Random show", async () => {
    const res = await request(app).get("/shows/9/cue");
    expect(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("fade", 3);
    expect(res.body).toHaveProperty("fade_random", false);
    expect(res.body).toHaveProperty("wait_time", 1);
    expect(res.body).toHaveProperty("wait_random", false);
    expect(res.body).toHaveProperty("hue_min", 0);
    expect(res.body).toHaveProperty("hue_max", 360);
    expect(res.body).toHaveProperty("hue", -1);
    expect(res.body).toHaveProperty("saturation_min", 0);
    expect(res.body).toHaveProperty("saturation_max", 100);
    expect(res.body).toHaveProperty("lightness_min", 0);
    expect(res.body).toHaveProperty("lightness_max", 100);
    expect(res.body).toHaveProperty("saturation", -1);
    expect(res.body).toHaveProperty("lightness", -1);
    expect(res.body).toHaveProperty("show_id", "9");
  });
  it("Should Create random cue", async () => {
    const res = await request(app)
      .post(`/shows/${randomShow.show_id}/cue`)
      .send({ cue: randomShow });
    expect(200);
    expect(res.body).toHaveProperty("id", "4");
    expect(res.body).toHaveProperty("wait_time", 4);
    expect(res.body).toHaveProperty("saturation", 60);
    expect(res.body).toHaveProperty("lightness", 50);
  });
  it("should update a random cue", async () => {
    const cueInfo = await request(app).get("/shows/9/cue");
    const cue = cueInfo.body;
    cue.wait_time = 10;
    cue.saturation = 100;
    const res = await request(app).patch("/shows/9/cue").send({ cue });
    expect(200);
    expect(res.body).toHaveProperty("saturation", 100);
    expect(res.body).toHaveProperty("wait_time", 10);
    expect(res.body).toHaveProperty("show_id", "9");
  });
});
