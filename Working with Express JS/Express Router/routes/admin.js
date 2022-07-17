const path=require("path");

const express = require("express");

const router = express.Router();

const rootDir=require("../util/path");

router.get('/add-product', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, "views", "add-product.html"));   // bu şekilde bir helper fonksyion ile de (rootDir) route yapabiliriz
});
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;