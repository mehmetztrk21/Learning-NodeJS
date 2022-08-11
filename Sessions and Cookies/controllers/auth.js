const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get("Cookie").split(";")[2].trim().split("=")[1];
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.postLogin = async (req, res, next) => {
    try {
        const user = await User.findById('62eba6698d507fc68e577ff1');
        req.session.isLoggedIn = true
        req.session.user = user;
        await req.session.save(); //session un kaydedildiğinden emin olmak için await uyguladık.
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }


    //res.setHeader("Set-Cookie", "loggedIn=true")
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/")
    })
}