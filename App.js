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

  const createUser = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  if (authenticated) {
    return <Authenticated />;
  }

  return <Authentication login={login} createUser={createUser} />;
}
