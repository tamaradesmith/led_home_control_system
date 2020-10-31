import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("shows", (t: Knex.TableBuilder) => {
      t.bigIncrements("id");
      t.string("name").unique();
      t.integer("display_id").nullable();
      t.foreign("display_id").references("displays.id").onDelete("SET NULL");
      t.timestamps(true, true);
    })
    .then(() =>
      knex.raw(
        `
    CREATE TRIGGER shows_updated_at
    BEFORE UPDATE ON shows
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
    `
      )
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("shows");
}
