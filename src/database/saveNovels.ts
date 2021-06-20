import type { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite';

import type {
  ChapterInterface,
  NovelFirebaseInterface,
} from '../services/firebase/firebase.interface';

export const saveNovel = (
  novel: NovelFirebaseInterface,
  chapters: ChapterInterface[],
): boolean => {
  let isError = false;
  try {
    SQLite.create({
      name: 'novels.db',
      location: 'default',
    }).then(async (db: SQLiteObject) => {
      try {
        //save genres to db
        for await (const genre of novel.genres) {
          await db.executeSql(
            'insert or ignore into genres (title) values (?)',
            [genre],
          );
        }

        //save to novels and genres_novels tables

        const genresIds: number[] = [];
        //get genres ids
        for await (const genre of novel.genres) {
          const data = await db.executeSql(
            `select id from genres where title= ?`,
            [genre],
          );
          genresIds.push(data.rows.item(0).id);
        }

        await db.executeSql(
          'insert or ignore into novels (title, coverImg, description) values (?, ?, ?)',
          [novel.title, novel.coverImg, novel.description],
        );

        const novelData = await db.executeSql(
          'select id from novels where title= ?',
          [novel.title],
        );
        const novelId = novelData.rows.item(0).id;

        for await (const genreId of genresIds) {
          await db.executeSql(
            'insert or ignore into genres_novels (genreId, novelId) values (?, ?)',
            [genreId, novelId],
          );
        }

        for await (const chapter of chapters) {
          await db.executeSql(
            'insert or ignore into chapters (title, chapterSlug, content, novelId) values (?, ?, ?, ?)',
            [chapter.title, chapter.chapterSlug, chapter.content, novelId],
          );
        }

        const chaptersDataItems = [];

        for await (const chapter of chapters) {
          const chapterData = await db.executeSql(
            `select * from chapters where chapterSlug= ? and novelId = ?`,
            [chapter.chapterSlug, novelId],
          );
          const chapterItem = chapterData.rows.item(0);
          /* const novelChapterSlugItem = novel.chaptersSlugs.filter(
            chapterSlug => {
              return chapterItem.chapterSlug === chapterSlug.slug;
            },
          );
          chapterItem.order = novelChapterSlugItem[0].order;*/
          chaptersDataItems.push(chapterItem);
        }

        for await (const chapterDataItem of chaptersDataItems) {
          await db.executeSql(
            'insert or ignore into novels_chapters (novelId, chapterId, chapterOrder) values (?, ?, ?)',
            [novelId, chapterDataItem.id, 0],
          );
        }
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
