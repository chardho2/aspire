import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * The app works in two modes:
 *  - demo mode (no DATABASE_URL): all content comes from the bundled seed data,
 *    so the template runs out of the box with zero configuration.
 *  - database mode: Drizzle ORM + PostgreSQL, identical query API.
 *
 * `pg.Pool` is lazy, so constructing it without a connection string is safe —
 * it only connects when a query is actually executed.
 */
const databaseUrl = process.env.DATABASE_URL;

export const hasDatabase = Boolean(databaseUrl);

const globalForDb = globalThis as typeof globalThis & {
  __aspirePgPool?: Pool;
};

export const pool =
  globalForDb.__aspirePgPool ??
  new Pool({
    connectionString: databaseUrl,
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__aspirePgPool = pool;
}

export const db = drizzle(pool);
