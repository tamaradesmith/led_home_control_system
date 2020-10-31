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
  async ledPattern(display, show) {
    
    
  }
};

// colourapp / fixture / ivan / channel / hsl2 / 300, 0.5, 0.0;
