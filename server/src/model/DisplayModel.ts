import { create } from "domain";

const knex = require("../../db/client");

interface Display {
  name: string | null;
  ipaddress: string;
  led_number: number;
}

module.exports = {
  async getAll() {
    try {
      return await knex("displays").select("name", "ipaddress", "led_number");
    } catch (error) {
      return error;
    }
  },
  async getOne(id: number) {
    try {
      return await knex("displays")
        .select("name", "ipaddress", "id", "led_number")
        .where({ id });
    } catch (error) {
      return error;
    }
  },
  async update(id: number, info: Display) {
    try {
      return await knex("displays").where({ id }).update(info).returning("*");
    } catch (error) {
      return error;
    }
  },
  async create(info: Display) {
    try {
      return await knex("displays").insert(info).returning("*");
    } catch (error) {
      return (error)
    }
  },
};
