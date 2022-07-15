const express = require("express");

const app = express();


app.use("/", (req, res, next) => {
    console.log("This is always run.");
    next();
});

/* 
Aşağıdaki gibi app.use içerisinde 1.argüman olarak url ekleyip gelen url e göre fonksiyonları çalıştırabiliriz. 
Dikkat etmen gereken örneğin / hepsini alıyor /product-add daha spesifik. Bundan dolayı /product daha üste yazılır. Route fonksiyonlarında next() kullanılmaz. Çünkü bu olduktan sonra buraya git demiyoruz.
 */
app.use("/add-product", (req, res, next) => {
    console.log("add product page");
    res.send("<h1>This is add Product page</h1>");
});

app.use("/", (req, res, next) => {
    console.log("main page");
    res.send("<h1>This is main page</h1>");
});






app.listen(3000); 