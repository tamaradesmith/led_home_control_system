import { getEnabledCategories } from "trace_events";

const knex = require("../../db/client");

const ShowModel = {
  async getAll() {
    try {
      return await knex("shows")
        .select("name", "display_id")
        .groupBy("name", "display_id")
        .orderBy("name");
    } catch (error) {
      return error;
    }
  },
  async getOne(id: number) {
    try {
      const show = await knex("shows")
        .select("name", "display_id")
        .where({ id });
      return show.length !== 0 ? show : new Error("show does not exist");
    } catch (error) {
      return error;
    }
  },
  async delete(id: number) {
    try {
      return knex("shows").where({ id }).del();
    } catch (error) {
      return error;
    }
  },
};

export { ShowModel };
