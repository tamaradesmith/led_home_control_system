import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("colours").del();
  await knex("shows").del();

  // Inserts seed entries

  // SEED COLOUR
  await knex("colours").insert([
    { name: 'red', hue: 1, saturation: 100, lightness: 50 },
    { name: 'orange', hue: 12, saturation: 100, lightness: 50 },
    {
      name: 'yellow orange',
      hue: 21,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'yellow',
      hue: 40,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'lt green',
      hue: 80,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'green',
      hue: 95,
      saturation: 100,
      lightness: 50
    },
    { name: 'dk green', hue: 110, saturation: 100, lightness: 50 },
    { name: 'aqua', hue: 125, saturation: 100, lightness: 50 },
    {
      name: 'teal',
      hue: 135,
      saturation: 100,
      lightness: 50
    },
    { name: 'cyan', hue: 155, saturation: 100, lightness: 50 },
    {
      name: 'med blue',
      hue: 195,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'blue',
      hue: 230,
      saturation: 100,
      lightness: 50
    },
    { name: 'dk blue', hue: 240, saturation: 100, lightness: 50 },
    {
      name: 'indigo',
      hue: 250,
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
      name: 'dk purple',
      hue: 275,
      saturation: 100,
      lightness: 50
    },
    { name: 'lt pink', hue: 315, saturation: 100, lightness: 50 },
    {
      name: 'pink',
      hue: 330,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'dk pink',
      hue: 350,
      saturation: 100,
      lightness: 50
    },
    {
      name: 'rose',
      hue: 355,
      saturation: 100,
      lightness: 50
    },
  ]
  );

  //  Colour Pre-Colour 
  await knex("colours").insert([
    { name: 'prep red', hue: 1, saturation: 100, lightness: 0 },
    { name: 'prep orange', hue: 12, saturation: 100, lightness: 0 },
    {
      name: 'prep yellow orange',
      hue: 21,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'prep yellow',
      hue: 40,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'prep lt green',
      hue: 80,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'prep green',
      hue: 95,
      saturation: 100,
      lightness: 0
    },
    { name: 'prep dk green', hue: 110, saturation: 100, lightness: 0 },
    { name: 'prep aqua', hue: 125, saturation: 100, lightness: 0 },
    {
      name: 'prep teal',
      hue: 135,
      saturation: 100,
      lightness: 0
    },
    { name: 'prep cyan', hue: 155, saturation: 100, lightness: 0 },
    {
      name: 'prep med blue',
      hue: 195,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'prep blue',
      hue: 230,
      saturation: 100,
      lightness: 0
    },
    { name: 'prep dk blue', hue: 240, saturation: 100, lightness: 0 },
    {
      name: 'prep indigo',
      hue: 250,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'prep purple',
      hue: 265,
      saturation: 100,
      lightness: 0
    },

    {
      name: 'prep dk purple',
      hue: 275,
      saturation: 100,
      lightness: 0
    },
    { name: 'prep lt pink', hue: 315, saturation: 100, lightness: 0 },

    {
      name: 'prep pink',
      hue: 330,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'prep dk pink',
      hue: 350,
      saturation: 100,
      lightness: 0
    },
    {
      name: 'prep rose',
      hue: 355,
      saturation: 100,
      lightness: 0
    },
  ]
  );

  await knex("showTypes").insert([
    { type: "pattern" },
    { type: "cue" },
    { type: "random" },
  ]);

}