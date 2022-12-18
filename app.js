const express = require('express');
const app = express();
//Middlewares
app.use(express.json());

const tourRouter = require('./Router/tourRoute');
//Mount Routers (Main routers)
app.use('/api/v2/toursx', tourRouter);

app.all('*', (req, res, next) => {
  //   res.status(404).json({
  //     status: 'FAILED',
  //     message: `Cannot find path for ${req.originalUrl}`,
  //   });
  const err = new Error(`Cannot find the path for ${req.originalUrl}`);
  err.status = 'FAILED';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const errCode = err.statusCode || 500; //fail
  const status = err.status || 'error';
  const message = err.message;

  res.status(errCode).json({
    status,
    message,
  });
});

module.exports = app;
