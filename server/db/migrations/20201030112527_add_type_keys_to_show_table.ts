import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("shows", (t: Knex.AlterTableBuilder) => {
    t.integer("type_id");
    t.foreign("type_id").references("showTypes.id").onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("shows", (t: Knex.AlterTableBuilder) => {
    t.dropColumn("type_id");
  });
}
