const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "products.json");

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (!err) {
            cb(JSON.parse(fileContent));
        }
        else
            cb([]);
    })
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => { console.log(err) });
        })
    }

    static fetchAll(cb) {  //işlevin bitmesini beklemesi için callback fonksiyonu kullandık.
        getProductsFromFile(cb)
    }

}