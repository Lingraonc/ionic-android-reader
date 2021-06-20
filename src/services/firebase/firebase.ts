import dotenv from 'dotenv';
import firebase from 'firebase';

import type {
  NovelFirebaseInterface,
  ChapterInterface,
} from './firebase.interface';

dotenv.config();

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(config);

export const getNovelsContentFirebase = async (): Promise<
  NovelFirebaseInterface[]
> => {
  try {
    const novelsList: NovelFirebaseInterface[] = [];
    const ref = firebase.database().ref('/novels');
    const snapshot = await ref.once('value');
    const novelsObject = snapshot.val();
    for (const novelName in novelsObject) {
      const novelsListObject = Object.assign({}, novelsObject[novelName], {
        novelSlug: novelName,
      });
      novelsList.push(novelsListObject);
    }

    return novelsList;
  } catch (err) {
    throw new Error(err);
  }
};

export const getChaptersFirebase = async (
  novelSlug: string,
): Promise<ChapterInterface[]> => {
  try {
    const chaptersList: ChapterInterface[] = [];
    const ref = firebase.database().ref(`/chapters/${novelSlug}`);
    const snapshot = await ref.once('value');
    const chaptersObject = snapshot.val();
    for (const chapterName in chaptersObject) {
      const chapterObject = Object.assign({}, chaptersObject[chapterName], {
        chapterSlug: chapterName,
      });
      chaptersList.push(chapterObject);
    }
    return chaptersList;
  } catch (err) {
    throw new Error(err);
  }
};
