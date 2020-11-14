interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number | string;
  default_on?: boolean;
}

interface Show {
  name: string;
  type_id: number;
  display_id?: number;
  cue: PatternCue | RandomCue | CueCue;
  type: string;
}

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id: number;
}

interface Led {
  fade: number;
  colour: Colour;
  led_number: number;
}

// CUE TYPES

interface PatternCue {
  id?: number;
  show_id?: number;
  wait_time: number;
  pattern_length?: number;
  group_length: number;
  fade: number;
  colours: Colour[] ;
  type?: string;
}

interface RandomCue {
  id?: number;
  show_id?: number;
  wait_time: number;
  wait_random: boolean;
  fade: number;
  fade_random: boolean;
  hue_max: number;
  hue_min: number;
  lightness: number;
  saturation: number;
  type?: string;
}

interface CueCue {
  id: number;
  show_id: number;
  time_code: number;
  leds: cueLeds[];
}

interface cueLeds {
  id: number;
  fade: number;
  led_colour: number;
  led_number: number;
  colour: Colour;
}
