const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


const sequelize = require('./util/database');
const Product = require("./models/product");
const User = require("./models/user");


const app = express().enable();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const OrderItem = require('./models/order-item');
const Order = require('./models/order');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => { //kullanıcıyı bulduk. (şu anda manuel 1 olarak aldık.) sonrta next ile diğer routeleri aktif ettik. ilk burası çalışır route olarak.
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//ONE-TO-MANY RELATİON

Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE"
}); //ürünle kullanıcıyı ilişkilendirdik. Kullanıcı silinirse ona bağlı ürünler de silinsin dedik.
User.hasMany(Product); //bir kullanıcının birden çok ürünü olabilir dedik. (one to many)

//ONE-TO-ONE RELATİON

Cart.belongsTo(User);
User.hasOne(Cart);

//MANY-TO-MANY RELATİON

Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product,{through:OrderItem})


sequelize
    //.sync({force:true}) //var olan modelleri db ye aktarıyor (table olarak).  force true ile geliştirmedeki değişikliklerin tümünü atıyor her seferinde. her zaman kullanılmaz. çünkü tabloları silip yeniden oluşturuyopr.
    .sync()
    .then(result => {
        return User.findByPk(1);
        // console.log(result);
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: 'Max',
                email: 'test@test.com'
            });
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });