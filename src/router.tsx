import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import Archive from './pages/archive/archive';
import Settings from './pages/settings/settings';
import { getSettings } from './store/settings/actions';

const NovelRouter: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/archive">
            <Archive />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/profile">
            Third tab
          </Route>
          <Route exact path="/">
            <Redirect to="/archive" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton className="bottom-tab" tab="tab1" href="/archive">
            <IonLabel>Archive</IonLabel>
          </IonTabButton>
          <IonTabButton className="bottom-tab" tab="tab2" href="/settings">
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
          <IonTabButton className="bottom-tab" tab="tab3" href="/profile">
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default NovelRouter;
