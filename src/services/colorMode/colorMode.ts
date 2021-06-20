import currentPhoneTheme from '../android/currentPhoneTheme/currentPhoneTheme ';

type ColorMode = 'dark' | 'white';

export const colorMode = async (
  currentPlatform: string,
): Promise<ColorMode> => {
  const storageItem: string | null = localStorage.getItem('colorTheme');
  if (currentPlatform === 'desktop') {
    return storageItem === null ? 'white' : (storageItem as ColorMode);
  } else {
    if (storageItem) {
      return storageItem as ColorMode;
    } else {
      const isDarkThemeOnMobile = await currentPhoneTheme();
      return isDarkThemeOnMobile.value ? 'dark' : 'white';
    }
  }
};
