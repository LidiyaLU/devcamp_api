const express = require('express');
const dotenv = require('dotenv');

// load env var
dotenv.config({path: './config/config.env'});

const app =   express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT, 
  console.log(`process is run on ${process.env.NODE_ENV} and port = ${PORT}`));