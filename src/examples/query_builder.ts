import knex from "../config/knex";
import type { Author } from "../types";

export const getAuthorsPaginated = async (
  limit: number = 2,
  offset: number = 0,
): Promise<{ results: Pick<Author, "id">[]; count: number }> => {
  const query_buider = knex("authors")
    .select("id")
    .where("name", "like", "%a%");

  const authors = await query_buider.limit(limit).offset(offset);

  const count = Number(
    (await query_buider.clone().clearSelect().count().first())?.count,
  );

  /**  Query BUilder construction 

/*   const query_builder = knex("authors");
  query_builder.limit(limit);
  query_builder.offset(offset);

  const second_query_buider = query_builder.clone(); // clone a query
  second_query_buider.where("id", 10);
  second_query_buider.clearSelect(); // this help us to clear statement for the original query
  second_query_buider.clearCounters(); // this help us to clear statement for the original query

  const authors = await query_builder;
  //   const authors = await knex("authors").limit(limit).offset(offset);
  const count = Number((await knex("authors").count().first())?.count);
 */
  return {
    results: authors,
    count,
  };
};
