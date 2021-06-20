export interface NovelFirebaseInterface {
  chaptersSlugs: ChaptersSlugs[];
  coverImg: string;
  description: string;
  genres: string[];
  title: string;
  novelSlug: string;
}

export interface ChaptersSlugs {
  order: number[];
  slug: string;
}

export interface ChapterInterface {
  title: string;
  content: string;
  chapterSlug: string;
}
