import { IonApp } from '@ionic/react';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme styles */
import './theme/variables.css';
import './theme/darkmode.css';
import './theme/app.css';

import NovelRouter from './router';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <NovelRouter />
      </IonApp>
    </Provider>
  );
};

export default App;
