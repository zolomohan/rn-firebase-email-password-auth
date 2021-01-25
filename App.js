import React, { useState } from 'react';
import Authentication from './screens/Authentication';
import Authenticated from './screens/Authenticated';
import auth from '@react-native-firebase/auth';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  const createUser = (email, password) => {
    try {
      auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const signin = (email, password) => {
    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  if (authenticated) {
    return <Authenticated />;
  }

  return <Authentication signin={signin} createUser={createUser} />;
}
