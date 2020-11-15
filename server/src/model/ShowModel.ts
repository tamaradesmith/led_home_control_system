import { LedController } from "../controllers/LedController";

var knex = require("../../db/client");

import { PatternModel } from "./PatternModel";
import { DisplayModel } from "./DisplayModel";
import { RandomModel } from "./RandomModel";
import { CueModel } from "./CueModel";

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
  if (cue.colours) {
    colours = await getColours(cue.colours, []);
    cue.colours = colours;
  }
  return cue;
};

const getRandomShow = async (id: number) => {
  const cue = await RandomModel.getOne(id);
  return cue;
};

const getcueShow = async (id: number) => {
  const cues = await CueModel.getOneshows(id);
  return cues;
};

const getTypeName = async (typeId) => {
  const types = await knex("showTypes").select("*");
  let name: string = "";
  types.forEach((type) => {
    if (parseInt(type.id) === typeId) {
      name = type.type;
    }
  });
  return name;
};

const validCueShow = (show) => {
  if (show.type) {
    delete show.type;
  }
  let valid = true;
  const validParam = ["name", "type_id", "id", "cue"];
  const validCueParams = ["time_code", "leds", "show_id"];
  const validLedParams = ["colour_id", "fade", "led_number", "cue_id"];
  if (show.type) {
    delete show.type;
  }
  const keys = Object.keys(show);
  keys.forEach((key) => {
    if (!validParam.includes(key) && key !== "display_id") {
      valid = false;
    }
  });
  if (!show.name || show.name.length < 1) {
    valid = false;
  }

  if (!show.type_id || show.type_id < 1) {
    valid = false;
  }
  if (show.cue) {
    const keysCue = Object.keys(show.cue[0]);
    const cue = show.cue[0];

    keysCue.forEach((key) => {
      if (!validCueParams.includes(key) && key !== "id") {
        valid = false;
      }

      if (cue.time_code < 0 || typeof cue.time_code !== "number") {
        valid = false;
      }
      const keysCueLed = Object.keys(show.cue[0].leds[0]);
      keysCueLed.forEach((key) => {
        if (!validLedParams.includes(key) && key !== "id") {
          valid = false;
        }
        if (typeof cue.leds[0][key] !== "number" && key !== "id") {
          valid = false;
        }
        if (cue.leds[key] < 0 && key !== "fade") {
          valid = false;
        }
      });
    });
  } else {
    valid = false;
  }
  return valid;
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
        .select("shows.name", "shows.display_id", "type", "shows.id", "type_id")
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
          case "cue":
            cue = await getcueShow(id);
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
    if (show.type) {
      delete show.type;
    }
    if (show.cue) {
      delete show.cue;
    }
    try {
      const newShow = await knex("shows").insert(show).returning("id");
      if (cue) {
        const type = await getTypeName(show.type_id);
        cue.show_id = newShow[0];
        let newCue;
        switch (type) {
          case "pattern":
            newCue = await PatternModel.create(cue);
            break;
          case "random":
            newCue = await RandomModel.create(cue);
            break;
          case "cue":
            try {
              newCue = await CueModel.create(cue);
            } catch (error) {
              return error
            }
        
            break;
          default:
            break;
        }
      }
      return newShow;
    } catch (error) {
      return error;
    }
  },
  async update(id, show, cue, type) {
    if (show.cue) {
      delete show.cue;
    }
    const updateShow = await knex("shows")
      .where({ id })
      .update(show)
      .returning("id");
    if (cue) {
      switch (type) {
        case "pattern":
          await PatternModel.update(cue);
          break;

        case "random":
          await RandomModel.update(cue);
          break;

        case "cue":
          await CueModel.update(cue);
          break;

        default:
          break;
      }
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
  async createCue(showId: number, cue) {
    const show = await this.getOne(showId);
    let savedCue;
    switch (show[0].type) {
      case "pattern":
        savedCue = await PatternModel.create(cue);
        break;
      case "random":
        savedCue = await RandomModel.create(cue);
        break;
      case "cue":
        savedCue = await CueModel.create(cue);
        break;
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
    if (show.type === "cue") {
      valid = validCueShow(show);
    } else {
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
    }
    return valid ? valid : new Error("Invalid entry");
  },

  async testShow(displayId, show, type: string) {
    const display = await DisplayModel.getOne(displayId);
    switch (type) {
      case "pattern":
        const colours = await getColours(show.colours, []);
        show.colours = colours;
        const play = await LedController.playShow(display[0], show);
        break;
      case "random":
        await LedController.playShowRandom(display[0], show);
        break;
      case "cue":
        
        await LedController.playCueShow(display[0], show);
        break;
      default:
        return "missing show type";
        break;
    }
  },
};

export { ShowModel };
