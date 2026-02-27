import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import type { Genre } from "../src/types";

const SEED_COUNT = 10;

const createGenres = (): Omit<Genre, "id"> => ({
  name: faker.lorem.words(2),
});

export async function seed(_knex: Knex): Promise<void> {
  const genres = Array.from({ length: SEED_COUNT }, createGenres);
  await _knex("genres").insert(genres);
}
