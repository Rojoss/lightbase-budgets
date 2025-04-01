import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../database/schema';

export function db() {
  const sql = neon(process.env.DATABASE_URL!);
  const database = drizzle(sql, {
    schema,
  });

  return database;
}
