const axios = require("axios");

const waitTime = {};

export const LedController = {
  // TEXT COLOUR
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

  // TEST AND PLAY SHOW

  // Pattern
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
        error.log("playShow -> error", error);
        return error;
      }
      const colourholder = cue.colours.shift();
      cue.colours.push(colourholder);
    }, (cue.wait_time + cue.fade) * 1000);
  },

  // Random
  async playShowRandom(display, cue) {
    if (waitTime[display.name] !== undefined) {
      clearInterval(waitTime[display.name]);
    }
    waitTime[display.name] = setInterval(() => {
      const string = createURLStringRandom(display.led_number, cue);
      try {
        axios.post(
          `http://${display.ipaddress}/rest/colourapp/fixture/${display.name}/channel/showhsl/${string}`
        );
      } catch (error) {
        error.log("playShowRadom -> error", error);
        return error;
      }
    }, (randomWait(cue.wait_time, cue.wait_random) + cue.fade) * 1000);
  },

  async testCue(display, cue) {
    if (waitTime[display.name] !== undefined) {
      clearInterval(waitTime[display.name]);
    }
    await this.ledsOneColour(display, {
      hue: 0,
      saturation: 100,
      lightness: 0,
    });

    const urlstring = createURLStringCue(display.led_number, cue.leds);
    try {
      axios.post(
        `http://${display.ipaddress}/rest/colourapp/fixture/${display.name}/channel/showhsl/${urlstring}`
      );
    } catch (error) {
      error.log("playShowRadom -> error", error);
      return error;
    }
  },
};

const createURLString = (ledsCount: number, cue) => {
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

const createURLStringRandom = (ledsCount: number, cue) => {
  let urlString = "";
  for (let i = 0; i < ledsCount; i++) {
    let hue = Math.round(Math.random() * cue.hue_max);
    while (hue < cue.hue_min) {
      hue = Math.round(Math.random() * cue.hue_max);
    }
    let fade = cue.fade;
    if (cue.fade_random) {
      fade = Math.round(Math.random() * cue.fade);
    }
    urlString += `${fade},${hue},${cue.saturation / 100},${
      cue.lightness / 100
    },`;
  }
  return urlString;
};

const randomWait = (max: number, random) => {
  return random ? Math.round(Math.random() * max) : max;
};

const createURLStringCue = (ledsCount, leds) => {
  let urlString: string[] = [];
  for (let i = 0; i < ledsCount; i++) {
    urlString.push("0,-1,0,0");
  }
  leds.forEach((led) => {
    const colour = led.colour;
    urlString[led.led_number] = `${led.fade},${colour.hue},${
      colour.saturation / 100
    },${colour.lightness}
    `;
  });
  return urlString.join(",");
};
