import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonCol,
  IonThumbnail,
  IonImg,
  IonGrid,
  IonRow,
  IonList,
} from '@ionic/react';
import React, { useEffect } from 'react';
import './novelsList.css';
import { useDispatch, useSelector } from 'react-redux';

import { getNovels } from '../../store/novels/actions';
import type { RootReducer } from '../../store/reducers';

export const NovelsList: React.FC = () => {
  const dispatch = useDispatch();
  const novels = useSelector((state: RootReducer) => state.novels);
  useEffect(() => {
    dispatch(getNovels());
  }, []);
  useEffect(() => {
    console.log(novels);
  }, [novels]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Novels list</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {novels.novels.length
          ? novels.novels.map((novelItem, i) => {
              return (
                <IonCard key={i} className="novels-list-card">
                  <IonCardHeader>
                    <IonCardTitle className="novels-list-title">
                      {novelItem.title}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="4">
                        <IonItem className="novels-list-image-item ion-no-padding">
                          <IonThumbnail
                            slot="start"
                            className="novels-list-thumbnail"
                          >
                            <IonImg src={novelItem.coverImg} />
                          </IonThumbnail>
                        </IonItem>
                      </IonCol>
                      <IonCol size="8">
                        <IonCardContent className="novels-list-description">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: novelItem.description,
                            }}
                          />
                        </IonCardContent>
                        <IonList className="novels-list-genres-list">
                          {novelItem.genres.length
                            ? novelItem.genres.map((genre, j) => {
                                return (
                                  <IonItem key={j}>
                                    <IonLabel className="novels-list-genre-label">
                                      {genre}
                                    </IonLabel>
                                  </IonItem>
                                );
                              })
                            : ''}
                          ;
                        </IonList>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCard>
              );
            })
          : ''}
      </IonContent>
    </IonPage>
  );
};
