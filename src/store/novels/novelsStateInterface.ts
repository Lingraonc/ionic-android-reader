export interface NovelsStateInterface {
  isLoading: boolean;
  novels: NovelInterface[];
  isError: boolean;
  errorMessage: string;
}

export interface NovelInterface {
  title: string;
  coverImg: string;
  description: string;
  novelSlug: string;
  genres: string[];
}
