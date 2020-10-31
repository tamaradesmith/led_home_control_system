import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("patternShows", (t: Knex.TableBuilder) => {
      t.bigIncrements("id");
      t.integer("show_id");
      t.foreign("show_id").references("shows.id").onDelete("CASCADE");
      t.string("colours");
      t.integer("pattern_length");
      t.integer("group_length").defaultTo(1);
      t.integer("wait_time");
      // t.timestamps(true, true);
    })
    // .then(() =>
    //   knex.raw(
    //     `
    // CREATE TRIGGER patternShows_updated_at
    // BEFORE UPDATE ON patternShows
    // FOR EACH ROW
    // EXECUTE PROCEDURE on_update_timestamp();
    // `
    //   )
    // );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("patternShows");
}
