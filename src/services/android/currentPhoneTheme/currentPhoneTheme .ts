import type { ThemeDetectionResponse } from '@ionic-native/theme-detection';
import { ThemeDetection } from '@ionic-native/theme-detection';

const currentPhoneTheme = async (): Promise<ThemeDetectionResponse> => {
  try {
    return await ThemeDetection.isDarkModeEnabled();
  } catch (e) {
    throw new Error(e);
  }
};

export default currentPhoneTheme;
