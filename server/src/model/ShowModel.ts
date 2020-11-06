import { LedController } from "../controllers/LedController";

var knex = require("../../db/client");

import { PatternModel } from "./PatternModel";
import { DisplayModel } from "./DisplayModel";
import { RandomModel } from "./RandomModel";

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

const getPatternShow = async (id: number) => {
  const cue = await PatternModel.getOne(id);
  let colours: Colour;
  if (cue.length > 0) {
    colours = await getColours(cue.colours, []);
    cue.colours = colours;
  }
  return cue;
};

const getRandomShow = async (id: number) => {
  const cue = await RandomModel.getOne(id);
  return cue;
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
        .select("shows.name", "shows.display_id", "type", "shows.id")
        .where("shows.id", id)
        .join("showTypes", "showTypes.id", "type_id");
      if (show.length !== 0) {
        let cue;
        switch (show[0].type) {
          case "pattern":
            cue = await getPatternShow(id);
            break;
          case "random":
            cue = await getRandomShow(id);
          default:
            break;
        }
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
      const newShow = await knex("shows").insert(show).returning("id");
      if (cue) {
        cue.show_id = newShow[0];
        const newCue = await PatternModel.create(cue);
      }
      return newShow;
    } catch (error) {
      return error;
    }
  },
  async update(id, show, cue) {
    if (show.cue) {
      delete show.cue;
    }
    const updateShow = await knex("shows")
      .where({ id })
      .update(show)
      .returning("id");
    if (cue) {
      await PatternModel.update(cue);
    }
    return updateShow;
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

  // CUES
  async getOneCue(showId) {
    const show = await this.getOne(showId);
    let cue;
    switch (show[0].type) {
      case "pattern":
        cue = await PatternModel.getOne(showId);
        break;
      case "random":
        cue = await RandomModel.getOne(showId);

      default:
        break;
    }
    return cue;
  },
  async createCue(cue) {
    const show = await this.getOne(cue.show_id);
    let savedCue;
    switch (show[0].type) {
      case "pattern":
        savedCue = await PatternModel.create(cue);
        break;
      case "random":
        savedCue = await RandomModel.create(cue);
      default:
        break;
    }
    return savedCue;
  },
  async updateCue(cue) {
    const show = await this.getOne(cue.show_id);
    let updatedCue;
    switch (show[0].type) {
      case "pattern":
        updatedCue = await PatternModel.update(cue);
        break;
      case "random":
        updatedCue = await RandomModel.update(cue);
      default:
        break;
    }
    return updatedCue;
  },

  // VALIDS
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
