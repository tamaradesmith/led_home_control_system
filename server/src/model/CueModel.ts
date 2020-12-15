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
    try {
      const leds = await knex("cueLeds")
        .select("*")
        .where({ cue_show_id: cue.id })
        .groupBy("led_number", "cueLeds.id")
        .orderBy("led_number", "cue_show_id", "id", "fade", "led_colour");
      const ledWithColour = await getColours(leds, []);
      cue.leds = ledWithColour;
      cuesAndLeds.push(cue);
      return await getCuesLeds(cues, cuesAndLeds);
    } catch (error) {
      return error;
    }
  } else {
    const leds = await knex("cueLeds")
      .select("*")
      .where({ cue_show_id: cue.id })
      .groupBy("led_number", "cueLeds.id")
      .orderBy("led_number", "cue_show_id", "id", "fade", "led_colour");
    const ledWithColour = await getColours(leds, []);
    cue.leds = ledWithColour;
    cuesAndLeds.push(cue);
    return await cuesAndLeds;
  }
};

const getColours = async (leds, LedsWithColours) => {
  const led = leds.shift();
  if (leds.length > 0) {
    const info = await knex("colours")
      .select("id", "name", "hue", "saturation", "lightness")
      .where({ id: led.led_colour });
    led.colour = info[0];
    LedsWithColours.push(led);
    return await getColours(leds, LedsWithColours);
  } else {
    const info = await knex("colours")
      .select("id", "name", "hue", "saturation", "lightness")
      .where({ id: led.led_colour });
    led.colour = info[0];
    LedsWithColours.push(led);
    return await LedsWithColours;
  }
};

const saveLeds = async (cueId: number, cues) => {

  const savedLeds = cues.leds.map((led) => {
    const newLedInfo = {
      cue_show_id: cueId,
      led_colour: led.colour ? parseInt(led.colour.id) : led.led_colour,
      fade: parseInt(led.fade),
      led_number: led.led_number,
    };
    return newLedInfo;
  });

  try {
    const ledSaved = await knex("cueLeds").insert(savedLeds).returning("id");
    return ledSaved;
  } catch (error) {
    return error;
  }
};

const updateLeds = async (leds) => {
  const led = leds.shift();
  led.led_colour = led.colour.id;
  if (led.colour) {
    delete led.colour;
  }
  let updated;
  if (led.id) {
    try {
      updated =await knex("cueLeds")
      .where({ id: led.id })
      .update(led)
      .returning("id");
    } catch (error) {
      return error;
    }
  } else {
    updated = await knex("cueLeds").insert(led).returning("id");
  }

  if (leds.length > 0) {
    return updateLeds(leds);
  } else {
    return updated;
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
        .where({ show_id: showId })
        .groupBy("time_code", "cueShows.id")
        .orderBy("time_code", "show_id", "id");
      const cuesAndLeds = await getCuesLeds(cues, []);
      return cuesAndLeds;
    } catch (error) {
      return error;
    }
  },
  async create(cue) {
    const savedcue = await knex("cueShows")
      .insert([{ time_code: cue.time_code, show_id: cue.show_id }])
      .returning("id");
    const result = await saveLeds(savedcue[0], cue);
    return savedcue;
  },

  async update(cue) {
    const leds = cue.leds;
    const cuetoUpdate = { id: cue.id, time_code: cue.time_code, show_id: cue.show_id };
    const updatedCue = await knex("cueShows")
      .where({ id: cuetoUpdate.id })
      .update(cuetoUpdate)
      .returning("*");
    await updateLeds(leds);
    return updatedCue;
  },
  async delect(id: number) {
    return await knex("cueShows").where({ id: id }).del().returning("*");
  },

  async delectLeds(leds) {
    if (leds.length === 0) {
      return "leds delete/no leds"
    } else {
      const led = leds.pop();
      await knex("cueLeds").where({ id: led.id }).del().returning('*')
      return this.delectLeds(leds)
    }
  }
};
