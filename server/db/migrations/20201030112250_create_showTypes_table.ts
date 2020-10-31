import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("showTypes", (t: Knex.TableBuilder) => {
      t.bigIncrements("id");
      t.string("type");
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('showTypes')
}
