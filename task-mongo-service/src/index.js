/* eslint-disable no-console */
var  express = require('express');
var constants = require('./config/constants')
var middleware = require('./config/middleware')
var dbconnection = require('./config/database')

const app = express();
middleware(app);

dbconnection.dbConnect();

const router = require('./routes/router')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/taskmanagerservice/api/',router);

app.listen(constants.PORT, err => {
  if (err) {
      throw err;
  } else {
      console.log(`Server running on port: ${constants.PORT} `);
  }
});

