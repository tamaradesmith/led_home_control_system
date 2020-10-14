import { create } from "domain";

const knex = require("../../db/client");

declare global {
  interface ObjectConstructor {
    typedKeys<T>(o: T): Array<keyof T>;
  }
}
Object.typedKeys = Object.keys as any;

interface Display {
  id: number | null;
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
      return error;
    }
  },
  validDisplay(display: Display) {
    let result: object | Error = {
      name: false,
      ipaddress: false,
      led_number: false,
      message: false,
    };
    const allowParams: string[] = ["name", "ipaddress", "led_number"];
    const keys = Object.keys(display);
    keys.forEach((key) => {
      if (!allowParams.includes(key) && key !== "id") {
        result = new Error("Invalid entry");
      }

      allowParams.forEach((param) => {
        if (
          keys.includes(param) &&
          (display as any)[param] !== undefined &&
          !result.message
        ) {
          (result as any)[param] = (display as any)[param];
        } else {
          result = new Error(`Missing ${param}`);
        }
      });
    });
    return result;
  },
};
