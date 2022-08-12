const User = require('../models/user');
const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const nodemailer = require("nodemailer");
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: ""
  }
}))

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
    transporter.sendMail({
      to: email,
      from: "email@gmail.com",
      subject: "Welcome",
      html: "<h1>You succesfully signed up ! </h1>"
    })
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

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};
exports.postReset = async (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/");
    }
    const token = buffer.toString("hex");

    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash("error", "No account with that email.");
          return res.redirect("/login");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;  //1 saat geçerli olsun.
        return user.save();
      })
      .then(result => {
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
          from: "email@gmail.com",
          subject: "Reset Password",
          html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">Link</a> to set a new password.</p>
          `
        })
      })
      .catch(error => console.log(error))
  })
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'Update Password',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => console.log(err));  // $gt büy üktür anlamına gelir.

};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({ resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() }, _id:userId })
  .then(user=>{
    resetUser=user;
    return bcrypt.hash(newPassword,12);
  })
  .then(hashedPass=>{
    resetUser.password=hashedPass;
    resetUser.resetToken=null;
    resetUser.resetTokenExpiration=undefined;
    return resetUser.save();
  })
  .then(result=>{
    return res.redirect("/login");
  })
  .catch(err=>{
    console.log(err);
  })
}