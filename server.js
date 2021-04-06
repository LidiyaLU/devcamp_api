const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error')
const logger = require('./middleware/logger');
const connectDB = require('./config/db');

// load env var
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');
//const { connect } = require('mongoose');


const app = express();

//body parser

app.use(express.json());

//Dev logging middleware 
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(logger);

//Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT, 
  console.log(`process is run on ${process.env.NODE_ENV} and port = ${PORT}`.yellow.bold));

  // handele rejections

  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`.red);

    server.close(() => process.exit(1));
  });