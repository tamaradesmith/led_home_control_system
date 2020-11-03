import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patternShows", (t: Knex.AlterTableBuilder) => {
    t.integer("fade").defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("patternShows", (t: Knex.AlterTableBuilder) => {
    t.dropColumn("fade");
  });
}
