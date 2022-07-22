const path=require("path");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//ejs yükleme
app.set("view engine","ejs");  //EJS view engine motorunu kullandığımız için onu set ettik.  (uzantıyı hbs ile değiştirdik. Keyfi olarak.)
app.set("views","views");  //kullandığımız şablonların olduğu yer.

const adminData=require("./routes/admin");
const shopRoutes=require("./routes/shop");

app.use(bodyParser.urlencoded({extended:false})); 

app.use(express.static(path.join(__dirname,"public")));  //statik dosyaları kullanmak istiyorsak express js deki static metodunu ekliyoruz bu şekilde. Mesela biz css dosyaları için yaptık.

app.use("/admin",adminData.routes);    //admin.js dosyasındaki bütün url lerin başına ortak olarak /admin ekleme içn kullanılır. Bunu yaparsak /admin/add-product dememiz lazım mesela.
app.use(shopRoutes);


//yukarıda routes sayfaları içerisindeki hiçbir url isteğğe uymazsa aşağıdaki 404 sayfası çalışsın diyoruz.

app.use((req,res,next)=>{
  res.status(404).render("404",{docTitle:"Not Found",path:null});  //bu status veya set headeri her aksiyonda kullanabilrisin.
});
app.listen(3000);
