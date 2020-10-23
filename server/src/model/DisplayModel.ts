const axios = require("axios");
const knex = require("../../db/client");


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
    const response = await DisplayModel.search(id);
    found.push(currentDisplay!);
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

const DisplayModel = {
  async getAll() {
    try {
      return await knex("displays").select(
        "id",
        "name",
        "ipaddress",
        "led_number"
      );
    } catch (error) {
      return error;
    }
  },
  async getOne(id: number) {
    try {
      const display = await knex("displays")
        .select("name", "ipaddress", "id", "led_number")
        .where({ id });
      return display.length !== 0
        ? display
        : new Error("Display does not exist");
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
    let valid = true;
    const result: Result = {};
    const allowParams: string[] = ["name", "ipaddress", "led_number"];
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
    const seaching = await searchPromise(displays, [], []);
    return seaching;
  },
};

export { DisplayModel };
