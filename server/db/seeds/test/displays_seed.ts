import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("displays").del();
  await knex("colours").del();
  await knex("shows").del();

  // Inserts seed entries
  await knex("displays").insert([
    { id: 1, name: "frosty", ipaddress: "192.168.1.123", led_number: 16 },
    { id: 2, name: "star", ipaddress: "192.168.1.124", led_number: 34 },
    { id: 3, name: "ivan", ipaddress: "192.168.1.125", led_number: 24 },
  ]);
  // SEED COLOUR
  await knex("colours").insert([
    { id: 1, name: "red", hue: "360", saturation: 70, lightness: 100 },
    { id: 2, name: "blue", hue: "240", saturation: 70, lightness: 100 },
    { id: 3, name: "green", hue: "100", saturation: 70, lightness: 100 },
  ]);
  await knex("showTypes").insert([
    { id: 1, type: "pattern" },
    { id: 2, type: "cue" },
  ]);
  // SEED SHOWS
  await knex("shows").insert([
    { id: 1, name: "move red", type_id: 1 },
    { id: 2, name: "move green", type_id: 1 },
    { id: 3, name: "move blue", type_id: 1 },
    { id: 4, name: "cue 1", display_id: 1, type_id: 2 },
    { id: 5, name: "cue 2", display_id: 1, type_id: 2 },
    { id: 6, name: "hudson", display_id: 1, type_id: 1 },
    { id: 7, name: "cue 4", display_id: 2, type_id: 2 },
    { id: 8, name: "aurora", display_id: 3, type_id: 2 },
    { id: 9, name: "cue 6", display_id: 3, type_id: 2 },
    { id: 10, name: "woodstock", type_id: 1 },
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
