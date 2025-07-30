// config/firebase.js
import admin from 'firebase-admin';
import {backendConfig} from './serviceAccountKey.js';

admin.initializeApp({
  credential: admin.credential.cert(backendConfig),
});

export const auth = admin.auth();

