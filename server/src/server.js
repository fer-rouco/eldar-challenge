//pass: tR3olCnTSsVl8E8u
// mongodb+srv://fnr:tR3olCnTSsVl8E8u@cluster0.lscp9gf.mongodb.net/


require("dotenv").config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('../database/db');

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
const productRoute = require('./routes/product.route');
const authenticationRoute = require('./routes/authentication.route');
const headthCheckerRoute = require('./routes/healthchecker.route');
const healthCheckerRoute = require("./routes/healthchecker.route");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/eldar-challenge-server')));
app.use('/', express.static(path.join(__dirname, 'dist/eldar-challenge-server')));
app.use('/api/product', productRoute);
app.use('/api/auth', authenticationRoute);
app.use('/api/healthcheck', healthCheckerRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});