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
    console.log("create -> cue", cue);
    return await knex("randomShows").insert([cue]).returning("*");
  },
  async update(cue) {
    return await knex("randomShows")
      .where({ id: cue.id })
      .update(cue)
      .returning("*");
  },
};
