const User = require('../models/user');
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  message = message.length > 0 ? message[0] : null;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  message = message.length > 0 ? message[0] : null;
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash("error", "Invalıd email or password.")
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
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  try {
    const user = await User.findOne({ email: email })
    console.log(user)
    if (user) {
      req.flash("error", "E-mail is already exists.");
      return res.redirect("/signup");
    }
    const hashedPass = await bcrypt.hash(password, 12)
    const newUser = new User({
      email: email,
      password: hashedPass,
      cart: { item: [] }
    });
    await newUser.save();
    return res.redirect("/login");
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
