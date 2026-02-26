import "dotenv/config";
import Knex from "knex";

export const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const knex = Knex({
  client: "postgresql",
  connection: {
    host: requiredEnv("DV_HOST"),
    port: Number(process.env.DV_PORT ?? 5432),
    user: requiredEnv("DV_USER"),
    password: requiredEnv("DV_PASSWORD"),
    database: requiredEnv("DV_DATABASE"),
  },
  pool: { min: 2, max: 10 },
});

export const onDatabaseConnect = async () =>
  knex
    .raw("SELECT 1")
    .then(() => {
      console.log("Database connection established successfully.");
    })
    .catch((err) => {
      console.error("Failed to connect to the database:", err);
      process.exit(1);
    });

export default knex;
