import { onDatabaseConnect } from "./config/knex.js";
import { getAllAuthors, getBooks } from "./examples/crud.js";
import { getAuthorsPaginated } from "./examples/query_builder.js";
import { getAuthorsWithBooksCount } from "./examples/relations.js";

const main = async () => {
  await onDatabaseConnect();
  const authors = await getAllAuthors(2, 0);
  const books = await getBooks(2, 0);
  // createAuthor({
  //   name: "New Author",
  //   bio: "This is a new author created for testing purposes.",
  // } as Omit<Author, "id, created_at, updated_at">);

  const authorsWithBooksCount = await getAuthorsWithBooksCount();
  const authorsPaginated = await getAuthorsPaginated();

  console.log(authorsPaginated);
};

main();
