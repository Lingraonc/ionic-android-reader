import { getPlatforms } from '@ionic/react';

import type { PlatformCheckInterface } from './platformCheck.interface';

const platformCheck = (): PlatformCheckInterface => {
  const platforms = getPlatforms();
  let currentPlatform: 'desktop' | 'mobile';
  if (platforms.includes('desktop') || platforms.includes('mobileweb')) {
    currentPlatform = 'desktop';
  } else {
    currentPlatform = 'mobile';
  }
  return {
    platforms,
    currentPlatform,
  };
};

export default platformCheck;
