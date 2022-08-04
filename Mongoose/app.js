const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const nongoose = require("mongoose");

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('62eba6698d507fc68e577ff1')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log("gfdggf:",err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

nongoose.connect("mongodb://127.0.0.1:27017/shop").then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: "Max",
        email: "test@gmail.com",
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(3000);
}).catch(err => console.err(err));
