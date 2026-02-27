import { faker } from "@faker-js/faker";
import { Knex } from "knex";
import type { Book } from "../src/types";

const SEED_COUNT = 200;

const createBook = (
  authors_count: number,
  genres_count: number,
): Omit<Book, "id" | "created_at" | "updated_at"> => ({
  title: faker.lorem.sentence(3),
  description: faker.lorem.paragraph(5),
  price: faker.number.int({ min: 10, max: 1000 }),
  author_id: faker.number.int({ min: 1, max: authors_count }),
  genre_id: faker.number.int({ min: 1, max: genres_count }),
});

export async function seed(knex: Knex): Promise<void> {
  const authors_count = (await knex("authors").count().first())?.count;
  const genres_count = (await knex("genres").count().first())?.count;
  const books = Array.from({ length: SEED_COUNT }, () =>
    createBook(Number(authors_count), Number(genres_count)),
  );
  await knex("books").insert(books);
}
