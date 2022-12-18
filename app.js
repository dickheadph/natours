const express = require('express');
const app = express();
//Middlewares
app.use(express.json());

const tourRouter = require('./Router/tourRoute');
//Mount Routers (Main routers)
app.use('/api/v2/toursx', tourRouter);

module.exports = app;
