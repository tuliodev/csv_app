import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path'; 

const DATABASE_FILE = 'database.db';

const DATABASE_PATH = path.join(process.cwd(), DATABASE_FILE);

export async function initDatabase() {
  const db = await open({
    filename: DATABASE_PATH,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      city TEXT,
      country TEXT,
      favorite_sport TEXT
    )
  `);

  return db;
}
