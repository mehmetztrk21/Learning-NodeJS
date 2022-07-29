const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
 
 req.user.createProduct({  //ilişkiyi app.js de tanımladığımız için sequelize bize otomatik metot oluşturuyor giriş yapan kişi için ekleme yapıyor.
  title: title,
  price: price,
  imageUrl: imageUrl,
  description: description,
  /* Product.create({  bu ilk yol
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      userId:req.user.id*/

    }).then(result => { //bütün metotlar then ve catch mantığı çalışır.
      //console.log(result);
      console.log("Created");
      return res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findByPk(prodId).then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err => {
    console.log(err)
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId).then(product => {
      product.title = updatedTitle;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      return product.save();
    })
    .then(result => {   //burdaki then yukardaki return un theni. çok karışık molmasın diye buraya yazabiliriz return kullanarak.
      console.log("UPDATED.");
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(err)
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then(product => {
    return product.destroy();
  })
  .then(result=>{
    console.log("DELETED");
    res.redirect('/admin/products');
  })
  .catch(err=>{console.log(err)});
  
};