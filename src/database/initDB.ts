import type { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite';

const initDb = (): boolean => {
  let isError = false;
  try {
    SQLite.create({
      name: 'novels.db',
      location: 'default',
    }).then(async (db: SQLiteObject) => {
      try {
        //enable foreign keys
        await db.executeSql('PRAGMA foreign_keys=1;', []);

        //create tables
        await db.executeSql(
          'CREATE TABLE genres (id INTEGER PRIMARY KEY, title TEXT NOT NULL)',
          [],
        );

        await db.executeSql(
          'CREATE TABLE novels ( id INTEGER PRIMARY KEY, title TEXT NOT NULL, coverImg TExt, description text);',
          [],
        );

        await db.executeSql(
          'CREATE TABLE genres_novels ( genreId INTEGER NOT NULL, novelId INTEGER NOT NULL, FOREIGN KEY (genreId) REFERENCES genres (id) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (novelId) REFERENCES novels (id) ON DELETE RESTRICT ON UPDATE CASCADE, PRIMARY KEY (genreId, novelId));',
          [],
        );

        await db.executeSql(
          'CREATE TABLE chapters (id INTEGER PRIMARY KEY,title TEXT NOT NULL,content TExt NOT NULL);',
          [],
        );

        await db.executeSql(
          'CREATE TABLE novels_chapters (novelId INTEGER NOT NULL, chapterId INTEGER NOT NULL, FOREIGN KEY (chapterId) REFERENCES chapters (id) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (novelId) REFERENCES novels (id) ON DELETE RESTRICT ON UPDATE CASCADE, PRIMARY KEY (chapterId, novelId));',
          [],
        );

        const insert = await db.executeSql(
          'insert into danceMoves (name) values (?)',
          ['Macarena'],
        );
        await console.log('Inserted Macarena: ', insert);
        isError = false;
      } catch (e) {
        await SQLite.deleteDatabase({ name: 'novels.db', location: 'default' });
        isError = false;
      }
    });
  } catch (e) {
    isError = true;
  }
  return isError;
};

export default initDb;
