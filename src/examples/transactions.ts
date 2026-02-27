import knex from "../config/knex";
import type { Author, Book } from "../types";

/**util functions **/

export const getLastAuthor = async () => {
  const author = await knex("authors").orderBy("id", "desc").first();
  return author;
};

/****Transactions ***** */

export const createAuthorWithBooks = async (
  authorData: Omit<Author, "id, created_at, updated_at">,
  booksData: Omit<Book, "id, created_at, updated_at">[],
) => {
  const trx = await knex.transaction();
  try {
    const [author] = await trx("authors").insert(authorData, "*");
    const booksToInsert = booksData.map((book) => ({
      ...book,
      author_id: author?.id,
    })) as Book[];

    const insertedBooks = await trx("books").insert(booksToInsert, "*");
    await trx.commit();
    return { author, books: insertedBooks };
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

export const createAuthorWithBook = async (
  authorData: Omit<Author, "id, created_at, updated_at">,
  bookData: Omit<Book, "id, created_at, updated_at">,
) => {
  const trx = await knex.transaction();
  try {
    const [author] = await trx("authors").insert(authorData, "*");
    const bookToInsert = {
      ...bookData,
      author_id: author?.id,
    } as Book;

    const [insertedBook] = await trx("books").insert(bookToInsert, "*");
    await trx.commit();
    return { author, book: insertedBook };
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};
