var knex = require("../../db/client");

export const RandomModel = {
  async getOne(showId) {
    if (!showId) {
      return [];
    }
    const cue = await knex("randomShows")
      .select("*")
      .where({ show_id: showId });
    return cue[0];
  },

  async create(cue) {
    return await knex("randomShows").insert([cue]).returning("*");
  },

  async update(cue) {
    console.log("🚀 ~ file: RandomModel.ts ~ line 19 ~ update ~ cue", cue);
    try {
      const show = await knex("randomShows")
        .where({ id: cue.id })
        .update(cue)
        .returning("*");
      console.log("🚀 ~ file: RandomModel.ts ~ line 21 ~ update ~ show", show);
      return show[0];
    } catch (error) {
      console.error("update -> error", error);
      return error;
    }
  },
};
