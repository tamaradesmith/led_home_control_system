var knex = require("../../db/client");

interface Led {
  id?: number;
  colour_id: number;
  led_number: number;
  fade: number;
  cue_id: number;
}

const getCuesLeds = async (cues, cuesAndLeds) => {
  console.log("getCuesLeds -> cues", cues);
  const cue = cues.shift();
  console.log("getCuesLeds -> cue", cue);
  if (cues.length > 0) {
    try {
      const leds = await knex("cueLeds")
        .select("*")
        .where({ cue_show_id: cue.id })
        .groupBy("led_number", "cueLeds.id")
        .orderBy("led_number", "cue_show_id", "id", "fade", "led_colour");
      console.log("getCuesLeds -> leds", leds);
      const ledWithColour = await getColours(leds, []);
      cue.leds = ledWithColour;
      cuesAndLeds.push(cue);
      return await getCuesLeds(cues, cuesAndLeds);
    } catch (error) {
      console.log("getCuesLeds -> error", error);
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
  const savedCues = cues.map((cue) => {
    const toSaveLeds = cue.leds.map((led) => {
      const newLedInfo = {
        cue_show_id: cueId,
        led_colour: parseInt(led.colour.id),
        fade: parseInt(led.fade),
        led_number: parseInt(led.led_number),
      };
      return newLedInfo;
    });
    return toSaveLeds;
  });
  try {
    console.log("saveLeds -> savedCues", savedCues);
    const ledSaved = await knex("cueLeds").insert(savedCues[0]).returning("id");
    console.log("saveLeds -> ledSaved", ledSaved);
    return ledSaved;
  } catch (error) {
    console.log("saveLeds -> error", error);
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
    console.log("create -> cue", cue);
    const savedcue = await knex("cueShows")
      .insert([
        { id: cue.cue_id, time_code: cue.time_code, show_id: cue.show_id },
      ])
      .returning("id");
      console.log("create -> savedcue", savedcue);
    await saveLeds(savedcue[0], cue);
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