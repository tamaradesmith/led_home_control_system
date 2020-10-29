const axios = require("axios");

export const LedController = { 
async ledsColour(display, colour){
  for (let i = 0; display.led_number> i; i++){

    const result = await axios.post(`http://${display.ipaddress}/rest/colourapp/fixture/${display.name}/channel/hsl${i}/${colour.hue},${colour.saturation/100},${colour.lightness/100}`);
  }
  }
}

// colourapp / fixture / ivan / channel / hsl2 / 300, 0.5, 0.0;