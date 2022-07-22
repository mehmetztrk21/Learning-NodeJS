const path = require("path");

const express = require("express");

const router = express.Router();

const adminData = require("./admin");

router.get('/', (req, res, next) => {
    const products = adminData.products;  //gelen product ürünlerini shop view ine gönderdik.
    res.render("shop", {
        prods: products, 
        docTitle: "Shop",
        path: "/",
    });  
});

module.exports = router;
