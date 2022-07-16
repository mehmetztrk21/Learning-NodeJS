const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));  //express js içinde kullanamak istediğimiz 3. taraf paketleri böyle dahil ediyoruz.

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res, next) => {  //post metodu olduğunu böyle ifade ediyoruz.
    console.log(req.body);
    res.redirect('/');  //işlem bittikten sonra yönlendirmek istersek kullanırız.
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
