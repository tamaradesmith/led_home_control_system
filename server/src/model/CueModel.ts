var knex = require("../../db/client");

const getCuesLeds = async (cues, cuesAndLeds) => {
  const cue = cues.shift();
  if (cues.length > 0) {
    const leds = await knex("cueLeds").select("*").where({ cue_id: cue.id });
    const ledWithColour = await getColours(leds, []);
    cue.leds = ledWithColour;
    cuesAndLeds.push(cue);
    return await getCuesLeds(cues, cuesAndLeds);
  } else {
    const leds = await knex("cueLeds").select("*").where({ cue_id: cue.id });
    cue.leds = leds;
    cuesAndLeds.push(cue);
    return cuesAndLeds;
  }
};

const getColours = async (leds, LedsWithColours) => {
  const led = leds.shift();
  if (leds.length > 0) {
    const info = await knex("colours")
      .select("id", "name", "hue", "saturation", "lightness")
      .where({ id: led.colour_id });
    led.colour = info[0];
    LedsWithColours.push(led);
    return await getColours(leds, LedsWithColours);
  } else {
    const info = await knex("colours")
      .select("id", "name", "hue", "saturation", "lightness")
      .where({ id: led.colour_id });
    led.colour = info[0];
    LedsWithColours.push(led);
    return await LedsWithColours;
  }
};

const saveLeds = async (cueId, leds) => {
  leds.forEach((led) => {
    led.cue_id = cueId;
  });
  const ledSaved = await knex("cueLeds").insert(leds).returning("id");
  return ledSaved;
};

export const CueModel = {
  async getOneshows(showId) {
    if (!showId) {
      return [];
    }
    try {
      const cues = await knex("cueShows")
        .select("*")
        .where({ show_id: showId });
      const leds = await getCuesLeds(cues, []);
      return leds;
    } catch (error) {
      return error;
    }
  },
  async create(cue) {
    const savedcue = await knex("cueShows")
      .insert([
        { id: cue.cue_id, time_code: cue.time_code, show_id: cue.show_id },
      ])
      .returning("id");
    await saveLeds(savedcue[0], cue.leds);
    return savedcue;
  },
};
