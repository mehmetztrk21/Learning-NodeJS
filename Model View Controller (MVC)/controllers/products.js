const productModel=require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.status(200).render("add-product", {
        docTitle: "Add Product",
        path: "/admin/add-product",
    });
};
exports.postAddProduct = (req, res, next) => {
    const product=new productModel(req.body.title);
    product.save();
    res.redirect('/');
};
exports.getProducts = (req, res, next) => {
    productModel.fetchAll((products)=>{
        res.render("shop", {
            prods: products,
            docTitle: "Shop",
            path: "/",
        });
    });
  
};