import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("displays", (t: Knex.TableBuilder) => {
      t.bigIncrements("id");
      t.string("name");
      t.string("ipaddress");
      t.integer('led_number');
      t.timestamps(true, true);
    })
    .then(() => knex.raw( 
      `
    CREATE TRIGGER displays_updated_at
    BEFORE UPDATE ON displays
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
    `));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("displays");
}
