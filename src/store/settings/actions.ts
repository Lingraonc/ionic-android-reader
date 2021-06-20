import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { colorMode } from '../../services/colorMode/colorMode';
import platformCheck from '../../services/platformCheck/platformCheck';
import type { PlatformCheckInterface } from '../../services/platformCheck/platformCheck.interface';

export const getSettings = createAsyncThunk(
  'settings/getSettings',
  async (_, { dispatch: dispatch }) => {
    const settings: PlatformCheckInterface = platformCheck();

    if ((await colorMode(settings.currentPlatform)) === 'dark') {
      dispatch(updateColorTheme('dark'));
    } else {
      dispatch(updateColorTheme('white'));
    }

    return {
      payload: settings,
    };
  },
);

export const updateColorTheme = createAction(
  'settings/updateColorTheme',
  (colorTheme: 'dark' | 'white') => {
    colorTheme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
    localStorage.setItem('colorTheme', colorTheme);
    return {
      payload: { colorTheme },
    };
  },
);
