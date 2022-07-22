const path=require("path");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//ejs yükleme
app.set("view engine","ejs");  //EJS view engine motorunu kullandığımız için onu set ettik.  (uzantıyı hbs ile değiştirdik. Keyfi olarak.)
app.set("views","views");  //kullandığımız şablonların olduğu yer.

const adminRoutes=require("./routes/admin");
const shopRoutes=require("./routes/shop");

app.use(bodyParser.urlencoded({extended:false})); 

app.use(express.static(path.join(__dirname,"public")));  //statik dosyaları kullanmak istiyorsak express js deki static metodunu ekliyoruz bu şekilde. Mesela biz css dosyaları için yaptık.

app.use("/admin",adminRoutes);    //admin.js dosyasındaki bütün url lerin başına ortak olarak /admin ekleme içn kullanılır. Bunu yaparsak /admin/add-product dememiz lazım mesela.
app.use(shopRoutes);


//controller kullanımına örnek olsun diye böyle yaptık.
notFoundController=require("./controllers/404");

app.use(notFoundController.getNotFound);
app.listen(3000);
