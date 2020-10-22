import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("displays").del();
  await knex("colours").del();

  // Inserts seed entries
  await knex("displays").insert([
    { id: 1, name: "frosty", ipaddress: "192.168.1.123", led_number: 16 },
    { id: 2, name: "star", ipaddress: "192.168.1.124", led_number: 34 },
    { id: 3, name: "ivan", ipaddress: "192.168.1.125", led_number: 24 },
  ]);
  // Inserts seed entries
  await knex("colours").insert([
    { id: 1, name: "red", hue: "360", saturation: 70, lightness: 100 },
    { id: 2, name: "blue", hue: "240", saturation: 70, lightness: 100 },
    { id: 3, name: "green", hue: "100", saturation: 70, lightness: 100 },
  ]);
}
