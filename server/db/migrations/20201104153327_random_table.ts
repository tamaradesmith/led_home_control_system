import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "randomShows",
    (t: Knex.CreateTableBuilder) => {
      t.bigIncrements("id");
      t.integer("saturation").defaultTo(100);
      t.integer("lightness").defaultTo(50);
      t.integer("fade").defaultTo(0);
      t.boolean("fade_random").defaultTo(false);
      t.integer("wait_time").defaultTo(1);
      t.boolean("wait_random").defaultTo(false);
      t.integer("hue_min").defaultTo(0);
      t.integer("hue_max").defaultTo(360);
      t.bigInteger("show_id");
      t.foreign("show_id").references("shows.id").onDelete("CASCADE");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("randomShows");
}
