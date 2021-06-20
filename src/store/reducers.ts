import type { NovelsStateInterface } from './novels/novelsStateInterface';
import novelsReducer from './novels/reducer';
import settingsReducer from './settings/reducer';
import type { SettingsInterface } from './settings/settings.interface';

export interface RootReducer {
  settings: SettingsInterface;
  novels: NovelsStateInterface;
}

export const reducer = {
  settings: settingsReducer,
  novels: novelsReducer,
};
