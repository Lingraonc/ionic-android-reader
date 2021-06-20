import { IonAlert } from '@ionic/react';
import React, { useEffect, useState } from 'react';

import initDb from '../../database/initDB';

const DbAlert: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setShowAlert(initDb());
  }, []);
  return (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => setShowAlert(false)}
      header={'Database error'}
      message={'Some text'}
      buttons={['OK']}
    />
  );
};

export default DbAlert;
