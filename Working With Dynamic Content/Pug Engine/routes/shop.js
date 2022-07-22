const path=require("path");

const express = require("express");

const router = express.Router();

const adminData=require("./admin");

router.get('/', (req, res, next) => {
    const products=adminData.products;
    res.render("shop",{prods:products,docTitle:"Shop", path:"/"});  //gelen product ürünlerini shop view ine gönderdik.
});

module.exports=router;
