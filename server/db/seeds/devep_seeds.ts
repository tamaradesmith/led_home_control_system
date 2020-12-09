import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("colours").del();
  await knex("shows").del();

  // Inserts seed entries

  // SEED COLOUR
  await knex("colours").insert([
    { name: 'red', hue: 1, saturation: 100, lightness: 50 },
    {
      name: 'red-orange',
      hue: 6,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'orange-red',
      hue: 9,
      saturation: 100,
      lightness: 50
    },
    { name: 'orange', hue: 12, saturation: 100, lightness: 50 },
    {
      name: 'orange-lt',
      hue: 18,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'yellow-orange',
      hue: 21,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'yellow',
      hue: 30,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'yellow-lemon',
      hue: 33,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'yellow-lt',
      hue: 37,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'yellow-lime',
      hue: 42,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'green-yellow',
      hue: 55,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'green-lt',
      hue: 58,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'green-lime',
      hue: 70,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'green-med-yellow',
      hue: 75,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'green-med',
      hue: 80,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'green-med ii',
      hue: 85,
      saturation: 100,
      lightness: 50
    },
    { name: 'green', hue: 90, saturation: 100, lightness: 50 },
    {
      name: 'green ii',
      hue: 95,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'green-med-dk',
      hue: 100,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'green-med-dk ii',
      hue: 105,
      saturation: 100,
      lightness: 50
    },
    { name: 'green', hue: 110, saturation: 100, lightness: 50 },
    {
      name: 'green-dk',
      hue: 120,
      saturation: 100,
      lightness: 50
    },
    { name: 'aqua', hue: 125, saturation: 100, lightness: 50 },
    { name: 'teal', hue: 130, saturation: 100, lightness: 50 },
    {
      name: 'aqua ii',
      hue: 135,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'blue-teal',
      hue: 140,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'blue-lt',
      hue: 145,
      saturation: 100,
      lightness: 50
    },
    { name: 'cyan', hue: 155, saturation: 100, lightness: 50 },
    {

      name: 'blue-med',
      hue: 160,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'blue-med ii',
      hue: 175,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'blue-med iii',
      hue: 180,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'blue-med-dk',
      hue: 195,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'blue-med-dk ii',
      hue: 200,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'blue-dk',
      hue: 220,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'blue-dk ii',
      hue: 230,
      saturation: 100,
      lightness: 50
    },
    { name: 'blue', hue: 240, saturation: 100, lightness: 50 },
    { name: 'indigo', hue: 245, saturation: 100, lightness: 50 },
    {
      name: 'purple-blue',
      hue: 250,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'purple-blue lt',
      hue: 255,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'purple-lt ii',
      hue: 260,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'purple',
      hue: 265,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'purple-pinky',
      hue: 275,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'purple-pink',
      hue: 290,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'pink-purple',
      hue: 295,
      saturation: 100,
      lightness: 50
    },
    { name: 'pink', hue: 315, saturation: 100, lightness: 50 },
    {
      name: 'pink-hot',
      hue: 320,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'pink-med',
      hue: 330,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'magenta',
      hue: 335,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'magenta ii',
      hue: 345,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'pink-dk',
      hue: 350,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'red-rose',
      hue: 355,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'red-rouge',
      hue: 360,
      saturation: 100,
      lightness: 50
    }
  ]
  );

  //  Colour Pre-Colour 
  await knex("colours").insert([
    { name: 'pre-red', hue: 1, saturation: 100, lightness: 50 },
    {
      name: 'pre-red-orange',
      hue: 6,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-orange-red',
      hue: 9,
      saturation: 100,
      lightness: 0
    },
    { name: 'pre-orange', hue: 12, saturation: 100, lightness: 0 },
    {
      name: 'pre-orange-lt',
      hue: 18,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-yellow-orange',
      hue: 21,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-yellow',
      hue: 30,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-yellow-lemon',
      hue: 33,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-yellow-lt',
      hue: 37,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-yellow-lime',
      hue: 42,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-green-yellow',
      hue: 55,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-green-lt',
      hue: 58,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-green-lime',
      hue: 70,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-green-med-yellow',
      hue: 75,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-green-med',
      hue: 80,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-green-med ii',
      hue: 85,
      saturation: 100,
      lightness: 0
    },
    { name: 'pre-green', hue: 90, saturation: 100, lightness: 0 },
    {
      name: 'pre-green ii',
      hue: 95,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-green-med-dk',
      hue: 100,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-green-med-dk ii',
      hue: 105,
      saturation: 100,
      lightness: 0
    },
    { name: 'pre-green', hue: 110, saturation: 100, lightness: 0 },
    {
      name: 'pre-green-dk',
      hue: 120,
      saturation: 100,
      lightness: 0
    },
    { name: 'pre-aqua', hue: 125, saturation: 100, lightness: 0 },
    { name: 'pre-teal', hue: 130, saturation: 100, lightness: 0 },
    {
    name: 'pre-aqua ii',
      hue: 135,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-blue-teal',
      hue: 140,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-blue-lt',
      hue: 145,
      saturation: 100,
      lightness: 0
    },
    { name: 'pre-cyan', hue: 155, saturation: 100, lightness: 0 },
    {
    name: 'pre-blue-med',
      hue: 160,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-blue-med',
      hue: 175,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-blue-med ii',
      hue: 180,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-blue-med-dk',
      hue: 195,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-blue-med-dk ii',
      hue: 200,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-blue-dk',
      hue: 220,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-blue-dk ii',
      hue: 230,
      saturation: 100,
      lightness: 0
    },
    { name: 'pre-blue', hue: 240, saturation: 100, lightness: 0 },
    { name: 'pre-indigo', hue: 245, saturation: 100, lightness: 0 },
    {
    name: 'pre-purple-blue',
      hue: 250,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-purple-blue lt',
      hue: 255,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-purple-lt ii',
      hue: 260,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-purple',
      hue: 265,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-purple-pinky',
      hue: 275,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-purple-pink',
      hue: 290,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-pink-purple',
      hue: 295,
      saturation: 100,
      lightness: 0
    },
    { name: 'pre-pink', hue: 315, saturation: 100, lightness: 0 },
    {
      name: 'pre-pink-hot',
      hue: 320,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-pink-med',
      hue: 330,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-magenta',
      hue: 335,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-magenta ii',
      hue: 345,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-pink-dk',
      hue: 350,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-red-rose',
      hue: 355,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'pre-red-rouge',
      hue: 360,
      saturation: 100,
      lightness: 0
    }
  ]
  );

  await knex("showTypes").insert([
    { type: "pattern" },
    { type: "cue" },
    { type: "random" },
  ]);

}