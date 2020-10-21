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
  ipaddress: "192.168.1.208",
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
