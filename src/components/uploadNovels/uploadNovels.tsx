import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonText,
  IonToggle,
  useIonLoading,
} from '@ionic/react';
import {
  moon,
  star,
  settingsOutline,
  folderOpenOutline,
  cloudUploadOutline,
} from 'ionicons/icons';
import React, { useEffect, useState } from 'react';

import { createTables } from '../../database/createTables';
import { saveNovel } from '../../database/saveNovels';
import {
  getChaptersFirebase,
  getNovelsContentFirebase,
} from '../../services/firebase/firebase';
import './uploadNovels.css';
import type { NovelFirebaseInterface } from '../../services/firebase/firebase.interface';

export const UploadNovels: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const getNovelsData = async () => {
    setIsLoading(true);
    await createTables();
    const novelsData: NovelFirebaseInterface[] =
      await getNovelsContentFirebase();

    for await (const novelData of novelsData) {
      const chapters = await getChaptersFirebase(novelData.novelSlug);
      await saveNovel(novelData, chapters);
    }

    await setIsLoading(false);
  };

  return (
    <IonItem>
      <IonIcon slot="start" icon={folderOpenOutline} />
      <IonLabel className="setting-with-description-label">
        Upload novels
        <IonText className="setting-label-description">
          Uploading take a lot of time and more 200mb space
        </IonText>
      </IonLabel>

      <IonButton
        size="default"
        onClick={() => {
          getNovelsData();
        }}
      >
        <IonIcon icon={cloudUploadOutline} />
      </IonButton>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={isLoading}
        message={'Please wait...'}
      />
    </IonItem>
  );
};
