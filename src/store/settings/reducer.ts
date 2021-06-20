import { createReducer } from '@reduxjs/toolkit';
import type { Reducer } from 'redux';

import { getSettings, updateColorTheme } from './actions';
import type { SettingsInterface } from './settings.interface';

const initialState: SettingsInterface = {
  platforms: [],
  currentPlatform: 'mobile',
  isLoading: false,
  errors: [],
  colorTheme: 'white',
};

const settingsReducer = createReducer(initialState, builder => {
  builder.addCase(getSettings.fulfilled, (state, action) => {
    return { ...state, ...action.payload.payload };
  });
  builder.addCase(updateColorTheme, (state, action) => {
    return { ...state, ...action.payload };
  });
});

export default settingsReducer as Reducer<SettingsInterface>;
