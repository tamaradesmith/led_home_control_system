import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("displays", (t: Knex.AlterTableBuilder) => {
    t.boolean("default_on").defaultTo(true);
    t.bigInteger("default_show");
    t.foreign("default_show").references("shows.id").onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("displays", (t: Knex.AlterTableBuilder) => {
    t.dropColumns("default_on", "default_show");
  });
}
