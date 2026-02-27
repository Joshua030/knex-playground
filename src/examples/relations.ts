import knex from "../config/knex";

export const getBooksWithAuthorsAndGenres = async (
  limit: number,
  offset: number,
) => {
  const books = await knex("books")
    .select(
      "books.id",
      "books.title",
      "books.description",
      "books.price",
      "authors.name as author_name",
      "genres.name as genre_name",
    )
    .leftJoin("authors", "books.author_id", "authors.id")
    .leftJoin("genres", "books.genre_id", "genres.id")
    .limit(limit)
    .offset(offset);
  return books;
};

export const getAuthorsWithBooksCount = async (
  limit: number = 5,
  offset: number = 0,
) => {
  const authors = await knex("authors")
    .select(
      "authors.id",
      "authors.name",
      "authors.bio",
      knex.raw("COUNT(books.id) as books_count"), //knex raw to execute raw SQL, in this case to count the number of books for each author, and alias it as books_count
    )
    .leftJoin("books", "authors.id", "books.author_id")
    .groupBy("authors.id")
    .orderBy("books_count", "desc")
    .limit(limit)
    .offset(offset);
  return authors;
};
