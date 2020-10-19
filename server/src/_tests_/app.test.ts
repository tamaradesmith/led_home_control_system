process.env.NODE_ENV = "test";

import request from "supertest";
import { app } from "../../index";
const knex = require("../../db/client");

interface Display {
  id?: number;
  name?: string;
  ipaddress: string;
  led_number: number;
}
const newDisplay = {
  name: "hudson",
  ipaddress: "192.168.1.209",
  led_number: 18,
  id: 4,
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

describe("Index", () => {
  it('should return an array of Display get.("/displays")', async () => {
    const res = await request(app).get("/displays");
    expect(200);
    expect(res.body).toHaveLength(3);
  });
});
describe("Show", () => {
  it("should have name, ipddrass, id, led_number", async () => {
    const res = await request(app).get("/displays/1");
    expect(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("ipaddress");
    expect(res.body).toHaveProperty("led_number");
  });
});
describe("Edit", () => {
  it("should get right display", async () => {
    const res = await request(app).get("/displays/1/edit");
    expect(200);
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
    const res = await request(app).patch("/displays/1").send({ display });
    expect(200);
    expect(res.body).toHaveProperty("name", display.name);
  });
});
describe("update with invalid data", () => {
  it("should not save with invalid data", async () => {
    const info = await request(app).get("/displays/1");
    const display = info.body;
    display.name = "";
    const res = await request(app).patch("/displays/1").send({ display });
    expect(422);
    expect(res.ok).toBe(false);
  });
  it("should not save with invalid ipaddress", async () => {
    const info = await request(app).get("/displays/1");
    const display = info.body;
    display.ipaddress = "453.33.12.905";
    const res = await request(app).patch("/displays/1").send({ display });
    expect(422);
    expect(res.ok).toBe(false);
  });
});

describe("CREATE", () => {
  it("should create a new display with Vaild data", async () => {
    const res = await request(app).post("/displays").send({display: newDisplay});
    expect(200);
    expect(res.body).toHaveProperty("name", newDisplay.name);
    expect(res.body).toHaveProperty("ipaddress", newDisplay.ipaddress);
    expect(res.body).toHaveProperty("led_number", newDisplay.led_number);
    expect(res.body).toHaveProperty("id");
  });
});

describe("CREATE with invaild data", () => {
  it("should not save to db with no name", async () => {
    const invalidDisplay = {
      ipaddress: "192.168.1.209",
      led_number: 18,
      id: 4,
    };
    await request(app).post("/displays").send({display: invalidDisplay});
    const res = await request(app).get("/displays/4");
    expect(404);
    expect(res.ok).toBe(false);
  });
   it("should not save to db with no led count", async () => {
     const invalidDisplay = {
       name: "hudson",
       ipaddress: "192.168.1.209",
       id: 4,
     };
     await request(app).post("/displays").send({display: invalidDisplay});
     const res = await request(app).get("/displays/4");
     expect(404);
     expect(res.ok).toBe(false);
   });
   it("should not save to db with unknow params", async () => {
     const invalidDisplay = {
       name: 'extra',
       ipaddress: "192.168.1.209",
       led_number: 18,
       id: 4,
       notAllowed: 'this is not allowed'
     };
     await request(app).post("/displays").send({display: invalidDisplay});
     const res = await request(app).get("/displays/4");
     console.log("res", res.body);
     expect(404);
     expect(res.ok).toBe(false);
   });
  it("should not save with an invalid ipaddress", async () => {
    newDisplay.ipaddress = "283.44.59.1";
    const res = await request(app).post("/displays").send({display: newDisplay});
    expect(422);
    expect(res.ok).toBe(false);
  });
});

describe("DELETE", () => {
  it("should delete the display", async () => {
    await request(app).delete("/displays/1");
    const res = await request(app).get("/displays/1");
    expect(404);
    expect(res.ok).toBe(false);
  });
});
