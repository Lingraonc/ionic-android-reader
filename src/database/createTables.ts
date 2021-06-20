import type { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite';

export const createTables = (): boolean => {
  let isError = false;
  try {
    SQLite.create({
      name: 'novels.db',
      location: 'default',
    }).then(async (db: SQLiteObject) => {
      try {
        await SQLite.deleteDatabase({ name: 'novels.db', location: 'default' });
        //enable foreign keys
        await db.executeSql('PRAGMA foreign_keys=1;', []);

        //create tables
        await db.executeSql(
          'CREATE TABLE IF NOT EXISTS genres (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)',
          [],
        );

        await db.executeSql(
          'CREATE TABLE IF NOT EXISTS novels ( id INTEGER PRIMARY KEY, title TEXT NOT NULL, coverImg TEXT, description text);',
          [],
        );

        await db.executeSql(
          'CREATE TABLE IF NOT EXISTS genres_novels ( genreId INTEGER NOT NULL, novelId INTEGER NOT NULL, FOREIGN KEY (genreId) REFERENCES genres (id) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (novelId) REFERENCES novels (id) ON DELETE RESTRICT ON UPDATE CASCADE, PRIMARY KEY (genreId, novelId));',
          [],
        );

        await db.executeSql(
          'CREATE TABLE IF NOT EXISTS chapters (id INTEGER PRIMARY KEY,title TEXT NOT NULL, chapterSlug TEXT NOT NULL, content TExt NOT NULL, novelId INTEGER NOT NULL);',
          [],
        );

        await db.executeSql(
          'CREATE TABLE IF NOT EXISTS novels_chapters (novelId INTEGER NOT NULL, chapterId INTEGER NOT NULL, chapterOrder INTEGER NOT NULL, FOREIGN KEY (chapterId) REFERENCES chapters (id) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (novelId) REFERENCES novels (id) ON DELETE RESTRICT ON UPDATE CASCADE, PRIMARY KEY (chapterId, novelId));',
          [],
        );

        isError = false;
      } catch (e) {
        await SQLite.deleteDatabase({ name: 'novels.db', location: 'default' });
        isError = true;
      }
    });
  } catch (e) {
    isError = true;
  }
  return isError;
};
