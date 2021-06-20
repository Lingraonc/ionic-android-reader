import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { moon } from 'ionicons/icons';
import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './settings.css';
import { UploadNovels } from '../../components/uploadNovels/uploadNovels';
import type { RootReducer } from '../../store/reducers';
import { updateColorTheme } from '../../store/settings/actions';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const currentColorTheme = useSelector(
    (state: RootReducer) => state.settings.colorTheme,
  );
  const currentPlatform = useSelector(
    (state: RootReducer) => state.settings.currentPlatform,
  );

  const toggleDarkModeHandler = () => {
    dispatch(updateColorTheme(currentColorTheme === 'dark' ? 'white' : 'dark'));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Archive</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList className="ion-margin-top">
            <IonItem>
              <IonIcon slot="start" icon={moon} />
              <IonLabel>Dark Mode</IonLabel>
              <IonToggle
                slot="end"
                name="darkMode"
                checked={currentColorTheme === 'dark'}
                onIonChange={toggleDarkModeHandler}
              />
            </IonItem>
            {currentPlatform === 'mobile' ? <UploadNovels /> : ''}
          </IonList>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
