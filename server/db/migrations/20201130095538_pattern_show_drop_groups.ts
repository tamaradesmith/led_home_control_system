import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('patternShows', (t: Knex.AlterTableBuilder) => {
    t.dropColumn('group_length');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('patternShows', (t: Knex.AlterTableBuilder) => {
    t.integer('group_length');
  });
}

