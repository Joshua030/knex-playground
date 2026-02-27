import knex from "../config/knex";
import type { Author, Book } from "../types";

export const getAllAuthors = async (limit: number, offset: number) => {
  return await knex("authors").select("*").limit(limit).offset(offset);
};

export const getBooks = async (limit: number, offset: number) => {
  return await knex("books")
    .select("*")
    .limit(limit)
    .offset(offset)
    .orderBy("price", "desc");
};

export const getAuthorById = async (id: number) => {
  return await knex("authors").select("*").where({ id }).first(); // first to return only one record, since id is unique, and by default returns an array of records, even if it's just one.
};

export const getBookById = async (id: number) => {
  return await knex("books").select("*").where("id", "=", id).first();
};

export const getGenreById = async (id: number) => {
  return await knex("genres").select("*").where({ id }).first();
};

/****Create Operations ****  */

export const createAuthor = async (
  body: Omit<Author, "id, created_at, updated_at">,
) => {
  const author = await knex("authors").insert(body, "*"); // Second parameter "*" is to return the inserted record(s) after insertion, for a specific field [id, name, etc.], you can pass an array of field names instead of "*"]
  return author[0];
};

export const createBook = async (
  body: Omit<Book, "id, created_at, updated_at">,
) => {
  await checkIfAuthorExists(body.author_id);
  await checkIfGenreExists(body.genre_id);
  const book = await knex("books").insert(body, "*");
  return book[0];
};

//* Update Operations *//

export const updateAuthor = async (
  id: number,
  body: Partial<Omit<Author, "id, created_at, updated_at">>,
) => {
  await checkIfAuthorExists(id);
  const updatedAuthor = await knex("authors")
    .update(body, "*")
    .where({ id })
    .first();
  return updatedAuthor;
};

export const updateBook = async (
  id: number,
  body: Partial<Omit<Book, "id, created_at, updated_at">>,
) => {
  if (body.author_id) {
    await checkIfAuthorExists(body.author_id);
  }
  if (body.genre_id) {
    await checkIfGenreExists(body.genre_id);
  }
  const updatedBook = await knex("books")
    .update(body, "*")
    .where({ id })
    .first();
  return updatedBook;
};

//* Delete Operations *//

export const deleteAuthor = async (id: number) => {
  await checkIfAuthorExists(id);
  await knex("authors").where({ id }).del();
};

export const deleteBook = async (id: number) => {
  await checkIfBookExists(id);
  await knex("books").where({ id }).del();
};

/*******Private Methods ****   */

export const checkIfAuthorExists = async (id: number) => {
  if (!id) {
    throw new Error("Author ID is required");
  }
  const author = await knex("authors").select("*").where({ id }).first();
  return !!author; // Return true if the author exists, false otherwise
};

export const checkIfGenreExists = async (id: number) => {
  if (!id) {
    throw new Error("Genre ID is required");
  }
  const genre = await knex("genres").select("*").where({ id }).first();
  return !!genre; // Return true if the genre exists, false otherwise
};

export const checkIfBookExists = async (id: number) => {
  if (!id) {
    throw new Error("Book ID is required");
  }
  const book = await knex("books").select("*").where({ id }).first();
  return !!book; // Return true if the book exists, false otherwise
};
