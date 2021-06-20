import { createReducer } from '@reduxjs/toolkit';
import type { Reducer } from 'redux';

import { getNovels, setNovelsError, setNovelsLoading } from './actions';
import type { NovelsStateInterface } from './novelsStateInterface';

const initialState: NovelsStateInterface = {
  isLoading: false,
  novels: [],
  isError: false,
  errorMessage: '',
};

const novelsReducer = createReducer(initialState, builder => {
  builder.addCase(getNovels.fulfilled, (state, action) => {
    console.log(action.payload);
    return { ...state, novels: action.payload.novels };
  });

  builder.addCase(setNovelsLoading, (state, action) => {
    console.log(action.payload);
    return { ...state, ...action.payload };
  });

  builder.addCase(setNovelsError, (state, action) => {
    return { ...state, ...action.payload };
  });
});

export default novelsReducer as Reducer<NovelsStateInterface>;
