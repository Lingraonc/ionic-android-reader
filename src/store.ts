import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './store/reducers';

export const store = configureStore({
  reducer,
  devTools: true,
});
