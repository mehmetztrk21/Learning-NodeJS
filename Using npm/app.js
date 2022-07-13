const http = require("http");  //var olan modülleri böyle kullanıyoruz.
const routes = require("./routes");  //kendi modüllerimizi böyle kullanıyoruz.
console.log(routes.someText)
const server = http.createServer(routes.handler);

server.listen(3000); 


//npm init diyerek package.json dosyamızı oluşturuyoruz.