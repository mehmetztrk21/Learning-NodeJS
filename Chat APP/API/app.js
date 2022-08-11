const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const express = require('express');
const app = express();


//routes
const feedRoutes = require('./routes/feed');
const authRoutes=require("./routes/auth")

//for images
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
 
const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {  //kayıt yeri
        cb(null, 'images');
    },
    filename: function(req, file, cb) {  //kayıt adı
        cb(null, uuidv4())
    }
});

const fileFilter = (req, file, cb) => {  //gelen resimlerin tip kontrolü
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

//for images
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));


//gelen istekler için CORS ayarlamaları.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


//call routes.

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

//oluşan hataları gönderen middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data=error.data;
  res.status(status).json({ message: message,data:data });
});

//mongodb ye bağlandıktan sonra 8080 portunu aç.
mongoose
  .connect(
    'mongodb://127.0.0.1:27017/chat'
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
