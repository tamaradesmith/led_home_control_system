var knex = require("../../db/client");

import { PatternModel } from "./PatternModel";

const ShowModel = {
  async getAll() {
    try {
      return await knex("shows")
        .select("name", "display_id", "shows.id", "showTypes.type")
        .join("showTypes", "showTypes.id", "type_id")
        .groupBy("name", "display_id", "shows.id", "showTypes.type")
        .orderBy("name");
    } catch (error) {
      return error;
    }
  },
  async getOne(id: number) {
    try {
      const show = await knex("shows")
        .select("shows.name", "shows.display_id", "type")
        .where("shows.id", id)
        .join("showTypes", "showTypes.id", "type_id");
      if (show.length !== 0) {
        const cue = await PatternModel.getOne(id);
        show[0].cue = cue;
        return show;
      } else {
        return new Error("show does not exist");
      }
    } catch (error) {
      return error;
    }
  },
  async create(show) {
    try {
      return knex("shows").insert(show).returning("*");
    } catch (error) {
      return error;
    }
  },
  async update(id, show) {
    if (show.cue) {
      delete show.cue;
    }
    return await knex("shows").where({ id }).update(show).returning("*");
  },
  async delete(id: number) {
    try {
      return knex("shows").where({ id }).del();
    } catch (error) {
      return error;
    }
  },

  validShow(show, update) {
    let valid = true;
    if (show.type) {
      delete show.type;
    }
    if (show.cue) {
      delete show.cue;
    }
    const validParam = ["name", "display_id", "id", "type_id"];
    const keys = Object.keys(show);
    keys.forEach((key) => {
      if (!validParam.includes(key)) {
        valid = false;
      }
    });
    if (!show.name || show.name.length < 1) {
      valid = false;
    }

    if (!show.type_id || show.type_id < 1) {
      if (!update) {
        valid = false;
      }
    }
    return valid ? valid : new Error("Invalid entry");
  },
};

export { ShowModel };
