// lib/firebase.ts
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';
import { getAuth } from 'firebase/auth';
import { initializeApp, getApps, getApp } from 'firebase/app';

let auth: ReturnType<typeof getAuth>;

const firebaseConfig = {
  apiKey: "AIzaSyDnh1EUPJfAX1DznSoJqO4nVNyjnN1uXKM",
  authDomain: "helizo-8594.firebaseapp.com",
  projectId: "helizo-8594",
  storageBucket: "helizo-8594.appspot.com",
  messagingSenderId: "576210292113",
  appId: "1:576210292113:web:bea94510a621f68cb61e30",
  measurementId: "G-ZEH7DCQPBC",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

if (Platform.OS === 'web') {
  // فقط روی وب
  const { getAuth } = require('firebase/auth');
  auth = getAuth(app);
} else {
  // روی موبایل
  const { initializeAuth, getReactNativePersistence } = require('firebase/auth/react-native');
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { auth, db };
