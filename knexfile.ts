import type { Knex } from "knex";
import "dotenv/config";
import { requiredEnv } from "./src/config/knex.js";

// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: requiredEnv("DV_HOST"),
      port: Number(process.env.DV_PORT ?? 5432),
      user: requiredEnv("DV_USER"),
      password: requiredEnv("DV_PASSWORD"),
      database: requiredEnv("DV_DATABASE"),
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: requiredEnv("DV_HOST"),
      port: Number(process.env.DV_PORT ?? 5432),
      user: requiredEnv("DV_USER"),
      password: requiredEnv("DV_PASSWORD"),
      database: requiredEnv("DV_DATABASE"),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: requiredEnv("DV_HOST"),
      port: Number(process.env.DV_PORT ?? 5432),
      user: requiredEnv("DV_USER"),
      password: requiredEnv("DV_PASSWORD"),
      database: requiredEnv("DV_DATABASE"),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default config;
