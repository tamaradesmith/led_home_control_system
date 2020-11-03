var knex = require("../../db/client");

const splitColour = (dbColour: string) => {
  return dbColour.length > 0 || dbColour !== undefined
    ? dbColour.split(",")
    : [];
};

const joinColour = (colours: number[]) => {
  return colours.join(",");
};

export var PatternModel = {
  async getOne(showId: number) {
    if (!showId) {
      return [];
    }
    const cue = await knex("patternShows")
      .select("*")
      .where({ show_id: showId });
    if (cue[0] !== undefined) {
      cue[0].colours = splitColour(cue[0].colours);
      return cue[0];
    } else {
      return [];
    }
  },
  async create(cue) {
    cue.colours = joinColour(cue.colours);
    const savedCue = await knex("patternShows").insert([cue]).returning("*");
    savedCue[0].colours = splitColour(savedCue[0].colours);
    return savedCue;
  },

  async update(cue) {
    cue.colours = joinColour(cue.colours);
    const updatedCue = await knex("patternShows")
      .where({ id: cue.id })
      .update(cue)
      .returning("*");
    updatedCue[0].colours = splitColour(updatedCue[0].colours);
    return updatedCue;
  },
};
