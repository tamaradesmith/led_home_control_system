import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("colours", (t: Knex.TableBuilder) => {
      t.bigIncrements("id");
      t.string("name");
      t.integer("hue");
      t.integer("saturation");
      t.integer("lightness");
      t.timestamps(true, true);
    })
    .then(() =>
      knex.raw(
        `
    CREATE TRIGGER colours_updated_at
    BEFORE UPDATE ON colours
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
    `
      )
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("colours");
}
