const User = require('../models/user');
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.redirect("/login");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.redirect("/login");
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    return res.redirect("/")
  }
  catch (error) {
    console.log(error);
  }

  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  try {
    const user = User.findOne({ email: email })
    if (user) {
      res.redirect("/signup");
    }
    const hashedPass = await bcrypt.hash(password, 12)
    const newUser = new User({
      email: email,
      password: hashedPass,
      cart: { item: [] }
    });
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
