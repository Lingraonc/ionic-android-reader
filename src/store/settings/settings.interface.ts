export type SettingsInterface = {
  platforms: string[];
  currentPlatform: 'desktop' | 'mobile';
  isLoading: boolean;
  errors: string[];
  colorTheme: string;
};
