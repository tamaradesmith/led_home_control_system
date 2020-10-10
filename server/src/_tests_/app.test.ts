process.env.NODE_ENV = "test";

import request from "supertest";
import { app } from "../../index";
const knex = require("../../db/client");

interface Display {
  name: string | null;
  ipaddress: string;
  led_number: number;
}

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

describe("test the CRUB routes for Display", () => {
  it('should respond with a 200 response in get "/displays "route', () => {
    return request(app).get("/displays").expect(200);
  });
  it('should repond with a 200 response "/displays/:id"', () => {
    return request(app).get("/displays/:id").expect(200);
  });
  it('should return  with a 200 response post "/displays"', () => {
    return request(app).post("/displays").expect(200);
  });
  it('should return with a 200 response for "/displays/:id/edit"', () => {
    return request(app).get("/displays/:id/edit").expect(200);
  });
  it('shoid repond with a 200 response in "/displays/patch/:id"', () => {
    return request(app).patch("/displays/:id").expect(200);
  });
  it('should return with a 200 response delete "/displays/:id/"', () => {
    return request(app).delete("/displays/:id").expect(200);
  });
});
describe("Index", () => {
  it('should return an array of Display get.("/displays")', async () => {
    const res = await request(app).get("/displays");
    expect(res.body).toHaveLength(3);
  });
});
describe("Show", () => {
  it("should have name, ipddrass, id, led_number", async () => {
    const res = await request(app).get("/displays/1");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("ipaddress");
    expect(res.body).toHaveProperty("led_number");
  });
});
describe("Edit", () => {
  it("should get right display", async () => {
    const res = await request(app).get("/displays/1/edit");
    expect(res.body).toHaveProperty("name", "frosty");
    expect(res.body).toHaveProperty("ipaddress", "192.168.1.123");
    expect(res.body).toHaveProperty("id", "1");
    expect(res.body).toHaveProperty("led_number", 16);
  });
});

describe("Update", () => {
  it("should update the display in the db", async () => {
    const info = await request(app).get("/displays/1");
    const display = info.body;
    display.name = "frosty family";
    const res = await request(app)
      .patch("/displays/1")
      .send({ display: display });
    expect(res.body).toHaveProperty("name", display.name);
  });
});

describe("CREATE", () => {
  it("should create a new display", async () => {
    const newDisplay = {
      name: "hudson",
      ipaddress: "192.168.1.209",
      led_number: 18,
    };
    const res = await request(app)
      .post("/displays")
      .send({ display: newDisplay });
      // expect(res).toBe('meow')
    expect(res.body).toHaveProperty("name", newDisplay.name);
    expect(res.body).toHaveProperty("ipaddress", newDisplay.ipaddress);
    expect(res.body).toHaveProperty("led_number", newDisplay.led_number);
    expect(res.body).toHaveProperty("id");
  });
});
