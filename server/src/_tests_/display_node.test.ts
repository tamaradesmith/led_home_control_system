process.env.NODE_ENV = "test";

import request from "supertest";
import { app } from "../../index";
const knex = require("../../db/client");

// THIS TEST NEED TO HAVE AN ACTIVE NODE ON IPADDRESS 192.168.0.202
interface Display {
  id?: number;
  name?: string;
  ipaddress: string;
  led_number: number;
}
const newDisplay = {
  name: "hudson",
  ipaddress: "192.168.0.202",
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

// describe("comunate with LED node", () => {
//   it("it should ping the node on network return with 200 code", async () => {
//     const saveDisplay = await request(app)
//       .post("/displays")
//       .send({ display: newDisplay });
//     const res = await request(app).get(
//       `/displays/${saveDisplay.body.id}/search`
//       );
//     expect(200);
//     expect(res.body).toBe(true);  
//   });
  it("it should ping the node not find it", async () => {
    newDisplay.ipaddress = "192.168.1.222";
    const saveDisplay = await request(app)
      .post("/displays")
      .send({ display: newDisplay });
    const res = await request(app).get(
      `/displays/${saveDisplay.body.id}/search`
    );
    expect(500);
    expect(res.ok).toBe(false);
  });
//   it("should create two list for found and not found nodes", async () => {
//     newDisplay.ipaddress = "192.168.0.202";
//     await request(app).delete("/displays/1");
//     await request(app).delete("/displays/2");
//     const saveDisplay = await request(app)
//       .post("/displays")
//       .send({ display: newDisplay });
      
//     const res = await request(app).get(`/displays/search`);
//     expect(200);
//     expect(res.body).toHaveProperty("found");
//     expect(res.body).toHaveProperty("not_found");
//     expect(res.body.found).toHaveLength(1);
//     expect(res.body.not_found).toHaveLength(1);
//     expect(res.body.found[0].id).toEqual(saveDisplay.body.id);
//   });
// });

