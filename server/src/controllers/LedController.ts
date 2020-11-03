import { setInterval } from "timers";

var knex = require("../../db/client");

const axios = require("axios");

export const LedController = {
  async ledsOneColour(display, colour) {
    let result = "";
    for (let i = 0; display.led_number > i; i++) {
      result += `${colour.hue},${colour.saturation / 100},${
        colour.lightness / 100
      },`;
    }
    await axios.post(
      `http://${display.ipaddress}/rest/colourapp/fixture/${display.name}/channel/allhsl/${result}`
    );
  },
  async playShow(display, show) {
    const waitTime = setInterval(() => {
      const string = createURLString(display.led_number, show);
      console.log("playShow -> show.wait_time ", show.wait_time);
      axios.post(
        `http://${display.ipaddress}/rest/colourapp/fixture/${display.name}/channel/showhsl/${string}`
      );
      const colourholder = show.colours.shift();
      show.colours.push(colourholder);
    }, show.wait_time * 1000);
  },
};

const createURLString = (ledsCount, show) => {
  let count = 0;
  let urlString = "";
  for (let i = 0; i < ledsCount; i++) {
    const coloursInfo = show.colours;
    urlString += `2,${coloursInfo[count].hue},${
      coloursInfo[count].saturation / 100
    },${coloursInfo[count].lightness / 100},`;
    if (count >= show.pattern_length - 1) {
      count = 0;
    } else {
      count++;
    }
  }
  return urlString;
};
