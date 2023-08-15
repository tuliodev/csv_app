import { ReadStream } from 'fs';
import csvParser from 'csv-parser';
import { initDatabase } from '../database/db';
import { User } from '../models/user';

const csvService = {
  async saveCSVData(fileStream: any): Promise<User[]> {
    const db = await initDatabase();
    const users: User[] = [];
  
    fileStream
      .pipe(csvParser())
      .on('data', (data: User) => {
        users.push(data);
      })
      .on('end', async () => {
        await Promise.all(
          users.map((user) =>
            db.run(
              'INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)',
              user.name,
              user.city,
              user.country,
              user.favorite_sport
            )
          )
        );
        db.close();
      });
  
    await new Promise((resolve) => {
      fileStream.on('end', resolve);
    });
  
    return users;
  },

  async searchCSVData(query: string): Promise<User[]> {
    const db = await initDatabase();
    const users = await db.all<User[]>(
      'SELECT * FROM users WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?',
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`
    );
  
  
    db.close();
  
    return users;
  },
}

export default csvService;

