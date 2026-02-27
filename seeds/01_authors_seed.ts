import { Knex } from "knex";
import type { Author } from "../src/types";
import { faker } from "@faker-js/faker";

const SEED_COUNT = 100;

const createAuthor = (): Omit<Author, "id" | "created_at" | "updated_at"> => ({
  name: faker.person.fullName(),
  bio: faker.lorem.paragraph(),
});

export async function seed(knex: Knex): Promise<void> {
  const authors = Array.from({ length: SEED_COUNT }, createAuthor);
  await knex("authors").insert(authors);
}
