const path=require("path");

const express = require("express");

const router = express.Router();

const rootDir=require("../util/path");


const products=[];


router.get('/add-product', (req, res, next) => {
    res.status(200).render("add-product",{docTitle:"Add Product",path:"/admin/add-product"});   // bu şekilde bir helper fonksyion ile de (rootDir) route yapabiliriz
});
router.post('/product', (req, res, next) => {
    console.log(req.body);
    products.push({title:req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products=products;