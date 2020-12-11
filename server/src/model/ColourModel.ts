var knex = require("../../db/client");

interface Colour {
  id?: number;
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
}

export const ColourModel = {
  async getAll() {
    try {
      return await knex("colours")
        .select("id", "name", "hue", "saturation", "lightness")
        .groupBy("name", "id", "hue", "saturation", "lightness")
        .orderBy([{ column: 'hue' }, { column: 'saturation', order: 'desc' }]);
    } catch (error) {
      return error;
    }
  },
  async getOne(id: number) {
    try {
      const colour = await knex("colours")
        .select("id", "name", "hue", "saturation", "lightness")
        .where({ id });
      return colour.length !== 0 ? colour : new Error("Colour does not exist");
    } catch (error) {
      return error;
    }
  },
  async create(colour: Colour) {
    try {
      return await knex("colours").insert(colour).returning("*");
    } catch (error) {
      return error;
    }
  },
  async update(id: number, colour: Colour) {
    try {
      return await knex("colours").where({ id }).update(colour).returning("*");
    } catch (error) {
      return error;
    }
  },
  async delete(id: number) {
    try {
      return await knex("colours").where({ id }).del();
    } catch (error) {
      return error;
    }
  },

  validColour(colour: Colour) {
    let vaild = true;
    const keys = Object.keys(colour);
    const allowParams = ["name", "hue", "saturation", "lightness"];
    keys.forEach((key) => {
      if (!allowParams.includes(key) && key !== "id") {
        vaild = false;
      }
    });
    if (!colour.name || colour.name.length < 1) {
      vaild = false;
    }

    if (colour.hue < -0.99 || colour.hue > 360) {
      vaild = false;
    }

    if (!colour.hue) {
      vaild = false;
    }
    if (
      colour.saturation < -0.99 ||
      colour.saturation > 100 ||
      !colour.saturation
    ) {
      vaild = false;
    }

    if (colour.lightness < -0.99 || colour.lightness > 100) {
      vaild = false;
    }

    return vaild;
  },
};

// export { ColourModel };
