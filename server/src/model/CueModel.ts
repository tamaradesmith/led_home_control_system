var knex = require("../../db/client");

interface Led {
  id?: number;
  colour_id: number;
  led_number: number;
  fade: number;
  cue_id: number;
}

const getCuesLeds = async (cues, cuesAndLeds) => {
  const cue = cues.shift();
  if (cues.length > 0) {
    const leds = await knex("cueLeds").select("*").where({ cue_id: cue.id });
    const ledWithColour = await getColours(leds, []);
    cue.leds = ledWithColour;
    cuesAndLeds.push(cue);
    return await getCuesLeds(cues, cuesAndLeds);
  } else {
    const leds = await knex("cueLeds").select("*").where({ cue_show_id: cue.id });
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

const saveLeds = async (cueId: number, leds) => {
  const toSaveLeds = leds.map((led) => {
    const newLedInfo = {
      cue_show_id: cueId,
      led_colour: parseInt(led.colour.id),
      fade: parseInt(led.fade),
      led_number: parseInt(led.led_number),
    };
    return newLedInfo;
  });
  try {
    const ledSaved = await knex("cueLeds").insert(toSaveLeds).returning("id");
    return ledSaved;
  } catch (error) {
    return error;
  }
};

const updateLeds = async (leds) => {
  const led = leds.shift();
  try {
    const updated = knex("cueLeds")
      .where({ id: led.id })
      .update(led)
      .returning("id");
  } catch (error) {
    return error;
  }
  if (leds.length > 0) {
    return updateLeds(leds);
  } else {
    return "finished";
  }
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
  async update(cues) {
    let leds;
    const toUpdate = cues.map(
      (cue: {
        id: number;
        time_code: number;
        show_id: number;
        leds: Led[];
      }) => {
        leds = cue.leds;
        return { id: cue.id, time_code: cue.time_code, show_id: cue.show_id };
      }
    );
    const updatedCue = await knex("cueShows")
      .where({ id: toUpdate[0].id })
      .update(toUpdate[0])
      .returning("*");
    const updatedLeds = await updateLeds(leds);
    return updatedCue;
  },
};
