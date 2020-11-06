// import { setInterval } from "timers";

// var knex = require("../../db/client");

const axios = require("axios");

const waitTime = {};

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
  async playShow(display, cue) {
    if (waitTime[display.name] !== undefined) {
      clearInterval(waitTime[display.name]);
    }
    waitTime[display.name] = setInterval(() => {
      const string = createURLString(display.led_number, cue);
      try {
        axios.post(
          `http://${display.ipaddress}/rest/colourapp/fixture/${display.name}/channel/showhsl/${string}`
        );
      } catch (error) {
        return error;
      }
      const colourholder = cue.colours.shift();
      cue.colours.push(colourholder);
    }, (cue.wait_time + cue.fade) * 1000);
  },
};
const createURLString = (ledsCount, cue) => {
  let count = 0;
  let urlString = "";
  for (let i = 0; i < ledsCount; i++) {
    const coloursInfo = cue.colours[count];
    urlString += `${cue.fade},${coloursInfo.hue},${
      coloursInfo.saturation / 100
    },${coloursInfo.lightness / 100},`;
    if (count >= cue.pattern_length - 1) {
      count = 0;
    } else {
      count++;
    }
  }
  return urlString;
};
