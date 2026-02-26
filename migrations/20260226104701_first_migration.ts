import type { Knex } from "knex";

// usigned allows only positive integers, and is commonly used for auto-incrementing primary keys.

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("authors", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("bio").notNullable();
      table.timestamps(true, true);
    })
    .createTable("genres", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable().unique();
    })
    .createTable("books", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable().unique();
      table.text("description");
      table.integer("price").notNullable();
      table
        .integer("author_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("authors")
        .onDelete("CASCADE");
      table
        .integer("genre_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("genres")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTableIfExists("books")
    .dropTableIfExists("genres")
    .dropTableIfExists("authors");
}
