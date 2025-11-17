// config/firebase.js
const admin = require('firebase-admin');
const backendConfig = require('./serviceAccountKey');

admin.initializeApp({
  credential: admin.credential.cert(backendConfig),
});

module.exports = auth = admin.auth();

