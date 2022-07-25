const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get("/products/:productId",shopController.GetProduct);  //dinamik route işlemlerini her zaman spesifik olarak aşağpılara yazmak doğrudur. Çünkü üste yazarsak alttaki prduct url lerine giriş olmayabilir.

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);
router.get("/cart/delete/:id",shopController.deleteCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
