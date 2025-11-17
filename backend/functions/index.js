const {logger} = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions");
const express = require('express');

// routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const resultsRoutes = require('./routes/resultsRoutes');

const app = express();
app.use(express.json());

app.use('/', authRoutes, userRoutes, resultsRoutes);

setGlobalOptions({ maxInstances: 10 });
exports.api = onRequest({cors: true}, app);
