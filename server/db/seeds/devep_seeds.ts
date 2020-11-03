import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("displays").del();
  await knex("colours").del();
  await knex("shows").del();

  // Inserts seed entries
  await knex("displays").insert([
    { id: 1, name: "ivan", ipaddress: "192.168.0.202", led_number: 16 },
    { id: 2, name: "village", ipaddress: "192.168.1.64", led_number: 34 },
    { id: 3, name: "garland", ipaddress: "192.168.1.65", led_number: 8 },
  ]);
  // SEED COLOUR
  await knex("colours").insert([
    { id: 1, name: "red", hue: "360", saturation: 100, lightness: 5 },
    { id: 2, name: "blue", hue: "240", saturation: 100, lightness: 5 },
    { id: 3, name: "green", hue: "100", saturation: 100, lightness: 5 },
  ]);

  await knex("showTypes").insert([
    {id: 1, type: "pattern" },
    {id: 2, type: "cue" },
    {id: 3, type: "random" },
  ]);

  // SEED SHOWS
  await knex("shows").insert([
    { id: 4, name: "move red", type_id: 1 },
    { id: 2, name: "move green", type_id: 1 },
    { id: 3, name: "move blue", type_id: 1 },
    { id: 11, name: "cue 3", display_id: 1, type_id: 2 },
    { id: 5, name: "cue 2", display_id: 1, type_id: 2 },
    { id: 6, name: "frosty cue 1", display_id: 1, type_id: 2 },
    { id: 7, name: "cue 4", display_id: 2, type_id: 2 },
    { id: 8, name: "patten purple", display_id: 3, type_id: 1 },
    { id: 9, name: "cue 5", display_id: 3, type_id: 2 },
    { id: 10, name: "pattern green", type_id: 1 },
    { id: 1, name: "random", type_id: 1 },
  ]);

  await knex("displays").where({ id: 1 }).update({ default_show: 1 });
  await knex("displays").where({ id: 2 }).update({ default_show: 7 });
  await knex("displays").where({ id: 3 }).update({ default_show: 9 });

  await knex("patternShows").insert([
    { id: 1, show_id: 1, colours: "1,2,3", pattern_length: 3, wait_time: 3 },
    { id: 2, show_id: 2, colours: "2,3", pattern_length: 2, wait_time: 3 },
    {
      id: 3,
      show_id: 3,
      colours: "3,2,3",
      pattern_length: 3,
      wait_time: 6,
      group_length: 2,
    },
  ]);
}
