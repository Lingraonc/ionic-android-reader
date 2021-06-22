import type { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite';

const checkIsNovelsExists = (): boolean => {
  try {
    SQLite.create({
      name: 'novels.db',
      location: 'default',
    }).then(async (db: SQLiteObject) => {
      try {
        return await db.executeSql('SELECT EXISTS (SELECT 1 FROM novels);', []);
      } catch (e) {
        return false;
      }
    });
  } catch (e) {
    return false;
  }
  return false;
};

export default checkIsNovelsExists;
