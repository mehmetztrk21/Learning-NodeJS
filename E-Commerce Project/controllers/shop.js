const Product = require('../models/product');
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.GetProduct = (req, res, next) => {
  const prodId = req.params.productId  //url deki parametreyi böyle yakalıyoruz. (productId ismini route kısmında vermiştik.)
  Product.findById(prodId, product => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products"
    })
  })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    var productList = [];
    var total_price = 0;
    if (cart.products) {
      Product.fetchAll((products) => {
        for (const item of products) {
          if (cart.products.find(prod => prod.id === item.id)) {
            productList.push({ product: item, quantity: cart.products.find(prod => prod.id === item.id).qty });
            total_price += item.price * cart.products.find(prod => prod.id === item.id).qty;
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: productList,
          total_price: total_price
        });
      });

    }
  })

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.deleteCart = (req, res, next) => {
  Cart.deleteCart(req.params.id);
  res.redirect("/cart");
};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
