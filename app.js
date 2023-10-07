const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');

// Middleware section
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  app.use(express.json());
  app.use(express.static(`${__dirname}/public`));
  
  // Your custom middleware
  app.use((req, res, next) => {
    console.log('Hello from the middleware🙌');
    next();
  });
  
  // Routes
  app.use('/api/v1/tours', tourRouter);
  
  

module.exports = app
