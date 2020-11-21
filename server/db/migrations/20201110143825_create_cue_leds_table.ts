import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cueLeds", (t: Knex.CreateTableBuilder) => {
    t.bigIncrements("id");
    t.integer("fade").defaultTo(1);
    t.integer("led_number");
    t.integer("led_colour");
    t.foreign("led_colour").references("colours.id").onDelete("SET NULL");
    t.integer("cue_show_id");
    t.foreign("cue_show_id").references("cueShows.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cueLeds");
}
