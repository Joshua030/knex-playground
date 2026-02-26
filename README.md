# Knex Course Project

A Node.js project exploring database migrations and query building with [Knex.js](https://knexjs.org/) and PostgreSQL, written in TypeScript.

## Stack

- **Runtime**: Node.js with TypeScript (via `tsx`)
- **Database**: PostgreSQL
- **Query builder**: Knex.js
- **Dev server**: Nodemon

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment file and fill in your database credentials:
   ```bash
   cp .env.example .env
   ```

3. Start the dev server:
   ```bash
   npm start
   ```

## Database migrations

All knex CLI commands are run through the `npm run knex` script:

```bash
# Create a new migration
npm run knex -- migrate:make <migration_name> -x ts

# Run pending migrations
npm run knex -- migrate:latest

# Rollback the last batch
npm run knex -- migrate:rollback
```

## Project structure

```
src/
  config/
    knex.ts       # Knex instance and DB connection helper
  index.ts        # Entry point
knexfile.ts       # Knex configuration (dev / staging / production)
```
