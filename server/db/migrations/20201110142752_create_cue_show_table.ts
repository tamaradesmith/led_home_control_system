import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cueShows", (t: Knex.CreateTableBuilder) => {
    t.bigIncrements("id");
    t.integer("time_code");
    t.bigInteger("show_id");
    t.foreign("show_id").references("shows.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cueShows");
}
