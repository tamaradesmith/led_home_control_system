import { LedController } from "../controllers/LedController";
import { ShowModel } from "./ShowModel";

const axios = require("axios");
var knex = require("../../db/client");

declare global {
  interface ObjectConstructor {
    typedKeys<T>(o: T): Array<keyof T>;
  }
}
Object.typedKeys = Object.keys as any;

interface Display {
  id: number;
  name: string;
  ipaddress: string;
  led_number: number;
  default_on: boolean;
  default_show?: number;
  shows?: [];
}
interface Result {
  name?: Error;
  ipaddress?: Error;
  led_number?: Error;
  message?: Error;
}
const validateIpadress = (ipadress: string) => {
  const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipadress.match(ipformat)) {
    return true;
  } else {
    return false;
  }
};

const searchPromise = async (
  displays: Display[],
  found: Display[],
  not_found: Display[]
) => {
  const currentDisplay = displays.shift();
  try {
    const id = currentDisplay!.id;
    if (await DisplayModel.search(id)) {
      found.push(currentDisplay!);
    };
    if (displays.length > 0) {
      await searchPromise(displays, found, not_found);
    } else {
      return { found, not_found };
    }
  } catch (error) {
    not_found.push(currentDisplay!);
    if (displays.length > 0) {
      await searchPromise(displays, found, not_found);
    } else {
      return { found, not_found };
    }
  }
  return { found, not_found };
};

// const getCurrentShow = async (id: number) => {
//   return await knex("shows")
//     .select("name", "shows.id", 'type_id', 'type')
//     .where("shows.id", id)
//     .join("showTypes", "showTypes.id", "type_id");
// };

const DisplayModel = {
  async getAll() {
    try {
      return await knex("displays")
        .select(
          "displays.id",
          "displays.name",
          "ipaddress",
          "led_number",
          "default_on",
          "default_show"
        )
        .groupBy(
          "displays.name",
          "led_number",
          "displays.id",
          "ipaddress",
          "default_on",
          "default_show"
        )
        .orderBy("displays.name");
    } catch (error) {
      return error;
    }
  },
  async getOne(id: number) {
    try {
      const display = await knex("displays")
        .select(
          "name",
          "ipaddress",
          "id",
          "led_number",
          "default_on",
          "default_show"
        )
        .where("displays.id", id);
      const shows = await this.getShows(id);
      display[0].shows = shows;
      return display.length !== 0
        ? display
        : new Error("Display does not exist");
    } catch (error) {
      return error;
    }
  },
  async update(id: number, info: Display) {
    if (info.shows) {
      delete info.shows;
    }
    try {
      const display = await knex("displays")
        .where({ id })
        .update(info)
        .returning("*");
      const shows = await this.getShows(id);
      display[0].shows = shows;

      return display;
    } catch (error) {
      return error;
    }
  },
  async create(info: Display) {
    try {
      return await knex("displays").insert(info).returning("*");
    } catch (error) {
      return error;
    }
  },
  async delete(id: number) {
    try {
      return await knex("displays").where({ id }).del();
    } catch (error) {
      return error;
    }
  },

  // Extra Functions
  validDisplay(display: Display) {
    if (display.shows) {
      delete display.shows;
    }
    let valid = true;
    const result: Result = {};
    const allowParams: string[] = [
      "name",
      "ipaddress",
      "led_number",
      "default_show",
      "default_on",
    ];
    const keys = Object.keys(display);
    keys.forEach((key) => {
      if (!allowParams.includes(key) && key !== "id") {
        result.message = new Error("Invalid entry");
        valid = false;
      }
      if (!display.name || display.name.length < 1) {
        result.name = new Error("Invalid name");
        valid = false;
      }
      if (!display.led_number || display.led_number < 1) {
        result.led_number = new Error("Invalid led number");
        valid = false;
      }
      if (!validateIpadress(display.ipaddress ? display.ipaddress : "0")) {
        result.ipaddress = new Error("Invalid ipaddress");
        valid = false;
      }
    });
    if (!valid) {
      if (Object.keys(result).length > 1) {
        return new Error("Invalid Data");
      } else {
        const key = Object.keys(result);
        return (result as any)[key[0]];
      }
    } else {
      return valid;
    }
  },
  async search(id: number) {
    return new Promise(async (res, rej) => {
      const timer = setTimeout(() => {
        return rej(new Error("Node not located"));
      }, 2000);
      try {
        const display: Display = (await this.getOne(id))[0];
        const result = await axios.get(`http://${display.ipaddress}/rest`);
        clearTimeout(timer);
        res(true);
      } catch (error) {
        rej(false);
      }
    });
  },
  async searchAll() {
    const displays = await this.getAll();
    const seaching = displays.length > 0 ? await searchPromise(displays, [], []) : { found: [], not_found: [] };
    return seaching;
  },
  async getShows(id: number) {
    return await knex("shows")
      .select("name", "id", "display_id")
      .where({ display_id: id })
      .orWhere({ display_id: null })
      .groupBy("name", "display_id", "id")
      .orderBy("name");
  },


  async playShow(id: number, showId: number) {
    const display = await this.getOne(id);
    const show = await ShowModel.getOne(showId);
    await LedController.play(display[0], show[0]);
    return "playing show?";
  },

  async playAll() {
    const displays = await this.getAll();
    displays.forEach(async (display: Display, index: number) => {
      if (display.default_show) {
        const show = await ShowModel.getOne(display.default_show);
        setTimeout(() => {
          LedController.play(display, show[0]);
        }, 200 * index);
      }
    });
  },

  async playOne(displayId: number) {
    const display = await this.getOne(displayId);
    if (display[0].default_show) {
      const show = await ShowModel.getOne(display[0].default_show);
      LedController.play(display[0], show[0]);
    }
  },

  async stopAll() {
    const displays = await this.getAll();
    displays.forEach((display: Display, index: number) => {
      setTimeout(() => {
        LedController.stop(display);
      }, 200 * index);
    });
  },
  async stopOne(displayId: number) {
    const display = await this.getOne(displayId);
    LedController.stop(display[0]);
  },
};

export { DisplayModel };
