import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("displays").del();
  await knex("colours").del();
  await knex("shows").del();

  // Inserts seed entries
  await knex("displays").insert([
    { id: 1, name: "frosty", ipaddress: "192.168.0.202", led_number: 16 },
    { id: 2, name: "star", ipaddress: "192.168.1.124", led_number: 34 },
    { id: 3, name: "ivan", ipaddress: "192.168.1.125", led_number: 24 },
  ]);
  // SEED COLOUR
  await knex("colours").insert([
    { id: 1, name: "red", hue: "360", saturation: 70, lightness: 100 },
    { id: 2, name: "blue", hue: "240", saturation: 70, lightness: 100 },
    { id: 3, name: "green", hue: "100", saturation: 70, lightness: 100 },
  ]);
  // SEED SHOWS
  await knex("shows").insert([
    { id: 4, name: "move red" },
    { id: 2, name: "move green" },
    { id: 3, name: "move blue" },
    { id: 11, name: "cue 3", display_id: 1 },
    { id: 5, name: "cue 2", display_id: 1 },
    { id: 6, name: "frosty cue 1", display_id: 1 },
    { id: 7, name: "cue 4", display_id: 2 },
    { id: 8, name: "patten purple", display_id: 3 },
    { id: 9, name: "cue 5", display_id: 3 },
    { id: 10, name: "pattern green" },
    { id: 1, name: "random" },
  ]);
}