interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
  default_on?: boolean;
}

interface Show {
  name: string;
  type_id: number;
  display_id?: number;
  type?: string;
  id?: number;
}

interface CueShow extends Show {
  cue?: CueCue[];
}

interface PatternShow extends Show {
  cue?: PatternCue;
}

interface RandomShow extends Show {
  cue?: RandomCue;
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
  colour?: Colour;
  led_number: number;
  led_colour: number;
}

interface Type {
  id: number;
  type: string;
}

// CUE TYPES

interface PatternCue {
  id?: number;
  show_id?: number;
  wait_time: number;
  pattern_length?: number;
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
  id?: number;
  show_id?: number;
  time_code: number;
  leds: CueLeds[];
}



interface CueLeds {
  id?: number;
  cue_show_id?: number
  fade: number;
  led_colour: number;
  led_number: number;
  colour: Colour;
}
