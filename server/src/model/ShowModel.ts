import { LedController } from "../controllers/LedController";

var knex = require("../../db/client");

import { PatternModel } from "./PatternModel";
import { DisplayModel } from "./DisplayModel";

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

const getColours = async (coloursId, coloursInfo) => {
  const colour = coloursId.shift();
  if (coloursId.length > 0) {
    const info = await knex("colours")
      .select("id", "name", "hue", "saturation", "lightness")
      .where({ id: colour });
    coloursInfo.push(info[0]);
    return await getColours(coloursId, coloursInfo);
  } else {
    const info = await knex("colours")
      .select("id", "name", "hue", "saturation", "lightness")
      .where({ id: colour });
    coloursInfo.push(info[0]);
    return await coloursInfo;
  }
};

const ShowModel = {
  async getAll() {
    try {
      return await knex("shows")
        .select("name", "display_id", "shows.id", "type_id", "showTypes.type")
        .join("showTypes", "showTypes.id", "shows.type_id")
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
  async create(show, cue) {
    try {
      const newShow =await knex("shows").insert(show).returning("id");
      if (cue) {
        cue.show_id = newShow[0];
        const newCue = await PatternModel.create(cue);
      }
      return newShow;
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
  async getShowTypes() {
    try {
      return knex("showTypes").select("*");
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

  async testShow(displayId, show) {
    const colours = await getColours(show.colours, []);
    const display = await DisplayModel.getOne(displayId);
    show.colours = colours;
    const play = await LedController.playShow(display[0], show);
  },
};

export { ShowModel };
