import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getNovelsContentFirebase } from '../../services/firebase/firebase';
import type { NovelFirebaseInterface } from '../../services/firebase/firebase.interface';

export const getNovels = createAsyncThunk(
  'novels/getNovels',
  async (currentPlatform: 'desktop' | 'mobile', { dispatch: dispatch }) => {
    dispatch(setNovelsLoading(true));

    let novels: NovelFirebaseInterface[] = [];

    try {
      novels = await getNovelsContentFirebase();
    } catch (err) {
      dispatch(setNovelsLoading(false));
      dispatch(setNovelsError(true, err.message));
    }
    return { novels };
  },
);

export const setNovelsLoading = createAction(
  'novels/loading',
  (isLoading: boolean) => {
    return {
      payload: { isLoading },
    };
  },
);

export const setNovelsError = createAction(
  'novels/error',
  (isError: boolean, errorMessage?: string) => {
    return {
      payload: { isError, errorMessage: errorMessage ? errorMessage : '' },
    };
  },
);
